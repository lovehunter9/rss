<template>
  <q-dialog
    class="delete-root text-center"
    ref="dialogRef"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="text-title">Add Folder</div>

      <div style="width: 100%;" class="column justify-start items-start">
        <div class="edit-title">Title</div>
        <edit-view class="edit-view" placeholder="input folder name" @input="onInput"/>
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
import EditView from 'components/rss/EditView.vue';
import {ref} from 'vue';
import {useRssStore} from 'stores/rss';

const inputRef = ref()
const {dialogRef, onDialogHide, onDialogOK} = useDialogPluginComponent();
const store = useRssStore()
const $q = useQuasar()

function onConfirm() {
  if (!inputRef.value) {
    $q.notify('folder name is empty')
    return
  }
  const find = store.categories.find((value) => {
    return value.title === inputRef.value
  })
  if (!find) {
    onDialogOK(inputRef.value)
  } else {
    $q.notify('folder name is exist')
  }

}

function onInput(input: string) {
  inputRef.value = input
}


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

  .icon-close {
    position: absolute;
    right: 24px;
    top: 26px;
    height: 16px;
    width: 16px
  }

  .edit-label {
    margin-top: 24px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #857C77;
  }

  .edit-title {
    @extend .edit-label;
    margin-top: 12px;
  }

  .edit-view {
    width: 100%;
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

