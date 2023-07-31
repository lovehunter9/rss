<template>
  <q-layout view="lhr lpr lfr" class="layout layout-app">
    <div class="main-layout" :class="{
      showDialog: dialogShow,
      'main-layout-ios': $q.platform.is.ios
    }">
      <q-drawer v-model="leftDrawerOpen" @update:model-value="updateLeftDrawer" show-if-above bordered height="100%"
                class="drawer">
        <div class="row" style="width: 100%;margin-bottom: 8px;">
          <search-entry-view class="detail-width search-view" :isUseSelect="false" placeholder="Search"
                             :item-width="225" :filter-data-func="store.rssContentQuery"
                             @show-all-value="showSearchResultAllValue"/>

          <div class="btn-add row justify-center items-center">
            <q-img style="width: 12px;height: 12px" src="../assets/menu/add.svg">
            </q-img>
            <q-menu style="width:140px;" anchor="bottom end" :offset="[-86, 8]">
              <q-list style="font-size:12px;line-height: 12px;font-family: 'Roboto';font-style: normal;"
                      class="text-major-color">
                <q-item dense clickable v-close-popup @click="addFeed">
                  <q-item-section>
                    New Feeds
                  </q-item-section>
                </q-item>
                <q-item dense clickable v-close-popup @click="addFolder">
                  <q-item-section>
                    New Folder
                  </q-item-section>
                </q-item>
                <q-item dense clickable v-close-popup @click="addBoard">
                  <q-item-section>
                    New Boards
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
        <q-scroll-area style="height:calc(100% - 110px);">
          <q-list class="margin-bottom-safe-area">
            <layout-left-item-menu :menu-type="MenuType.Discover" :show-un-read-count="false"
                                   @item-on-click="changeItemMenu(MenuType.Discover)"/>
            <layout-left-item-menu :menu-type="MenuType.Trend" :show-un-read-count="false"
                                   @item-on-click="changeItemMenu(MenuType.Trend)"/>
            <layout-left-item-menu :menu-type="MenuType.Today" :unread-count="`${todayCount}`"
                                   @item-on-click="changeItemMenu(MenuType.Today)"/>
            <layout-left-item-menu :menu-type="MenuType.Unread" :unread-count="`${store.allUnRead}`"
                                   @item-on-click="changeItemMenu(MenuType.Unread)"/>
          </q-list>

          <q-separator style="margin-top:6px;margin-bottom: 11px;" inset/>

          <div class="row justify-between items-center folder-info" @click="addFolder()">
            <span class="folder text-minor-color">Folder</span>
            <q-img style="width: 16px;height: 16px" src="../assets/icon/add.svg"/>
          </div>

          <q-item class="item" dense v-for="(category, index) in store.categories" :key="'ct' + index"
                  style="padding: 0;padding-left: 5px;width: calc(100% - 10px);">
            <q-expansion-item dense switchToggleSide :disable="category.feeds.length === 0" :defaultOpened="index === 0 &&
            category.feeds.length > 0" headerClass="menuItem">
              <template v-slot:header>
                <q-item
                  :active="store.menu_choice.type !== undefined && store.menu_choice.type === MenuType.Feed &&
                  category.feeds.find(e => e.id === store.menu_choice.value) !== undefined" dense
                  :class="category.feeds.length > 0 ? 'folder-extension-margin-left' : 'folder-extension-margin-none'"
                  @click="changeItemMenu(MenuType.Category, category.id)">
                  <q-item-section class="folder-title">
                    {{ category.title }}
                  </q-item-section>
                  <q-item-section side>
                    <div class="unreadCount text-minor-color">
                      {{ feedReduce(category.feeds) }}
                    </div>
                  </q-item-section>
                </q-item>
              </template>
              <q-item dense class="menuItem feed-select-item" clickable v-for="(feed, fi) in category.feeds"
                      :key="'ft' + fi" @click="changeItemMenu(MenuType.Feed, feed.id)"
                      :active="store.menu_choice.type !== undefined && store.menu_choice.type === MenuType.Feed &&
                      store.menu_choice.value === feed.id"
                      active-class="item-active-color">
                <q-item-section avatar>
                  <img v-if="store.feeds_icon[feed.id] && store.feeds_icon[feed.id].data"
                       :src="store.feeds_icon[feed.id].data" :width="14" :height="14"/>
                </q-item-section>
                <q-item-section class="folder-title" style="margin-left:-30px;padding-top: 10px;padding-bottom: 10px;">
                  {{ feed.title }}
                </q-item-section>
                <q-item-section side>
                  <div class="unreadCount text-minor-color">
                    {{ feed.unread ?? 0 }}
                  </div>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-item>

          <div class="row justify-between items-center folder-info" style="margin-top:20px;" @click="addBoard()">
            <span class="folder text-minor-color">Boards</span>
            <q-img style="width: 16px;height: 16px" src="../assets/icon/add.svg"/>
          </div>

          <layout-left-item-menu v-for="item in store.boards" :key="item.id + item.title" :menu-type="MenuType.Board"
                                 :menu-value="item.id" :title="item.title" image-name="board"
                                 :show-un-read-count="false"
                                 @item-on-click="changeItemMenu(MenuType.Board, item.id)"
                                 @click.right="showContextMenu($event,item.id)" :smallFontSize="true"/>
        </q-scroll-area>

        <div class="row justify-between items-center setting-bottom">
          <div class="row justify-start items-center" @click="goFolderSetting">
            <img class="setting-icon"
                 :src="formatLocalImage('setting','/menu',undefined,isFolderManager)">
            <span class="folder-title" :class="isFolderManager ? 'text-primary-color' : 'text-major-color'">Setting</span>
          </div>
          <img style="margin-right: 18px;width: 16px;height: 16px" src="../assets/menu/refresh.svg">
        </div>

      </q-drawer>

      <q-page-container class="container">
        <router-view/>
      </q-page-container>

    </div>
  </q-layout>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {useQuasar} from 'quasar';
