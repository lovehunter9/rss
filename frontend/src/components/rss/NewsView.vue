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
          <q-menu :offset="[10, 8]">
            <q-list style="min-width:236px">
              <q-item v-for="item in boardSelectStatusRef " dense :key="item.id" @click="addToBoard(item.id)" clickable
                v-close-popup>
                <q-item-section avatar>
                  <img
                    :src="isContainBoard(item.id) ? require('../../assets/menu/bookmark.svg') : require('../../assets/menu/unbookmark.svg')"
                    :width="16" :height="16" />
                </q-item-section>
                <q-item-section style=" font-family: 'Roboto';font-style: normal;font-weight: 400;font-size: 12px;
                      line-height: 12px;color: #1A130F;margin-left: -30px;">
                  {{ item.title }}
                </q-item-section>
                <q-item-section side v-if="isContainBoard(item.id)">
                  <q-checkbox v-model="item.selected" size="25px" color="orange" disable />
                </q-item-section>
              </q-item>
              <q-item dense v-close-popup clickable @click="createBoard()">
                <q-item-section avatar>
                  <img src="../../assets/menu/add.svg" :width="16" :height="16" />
                </q-item-section>

                <q-item-section style="font-family: 'Roboto';font-style: normal;font-weight: 400;font-size: 12px;
                      line-height: 12px;color: #FF8642;margin-left: -30px;">
                  Create New Boards
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-img>
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
import { date, useQuasar } from 'quasar'
// import { similarity2 } from 'src/utils/stringCompare'
import { addEntryToBoard, removeEntryToBoard } from 'src/api/api';
import AddBoardDialog from 'components/dialog/AddBoardDialog.vue';


const store = useRssStore();
const router = useRouter()
const readRef = ref();
const markRef = ref()
const readTextRef = ref('Click to convert the current article as unread');
const markTextRef = ref('Read later');
const readStatus = ref(true);
const markStatus = ref(false);

const $q = useQuasar()

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

  // let id = newVal.id;

  // let k = await store.fetch_entry_content(id);
  // console.log(k);
  // if (k != undefined) {
  //   const result = similarity2(newVal.content,k)
  //   console.log('匹配度:' + result);
  //   if (result > 0.5) {
  //     entry.value = formatContentHtml(k);
  //   }
  // }

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

async function addToBoard(board_id: number) {
  if (props.item) {
    try {
      if (isContainBoard(board_id)) {
        await removeEntryToBoard({ board_id: board_id, entry_id: props.item.id })
        // props.item.board_ids = props.item.board_ids.split(',') //.filter(e => Number(e) !== board.id).join(',')
        store.updateEntryBoards(
          props.item.id,
          props.item.board_ids.split(',').filter(e => Number(e) !== board_id).join(',')
        )
      } else {
        await addEntryToBoard({ board_id: board_id, entry_id: props.item.id })
        store.updateEntryBoards(
          props.item.id,
          props.item.board_ids.length > 0 ? (props.item.board_ids + ',' + board_id) : `${board_id}`
        )
      }
      // eslint-disable-next-line vue/no-mutating-props
      (props.item as any) = store.entries.find(e => e.id === props.item.id)

      boardSelectStatusRef.value = initBoardsStatus()
    } catch (error) {
      console.log(error);
    }
  }
}

async function createBoard() {
  $q.dialog({
    component: AddBoardDialog,
    componentProps: {}
  })
    .onOk(async (id: number) => {
      if (id > 0) {
        addToBoard(id)
      }
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
      //     });
    });
}

function readChange() {
  if (props.item) {
    store.mark_entry_read(props.item.id, readStatus.value ? EntryStatus.Unread : EntryStatus.Read)
  }
}

function isContainBoard(id: number) {
  return props.item.board_ids.split(',').find(e => Number(e) === id) != undefined
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
    const timeStamp = utcToStamp(props.item.published_at)
    const dateString = date.formatDate(timeStamp, 'MMM DD, YYYY')
    const timeString = date.formatDate(timeStamp, 'h:mm A')
    return `${dateString} at ${timeString}`
  }
  return '';
}

const initBoardsStatus = () => {
  return store.boards.map(e => {
    return {
      ...e,
      selected: isContainBoard(e.id)
    }
  })
}

const boardSelectStatusRef = ref(initBoardsStatus())

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
