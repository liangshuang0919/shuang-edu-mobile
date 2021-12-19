import Vue from 'vue' // 导入 vue 对象
import VueRouter from 'vue-router' // 导入 vue-router 类

Vue.use(VueRouter) // 挂载

// 使用路由懒加载
const Course = () => import(/* webpackChunkName: 'Course' */ '@/views/Course/Course.vue') // 课程页面组件
const Login = () => import(/* webpackChunkName: 'Login' */ '@/views/Login/Login.vue') // 登录页面组件
const Learn = () => import(/* webpackChunkName: 'Learn' */ '@/views/Learn/Learn.vue') // 学习页面组件
const User = () => import(/* webpackChunkName: 'User' */ '@/views/User/User.vue') // 用户页面组件
const Error = () => import(/* webpackChunkName: 'Error' */ '@/views/Error/Error.vue') // 错误页面组件

// 创建路由规则
const routes = [
  // 路由重定向
  {
    path: '/',
    redirect: '/course'
  },
  // 课程页面路由
  {
    path: '/course',
    name: 'Course',
    component: Course,
    meta: {
      title: 'Shuang-课程中心'
    }
  },
  // 登录页面路由
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Shuang-登录'
    }
  },
  // 学习页面路由
  {
    path: '/learn',
    name: 'Learn',
    component: Learn,
    meta: {
      title: 'Shuang-学习中心'
    }
  },
  // 用户页面路由
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: 'Shuang-用户中心'
    }
  },
  // 错误页面路由
  {
    path: '/error',
    name: 'Error',
    component: Error,
    meta: {
      title: '404 Not Found'
    }
  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})

export default router // 导出路由
