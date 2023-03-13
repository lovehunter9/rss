import {Category, Feed} from 'src/types';
import {useRssStore} from 'stores/rss';

export class BaseOption<T> {
  selected: boolean;
  data: T

  constructor(data: T) {
    this.selected = false;
    this.data = data;
  }

  setSelected(isSelected: boolean) {
    this.selected = isSelected;
  }

  getId(): number {
    return -1;
  }

  getType() : string{
    return ''
  }
}

export class OptionalCategory extends BaseOption<Category> {
  getId(): number {
    return (this.data as Category).id;
  }
  getType(): string {
    return ORGANIZE_TYPE.CATEGORY
  }
}

export class OptionalFeed extends BaseOption<Feed> {

  getId(): number {
    return (this.data as Feed).id;
  }

  getType(): string {
    return ORGANIZE_TYPE.FEED
  }
}

export enum ORGANIZE_TYPE {
  FEED = 'feed',
  CATEGORY = 'category'
}

export class BaseOrganize<T extends BaseOption<U>, U> {

  type: ORGANIZE_TYPE;
  status: boolean | null;
  dataList: T[];

  constructor(dataList: T[], type: ORGANIZE_TYPE) {
    this.status = false;
    this.type = type
    this.dataList = dataList;
  }

  setSelected(id: number, isSelected: boolean): void {
    const find = this.dataList.find((value) => {
      return value.getId() === id
    });
    if (find) {
      find.setSelected(isSelected)
      this._updateStatus()
    }
  }

  setListSelected(isSelected: boolean): void {
    this.dataList.forEach((value) => {
      value.setSelected(isSelected)
    })
    this._updateStatus()
  }

  protected _clear(): void {
    this.dataList = []
    this.status = false;
  }

  protected _updateStatus(): void {
    const list = this.dataList.filter((value) => {
      return value.selected
    })
    if (list.length === 0) {
      this.status = false
      console.log(this.status)
      return;
    }
    if (list.length === this.dataList.length) {
      this.status = true;
      console.log(this.status)
      return;
    }
    this.status = null
    console.log(this.status)
  }

  getSelectedList(): U[] {
    return this.dataList.filter((value) => value.selected).map((value) => value.data)
  }

  async delete(id: number): Promise<void> {
    let feedIndex = -1;
    this.dataList.forEach((value, index) => {
      if (value.getId() === id) {
        feedIndex = index
      }
    });
    console.log(feedIndex)
    if (feedIndex != -1) {
      this.dataList.splice(feedIndex, 1);
      this._updateStatus()
      await this.storeRemove(id)
    }
  }

  async storeRemove(id: number): Promise<void> {
    //DO Something
  }

  updateList(title?: string, search?: string): void {
    //DO Something
  }

}

export class OrganizeFeed extends BaseOrganize<OptionalFeed, Feed> {

  constructor(dataList: OptionalFeed[]) {
    super(dataList, ORGANIZE_TYPE.FEED);
  }

  updateList(title: string, search: string): void {
    const ssrStore = useRssStore()
    let filterFeeds
    if (title === 'All Folders') {
      filterFeeds = ssrStore.feeds;
    } else {
      filterFeeds = ssrStore.feeds.filter((feed) => {
        return feed.category.title == title;
      })
    }
    if (search && filterFeeds) {
      const finalFeeds = filterFeeds.filter((feed) => {
        return feed.title.search(search) !== -1 || feed.feed_url.search(search) !== -1;
      })
      this.dataList = finalFeeds ? finalFeeds.map((value) => {
        return new OptionalFeed(value)
      }) : []
    } else {
      this.dataList = filterFeeds ? filterFeeds.map((value) => {
        return new OptionalFeed(value)
      }) : []
    }
    this._updateStatus()
  }

  async storeRemove(id: number): Promise<void> {
    const store = useRssStore()
    await store.remove_local_feed(id)
  }

}

export class OrganizeCategory extends BaseOrganize<OptionalCategory, Category> {

  constructor(dataList: OptionalCategory[]) {
    super(dataList, ORGANIZE_TYPE.CATEGORY);
  }

  updateList(): void {
    const ssrStore = useRssStore()
    const finalList = ssrStore.categories.map((value) => {
      return new OptionalCategory(value)
    })
    this.dataList = finalList ? finalList : [];
    this._updateStatus()
  }

  async storeRemove(id: number): Promise<void> {
    const store = useRssStore()
    await store.remove_local_category(id)
  }

}

