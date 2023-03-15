<template>
  <q-splitter v-model="splitterModel" unit="px" disable style="height: 100%;background-color: white;">
    <template v-slot:before>
      <div class="item-list">
        <div class="row justify-end items-center">
          <img class="icon-read-all" src="../assets/menu/unread.svg">
          <img class="icon-refresh" src="../assets/menu/refresh.svg">
        </div>
        <div class="text-label">{{ labelRef }}</div>
        <div class="text-sub-label">{{ subLabelRef }}</div>
        <q-list class="list-view">
          <div v-for="(entry, index) in store.entries" :key="`it` + index" class="entry">
            <entry-view :entry='entry' :selected="index === selectIndex" @onClickCallback="onClickCallback(index)" />
          </div>
        </q-list>
      </div>
    </template>

    <template v-slot:after>
      <div class="column items-center justify-center" style="height: 100vh;">
        <news-view v-if="item" :item="item" />
        <div class="text-7A7A7A column items-center justify-center" v-else>
          <BtIcon class="q-mb-lg" src="itemSelect" :width="215" :height="148" />
          {{ 'No item selected.' }}
        </div>
      </div>

    </template>

  </q-splitter>
</template>

<script lang="ts" setup>
import { useRssStore } from 'stores/rss';
import { EntryStatus, MenuType, Entry } from 'src/types';
import { onMounted, ref, watch } from 'vue';
import EntryView from 'components/rss/EntryView.vue';
import { newsBus, newsBusMessage } from 'src/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import NewsView from 'components/rss/NewsView.vue';

const store = useRssStore();
const labelRef = ref('')

const subLabelRef = ref('0 Unread Feeds')
const selectIndex = ref(-1)
const router = useRouter()
const Route = useRoute()

watch(() => [store.menu_choice,store.entries], (newValue) => {
  if (newValue) {
    updateUI();
  }
}, {
  deep: true,
  immediate: true
})

onMounted(() => {

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
        store.mark_entry_read(entry_id);
      }
      setTimeout(() => {
        item.value = entry;
      }, 0);
    } else {
      selectIndex.value = -1
    }
  }
);

</script>

<style lang="scss" scoped>
.item-list {
  background-color: #FFFFFF;
  border-right: 1px solid #ececec;
  height: 100vh;
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
    // height: calc(100% - 104px)
  }

  .entry {
    width: 100%;
    // height: 120px;
  }

}
</style>
