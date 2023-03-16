<template>
  <q-dialog
    class="delete-root text-center"
    ref="dialogRef"
    >
    <q-card class="q-dialog-plugin">
      <div class="text-title">Edit Feed</div>
      <img class="icon-close" src="../../assets/menu/close.svg" @click="onDialogCancel">

      <q-scroll-area style="height: 478px">

        <div class="column justify-start items-start">

          <div class="selected-button row justify-start items-center">
            <img class="button-icon" :src="store.feeds_icon[feed.id].data"/>
            <div class="button-text">{{ feed.title }}</div>
          </div>

          <div class="edit-label">Added in</div>
          <q-checkbox dense size="md" class="check-box" v-model="parentCategoryRef" :label="feed.category.title"
                      color="orange" disable />

          <div class="edit-label">Folders</div>
          <q-checkbox v-for="item in categoriesRef" v-model="item.selected" :key="item.id" dense size="md"
                      class="check-box" color="orange" :label="item.data.title" @update:model-value="setSelected(item)"/>

          <div class="folder-layout row justify-start items-center" @click="addFolder">
            <q-icon name="img:/imgs/createnewfolder.svg" size="16px"/>
            <div class="text-folder">Create New Folder</div>
          </div>

          <div class="edit-title">Title</div>
          <edit-view class="edit-view" :text="model.title" emit-key="title" @input="onInput"/>

          <div class="edit-title">External URL</div>
          <edit-view class="edit-view" :text="model.site_url" emit-key="site_url" @input="onInput"/>

          <div class="edit-title">RSS URL</div>
          <edit-view class="edit-view" :text="model.feed_url" emit-key="feed_url" @input="onInput"/>

          <q-expansion-item dense class="expansion-layout">

            <template v-slot:header>
              <div class="text-more row justify-start items-center">
                <div>Advanced Settings</div>
              </div>
            </template>

            <div class="column justify-start items-start" style="width: 100%;">

              <div class="edit-title">Feed username</div>
              <edit-view class="edit-view" :text="model.username" emit-key="username" placeholder="Feed username"
                         @input="onInput"/>

              <div class="edit-title">Feed Password</div>
              <edit-view class="edit-view" :text="model.password" emit-key="password" placeholder="Feed Password"
                         @input="onInput"/>

              <div class="edit-title">Override Default User Agent</div>
              <edit-view class="edit-view" :text="model.user_agent" emit-key="user_agent"
                         placeholder="Override Default User Agent"/>

              <div class="edit-title">Set Cookies</div>
              <edit-view class="edit-view" :text="model.cookie" emit-key="cookie" placeholder="Set Cookies"
                         @input="onInput"/>

              <div class="edit-title">Scraper Rules</div>
              <edit-view class="edit-view" :text="model.scraper_rules" emit-key="scraper_rules"
                         placeholder="Scraper Rules" @input="onInput"/>

              <div class="edit-title">Rewrite Rules</div>
              <edit-view class="edit-view" :text="model.rewrite_rules" emit-key="rewrite_rules"
                         placeholder="Rewrite Rules" @input="onInput"/>

              <div class="edit-title">Block Rules</div>
              <edit-view class="edit-view" :text="model.blocklist_rules" emit-key="blocklist_rules"
                         placeholder="Block Rules" @input="onInput"/>

              <div class="edit-title">Keep Rules</div>
              <edit-view class="edit-view" :text="model.keeplist_rules" emit-key="keeplist_rules"
                         placeholder="Keep Rules" @input="onInput"/>

              <div class="edit-title">URL Rewrite Rules</div>
              <edit-view class="edit-view" :text="model.urlrewrite_rules" emit-key="urlrewrite_rules"
                         placeholder="URL Rewrite Rules" @input="onInput"/>

              <q-checkbox dense size="md" class="check-box" v-model="fetchOriginalRef" label="Fetch original content"
                          color="orange"/>

              <q-checkbox dense size="md" class="check-box" v-model="httpCacheRef" label="Ignore HTTP cache"
                          color="orange"/>

              <q-checkbox dense size="md" class="check-box" v-model="selfSignedRef"
                          label="Allow self-signed or invalid certificates"
                          color="orange"/>

              <q-checkbox dense size="md" class="check-box" v-model="notRefreshFeedRef" label="Do not refresh this feed"
                          color="orange"/>

              <q-checkbox dense size="md" class="check-box" v-model="hideEntriesRef"
                          label="Hide entries in global unread lists"
                          color="orange"/>

              <div class="bottom-background">
                <div class="text-bottom">·Etag header:{{ feed.etag_header }}</div>
                <div class="text-bottom">·LastModified header:{{ feed.last_modified_header }}</div>
              </div>

            </div>
          </q-expansion-item>

        </div>

      </q-scroll-area>

      <div class="row justify-end items-end" style="width: 100%">
        <q-btn
          dense
          class="btn-confirm"
          label="Confirm"
          @click="onConfirm"/>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import {useDialogPluginComponent, useQuasar} from 'quasar';
