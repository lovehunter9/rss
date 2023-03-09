<template>
  <div class="feed-root row items-center">
    <q-checkbox dense size="md" class="check-box" v-model="selection" color="orange" @update:model-value="onSelected"/>
    <div class="text-layout row items-center">
      <div class="col row">
        <img class="feed-icon" :src="store.feeds_icon[feed.id].data">
        <span class="text" style="margin-left: 9px">{{ feed.title }}</span>
      </div>
      <span class="col text">{{ feed.category.title }}</span>
      <span class="col-3 text">{{ getLatestEntryTime() }}</span>
    </div>
    <img class="modify-icon" src="../../assets/menu/modify.svg" @click="editFeed">
    <img class="delete-icon" src="../../assets/menu/delete.svg" @click="deleteFeed">
  </div>
</template>

<script setup lang="ts">

import {PropType, ref, watch} from 'vue';
import {useRssStore} from 'stores/rss';
import {useFeedStore} from 'stores/feedStore';
import {useQuasar} from 'quasar';
import FeedDeleteDialog from 'components/dialog/FeedDeleteDialog.vue';
import {getPastTime, utcToStamp} from 'src/utils/utils';
import {Entry, Feed} from 'src/types';
import FeedEditDialog from 'components/dialog/FeedEditDialog.vue';


const props = defineProps({
  feed: {
    type: Object as PropType<Feed>,
    require: true
  }
})

const $q = useQuasar()
const store = useRssStore()
const feedStore = useFeedStore()

const selection = ref<boolean>(false)

watch(() => feedStore.status, (value) => {
  if (value != null) {
    selection.value = value
  }
})

function onSelected(value: boolean) {
  if (!props.feed) {
    return
  }
  feedStore.updateOneFeedStatus(props.feed.id,value)
}

function editFeed(){
  console.log('edit')
  $q.dialog({
    component: FeedEditDialog,
    componentProps: {
      feed : props.feed
    }
  }).onOk(() => {
    //Do Nothing
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

function deleteFeed() {
  console.log('delete')
  $q.dialog({
    component: FeedDeleteDialog,
    componentProps: {}
  }).onOk(async() => {
    if (props.feed) {
      await feedStore.removeFeed(props.feed.id)
    }
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

function getLatestEntryTime(): string {
  if (props.feed) {
    // let list : Entry[] = props.feed.entries
    // console.log(props.feed)
    // for (let i = 0; i < list.length; i++) {
    //   for (let j = 0; j < list.length - i - 1; j++) {
    //     if (utcToStamp(list[j].created_at).getTime() < utcToStamp(list[j + 1].created_at).getTime()) {
    //       [list[j], list[j + 1]] = [list[j + 1], list[j]];
    //     }
    //   }
    // }
    // return getPastTime(new Date, utcToStamp(list[0].created_at));

    return props.feed.id.toString()
  }
  return 'error'
}

</script>

<style lang="scss" scoped>

.feed-root {
  width: 100%;
  height: 44px;

  .check-box {
    margin-left: 16px;
  }

  .text-layout {
    padding-left: 17px;
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
