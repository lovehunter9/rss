<template>
  <div class="folder-setting-root justify-start items-center">
    <div class="top-layout row justify-between items-center">
      <div class="row">
        <span :class="organizeStore.organizeData.type === ORGANIZE_TYPE.FEED ? 'text-title-active' : 'text-title'"
              style="margin-left: 16px"
              @click="changeType(ORGANIZE_TYPE.FEED)">Organize Feeds</span>
        <span :class="organizeStore.organizeData.type === ORGANIZE_TYPE.CATEGORY ? 'text-title-active' : 'text-title'"
              @click="changeType(ORGANIZE_TYPE.CATEGORY)"
              style="margin-left: 34px">Organize Folders</span>
      </div>
      <!--      <div class="row justify-end items-center">-->
      <!--        <img class="icon-end" src="../assets/menu/input.svg">-->
      <!--        <img class="icon-end" src="../assets/menu/output.svg">-->
      <!--      </div>-->
    </div>
    <div class="selected-layout row justify-start items-center" v-show="organizeStore.organizeData.type === ORGANIZE_TYPE.FEED">

      <q-btn-dropdown
        dropdown-icon="img:/imgs/arrow-down.svg"
        class="select-view"
        :ripple="false"
        no-caps
        menu-self="top left"
        menu-anchor="bottom start"
        :menu-offset="[0, 5]"
        unelevated
      >
        <template v-slot:label>
          <div
            class="row items-center no-wrap justify-between"
            style="width: 120px"
          >
            <div class="select-title-item">{{ folderRef }}</div>
          </div>
        </template>
        <q-list class="rounded-borders">
          <q-item
            v-for="contentMode in folderOptionsRef"
            :key="contentMode"
            clickable
            v-close-popup
            @click="folderChanged(contentMode)"
          >
            <q-item-section>
              <q-item-label
                :class="
                  contentMode === folderRef ? 'selected-item' : 'normal-item'
                "
              >
                {{ contentMode }}
              </q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>

      </q-btn-dropdown>

      <search-view
        class="search-view"
        placeholder="Search Feeds Name/URL"
        @onSearch="searchChanged"
      />
    </div>
    <feed-title/>
    <q-list>
      <feed-item
        :key="item.getType() + item.getId()"
        v-for="item in organizeStore.organizeData.dataList"
        :data="item"
      />
    </q-list>
    <div
      style="position: absolute; bottom: 20px; width: 100%"
      class="row justify-center items-center"
    >
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
</template>

<script lang="ts" setup>
import SearchView from 'components/rss/SearchView.vue';
import {ref, watch} from 'vue';
import {useRssStore} from 'stores/rss';
import FeedItem from 'components/rss/OrganizeItem.vue';
import FeedTitle from 'components/rss/OrganizeTitle.vue';
import {useOrganizeStore} from 'stores/organize';
import {ORGANIZE_TYPE} from 'stores/organizeConfig';

const store = useRssStore();
const folderOptionsRef = ref<string[]>([]);
const folderRef = ref('All Folders');
const pagination = ref(8);
const organizeStore = useOrganizeStore();
let searchData = '';

updateData();

function changeType(type: ORGANIZE_TYPE) {
  console.log(type)
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

watch(
  () => [store.categories, store.feeds],
  () => {
    updateData();
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.folder-setting-root {
  background-color: #ffffff;
  height: 100vh;
  width: 100%;

  .top-layout {
    width: 100%;

    .text-title-active {
      margin-top: 22px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #1a130f;
    }

    .text-title {
      margin-top: 22px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #857C77;
    }

    .icon-end {
      height: 20px;
      width: 20px;
      margin-right: 16px;
      margin-top: 22px;
    }
  }

  .selected-layout {
    margin-top: 16px;

    .select-view {
      height: 32px;
      width: 200px;
      margin-left: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;

      .select-title-item {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        color: #1a130f;
      }
    }

    .search-view {
      width: 200px;
      margin-left: 12px;
    }
  }
}

.selected-item {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #FF8642;
}

.normal-item {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #1a130f;
}
</style>
