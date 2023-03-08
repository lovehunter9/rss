<template>
  <div class="itemView111 ">
    <div v-if="item">
      <div v-html="entry" class="html-content"></div>
      <!-- <article role="article" dir="auto" v-html="entry" class="html-content"></article> -->
    </div>
    <div v-else></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watch,
  onMounted,
  nextTick,
  PropType
} from 'vue';
import { useRssStore } from '../stores/rss';
//import { extend } from 'quasar'
import { Dialog, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import {
  Category,
  CategoryRequest,
  Feed,
  FeedCreationRequest,
  FeedCounters,
  Entry,
  EntriesQueryRequest,
  EntriesQueryResponse,
  EntryContent
} from '../types';

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
    const $q = useQuasar();
    const Router = useRouter();
    const store = useRssStore();

    let entry = ref<string>('');

    async function updateEntry(newVal: Entry) {
      entry.value = formatRichText(newVal.content);
      store.update_entry_content(newVal.id, newVal.content);

      let id = newVal.id;

      let k = await store.fetch_entry_content(id);
      console.log(k);
      if (k != undefined) {
        entry.value = formatRichText(k);
      }

      //rssStore.entries.find((e) => e.id === id);
      console.log(entry.value);
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


    function formatRichText(html: string) {
      let newContent = html.replace(/<img[^>]*>/gi, function (match) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
      });
      newContent = newContent.replace(/style="[^"]+"/gi, function (match) {
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
      });
      newContent = newContent.replace(/<br[^>]*\/>/gi, '');
      newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
      return newContent;
    }

    //const

    return {
      entry,
      store
    };
  }
});
</script>

<style lang="scss" scoped>
.itemView111 {
  height: 100vh;
  overflow: auto;
  width: 100%;
}

.html-content {
  // overflow-wrap: break-word;
  width: 100%;
  padding: 20px;
  font-size: 15px;
  // white-space:nowrap;
  // background-color: red;
  word-break: break-all;
}

</style>
