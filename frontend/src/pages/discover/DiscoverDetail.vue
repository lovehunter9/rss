<template>
  <div class="discover-detail-root">
    <title-commonent backTitle="#blockchain" @back-action="backAction()"/>
    <title-commonent backTitle="#blockchain" v-show="titleViewFixedRef" class="model2" @back-action="backAction()"/>
    <div class="section-title" style="margin-top:2px">
      Releted Topics
    </div>
    <div class="row justify-start">
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
      <q-item v-for="item, index in searchResults" :key="index" class="search-result-item column">
        <div class="item-header">
          <div class="row justify-between items-center" style="width:100%;height:48px">
            <div class="item-total-info row items-center justify-start">
              <img src="../../assets/examples/blocchain_example.png" :width="48" :height="48" />
              <div class="item-total">
                <div class="item-name">
                  {{ item.title }}
                </div>
                <div class="item-url">
                  {{ item.url }}
                </div>
              </div>
            </div>
            <div class="row justify-center items-center subscribe-btn">
              <img src="../../assets/menu/subsribe.svg" :width="16" :height="16"/>
              <div class="subscribe-title">
                Subscribe
              </div>
            </div>
          </div>
        </div>
        <div class="item-content row justify-between">
          <div v-for="content, indexj in item.details" :key="indexj" style="width: calc(100%/3 - 16px);margin-left: 8px;margin-right: 8px;">
            <div class="item-content-content">
              {{ content.content }}
            </div>

            <div class="item-conente-time">
              {{ content.time }}
            </div>
           </div>
        </div>
      </q-item>
      <div class="row justify-center full-width no-more-result">
        No More Result &nbsp;
        <a href="javascript:;" @click="jumpToSearch()" style="color:#1B87F4"> Try other Topices </a>
      </div>
    </q-list>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import TitleCommonent from '../../components/TitleCommonent.vue'

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
  },
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
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
  },
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
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
  },
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
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
  },
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
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
  },
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
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

defineExpose({ floatTitleView });

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

  .search-result-item {
    border: 1px solid #E0E0E0;
    border-radius: 6px;
    // width: 100%;
    padding: 0;
    margin-bottom: 16px;
    // background-color: red;

    .item-header {
      width: calc(100% - 32px);
      margin: 16px;
      height: 48px;
      // background-color: red;


      .item-total-info {

        .item-total {
          margin-left: 15px;
        }

        .item-name {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: #1A130F;
        }

        .item-url {
          margin-top: 4px;
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          color: #847C77;
        }
      }


      .subscribe-btn {
        // width:110px;
        padding: 8px 18px;
        // height: 32px;
        border: 1px solid #E0E0E0;
        border-radius: 6px;
      }

      .subscribe-title {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #FF8642;
        margin-left: 8px;
      }
    }

    .item-content {
      width: 100%;
      padding-left: 8px;
      padding-right: 8px;
      // height: 200px;
      // background-color: red;
      margin-bottom: 24px;

      .item-content-content {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #847C77;
      }

      .item-conente-time {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #847C77;
        margin-top: 8px;
      }
    }
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
