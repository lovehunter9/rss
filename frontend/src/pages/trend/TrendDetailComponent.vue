<template>
  <div class="news-root">
    <div class="row justify-between items-center detail-header">
      <div class="row justify-start">
        <img class="icon-start" :src="preImage()" title="back" @click="preAction">
        <img class="icon-start" :src="nextImage()" title="next" @click="nextAction">
      </div>
      <div class="row justify-end items-center">
        <q-img :src="markRef" :title="markTextRef" width="20px" height="20px" @click.stop='' style="margin-right: 5px;">
          <change-entry-board-menu-component :item-id="`${item.entry_id}`" @add-to-board="addToBoard"/>
        </q-img>
        <img class="icon-end" src="../../assets/menu/share.svg" @click="jumpToPageHome">
      </div>
    </div>

    <div class="content-bg">

      <div class="row justify-between items-center">
        <div class="row justify-start items-center author">
          <q-img v-if="item.feed.icon_content.length > 8" class="feed-icon"
                 :src="'data:image/png;' + item.feed.icon_content"/>
          <div class="text-major-color feed-title">{{ item.feed.feed_title }}</div>
        </div>
        <subscribe-feed :feed-url="item.feed.feed_url"/>
      </div>
      <q-separator style="margin-top:16px;margin-bottom: 16px;"/>
      <h1 class="new-title">
        <a href="javascript:;" class="text-major-color" @click="jumpToPageHome()">{{ item.title }}</a>
      </h1>
      <span class="time text-minor-color">
        {{ getTime() }}
      </span>
      <div class="html-content text-major-color" v-if="item">
        <div v-html="recommendRef"/>
        <div class="recommend-reason column justify-start" v-if="showRecommendReasonRef">
          <div class="line"/>
          <div class="recommend-title">
            Article Recommendation Score : {{item.score}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  PropType, ref, watch
} from 'vue';

import {useRssStore} from 'stores/rss';
import {Recommend} from 'src/types';
import {getShowRecommendReason, utcToStamp} from 'src/utils/utils'
import {formatContentHtml} from 'src/utils/utils'
import {date, useQuasar} from 'quasar'
import {addRecommendToBoard} from 'src/api/api';
import ChangeEntryBoardMenuComponent from 'components/rss/ChangeEntryBoardMenuComponent.vue';
import SubscribeFeed from 'components/rss/SubscribeFeed.vue';

const markRef = ref(require('assets/menu/unbookmark.svg'))
const markTextRef = ref('Add to board')
const $q = useQuasar()

const store = useRssStore();
const recommendRef = ref();
const showRecommendReasonRef = ref(false)

let props = defineProps({
  item: {
    type: Object as PropType<Recommend>,
    required: true
  }
})

onMounted(() => {
  showRecommendReasonRef.value = getShowRecommendReason()
  console.log(showRecommendReasonRef.value)
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

const addToBoard = async (itemId: string, boardId: number) => {
  try {
    await addRecommendToBoard({
      entry_id: Number(itemId),
      board_id: boardId
    })
    $q.notify('Add Success')
  } catch (error) {
    console.log(error);
    $q.notify('Add Fail')
  }
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

watch(
  () => props.item,
  async (newVal: Recommend) => {
    console.log(newVal)
    if (!newVal) {
      recommendRef.value = '';
      return;
    }
    recommendRef.value = formatContentHtml(newVal.full_content)
  }
  , {
    deep: true,
    immediate: true
  });

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


    .feed-icon {
      width: 32px;
      height: 32px;
      margin-right: 10px;
      border-radius: 50%;
    }

    .feed_title {
      color: #1A130F;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 14px; /* 116.667% */
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

      .recommend-reason{

        .line {
          float: right;
          height: 1px;
          width: 100%;
          margin-top: 32px;
          background: #E0E0E0;
        }

        .recommend-title{
          color: #857C77;
          font-family: Roboto;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
          margin-top: 8px;
        }
      }
    }
  }

  .new-title {
    a:link {
      text-decoration: none;
    }

    a:hover {
      color: blue
    }
  }
}
</style>
