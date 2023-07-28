import {defineStore} from 'pinia';
import {
  Board,
  BoardEntriesQueryRequest,
  BoardRequest,
  Category,
  EntriesQueryRequest,
  EntriesQueryResponse,
  Entry,
  EntryContent,
  EntryStatus,
  Feed,
  FeedCounters,
  FeedIconResponse,
  FeedModificationRequest,
  MenuChoice,
  MenuType,
  SDKQueryRequest,
  Recommend,
  RssContentQueryItem, OptionSetting, Blacklist
} from 'src/types';

import {
  create_board,
  discoverFeedRequest,
  rssContentQuery,
  entry_readlater,
  feed_mark_all_as_read,
  fetch_feed_counter,
  get_board_entries,
  get_boards,
  get_categories,
  get_entries,
  get_entry_content,
  get_feed_icon,
  get_feeds,
  get_readLater,
  get_recommendList,
  get_today,
  remove_category,
  remove_feed,
  removeBoard,
  sdkSearchFeedsByPath,
  today_mark_all_as_read, unread_mark_all_as_read,
  update_board,
  update_entry_status,
  update_feed, getRecommendOption, removeBlackList, getBlackList,
} from 'src/api/api';

export type DataState = {
  url: string;
  sdkUrl: string;
  menu_choice: MenuChoice;
  categories: Category[];
  feeds: Feed[];
  feeds_icon: Record<number, FeedIconResponse>;

  entries: Entry[];
  entries_total: number;
  // entry_choice: Entry | undefined;
  contents: Record<number, string>;
  boards: Board[];

  leftDrawerOpen: boolean;
  dialogShow: boolean;
  recommends: Recommend[]

  searchResult: RssContentQueryItem[]
  blacklist : Blacklist[];

  setting : OptionSetting;
};

