// 请求模块封装
import axios from 'axios' // 导入 axios
import store from '@/store' // 导入 store
import router from '@/router' // 导入 router

// 初始化请求模块
const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

// 封装函数，用来跳转登录页
function redirectLogin() {
  router.push({
    name: 'Login',
    query: {
      // 记录当前页面的路由，方便之后再跳转回来
      redirect: router.currentRouter.fullPath
    }
  })
}

// 设置请求拦截器进行接口鉴权
request.interceptors.request.use((config) => {
  const { user } = store.state // 获取用户登录信息

  // 检测 user 是否存在，并且有 token
  if (user && user.access_token) {
    // 设置请求头
    config.headers.Authorization = user.access_token
  }

  return config
})

let isRefreshing = false // 用一个变量来标记当前是否为一个刷新 token 的状态
let requestArr = [] // 用来存储刷新 token 时等待的请求操作

// 设置响应拦截器，对过期的 token 进行刷新操作
request.interceptors.response.use(
  (response) => {
    // 响应成功，直接返回响应的结果即可
    return response
  },
  async (error) => {
    // 响应失败，进行处理
    if (error.response) {
      // 检查状态码是否为 401，未授权
      if (error.response.status === 401) {
        // 检测是否存在用户的登陆信息
        if (!store.state.user) {
          // 路由跳转
          redirectLogin()
          // 如果不存在，结束即可
          return Promise.reject(error)
        }

        // 发送请求前，先判断是否已经存在刷新 token 的请求
        if (isRefreshing) {
          // 当前正财刷新 token 的话，其他请求先不要发送
          return requestArr.push(() => {
            // error.config 指的是，失败请求的配置对象
            request(error.config)
          })
        }

        isRefreshing = true // 当前正在发送刷新 token 请求

        // 发送刷新 token 请求，尝试刷新 token
        const { data } = await request({
          method: 'POST',
          url: '/front/user/refresh_token',
          data: new window.URLSearchParams({
            refreshtoken: store.state.user.refresh_token
          }).toString()
        })

        // 判断刷新 token 是否成功
        if (data.state !== 1) {
          // 刷新 token 失败，给 store 中的 user 清空
          store.commit('setUser', null)
          // 清除本地 localstorage 中的数据
          window.localStorage.removeItem('mobileUser')
          // 路由跳转
          redirectLogin()
          return Promise.reject(error)
        }

        // 刷新 token 成功
        store.commit('setUser', data.content)

        // 将 requestArr 中的请求重新发送
        requestArr.forEach((callback) => callback())
        requestArr = [] // 清空数组
        isRefreshing = false // 正在刷新状态改为 false
        return request(error.config)
      }
    }
  }
)

export default request // 导出
