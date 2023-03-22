<template>
  <div class="index-root">

    <q-splitter v-model="splitterModel" unit="px" disable style="height: 100%;background-color: white;"
                v-if="store.entries.length > 0">
      <template v-slot:before>
        <div class="item-list">
          <div class="row justify-end items-center" v-if="store.menu_choice.type !== MenuType.Board">
            <img class="icon-read-all" :src="readRef" @click="readAll" :title="readTextRef">
            <img class="icon-refresh" src="../assets/menu/refresh.svg">
          </div>
          <div class="row justify-end items-center" v-else>
            <img class="icon-read-all" src="../assets/menu/modify.svg" @click="editBoard">
            <img class="icon-refresh" src="../assets/menu/delete.svg" @click="remove">
          </div>
          <div class="text-label">{{ labelRef }}</div>
          <div class="text-sub-label">{{ subLabelRef }}</div>
          <q-scroll-area class="list-view" @scroll="onScroll">
            <q-list>

              <div v-for="(entry, index) in store.entries" :key="`it` + index" class="entry">
                <entry-view :entry='entry' :selected="index === selectIndex"
                            @onClickCallback="onClickCallback(index)"/>
              </div>
            </q-list>
            <footer-loading-component v-show="loadMoreEnable"/>
          </q-scroll-area>
        </div>
      </template>

      <template v-slot:after>
        <div class="column items-center justify-center" style="height: 100vh;">
          <news-view v-if="item" :item="item"/>
          <div class="text-7A7A7A column items-center justify-center" v-else>
            <BtIcon class="q-mb-lg" src="itemSelect" :width="215" :height="148"/>
            {{ 'No item selected.' }}
          </div>
        </div>

      </template>

    </q-splitter>
    <empty-view style="width:100%;height:100%" v-else/>

  </div>
</template>

<script lang="ts" setup>
import {useRssStore} from 'stores/rss';
import {BoardEntriesQueryRequest, DeleteType, EntriesQueryRequest, Entry, EntryStatus, MenuType} from 'src/types';
import {onMounted, ref, watch} from 'vue';
import EntryView from 'components/rss/EntryView.vue';
import {newsBus, newsBusMessage} from 'src/utils/utils';
import {useRoute, useRouter} from 'vue-router';
import NewsView from 'components/rss/NewsView.vue';
import EmptyView from 'components/rss/EmptyView.vue';
import {useQuasar} from 'quasar';
import AddBoardDialog from 'components/dialog/AddBoardDialog.vue';
import OrganizeDeleteDialog from 'components/dialog/OrganizeDeleteDialog.vue';
import FooterLoadingComponent from 'components/rss/FooterLoadingComponent.vue'

const store = useRssStore();
const labelRef = ref('')

const subLabelRef = ref('0 Unread Feeds')
const selectIndex = ref(-1)
const router = useRouter()
const Route = useRoute()
const readRef = ref(require('../assets/menu/unread.svg'));
const readTextRef = ref('Click to convert all articles to read');
const readStatus = ref(false);
const $q = useQuasar();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(() => store.menu_choice, (newValue) => {
  requestEntries()
})


watch(() => store.entries, (newValue) => {
  updateUI();
}, {
  immediate: true,
  deep: true
})


watch(() => readStatus.value, () => {
  if (readStatus.value) {
    readRef.value = require('../assets/menu/read.svg')
    // readTextRef.value = 'Click to convert all articles to unread'
  } else {
    readRef.value = require('../assets/menu/unread.svg')
    readTextRef.value = 'Click to convert all articles to read'
  }
})

onMounted(() => {

  requestEntries()

  newsBus.on(newsBusMessage.pre, () => {
    if (selectIndex.value <= 0) {
      return
    }
    selectIndex.value = selectIndex.value - 1
    let entry = store.entries[selectIndex.value];
    pushToEntry(entry)
  })

  newsBus.on(newsBusMessage.next, () => {
    if (selectIndex.value < 0 || selectIndex.value + 1 >= store.entries.length) {
      return
    }
    selectIndex.value = selectIndex.value + 1
    let entry = store.entries[selectIndex.value];
    pushToEntry(entry)
  })
})

function pushToEntry(entry: Entry) {
  router.push({
    path: '/entry/' + ('' + entry.id)
  });
}

function getUnreadSize() {
  const list = store.entries.filter((entry) => {
    return entry.status == EntryStatus.Unread;
  })
  return list ? list.length : 0;
}

function onClickCallback(index: number) {
  console.log('callback')
  selectIndex.value = index
  subLabelRef.value = `${getUnreadSize()} Unread Feeds`
}

