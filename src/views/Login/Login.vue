<template>
  <!-- 登录页面组件 -->
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar left-text="返回" title="登录" left-arrow @click-left="onClickLeft" />

    <!-- 登录表填 -->
    <van-form @submit="onSubmit">
      <!-- 手机号表单 -->
      <van-field v-model="formData.phone" name="phone" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请输入手机号' },
        { validator: phoneCheck, message: '请输入正确的手机号' }]" />
      <!-- 密码表单 -->
      <van-field v-model="formData.password" type="password" name="password" label="密码"
        placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' },
        { validator: passwordCheck, message: '输入的密码格式错误，请重新输入'}]" />
      <div style="margin: 16px;">
        <van-button round block type="info" :loading="isLoading" native-type="submit"
          loading-text="登录中...">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入请求接口
// 1、login：用户登录接口
import { login } from '@/services/user'

export default {
  name: 'Login',
  data () {
    return {
      // 表单数据
      formData: {
        phone: '18201288771',
        password: '111111'
      },
      isLoading: false // 控制登录按钮加载中的状态
    }
  },
  methods: {
    // 点击返回按钮触发的事件
    onClickLeft () {
      this.$router.go(-1) // 跳转到登陆之前的页面
    },
    // 校验手机号表单
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    // 校验密码表单
    passwordCheck (value) {
      return /^[a-zA-Z0-9]{6,12}$/.test(value)
    },
    // 提交表单事件
    async onSubmit () {
      this.isLoading = true // 更改登录按钮加载状态
      // 发送请求
      const { data } = await login(this.formData)
      // 如果请求成功
      if (data.state === 1) {
        this.isLoading = false // 取消登录按钮加载状态
        this.$toast.success('登陆成功~') // 提示框
        // 将用户登录信息存储到 vuex 中
        this.$store.commit('setUser', data.content)
        // 路由跳转
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        // 请求失败
        this.$toast.fail('用户名或密码错误！') // 提示框
        this.formData.password = '' // 清空密码
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
