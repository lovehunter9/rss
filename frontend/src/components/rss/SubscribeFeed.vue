<template>
  <div class="row justify-center items-center"
       :class="isSubscribedRef ? 'subscribe-btn-disabled' : 'subscribe-btn'"
       @click="addToFeed(feedUrl)">
    <img :src="isSubscribedRef ? getRequireImage('menu/subscribed.svg') : getRequireImage('menu/subscribe.svg')"
         :width="16" :height="16"/>
    <div class="subscribe-title text-primary-color">
      {{ isSubscribedRef ? 'Subscribed' : 'Subscribe' }}
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from 'vue';
import {useQuasar} from 'quasar';
import AddFeedDialog from 'components/dialog/AddFeedDialog.vue';
import {useRssStore} from 'stores/rss';
import {getRequireImage} from 'src/utils/utils';

const $q = useQuasar()

const props = defineProps({
  feedUrl: String
})

const isSubscribedRef = ref(false);
const store = useRssStore();

const emit = defineEmits(['onSubscribe'])

const hasSubscribed = () => {
  const feed = store.feeds.find((item) => {
    return item.feed_url === props.feedUrl
  })
  isSubscribedRef.value = !!feed
}

onMounted(() => {
  hasSubscribed()
})


const addToFeed = (url: string) => {
  $q.dialog({
    component: AddFeedDialog,
    componentProps: {
      text: url,
      isTrend : true
    }
  })
    .onOk(() => {
      console.log('OK');
      hasSubscribed()
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
    })
}

const setSubscribe = (subscribe: boolean) => {
  isSubscribedRef.value = subscribe
}

defineExpose({setSubscribe})

</script>

<style scoped lang="scss">

.subscribe-btn {
  padding: 8px 18px;
  border: 1px solid #E0E0E0;
  border-radius: 6px;

  .subscribe-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin-left: 8px;
  }

}

.subscribe-btn-disabled {
  padding: 8px 18px;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  pointer-events: none;

  .subscribe-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    color: #857C77;
    font-size: 12px;
    line-height: 14px;
    margin-left: 8px;
  }

}
</style>
