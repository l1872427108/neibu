
<template>
	<div class="welcome">
		<div class="welcome-log">
			<img class="welcome-logo-img" src="~/assets/image/logo.png" />
		</div>
    <div class="welcome-content"> 欢迎 {{userInfo.nickName}} 进入内部信息化系统 </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['userInfo'])
	},
	data () {
		return {
			loading: true,
      accountInfo: {}
		};
	},
	mounted () {
		this.loading = false;
	}
};
</script>

<style scoped lang="scss">
@import '~/styles/mixins/mixin';
.welcome {
	.welcome-logo-img {
		width: 200px;
		height: 100px;
	}
  .welcome-content {
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 20px;
    left: 50%;
    top: 50%;
  }
}
</style>
