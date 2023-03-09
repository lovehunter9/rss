<template>
  <q-item class="entry-root" clickable dense manualFocus :focused="selected">
    <div class="row justify-start" style="width:100%;" @click="onEntryClick">
      <div class="circle" v-if="!readStatusRef" />
      <div class="circle-temp" v-else />
      <div class="layout-right column justify-start">
        <div class="row justify-start">
          <img class="entry-icon" :src="store.feeds_icon[entry.feed_id].data">
          <div class="column feed-layout justify-start">
            <span class="text-feed-name">{{ entry.feed.title }}</span>
            <span class="text-feed-create">{{ getTime() }}</span>
          </div>
        </div>
        <span class="text-entry-title">{{ entry.title }}</span>
        <!--        <span>{{ entry.time }}</span>-->
      </div>
    </div>
  </q-item>
</template>

<script setup lang="ts">

import { Entry, EntryStatus } from 'src/types';
import { PropType, ref } from 'vue';
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

console.log(props.entry)

if (props.entry) {
  readStatusRef.value = props.entry.status == EntryStatus.Read
}

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
    return getPastTime(new Date, utcToStamp(props.entry.created_at))
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
    }

    .feed-layout {
      margin-left: 10px;

      .text-feed-name {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: #1A130F;
      }

      .text-feed-create {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #857C77;
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
      color: #1A130F;
    }

    .text-entry-desc {
      margin-top: 4px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #1A130F;
    }
  }

}
</style>
