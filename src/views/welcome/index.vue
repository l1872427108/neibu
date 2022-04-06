
<template>
  <!-- 首页 -->
  <section class="home">
    <!-- 账户包裹 -->
    <div class="home-account">
      <!-- 账户头像 -->
      <img
        class="home-account-img"
        :src="accountInfo.pugeAvater || 'https://project-resources.puge.net/WechatIMG111.jpeg'"
        onerror="onerror=null;src='https://project-resources.puge.net/WechatIMG111.jpeg'"
      >
      <!-- 账户信息 -->
      <div class="hone-account-infmation">
        <div class="hone-account-infmation-user">欢迎 {{accountInfo.pugeLevel}} {{ accountInfo.nickName }}，开始您一天的工作吧！</div>
        <div class="hone-account-infmation-date">今日是个好天气</div>
      </div>
    </div>

    <!-- 首页主区域 -->
    <div class="home-main">
      <!-- 主区域包裹 -->
      <div class="home-main-wrap">
        <!-- 主区域左侧 -->
        <div class="home-main-left">
          <!-- 轮播图 -->
          <home-carousel class="home-main-left-carsoul" />
          <!-- 助理办公告 -->
          <div class="home-main-left-Notice">待开发～</div>
        </div>
        <!-- 主区域右侧 -->
        <div class="home-main-right">
          <!-- 今日任务 -->
          <home-task :user-id="userInfo.uid" class="home-task" />
          <!-- 微博 -->
          <!-- <div class="home-main-right-Hot">待开发～</div> -->
          <home-hot class="home-main-right-Hot" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { accountGetInfo } from '~/api/personMessage'
import HomeCarousel from './homeCarousel.vue'
import HomeTask from './HomeTask.vue'
import HomeHot from './homeHot.vue'
export default {
  name: 'Welcome',
  components: { HomeTask, HomeCarousel, HomeHot },
  data() {
    return {
      // 账户信息
      accountInfo: {},
      src: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.fetchAccountInfo()
    // this.$refs.imgSrc.onerror = (res) => {
    //   console.log(res);
    // }
    console.log('==>', this.userInfo);
  },
  methods: {
    // 获取账户信息
    async fetchAccountInfo() {
      const result = await accountGetInfo(this.userInfo.uid)
      console.log(result);
      this.accountInfo = result.data.user
      console.log(this.accountInfo)
    }
    // errorHandler() {
    //   return true;
    // }
  }
}
</script>

<style lang="scss" scoped>
.home {
	padding: 0;
	.home-account {
		height: 140px;
		background-color: #fff;
		border-bottom: 1px solid #e8eaec;
		padding-left: 20px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.home-account-img {
			border-radius: 50%;
			width: 80px;
			height: 80px;
		}
		.hone-account-infmation {
			display: flex;
			flex-direction: column;
			margin-left: 20px;
			justify-content: flex-start;
		}
		.hone-account-infmation-user {
			font-size: 20px;
			font-weight: 700;
			margin-bottom: 12px;
		}
		.hone-account-infmation-date {
			color: #808695;
			font-size: 14px;
		}
	}
	.home-main {
		padding: 0 30px;
		margin-top: 16px;
		width: inherit;
		.home-main-wrap {
			display: flex;
			justify-content: space-between;
		}

		.home-main-left {
			width: 70%;
		}
		.home-main-left-carsoul {
			width: 100%;
			background-color: #fff;
		}

		.home-main-left-Notice {
			width: 100%;
			height: 300px;
			background-color: #fff;
      display: flex;
			justify-content: center;
			align-items: center;
      font-size: 30px;
			font-weight: 700;
      margin: 20px 0 50px 0;
		}
		.home-main-right {
			width: 28%;
		}
    .home-task {
      width: 100%;
    }
		.home-main-right-Hot {
			// margin-top: 20px;
			// width: 100%;
			// background-color: #fff;
			// height: 280px;
      // display: flex;
			// justify-content: center;
			// align-items: center;
      // font-size: 20px;
			// font-weight: 700;
      margin-top: 20px;
			padding: 20px;
			box-sizing: border-box;
			width: 100%;
			background-color: #fff;
			height: 280px;
			overflow: hidden;
		}
	}
}

</style>
