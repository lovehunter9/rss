import axios from 'axios';
import {
  Category,
  CategoryRequest,
  Feed,
  FeedCreationRequest,
  FeedCounters,
  EntriesQueryRequest,
  EntriesQueryResponse,
  EntryContent,
  EntriesStatusUpdateRequest,
  FeedIconResponse,
  SDKQueryRequest,
  SDKSearchPathResponse,
  FeedModificationRequest,
  BoardRequest,
  Board,
  BoardEntriesQueryRequest,
  EntryToBoardRequest,
  PageToBoard,
  Recommend,
  RecommendFeed,
  RssContentQuery,
  Entry,
  RssContentQueryItem,
  OptionSetting, Blacklist,
} from 'src/types';
import { useRssStore } from 'src/stores/rss';

export async function create_category(req: CategoryRequest) {
  const rssStore = useRssStore();
  try {
    const data: Category = await axios.post(
      rssStore.url + '/api/categories',
      req
    );

    console.log('create_category');
    console.log(data);
    return data;
  } catch (e) {
    console.log(e)
    return null;
  }
}

export async function get_categories(): Promise<Category[]> {
  const rssStore = useRssStore();

  const data: Category[] = await axios.get(
    rssStore.url + '/api/categories',
    {}
  );

  return data;
}

export async function update_category(
  categoryID: string,
  req: CategoryRequest
) {
  const rssStore = useRssStore();
  try {
    const data: Category = await axios.put(
      rssStore.url + '/api/categories/' + categoryID,
      req
    );

    console.log('update_category');
    console.log(data);
    return data;
  } catch (e) {
    return null;
  }
}

export async function addEntryToBoard(request : EntryToBoardRequest){
  const rssStore = useRssStore();
  try {
    await axios.put(rssStore.url + '/api/entries/addEntryToBoard', request);
    return true;
  } catch (e) {
    return null;
  }
}

export async function removeEntryToBoard(request : EntryToBoardRequest){
  const rssStore = useRssStore();
  try {
    await axios.put(rssStore.url + '/api/entries/removeEntryFromBoard', request);
    return true;
  } catch (e) {
    return null;
  }
}

export async function removeBoard(boardId : string){
  const rssStore = useRssStore();
  try {
    await axios.delete(rssStore.url + '/api/boards/' + boardId);
    return true;
  } catch (e) {
    return null;
  }
}

export async function remove_category(categoryID: string) {
  const rssStore = useRssStore();
  try {
    await axios.delete(rssStore.url + '/api/categories/' + categoryID, {});
    return true;
  } catch (e) {
    return null;
  }
}

export async function update_feed(feedID: string,request : FeedModificationRequest) {
  const rssStore = useRssStore();
  try {
    await axios.put(rssStore.url + '/api/feeds/' + feedID, request);
    return true;
  } catch (e) {
    return null;
  }
}

export async function update_board(boardId: string,request : BoardRequest) {
  const rssStore = useRssStore();
  try {
    await axios.put(rssStore.url + '/api/boards/' + boardId, request);
    return true;
  } catch (e) {
    return null;
  }
}

export async function remove_feed(feedID: string) {
  const rssStore = useRssStore();
  try {
    await axios.delete(rssStore.url + '/api/feeds/' + feedID, {});
    return true;
  } catch (e) {
    return null;
  }
}

export async function category_mark_all_as_read(categoryID: string) {
  const rssStore = useRssStore();
  try {
    await axios.put(
      rssStore.url + '/api/categories/' + categoryID + '/mark-all-as-read',
      {}
    );
    return true;
  } catch (e) {
    return null;
  }
}

export async function feed_mark_all_as_read(feedId: string) {
  const rssStore = useRssStore();
  try {
    await axios.put(
      rssStore.url + '/api/feeds/' + feedId + '/mark-all-as-read',
      {}
    );
    return true;
  } catch (e) {
    return null;
  }
}

export async function today_mark_all_as_read() {
  const rssStore = useRssStore();
  try {
    await axios.put(
      rssStore.url + '/api/today/mark-all-as-read',
      {}
    );
    return true;
  } catch (e) {
    return null;
  }
}

export async function unread_mark_all_as_read() {
  const rssStore = useRssStore();
  try {
    await axios.put(
      rssStore.url + '/api/unread/mark-all-as-read',
      {}
    );
    return true;
  } catch (e) {
    return null;
  }
}

export async function entry_readlater(entryId: number){
  const rssStore = useRssStore();
  try {
    await axios.put(
      rssStore.url + '/api/entries/' + entryId + '/readlater',
      {}
    );
    return true;
  } catch (e) {
    return null;
  }
}

export async function category_feeds(categoryID: string) {
  const rssStore = useRssStore();
  try {
    const data: Feed[] = await axios.get(
      rssStore.url + '/api/categories/' + categoryID + '/feeds',
      {}
    );

    return data;
  } catch (e) {
    return null;
  }
}

