import Vue from 'vue' // 导入 vue 对象
import VueRouter from 'vue-router' // 导入 vue-router 类
import store from '@/store' // 导入

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
      title: 'Shuang-学习中心',
      requiesAuth: true // 进行登录校验
    }
  },
  // 用户页面路由
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: 'Shuang-用户中心',
      requiesAuth: true // 进行登录校验
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

// 设置路由守卫，进行登录检测与跳转
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 判断目标路由是否需要校验跳转
  if (to.matched.some((record) => record.meta.requiesAuth)) {
    // 验证 vuex 是否存储了用户登录信息
    // 如果未登录
    if (!store.state.user) {
      // 跳转到登录页面
      return next({
        name: 'Login',
        // 对前一个页面地址进行保存，为了登录的时候可以跳转到原本想去到的页面
        query: {
          redirect: to.fullPath
        }
      })
    }
    // 已经登录过，正常跳转
    next()
  } else {
    next()
  }
})

export default router // 导出路由
