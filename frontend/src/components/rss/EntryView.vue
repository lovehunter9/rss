<template>
  <q-item class="entry-root" clickable dense manualFocus :active="selected" activeClass="itemActiveStyle">
    <div class="row justify-start" style="width:100%;" @click="onEntryClick">
      <div class="circle" v-if="!readStatusRef" />
      <div class="circle-temp" v-else />
      <div class="layout-right column justify-start">
        <div class="row justify-start" style="width: 100%;">
          <q-img v-if="store.feeds_icon[entry.feed_id] && store.feeds_icon[entry.feed_id].data" class="entry-icon" :src="store.feeds_icon[entry.feed_id] && store.feeds_icon[entry.feed_id].data ? store.feeds_icon[entry.feed_id].data : '' "/>
          <div class="column feed-layout justify-start" :class="{
            'margin-left-title' : store.feeds_icon[entry.feed_id] && store.feeds_icon[entry.feed_id].data
          }">
            <span class="text-feed-name text-major-color">{{ entry.feed.title }}</span>
            <span class="text-feed-create text-minor-color">{{ getTime() }}</span>
          </div>
        </div>
        <span class="text-entry-title text-major-color">{{ entry.title }}</span>
        <span class="text-entry-title text-major-color">{{ entry.image_url }}</span>
        <q-img :src="entry!.image_url" v-if="entry?.image_url" width="100%"></q-img>
      </div>
    </div>
  </q-item>
  <div class="line"/>
</template>

<script setup lang="ts">

import { Entry, EntryStatus } from 'src/types';
import { PropType, ref, watch } from 'vue';
import { useRssStore } from 'stores/rss';
import { useRouter } from 'vue-router';
import { getPastTime, utcToStamp } from 'src/utils/utils';

const store = useRssStore()
const router = useRouter()

const props = defineProps({
  entry: {
    type: Object as PropType<Entry>,
    require: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onClickCallback'])
const readStatusRef = ref(false)

if (props.entry) {
  readStatusRef.value = props.entry.status == EntryStatus.Read
}

watch(() => props.entry, () => {
  if (props.entry)
    readStatusRef.value = props.entry.status == EntryStatus.Read
  else {
    readStatusRef.value = false
  }
},{
  deep : true,
  immediate : true
})
function onEntryClick() {
  if (!props.entry) {
    return
  }
  readStatusRef.value = true
  emit('onClickCallback')
  router.push({
    path: '/entry/' + ('' + props.entry.id)
  });
}

function getTime() {
  if (props.entry) {
    return getPastTime(new Date, utcToStamp(props.entry.published_at))
  }
  return '';
}

</script>

<style lang="scss" scoped>

.entry-root {
  width: 100%;
  padding: 16px;
  margin: 0px;
  border-radius: 0;

  .circle {
    width: 6px;
    height: 6px;
    background-color: #81C565;
    border-radius: 50%;
    display: inline-block;
    margin-top: 13px;
  }

  .circle-temp {
    @extend .circle;
    background-color: transparent;
  }

  .layout-right {
    margin-left: 8px;
    width: calc(100% - 46px);

    .entry-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%
    }

    .feed-layout {
      max-width: calc(100% - 42px);

      .text-feed-name {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
      }

      .text-feed-create {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        margin-top: 4px;
      }
    }

    .text-entry-title {
      margin-top: 8px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }

    .text-entry-desc {
      margin-top: 4px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }
}

.itemActiveStyle {
    background-color: rgba(26, 19, 15, 0.05);
  }

.line{
  float: right;
  height: 1px;
  width: calc(100% - 32px);
  margin-left: 16px;
  margin-right: 16px;
  background: #E0E0E0;
}

.margin-left-title {
  margin-left: 10px;
}

</style>
