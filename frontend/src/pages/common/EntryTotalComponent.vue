<template>
  <q-item dense clickable class="entry-total-root column menuItem" @click="itemClick">
    <div class="entry-header row items-center justify-between">
      <div class="enter-header-start row items-center">

        <div v-if="recommend.feed.icon_content.length > 8" style="margin-right: 10px;">
          <img :src="'data:image/png;' + recommend.feed.icon_content" width="30" height="30">
        </div>

        <div class="enter-time text-minor-color ">
          {{ recommend.author }} · {{ getTime() }}
        </div>
      </div>
      <div class="row justify-end items-center">
        <q-img style="margin-right:14px" :src="markRef" :title="markTextRef" width="20px" height="20px" @click.stop=''>
          <change-entry-board-menu-component :item-id="`${recommend.entry_id}`" @add-to-board="addToBoard" />
        </q-img>
        <img class="icon-end" src="../../assets/menu/share.svg">
      </div>
    </div>
    <div class="entry-title text-major-color">
      {{ recommend.title }}
    </div>


    <!-- <div class="entry-content text-minor-color" v-html="recommend.content"></div> -->
    <div>
      score: {{ recommend.score }}
    </div>
    <div>
      rank: {{ recommend.rank }}
    </div>
    <div style="word-break: break-all;">
      url: {{ recommend.url }}
    </div>
    <div>
      category_id: {{ recommend.feed.category_id }}
    </div>
    <div>
      category_title: {{ recommend.feed.category_title }}
    </div>
  </q-item>
</template>

<script setup lang='ts'>
import { PropType, ref } from 'vue';
import { Recommend } from 'src/types'
// import { getPastTime, utcToStamp } from 'src/utils/utils';
import { addRecommendToBoard } from 'src/api/api';
import ChangeEntryBoardMenuComponent from 'components/rss/ChangeEntryBoardMenuComponent.vue'
import { useQuasar } from 'quasar';

// import ChangeEntryBoardMenuComponent from 'components/rss/ChangeEntryBoardMenuComponent.vue'
const markRef = ref(require('../../assets/menu/unbookmark.svg'))
const markTextRef = ref('Add to board')
const $q = useQuasar()

const props = defineProps({
  recommend: {
    type: Object as PropType<Recommend>,
    required: true
  }
})


function getTime() {
  if (props.recommend) {
    // return getPastTime(new Date, utcToStamp(props.recommend.published_at))
    return props.recommend.published_at
  }
  return '';
}

const itemClick = () => {
  window.open(props.recommend.url)
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


</script>

<style scoped lang='scss'>
.entry-total-root {
  width: 100%;
  padding: 18px 0px 14px;

  // background-color: red;


  .entry-header {
    // background-color: red;
    width: 100%;

    .enter-header-start {
      max-width: calc(100% - 40px);
      
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
    width: 24px;
    height: 24px;
    background-color: red;
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
}
</style>
