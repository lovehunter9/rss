<template>
  <div class="discover-detail-root">
    <title-commonent backTitle="#blockchain" @back-action="backAction()"/>
    <title-commonent backTitle="#blockchain" v-show="titleViewFixedRef" class="model2" @back-action="backAction()"/>
    <div class="section-title" style="margin-top:2px" v-if="reletedTopics.length > 0">
      Releted Topics
    </div>
    <div class="row justify-start" v-if="reletedTopics.length > 0">
      <q-intersection v-for="item, index in reletedTopics" :key="index">
        <div class="relate-topic-item">
          {{ item.title }}
        </div>
      </q-intersection>
    </div>

    <div class="section-title" style="margin-top:24px">
      Search Result
    </div>

    <q-list class="search-result-list">
      <SearchFeedComponent v-for="item,index in searchResults" :key="index" :feed="item"></SearchFeedComponent>
      <div class="row justify-center full-width no-more-result">
        No More Result &nbsp;
        <a href="javascript:;" @click="jumpToSearch()" style="color:#1B87F4"> Try other Topices </a>
      </div>
    </q-list>
  </div>
</template>

<script setup lang='ts'>

import { SDKSearchPathResponse } from 'src/types';
import { ref } from 'vue';
import TitleCommonent from '../../components/TitleCommonent.vue'
import { useQuasar } from 'quasar';
import AddFeedDialog from 'components/dialog/AddFeedDialog.vue';
import { useRssStore } from 'src/stores/rss';
import SearchFeedComponent from '../common/SearchFeedComponent.vue'

const rssStore = useRssStore()

const emit = defineEmits(['backAction'])

const backAction = () => {
  // router.back()
  emit('backAction')
}

const jumpToSearch = () => {
  emit('backAction')
}

const reletedTopics = ref([
  {
    title:'# Cryptocurrency'
  },
  {
    title:'# dddsssaaa'
  },
  {
    title:'# Ethereum'
  },
  {
    title:'# Web3'
  },
  {
    title:'# Cryptocurrency'
  }
])


const searchResults = ref([
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
    logo: 'examples/blocchain_example.png',
    subsribeUrl: '',
    isSubsribe: false,
    details:[
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      }
    ]
  }
])

const titleViewFixedRef = ref(false)

const floatTitleView = (floatValue: boolean) => {
  console.log(floatValue);

  titleViewFixedRef.value = floatValue
}

const reloadFeed = (feed: SDKSearchPathResponse) => {
  reletedTopics.value = []
  const details = feed.item.length > 3 ? feed.item.slice(0,3) : feed.item
  searchResults.value = [
   {
    title: feed.title,
    url: feed.link,
    logo: feed.logo ? feed.logo : 'examples/blocchain_example.png',
    subsribeUrl: feed.atomlink,
    isSubsribe: rssStore.get_local_feed_by_feed_url(feed.atomlink) !== undefined,
    details: details.map(e => {
      return {
        content: e.title,
        time: e.pubDate
      }
    })
   }
  ]
}

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


defineExpose({ floatTitleView, reloadFeed});

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
    color: #857C77;
  }

  .model2 {
    top: 0;
		position: fixed;
    background-color: white;
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
    color: #847C77;
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
  color: #1A130F;
}


</style>
