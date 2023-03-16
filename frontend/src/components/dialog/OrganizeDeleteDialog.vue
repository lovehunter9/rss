<template>
  <q-dialog
    class="delete-root text-center"
    ref="dialogRef"
    >
    <q-card class="q-dialog-plugin">
      <div class="text-title">Delete {{ isFeed ? 'Feed' : 'Folder' }}
      </div>
      <img class="icon-close" src="../../assets/menu/close.svg" @click="onDialogCancel">
      <div class="text-label">
        {{ isFeed ? 'Do you want to remove the selected RSS feeds？' : 'Do you want to delete this folder?' }}
      </div>
      <div class="text-content" v-show="!isFeed">This will cause
        removal of all feeds under this folder.
      </div>

      <div class="row justify-end items-end" style="width: 100%">
        <q-btn
          dense
          class="btn-confirm"
          label="Confirm"
          @click="onDialogOK"/>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import {useDialogPluginComponent} from 'quasar';

defineProps({
  isFeed: {
    type: Boolean,
    require: true
  }
})

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent();

</script>

<style lang="scss" scoped>
.delete-root {
  .q-dialog__backdrop {
    background: rgba(0, 0, 0, 0.7);
  }

  .q-dialog-plugin {
    width: 500px;
    padding: 24px;
    border-radius: 12px;
  }

  .text-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #1A130F;
  }

  .text-content {
    margin-top: 48px;
    margin-left: 8px;
    margin-right: 8px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #857C77;
  }

  .text-label {
    @extend .text-content;
    color: #1A130F;
  }

  .icon-close {
    position: absolute;
    right: 24px;
    top: 26px;
    height: 16px;
    width: 16px
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
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #FFFFFF;

    &::before {
      box-shadow: none;
    }
  }

  .btn-vc[disabled] {
    background: #ececec;
    color: #7a7a7a;
  }

}
</style>

