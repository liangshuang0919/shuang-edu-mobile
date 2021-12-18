import Vue from 'vue' // 导入 vue 对象
import App from './App.vue' // 导入主页面
import router from './router' // 导入 vue-router
import store from './store' // 导入 vuex

// 阻止启用生产消息
Vue.config.productionTip = false

// 初始化 vue 实例
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
