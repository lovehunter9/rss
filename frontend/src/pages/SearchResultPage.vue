<template>
  <div class="index-root bg-color-white">
    <q-splitter v-model="splitterModel" unit="px" disable style="height: 100%;"
                v-if="rssStore.searchResult.length > 0">
      <template v-slot:before>
        <div class="item-list">
          <div class="text-label text-major-color"> Search </div>
          <div class="text-sub-label text-minor-color"></div>
          <q-scroll-area class="list-view">
            <div v-for="item in rssStore.searchResult" :key="item.entry_id">
              <q-item clickable dense manualFocus :active="item.entry_id === selectSearchItem.entry_id" activeClass="itemActiveStyle" @click="itemOnClick(item)">
                <q-item-section>
                  {{ item.name }}
                </q-item-section>
              </q-item>
              <q-separator />
            </div>
          </q-scroll-area>
        </div>
      </template>

      <template v-slot:after>
        <div class="column items-center justify-center" style="height: 100vh;">
          <div class="entry-content text-minor-color" v-html="selectSearchItem.snippet"  v-if="selectSearchItem"/>
          <!-- <TrendDetail v-if="selectRecommendRef" :item="selectRecommendRef" @goPageAction="goIndex"/>-->
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
import {onMounted, ref} from 'vue';
import EmptyView from 'components/rss/EmptyView.vue';
import { RssContentQueryItem } from 'src/types';
import { useRoute } from 'vue-router';

const rssStore = useRssStore();

const splitterModel = ref(400)
const Route = useRoute()

const selectSearchItem = ref<RssContentQueryItem>(rssStore.searchResult[0])

onMounted(() => {
  const entry_id = Route.params.entry_id

  const searchItem = rssStore.searchResult.find( e => e.entry_id === Number(entry_id))

  if (searchItem) {
    selectSearchItem.value = searchItem
  }

})

const itemOnClick = (item: RssContentQueryItem) => {
  selectSearchItem.value = item
}

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

      .itemActiveStyle {
        color: $main-style;
      }
    }

    .entry {
      width: 100%;
    }

  }
}
</style>
