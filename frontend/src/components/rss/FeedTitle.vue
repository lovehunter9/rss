<template>
  <div class="feed-root row items-center">
    <q-checkbox indeterminate-value="null" size="xs" class="check-box" v-model="selection" color="orange"
                @update:model-value="onSelected"/>
    <div class="text-layout row items-center" v-if="feedStore.selectedFeeds.length === 0">
      <span class="text col">Feed</span>
      <span class="col text">Folder</span>
      <span class="col-3 text">Last Update</span>
    </div>
    <div class="text-end" v-if="feedStore.selectedFeeds.length === 0">Option</div>
    <div class="selection-layout row justify-between items-center" v-else>
      <span class="text col">Selected {{ feedStore.selectedFeeds.length }} of {{ feedStore.allFeeds.length }}</span>
      <div class="row">
        <q-btn label="Reorganize"/>
        <q-btn label="Delete"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref, watch} from 'vue';
import {useFeedStore} from 'stores/feedStore';

const selection = ref<boolean | null>(false)

const feedStore = useFeedStore()

function onSelected(value : boolean) {
  if (value){
    feedStore.selectedAll();
  }else {
    feedStore.unselectedAll();
  }
}

watch(() => feedStore.status, (value) => {
  selection.value = value
})

</script>

<style lang="scss" scoped>

.feed-root {
  width: 100%;
  height: 53px;

  .check-box {
    margin-left: 8px;
  }

  .text-layout {
    padding-left: 9px;
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
      line-height: 12px;
      color: #847C77;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
    }

  }

  .selection-layout {
    padding-left: 9px;
    padding-right: 9px;
    width: calc(100% - 40px);

    .feed-icon {
      width: 16px;
      height: 16px;
    }

    .text {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      color: #847C77;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
    }

  }

  .text-end {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #847C77;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: end;
    width: 80px;
    padding-right: 16px
  }
}


</style>