export async function create_feed(req: FeedCreationRequest) {
  const rssStore = useRssStore();
  try {
    const data: Feed = await axios.post(rssStore.url + '/api/feeds', req);

    console.log('create_feed');
    console.log(data);
    return data;
  } catch (e) {
    return null;
  }
}

export async function get_feeds(): Promise<Feed[]> {
  const rssStore = useRssStore();

  const data: Feed[] = await axios.get(rssStore.url + '/api/feeds', {});

  return data;
}

export async function fetch_feed_counter(): Promise<FeedCounters> {
  const rssStore = useRssStore();

  const data: FeedCounters = await axios.get(
    rssStore.url + '/api/feeds/counters',
    {}
  );

  console.log('fetch_feed_counter');
  console.log(data);
  return data;
}

export async function feed_refresh() {
  const rssStore = useRssStore();
  try {
    await axios.put(rssStore.url + '/api/feeds/refresh', {});

    return true;
  } catch (e) {
    return null;
  }
}

export async function get_feed_icon(
  feed_id: number
): Promise<FeedIconResponse> {
  const rssStore = useRssStore();

  const data: FeedIconResponse = await axios.get(
    rssStore.url + '/api/feeds/' + feed_id + '/icon',
    {}
  );

  console.log(data)
  return {
    ...data,
    data : 'data:' + data.data
  };
}

export async function one_feed_refresh(feed_id: string) {
  const rssStore = useRssStore();
  try {
    await axios.put(rssStore.url + '/api/feeds/' + feed_id + '/refresh', {});

    return true;
  } catch (e) {
    return null;
  }
}

export async function get_one_feed(feed_id: string) {
  const rssStore = useRssStore();
  try {
    const data: Feed = await axios.get(
      rssStore.url + '/api/feeds/' + feed_id,
      {}
    );

    return data;
  } catch (e) {
    return null;
  }
}

export async function get_entry_content(
  entry_id: number
): Promise<EntryContent> {
  const rssStore = useRssStore();

  const data: EntryContent = await axios.get(
    rssStore.url + '/api/entries/' + entry_id + '/fetch-content',
    {}
  );

  return data;
}

export async function get_entries(
  q: EntriesQueryRequest
): Promise<EntriesQueryResponse> {
  const rssStore = useRssStore();

  console.log('get_entries ' + rssStore.url + '/api/entries' + q.build());
  const data: EntriesQueryResponse = await axios.get(
    rssStore.url + '/api/entries' + q.build()
  );

  return data;
}

export async function update_entry_status(
  q: EntriesStatusUpdateRequest
): Promise<EntriesQueryResponse> {
  const rssStore = useRssStore();

  const data: EntriesQueryResponse = await axios.post(
    rssStore.url + '/api/entry/status',
    q
  );

  return data;
}

export async function get_readLater(): Promise<EntriesQueryResponse> {
  const rssStore = useRssStore();

  const data: EntriesQueryResponse = await axios.get(
    rssStore.url + '/api/readlater'
  );

  return data;
}

export async function create_board(q: BoardRequest) : Promise<Board>{
  const rssStore = useRssStore();

  const data: Board = await axios.post(
    rssStore.url + '/api/boards',
    q
  );

  return data;
}

export async function get_boards() : Promise<Board[]>{
  const rssStore = useRssStore();

  const data : Board[] = await axios.get(
    rssStore.url + '/api/boards'
  );

  return data;
}

export async function get_board_entries(
  boardId : number,
  q: BoardEntriesQueryRequest
): Promise<EntriesQueryResponse> {
  const rssStore = useRssStore();

  console.log(q.build())
  const data: EntriesQueryResponse = await axios.get(
    rssStore.url + '/api/boards/' + boardId + '/entries' + q.build()
  );

  return data;
}

export async function get_today(): Promise<EntriesQueryResponse> {
  const rssStore = useRssStore();

  const data: EntriesQueryResponse = await axios.get(
    rssStore.url + '/api/today'
  );

  return data;
}

export async function get_recommendList(offset: number,limit = 20):Promise<Recommend[]> {
  const rssStore = useRssStore();
  const data: Recommend[] = await axios.get(
    rssStore.url + '/api/recommendList'
  , {
    params: {
      // offset,
      // limit
    }
  });
  return data;
}

export const addRecommendToBoard = async (req: EntryToBoardRequest) => {
  // saveToBoard /recommend/saveToBoard
  // EntryID int64 `json:"entry_id"`
	// BoardID int64 `json:"board_id"`
  const rssStore = useRssStore();
  const data = await axios.put(
    rssStore.url + '/api/recommend/saveToBoard',
    req
  )
  return data
}

export const addRecommendFeed = async (req: FeedCreationRequest) => {
  //`json:"category_id"`
  //`json:"feed_url"`
  const rssStore = useRssStore();
  const data = await axios.post(
    rssStore.url + '/api/recommend/addFeed',
    req
  )
  return data
}

export const getBlackList = async () => {
  const rssStore = useRssStore();
  const data : Blacklist[] = await axios.get(
    rssStore.url + '/api/recommend/blacklist'
  )
  return data
}

