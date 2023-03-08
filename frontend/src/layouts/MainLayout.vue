<template>
  <q-layout view="lhr lpr lfr" class="lauout lauout-app">
    <div
      class="mainlayout"
      :class="{
        showDialog: dialogShow,
        'mainlayout-ios': $q.platform.is.ios
      }"
    >
      <q-drawer
        v-model="leftDrawerOpen"
        @update:model-value="updateLeftDrawer"
        show-if-above
        bordered
        height="100%"
        class="drawer"
      >
        <q-list class="margin-bottom-safe-area">

          <q-item class="searchItem row justify-start items-center">
            <q-img
              class="searchImg"
              src="../assets/search.svg"
              width="16px"
              height="16px"
            />
            <q-input
              class="searchInput"
              v-model="searchTxt"
              dense
              square
              borderless
              name="search"
              debounce="500"
              placeholder="Search"
              autocomplete="off"
            />
          </q-item>

          <q-item
            clickable
            :active="store.menu_choice.type == MenuType.Discover"
            active-class="itemActiveStyle"
            class="menuItem q-mx-sm q-pl-xs q-pr-md q-py-xs"
            @click="changeItemMenu(MenuType.Discover)"
          >
            <q-item-section class="items-center" avatar>
              <svg-icon icon-class="../../assets/icon/today.svg"/>
<!--              <BtIcon :src="active === 'vault' ? 'vaultActive' : 'vault'" />-->
            </q-item-section>
            <q-item-section class="text-subtitle1">Discover</q-item-section>
            <q-item-section class="q-mr-sm" side>
              {{ count.total }}
            </q-item-section>
          </q-item>

          <q-item
            clickable
            :active="store.menu_choice.type == MenuType.Today"
            active-class="itemActiveStyle"
            class="menuItem q-mx-sm q-pl-xs q-pr-md q-py-xs"
            @click="changeItemMenu(MenuType.Today)"
          >
            <q-item-section class="items-center" avatar>
              <BtIcon :src="active === 'vault' ? 'vaultActive' : 'vault'" />
            </q-item-section>
            <q-item-section class="text-subtitle1">Today</q-item-section>
            <q-item-section class="q-mr-sm" side>
              {{ count.total }}
            </q-item-section>
          </q-item>

          <q-item
            clickable
            :active="store.menu_choice.type == MenuType.Unread"
            active-class="itemActiveStyle"
            class="menuItem q-mx-sm q-pl-xs q-pr-md q-py-xs"
            @click="changeItemMenu(MenuType.Unread)"
          >
            <q-item-section class="items-center" avatar>
              <BtIcon :src="active === 'vault' ? 'vaultActive' : 'vault'" />
            </q-item-section>
            <q-item-section class="text-subtitle1">Unread</q-item-section>
            <q-item-section class="q-mr-sm" side>
              {{ count.total }}
            </q-item-section>
          </q-item>

          <q-item
            clickable
            :active="store.menu_choice.type == MenuType.ReadLater"
            active-class="itemActiveStyle"
            class="menuItem q-mx-sm q-pl-xs q-pr-md q-py-xs"
            @click="changeItemMenu(MenuType.ReadLater)"
          >
            <q-item-section class="items-center" avatar>
              <BtIcon :src="active === 'vault' ? 'vaultActive' : 'vault'" />
            </q-item-section>
            <q-item-section class="text-subtitle1">Read Later</q-item-section>
            <q-item-section class="q-mr-sm" side>
              {{ count.total }}
            </q-item-section>
          </q-item>

          <!--  -->
        </q-list>

        <div class="row justify-between items-center" style="height: 36px;margin-left: 8px;margin-right: 8px;padding-left: 8px;padding-right: 8px" @click="goFolderSetting">
          <span style="font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 14px;
