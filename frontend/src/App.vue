<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { useRssStore } from './stores/rss';
import { MenuType } from './types';

export default defineComponent({
  name: 'App',
  setup() {
    console.log('login setup');
    // const user =  useUserStore()
    // user.generateUserMockData()

    const rootStore = useRssStore();
    const base_url = window.location.origin
    console.log(base_url);
    rootStore.setUrl(base_url);
    rootStore.setSDKUrl(base_url);
    rootStore.menu_choice = {
      type: MenuType.Today,
      value: 0
    }

    console.log('login setup 2');
    return {}
  }
})
</script>
