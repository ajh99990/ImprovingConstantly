import type { Router } from 'vue-router'

export const setupGlobalGuards = (router: Router) => {
  router.beforeEach((to,from) => {
    // console.log("进入路由", to.meta, lang)
    return true
  })
  router.afterEach(() => {
    // console.log("已经进入路由")
  })
}
