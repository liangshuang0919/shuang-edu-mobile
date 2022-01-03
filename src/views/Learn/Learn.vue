<template>
  <!-- 学习页面组件 -->
  <div class="learn">
    <!-- 全局底部导航组件 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
// 导入组件
// 导入全局底部导航组件
import LayoutFooter from '@/components/LayoutFooterComponent/LayoutFooter.vue'

export default {
  name: 'Learn',
  components: {
    LayoutFooter // 全局底部导航组件
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped></style>
