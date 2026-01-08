import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
/* eslint-disable */
loadFonts().then(() => {
    createApp(App)
        .use(vuetify)
        .mount('#app')
})
