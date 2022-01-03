import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 挂载 vuex

// 初始化 vuex 实例
// 导出
export default new Vuex.Store({
  state: {
    // 存储用户登录信息
    user: JSON.parse(window.localStorage.getItem('mobileUser')) || null // 最开始的时候从 llocalstorage 中获取
  },
  mutations: {
    // 用于修改用户登录信息
    setUser(state, payload) {
      // payload 为请求到的 JSON 格式的数据，需要对其进行转换
      state.user = JSON.parse(payload)
      // 本地存储
      window.localStorage.setItem('mobileUser', payload)
    }
  },
  actions: {},
  modules: {}
})
