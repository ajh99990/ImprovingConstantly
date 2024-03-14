import type { RouteRecordRaw } from 'vue-router'
import Home from '~/pages/index.vue'
export const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: "home",
      index: 1,
    },
    component: Home,
  },
  {
    name: 'i18n',
    path: '/testi18n',
    meta: {
      title: "i18n",
      index: 2,
    },
    component: async () => await import('~/pages/testI18n.vue'),
  }
] as RouteRecordRaw[]
