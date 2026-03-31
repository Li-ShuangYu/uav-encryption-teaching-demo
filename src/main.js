import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 引入我们刚才写的路由配置

const app = createApp(App)
app.use(router) // 告诉 Vue 使用路由
app.mount('#app')