import { createApp } from 'vue'
import '@/style/index.scss'
import '@/utils/adaptive.js'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

createApp(App).use(store).use(router).use(Vant).mount('#app')
