<template>
  <q-dialog
    class="delete-root text-center"
    ref="dialogRef"
    @hide="onDialogHide">
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
          <q-checkbox dense size="md" class="check-box" v-model="categoryRef" :label="feed.category.title"
                      color="orange"/>

          <div class="edit-label">Folders</div>
          <q-checkbox v-for="item in categoriesRef" v-model="item.selected" :key="item.id" dense size="md"
                      class="check-box" color="orange"
                      :label="item.title"/>

          <div class="folder-layout row justify-start items-center" @click="addFolder">
            <q-icon name="img:/imgs/createnewfolder.svg" size="16px"/>
            <div class="text-folder">Create New Folder</div>
          </div>

          <div class="edit-title">Title</div>
          <edit-view class="edit-view" :text="feed.title" :is-read-only="true"/>

          <div class="edit-title">External URL</div>
          <edit-view class="edit-view" :text="feed.site_url" :is-read-only="true"/>

          <div class="edit-title">RSS URL</div>
          <edit-view class="edit-view" :text="feed.feed_url" :is-read-only="true"/>

          <q-expansion-item dense class="expansion-layout">

            <template v-slot:header>
              <div class="text-more row justify-start items-center">
                <div>Advanced Settings</div>
              </div>
            </template>

            <div class="column justify-start items-start" style="width: 100%;">

              <div class="edit-title">Feed username</div>
              <edit-view class="edit-view" :text="feed.username" :is-read-only="true" placeholder="Feed username"/>

              <div class="edit-title">Feed Password</div>
              <edit-view class="edit-view" :text="feed.password" :is-read-only="true" placeholder="Feed Password"/>

              <div class="edit-title">Override Default User Agent</div>
              <edit-view class="edit-view" :text="feed.user_agent" :is-read-only="true" placeholder="Override Default User Agent"/>

              <div class="edit-title">Set Cookies</div>
              <edit-view class="edit-view" :text="feed.cookie" :is-read-only="true" placeholder="Set Cookies"/>

              <div class="edit-title">Scraper Rules</div>
              <edit-view class="edit-view" :text="feed.scraper_rules" :is-read-only="true" placeholder="Scraper Rules"/>

              <div class="edit-title">Rewrite Rules</div>
              <edit-view class="edit-view" :text="feed.rewrite_rules" :is-read-only="true" placeholder="Rewrite Rules"/>

              <div class="edit-title">Block Rules</div>
              <edit-view class="edit-view" :text="feed.blocklist_rules" :is-read-only="true" placeholder="Block Rules"/>

              <div class="edit-title">Keep Rules</div>
              <edit-view class="edit-view" :text="feed.keeplist_rules" :is-read-only="true" placeholder="Keep Rules"/>

              <div class="edit-title">URL Rewrite Rules</div>
              <edit-view class="edit-view" :text="feed.urlrewrite_rules" :is-read-only="true" placeholder="URL Rewrite Rules"/>

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
                <div class="text-bottom">·Etag header:{{feed.etag_header}}</div>
                <div class="text-bottom">·LastModified header:{{feed.last_modified_header}}</div>
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
import {Category, CategoryRequest, Feed} from 'src/types';
import {useRssStore} from 'stores/rss';
import EditView from 'components/rss/EditView.vue';
import {create_category} from 'src/api/api';

const props = defineProps({
  feed: {
    type: Object as PropType<Feed>,
    require: true,
  }
})

const store = useRssStore();
const $q = useQuasar();
const categoryRef = ref(true)
const categoriesRef = ref<any[]>([])

const fetchOriginalRef = ref(false)
const httpCacheRef = ref(false)
const selfSignedRef = ref(false)
const notRefreshFeedRef = ref(false)
const hideEntriesRef = ref(false)

const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent();

updateCategories();

function updateCategories() {
  categoriesRef.value = []
  store.categories.forEach((category: Category) => {
    if (props.feed) {
      if (category.id !== props.feed.category.id) {
        categoriesRef.value.push(
          {
            ...category,
            selected: false
          })
      }
    }
  })
  console.log(categoriesRef.value)
}

function addFolder() {
  $q.dialog({
    title: 'Add New Folder',
    message: 'What is folder name',
    prompt: {
      model: '',
      isValid: (val) => val.length > 0, // << here is the magic
      type: 'text' // optional
    },
    cancel: true,
    persistent: true
  }).onOk(async (data: string) => {
    console.log('>>>> OK, received', data);

    await create_category({title: data} as CategoryRequest);
    await store.refresh_category_and_feeds();
    updateCategories();
  });
}

function onConfirm() {
  console.log(categoriesRef.value)
  categoriesRef.value.forEach((value) => {
    if (value.selected) {

    } else {

    }
  })
  onDialogOK()
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

  .expansion-layout{
    width: 100%;
    margin-top: 12px;
    padding-left: 0;

    .text-more{
      font-family: 'Roboto';
      margin-left: -14px;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      text-decoration-line: underline;
      color: #1B87F4;
    }

    .bottom-background{
      width: 100%;
      text-align: left;
      padding: 16px;
      margin-top: 23px;
      background: rgba(26, 19, 15, 0.05);
      border-radius: 6px;

      .text-bottom{
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

