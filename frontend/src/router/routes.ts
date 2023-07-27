import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue')},
      {
        path: 'entry/:entry_id',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'discover',
        component: () => import('pages/DiscoverPage.vue'),
      },
      {
        path: 'folderSetting',
        component: () => import('pages/setting/OrganizePage.vue'),
      },
      {
        path: 'trend',
        component: () => import('pages/TrendPage.vue')
      },
      {
        path: 'search',
        component: () => import('pages/SearchPage.vue')
      },
      {
        path: 'trend2',
        component: () => import('pages/TrendNewPage.vue')
      },
      {
        path: 'trend2/:entry_id',
        component: () => import('pages/TrendNewPage.vue')
      },
      {
        path: 'searchresult/:entry_id',
        component: () => import('pages/SearchResultPage.vue')
      },
      {
        path: 'blacklist',
        component: () => import('pages/setting/BlacklistPage.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
