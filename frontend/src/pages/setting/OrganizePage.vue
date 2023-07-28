<template>
  <div class="folder-setting-root bg-color-white justify-start items-center">
    <div class="top-layout row justify-between items-center">
      <div class="row">
        <span class="text-title"
              :class="organizeType === ORGANIZE_TYPE.FEED ? 'text-major-color' : 'text-minor-color'"
              style="margin-left: 16px"
              @click="changeType(ORGANIZE_TYPE.FEED)">Feeds</span>
        <span class="text-title"
              :class="organizeType === ORGANIZE_TYPE.CATEGORY ? 'text-major-color' : 'text-minor-color'"
              @click="changeType(ORGANIZE_TYPE.CATEGORY)"
              style="margin-left: 34px">Folders</span>
        <span class="text-title"
              :class="organizeType === ORGANIZE_TYPE.BASIC ? 'text-major-color' : 'text-minor-color'"
              @click="changeType(ORGANIZE_TYPE.BASIC)"
              style="margin-left: 34px">Basic</span>
      </div>
      <!--      <div class="row justify-end items-center">-->
      <!--        <img class="icon-end" src="../assets/menu/input.svg">-->
      <!--        <img class="icon-end" src="../assets/menu/output.svg">-->
      <!--      </div>-->
    </div>
    <div class="manager-layout column justify-start" v-if="organizeType === ORGANIZE_TYPE.BASIC">
      <basic-setting-page/>
    </div>
    <div class="manager-layout column justify-start" v-else>
      <div class="selected-layout row justify-start items-center"
           v-show="organizeType === ORGANIZE_TYPE.FEED">

        <q-btn-dropdown
          dropdown-icon="img:/imgs/arrow-down.svg"
          class="select-view"
          :ripple="false"
          no-caps
          dense
          menu-self="top left"
          menu-anchor="bottom start"
          :menu-offset="[0, 5]"
          unelevated>
          <template v-slot:label>
            <div
              class="row items-center no-wrap justify-between"
              style="width: 120px">
              <div class="normal-item">{{ folderRef }}</div>
            </div>
          </template>
          <q-list class="rounded-borders">
            <q-item
              v-for="contentMode in folderOptionsRef"
              :key="contentMode"
              clickable
              v-close-popup
              @click="folderChanged(contentMode)">
              <q-item-section>
                <q-item-label :class="contentMode === folderRef ? 'text-primary-color' : 'text-major-color'"
                              class="normal-item">
                  {{ contentMode }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

        </q-btn-dropdown>

        <search-view
          class="search-view"
          placeholder="Search Feeds Name/URL"
          @onSearch="searchChanged"/>
      </div>
      <organize-title/>
      <q-scroll-area
        :class="organizeType === ORGANIZE_TYPE.FEED ? 'scroll-area-feed' : 'scroll-area-folder'"
        v-if="!forceRefresh && organizeStore.organizeData.dataList.length > 0">
        <q-list>
          <organize-item
            :key="item.getType() + item.getId()"
            v-for="item in organizeStore.organizeData.dataList"
            :data="item"/>
        </q-list>
      </q-scroll-area>

      <empty-view
        :class="organizeType === ORGANIZE_TYPE.FEED ? 'scroll-area-feed' : 'scroll-area-folder'"
        v-else/>
      <div
        style="position: absolute; bottom: 20px; width: 100%"
        class="row justify-center items-center">
        <!--      <q-pagination-->
        <!--        glossy-->
        <!--        gutter="10px"-->
        <!--        v-model="pagination"-->
        <!--        max="20"-->
        <!--        max-pages="7"-->
        <!--        direction-links-->
        <!--        outline-->
        <!--        boundary-numbers-->
        <!--        color="grey-5"-->
        <!--        active-design="outline"-->
        <!--        active-color="white"-->
        <!--        active-text-color="green"-->
        <!--      />-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchView from 'components/rss/SearchView.vue';
import {onMounted, ref, watch} from 'vue';
import {useRssStore} from 'stores/rss';
import OrganizeItem from 'components/rss/OrganizeItem.vue';
import OrganizeTitle from 'components/rss/OrganizeTitle.vue';
import {useOrganizeStore} from 'stores/organize';
import {ORGANIZE_TYPE} from 'stores/organizeConfig';
import EmptyView from 'components/rss/EmptyView.vue';
import {newsBus, newsBusMessage} from 'src/utils/utils'
import BasicSettingPage from 'pages/setting/BasicSettingPage.vue';

const store = useRssStore();
const folderOptionsRef = ref<string[]>([]);
const folderRef = ref('All Folders');
// const pagination = ref(8);
const organizeStore = useOrganizeStore();
let searchData = '';
const organizeType = ref<ORGANIZE_TYPE>(ORGANIZE_TYPE.FEED);

function changeType(type: ORGANIZE_TYPE) {
  organizeType.value = type
  if (type === ORGANIZE_TYPE.BASIC) {
    return
  }
  organizeStore.changeType(type, folderRef.value, searchData)
}

function updateData() {
  folderOptionsRef.value = store.categories.map((value) => {
    return value.title;
  });
  folderOptionsRef.value.push('All Folders');
  organizeStore.updateList(folderRef.value, searchData);
}

function folderChanged(title: string) {
  folderRef.value = title;
  organizeStore.updateList(folderRef.value, searchData);
}

function searchChanged(data: string) {
  searchData = data;
  organizeStore.updateList(folderRef.value, searchData);
}

const forceRefresh = ref(false)

watch(
  () => [store.categories, store.feeds],
  () => {
    updateData()
    forceRefresh.value = false
  },
  {
    deep: true,
    immediate: true,
  }
);

newsBus.on(newsBusMessage.feedRefresh, () => {
  forceRefresh.value = true
})

onMounted(async () => {
  if (organizeStore.organizeData.type === ORGANIZE_TYPE.BLACKLIST){
    organizeStore.changeType(ORGANIZE_TYPE.FEED, folderRef.value, searchData)
  }else {
    await store.refresh_category_and_feeds()
  }
})

</script>

<style lang="scss" scoped>
.folder-setting-root {
  height: 100vh;
  width: 100%;

  .top-layout {
    width: 100%;
    height: 50px;

    .text-title {
      margin-top: 22px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }

    .icon-end {
      height: 20px;
      width: 20px;
      margin-right: 16px;
      margin-top: 22px;
    }
  }

  .manager-layout {
    width: 100%;
    height: calc(100% - 50px);

    .selected-layout {
      margin-top: 16px;

      .select-view {
        height: 32px;
        width: 200px;
        margin-left: 16px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
      }

      .search-view {
        width: 200px;
        margin-left: 12px;
      }
    }

    .scroll-area-feed {
      height: calc(100% - 143px);
      width: 100%;
    }

    .scroll-area-folder {
      height: calc(100% - 94px);
      width: 100%
    }

  }
}

.normal-item {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
}
</style>
