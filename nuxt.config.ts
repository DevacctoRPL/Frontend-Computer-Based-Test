// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ssr: false, // Nanti ubah kalo udah jadi full - Adit
  modules: ['@nuxt/ui'],

  app: {
    head: {
      title: 'CBT',
      htmlAttrs: {
        lang: 'id'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  runtimeConfig: {
    public: {
      apiBase: 'https://cbt.synchronizeteams.my.id'
    }
  }
})
