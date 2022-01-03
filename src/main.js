import Vue from 'vue' // 导入 vue 对象
import App from './App.vue' // 导入主页面
import router from './router' // 导入 vue-router
import store from './store' // 导入 vuex

import 'amfe-flexible' // 导入 lib-flexble

// 导入组件
import Vant, { Lazyload, Toast } from 'vant' // 导入 vant 组件
import 'vant/lib/index.css' // 导入 vant 组件样式

Vue.use(Vant) // 将 vant 组件注册在 vue 上
Vue.use(Lazyload)
Vue.use(Toast)

// 阻止启用生产消息
Vue.config.productionTip = false

// 初始化 vue 实例
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
