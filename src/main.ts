import { createApp } from 'vue'
import '@/assets/less/base.less'
import '@/assets/iconfont/iconfont.css'

import App from './App.vue'

const app = createApp(App)
app.mount('#app')
    .$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
    .then(() => console.log())
