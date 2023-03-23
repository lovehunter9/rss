<template>
  <q-dialog class="delete-root text-center" ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <div class="text-title text-major-color">Add Feeds</div>

      <div style="width: 100%;" class="column justify-start items-start">
        <div class="edit-title text-minor-color">Folder</div>
        <q-btn-dropdown dropdown-icon="img:/imgs/arrow-down.svg" class="select-view" :ripple="false" no-caps dense
          menu-self="top left" menu-anchor="bottom start" :menu-offset="[0, 5]" unelevated>
          <template v-slot:label>
            <div class="row items-center no-wrap justify-between" style="width: 100%">
              <div class="select-title-item text-major-color">{{ folderRef ? folderRef.title : '' }}</div>
            </div>
          </template>
          <q-list class="rounded-borders">
            <q-item v-for="folder in folderOptionsRef" :key="folder.id" clickable v-close-popup
              @click="folderChanged(folder)">
              <q-item-section>
                <q-item-label class="base-item" :class="folder.id === folderRef.id ? 'text-primary-color' : 'text-major-color'">
                  {{ folder.title }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="createFolder()">
              <q-item-section>
                <div class="row justify-start items-center">
                  <img src="../../assets/menu/add.svg" class="icon-add" />
                  <q-item-label style="margin-left: 9px" class="base-item text-primary-color">Create New Folder</q-item-label>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <div class="edit-title text-minor-color">RSS URL</div>
        <edit-view class="edit-view" placeholder="Enter Rss URL" :text="props.text" @input="onInput" />
      </div>

      <div class="row justify-end items-end" style="width: 100%">
        <q-btn dense class="btn-confirm" label="Confirm" @click="addFeed" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import { Loading, Notify, useDialogPluginComponent, useQuasar } from 'quasar';
import EditView from 'components/rss/EditView.vue';
import { ref, onMounted } from 'vue';
import { useRssStore } from 'stores/rss';
import AddFolderDialog from 'components/dialog/AddFolderDialog.vue';
import { create_feed, get_feeds } from 'src/api/api';
import { Category, FeedCreationRequest } from 'src/types';

const inputRef = ref()
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const store = useRssStore()
const $q = useQuasar()

const folderOptionsRef = ref<Category[]>(store.categories ? store.categories : [])
const folderRef = ref<Category | null>(store.categories ? store.categories[0] : null)

const props = defineProps({
  text: {
    type: String,
    default: '',
    require: false
  }
})


onMounted(() => {
  onInput(props.text)
})

function onInput(input: string) {
  console.log(input);
  inputRef.value = input
}

function folderChanged(category: Category) {
  folderRef.value = category;
}

async function addFeed() {
  if (!inputRef.value) {
    Notify.create({
      message: 'Please input Feed',
      position: 'top-right',
      multiLine: true,
      timeout: 100
    });
    return;
  }
  if (!folderRef.value) {
    Notify.create({
      message: 'Please choose Folder',
      position: 'top-right',
      multiLine: true,
      timeout: 100
    });
    return;
  }

  Loading.show();

  try {
    await create_feed({
      category_id: folderRef.value?.id,
      feed_url: inputRef.value
    } as FeedCreationRequest);

    await get_feeds();

    await store.refresh_category_and_feeds();

    onDialogOK();
  } catch (e) {
    console.log(e);
  } finally {
    Loading.hide();
  }
}

function createFolder() {
  $q.dialog({
    component: AddFolderDialog,
    componentProps: {}
  })
    .onOk(async (data: string) => {
      console.log(data)
      folderOptionsRef.value = store.categories ? store.categories : []
      const find = store.categories.find((value) => {
        return value.title === data
      })
      if (find) {
        folderRef.value = find
      }
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
      //     });
    });
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

    .edit-label {
      margin-top: 24px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }

    .edit-title {
      @extend .edit-label;
      margin-top: 12px;
    }

    .edit-view {
      height: 32px;
      width: 100%;
      margin-top: 4px;
    }

    .select-view {
      height: 32px;
      width: 100%;
      padding-left: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;

      .select-title-item {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
      }
    }

    .icon-add {
      margin-left: 18px;
      width: 12px;
      height: 12px;
    }

    .text-title {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
    }

    .icon-close {
      position: absolute;
      right: 24px;
      top: 26px;
      height: 16px;
      width: 16px
    }


  }
}


.base-item {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
}

</style>

