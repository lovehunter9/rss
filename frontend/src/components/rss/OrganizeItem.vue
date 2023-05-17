<template>
  <div class="feed-root row items-center">
    <q-checkbox dense size="md" v-model="selection" color="orange" @update:model-value="onSelected"
                v-show="data.getType() === ORGANIZE_TYPE.FEED"/>

    <div class="row items-center"
         :class="data.getType() === ORGANIZE_TYPE.FEED ? 'feed-text-layout' : 'folder-text-layout'">
      <div class="row" style="flex: 15">
        <q-img class="feed-icon" :src="imgRef" v-show="imgRef"/>
        <div class="column justify-start items-start">
          <span class="text-title text-major-color">{{ first }}</span>
          <span class="text-url text-minor-color" v-show="second">{{ second }}</span>
        </div>
      </div>
      <span class="text" style="margin-left:8px;flex: 12" v-show="!parent">{{ third }}</span>
      <span class="text" style="flex: 8" v-show="!parent">{{ fourth }}</span>
    </div>

    <img class="modify-icon" src="../../assets/menu/modify.svg" @click="edit">
    <img class="delete-icon" src="../../assets/menu/delete.svg" @click="remove">
  </div>
  <!-- <div class="line"/> -->
  <q-separator inset />
</template>

<script setup lang="ts">

import {PropType, ref, watch} from 'vue';
import {useRssStore} from 'stores/rss';
import {useOrganizeStore} from 'stores/organize';
import {QDialogOptions, useQuasar} from 'quasar';
import OrganizeDeleteDialog from 'components/dialog/OrganizeDeleteDialog.vue';
import FeedEditDialog from 'components/dialog/FeedEditDialog.vue';
import {BaseOption, OptionalCategory, ORGANIZE_TYPE} from 'stores/organizeConfig';
import {Category, DeleteType, Feed} from 'src/types';
import FolderEditDialog from 'components/dialog/FolderEditDialog.vue';
import {getPastTime, newsBus, newsBusMessage, utcToStamp} from 'src/utils/utils';

const props = defineProps({
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Object as PropType<BaseOption<any>>,
    require: true
  },
  parent: {
    type: Object as PropType<OptionalCategory>,
    require: false,
    default: null
  }
})

const $q = useQuasar()
const store = useRssStore()
const organizeStore = useOrganizeStore()
const first = ref()
const second = ref()
const third = ref()
const fourth = ref()
const imgRef = ref()

if (props.data) {

  const filter = store.feeds.filter((feed) => {
    if (props.data) {
      if (props.data.getType() === ORGANIZE_TYPE.FEED) {
        return feed.id == props.data.getId()
      } else {
        return feed.category.id == props.data.getId()
      }
    }
    return false
  })
  if (filter) {
    console.log(filter)
    fourth.value = getLatestTime(filter)
  }
  if (props.data.getType() === ORGANIZE_TYPE.FEED) {
    if (store.feeds_icon && store.feeds_icon[(props.data.data as Feed).id] !== undefined) {
      imgRef.value = store.feeds_icon[(props.data.data as Feed).id].data;
    }

    first.value = (props.data.data as Feed).title
    second.value = (props.data.data as Feed).feed_url
    third.value = (props.data.data as Feed).category.title
  } else {
    first.value = (props.data.data as Category).title
    third.value = (props.data.data as Category).feeds.length
  }
}

const selection = ref<boolean>(false)

if (props.parent) {
  watch(() => props.parent.status, (value) => {
    if (value != null) {
      selection.value = value
    }
  }, {
    deep: true,
    immediate: true
  })
} else {
  watch(() => organizeStore.organizeData.status, (value) => {
    if (value != null) {
      selection.value = value
    }
  }, {
    deep: true,
    immediate: true
  })
}

function onSelected(value: boolean) {
  if (!props.data) {
    return
  }
  if (props.parent) {
    props.parent.setFeedSelected(props.data.getId(), value)
  } else {
    organizeStore.setSelected(props.data.getId(), value)
  }
}

function edit() {
  console.log('edit')
  if (props.data) {

    let opts: QDialogOptions;
    if (organizeStore.organizeData.type === ORGANIZE_TYPE.FEED || props.parent) {
      opts = {
        component: FeedEditDialog,
        componentProps: {
          feed: props.data.data
        }
      }
    } else {
      opts = {
        component: FolderEditDialog,
        componentProps: {
          folder: props.data
        }
      }
    }

    $q.dialog(opts).onOk(() => {
      //Do Nothing

      newsBus.emit(newsBusMessage.feedRefresh)

    }).onCancel(() => {
      console.log('Cancel');
    })
      .onDismiss(() => {
        console.log('Dismiss');
      });
  }

}

function remove() {
  console.log('delete')
  let type;
  if (props.parent) {
    type = DeleteType.FEED
  } else {
    if (organizeStore.organizeData.type === ORGANIZE_TYPE.FEED) {
      type = DeleteType.FEED
    } else {
      type = DeleteType.Folder
    }
  }
  $q.dialog({
    component: OrganizeDeleteDialog,
    componentProps: {type}
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

function getLatestTime(list: Feed[]): string {
  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length - i - 1; j++) {
        if (utcToStamp(list[j].update_time).getTime() < utcToStamp(list[j + 1].update_time).getTime()) {
          [list[j], list[j + 1]] = [list[j + 1], list[j]];
        }
      }
    }
    if (list[0].id === 21){
      console.log(utcToStamp(list[0].update_time))
    }
    return getPastTime(new Date, utcToStamp(list[0].update_time));
  }
  return 'none'
}

</script>

<style lang="scss" scoped>

.feed-root {
  width: 100%;
  height: auto;
  padding: 16px;

  .feed-text-layout {
    width: calc(100% - 90px);
    padding-left: 18px;
    display: flex;
    flex-direction: row;

    .feed-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%
    }

    .text-title {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      max-width: 260px;
      line-height: 14px;
      margin-left: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .text-url {
      @extend .text-title;
      margin-top: 4px;
    }
  }

  .folder-text-layout {
    width: calc(100% - 65px);

    .text-title {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      max-width: 400px;
      line-height: 14px;
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
    width: 20px;
    height: 20px;
  }
}

.line {
  float: right;
  height: 1px;
  width: calc(100% - 32px);
  margin-left: 16px;
  margin-right: 16px;
  background: #E0E0E0;
}


</style>
