<template>
  <div class="news-root">
    <div class="row justify-between items-center detail-header">
      <div class="row justify-start">
        <img class="icon-start" :src="preImage()" title="back" @click="preAction">
        <img class="icon-start" :src="nextImage()" title="next" @click="nextAction">
      </div>
      <div class="row justify-end items-center">
        <img class="icon-end" :src="readRef" :title="readTextRef" @click="readChange" />
        <q-img class="icon-end" :src="markRef" :title="markTextRef">
          <change-entry-board-menu-component :item-id="`${item.id}`" :board_ids="item.board_ids"
            @add-to-board="addToBoard" />
        </q-img>
        <img class="icon-end" src="../../assets/menu/share.svg" @click="onShare">
      </div>
    </div>

    <div class="content-bg">

      <div class="row justify-between items-center">
        <div class="author">
          <a href="javascript:;" class="text-major-color" @click="jumpToFeed()">{{ item.feed.title }}</a>
        </div>
        <img class="entry-icon" v-if="store.feeds_icon[item.feed_id] && store.feeds_icon[item.feed_id].data"
          :src="store.feeds_icon[item.feed_id] && store.feeds_icon[item.feed_id].data ? store.feeds_icon[item.feed_id].data : ''">
      </div>
      <q-separator style="margin-top:16px;margin-bottom: 16px;" />
      <h1> {{ item.title }} </h1>
      <span class="time text-minor-color">
        {{ getTime() }}
      </span>
      <div class="html-content text-major-color" v-if="item">
        <div v-html="entry"></div>
      </div>


      <!-- <div style="width: 100%">
    <q-expansion-item
      :default-opened="true"
      switchToggleSide
      denseToggle
      :label="'Attachments(' + (itemContent?.enclosures.length) + ')'"
      v-if="itemContent!.enclosures.length > 0"
    >
      <q-card style=" margin-top: 20px;"> -->
        <div class="" v-for="item,index in itemContent?.enclosures" :key="item.url + index">
        <audio controls v-if="item.url.length > 0 && supportAudio(item.mime_type)">
          <source :src="item.url" :type="item.mime_type">
        </audio>
        <div>
          <a :href="item.url">
          {{ item.url }}
        </a>
        </div>
      </div>
      <!-- </q-card>
    </q-expansion-item>
  </div> -->
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
import { Entry, EntryContent, EntryStatus, MenuType } from 'src/types';
import { formatContentHtml, newsBus, newsBusMessage, utcToStamp } from 'src/utils/utils'
import { useRouter } from 'vue-router';
import {date, useQuasar} from 'quasar'
import ChangeEntryBoardMenuComponent from 'components/rss/ChangeEntryBoardMenuComponent.vue'
import { addEntryToBoard, removeEntryToBoard } from 'src/api/api';

const store = useRssStore();
const router = useRouter()
const readRef = ref();
const markRef = ref()
const readTextRef = ref('Click to convert the current article as unread');
const markTextRef = ref('Read later');
const readStatus = ref(true);
const markStatus = ref(false);
const $q = useQuasar();

const itemContent = ref<EntryContent | undefined>()

let entry = ref<string>('');

let props = defineProps({
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

  let k = await store.fetch_entry_content(id);
  console.log(k);
  if (k != undefined) {
    // const result = similarity2(newVal.content,k)
    // console.log('匹配度:' + result);
    // if (result > 0.5) {
    entry.value = formatContentHtml(k.content);
    // }
  }
  itemContent.value = k
  console.log(itemContent.value);
  updateUI();
}

function updateUI() {
  if (props.item) {
    readStatus.value = props.item.status === EntryStatus.Read;
    markStatus.value = props.item.board_ids.length > 0;
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
  // updateEntry(props.item);
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

const onShare = () =>{
  if (props.item && props.item.url){
    window.open(props.item.url)
  }else {
    $q.notify('url error')
  }
}

const jumpToFeed = () => {
  store.menu_choice = {
    type: MenuType.Feed,
    value: props.item.feed_id
  };
  router.push('/')
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

const addToBoard = async (itemId: string, boardId: number, updateBoardIds: string, isAdd: boolean) => {
  try {
    if (!isAdd) {
      await removeEntryToBoard({ board_id: boardId, entry_id: Number(itemId) })
    } else {
      await addEntryToBoard({ board_id: boardId, entry_id: Number(itemId) })
    }
    store.updateEntryBoards(
      Number(itemId),
      updateBoardIds
    )
  } catch (error) {
    console.log(error);
  }
}

const supportAudio = (mime_type: string) => {
  return mime_type.toLowerCase().startsWith('audio')
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
