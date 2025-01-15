import './assets/main.css'
import './scss/styles.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import { vMaska } from 'maska/vue'
import VueTablerIcons from 'vue-tabler-icons'
import 'ant-design-vue/dist/reset.css'
import AppParentCard from '@/components/AppParentCard.vue'
import AppTitleCard from './components/AppTitleCard.vue'
import AppBreadcrumb from './components/AppBreadcrumb.vue'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .use(Antd)
  .use(PerfectScrollbarPlugin)
  .use(VueTablerIcons)
  .component('app-card', AppParentCard)
  .component('app-card-two', AppTitleCard)
  .component('app-breadcrumb', AppBreadcrumb)
  .directive('maska', vMaska)

router.isReady().then(() => {
  app.mount('#app')
})
