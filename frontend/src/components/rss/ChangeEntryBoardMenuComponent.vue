<template>
  <q-menu :offset="[10, 8]" class="board-mark-menu">
    <q-list class="menu-list">
      <q-item v-for="item in boardSelectStatusRef " class="menu-item-normal" dense :key="item.id"
        @click="addToBoard(item.id)" clickable v-close-popup @mouseover="item.isHover = true"
        @mouseout="item.isHover = false">
        <q-item-section avatar>
          <img
            :src="item.selected ? require('../../assets/menu/bookmark.svg') : require('../../assets/menu/unbookmark.svg')"
            :width="16" :height="16" />
        </q-item-section>
        <q-item-section class="menu-title">
          {{ item.title }}
        </q-item-section>
        <q-item-section side v-if="item.selected || item.isHover">
          <img :src="getBoardStatusImg(item.isHover, item.selected)" :width="16" :height="16">
        </q-item-section>
      </q-item>
      <q-item dense v-close-popup clickable @click="createBoard()" class="menu-item-normal">
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
import { PropType, ref } from 'vue';
import { Entry } from 'src/types';
import { useRssStore } from 'src/stores/rss';
import { addEntryToBoard, removeEntryToBoard } from 'src/api/api';
import { useQuasar } from 'quasar';
import AddBoardDialog from '../dialog/AddBoardDialog.vue';

let props = defineProps({
  item: {
    type: Object as PropType<Entry>,
    required: true
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
  return props.item.board_ids.split(',').find(e => Number(e) === id) != undefined
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
  if (props.item) {
    try {
      if (isContainBoard(board_id)) {
        await removeEntryToBoard({ board_id: board_id, entry_id: props.item.id })
        // props.item.board_ids = props.item.board_ids.split(',') //.filter(e => Number(e) !== board.id).join(',')
        store.updateEntryBoards(
          props.item.id,
          props.item.board_ids.split(',').filter(e => Number(e) !== board_id).join(',')
        )
      } else {
        await addEntryToBoard({ board_id: board_id, entry_id: props.item.id })
        store.updateEntryBoards(
          props.item.id,
          props.item.board_ids.length > 0 ? (props.item.board_ids + ',' + board_id) : `${board_id}`
        )
      }
      // eslint-disable-next-line vue/no-mutating-props
      (props.item as any) = store.entries.find(e => e.id === props.item.id)

      boardSelectStatusRef.value = initBoardsStatus()
    } catch (error) {
      console.log(error);
    }
  }
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


</script>

<style scoped lang='scss'>
.board-mark-menu {

  .menu-list {
    min-width: 236px;

    .menu-item-normal {
      background-color: white;
      height: 28px;

      &:hover {
        color: #FF8642;
      }
    }

    .menu-title {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      color: #1A130F;
      margin-left: -30px;
    }

    .add-board-title {
      @extend .menu-title;
      color: #FF8642;
    }
  }
}
</style>
