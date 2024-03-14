import VConsole from "vconsole"

import App from './app.vue'

import { router, installRouter } from '@/plugins/router'
import { installI18n } from '@/plugins/i18n'
import { installStore } from '@/plugins/pinia'
import { installVant } from '@/plugins/vant'
import { setupAutoImport } from "@/plugins/componentsAutoImport"

import 'normalize.css'
import './assets/style/index.scss'
import 'windi.css'
import { createApp } from "vue"
async function bootstrap() {
  const app = createApp(App)
  window.global_vue_app_instance = app
  installStore(app)
  installI18n(app)
  installVant(app)
  installRouter(app)
  setupAutoImport(app)
  await router.isReady()
  app.mount('#app')
}
process.env.VUE_APP_VCONSOLE_ENABLE === 'true' && new VConsole()
bootstrap()
