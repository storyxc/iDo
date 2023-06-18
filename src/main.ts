import { createApp } from 'vue'
import '@/assets/less/base.less'
import '@/assets/iconfont/iconfont.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
    .$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
    .then(() => console.log())
