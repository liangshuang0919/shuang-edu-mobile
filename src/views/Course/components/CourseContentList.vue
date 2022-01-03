<template>
  <!-- 课程页面内容列表组件 -->
  <div class="course-content-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 课程内容列表组件 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error"
        error-text="请求失败，点击重新加载" @load="onLoad">
        <!-- 渲染课程列表 -->
        <van-cell v-for="item in courseList" :key="item.id">
          <!-- 课程左侧图片 -->
          <div class="course-img">
            <img :src="item.courseImgUrl" alt="">
          </div>

          <!-- 课程右侧信息 -->
          <div class="course-info">
            <!-- 课程名称 -->
            <h3 v-text="item.courseName"></h3>
            <!-- 课程简介 -->
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <!-- 价格 -->
            <p class="course-price">
              <!-- 折扣价 -->
              <span class="course-discount">￥{{ item.discounts }}</span>
              <!-- 原价 -->
              <s class="course-price">￥{{ item.price }}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入接口
// 1、getQueryCourses：分页查询课程信息接口
import { getQueryCourses } from '@/services/course'

export default {
  name: 'CourseContentList',
  data () {
    return {
      courseList: [], // 课程列表数据
      loading: false, // 课程加载中的数据
      finished: false, // 课程加载完成后的状态
      error: false, // 数据加载错误的状态
      refreshing: false, // 数据下拉刷新的状态
      coursePage: 1 // 加载课程数据的页数
    }
  },
  methods: {
    // 数据下拉刷新的方法
    async onRefresh () {
      this.currentPage = 1 // 还原请求页数
      const { data } = await getQueryCourses({
        currentPage: this.coursePage, // 请求的页数
        pageSize: 10, // 请求条数
        status: 1 // 请求上架的课程
      })
      // 如果请求成功
      if (data.code === '000000') {
        this.refreshing = false // 关闭下拉刷新状态
        this.$toast({
          message: '刷新成功',
          duration: 1250
        })
      }
    },
    // 数据上拉加载的方法
    async onLoad () {
      // 发送请求
      const { data } = await getQueryCourses({
        currentPage: this.coursePage, // 请求的页数
        pageSize: 10, // 请求条数
        status: 1 // 请求上架的课程
      })

      // 当数据加载完毕，就是当请求到的数据不满 10 条的时候，请求完毕
      if (data.data.records.length < 10) {
        this.finished = true // 让列表完成加载
      } else {
        // 数据没有请求玩就发起请求获取数据
        // 如果请求成功
        if (data.code === '000000') {
          this.coursePage++ // 下次请求下一页的数据
          this.error = false // 让列表不加载错误字段
          this.loading = false // 让状态结束
          // 追加请求的数据
          this.courseList.push(...data.data.records)
        } else {
          this.error = true // 请求失败就让列表显示加载错误字段
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 整体样式
.course-content-list {
  margin-bottom: 50px;

  // 课程列表样式
  .van-cell__value {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 140px;
  }

  // 课程图片样式
  .course-img {
    // flex: 1;
    width: 100px;
    height: 130px;

    img {
      width: 100px;
      height: 100%;
      border-radius: 6px;
    }
  }

  // 课程信息样式
  .course-info {
    flex: 2;
    display: flex;
    flex-direction: column;
    padding-left: 10px;

    h3 {
      margin: 0;
    }

    // 课程简介样式
    .course-preview {
      display: -webkit-box;
      overflow: hidden;
      margin: 0;
      margin-bottom: 30px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    // 课程价格样式
    .course-price {
      margin: 0;
      margin-top: 20px;

      // 课程折扣价样式
      .course-discount {
        color: #ff7452;
        margin-right: 5px;
      }
    }
  }
}
</style>
