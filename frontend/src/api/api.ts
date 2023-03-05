import axios from 'axios';
import {
  Category,
  CategoryRequest,
  Feed,
  FeedCreationRequest,
  FeedCounters,
  Entry,
  EntriesQueryRequest,
  EntriesQueryResponse,
  EntryContent,
  EntriesStatusUpdateRequest,
  FeedIconResponse,
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

export async function remove_category(categoryID: string) {
  const rssStore = useRssStore();
  try {
    await axios.delete(rssStore.url + '/api/categories/' + categoryID, {});
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

  return data;
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

export async function get_today(): Promise<EntriesQueryResponse> {
  const rssStore = useRssStore();

  const data: EntriesQueryResponse = await axios.get(
    rssStore.url + '/api/today'
  );

  return data;
}
