import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  preflight: false,
  analyze: {
    analysis: {
      interpretUtilities: false,
    },
    server: {
      port: 4000,
      open: false,
    },
  },
  extract: {
    include: [
      "./components/**/*.{vue,js}",
      "./composables/**/*.{js,ts}",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./modules/**/*.vue"
    ],
  },
  scan: true,
})