color: #857C77;
">Folder</span>
          <img style="width: 12px;height: 12px" src="../assets/menu/setting.svg">
        </div>

        <q-item
          class="item q-mx-sm q-pl-lg q-py-xs"
          clickable
          v-for="(category, index) in store.categories"
          :key="'ct' + index"
        >
          <q-expansion-item
            :caption="category.title"
            :disable="category.feeds.length == 0"
            class=""
          >
            <template v-slot:header>
              <q-item
                clickable
                :active="active === 'favorites'"
                active-class="itemActiveStyle"
                class="q-mx-sm q-pl-xs q-pr-md q-py-xs"
                @click="changeItemMenu(MenuType.Category, category.id)"
              >
                <q-item-section class="text-subtitle1">
                  {{ category.title }}
                </q-item-section>
                <q-item-section class="q-mr-sm" side>
                  <!-- {{ count.favorites }} -->
                </q-item-section>
              </q-item>
            </template>
            <q-item
              class="item q-mx-sm q-pl-lg q-py-xs"
              clickable
              v-for="(feed, fi) in category.feeds"
              :key="'ft' + fi"
              @click="changeItemMenu(MenuType.Feed, feed.id)"
            >
              <q-item-section>
                {{ feed.title }}
              </q-item-section>
              <q-item-section side>
                {{ feed.unread }}
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-item>

        <q-item
          clickable
          active-class="itemActiveStyle"
          class="menuItem q-mx-sm q-pl-xs q-pr-md q-py-xs"
          @click="addFolder()"
        >
          <q-item-section class="items-center" avatar>
            <BtIcon :src="active === 'vault' ? 'vaultActive' : 'vault'" />
          </q-item-section>
          <q-item-section class="text-subtitle1">Add Folder</q-item-section>
        </q-item>

        <q-item
          clickable
          active-class="itemActiveStyle"
          class="menuItem q-mx-sm q-pl-xs q-pr-md q-py-xs"
          @click="addFeed()"
        >
          <q-item-section class="items-center" avatar>
            <BtIcon :src="active === 'vault' ? 'vaultActive' : 'vault'" />
          </q-item-section>
          <q-item-section class="text-subtitle1">Add Feed</q-item-section>
        </q-item>

        <!-- <div class="row absolute-bottom q-mb-sm">
					<span class="biIcon" @click="lock">
						<i class="bi bi-lock"></i>
					</span>
					<span class="biIcon" @click="changeTheme">
						<i
							class="bi bi-gear-wide-connected"
							v-if="theme === 'auto'"
						></i>
						<i class="bi bi-moon" v-if="theme === 'dark'"></i>
						<i class="bi bi-sun" v-if="theme === 'light'"></i>
					</span>
					<span
						class="biIcon"
						@click="sync"
						:class="{ rotate: syncing }"
					>
						<i class="bi bi-arrow-clockwise rotate"></i>
					</span>

				</div> -->

        <div class="row justify-between items-center" style="height: 36px;margin-left: 8px;margin-right: 8px;padding-left: 8px;padding-right: 8px" >
          <span style="font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 14px;
color: #857C77;
">Board</span>
        </div>

        <div class="row justify-between items-center" style="height: 48px;width : 100%;margin-left: 8px;margin-right: 8px;padding-left: 8px;padding-right: 8px;position: absolute;bottom: 0" >
          <div class="row justify-start items-center">
          <span style="font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 14px;
color: #857C77;
">Setting</span>
          <img style="margin-left: 8px;width: 12px;height: 12px" src="../assets/menu/setting.svg">
          </div>
          <img style="margin-right: 18px;width: 12px;height: 12px" src="../assets/menu/refresh.svg">
        </div>

      </q-drawer>

      <q-page-container class="container">
        <router-view />
      </q-page-container>

      <q-drawer
        v-model="rightDrawerOpen"
        bordered
        show-if-above
        side="right"
        :width="innerWidth"
        @update:model-value="updateRightDrawer"
        class="column items-center justify-center"
      >
        <ItemView v-if="item" :item="item"/>
        <div class="text-7A7A7A column items-center justify-center" v-else>
          <BtIcon class="q-mb-lg" src="itemSelect" :width="215" :height="148" />
          {{ 'No item selected.' }}
        </div>
      </q-drawer>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useIsMobile } from '../utils/utils';
