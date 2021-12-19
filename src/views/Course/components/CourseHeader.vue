<template>
  <!-- 课程页面头部组件 -->
  <div class="course-header">
    <!-- logo -->
    <van-image :src="require('@/assets/images/my-logo.png')"></van-image>
    <h1>Shuang-edu-mobile</h1>
  </div>
</template>

<script>
export default {
  name: 'CourseHeader'
}
</script>

<style lang="scss" scoped>
// 整体样式
.course-header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
  height: 50px;
  background-color: #fff;
  z-index: 1;

  // logo 区域样式
  .van-image {
    width: 40px;

    // logo 图片样式
    .van-image__img {
      width: 40px;
    }
  }

  // 标题样式
  h1 {
    font-size: 20px;
  }
}
</style>
