<template>
  <q-dialog
    class="delete-root text-center"
    ref="dialogRef"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="text-title">Add Feeds</div>

      <div style="width: 100%;" class="column justify-start items-start">
        <div class="edit-title">Folder</div>
        <q-btn-dropdown
          dropdown-icon="img:/imgs/arrow-down.svg"
          class="select-view"
          :ripple="false"
          no-caps
          dense
          menu-self="top left"
          menu-anchor="bottom start"
          :menu-offset="[0, 5]"
          unelevated>
          <template v-slot:label>
            <div
              class="row items-center no-wrap justify-between"
              style="width: 100%">
              <div class="select-title-item">{{ folderRef ? folderRef.title : '' }}</div>
            </div>
          </template>
          <q-list class="rounded-borders">
            <q-item
              v-for="folder in folderOptionsRef"
              :key="folder.id"
              clickable
              v-close-popup
              @click="folderChanged(folder)">
              <q-item-section>
                <q-item-label :class="folder === folderRef ? 'selected-item' : 'normal-item'">
                  {{ folder.title }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="createFolder()">
              <q-item-section>
                <q-item-label class="normal-item">Create New Folder</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <div class="edit-title">RSS URL</div>
        <edit-view class="edit-view" placeholder="Enter Rss URL" @input="onInput"/>
      </div>

      <div class="row justify-end items-end" style="width: 100%">
        <q-btn
          dense
          class="btn-confirm"
          label="Confirm"
          @click="addFeed"/>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import {Loading, Notify, useDialogPluginComponent, useQuasar} from 'quasar';
import EditView from 'components/rss/EditView.vue';
import {ref} from 'vue';
import {useRssStore} from 'stores/rss';
import AddFolderDialog from 'components/dialog/AddFolderDialog.vue';
import {create_feed, get_feeds} from 'src/api/api';
import {Category, FeedCreationRequest} from 'src/types';

const inputRef = ref()
const {dialogRef, onDialogHide, onDialogOK} = useDialogPluginComponent();
const store = useRssStore()
const $q = useQuasar()

const folderOptionsRef = ref<Category[]>(store.categories ? store.categories : [])
const folderRef = ref<Category | null>(store.categories ? store.categories[0] : null)

function onInput(input: string) {
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
      color: #857C77;
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
      border: 1px solid #e0e0e0;
      border-radius: 6px;

      .select-title-item {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        color: #1a130f;
      }
    }

    .selected-item {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      color: #FF8642;
    }

    .normal-item {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      color: #1a130f;
    }


    .text-title {
      font-family: 'Roboto';
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

    .btn-vc[disabled] {
      background: #ececec;
      color: #7a7a7a;
    }
  }
}
</style>

