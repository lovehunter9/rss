<template>
  <div class="index-root bg-color-white">

    <q-splitter v-model="splitterModel" unit="px" disable style="height: 100%;"
                v-if="store.recommends.length > 0 || isRequest">
      <template v-slot:before>
        <div class="item-list">
          <div class="row justify-end items-center">
            <img class="icon-refresh" src="../assets/menu/refresh.svg" @click="requestRecommendList">
          </div>
          <div class="text-label text-major-color"> Trend </div>
          <div class="text-sub-label text-minor-color"></div>
          <q-scroll-area class="list-view">
            <div v-for="item in store.recommends" :key="item.entry_id">
              <trend-entry-view :recommend="item" :selected="item.entry_id === recommendRef?.entry_id"/>
              <q-separator />
            </div>
            <footer-loading-component :has-data="false"/>
          </q-scroll-area>
        </div>
      </template>

      <template v-slot:after>
        <div class="column items-center justify-center" style="height: 100vh;">
          <!-- <div class="entry-content text-minor-color" v-html="recommendRef.content"  v-if="recommendRef"/> -->
          <trend-detail v-if="recommendRef" :item="recommendRef" @goPageAction="pushToRecommend"/>
          <div class="text-7A7A7A column items-center justify-center" v-else>
            <BtIcon class="q-mb-lg" src="itemSelect" :width="215" :height="148"/>
            {{ 'No item selected.' }}
          </div>
        </div>
      </template>

    </q-splitter>
    <empty-view style="width:100%;height:100%" v-else/>
  </div>
</template>

<script lang="ts" setup>
import {useRssStore} from 'stores/rss';
import {onMounted, ref, watch} from 'vue';
import EmptyView from 'components/rss/EmptyView.vue';
import {Recommend} from 'src/types';
import TrendDetail from './trend/TrendDetailComponent.vue'
import {useRoute, useRouter} from 'vue-router';
import TrendEntryView from 'components/rss/TrendEntryView.vue';
import FooterLoadingComponent from 'components/rss/FooterLoadingComponent.vue';
const Route = useRoute()
const router = useRouter()
const store = useRssStore();

const splitterModel = ref(400)
const isRequest = ref(false)

const recommendRef = ref<Recommend | undefined>()

function pushToRecommend(index: number) {
  let recommend = store.recommends[index];
  router.push({
    path: '/trend2/' + ('' + recommend.entry_id)
  });
}

onMounted(() => {
  requestRecommendList()
})

const requestRecommendList = async () => {
  store.recommends = []
  recommendRef.value = undefined
  isRequest.value = true
  await store.get_recommendList()
  isRequest.value = false
}

watch(
  () => Route.params.entry_id,
  (newValue, oldValue) => {
    console.log('newValue:', newValue, oldValue);
    console.log(Route.params);
    if (newValue == oldValue) {
      return;
    }

    let entry_id = Number(newValue);
    recommendRef.value = undefined
    setTimeout(() => {
      recommendRef.value = store.recommends.find((recommend) => recommend.entry_id == entry_id);
    }, 0);
  }
);

</script>

<style lang="scss" scoped>
.index-root {
  height: 100%;

  .item-list {

    border-right: 1px solid #ececec;
    height: 100%;
    overflow: auto;
    width: 100%;

    .icon-read-all {
      width: 20px;
      height: 20px;
      margin-right: 12px;
      margin-top: 22px;
    }

    .icon-refresh {
      width: 20px;
      height: 20px;
      margin-right: 16px;
      margin-top: 22px;
    }

    .text-label {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      margin-top: 16px;
      margin-left: 16px;
      font-size: 16px;
      line-height: 16px;
    }

    .text-sub-label {
      margin-top: 8px;
      margin-left: 16px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
    }

    .list-view {
      margin-top: 8px;
      height: calc(100% - 80px);
    }

    .entry {
      width: 100%;
    }

  }
}
</style>
