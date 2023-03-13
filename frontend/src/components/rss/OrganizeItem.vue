<template>
  <div class="feed-root row items-center">
    <q-checkbox dense size="md" v-model="selection" color="orange" @update:model-value="onSelected"/>

    <div class="text-layout row items-center">
      <div class="col row">
        <q-img class="feed-icon" :src="imgRef" v-show="imgRef"/>
        <div class="column justify-start items-start"  style="margin-left: 10px">
          <span class="text-title">{{ first }}</span>
          <span class="text-url" v-show="second">{{ second }}</span>
        </div>
      </div>
      <span class="col text" style="margin-left:8px">{{ third }}</span>
      <span class="col-3 text">{{ fourth }}</span>
    </div>

    <img class="modify-icon" src="../../assets/menu/modify.svg" @click="editFeed">
    <img class="delete-icon" src="../../assets/menu/delete.svg" @click="deleteFeed">
  </div>
  <q-separator inset/>
</template>

<script setup lang="ts">

import {PropType, ref, watch} from 'vue';
import {useRssStore} from 'stores/rss';
import {useOrganizeStore} from 'stores/organize';
import {useQuasar} from 'quasar';
import FeedDeleteDialog from 'components/dialog/FeedDeleteDialog.vue';
import FeedEditDialog from 'components/dialog/FeedEditDialog.vue';
import {BaseOption, ORGANIZE_TYPE} from 'stores/organizeConfig';
import {Feed,Category} from 'src/types';

const props = defineProps({
  data: {
    type: Object as PropType<BaseOption<any>>,
    require: true
  }
})

const $q = useQuasar()
const store = useRssStore()
const organizeStore = useOrganizeStore()
const isFeed = ref(organizeStore.organizeData.type === ORGANIZE_TYPE.FEED);
const first = ref();
const second = ref();
const third = ref();
const fourth = ref();
const imgRef = ref()
if (props.data) {
  if (isFeed.value) {
    imgRef.value = store.feeds_icon[(props.data.data as Feed).id].data;
    first.value = (props.data.data as Feed).title
    second.value =  (props.data.data as Feed).feed_url
    third.value =  (props.data.data as Feed).category.title
    fourth.value = (props.data.data as Feed).id
  }else {
    first.value = (props.data.data as Category).title
    third.value =  (props.data.data as Category).feeds.length
    fourth.value = (props.data.data as Category).id
  }
}

const selection = ref<boolean>(false)

watch(() => organizeStore.organizeData.status, (value) => {
  if (value != null) {
    selection.value = value
  }
}, {
  deep: true,
  immediate: true
})

function onSelected(value: boolean) {
  if (!props.data) {
    return
  }
  organizeStore.setSelected(props.data.getId(), value)
}

function editFeed() {
  console.log('edit')
  $q.dialog({
    component: FeedEditDialog,
    componentProps: {
      feed: props.data
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
  }).onOk(async () => {
    if (props.data) {
      await organizeStore.delete(props.data.getId())
    }
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

function getLatestEntryTime(): string {
  if (props.data) {
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

    return 'sss'
  }
  return 'error'
}

</script>

<style lang="scss" scoped>

.feed-root {
  width: 100%;
  height: auto;
  padding: 16px;

  .text-layout {
    width: calc(100% - 90px);
    padding-left: 8px;

    .feed-icon {
      margin-left: 10px;
      width: 32px;
      height: 32px;
      border-radius: 50%
    }

    .text-title {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      max-width: 400px;
      line-height: 14px;
      color: #1A130F;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .text-url {
      @extend .text-title;
      color: #857C77;
      margin-top: 4px;
    }
  }

  .modify-icon {
    margin-right: 25px;
    width: 20px;
    height: 20px;
  }

  .delete-icon {
    width: 20px;
    height: 20px;
  }
}


</style>
