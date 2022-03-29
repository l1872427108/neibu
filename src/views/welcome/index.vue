
<template>
	<!-- 首页 -->
	<div class="home">
		<!-- 账户包裹 -->
		<div class="home-account">
			<!-- 账户头像 -->
			<img
				class="home-account-img"
				:src="accountInfo.pugeAvater"
				alt=""
			/>
			<!-- 账户信息 -->
			<div class="hone-account-infmation">
				<div class="hone-account-infmation-user">欢迎 {{accountInfo.nickName}}，开始您一天的工作吧！</div>
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
					<div class="home-main-left-carsoul">热搜轮播图</div>
					<!-- 助理办公告 -->
					<div class="home-main-left-Notice">助理办公告</div>
				</div>
				<!-- 主区域右侧 -->
				<div class="home-main-right">
					<!-- 今日任务 -->
          <home-task :user-id="userInfo.uid" class="home-task"></home-task>
					<!-- 微博 -->
					<div class="home-main-right-Hot">微博热搜</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { accountGetInfo } from '~/api/personMessage';
import HomeTask from './HomeTask.vue';
export default {
	name: 'welcome',
  components: { HomeTask },
	data () {
		return {
      // 账户信息
      accountInfo: {}
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	created () {
		this.fetchAccountInfo();
	},
	methods: {
    // 获取账户信息
		async fetchAccountInfo () {
      const result = await accountGetInfo(this.userInfo.uid);
      this.accountInfo = result.data.user;
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	height: 100%;
	position: relative;
	padding: 0;
	.home-account {
		width: inherit;
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
			height: 300px;
			background-color: #fff;
			font-size: 30px;
			font-weight: 700;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.home-main-left-Notice {
			width: 100%;
			height: 300px;
			background-color: #fff;
      display: flex;
			justify-content: center;
			align-items: center;
      font-size: 20px;
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
			margin-top: 20px;
			width: 100%;
			background-color: #fff;
			height: 280px;
      display: flex;
			justify-content: center;
			align-items: center;
      font-size: 20px;
			font-weight: 700;
		}
	}
}


</style>
