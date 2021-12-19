<template>
  <!-- 课程页面内容列表组件 -->
  <div class="course-content-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 课程内容列表组件 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error"
        error-text="请求失败，点击重新加载" @load="onLoad">
        <van-cell v-for="item in courseList" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'CourseContentList',
  data () {
    return {
      courseList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // 课程列表数据
      loading: false, // 课程加载中的数据
      finished: false, // 课程加载完成后的状态
      error: true, // 数据加载错误的状态
      refreshing: false // 数据下拉刷新的状态
    }
  },
  methods: {
    // 数据上拉加载的方法
    onLoad () {
      console.log(1)
    },
    // 数据下拉刷新的方法
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="scss" scoped>
// 整体样式
.course-content-list {
  margin-bottom: 50px;
}
</style>
