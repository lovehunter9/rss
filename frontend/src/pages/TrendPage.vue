<template>
  <div class="trend-root bg-color-white">
    <div class="page-title text-major-color"> Provide the best information based on trends </div>
    <TabsCompnent :tabs="tabs"></TabsCompnent>
    <q-scroll-area style="height:calc(100% - 180px);margin-top: 8px;">
      <q-list style="margin-right: 20px;">
      <div v-for="item in rssStore.recommends" :key="item.entry_id">
        <EntryTotalComponent :recommend="item"></EntryTotalComponent>
        <q-separator spaced />
      </div>
    </q-list>
    </q-scroll-area>
    <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="currentPage"
      :max="totalPage"
      @update:model-value="updateCurrentPage"
    />
  </div>
  </div>
</template>

<script setup lang='ts'>
import './common/page.common.scss'
import TabsCompnent from './common/TabsCompnent.vue'
import EntryTotalComponent from './common/EntryTotalComponent.vue'
import { onMounted, ref } from 'vue'
import { useRssStore } from 'src/stores/rss'

const tabs = [{
  name: 'Hot',
  disable: false,
  tabIconName: 'hot',
},
// {
//   name: 'Top today',
//   disable: false,
//   tabIconName: 'toptoday'
// },
// {
//   name: 'Top this week',
//   disable: false,
//   tabIconName: 'topthisweek'
// }
]

const rssStore = useRssStore()

const currentPage = ref(1)
const totalPage = ref(1)

onMounted(() => {
  requestRecommendList()
})

const requestRecommendList = async () => {
  const list = await rssStore.get_recommendList(currentPage.value - 1, 20)
  if (list) {
    totalPage.value = Math.ceil(list.total / 20)
  }
}

const updateCurrentPage = (page: number) => {
  currentPage.value = page
  requestRecommendList()
}

</script>

<style scoped lang='scss'>
.trend-root {
  width: 100%;
  height: 100vh;
  padding-left: 120px;
  padding-right: 100px;
  padding-top: 20px;

  .tabs-bg {
    // background-color: red;


  }
}
</style>
