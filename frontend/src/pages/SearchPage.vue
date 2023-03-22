<template>
  <div class="trend-root">
    <div class="page-title"> Provide the best information based on trends </div>
    <TabsCompnent :tabs="tabs" @update-tab="updateTab" style="margin-bottom:16px"></TabsCompnent>
    <q-scroll-area style="height:calc(100% - 88px)">

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel :name="tabs[0].name" style="padding: 0;">
          <ArticleSearchInputComponent></ArticleSearchInputComponent>
          <q-list>
            <div v-for="item in 10" :key="item">
              <EntryTotalComponent></EntryTotalComponent>
              <q-separator spaced />
            </div>
          </q-list>
        </q-tab-panel>

        <q-tab-panel :name="tabs[1].name" style="padding:0">
          <search-view placeholder="Search Feeds" style="margin:0;width:100%" />

          <q-list class="search-result-list">
            <SearchFeedComponent v-for="item, index in searchResults" :key="index" :feed="item"></SearchFeedComponent>
          </q-list>

        </q-tab-panel>

        <q-tab-panel :name="tabs[2].name">
          <div class="text-h6">{{ tabs[2].name }}</div>
        </q-tab-panel>
      </q-tab-panels>

    </q-scroll-area>

  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import './common/page.common.scss'
import TabsCompnent from './common/TabsCompnent.vue'
import EntryTotalComponent from './common/EntryTotalComponent.vue'
import ArticleSearchInputComponent from './search/ArticleSearchInputComponent.vue'
import SearchView from 'components/rss/SearchView.vue';
import SearchFeedComponent from './common/SearchFeedComponent.vue'

const tabs = ref(
  [{
    name: 'Articles',
    disable: false,
    normalIcon: 'img:/imgs/tabs/articles.svg',
    selectedIcon: 'img:/imgs/tabs/articles_hover.svg'
  },
  {
    name: 'Feeds',
    disable: false,
    normalIcon: 'img:/imgs/tabs/feeds.svg',
    selectedIcon: 'img:/imgs/tabs/feeds_hover.svg'
  },
  {
    name: 'Twitters',
    disable: false,
    normalIcon: 'img:/imgs/tabs/twitter.svg',
    selectedIcon: 'img:/imgs/tabs/twitter_hover.svg'
  }]
)

const tab = ref(tabs.value[0].name)


const updateTab = (tabName: string) => {
  tab.value = tabName
}


const searchResults = ref([
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
    logo: 'examples/blocchain_example.png',
    subsribeUrl: '',
    isSubsribe: false,
    details: [
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      }
    ]
  },
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
    logo: 'examples/blocchain_example.png',
    subsribeUrl: '',
    isSubsribe: false,
    details: [
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      }
    ]
  },
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
    logo: 'examples/blocchain_example.png',
    subsribeUrl: '',
    isSubsribe: false,
    details: [
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      }
    ]
  },
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
    logo: 'examples/blocchain_example.png',
    subsribeUrl: '',
    isSubsribe: false,
    details: [
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      }
    ]
  },
  {
    title: 'Blockchain News',
    url: 'www.sspai.com',
    logo: 'examples/blocchain_example.png',
    subsribeUrl: '',
    isSubsribe: false,
    details: [
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      },
      {
        content: 'Leading source for news, information & resources for the Connected Generation.',
        time: '1 mins ago'
      }
    ]
  }
])

</script>

<style scoped lang='scss'>
.trend-root {
  width: 100%;
  height: 100vh;
  background-color: white;
  padding-left: 120px;
  padding-right: 120px;
  padding-top: 20px;

  .search-result-list {
    margin-top: 16px;
    width: 100%;
    padding-bottom: 40px;
  }
}
</style>
