
<template>
	<div class="welcome">
		<div class="welcome-wrap">
      <div class="welcomeLeft">
        <div class="welcomeTopOne">
          <h1 class="picture">热搜轮播图</h1>
          <el-input suffix-icon="el-icon-search" type="text" v-model="val"></el-input>
        </div>
        <div class="welcomeTopTwo">
          <h1 class="info">个人信息</h1>
        </div>
		  </div>
		  <div class="welcomeRight">
        <div class="welcomeRightOne">
          <h1 class="task">今日任务</h1>
        </div>
        <div class="welcomeRightTwo">
          <div class="welcomeRightTwoFirst">
            <div class="wait">待开发。。</div>
          </div>
          <div class="welcomeRightTwoSecond">
            <h1 class="gong">助理版公告</h1>
          </div>
        </div>
		    </div>
	    </div>
    </div>
</template>

<script>
export default {
	name: 'welcome',

	data () {
		return {
			h: '',
			m: '',
			s: '',
      val: ''
		};
	},

	created () {
		this.getTime();
		setInterval(() => {
			this.getTime();
		}, 1000);
	},

	methods: {
		getTime () {
			this.h = new Date().getHours();
			this.m = new Date().getMinutes();
			this.s = new Date().getSeconds();
			if (this.h < 10) {
				this.h = '0' + this.h;
			}
			if (this.m < 10) {
				this.m = '0' + this.m;
			}
			if (this.s < 10) {
				this.s = '0' + this.s;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.welcome {
  // width: 100%;
  height: 100%;
  position: relative;
}
.welcome-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90%;
  width: 90%;
  .welcomeLeft {
    width: 100%;
    height: 48%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    .welcomeTopOne {
      box-sizing: border-box;
      width: 62%;
      background-color: #d4d6da;
      height: 100%;
      padding: 20px;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .picture {
        font-size: 40px;
        font-weight: 700;
        align-items: center;
      }
      ::v-deep .el-input {
        border-radius: 30px;
        width: 80%;
        input {
          height: 40px;
          border-radius: 30px;
        }
      }
    }
    .welcomeTopTwo {
      width: 35%;
      background-color: #d4d6da;
      height: 100%;
      padding: 20px;
      border-radius: 30px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      .info {
        font-size: 40px;
        font-weight: 700;
        align-items: center;
      }
    }
  }
  .welcomeRight {
    width: 100%;
    height: 48%;
    display: flex;
    justify-content: space-between;
    .welcomeRightOne {
      box-sizing: border-box;
      width: 35%;
      background-color: #d4d6da;
      height: 100%;
      padding: 20px;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      .task {
        font-size: 40px;
        font-weight: 700;
        // align-items: center;
      }
    }
    .welcomeRightTwo {
      width: 62%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .welcomeRightTwoFirst {
        width: 100%;
        height: 20%;
        background-color: #d4d6da;
        border-radius: 30px;
        .wait {
          font-size: 20px;
          font-weight: 700;
          margin-top: 15px;
          margin-left: 20px;
        }
      }
      .welcomeRightTwoSecond {
        width: 100%;
        height: 70%;
        background-color: #d4d6da;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        .gong {
          font-size: 40px;
          font-weight: 700;
        }
      }
    }
  }


}
</style>