export const useRssStore = defineStore('rss', {
  state: () => {
    return {
      url: '',
      sdkUrl: '',
      menu_choice: {
        type: MenuType.Empty,
        value: 0,
      },
      feeds_icon: {},
      categories: [],
      feeds: [],
      boards: [],
      entries: [],
      entries_total: 0,
      contents: {},
      //entry_choice: undefined,
      leftDrawerOpen: false,
      dialogShow: false,
      recommends: [],
      blacklist : [],
      setting : {
        show_recommend_result : false,
        language : []
      }
    } as unknown as DataState;
  },
  getters: {
    //doubleCount: (state) => state.counter * 2,
    allUnRead(): number {
      let result = 0
      this.feeds.forEach(feed => {
        result += feed.unread || 0
      })
      return result
    }
  },
  actions: {
    async refresh_category_and_feeds() {
      try {
        const categories: Category[] = await get_categories();
        const feeds: Feed[] = await get_feeds();
        this.boards = await get_boards();

        for (const category of categories) {
          category.feeds = [];
        }

        for (const feed of feeds) {
          const category = categories.find(
            (category) => category.id == feed.category.id
          );

          if (category) {
            category.feeds.push(feed);
          }
        }
        try {
          //wait organize item icon
          await this.update_feed_icons(feeds);
        } catch (e) {
          console.log(e)
        }

        this.feeds = feeds;
        this.categories = categories;
        this.refresh_feeds_counter();
      } catch (e) {
        console.log(e);
      }
    },

    async get_basic_setting(){
      try {
        this.setting = await getRecommendOption();
      }catch (e){
        console.log(e)
      }
    },

    async refresh_feeds_counter() {
      const feedCounter: FeedCounters = await fetch_feed_counter();
      for (const category of this.categories) {
        for (const feed of category.feeds) {
          if (feed.id in feedCounter.unreads) {
            feed.unread = feedCounter.unreads[feed.id];
          } else {
            feed.unread = 0
          }
        }
      }
    },

    async update_feed_icons(feeds: Feed[]) {
      for (const feed of feeds) {
        await this.get_feed_icon(feed.id);
      }
    },

    async get_feed_icon(
      feed_id: number
    ): Promise<FeedIconResponse | undefined> {
      if (feed_id in this.feeds_icon) {
        return this.feeds_icon[feed_id];
      }

      try {
        this.feeds_icon[feed_id] = await get_feed_icon(feed_id);
        return this.feeds_icon[feed_id];
      } catch (e) {
        return undefined;
      }
    },

    async updateFeed(feedID: number, request: FeedModificationRequest) {
      try {
        const data = await update_feed(feedID.toString(), request);
        console.log(data)
        await this.refresh_category_and_feeds()
      } catch (e) {
        console.log(e);
      }
    },

    async updateBoard(boardId: number, request: BoardRequest) {
      try {
        const data = await update_board(boardId.toString(), request);
        console.log(data)
        // await this.refresh_category_and_feeds()
        this.boards = await get_boards();
      } catch (e) {
        console.log(e);
      }
    },

    async createBoard(request: BoardRequest) {
      try {
        const data = await create_board(request)
        this.boards = await get_boards();
        return data
      } catch (e) {
        console.log(e);
      }
    },

    update_entry_content(entry_id: number, content: string) {
      if (entry_id in this.contents) {
        if (content && content.length > this.contents[entry_id].length) {
          this.contents[entry_id] = content;
        }
      } else {
        this.contents[entry_id] = content;
      }
    },

    async fetch_entry_content(entry_id: number): Promise<EntryContent | undefined> {
      // if (entry_id in this.contents) {
      //   return this.contents[entry_id];
      // }

      try {
        const data: EntryContent = await get_entry_content(entry_id);

        this.update_entry_content(entry_id, data.content);
        //this.contents[entry_id] = data;
        return data;
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },

    get_local_entry(id: number): Entry | undefined {
      return this.entries.find((entry) => entry.id == id);
    },

    can_pre_route(entry: Entry): boolean {
      const index = this.entries.findIndex(e => e.id == entry.id)
      if (index <= 0) {
        return false
      }
      return true
    },

    can_next_route(entry: Entry): boolean {
      const index = this.entries.findIndex(e => e.id == entry.id)
      if (index < 0 || index + 1 >= this.entries.length) {
        return false
      }
      return true
    },


    get_local_category(id: number): Category | undefined {
      return this.categories.find((category) => category.id == id);
    },

    get_local_feed(id: number): Feed | undefined {
      return this.feeds.find((feed) => feed.id == id);
    },

    get_local_feed_by_feed_url(feed_url: string): Feed | undefined {
      return this.feeds.find((feed) => feed.feed_url == feed_url);
    },

    async get_blacklist() : Promise<Blacklist[]>{
      try {
        this.blacklist = await getBlackList();
      } catch (e) {
        console.log(e);
      }
      return this.blacklist;
    },

    async remove_local_feed(id: number) {
      try {
        await remove_feed(id.toString());
        await this.refresh_category_and_feeds()
      } catch (e) {
        console.log(e);
      }
    },

    async remove_local_category(id: number) {
      try {
        await remove_category(id.toString());
        await this.refresh_category_and_feeds()
      } catch (e) {
        console.log(e);
      }
    },

    async remove_local_blacklist(id: number) {
      try {
        await removeBlackList(id.toString());
      } catch (e) {
        console.log(e);
      }
    },

    async remove_local_board(id: number) {
      try {
        await removeBoard(id.toString());
        await this.refresh_category_and_feeds()
      } catch (e) {
        console.log(e);
      }
    },

    async get_entries(q: EntriesQueryRequest, filter ?: (entriesQueryResponse: EntriesQueryResponse) => EntriesQueryResponse) {
      const rssStore = useRssStore();
      if (q.offset <= 0) {
        this.entries = [];
      }
      try {
        console.log('get_entries ' + rssStore.url + '/api/entries' + q.build());
        const data: EntriesQueryResponse = await get_entries(q);
        if (filter) {
          const response = filter({entries: data.entries, total: data.total})

          this.entries = q.offset > 0 ? [...this.entries, ...response.entries] : response.entries;
          this.entries_total = response.total;
        } else {
          this.entries = q.offset > 0 ? [...this.entries, ...data.entries] : data.entries;
          this.entries_total = data.total;
        }
        console.log(this.entries)
        console.log(this.entries_total)
        return data.entries.length
      } catch (e) {
        console.log(e);
      }
    },

    async get_today(onlyAmount = false) {
      try {
        this.entries = [];
        this.entries_total = 0;
        const data: EntriesQueryResponse = await get_today();

        if (!onlyAmount) {
          this.entries = data.entries;
          this.entries_total = data.total;
        }
        return this.entries_total
      } catch (e) {
        console.log(e);
      }
    },

    async get_readLater(onlyAmount = false) {
      try {
        this.entries = [];
        this.entries_total = 0;
        const data: EntriesQueryResponse = await get_readLater();
        if (!onlyAmount) {
          this.entries = data.entries;
          this.entries_total = data.total;
        }
        return this.entries_total
      } catch (e) {
        console.log(e);
      }
    },

    async get_board_entries(boardId: number, request: BoardEntriesQueryRequest) {
      try {
        this.entries = [];
        const response: EntriesQueryResponse = await get_board_entries(boardId, request);
        this.entries = response.entries;
        this.entries_total = response.total;
        return this.entries.length;
      } catch (e) {
        console.log(e);
      }
    },

    async mark_entry_read(entry_id: number, status: EntryStatus) {
      try {
        await update_entry_status({
          entry_ids: [entry_id],
          status,
        });

        for (const entry of this.entries) {
          if (entry.id === entry_id) {
            entry.status = status;
          }
        }
        await this.refresh_feeds_counter();
      } catch (e) {
        console.log(e);
      }
    },

    async mark_entry_readLater(entry_id: number) {
      try {
        await entry_readlater(entry_id);
        for (const entry of this.entries) {
          if (entry.id === entry_id) {
            entry.readlater_tag = !entry.readlater_tag
          }
        }
        await this.refresh_feeds_counter();
      } catch (e) {
        console.log(e);
      }
    },

    async markAllAsRead() {
      try {
        switch (this.menu_choice.type) {
          case MenuType.Feed:
            if (this.menu_choice.value) {
              await feed_mark_all_as_read(this.menu_choice.value.toString())
            }
            break
          case MenuType.Today:
            await today_mark_all_as_read()
            break
          case MenuType.Unread:
            await unread_mark_all_as_read()
        }
        for (const entry of this.entries) {
          if (entry.status === EntryStatus.Unread) {
            entry.status = EntryStatus.Read
          }
        }
        await this.refresh_category_and_feeds();
      } catch (e) {
        console.log(e);
      }
    },

    clear_entries() {
      this.entries = [];
      this.entries_total = 0;
      console.log('clear');
    },

    changeItemMenu(choice: MenuChoice) {
      this.clear_entries();
      this.menu_choice = choice;
    },

    setUrl(new_url: string) {
      this.url = new_url;
    },

    setSDKUrl(new_sdkUrl: string) {
      this.sdkUrl = new_sdkUrl;
    },

    async sdkSearchFeed(path: string) {
      try {
        const request = new SDKQueryRequest({path})
        const result = await sdkSearchFeedsByPath(request)
        console.log(result);

        return result
      } catch (error) {
      }
    },

    async rssContentQuery(query: string) {
      try {
        return await rssContentQuery(query)
      } catch (error) {
        console.log(error);
      }
    },

    async discoverFeedRequest(query = '', categoryName = '') {

      try {
        return await discoverFeedRequest(query, categoryName)
      } catch (error) {
        console.log(error);
        return []
      }
    },

    updateEntryBoards(entry_id: number, board_ids: string) {
      this.entries.filter(e => e.id === entry_id).map(e => {
        e.board_ids = board_ids
      })
    },

    async get_recommendList(page = 0, pageSize = 20) {
      try {
        const recommendList = await get_recommendList(page * pageSize, pageSize)
        this.recommends = recommendList
        return recommendList
      } catch (error) {
        console.log(error);
      }
    },

    async remove_recommendList(recommend : Recommend){
      const index = this.recommends.indexOf(recommend);
      if (index > -1){
        this.recommends.splice(index,1)
      }
    }
  },
});
