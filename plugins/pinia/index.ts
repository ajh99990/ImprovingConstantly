import { createPinia } from 'pinia'
import type { App } from 'vue'
import persistentStorage from "./plugins/persistentStorage"
export const pinia = createPinia()

export const installStore = (app: App) => {
  pinia.use(persistentStorage)
  app.use(pinia)
}
