<template>
  <div class="index-root bg-color-white">

    <q-splitter v-model="splitterModel" unit="px" disable style="height: 100%;"
                v-if="!loadDataEmpty">
      <template v-slot:before>
        <div class="item-list">
          <div class="row justify-end items-center" v-if="store.menu_choice.type !== MenuType.Board">
            <img class="icon-read-all" :src="readRef" @click="readAll" :title="readTextRef">
            <img class="icon-refresh" src="../assets/menu/refresh.svg">
          </div>
          <div class="row justify-end items-center" v-else>
            <img class="icon-read-all" src="../assets/menu/modify.svg" @click="editBoard">
            <img class="icon-refresh" src="../assets/menu/delete.svg" @click="removeBoard">
          </div>
          <div class="text-label text-major-color">{{ labelRef }}</div>
          <div class="text-sub-label text-minor-color">{{ subLabelRef }}</div>
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
const loadDataEmpty = ref(false);

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

function removeBoard() {
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
  if (store.menu_choice.type === MenuType.Search || store.menu_choice.type === MenuType.Trend) {
    return
  }

  const loadDataAnim = async (loadData : () => Promise<number | undefined>) => {
    $q.loading.show()
    const dataLength = await loadData();
    loadDataEmpty.value = dataLength == 0
    $q.loading.hide()
    return dataLength
  }

  if (store.menu_choice.type === MenuType.Today) {
    await loadDataAnim(async () => {
      return await store.get_today();
    })
    return
  }

  if (store.menu_choice.type === MenuType.ReadLater) {
    await loadDataAnim(async () => {
      return await store.get_readLater();
    })
    return
  }
  if (store.menu_choice.type === MenuType.Board) {
    await loadDataAnim(async () => {
     return await store.get_board_entries(store.menu_choice.value || 0,new BoardEntriesQueryRequest({offset: 0}))
    })
    return
  }

  const entriesQurey = new EntriesQueryRequest({
    offset: hasMore ? store.entries.length : 0,
  })
  if (store.menu_choice.type === MenuType.Feed) {
    entriesQurey.feed_id = store.menu_choice.value
  } else if (store.menu_choice.type === MenuType.Category) {
    entriesQurey.category_id = store.menu_choice.value
  } else if (store.menu_choice.type == MenuType.Unread) {
    entriesQurey.status = EntryStatus.Unread;
  }

  let entryLength;
  if (entriesQurey.offset == 0){
    entryLength = await loadDataAnim(async () => {
      return await store.get_entries(entriesQurey)
    })
  }else {
    entryLength = await store.get_entries(entriesQurey)
  }

  if (store.entries.length > 0) {
    const find = store.entries.find(entry => {
      return entry.status === EntryStatus.Unread
    })
    readStatus.value = !find;
  }
  return entryLength
}

let loading = false

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onScroll = (info: any) => {
  if (loading || (store.entries.length > 0 && store.entries_total > 0 && store.entries.length === store.entries_total)) {
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
    }

    .text-sub-label {
      margin-top: 8px;
      margin-left: 16px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
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
