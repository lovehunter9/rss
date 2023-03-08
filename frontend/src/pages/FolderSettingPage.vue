<template>
  <div class="folder-setting-root justify-start items-center">
    <div class="top-layout row justify-between items-center">
      <span class="text-title">Organize Folders</span>
      <div class="row justify-end items-center">
        <img class="icon-end" src="../assets/menu/input.svg">
        <img class="icon-end" src="../assets/menu/output.svg">
      </div>
    </div>
    <div class="selected-layout row justify-start items-center">
      <q-select borderless dense class="select-view" v-model="folderRef" :options="options"/>
      <search-view class="search-view" placeholder="Search Feeds Name/URL"/>
    </div>
    <q-list>
      <feed-item :key="item.id" v-for="item in store.feeds" :feed="item"/>
    </q-list>
    <div style="position: absolute;bottom: 20px;width: 100%" class="row justify-center items-center">

      <q-pagination
        glossy
        gutter="10px"
        v-model="pagination"
        max="20"
        max-pages="7"
        direction-links
        outline
        boundary-numbers
        color="grey-5"
        active-design="outline"
        active-color="white"
        active-text-color="green"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import SearchView from 'components/rss/SearchView.vue';
import {ref} from 'vue';
import {useRssStore} from 'stores/rss';
import FeedItem from 'components/rss/FeedItem.vue';

const store = useRssStore()
const options: string[] = store.categories.map((value) => {
  return value.title
})
options.push('All Folders')

const pagination = ref(8)

const folderRef = ref()

</script>

<style lang="scss" scoped>
.folder-setting-root {
  background-color: #FFFFFF;
  height: 100vh;
  width: 100%;

  .top-layout {
    width: 100%;

    .text-title {
      margin-top: 22px;
      margin-left: 16px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #1A130F;
    }

    .icon-end {
      height: 20px;
      width: 20px;
      margin-right: 16px;
      margin-top: 22px;
    }

  }

  .selected-layout {
    margin-top: 16px;

    .select-view {
      height: 32px;
      width: 200px;
      margin-left: 16px;
      border: 1px solid #E0E0E0;
      border-radius: 6px;
      color: red;
    }

    .search-view {
      width: 200px;
      margin-left: 12px;
    }
  }

}
</style>
