<template>
  <div class="feed-root row items-center">
    <q-checkbox dense size="md" v-model="selection" color="orange" @update:model-value="onSelected"/>
    <div class="row items-center feed-text-layout">
      <div class="row justify-start items-center" style="flex: 15">
        <q-img  class="feed-icon"
               style="margin-right: 12px;"
               :src="'data:image/png;' + item.data.icon_content">
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              img
            </div>
          </template>
        </q-img>
        <div class="text-feed-title text-major-color">{{ item.data.feed_title }}</div>
        <div class="text-entry-title text-major-color">{{ item.data.entry_title }}</div>
      </div>
    </div>

    <img class="delete-icon" src="../../assets/menu/delete.svg" @click="remove">
  </div>
  <q-separator inset/>
</template>

<script setup lang="ts">

import {PropType, ref, watch} from 'vue';
import {useOrganizeStore} from 'stores/organize';
import {useQuasar} from 'quasar';
import OrganizeDeleteDialog from 'components/dialog/OrganizeDeleteDialog.vue';
import {OptionalBlacklist} from 'stores/organizeConfig';
import {DeleteType} from 'src/types';

const props = defineProps({
  item: {
    type: Object as PropType<OptionalBlacklist>,
    require: true
  },
})


const $q = useQuasar()
const organizeStore = useOrganizeStore()

console.log(organizeStore.organizeData)

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
  if (!props.item) {
    return
  }
  organizeStore.setSelected(props.item.getId(), value)
}

function remove() {
  $q.dialog({
    component: OrganizeDeleteDialog,
    componentProps: {
      type: DeleteType.BLACKLIST
    }
  }).onOk(async () => {
    if (props.item) {
      await organizeStore.delete(props.item.getId())
    }
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

</script>

<style lang="scss" scoped>

.feed-root {
  width: 100%;
  height: auto;
  padding: 16px;

  .feed-text-layout {
    width: calc(100% - 40px);
    padding-left: 18px;
    display: flex;
    flex-direction: row;

    .feed-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%
    }

    .text-feed-title {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      max-width: 160px;
      min-width: 160px;
      line-height: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .text-entry-title {
      @extend .text-feed-title;
      max-width: 260px;
      min-width: 260px;
      margin-left: 40px;
    }
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
