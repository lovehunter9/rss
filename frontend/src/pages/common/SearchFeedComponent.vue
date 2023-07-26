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
        <subscribe-feed :feed-url="feed.feed_url"/>
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
import {RecommendFeed} from 'src/types'
import SubscribeFeed from 'components/rss/SubscribeFeed.vue';

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

defineProps({
  feed: {
    type: Object as PropType<RecommendFeed>,
    required: true
  }
})

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
