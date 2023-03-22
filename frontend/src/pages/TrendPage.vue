<template>
  <div class="trend-root">
    <div class="page-title"> Provide the best information based on trends </div>
    <TabsCompnent :tabs="tabs"></TabsCompnent>
    <q-scroll-area style="height:calc(100% - 68px)">
      <q-list>
      <div  v-for="item in 10" :key="item">
        <EntryTotalComponent></EntryTotalComponent>
        <q-separator spaced />
      </div>
    </q-list>
    </q-scroll-area>
  </div>
</template>

<script setup lang='ts'>
import './common/page.common.scss'
import TabsCompnent from './common/TabsCompnent.vue'
import EntryTotalComponent from './common/EntryTotalComponent.vue'

const tabs = [{
  name: 'Hot',
  disable: false,
  normalIcon: 'img:/imgs/tabs/hot.svg',
  selectedIcon: 'img:/imgs/tabs/hot_hover.svg'
},
{
  name: 'Top today',
  disable: false,
  normalIcon: 'img:/imgs/tabs/toptoday.svg',
  selectedIcon: 'img:/imgs/tabs/toptoday_hover.svg'
},
{
  name: 'Top this week',
  disable: false,
  normalIcon: 'img:/imgs/tabs/topthisweek.svg',
  selectedIcon: 'img:/imgs/tabs/topthisweek_hover.svg'
}]

</script>

<style scoped lang='scss'>
.trend-root {
  width: 100%;
  height: 100vh;
  background-color: white;
  padding-left: 120px;
  padding-right: 120px;
  padding-top: 20px;

  .tabs-bg {
    // background-color: red;


  }
}
</style>
