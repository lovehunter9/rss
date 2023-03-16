<template>
  <q-dialog
    class="delete-root text-center"
    ref="dialogRef"
    >
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

          <div class="edit-label" v-show="parentStatusRef != null">Added in</div>
          <q-checkbox dense size="md" class="check-box" v-model="parentStatusRef" :label="parentCategoriesRef ? parentCategoriesRef.title : ''"
                      color="orange" disable v-show="parentStatusRef != null"/>

          <div class="edit-label">Folders</div>
          <q-checkbox v-for="item in categoriesRef" v-model="item.selected" :key="item.id" dense size="md"
                      class="check-box" color="orange" :label="item.data.title"
                      @update:model-value="setSelected(item)"/>

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
import {Category, Feed, FeedModificationRequestImpl} from 'src/types';
import {useRssStore} from 'stores/rss';
import AddFolderDialog from 'components/dialog/AddFolderDialog.vue';
import {OptionalCategory} from 'stores/organizeConfig';

const props = defineProps({
  feeds: {
    type: Object as PropType<Feed[]>,
    require: true,
  }
})

const store = useRssStore();
const $q = useQuasar();
const parentStatusRef = ref<boolean | null>(null)
const parentCategoriesRef = ref<Category | undefined>(undefined)

const categoriesRef = ref<OptionalCategory[]>([])
let selectedCategory: OptionalCategory | undefined = undefined

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent();

updateCategories();

function setSelected(item: OptionalCategory) {
  console.log(item)
  if (item.selected) {
    selectedCategory = item
    categoriesRef.value.forEach((category) => {
      if (category.data.id != item.data.id) {
        category.setSelected(false)
      }
    })
    if (parentStatusRef.value !== null){
      parentStatusRef.value = false;
    }
  } else {
    selectedCategory = undefined
    categoriesRef.value.forEach((category) => {
      category.setSelected(false)
    })
    if (parentStatusRef.value !== null){
      parentStatusRef.value = true;
    }
  }
}

function updateCategories() {
  categoriesRef.value = []
  if (props.feeds){
    const set = new Set;
    props.feeds.forEach((feed) => {
      set.add(feed.category.title)
    })
    if (set.size > 1){
      parentStatusRef.value = null
      parentCategoriesRef.value = undefined
    }else {
      parentStatusRef.value = true;
      parentCategoriesRef.value = props.feeds[0].category
    }

    store.categories.forEach((category: Category) => {
      if (parentStatusRef.value && props.feeds && parentCategoriesRef.value) {
        if (category.id !== parentCategoriesRef.value.id) {
          categoriesRef.value.push(new OptionalCategory(category))
        }
      }else {
        categoriesRef.value.push(new OptionalCategory(category))
      }
    })
  }
}

function addFolder() {
  $q.dialog({
    component: AddFolderDialog,
    componentProps: {}
  })
    .onOk(async (data: string) => {
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
  if (props.feeds) {
    await props.feeds.forEach((feed) => {
      if (selectedCategory) {
        const model = new FeedModificationRequestImpl(feed);
        model.category_id = selectedCategory.getId()
        store.updateFeed(feed.id,model)
      }
    })
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