export const addToBlackList = async (req : {feed_id : number,entry_url : string,entry_title : string}) => {
  const rssStore = useRssStore();
  const data = await axios.post(
    rssStore.url + '/api/recommend/addBlacklist',
    req
  )
  return data
}

export const removeBlackList = async (id : string) => {
  const rssStore = useRssStore();
  const data = await axios.delete(
    rssStore.url + '/api/recommend/blacklist/' + id
  )
  return data
}

export const setRecommendOption = async (request : OptionSetting) => {
  console.log(request)
  const rssStore = useRssStore();
  const data = await axios.put(
    rssStore.url + '/api/recommend/setOption',
    request
  )
  return data
}

export const getRecommendOption = async () => {
  const rssStore = useRssStore();
  const data : OptionSetting = await axios.get(
    rssStore.url + '/api/recommend/getOption'
  )
  return data
}

export const addPageToBoard = async (req: PageToBoard) => {
  const rssStore = useRssStore();
  const data = await axios.put(
    rssStore.url + '/api/page/addPageToBoard',
    req
  )
  return data
}

export const rssContentQuery = async (query: string) => {
  const rssStore = useRssStore();
  console.log(query);

  let data: string = await axios.get(
    rssStore.url + '/api/rss/contentQuery'
  , {
    params: {
      query
    }
  });
  // let data = '{\n \"code\": 0,\n \"message\": \"success\",\n \"data\": {\n  \"code\": 0,\n  \"data\": \"{\\\"count\\\":2,\\\"offset\\\":0,\\\"limit\\\":10,\\\"items\\\":[{\\\"name\\\":\\\"618来了，拼多多补贴已安排好！价格低过全网618，百亿补贴狂撒50亿优惠券！戳【https://b23.tv/tELxrN7】或拼多多搜索【81915】直达活动，iPhone 14低至4699元！...\\\",\\\"entry_id\\\":383,\\\"created\\\":1685447697,\\\"feed_infos\\\":[{\\\"feed_id\\\":1,\\\"feed_name\\\":\\\"小约翰可汗 的 bilibili 动态\\\",\\\"feed_icon\\\":\\\"\\\"}],\\\"borders\\\":[{\\\"name\\\":\\\"ALL\\\",\\\"id\\\":1}],\\\"docId\\\":\\\"b056e0c4-6e00-401b-81de-45cf81b99fcf\\\",\\\"snippet\\\":\\\"\\\"},{\\\"name\\\":\\\"618强势来袭~拼多多百亿补贴狂撒100亿优惠券！戳【https://b23.tv/ynT7wv1】或拼多多搜索【81915】领取我的专属优惠，iPhone 14低至4699元，全系列最高直降2340...\\\",\\\"entry_id\\\":194,\\\"created\\\":1686831570,\\\"feed_infos\\\":[{\\\"feed_id\\\":1,\\\"feed_name\\\":\\\"小约翰可汗 的 bilibili 动态\\\",\\\"feed_icon\\\":\\\"\\\"}],\\\"borders\\\":[{\\\"name\\\":\\\"ALL\\\",\\\"id\\\":1}],\\\"docId\\\":\\\"c40dd85b-4255-4dd4-b8ca-7001ae722feb\\\",\\\"snippet\\\":\\\"\\\"}]}\"\n }\n}'
  data = data.replace(/[\n]/g, '');
  console.log(data);
  if (data.length === 0) {
    return []
  }

  const mode = JSON.parse(data) as RssContentQuery
  console.log(mode);
  if (mode.code === 0 && mode.data && mode.data.data) {
    const dataString = mode.data.data as unknown as string
    mode.data.data = JSON.parse(dataString)
    console.log(mode);
    return mode.data.data.items
  }
  return [];
}
// categoryID := request.QueryStringParam(r, "categoryID", "")
// categoryName := request.QueryStringParam(r, "categoryName", "")
// query := request.QueryStringParam(r, "query", "")

export const discoverFeedRequest = async (query = '', categoryName = '') => {
  const rssStore = useRssStore();

  const data: RecommendFeed[] = await axios.get(
    rssStore.url + '/api/discover/feeds',
    {
      params: {
        query,
        categoryName
      }
    }
  )

  return data
}

export const getEntryById = async (entry_id: number) => {
  const rssStore = useRssStore();

  const data: Entry = await axios.get(
    rssStore.url + '/api/entries/' + entry_id
  )

  return data
}

export const getEntryListByIds = async (list: RssContentQueryItem[]) => {
  const rssStore = useRssStore();

  const entry_id = list.map(v => v.entry_id)
  console.log(entry_id + '')

  const data: Entry[] = await axios.get(
    rssStore.url + '/api/getEntriesByIds?ids=' + (entry_id + '')
  )
  return data
}

// sdk api

export async function sdkSearchFeedsByPath(q:SDKQueryRequest) {
  const rssStore = useRssStore();
  const data: SDKSearchPathResponse = await axios.get(
    rssStore.sdkUrl + '/rss' + q.build()
  );
  return data;
}
