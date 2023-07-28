<template>
  <q-dialog
    class="delete-root text-center"
    ref="dialogRef"
    >

    <q-card class="q-dialog-plugin">

      <div class="text-title text-major-color">Edit Folder</div>

      <img class="icon-close" src="../../assets/menu/close.svg" @click="onDialogCancel">

      <div class="column justify-start items-start">

        <div class="edit-title text-minor-color">Folder Name</div>

        <edit-view class="edit-view" :text="folder?.data.title" :is-read-only="true"/>

        <dialog-feeds-title :folder="folder"/>

        <q-scroll-area class="scroll-area" v-if="folder.getOptionalFeeds().length > 0">

          <div class="column justify-start items-start">

            <q-list style="width: 100%">
              <organize-item
                :key="item.getType() + item.getId()"
                v-for="item in folder.getOptionalFeeds()"
                :data="item"
                :parent=folder
              />
            </q-list>

          </div>

        </q-scroll-area>

        <empty-view :add-feed="false" class="scroll-area" v-else/>

      </div>

      <div class="row justify-end items-end" style="width: 100%">
        <q-btn
          dense
          class="btn-confirm"
          label="Confirm"
          @click="onConfirm"/>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import {useDialogPluginComponent} from 'quasar';
import { onUnmounted, PropType} from 'vue';
import {OptionalCategory} from 'stores/organizeConfig';
import EditView from 'components/rss/EditView.vue';
import OrganizeItem from 'components/rss/OrganizeItem.vue';
import DialogFeedsTitle from 'components/rss/DialogFeedsTitle.vue';
import EmptyView from 'components/rss/EmptyView.vue';

const prop = defineProps({
  folder: {
    type: Object as PropType<OptionalCategory>,
    require: true,
  }
})

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent();

onUnmounted(() => {
  if (prop.folder){
    prop.folder.setListSelected(false)
  }
})

function onConfirm() {
  onDialogOK()
}

</script>

<style lang="scss" scoped>
.delete-root {

  .q-dialog__backdrop {
    background: rgba(0, 0, 0, 0.7);
  }

  .q-dialog-plugin {
    width: 500px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-radius: 12px;

    .scroll-area {
      height: 414px;
      width: 100%;
      padding-left: 8px;
    }
  }

  .text-title {
    font-family: 'Roboto';
    margin-bottom: 24px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }

  .icon-close {
    position: absolute;
    right: 24px;
    top: 26px;
    height: 16px;
    width: 16px
  }


  .edit-label {
    margin-top: 24px;
    margin-left: 24px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    margin-right: 24px;
    font-size: 12px;
    line-height: 16px;
  }


  .edit-title {
    @extend .edit-label;
    margin-top: 12px;
  }

  .edit-view {
    width: calc(100% - 48px);
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 4px;
  }

}
</style>

