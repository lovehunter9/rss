<template>
  <q-item dense class="entry-total-root column">
    <div class="entry-header row items-center justify-between">
      <div class="enter-header-start row items-center">
        <q-img class="entry-icon row item-center" />
        <div class="enter-time text-minor-color ">
          marginalrevolution.com · 1 mins ago
        </div>
      </div>
      <div class="row justify-end items-center">
        <q-img style="margin-right:14px" :src="markRef" :title="markTextRef" width="20px" height="20px" />
        <img class="icon-end" src="../../assets/menu/share.svg">
      </div>
    </div>
    <div class="entry-title text-major-color">
      What is the single best way of improving your GPT prompts?
    </div>

    <div class="entry-content text-minor-color">
      Memphis Grizzlies guard Ja Morant has been suspended by the NBA for eight games without pay for "conduct detrimental
      to the league," officials announced Wednesday.
    </div>
  </q-item>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
// import ChangeEntryBoardMenuComponent from 'components/rss/ChangeEntryBoardMenuComponent.vue'
const markRef = ref(require('../../assets/menu/unbookmark.svg'))
const markTextRef = ref('Add to board')

</script>

<style scoped lang='scss'>
.entry-total-root {
  width: 100%;
  padding: 18px 0 14px;

  // background-color: red;


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
        margin-left: 12px;
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

}
</style>
