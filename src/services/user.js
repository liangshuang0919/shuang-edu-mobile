// 用户接口封装文件
import request from '@/utils/request' // 导入封装的请求函数

// 1、用户登录接口
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // 使用浏览器新增的 URLSearchParams 类，将参数变为 ?a=b& 的格式
    data: new URLSearchParams(data).toString()
  })
}

// 2、用户基本信息接口
export const getInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
