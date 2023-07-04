<template>
  <div class="discover-detail-root ">
    <title-commonent :backTitle="`#${category}`" @back-action="backAction()" />
    <title-commonent :backTitle="`#${category}`" v-show="titleViewFixedRef" class="model2 bg-color-white"
      @back-action="backAction()" />
    <div class="section-title text-minor-color " style="margin-top:2px" v-if="reletedTopics.length > 0">
      Releted Topics
    </div>
    <div class="row justify-start" v-if="reletedTopics.length > 0">
      <q-intersection v-for="item, index in reletedTopics" :key="index">
        <div class="relate-topic-item text-minor-color ">
          {{ item.title }}
        </div>
      </q-intersection>
    </div>

    <div class="section-title text-minor-color " style="margin-top:24px" v-if="searchResults.length > 0">
      Search Result
    </div>

    <q-list class="search-result-list" v-if="searchResults.length > 0">
      <SearchFeedComponent v-for="item, index in searchResults" :key="index" :feed="item"></SearchFeedComponent>
      <div class="row justify-center full-width no-more-result text-major-color">
        No More Result &nbsp;
        <a href="javascript:;" @click="jumpToSearch()" style="color:#1B87F4"> Try other Topices </a>
      </div>
    </q-list>
    <div class="text-7A7A7A column items-center justify-center" v-else style="height: 300px;">
      <BtIcon class="q-mb-lg" src="itemSelect" :width="215" :height="148"/>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { RecommendFeed } from 'src/types';
import { ref } from 'vue';
import TitleCommonent from '../../components/TitleCommonent.vue'
import { useQuasar } from 'quasar';
import AddFeedDialog from 'components/dialog/AddFeedDialog.vue';
// import { useRssStore } from 'src/stores/rss';
import SearchFeedComponent from '../common/SearchFeedComponent.vue'

defineProps({
  category: {
    type: String,
    require: false,
    default: ''
  }
})

const emit = defineEmits(['backAction'])

const backAction = () => {
  searchResults.value = []
  titleViewFixedRef.value = false
  emit('backAction')
}

const jumpToSearch = () => {
  backAction()
}

const reletedTopics = ref<{ title: string }[]>([])


const searchResults = ref<RecommendFeed[]>([])

const titleViewFixedRef = ref(false)

const floatTitleView = (floatValue: boolean) => {
  titleViewFixedRef.value = floatValue
}

const reloadFeed = (feeds: RecommendFeed[]) => {
  searchResults.value = feeds
}

// const reloadDefault = () => {
  // searchResults.value = [
  //   {
  //     title: 'Blockchain News',
  //     url: 'www.sspai.com',
  //     logo: 'examples/blocchain_example.png',
  //     subsribeUrl: '',
  //     isSubsribe: false,
  //     details: [
  //       {
  //         content: 'Leading source for news, information & resources for the Connected Generation.',
  //         time: '1 mins ago'
  //       },
  //       {
  //         content: 'Leading source for news, information & resources for the Connected Generation.',
  //         time: '1 mins ago'
  //       },
  //       {
  //         content: 'Leading source for news, information & resources for the Connected Generation.',
  //         time: '1 mins ago'
  //       }
  //     ]
  //   }
  // ]
  // reletedTopics.value = [
  //   {
  //     title: '# Cryptocurrency'
  //   },
  //   {
  //     title: '# dddsssaaa'
  //   },
  //   {
  //     title: '# Ethereum'
  //   },
  //   {
  //     title: '# Web3'
  //   },
  //   {
  //     title: '# Cryptocurrency'
  //   }
  // ]
// }
// reloadDefault()

const $q = useQuasar()
const addToFeed = (url: string) => {
  $q.dialog({
    component: AddFeedDialog,
    componentProps: {
      text: url
    }
  })
    .onOk(() => {
      console.log('OK');
      emit('backAction')
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
      //     });
    })
}


defineExpose({ floatTitleView, reloadFeed });

</script>

<style scoped lang='scss'>
.discover-detail-root {
  width: 100%;
  // background-color: red;

  .section-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
  }

  .model2 {
    top: 0;
    position: fixed;
    width: calc(100% - 240px);
    z-index: 999;
  }

  .relate-topic-item {
    background: rgba(26, 19, 15, 0.05);
    border-radius: 6px;
    padding: 10px 16px;
    margin-right: 12px;
    margin-top: 12px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
  }

  .search-result-list {
    margin-top: 16px;
    width: 100%;
    padding-bottom: 40px;
  }
}

.no-more-result {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}
</style>
