<template>
  <div class="feed-root row items-center">
    <q-checkbox size="xs" class="check-box" v-model="selection" color="orange"/>
    <div class="text-layout row items-center">
      <div class="col row">
        <img class="feed-icon" :src="store.feeds_icon[feed.id].data">
        <span class="text" style="margin-left: 9px">{{ feed.title }}</span>
      </div>
      <span class="col text">{{ feed.category.title }}</span>
      <span class="col-3 text">{{ feed.id }}</span>
    </div>
    <img class="modify-icon" src="../../assets/menu/modify.svg">
    <img class="delete-icon" src="../../assets/menu/delete.svg">
  </div>
</template>

<script setup lang="ts">

import {Feed} from 'src/types';

defineProps({
  feed: {
    type: Object as PropType<Feed>,
    require: true
  }
})

import {PropType, ref} from 'vue';
import {useRssStore} from 'stores/rss';

const store = useRssStore()

const selection = ref(false)

</script>

<style lang="scss" scoped>

.feed-root {
  width: 100%;
  height: 44px;

  .check-box {
    margin-left: 8px;
  }

  .text-layout {
    padding-left: 9px;
    padding-right: 9px;
    width: calc(100% - 120px);

    .feed-icon {
      width: 16px;
      height: 16px;
    }

    .text {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #1A130F;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .modify-icon {
    margin-right: 25px;
    width: 20px;
    height: 20px;
  }

  .delete-icon {
    margin-right: 16px;
    width: 20px;
    height: 20px;
  }
}


</style>
