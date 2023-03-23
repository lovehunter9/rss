<template>
  <div class="feed-root row justify-start items-center">
    <q-checkbox dense indeterminate-value="null" size="md" v-model="selection" color="orange"
                @update:model-value="onSelected" />
    <div class="feed-text-layout" v-if="prop.folder.status === false">
      <span class="text-type" style="flex: 1">Feeds</span>
    </div>
    <div class="selection-layout row justify-between items-center" v-else>
      <span class="text text-minor-color">Selected {{folder.getSelectedFeed().length}} of {{ folder.getOptionalFeeds().length }}</span>
      <q-btn flat dense class="selected-button row justify-start items-center" style="margin-left: 8px" @click="remove">
        <img class="button-icon" src="../../assets/menu/delete2.svg"/>
        <div class="button-text text-major-color">Delete</div>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">

import {PropType, ref, watch} from 'vue';
import {useOrganizeStore} from 'stores/organize';
import OrganizeDeleteDialog from 'components/dialog/OrganizeDeleteDialog.vue';
import {useQuasar} from 'quasar';
import {OptionalCategory} from 'stores/organizeConfig';
import {DeleteType} from 'src/types';

const $q = useQuasar()
const selection = ref<boolean | null>(false)
const organizeStore = useOrganizeStore()

const prop = defineProps({
  folder : {
    type: Object as PropType<OptionalCategory>,
    default : null,
    require: true
  },
})

function remove() {
  console.log('Delete')
  $q.dialog({
    component: OrganizeDeleteDialog,
    componentProps: {
      type : DeleteType.FEED
    }
  }).onOk(async () => {
    if (prop.folder){
      await prop.folder.getSelectedFeed().forEach((value) => {
        organizeStore.delete(value.id)
      })
    }
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

function onSelected(value: boolean) {
  if (prop.folder) {
    prop.folder.setListSelected(value)
  }
}

if (prop.folder){
  watch(() => prop.folder.status, (value) => {
    selection.value = value
  }, {
    deep: true,
    immediate: true
  })
}


</script>

<style lang="scss" scoped>

.feed-root {
  width: 100%;
  height: 53px;
  padding-left: 24px;
  padding-right: 24px;

  .feed-text-layout {
    width: calc(100% - 90px);
    display: flex;

    .text-type {
      @extend .text;
      text-align: left;
      margin-left: 10px;
      padding-left: 8px;
    }

    .text {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
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
      }
    }

  }
}


</style>