import {PropType, ref} from 'vue';
import {Category, Feed, FeedModificationRequestImpl} from 'src/types';
import {useRssStore} from 'stores/rss';
import EditView from 'components/rss/EditView.vue';
import {OptionalCategory} from 'stores/organizeConfig';
import AddFolderDialog from 'components/dialog/AddFolderDialog.vue';

const props = defineProps({
  feed: {
    type: Object as PropType<Feed>,
    require: true,
  }
})

const store = useRssStore();
const $q = useQuasar();
const parentCategoryRef = ref(true)
const categoriesRef = ref<OptionalCategory[]>([])

const fetchOriginalRef = ref(false)
const httpCacheRef = ref(false)
const selfSignedRef = ref(false)
const notRefreshFeedRef = ref(false)
const hideEntriesRef = ref(false)

let selectedCategory :OptionalCategory | undefined = undefined
let model: FeedModificationRequestImpl | undefined = undefined;
if (props.feed) {
  model = new FeedModificationRequestImpl(props.feed)
  fetchOriginalRef.value = model.fetch_via_proxy
  httpCacheRef.value = model.ignore_http_cache
  selfSignedRef.value = model.allow_self_signed_certificates
  notRefreshFeedRef.value = model.crawler
  hideEntriesRef.value = model.hide_globally
}

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent();

updateCategories();

function onInput(key: string, value: string) {
  if (key && model) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    model[key] = value
  }
}

function setSelected(item : OptionalCategory){
  console.log(item)
  if (item.selected){
    selectedCategory =  item
    categoriesRef.value.forEach((category) => {
      if (category.data.id != item.data.id){
        category.setSelected(false)
      }
    })
    parentCategoryRef.value = false;
  } else {
    selectedCategory = undefined
    categoriesRef.value.forEach((category) => {
      category.setSelected(false)
    })
    parentCategoryRef.value = true;
  }
}

function updateCategories() {
  categoriesRef.value = []
  store.categories.forEach((category: Category) => {
    if (props.feed) {
      if (category.id !== props.feed.category.id) {
        categoriesRef.value.push(new OptionalCategory(category))
      }
    }
  })
}

function addFolder() {
  $q.dialog({
    component: AddFolderDialog,
    componentProps: {}
  })
    .onOk(async (data : string) => {
      console.log(data)
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
      //     });
    });
}

async function onConfirm() {
  console.log(model)
  if (props.feed && model) {
    model.fetch_via_proxy = fetchOriginalRef.value
    model.ignore_http_cache = httpCacheRef.value
    model.allow_self_signed_certificates = selfSignedRef.value
    model.crawler = notRefreshFeedRef.value
    model.hide_globally = hideEntriesRef.value
    if (selectedCategory){
      model.category_id = selectedCategory.getId()
    }
    await store.updateFeed(props.feed.id, model)
    onDialogOK()
  }
}

</script>

<style lang="scss" scoped>
.delete-root {
  .q-dialog__backdrop {
    background: rgba(0, 0, 0, 0.7);
  }

  .q-dialog-plugin {
    width: 500px;
    padding: 24px;
    border-radius: 12px;
  }

  .text-title {
    font-family: 'Roboto';
    margin-bottom: 24px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #1A130F;
  }

  .icon-close {
    position: absolute;
    right: 24px;
    top: 26px;
    height: 16px;
    width: 16px
  }

  .selected-button {
    padding: 8px 16px;
    height: 32px;
    width: fit-content;
    background-color: transparent;
    border: 1px solid #E0E0E0;
    border-radius: 6px;
    text-transform: capitalize;

    .button-icon {
      width: 16px;
      height: 16px;
    }

    .button-text {
      margin-left: 8px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #1A130F;
    }
  }

  .folder-layout {
    margin-top: 12px;

    .text-folder {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #1A130F;
      margin-left: 10px;
    }
  }

  .edit-label {
    margin-top: 24px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #857C77;
  }

  .check-box {
    margin-top: 12px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #847C77;
  }

  .edit-title {
    @extend .edit-label;
    margin-top: 12px;
  }

  .edit-view {
    margin-top: 4px;
  }

  .expansion-layout {
    width: 100%;
    margin-top: 12px;
    padding-left: 0;

    .text-more {
      font-family: 'Roboto';
      margin-left: -14px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      text-decoration-line: underline;
      color: #1B87F4;
    }

    .bottom-background {
      width: 100%;
      text-align: left;
      padding: 16px;
      margin-top: 23px;
      background: rgba(26, 19, 15, 0.05);
      border-radius: 6px;

      .text-bottom {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        /* or 167% */
        color: #1A130F;
      }
    }
  }

  .btn-confirm {
    text-transform: capitalize;
    width: 92px;
    height: 32px;
    background: #FF8642;
    border-radius: 6px;
    margin-top: 50px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #FFFFFF;

    &::before {
      box-shadow: none;
    }
  }

}
</style>

