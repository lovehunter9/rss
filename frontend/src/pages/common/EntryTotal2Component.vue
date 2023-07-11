<template>
  <q-item class="entry-total-root" clickable dense manualFocus :active="selected" activeClass="itemActiveStyle"
    @click="itemOnClick">
    <div class="layout-right column justify-start" style="width: 100%;">
      <div class="row justify-between items-center" style="width: 100%;">
        <div class="row justify-start items-center" style="width: calc(100% - 50px);">
          <q-img v-if="recommend.feed.icon_content.length > 8" class="entry-icon" style="margin-right: 12px;"
            :src="'data:image/png;' + recommend.feed.icon_content" />
          <div class="column feed-layout justify-start">
            <span class="text-feed-name text-major-color">{{ recommend.author }}</span>
            <span class="text-feed-create text-minor-color">{{ getTime() }}</span>
          </div>
        </div>
        <div class="row justify-end items-center">
          <q-img :src="markRef" :title="markTextRef" width="20px" height="20px" @click.stop='' style="margin-right: 5px;">
            <change-entry-board-menu-component :item-id="`${recommend.entry_id}`" @add-to-board="addToBoard" />
          </q-img>
          <img class="icon-end" src="../../assets/menu/share.svg" @click.stop='jumpToPageHome'>
        </div>
      </div>
      <span class="text-entry-title text-major-color">{{ recommend.title }}</span>
      <q-img :src="recommend.image_url" v-if="recommend.image_url" ></q-img>
    </div>
  </q-item>
  <!-- <div class="line" /> -->
</template>

<script setup lang='ts'>
import { PropType, ref } from 'vue';
import { Recommend } from 'src/types'
import { addRecommendToBoard } from 'src/api/api';
import ChangeEntryBoardMenuComponent from 'components/rss/ChangeEntryBoardMenuComponent.vue'
import { useQuasar } from 'quasar';
const markRef = ref(require('../../assets/menu/unbookmark.svg'))
const markTextRef = ref('Add to board')
const $q = useQuasar()

const props = defineProps({
  recommend: {
    type: Object as PropType<Recommend>,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

function getTime() {
  if (props.recommend) {
    // return getPastTime(new Date, utcToStamp(props.recommend.published_at))
    return props.recommend.published_at
  }
  return '';
}

const addToBoard = async (itemId: string, boardId: number) => {
  try {
    await addRecommendToBoard({
      entry_id: Number(itemId),
      board_id: boardId
    })
    $q.notify('Add Success')
  } catch (error) {
    console.log(error);
    $q.notify('Add Fail')
  }
}

const jumpToPageHome = () => {
  window.open(props.recommend.url)
}

const itemOnClick = () => {
  emit('onClickCallback')
}

const emit = defineEmits(['onClickCallback'])

</script>

<style scoped lang='scss'>
.entry-total-root {
  width: 100%;
  padding: 16px;
  border-radius: 0;

  .entry-header {
    // background-color: red;
    width: 100%;

    .enter-header-start {
      .enter-time {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        // margin-left: 12px;
      }
    }
  }

  .entry-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .entry-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
  }


  .entry-content {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-top: 11px;
  }


  .itemActiveStyle {
    color: $main-style;
  }

  .text-feed-name {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    text-overflow: ellipsis; //文本溢出显示省略号
    white-space: nowrap; //文本不会换行
    overflow: hidden;
    width: 260px;
  }

  .text-feed-create {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin-top: 4px;
  }

  .text-entry-title {
    margin-top: 8px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }


}

.itemActiveStyle {
  background-color: rgba(26, 19, 15, 0.05);
}
</style>
