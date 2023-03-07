<template>
  <div class="column item-list justify-start">
    <div class="row justify-end items-center">
      <img class="icon-read-all" src="../assets/menu/readAll.svg">
      <img class="icon-refresh" src="../assets/menu/refresh.svg">
    </div>
    <span class="text-label">{{ labelRef }}</span>
    <span class="text-sub-label">{{ subLabelRef }}</span>
    <q-list class="list-view">
      <div
        v-for="(entry, index) in store.entries"
        :key="`it` + index"
        class="entry">
        <entry-view :entry='entry' @onClickCallback="onClickCallback"/>
      </div>
    </q-list>
  </div>
</template>

<script lang="ts" setup>
import {useRssStore} from 'stores/rss';
import {EntryStatus, MenuType} from 'src/types';
import {onMounted, ref, watch} from 'vue';
import EntryView from 'components/base/EntryView.vue';

const store = useRssStore();
const labelRef = ref('')

const subLabelRef = ref('0 Unread Feeds')

watch(() => store.menu_choice, (newValue) => {
  if (newValue) {
    updateUI();
  }
}, {
  deep: true,
  immediate: true
})

onMounted(() => {
  updateUI();
})

function getUnreadSize(){
  const list =  store.entries.filter((entry) => {
    return entry.status == EntryStatus.Unread;
  })
  return list ? list.length : 0;
}

function onClickCallback(){
  console.log('callback')
  subLabelRef.value =`${getUnreadSize()} Unread Feeds`
}

function updateUI() {
  console.log(store.menu_choice)
  subLabelRef.value =`${getUnreadSize()} Unread Feeds`
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
    height: calc(100% - 104px)
  }

  .entry {
    width: 100%;
    height: 120px;
  }
}
</style>
