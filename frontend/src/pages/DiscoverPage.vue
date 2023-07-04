<template>
  <q-scroll-area style="height:100vh;" class="bg-color-white">
    <div class="discover-root">
      <div class="top-layout row justify-between items-center">
        <span class="text-title text-major-color">Discover</span>
        <div class="row justify-end items-center" v-if="!showDetail">
          <img class="icon-end" src="../assets/menu/input.svg">
          <img class="icon-end" src="../assets/menu/output.svg">
        </div>
      </div>

      <!-- <div class="search-detail"> -->

      <!-- <search-view placeholder="Search by topic,website,Rss URL" class="detail-width search-view" @onSearch="onSearch"/> -->
      <entry-search-view class="detail-width search-view" :is-use-select="false"
      @show-all-value="showDetails" :filter-data-func="rssStore.discoverFeedRequest"/>
      <!-- <q-scroll-area v-if="!showDetail" class="confirmDialogArea"> -->
      <div class="row justify-start confirmDialogArea" v-if="!showDetail">
        <q-intersection v-for="item, index in searchDetails" :key="index" class="example-item">
          <div class="item-detail" @click="showRecommendContentDetail(item.detail)">
            <img :src="item.img" style="width:100%;height: 100%; position:absolute;">
            <div class="item-title">
              #{{ item.detail }}
            </div>
          </div>
        </q-intersection>
      </div>
      <!-- </q-scroll-area> -->

      <discover-detail v-show="showDetail" :category="selectCategory" class="descover-detail detail-width" ref="discoverDetailRef"
        @back-action="backAction()" />
      <!-- </div> -->
    </div>
    <q-scroll-observer @scroll="onScroll" />
  </q-scroll-area>
</template>

<script lang="ts" setup>

// import {ref} from 'vue';
// import SearchView from 'components/rss/SearchView.vue';
import { RecommendFeed } from 'src/types';
import { ref } from 'vue';
import './discover/css/discover.scss'
import DiscoverDetail from './discover/DiscoverDetail.vue';
import EntrySearchView from '../components/rss/EntrySearchView.vue'
import { useRssStore } from 'src/stores/rss';

const rssStore = useRssStore()

const showDetail = ref(false)

const discoverDetailRef = ref()

const selectCategory = ref('')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onScroll = (info: any) => {
  if (!showDetail.value) {
    return
  }
  console.log(info.position);

  if (info.position.top >= 92 && info.direction === 'down') {
    discoverDetailRef.value.floatTitleView(true)
  }

  if (info.position.top < 92 && info.direction === 'up') {
    discoverDetailRef.value.floatTitleView(false)
  }
}


const searchDetails = ref([
  {
    img: require('../assets/examples/discover_example_img.png'),
    detail: 'Technology',
  },
  {
    img: require('../assets/examples/discover_example_img.png'),
    detail: 'Science'
  },
  {
    img: require('../assets/examples/discover_example_img.png'),
    detail: 'Industries'
  },
  {
    img: require('../assets/examples/discover_example_img.png'),
    detail: 'Comics'
  }
])

const showContentDetail = () => {
  showDetail.value = true
}

const backAction = () => {
  showDetail.value = false
}

const showRecommendContentDetail = async (categoryName: string) => {
  const feeds = await rssStore.discoverFeedRequest('',categoryName)
  selectCategory.value = categoryName
  showDetails(feeds,false)
}

const showDetails = (feeds: RecommendFeed[],resetCategory = true) => {
  // if (!feeds || feeds.length === 0) {
  //   return
  // }
  if (resetCategory) {
    selectCategory.value = ''
  }
  discoverDetailRef.value.reloadFeed(feeds)
  showContentDetail()
}


</script>

<style lang="scss" scoped>
.detail-width {
  width: calc(100% - 240px);
  margin-left: 120px;
}


.search-view {
  margin-top: 16px;
}

.confirmDialogArea {

  width: calc(100% - 224px);
  margin-left: 112px;
  margin-top: 24px;

  // background-color: red;
  .example-item {
    width: 142px;
    height: 180px;
    // margin-right: 10px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 16px;

    .item-detail {
      width: 142px;
      height: 180px;
      // background-color: red;

      .item-title {
        position: absolute;
        left: 12px;
        top: 12px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        color: #FFFFFF;
      }
    }
  }
}


.descover-detail {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
