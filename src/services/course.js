// 课程接口封装文件
import request from '@/utils/request' // 导入封装的请求函数

// 1、获取所有的广告位及其对应的广告接口
export const getAllAds = (params) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params
  })
}

// 2、分页查询课程信息接口
export const getQueryCourses = (data) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data: data
  })
}
