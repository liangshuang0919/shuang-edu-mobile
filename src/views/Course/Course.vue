<template>
  <!-- 选课页面组件 -->
  <div class="course">
    <!-- 课程头部组件 -->
    <course-header></course-header>
    <!-- 课程内容组件 -->
    <course-content></course-content>
    <!-- 全局底部导航组件 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
// 导入组件
// 导入课程头部组件
import CourseHeader from './components/CourseHeader.vue'
// 导入课程内容组件
import CourseContent from './components/CourseContent.vue'
// 导入全局底部导航组件
import LayoutFooter from '@/components/LayoutFooterComponent/LayoutFooter.vue'

export default {
  name: 'Course',
  components: {
    CourseHeader, // 课程头部组件
    CourseContent, // 课程内容组件
    LayoutFooter // 全局底部导航组件
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
