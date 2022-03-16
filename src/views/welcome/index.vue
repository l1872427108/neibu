
<template>
	<div class="welcome">
		<div class="welcome-wrap">
      <div class="welcomeLeft">
        <div class="welcomeTopOne">
          <h1 class="picture">热搜轮播图</h1>
          <el-input suffix-icon="el-icon-search" type="text" v-model="val"></el-input>
        </div>
        <div class="welcomeTopTwo">

          <div class="div-image">
            <img :src="userInfo.imageUrl" alt="">
          </div>
          <div class="div-wrap">
            姓名： {{userInfo.nickName}}
          </div>
          <el-divider></el-divider>
          <div class="div-wrap">
            用户名： {{userInfo.username}}
          </div>
          <el-divider></el-divider>
          <div class="div-wrap">
            邮箱： {{userInfo.email}}
          </div>
        </div>
		  </div>
		  <div class="welcomeRight">
        <div class="welcomeRightOne">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="cases"></el-progress>
          <el-card class="box-card">
            <ul class="infinite-list" style="overflow:auto">
              <div class="title">
                <div>标题</div>
                <div>状态</div>
              </div>
              <el-divider></el-divider>
              <li :key="item.id" v-for="item in list" class="infinite-list-item">
                 <el-tooltip effect="light" class="item" :content="`截止日期 ${item.lastTime}`" placement="right-start">
                  <div class="infinite-list-item-wrap">
                    <div>{{item.title}}</div>
                    <el-button :type="like1(item.state)" :icon="like(item.state)" circle></el-button>
                  </div>
                  </el-tooltip>
                <el-divider></el-divider>
              </li>
            </ul>
          </el-card>
        </div>
        <div class="welcomeRightTwo">
          <div class="welcomeRightTwoFirst">
            <h1 class="">微博热搜</h1>
          </div>
          <div class="welcomeRightTwoSecond">
            <h1 class="">微博热搜</h1>
          </div>
        </div>
		    </div>
	    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { searchTask } from '~/api/home';
export default {
	name: 'welcome',

	data () {
		return {
      list: [],
      val: '',
      cases: 0
		};
	},
  computed: {
    ...mapGetters(['userInfo'])
  },

	created () {
    console.log(this.userInfo);
    this.fetchData();
	},

	methods: {
    like (status) {
      if (status == 0) {
        return 'el-icon-loading';
      } else if (status == 1) {
        return 'el-icon-check';
      } else if (status == 2) {
        return 'el-icon-close';
      }
    },
    like1 (status) {
      if (status == 0) {
        return 'primary';
      } else if (status == 1) {
        return 'success';
      } else if (status == 2) {
        return 'danger';
      }
    },
    animate () {
    },
    async fetchData () {
      const result = await searchTask(this.userInfo.uid);
      this.list = result.data.task;
      this.cases = parseInt(result.data.cases);
    }
	}
};
</script>

<style lang="scss" scoped>
.welcome {
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
      transition: .4s;
      &:hover {
        transform: scale(1.1);
      }
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
      flex-direction: column;
      justify-content: space-around;
      // text-align: center;
      transition: .4s;
      &:hover {
        transform: scale(1.1);
      }
      .div-image {
        width: 80px;
        height: 80px;
        // text-align: center;
        // border-radius: 50%;
        margin: 0 auto;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .div-wrap {
        // border-bottom: 1px solid red;
      }
      // justify-content: center;
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
      width: 33%;
      background-color: #d4d6da;
      height: 100%;
      padding: 20px;
      border-radius: 30px;
      transition: .4s;
      // overflow: auto;
      .el-progress {
        width: 100%;
        margin-bottom: 20px;
      }
      .box-card {
        // height: 100%;
        height: 80%;
        overflow: auto;
        .title {
          display: flex;
          justify-content: space-between;
        }
        .infinite-list-item {
          margin: 20px 0;
          // text-align: center;
          // display: flex;
          .infinite-list-item-wrap {
            display: flex;
            // flex-direction: ;
            justify-content: space-between;
          }
          .el-result {
            width: 20px !important;
            height: 20px !important;
          }
        }
      }
      &:hover {
        transform: scale(1.1);
      }
      .task {
        font-size: 40px;
        font-weight: 700;
        // align-items: center;
      }
    }
    .welcomeRightTwo {
      width: 60%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      .welcomeRightTwoFirst {
        width: 48%;
        height: 100%;
        background-color: #d4d6da;
        border-radius: 30px;
        transition: .4s;
        display: flex;
        justify-content: center;
        &:hover {
          transform: scale(1.1);
        }
        .infinite-list {
          width: 100%;
        }
        .wait {
          font-size: 20px;
          font-weight: 700;
          margin-top: 15px;
          margin-left: 20px;
        }
      }
      .welcomeRightTwoSecond {
        width: 48%;
        height: 100%;
        background-color: #d4d6da;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        transition: .4s;
        &:hover {
          transform: scale(1.1);
        }
        .gong {
          font-size: 40px;
          font-weight: 700;
        }
      }
    }
  }
}

</style>
