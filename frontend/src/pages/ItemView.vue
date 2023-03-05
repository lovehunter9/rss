<template>
  <div class="itemView text-7A7A7A row items-center justify-center">
    <div v-if="item">
      <div v-html="entry"></div>
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
      entry.value = newVal.content;
      store.update_entry_content(newVal.id, newVal.content);

      let id = newVal.id;

      let k = await store.fetch_entry_content(id);
      console.log(k);
      if (k == null) {
      } else {
        entry.value = k;
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

    //const

    return {
      entry,
      store
    };
  }
});
</script>

<style lang="scss" scoped>
.itemView {
  height: 100vh;
  overflow: auto;
}
</style>