function updateUI() {
  console.log(store.menu_choice)
  subLabelRef.value = `${getUnreadSize()} Unread Feeds`
  switch (store.menu_choice.type) {
    case MenuType.Today:
      labelRef.value = 'Today'
      break
    case MenuType.Unread:
      labelRef.value = 'Unread'
      break
    case MenuType.ReadLater:
      labelRef.value = 'ReadLater'
      break
    case MenuType.Category:
      if (!store.menu_choice.value) {
        break
      }
      const category = store.get_local_category(store.menu_choice.value)
      if (!category) {
        break
      }
      labelRef.value = category.title
      break;
    case MenuType.Feed:
      if (!store.menu_choice.value) {
        break
      }
      const feed = store.get_local_feed(store.menu_choice.value)
      if (!feed) {
        break
      }
      labelRef.value = feed.title
      break;
  }
  if (store.entries.length > 0) {
    const find = store.entries.find(entry => {
      return entry.status === EntryStatus.Unread
    })
    readStatus.value = !find;
  }
}

async function readAll() {
  if (readStatus.value){
    $q.notify('The current list is already read')
    return
  }
  await store.markAllAsRead()
}

function editBoard() {
  $q.dialog({
    component: AddBoardDialog,
    componentProps: {
      boardId: store.menu_choice.value
    }
  }).onOk(() => {
    //Do Nothing

    newsBus.emit(newsBusMessage.feedRefresh)

  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

function remove() {
  console.log('delete')
  $q.dialog({
    component: OrganizeDeleteDialog,
    componentProps: {
      type: DeleteType.Board
    }
  }).onOk(async () => {
    if (store.menu_choice.value && store.menu_choice.value > 0){
      await store.remove_local_board(store.menu_choice.value)
    }
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

const splitterModel = ref(400)
const item = ref<Entry | undefined>()

watch(
  () => Route.params.entry_id,
  (newValue, oldValue) => {
    console.log('newValue:', newValue, oldValue);
    console.log(Route.params);
    if (newValue == oldValue) {
      return;
    }

    let entry_id = Number(newValue);
    let entry = store.get_local_entry(entry_id);
    item.value = undefined
    if (entry) {
      if (entry.status != EntryStatus.Read) {
        store.mark_entry_read(entry_id, EntryStatus.Read);
      }
      setTimeout(() => {
        item.value = entry;
      }, 0);
    } else {
      selectIndex.value = -1
    }
  }
);

const loadMoreEnable = ref(true)


const requestEntries = async (hasMore = false) => {
  if (store.menu_choice.type === MenuType.Today || store.menu_choice.type === MenuType.ReadLater || store.menu_choice.type === MenuType.Board) {
    if (store.menu_choice.type === MenuType.Today) {
      return
    }
    if (store.menu_choice.type === MenuType.Board) {
      await store.get_board_entries(store.menu_choice.value || 0,new BoardEntriesQueryRequest({limit: 50, offset: 0}))
    }
    return 0
  }

  const entriesQurey = new EntriesQueryRequest({
    offset: hasMore ? store.entries.length : 0,
    limit: 50
  })
  if (store.menu_choice.type === MenuType.Feed) {
    entriesQurey.feed_id = store.menu_choice.value
  } else if (store.menu_choice.type === MenuType.Category) {
    entriesQurey.category_id = store.menu_choice.value
  } else if (store.menu_choice.type == MenuType.Unread) {
    entriesQurey.status = EntryStatus.Unread;
  }

  const updateAccount = await store.get_entries(entriesQurey)

  if (store.entries.length > 0) {
    const find = store.entries.find(entry => {
      return entry.status === EntryStatus.Unread
    })
    readStatus.value = !find;
  }
  return updateAccount
}

let loading = false

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onScroll = (info: any) => {
  if (loading) {
    return
  }
  if (info.verticalPosition + info.verticalContainerSize >= info.verticalSize - 30) {
    loading = true
    onLoadRef(() => {
      console.log('loading done');
      loading = false
    });
  }
}

const onLoadRef = async (done: (() => void)) => {
  requestEntries(true).then((number) => {
    loadMoreEnable.value = number !== undefined && number >= 50;
    done()
  })
}

</script>

<style lang="scss" scoped>
.index-root {
  height: 100%;
  background-color: #FFFFFF;

  .item-list {

    border-right: 1px solid #ececec;
    height: 100%;
    overflow: auto;

    .icon-read-all {
      width: 20px;
      height: 20px;
      margin-right: 12px;
      margin-top: 22px;
    }

    .icon-refresh {
      width: 20px;
      height: 20px;
      margin-right: 16px;
      margin-top: 22px;
    }

    .text-label {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      margin-top: 16px;
      margin-left: 16px;
      font-size: 16px;
      line-height: 16px;
      color: #1A130F;
    }

    .text-sub-label {
      margin-top: 8px;
      margin-left: 16px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
      color: #857C77;
    }

    .list-view {
      margin-top: 8px;
      height: calc(100% - 110px);
    }

    .entry {
      width: 100%;
    }

  }
}
</style>
