<template>
  <q-dialog class="delete-root text-center" ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <div class="text-title text-major-color">{{ dialogTitleRef }}</div>

      <div style="width: 100%;" class="column justify-start items-start">
        <div class="edit-title text-minor-color">Title</div>
        <edit-view class="edit-view" placeholder="Board Title" :text="titleRef" @input="onTitleChanged" />

        <div class="edit-title text-minor-color">Description</div>
        <q-input v-model="descRef" outlined standout type="textarea" class="message-input"
          placeholder="Describe this board, example: monitor AI industry trends, Discover, etc." />
      </div>

      <div class="row justify-end items-end" style="width: 100%">
        <q-btn dense class="btn-confirm" label="Confirm" @click="onConfirm" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import { Loading, useDialogPluginComponent } from 'quasar';
import EditView from 'components/rss/EditView.vue';
import { onMounted, ref } from 'vue';
import { useRssStore } from 'stores/rss';

const { dialogRef, onDialogOK } = useDialogPluginComponent();
const store = useRssStore()

const text = ref('')

const props = defineProps({
  boardId: {
    type: Number,
    require: false
  }
})

const dialogTitleRef = ref('Add Boards');
const titleRef = ref()
const descRef = ref()

if (props.boardId) {
  dialogTitleRef.value = 'Edit Boards'
}

onMounted(() => {
  if (props.boardId) {
    const find = store.boards.find((board) => {
      return board.id == props.boardId
    })
    console.log(find)
    if (find) {
      onTitleChanged(find.title)
      onDescChanged(find.description)
    }
  }
})

function onTitleChanged(input: string) {
  titleRef.value = input
}

function onDescChanged(input: string) {
  descRef.value = input
}


async function onConfirm() {
  if (props.boardId && props.boardId > 0) {
    await store.updateBoard(props.boardId, {
      title: titleRef.value,
      description: descRef.value
    });
    onDialogOK(props.boardId);
  } else {
    try {
      const board = await store.createBoard({
        title: titleRef.value,
        description: descRef.value
      });
      onDialogOK(board?.id || -1);
    } catch (e) {
      console.log(e);
    } finally {
      Loading.hide();
    }
  }
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

    .edit-label {
      margin-top: 24px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }

    .edit-title {
      @extend .edit-label;
      margin-top: 12px;
    }

    .edit-view {
      height: 32px;
      width: 100%;
      margin-top: 4px;
    }

    .select-view {
      height: 32px;
      width: 100%;
      padding-left: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;

      .select-title-item {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
      }
    }

    .icon-add {
      margin-left: 18px;
      width: 12px;
      height: 12px;
    }

    .text-title {
      font-family: 'Roboto';
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


  }
}

.message-input {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #BDBDBD;
  max-width: 100%;
  width: 100%;
  margin-top: 4px;
}
</style>

