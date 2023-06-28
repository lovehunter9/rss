<template>
  <div class="news-root">
    <div class="row justify-between items-center detail-header">
      <div class="row justify-start">
        <img class="icon-start" :src="preImage()" title="back" @click="preAction">
        <img class="icon-start" :src="nextImage()" title="next" @click="nextAction">
      </div>
      <div class="row justify-end items-center">
        <!-- <img class="icon-end" :src="readRef" :title="readTextRef" @click="readChange" />
        <q-img class="icon-end" :src="markRef" :title="markTextRef">
          <change-entry-board-menu-component :item-id="`${item.id}`" :board_ids="item.board_ids" @add-to-board="addToBoard" />
        </q-img> -->
        <img class="icon-end" src="../../assets/menu/share.svg" @click="jumpToPageHome">
      </div>
    </div>

    <div class="content-bg">

      <div class="row justify-between items-center">
        <div class="author">
          <div class="text-major-color">{{ item.author }}</div>
        </div>

        <q-img v-if="item.feed.icon_content.length > 8" class="entry-icon"
          :src="'data:image/png;' + item.feed.icon_content" />
      </div>
      <q-separator style="margin-top:16px;margin-bottom: 16px;" />
      <h1> {{ item.title }} </h1>
      <span class="time text-minor-color">
        {{ getTime() }}
      </span>
      <div class="html-content text-major-color" v-if="item.content">
        <div v-html="formatContentHtml(item.content)"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PropType
} from 'vue';

import { useRssStore } from '../../stores/rss';
import {Recommend } from '../../types';
import {utcToStamp } from '../../utils/utils'
import { formatContentHtml} from 'src/utils/utils'
import { date } from 'quasar'

const store = useRssStore();

let props = defineProps({
  item: {
    type: Object as PropType<Recommend>,
    required: true
  }
})

const preAction = () => {
  if (!canGoPre()) {
    return
  }
  const index = store.recommends.findIndex(e => e.entry_id == props.item.entry_id)
  emit('goPageAction', index - 1);
}

const nextAction = () => {
  if (!canGoNext()) {
    return
  }
  const index = store.recommends.findIndex(e => e.entry_id == props.item.entry_id)
  emit('goPageAction', index + 1);
}

const preImage = () => {
  if (!canGoPre()) {
    return require('../../assets/menu/backward_disable.svg')
  }
  return require('../../assets/menu/backward.svg')
}

const canGoPre = () => {
  const index = store.recommends.findIndex(e => e.entry_id == props.item.entry_id)
  return index > 0
}

const canGoNext = () => {
  const index = store.recommends.findIndex(e => e.entry_id == props.item.entry_id)
  return index + 1 < store.recommends.length
}

const nextImage = () => {
  if (!canGoNext()) {
    return require('../../assets/menu/forward_disable.svg')
  }
  return require('../../assets/menu/forward.svg')
}

const jumpToPageHome = () => {
  window.open(props.item.url)
}

function getTime() {
  if (props.item) {
    const timeStamp = utcToStamp(props.item.published_at)
    const dateString = date.formatDate(timeStamp, 'MMM DD, YYYY')
    const timeString = date.formatDate(timeStamp, 'h:mm A')
    return `${dateString} at ${timeString}`
  }
  return '';
}

const emit = defineEmits(['goPageAction']);


</script>

<style lang="scss" scoped>
.news-root {
  height: 100vh;
  width: 100%;
  // background-color: red;

  .detail-header {
    height: 68px;
  }

  .icon-end {
    height: 20px;
    width: 20px;
    margin-right: 16px;
    // margin-top: 22px;
  }

  .icon-start {
    height: 20px;
    width: 20px;
    margin-left: 16px;
    // margin-top: 22px;
  }

  .content-bg {
    width: 100%;
    margin-top: 10px;
    padding-left: 32px;
    padding-right: 32px;
    height: calc(100% - 78px);
    overflow-y: scroll;

    .author {
      a:link {
        text-decoration: none;
      }

      a:hover {
        color: blue
      }
    }


    .entry-icon {
      width: 28px;
      height: 28px;
    }

    .time {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
    }

    .html-content {
      margin-top: 20px;
      width: 100%;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;

      word-break: break-all;
      padding-bottom: 30px;
    }
  }

}
</style>
