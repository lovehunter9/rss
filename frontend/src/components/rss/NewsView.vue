<template>
  <div class="news-root">
    <div class="row justify-between items-center detail-header">
      <div class="row justify-start">
        <img class="icon-start" src="../../assets/menu/backward.svg" @click="preAction">
        <img class="icon-start" src="../../assets/menu/forward.svg" @click="nextAction">
      </div>
      <div class="row justify-end items-center">
        <img class="icon-end" src="../../assets/menu/bookmark.svg">
        <img class="icon-end" src="../../assets/menu/save.svg">
        <img class="icon-end" src="../../assets/menu/share.svg">
      </div>
    </div>

    <div class="content-bg">

      <div class="row justify-between items-center">
        <div>
        {{ item.feed.title }}
      </div>
      <img class="entry-icon" :src="store.feeds_icon[item.feed_id].data">
      </div>
      <q-separator style="margin-top:16px"/>
      <div class="html-content" v-if="item">
        <div v-html="entry"></div>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  PropType
} from 'vue';
import { useRssStore } from 'stores/rss';
import { Entry } from 'src/types';
import { formatContentHtml, newsBus, newsBusMessage } from 'src/utils/utils'

export default defineComponent({
  name: 'ItemView',
  props: {
    item: {
      type: Object as PropType<Entry>,
      required: true
    }
  },
  components: {},
  setup(props, context) {
    if (context) {
    }
    const store = useRssStore();

    let entry = ref<string>('');

    async function updateEntry(newVal: Entry) {
      entry.value = formatContentHtml(newVal.content);
      store.update_entry_content(newVal.id, newVal.content);

      let id = newVal.id;

      let k = await store.fetch_entry_content(id);
      console.log(k);
      if (k != undefined) {
        entry.value = formatContentHtml(k);
      }

      //rssStore.entries.find((e) => e.id === id);
      // console.log(entry.value);
    }

    watch(
      () => props.item,
      async (newVal: Entry) => {
        if (!newVal) {
          entry.value = '';
          return;
        }
        updateEntry(newVal);
      }
    );

    onMounted(async () => {
      updateEntry(props.item);
      //store.get_local_entry(1);
    });

    const preAction = () => {
      if (!store.can_pre_route(props.item)) {
        return
      }
      newsBus.emit(newsBusMessage.pre)
    }

    const nextAction = () => {
      if (!store.can_next_route(props.item)) {
        return
      }
      newsBus.emit(newsBusMessage.next)
    }

    //const

    return {
      entry,
      store,
      preAction,
      nextAction
    };
  }
});
</script>

<style lang="scss" scoped>
.news-root {
  height: 100vh;
  width: 100%;
  // background-color: red;

  .detail-header {
    height: 68px;
  }

  .icon-end {
    height: 20px;
    width: 20px;
    margin-right: 16px;
    // margin-top: 22px;
  }

  .icon-start {
    height: 20px;
    width: 20px;
    margin-left: 16px;
    // margin-top: 22px;
  }

  .content-bg {
    width: 100%;
    margin-top: 10px;
    // height: 100px;
    // background-color: red;
    padding-left: 32px;
    padding-right: 32px;


    .entry-icon {
      width: 28px;
      height: 28px;
      // border-radius: 50%;
    }

    .html-content {
      margin-top: 20px;
      width: 100%;
      // padding-left: 32px;
      // padding-right: 32px;

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */


      color: #1A130F;
      word-break: break-all;
      padding-bottom: 30px;
      // padding-left: 0;
      // padding-right: 0;
      // background-color: red;
    }
  }


}
</style>
