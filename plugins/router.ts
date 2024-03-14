import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupGlobalGuards } from '@/router/guards'
import { routes } from '@/router/routes'

export const router = createRouter({
  history: createWebHashHistory(process.env.VUE_APP_BASE_URL),
  routes,
})

export const installRouter = (app: App) => {
  app.use(router)
  setupGlobalGuards(router)
}