import {useRoute, useRouter} from 'vue-router';
import {useRssStore} from 'stores/rss';

import {DeleteType, Feed, MenuType, RssContentQueryItem} from '../types';
import LayoutLeftItemMenu from 'components/LayoutLeftItemMenu.vue'
import AddFolderDialog from 'components/dialog/AddFolderDialog.vue';
import AddFeedDialog from 'components/dialog/AddFeedDialog.vue';
import AddBoardDialog from 'components/dialog/AddBoardDialog.vue';
import contextMenu, {RIGHT_MENU_TYPE} from 'components/RightMenuInstance';
import {newsBus, newsBusMessage} from 'src/utils/utils';
import OrganizeDeleteDialog from 'components/dialog/OrganizeDeleteDialog.vue';
import {formatLocalImage} from '../utils/utils'
import {getEntryById, getEntryListByIds, removeBlackList} from 'src/api/api'
import SearchEntryView from 'components/rss/SearchEntryView.vue';

const $q = useQuasar();
const Router = useRouter();
const Route = useRoute();
const dialogShow = ref(false);
const isFolderManager = ref(false);

console.log('Route.path === ');
console.log(Route.path);

const showContextMenu = (e: any, menuId: number) => {
  e.preventDefault();
  contextMenu(e, menuId);
};

const store = useRssStore();

const leftDrawerOpen = ref(false);

const todayCount = ref<number>(0)

watch(
  () => store.leftDrawerOpen,
  (newVal) => {
    leftDrawerOpen.value = newVal;
  }
);

newsBus.on(newsBusMessage.rightMenuType, (menuId: number, type: RIGHT_MENU_TYPE) => {
  switch (type) {
    case RIGHT_MENU_TYPE.EDIT:
      editBoard(menuId)
      break
    case RIGHT_MENU_TYPE.DELETE:
      removeBoard(menuId)
      break
  }
})

