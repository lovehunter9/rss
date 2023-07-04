<template>
  <q-item class="search-result-item column">
    <div class="item-header">
      <div class="row justify-between items-center" style="width:100%;height:48px">
        <div class="item-total-info row items-center justify-start">
          <!-- <img :src="getRequireImage(feed.icon_content || '')" :width="48" :height="48" /> -->
          <div v-if="feed.icon_content.length > 8" style="margin-right: 10px;">
          <img :src="'data:image/png;' + feed.icon_content" width="48" height="48">
            </div>
          <div class="item-total">
            <div class="item-name text-major-color">
              {{ feed.feed_title }}
            </div>
            <div class="item-url text-minor-color ">
              {{ feed.site_url }}
            </div>
          </div>
        </div>
        <div class="row justify-center items-center subscribe-btn"
          @click="addToFeed(feed.feed_url)">
          <img src="../../assets/menu/subsribe.svg" :width="16" :height="16" />
          <div class="subscribe-title text-primary-color">
            Subscribe
          </div>
        </div>
        <!-- <div class="subscribe-title text-primary-color" v-if="feed.isSubsribe">
          Subscribed
        </div> -->
      </div>
    </div>
    <!-- <div class="item-content row justify-between">
      <div v-for="content, indexj in feed.details" :key="indexj"
        style="width: calc(100%/3 - 16px);">
        <div class="item-content-content text-minor-color ">
          {{ content.content }}
        </div>

        <div class="item-conente-time text-minor-color ">
          {{ content.time }}
        </div>
      </div>
    </div> -->
    <q-separator color='#EDEEF6' />
  </q-item>
</template>

<script setup lang='ts'>
import { PropType } from 'vue';
// import { getRequireImage } from 'src/utils/utils'
import { useQuasar } from 'quasar';
import AddFeedDialog from 'components/dialog/AddFeedDialog.vue';
import {RecommendFeed} from 'src/types'

// interface SearchFeedInterface {
//   title: string,
//   logo: string,
//   url: string,
//   subsribeUrl: string,
//   isSubsribe: boolean,
//   details: {
//     content: string,
//     time: string
//   }[]
// }

const props = defineProps({
  feed: {
    type: Object as PropType<RecommendFeed>,
    required: true
  }
})

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
      // emit('backAction')
      // eslint-disable-next-line vue/no-mutating-props
      // props.feed.isSubsribe = true
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
      //     });
    })
}


</script>

<style scoped lang='scss'>
.search-result-item {
  // border: 1px solid #E0E0E0;
  border-radius: 6px;
  padding: 0;
  margin-bottom: 16px;

  .item-header {
    width: calc(100%);
    margin: 16px 0px;
    height: 48px;

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
      }

      .item-url {
        margin-top: 4px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
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
      margin-left: 8px;
    }
  }

  .item-content {
    width: 100%;

    margin-bottom: 24px;

    .item-content-content {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }

    .item-conente-time {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      margin-top: 8px;
    }
  }
}
</style>
