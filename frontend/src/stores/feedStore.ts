import {defineStore} from 'pinia';
import {Feed,} from 'src/types';
import {useRssStore} from 'stores/rss';

export type FeedTemp = {
  status: boolean | null;
  allFeeds: Feed[];
  selectedFeeds: Feed[];
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
      if (feedTitle === 'All Folders'){
        this.allFeeds = ssrStore.feeds;
        console.log(this.allFeeds)
        return;
      }
      const selectedFeeds = ssrStore.feeds.filter((feed) => {
        return feed.category.title == feedTitle;
      })
      if (searchData) {
        const finalFeeds = selectedFeeds.filter((feed) => {
          return feed.title.concat(searchData) || feed.feed_url.concat(searchData);
        })
        this.allFeeds = finalFeeds ? finalFeeds : []
        return
      }
      this.allFeeds = selectedFeeds ? selectedFeeds : []
    },
    addSelectedFeed(feed: Feed) {
      console.log('add')
      const find = this.selectedFeeds.find((value) => {
        return value.id === feed.id
      });
      if (!find){
        this.selectedFeeds.push(feed)
        this._updateState()
      }
    },
    removeSelectedFeed(feed: Feed) {
      console.log('remove')
      let feedIndex = -1;
      this.selectedFeeds.forEach((value,index) => {
        if (value.id === feed.id) {
          feedIndex = index
        }
      });
      console.log(feedIndex)
      if (feedIndex != -1){
        this.selectedFeeds.splice(feedIndex, 1);
        this._updateState()
      }
    },
    removeFeed(feed: Feed){
      let feedIndex = -1;
      this.allFeeds.forEach((value,index) => {
        if (value.id === feed.id) {
          feedIndex = index
        }
      });
      console.log(feedIndex)
      if (feedIndex != -1){
        this.allFeeds.splice(feedIndex, 1);
        this._updateState()
      }
      this.removeSelectedFeed(feed)
    },
    _updateState() {
      if (this.selectedFeeds.length === 0) {
        this.status = false
        console.log(this.status)
        return
      }
      if (this.selectedFeeds.length === this.allFeeds.length) {
        this.status = true
        console.log(this.status)
        return;
      }
      this.status = null
      console.log(this.status)
    },
    clear() {
      this.selectedFeeds = []
      this.allFeeds = []
      this.status = false;
    },
    unselectedAll() {
      this.selectedFeeds = []
      this.status = false;
    },
    selectedAll() {
      this.selectedFeeds= this.allFeeds.concat([]);
      this.status = true;
    }
  }
});
