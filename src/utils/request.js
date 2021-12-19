// 请求模块封装
import axios from 'axios' // 导入 axios

// 初始化请求模块
const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

export default request // 导出
