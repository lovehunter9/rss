<template>
  <q-menu :offset="[10, 8]" class="board-mark-menu">
    <q-list class="menu-list">
      <q-item v-for="item in boardSelectStatusRef " class="menu-item-normal menuItem bg-color-white" dense :key="item.id"
        @click="addToBoard(item.id)" clickable v-close-popup @mouseover="item.isHover = true"
        @mouseout="item.isHover = false">
        <q-item-section avatar>
          <img
            :src="item.selected ? require('../../assets/menu/bookmark.svg') : require('../../assets/menu/unbookmark.svg')"
            :width="16" :height="16" />
        </q-item-section>
        <q-item-section class="menu-title text-major-color">
          {{ item.title }}
        </q-item-section>
        <q-item-section side v-if="item.selected || item.isHover">
          <img :src="getBoardStatusImg(item.isHover, item.selected)" :width="16" :height="16">
        </q-item-section>
      </q-item>
      <q-item dense v-close-popup clickable @click="createBoard()" class="menu-item-normal menuItem bg-color-white">
        <q-item-section avatar>
          <img src="../../assets/menu/add.svg" :width="16" :height="16" />
        </q-item-section>

        <q-item-section class="add-board-title ">
          Create New Boards
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRssStore } from 'src/stores/rss';
import { useQuasar } from 'quasar';
import AddBoardDialog from '../dialog/AddBoardDialog.vue';

let props = defineProps({
  itemId: {
    type: String,
    required: true
  },
  board_ids: {
    type: String,
    required: false,
    default: ''
  }
})

const store = useRssStore();

const $q = useQuasar()

const getBoardStatusImg = (isHover: boolean, isSelected: boolean) => {
  if (!isSelected && !isHover) {
    return ''
  }

  if (isSelected && isHover) {
    return require('../../assets/board/board_hover_remove.svg')
  }

  if (isSelected) {
    return require('../../assets/board/board_normal_selected.svg')
  }
  return require('../../assets/board/board_hover_add.svg')
}

function isContainBoard(id: number) {
  return props.board_ids.split(',').find(e => Number(e) === id) != undefined
}

const initBoardsStatus = () => {
  return store.boards.map(e => {
    return {
      ...e,
      selected: isContainBoard(e.id),
      isHover: false
    }
  })
}

const boardSelectStatusRef = ref(initBoardsStatus())

async function addToBoard(board_id: number) {
  let boardIds = ''
  if (isContainBoard(board_id)) {
    boardIds = props.board_ids.split(',').filter(e => e != `${board_id}`).join(',')
  } else {
    boardIds = props.board_ids.length > 0 ? (props.board_ids + ',' + board_id) : `${board_id}`
  }

  emit('addToBoard', props.itemId , board_id, boardIds, !isContainBoard(board_id))

  setTimeout(() => {
    (props.board_ids as any) = boardIds
    boardSelectStatusRef.value = initBoardsStatus()
  }, 1000);
}

async function createBoard() {
  $q.dialog({
    component: AddBoardDialog,
    componentProps: {}
  })
    .onOk(async (id: number) => {
      if (id > 0) {
        addToBoard(id)
      }
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
      //     });
    });
}

const emit = defineEmits(['addToBoard'])


</script>

<style scoped lang='scss'>
.board-mark-menu {

  .menu-list {
    min-width: 236px;

    .menu-item-normal {
      height: 28px;
    }

    .menu-title {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      margin-left: -30px;
    }

    .add-board-title {
      @extend .menu-title;
      color: $main-style;
    }
  }
}
</style>
