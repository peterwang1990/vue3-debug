import 'remixicon/fonts/remixicon.css'
import BigNumber from 'bignumber.js'
import 'amfe-flexible/index.js'
import { createApp } from 'vue'
import { bus } from './utils/bus'
import router from './router/index'
import { key, store } from './store'
import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.config.globalProperties.$bus = bus

BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_DOWN })
app.config.globalProperties.$BigNumber = BigNumber

// styleImport(app).use(router).use(store, key).mount('#app')
// app.use(ElementPlus)
app.use(router).use(store, key).mount('#app')