import { useRssStore } from '../stores/rss';
//import { useUserStore } from '../stores/user';
import ItemView from '../pages/ItemView.vue';
import AddFeedDialog from '../components/AddFeedDialog.vue';
import {
  MenuType,
  MenuChoice,
  Category,
  CategoryRequest,
  Feed,
  FeedCreationRequest,
  FeedCounters,
  Entry,
  EntriesQueryRequest
} from '../types';
import { create_category } from '../api/api';
import { EntryStatus } from '../types';
import {getPageRSSHub} from '../utils/radar'
import { defaultRules } from '../utils/radar-rules';
import SvgIcon from "components/base/svgIcon.vue";
export default defineComponent({
  name: 'MainLayout',

  components: {
    SvgIcon,
    ItemView
  },

  setup() {
    const $q = useQuasar();
    const Router = useRouter();
    const Route = useRoute();
    const item = ref<Entry | undefined>(undefined);
    const settingMode = ref();
    const dialogShow = ref(false);

    let active = ref('vault');

    const store = useRssStore();

    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    let innerWidth = ref(450);
    const timer = ref();
    const screenWidth = ref(document.body.clientWidth);

    const count = ref<any>({ total: 10 });
    const tags = ref<any>([]);
    const searchTxt = ref<string>('');

    // let _lockDelay: number = app.settings.autoLockDelay * 60 * 1000;
    // //let  _lockDelay :number = 10 * 1000;
    // let _pausedAt: Date | null = null;
    // let _lockTimeout = 0;
    // let _syncTimeout: any = null;
    // const theme = ref(app.settings.theme);
    // if (theme.value === 'auto') {
    // 	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // 		$q.dark.set(true);
    // 	} else {
    // 		$q.dark.set(false);
    // 	}
    // }
    // if (theme.value === 'dark') {
    // 	$q.dark.set(true);
    // }
    // if (theme.value === 'light') {
    // 	$q.dark.set(false);
    // }

    // Listen for drawer events
    watch(
      () => store.leftDrawerOpen,
      (newVal) => {
        leftDrawerOpen.value = newVal;
      }
    );
    watch(
      () => store.rightDrawerOpen,
      (newVal) => {
        console.log('rightDrawerOpen:::', newVal);
        rightDrawerOpen.value = newVal;
      }
    );

    // watch(
    //   () => store.dialogShow,
    //   (newVal) => {
    //     dialogShow.value = newVal;
    //   }
    // );

    const goFolderSetting = () => {
      goto('/folderSetting')
      setTimeout(() => {
        store.rightDrawerOpen = false;
      }, 0);
    }

    const updateLeftDrawer = (show: boolean) => {
      store.leftDrawerOpen = show;
    };
    const updateRightDrawer = (show: boolean) => {
      console.log('updateRightDrawer,', show);
      store.rightDrawerOpen = show;
    };

    watch(
      () => Route.params.entry_id,
      (newValue, oldValue) => {
        console.log('newValue:', newValue, oldValue);
        console.log(Route.params);
        if (newValue == oldValue) {
          return;
        }

        let entry_id = Number(newValue);
        let entry = store.get_local_entry(entry_id);
        if (entry) {
          if (entry.status != EntryStatus.Read) {
            store.mark_entry_read(entry_id);
          }
          item.value = entry;
        }
      }
    );

    watch(
      () => Route.path,
      (newValue, oldValue) => {
        console.log('newValuenewValuenewValue', newValue);
        if (newValue == oldValue) {
          return;
        }

        if (!useIsMobile()) {
          if (newValue === '/generator' || newValue === '/security') {
            store.rightDrawerOpen = false;
          } else {
            store.rightDrawerOpen = true;
          }
        }
      }
    );

    watch(
      () => screenWidth.value,
      (newVal) => {
        if (!timer.value) {
          timer.value = true;
          innerWidth.value = (newVal - 300) / 2;
          setTimeout(function () {
            timer.value = false;
          }, 400);
        }
      }
    );

    onMounted(async () => {
      if (useIsMobile()) {
        innerWidth.value =
          document.documentElement.clientWidth || document.body.clientWidth;
      } else {
        innerWidth.value = (screenWidth.value - 300) / 2;
        window.onresize = () => {
          return (() => {
            screenWidth.value = document.body.clientWidth;
          })();
        };
      }

      await store.refresh_category_and_feeds();


      await console.log(getPageRSSHub( {
        url : 'https://space.bilibili.com/65125803',
        rules :defaultRules
      }))
    });

    onUnmounted(() => {
      //
    });

    function goto(path: string) {
      Router.push({
        path: path
      });
    }

    function changeItemMenu(type: MenuType, value?: number) {
      store.menu_choice = {
        type,
        value
      };
      console.log(store.menu_choice)
      let openDrawer = true;
      if (type == MenuType.Feed) {
        store.get_entries(
          new EntriesQueryRequest({ limit: 50, offset: 0, feed_id: value })
        );
        goto('/')
      } else if (type == MenuType.Category) {
        store.get_entries(
          new EntriesQueryRequest({ limit: 50, offset: 0, category_id: value })
        );
        goto('/')
      } else if (type == MenuType.Today) {
        store.get_today();
        goto('/')
      } else if (type == MenuType.Discover) {
        goto('/discover')
        openDrawer = false;
      } else if (type == MenuType.Unread) {
        goto('/')
      } else if (type == MenuType.ReadLater) {
        goto('/')
      }

      setTimeout(() => {
        store.rightDrawerOpen = openDrawer;
      }, 0);
    }

    const onSearch = () => {
      // Router.push({
      //   path: '/appStorePage',
      //   query: {
      //     q: searchTxt.value
      //   },
      // })
    };

    const addFolder = () => {
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

        await create_category({ title: data } as CategoryRequest);
        await store.refresh_category_and_feeds();
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
          //     });
        });
    };

    addFeed;
    return {
      MenuType,
      item,
      leftDrawerOpen,
      rightDrawerOpen,
      goto,
      store,
      active,
      innerWidth,
      updateLeftDrawer,
      updateRightDrawer,
      goFolderSetting,
      settingMode,
      dialogShow,
      changeItemMenu,
      count,
      tags,
      onSearch,
      searchTxt,
      addFolder,
      addFeed
    };
  }
});
</script>

