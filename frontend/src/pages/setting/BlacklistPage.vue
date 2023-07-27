<template>
  <div class="black-root">
    <div class="black-header row justify-start items-center">
      <img class="black-icon" src="../../assets/menu/back_gray_arrow.svg" :width="9" :height="16" @click="goBack">
      <div class="black_title">Blacklist</div>
    </div>
    <blacklist-title v-if="organizeStore.organizeData.dataList.length > 0"/>
    <q-list v-if="organizeStore.organizeData.dataList.length > 0">
      <blacklist-item v-for="item in organizeStore.organizeData.dataList" :key="item.getId()" :item="item"/>
    </q-list>
    <empty-view class="empty-view justify-center items-center" title="No Blacklist"
                content="Blacklisted articles will not be recommended to you" :add-feed="false" v-else/>
  </div>
</template>

<script lang="ts" setup>
import BlacklistItem from 'components/rss/BlacklistItem.vue';
import BlacklistTitle from 'components/rss/BlacklistTitle.vue';
import {onMounted, watch} from 'vue';
import {useRssStore} from 'stores/rss';
import {useOrganizeStore} from 'stores/organize';
import {ORGANIZE_TYPE} from 'stores/organizeConfig';
import EmptyView from 'components/rss/EmptyView.vue';
import {useRouter} from 'vue-router';

const store = useRssStore()
const organizeStore = useOrganizeStore()
const router = useRouter()

onMounted(async () => {
  await store.get_blacklist()
  organizeStore.changeType(ORGANIZE_TYPE.BLACKLIST, '', '');
})

watch(
  () => [store.blacklist],
  () => {
    organizeStore.updateList('', '');
  },
  {
    deep: true,
    immediate: true,
  }
);

const goBack = () => {
  router.back()
}

</script>

<style lang="scss" scoped>

.black-root {
  width: 100%;
  height: 100vh;

  .black-header {
    padding-top: 20px;
    padding-left: 16px;
    height: 70px;

    .black-icon {
      width: 20px;
      height: 20px;
    }

    .black_title {
      margin-left: 16px;
      color: #1A130F;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 125% */
    }

  }

  .empty-view {
    width: 100%;
    height: calc(100% - 70px);
  }
}

</style>
