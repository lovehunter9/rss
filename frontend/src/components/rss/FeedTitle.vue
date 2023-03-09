<template>
  <div class="feed-root row items-center">
    <q-checkbox dense indeterminate-value="null" size="md" class="check-box" v-model="selection" color="orange"
                @update:model-value="onSelected"/>
    <div class="text-layout row items-center" v-if="feedStore.status === false">
      <span class="text col">Feed</span>
      <span class="col text">Folder</span>
      <span class="col-3 text">Last Update</span>
    </div>
    <div class="text-end" v-if="feedStore.status === false">Option</div>
    <div class="selection-layout row justify-between items-center" v-else>
      <span class="text col">Selected {{ feedStore.getSelectedFeeds().length }} of {{ feedStore.allFeeds.length }}</span>
      <div class="row">
        <q-btn flat dense class="selected-button row justify-start items-center" @click="editFeed">
          <img class="button-icon" src="../../assets/menu/reorganize.svg"/>
          <div class="button-text">Reorganize</div>
        </q-btn>
        <q-btn flat dense class="selected-button row justify-start items-center" style="margin-left: 8px"
               @click="deleteFeed">
          <img class="button-icon" src="../../assets/menu/delete2.svg"/>
          <div class="button-text">Delete</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref, watch} from 'vue';
import {useFeedStore} from 'stores/feedStore';
import FeedEditDialog from 'components/dialog/FeedEditDialog.vue';
import FeedDeleteDialog from 'components/dialog/FeedDeleteDialog.vue';
import {useQuasar} from 'quasar';

const $q = useQuasar()

const selection = ref<boolean | null>(false)

const feedStore = useFeedStore()

function editFeed() {
  console.log('edit')
  $q.dialog({
    component: FeedEditDialog,
    componentProps: {}
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
    await feedStore.getSelectedFeeds().forEach((feed) => {
       feedStore.removeFeed(feed.id)
    })
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

function onSelected(value: boolean) {
  feedStore.updateAllFeedStatus(value)
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
      line-height: 12px;
      color: #847C77;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
    }

  }

  .selection-layout {
    padding-left: 17px;
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

    .selected-button {
      padding: 8px 16px;
      height: 32px;
      background: rgba(26, 19, 15, 0.05);
      border-radius: 6px;
      text-transform: capitalize;

      .button-icon {
        width: 16px;
        height: 16px;
      }

      .button-text {
        margin-left: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #1A130F;
      }
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