function editBoard(boardId: number) {
  $q.dialog({
    component: AddBoardDialog,
    componentProps: {
      boardId: boardId
    }
  }).onOk(() => {
    newsBus.emit(newsBusMessage.feedRefresh)
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

function removeBoard(boardId: number) {
  console.log('delete')
  $q.dialog({
    component: OrganizeDeleteDialog,
    componentProps: {
      type: DeleteType.BOARD
    }
  }).onOk(async () => {
    await store.remove_local_board(boardId)
  }).onCancel(() => {
    console.log('Cancel');
  })
    .onDismiss(() => {
      console.log('Dismiss');
    });
}

const goFolderSetting = () => {
  goto('/folderSetting')
}

const updateLeftDrawer = (show: boolean) => {
  store.leftDrawerOpen = show;
};

watch(() => Route.path, (value) => {
  isFolderManager.value = value.includes('/folderSetting');
  if (isFolderManager.value) {
    store.menu_choice = {
      type: MenuType.Empty,
      value: 0
    }
  }
})

if (Route.path.includes('/folderSetting')) {
  isFolderManager.value = true
  store.menu_choice = {
    type: MenuType.Empty,
    value: 0
  };
} else if (Route.path.includes('/discover')) {
  store.menu_choice = {
    type: MenuType.Discover,
    value: 0
  };
} else if (Route.path.includes('/trend')) {
  store.menu_choice = {
    type: MenuType.Trend,
    value: 0
  };
}

onMounted(async () => {
  // if (useIsMobile()) {
  //   innerWidth.value =
  //     document.documentElement.clientWidth || document.body.clientWidth;
  // } else {
  //   innerWidth.value = (screenWidth.value - 300) / 2;
  //   window.onresize = () => {
  //     return (() => {
  //       screenWidth.value = document.body.clientWidth;
  //     })();
  //   };
  // }

  await store.refresh_category_and_feeds();

  await store.get_basic_setting();

  await store.get_blacklist(0);

  todayCount.value = await store.get_today() || 0

});

function onSearch(vault: string) {
  console.log(vault)
}

function goto(path: string) {
  Router.push({
    path: path
  });
}

function changeItemMenu(type: MenuType, value = 0) {
  store.menu_choice = {
    type,
    value
  };
  console.log(store.menu_choice)
  if (type == MenuType.Feed) {
    goto('/')
  } else if (type == MenuType.Category) {
    goto('/')
  } else if (type == MenuType.Today) {
    goto('/')
  } else if (type == MenuType.Discover) {
    goto('/discover')
  } else if (type == MenuType.Unread) {
    goto('/')
  } else if (type == MenuType.ReadLater) {
    goto('/')
  } else if (type == MenuType.Board) {
    goto('/')
  } else if (type == MenuType.Trend) {
    goto('/trend2')
  } else if (type == MenuType.Search) {
    goto('/')
  }
}

const addFolder = () => {
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
    });
};

const addBoard = () => {
  $q.dialog({
    component: AddBoardDialog,
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
    });
};

const addFeed = () => {
  $q.dialog({
    component: AddFeedDialog,
    componentProps: {}
  })
    .onOk(() => {
      console.log('OK');
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
    });
};

const feedReduce = (array: Array<Feed>): number => {
  let result = 0
  array.forEach(e => {
    result += e.unread || 0
  })
  return result
};

const showSearchResultDetail = async (selectItem: RssContentQueryItem, list: RssContentQueryItem[]) => {
  if (list.length === 0) {
    return
  }

  try {
    const entry = await getEntryById(selectItem.entry_id)
    store.entries = [entry];
    store.entries_total = 1;
    changeItemMenu(MenuType.Search)
  } catch (error) {

  }
}

const showSearchResultAllValue = async (list: RssContentQueryItem[]) => {
  if (list.length === 0) {
    return
  }

  try {
    console.log(list)
    const entries = await getEntryListByIds(list)
    console.log(entries)
    store.entries = entries
    store.entries_total = entries.length;
    changeItemMenu(MenuType.Search)
  } catch (error) {

  }
}
</script>

<style lang="scss" scoped>
.main-layout-ios {
  @extend .main-layout;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: white;
}

.layout-app {
  perspective: 500;
  -webkit-perspective: 500;
}

.main-layout {
  position: absolute;

  .search-view {
    margin: 16px 8px 0px 16px;
    width: calc(100% - 72px);
    // background-color: red;
    // border: 1px solid #E0E0E0;
    border-radius: 6px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    /* identical to box height, or 100% */


    color: #BDBDBD;
  }

  .btn-add {
    margin-top: 16px;
    margin-right: 16px;
    width: 32px;
    height: 32px;
    border: 1px solid $main-style;
    border-radius: 6px;
  }
}

.showDialog {
  filter: blur(2px);
  transform: translate3d(0px, 0px, -10px) rotateX(5deg);
  transform-origin: 0px center;
  transition: transform 0.4s cubic-bezier(0.6, 0, 0.2, 1) 0s,
  filter 0.4s ease 0s;
}

.main-layout {
  width: 100vw;
  height: 100vh;
}

.container {
  height: 100%;
  width: 100%;
}

.logo {
  width: 100%;
  height: 108px;
  padding-left: 20px;

  .name,
  .did {
    line-height: 24px;
    color: #7a7a7a;
    margin-left: 15px;
    width: 192px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.section {
  height: 32px;
  color: #a9a9a9;
  font-size: 12px;
  padding-left: 24px;
}

.menuItem {
  border-radius: 8px;
}

.unreadCount {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  text-align: center;

  background: rgba(26, 19, 15, 0.05);
  padding: 2px 8px;
  border-radius: 8px;
}

.rotate {
  animation: aniRotate 0.8s linear infinite;

  &:hover {
    background: transparent !important;
  }
}

@keyframes aniRotate {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.folder-info {
  height: 36px;
  margin-left: 12px;
  margin-right: 8px;
  padding-left: 8px;
  padding-right: 16px;

  .folder {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
  }
}

.setting-bottom {
  height: 48px;
  width: 100%;
  margin-left: 8px;
  margin-right: 8px;
  padding-left: 8px;
  padding-right: 8px;
  position: absolute;
  bottom: 0;

  .setting-icon {
    margin-right: 8px;
    width: 12px;
    height: 12px
  }

  .folder-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
}

.folder-extension-margin-left {
  margin-left: -25px;
  width: 223px;
  height: 36px;
  padding: 0;
}

.folder-extension-margin-none {
  width: 255px;
  height: 36px;
  padding: 0;
  // background-color: red;
}

.feed-select-item {
  margin-left: 10px;
  width: 275px;
  // margin-top: 10px;
  // margin-bottom: 10px;
  // height: 36px;
}

:global(.q-field__marginal) {
  height: 32px !important;
  font-size: 12px !important;
}

:global(.q-field--auto-height .q-field__control) {
  min-height: 32px !important;
  height: 32px !important;
}

:global(.q-field--dense .q-field__control) {
  min-height: 32px !important;
  height: 32px !important;
}

:global(.q-field__native) {
  min-height: 32px !important;
  padding: 0;
}

:global(body.desktop .q-checkbox:not(.disabled) .q-checkbox__inner:before) {
  background: transparent;
}

:global(.q-field--dense) {
  height: 32px;
}
</style>
