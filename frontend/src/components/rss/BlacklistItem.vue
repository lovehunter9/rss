<template>
  <div class="feed-root row items-center">
    <q-checkbox dense size="md" v-model="selection" color="orange" @update:model-value="onSelected"/>
    <div class="row items-center feed-text-layout">
      <div class="row" style="flex: 15">
        <q-img v-if="item.data.icon_content && item.data.icon_content.length > 8" class="feed-icon"
               style="margin-right: 12px;"
               :src="'data:image/png;' + item.data.icon_content"/>
        <div class="text-title text-major-color">{{ item.data.feed_title }}</div>
        <div class="text-url text-minor-color">{{ item.data.entry_title }}</div>
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
