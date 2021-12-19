<template>
  <!-- 课程页面内容组件 -->
  <div class="course-content">
    <!-- 轮播图组件 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in swiperData" :key="item.id">
        <img v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 课程内容列表区域 -->
    <course-content-list></course-content-list>
  </div>
</template>

<script>
// 导入接口
// 1、getAllAds：获取所有的广告位及其对应的广告接口
import { getAllAds } from '@/services/course'

// 导入课程内容列表组件
import CourseContentList from './CourseContentList.vue'

export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  data () {
    return {
      swiperData: []
    }
  },
  created () {
    // 调用请求轮播图图片信方法
    this.loadSwiperData()
  },
  methods: {
    // 请求轮播图方法
    async loadSwiperData () {
      // 发送请求
      const { data } = await getAllAds({
        spaceKeys: '999' // 999 请求轮播图数据的参数
      })
      // 如果请求成功
      if (data.state === 1) {
        // 筛选出来 status 为 1 的图片，因为 status 为 1 才是上架的状态
        this.swiperData = data.content[0].adDTOList
          .filter(item => item.status)
          .map(item => {
            return {
              id: item.id,
              img: item.img
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 整体样式
.course-content {
  // 轮播图区域样式
  .van-swipe {
    height: 180px;

    .van-swipe-item {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 180px;
      }
    }
  }
}
</style>
