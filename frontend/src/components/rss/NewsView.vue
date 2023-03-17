<template>
  <div class="news-root">
    <div class="row justify-between items-center detail-header">
      <div class="row justify-start">
        <img class="icon-start" :src="preImage()" title="back" @click="preAction">
        <img class="icon-start" :src="nextImage()" title="next" @click="nextAction">
      </div>
      <div class="row justify-end items-center">
        <img class="icon-end" :src="readRef" :title="readTextRef" @click="readChange" />
        <img class="icon-end" :src="markRef" :title="markTextRef" @click="bookmark">
        <img class="icon-end" src="../../assets/menu/share.svg">
      </div>
    </div>

    <div class="content-bg">

      <div class="row justify-between items-center">
        <div class="author">
          <a href="javascript:;" @click="jumpToFeed()">{{ item.feed.title }}</a>
        </div>
        <img class="entry-icon" :src="store.feeds_icon[item.feed_id].data">
      </div>
      <q-separator style="margin-top:16px;margin-bottom: 16px;" />
      <h1> {{ item.title }} </h1>
      <span class="time">
        {{ getTime() }}
      </span>
      <div class="html-content" v-if="item">
        <div v-html="entry"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  watch,
  onMounted,
  PropType
} from 'vue';
import { useRssStore } from 'stores/rss';
import { EntriesQueryRequest, Entry, EntryStatus, MenuType } from 'src/types';
import { formatContentHtml, newsBus, newsBusMessage, utcToStamp } from 'src/utils/utils'
import { useRouter } from 'vue-router';
import { date } from 'quasar'

const store = useRssStore();
const router = useRouter()
const readRef = ref();
const markRef = ref()
const readTextRef = ref('Click to convert the current article as unread');
const markTextRef = ref('Read later');
const readStatus = ref(true);
const markStatus = ref(false);

let entry = ref<string>('');

const props = defineProps({
  item: {
    type: Object as PropType<Entry>,
    required: true
  }
})

watch(() => [store.menu_choice, store.entries], (newValue) => {
  if (newValue) {
    updateUI();
  }
}, {
  deep: true,
  immediate: true
})

updateUI()

async function updateEntry(newVal: Entry) {
  entry.value = formatContentHtml(newVal.content);
  store.update_entry_content(newVal.id, newVal.content);

  let id = newVal.id;

  // let k = await store.fetch_entry_content(id);
  // console.log(k);
  // if (k != undefined) {
  //   entry.value = formatContentHtml(k);
  // }

  updateUI();
}

function updateUI() {
  if (props.item) {
    readStatus.value = props.item.status === EntryStatus.Read;
    markStatus.value = props.item.starred;
  }

  if (markStatus.value) {
    markRef.value = require('../../assets/menu/bookmark.svg')
    markTextRef.value = 'Cancel read later'
  } else {
    markRef.value = require('../../assets/menu/unbookmark.svg')
    markTextRef.value = 'Read later'
  }

  if (readStatus.value) {
    readRef.value = require('../../assets/menu/read.svg')
    readTextRef.value = 'Click to convert the current article as unread'
  } else {
    readRef.value = require('../../assets/menu/unread.svg')
    readTextRef.value = 'Click to convert the current article as read'
  }
}

function bookmark() {
  if (props.item) {
    store.mark_entry_starred(props.item.id)
  }
}

function readChange() {
  if (props.item) {
    store.mark_entry_read(props.item.id, readStatus.value ? EntryStatus.Unread : EntryStatus.Read)
  }
}

// const showSelfTitle = ref(false)
watch(
  () => props.item,
  async (newVal: Entry) => {
    console.log(newVal)
    if (!newVal) {
      entry.value = '';
      return;
    }
    updateEntry(newVal);
  }
  , {
    deep: true,
    immediate: true
  });

onMounted(async () => {
  updateEntry(props.item);
  //store.get_local_entry(1);
});

const preAction = () => {
  if (!store.can_pre_route(props.item)) {
    return
  }
  newsBus.emit(newsBusMessage.pre)
}

const nextAction = () => {
  if (!store.can_next_route(props.item)) {
    return
  }
  newsBus.emit(newsBusMessage.next)
}

const preImage = () => {
  if (!store.can_pre_route(props.item)) {
    return require('../../assets/menu/backward_disable.svg')
  }
  return require('../../assets/menu/backward.svg')
}

const nextImage = () => {
  if (!store.can_next_route(props.item)) {
    return require('../../assets/menu/forward_disable.svg')
  }
  return require('../../assets/menu/forward.svg')
}

const jumpToFeed = () => {
  // store.

  store.menu_choice = {
    type: MenuType.Feed,
    value: props.item.id
  };
  console.log(store.menu_choice)
  store.get_entries(
    new EntriesQueryRequest({ limit: 50, offset: 0, feed_id: props.item.id })
  );
  router.push('/')
}

function getTime() {
  if (props.item) {
    const timeStemp = utcToStamp(props.item.published_at)
    const dateString = date.formatDate(timeStemp, 'MMM DD, YYYY')
    const timeString = date.formatDate(timeStemp, 'h:mm A')
    return `${dateString} at ${timeString}`
  }
  return '';
}

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
        color: #1A130F;
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
      color: #857C77;
    }

    .html-content {
      margin-top: 20px;
      width: 100%;

      // height: calc(100% - 146px);

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;

      color: #1A130F;
      word-break: break-all;
      padding-bottom: 30px;
    }
  }


}
</style>
