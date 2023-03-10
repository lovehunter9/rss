import {defineStore} from 'pinia';
import {Feed,} from 'src/types';
import {useRssStore} from 'stores/rss';

export class SelectedFeed{
  feed : Feed
  selected : boolean;

  constructor(feed: Feed) {
    this.feed = feed;
    this.selected = false;
  }

  setSelected(isSelected : boolean){
    this.selected = isSelected;
  }
}

export type FeedTemp = {
  status: boolean | null;
  allFeeds: SelectedFeed[];
};

export const useFeedStore = defineStore('feedStore', {
  state: () => {
    return {
      status: false,
      allFeeds: [],
      selectedFeeds: []
    } as FeedTemp
  },

  getters: {},

  actions: {
    updateAllFeeds(feedTitle: string, searchData: string) {
      const ssrStore = useRssStore()
      let filterFeeds = []
      if (feedTitle === 'All Folders') {
        filterFeeds = ssrStore.feeds;
      } else {
        filterFeeds = ssrStore.feeds.filter((feed) => {
          return feed.category.title == feedTitle;
        })
      }
      if (searchData && filterFeeds) {
        const finalFeeds = filterFeeds.filter((feed) => {
          return feed.title.search(searchData) !== -1 || feed.feed_url.search(searchData) !== -1;
        })
        this.allFeeds = finalFeeds ? finalFeeds.map((feed) => {
          return new SelectedFeed(feed)
        }) : []
      } else {
        this.allFeeds = filterFeeds ? filterFeeds.map((feed) => {
          return new SelectedFeed(feed)
        }) : []
      }
      this._updateState()
    },
    updateOneFeedStatus(feedId: number,status : boolean) {
      const find = this.allFeeds.find((value) => {
        return value.feed.id === feedId
      });
      if (find) {
        find.setSelected(status)
        this._updateState()
      }
    },
    async removeFeed(feedId: number) {
      let feedIndex = -1;
      this.allFeeds.forEach((value, index) => {
        if (value.feed.id === feedId) {
          feedIndex = index
        }
      });
      console.log(feedIndex)
      if (feedIndex != -1) {
        this.allFeeds.splice(feedIndex, 1);
        this._updateState()
        const store = useRssStore()
        await store.remove_local_feed(feedId)
      }
    },
    _updateState() {
      const list = this.allFeeds.filter((feed) => {
        return feed.selected
      })
      if (list.length === 0){
        this.status = false
        console.log(this.status)
        return;
      }
      if (list.length === this.allFeeds.length){
        this.status = true;
        console.log(this.status)
        return;
      }
      this.status = null
      console.log(this.status)
    },
    getSelectedFeeds() : Feed[]{
      return this.allFeeds.filter((feed) => feed.selected).map((feed) => feed.feed)
    },
    clear() {
      this.allFeeds = []
      this.status = false;
    },
    updateAllFeedStatus(status : boolean) {
      this.allFeeds.forEach((feed) => {
        feed.setSelected(status)
      })
      this._updateState()
    },
  }
});
