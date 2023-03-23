<template>
  <div class="trend-root bg-color-white">
    <div class="page-title text-major-color"> Provide the best information based on trends </div>
    <TabsCompnent :tabs="tabs"></TabsCompnent>
    <q-scroll-area style="height:calc(100% - 75px);margin-top: 8px;">
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
  tabIconName: 'hot',
},
{
  name: 'Top today',
  disable: false,
  tabIconName: 'toptoday'
},
{
  name: 'Top this week',
  disable: false,
  tabIconName: 'topthisweek'
}]

</script>

<style scoped lang='scss'>
.trend-root {
  width: 100%;
  height: 100vh;
  padding-left: 120px;
  padding-right: 120px;
  padding-top: 20px;

  .tabs-bg {
    // background-color: red;


  }
}
</style>
