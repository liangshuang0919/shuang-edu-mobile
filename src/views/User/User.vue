<template>
  <!-- 用户页面组件 -->
  <div class="user">
    <!-- 顶部功能 -->
    <van-cell-group>
      <!-- 用户信息区域 -->
      <van-cell class="user-info" :border="false">
        <!-- 头像 -->
        <van-image width="50" height="50" round
          :src="userInfo.portrait || 'https://s0.lgstatic.com/common/image/pc/default_boy_headpic1.png'">
        </van-image>

        <!-- 用户信息内容区域 -->
        <div class="user-info-content">
          <!-- 昵称 -->
          <h3>{{ userInfo.userName }}</h3>
          <!-- 描述 -->
          <span>
            <van-icon name="edit" />编辑个人资料
          </span>
        </div>
      </van-cell>

      <!-- 账户信息区域 -->
      <van-cell class="account-info">
        <!-- 账户信息的宫格样式区域 -->
        <van-grid :border="false">
          <!-- 学习时长 -->
          <van-grid-item>
            <!-- 账户数据 -->
            <h2>14.05</h2>
            <!-- 账户信息的名称 -->
            <span>学习时长</span>
          </van-grid-item>
          <!-- 钱包/勾豆 -->
          <van-grid-item>
            <!-- 账户数据 -->
            <h2>200</h2>
            <!-- 账户信息的名称 -->
            <span>钱包/勾豆</span>
          </van-grid-item>
          <!-- 优惠券 -->
          <van-grid-item>
            <!-- 账户数据 -->
            <h2>1</h2>
            <!-- 账户信息的名称 -->
            <span>优惠券</span>
          </van-grid-item>
          <!-- 学分 -->
          <van-grid-item>
            <!-- 账户数据 -->
            <h2>213</h2>
            <!-- 账户信息的名称 -->
            <span>学分</span>
          </van-grid-item>
        </van-grid>
      </van-cell>

      <!-- 底部列表区域 -->
      <van-cell icon="user-o" title="分销中心" is-link value="收益200元"></van-cell>
      <van-cell icon="setting-o" title="个性化设置" is-link></van-cell>
      <van-cell icon="down" title="我的下载" is-link></van-cell>
      <van-cell icon="question-o" title="帮助与反馈" is-link></van-cell>
      <van-cell icon="info-o" title="关于" is-link value="v2.0.0"></van-cell>
    </van-cell-group>

    <!-- 全局底部导航组件 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
// 导入接口
// 1、getInfo：获取用户基本信息接口
import { getInfo } from '@/services/user'

// 导入组件
// 导入全局底部导航组件
import LayoutFooter from '@/components/LayoutFooterComponent/LayoutFooter.vue'

export default {
  name: 'User',
  components: {
    LayoutFooter // 全局底部导航组件
  },
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  created () {
    // 调用获取用户信息的方法
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getInfo()
      // 如果请求成功
      if (data.state === 1) {
        this.userInfo = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 整体样式
.user {
  // 用户信息区域样式
  .user-info {
    padding: 30px 20px 0;
    background-color: rgb(248, 150, 3);

    // 包裹用户信息内容的 vant 组件样式
    .van-cell__value {
      display: flex;
      align-items: center;

      // 用户信息内容样式
      .user-info-content {
        padding-left: 15px;

        // 昵称
        h3 {
          margin: 5px;
          font-size: 18px;
        }
      }
    }
  }

  // 账户信息区域样式
  .account-info {
    margin-top: -1px;
    background-color: rgb(248, 150, 3);

    // 宫格样式
    .van-grid {
      overflow: hidden;
      border-radius: 10px;

      // 每一个小宫格的样式
      .van-grid-item {
        height: 2rem;

        // 账户数据
        h2 {
          margin: 5px;
        }

        // 账户标题
        span {
          color: #aaa;
        }
      }
    }
  }
}
</style>