<style lang="scss" scoped>
.mainlayout-ios {
  @extend .mainlayout;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: white;
}

.lauout-app {
  perspective: 500;
  -webkit-perspective: 500;
}

.mainlayout {
  position: absolute;

  .searchItem{
    height: 32px;
    margin : 16px;
    border: 1px solid #E0E0E0;
    border-radius: 6px;

    .searchInput{
      margin-left: 10px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 12px;
      color: #BDBDBD;
    }

  }

  .itemActiveStyle{
    color: white;
    background: #F2C037
  }
}

.showDialog {
  filter: blur(2px);
  transform: translate3d(0px, 0px, -10px) rotateX(5deg);
  transform-origin: 0px center;
  transition: transform 0.4s cubic-bezier(0.6, 0, 0.2, 1) 0s,
    filter 0.4s ease 0s;
}

// @media (min-width: 1200px) {
//   .mainlayout {
//     max-width: 1200px;
//     max-height: 900px;
//     border-radius: 1em;
//     box-shadow: var(--app-wrapper-shadow);
//     margin: auto;
//     overflow: hidden;
//     inset: 2em;
//   }
// }
// @media (max-width: 1200px) {
.mainlayout {
  width: 100vw;
  height: 100vh;
}

// }
.container {
  height: 100%;
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

.tagExpansion {
  border-radius: 8px;
  overflow: hidden;

  > .q-item:hover {
    background: #f3f8fe;
    color: #2787ff;
  }

  .q-item {
    padding: 0 5px 0 16px;
  }

  .q-expansion-item__toggle-icon {
    margin-right: -30px !important;
  }
}

.biIcon {
  margin-right: 30px;
  padding: 2px 6px;
  cursor: pointer;
  border-radius: 5px;
  i {
    font-size: 20px;
  }
  &:first-child {
    margin-left: 18px;
  }
  &:hover {
    background-color: #d8d8d8;
  }
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
</style>
