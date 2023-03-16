<template>
  <q-dialog
    class="delete-root text-center"
    ref="dialogRef"
    >

    <q-card class="q-dialog-plugin">

      <div class="text-title">Edit Folder</div>

      <img class="icon-close" src="../../assets/menu/close.svg" @click="onDialogCancel">

      <div class="column justify-start items-start">

        <div class="edit-title">Folder Name</div>

        <edit-view class="edit-view" :text="folder.data.title" :is-read-only="true"/>

        <dialog-feeds-title :folder="folder"/>

        <q-scroll-area class="scroll-area">

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

import {useDialogPluginComponent, useQuasar} from 'quasar';
import { onUnmounted, PropType} from 'vue';
import {OptionalCategory} from 'stores/organizeConfig';
import EditView from 'components/rss/EditView.vue';
import OrganizeItem from 'components/rss/OrganizeItem.vue';
import FeedDeleteDialog from 'components/dialog/OrganizeDeleteDialog.vue';
import {useOrganizeStore} from 'stores/organize';
import DialogFeedsTitle from 'components/rss/DialogFeedsTitle.vue';

const prop = defineProps({
  folder: {
    type: Object as PropType<OptionalCategory>,
    require: true,
  }
})

const organizeStore = useOrganizeStore()
const $q = useQuasar();

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent();

function remove() {
  $q.dialog({
    component: FeedDeleteDialog,
    componentProps: {}
  }).onOk(async () => {
    if (prop.folder) {
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
    color: #1A130F;
  }

  .icon-close {
    position: absolute;
    right: 24px;
    top: 26px;
    height: 16px;
    width: 16px
  }

  .selected-button {
    margin: 4px;
    padding: 8px 16px;
    height: 32px;
    width: fit-content;
    background-color: transparent;
    border: 1px solid #E0E0E0;
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

  .edit-label {
    margin-top: 24px;
    margin-left: 24px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    margin-right: 24px;
    font-size: 12px;
    line-height: 16px;
    color: #857C77;
  }

  .check-box {
    margin-top: 12px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #847C77;
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

  .btn-confirm {
    text-transform: capitalize;
    width: 92px;
    height: 32px;
    background: #FF8642;
    border-radius: 6px;
    margin-top: 50px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    margin-right: 24px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #FFFFFF;

    &::before {
      box-shadow: none;
    }
  }

}
</style>

