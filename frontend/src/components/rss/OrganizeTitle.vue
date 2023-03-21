<template>
  <div class="feed-root row justify-start items-center">
    <q-checkbox dense indeterminate-value="null" size="md" v-model="selection" color="orange"
                @update:model-value="onSelected" v-show="organizeStore.organizeData.type === ORGANIZE_TYPE.FEED"/>
    <div :class="organizeStore.organizeData.type === ORGANIZE_TYPE.FEED ? 'feed-text-layout' : 'folder-text-layout'"
         v-if="organizeStore.organizeData.status === false">
      <span class="text-type" style="flex: 15">{{
          organizeStore.organizeData.type === ORGANIZE_TYPE.FEED ? 'Feeds' : 'Folders'
        }}</span>
      <span class="text" style="flex : 12">{{ organizeStore.organizeData.type === ORGANIZE_TYPE.FEED ? 'Folders' : 'Feeds' }}</span>
      <span class="text" style="flex: 8">Last Update</span>
    </div>
    <div class="text-end" v-if="organizeStore.organizeData.status === false">Option</div>
    <div class="selection-layout row justify-between items-center" v-else>
      <span class="text">Selected {{
          organizeStore.getSelectedList().length
        }} of {{ organizeStore.organizeData.dataList.length }}</span>
      <div class="row items-center">
        <q-btn flat dense class="selected-button row justify-start items-center"
               @click="edit">
          <img class="button-icon" src="../../assets/menu/reorganize.svg"/>
          <div class="button-text">Reorganize</div>
        </q-btn>
        <q-btn flat dense class="selected-button row justify-start items-center" style="margin-left: 8px"
               @click="remove">
          <img class="button-icon" src="../../assets/menu/delete2.svg"/>
          <div class="button-text">Delete</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref, watch} from 'vue';
import {useOrganizeStore} from 'stores/organize';
import MultiFeedEditDialog from 'components/dialog/MultiFeedEditDialog.vue';
import OrganizeDeleteDialog from 'components/dialog/OrganizeDeleteDialog.vue';
import {useQuasar} from 'quasar';
import {ORGANIZE_TYPE} from 'stores/organizeConfig';
import {DeleteType} from 'src/types';

const $q = useQuasar()

const selection = ref<boolean | null>(false)

const organizeStore = useOrganizeStore()

function edit() {
  console.log('edit')
  $q.dialog({
    component: MultiFeedEditDialog,
    componentProps: {
      feeds: organizeStore.getSelectedList()
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

function remove() {
  console.log('delete')
  $q.dialog({
    component: OrganizeDeleteDialog,
    componentProps: {
      type : DeleteType.FEED
    }
  }).onOk(async () => {
    await organizeStore.getSelectedList().forEach((value) => {
      organizeStore.delete(value.id)
    })
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

function onSelected(value: boolean) {
  organizeStore.setListSelected(value)
}

watch(() => organizeStore.organizeData.status, (value) => {
  selection.value = value
}, {
  deep: true,
  immediate: true
})

</script>

<style lang="scss" scoped>

.feed-root {
  width: 100%;
  height: 53px;
  padding-left: 16px;
  padding-right: 16px;

  .feed-text-layout {
    width: calc(100% - 90px);
    display: flex;
    flex-direction: row;

    .text-type {
      @extend .text;
      margin-left: 10px;
      padding-left: 8px;
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
      overflow: hidden;
    }

  }

  .folder-text-layout {
    width: calc(100% - 65px);
    display: flex;
    flex-direction: row;

    .text-type {
      @extend .text;
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
      overflow: hidden;
    }

  }

  .selection-layout {
    width: calc(100% - 25px);
    padding-left: 18px;

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
    overflow: hidden;
    text-align: end;
    width: 65px;
  }
}


</style>
