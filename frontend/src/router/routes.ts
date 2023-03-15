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
        component: () => import('pages/OrganizePage.vue'),
      },
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
