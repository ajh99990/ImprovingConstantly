import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';

const messages = {
  en,
  zh
};


export const installI18n = (app: App) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'zh',
    messages,
  })

  app.use(i18n)
}
