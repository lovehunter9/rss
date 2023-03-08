<template>
  <div class="root">
    <div class="row justify-between items-center">
      <div class="row justify-start items-center">
        <img class="icon-start" src="../../assets/menu/backward.svg">
        <img class="icon-start" src="../../assets/menu/forward.svg">
      </div>
      <div class="row justify-end items-center">
        <img class="icon-end" src="../../assets/menu/bookmark.svg">
        <img class="icon-end" src="../../assets/menu/save.svg">
        <img class="icon-end" src="../../assets/menu/share.svg">
      </div>
    </div>



    <div class="html-content" v-if="item">
      <div v-html="entry"></div>
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
import {useRssStore} from 'stores/rss';
import {Entry} from 'src/types';
import { formatContentHtml } from '../../utils/utils'

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


    //const

    return {
      entry,
      store
    };
  }
});
</script>

<style lang="scss" scoped>
.root {
  height: 100vh;
  width: 100%;

  .icon-end {
    height: 20px;
    width: 20px;
    margin-right: 16px;
    margin-top: 22px;
  }

  .icon-start {
    height: 20px;
    width: 20px;
    margin-left: 16px;
    margin-top: 22px;
  }

  .html-content {
    margin-top: 20px;
    // height: calc(100% - 74px);
    width: 100%;
    padding: 0;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* or 143% */


    color: #1A130F;
    word-break: break-all;
    // padding-left: 0;
    // padding-right: 0;
    // background-color: red;
  }
}
</style>
