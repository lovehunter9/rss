<template>
  <q-dialog
    class="delete-root text-center"
    ref="dialogRef"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="text-title">Reorganize Selected Feeds</div>
      <img class="icon-close" src="../../assets/menu/close.svg" @click="onDialogCancel">

      <q-scroll-area style="height: 478px">

        <div class="column justify-start items-start">

          <div class="edit-label">You've selected {{ props.feeds.length }} feeds</div>

            <div class="row items-start">
              <div class="selected-button row justify-start items-center" v-for="item in feeds" :key="item.id">
                <img class="button-icon" :src="store.feeds_icon[item.id].data"/>
                <div class="button-text">{{ item.title }}</div>
              </div>
          </div>

          <!--          <div class="edit-label">Added in</div>-->
          <!--          <q-checkbox dense size="md" class="check-box" v-model="categoryRef" :label="feed.category.title"-->
          <!--                      color="orange"/>-->

          <div class="edit-label">Folders</div>
          <q-checkbox v-for="item in categoriesRef" v-model="item.selected" :key="item.id" dense size="md"
                      class="check-box" color="orange"
                      :label="item.title"/>

          <div class="folder-layout row justify-start items-center" @click="addFolder">
            <q-icon name="img:/imgs/createnewfolder.svg" size="16px"/>
            <div class="text-folder">Create New Folder</div>
          </div>

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
import {CategoryRequest, Feed, FeedCreationRequest} from 'src/types';
import {useRssStore} from 'stores/rss';
import {create_category, create_feed, get_feeds} from 'src/api/api';

const props = defineProps({
  feeds: {
    type: Object as PropType<Feed[]>,
    require: true,
  }
})

const store = useRssStore();
const $q = useQuasar();
// const categoryRef = ref(true)
const categoriesRef = ref<any[]>([])

const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent();

updateCategories();

function updateCategories() {
  if (props.feeds) {
    categoriesRef.value = store.categories.map((value) => {
      return {
        ...value,
        selected: false
      }
    })
  }
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

async function addFeed(feedUrl: string, categoryId: number) {
  await create_feed({
    category_id: categoryId,
    feed_url: feedUrl
  } as FeedCreationRequest);
  await get_feeds();
  await store.refresh_category_and_feeds();
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
    margin: 4px;
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

