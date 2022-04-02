<!-- 微博热搜 -->
<template>
  <div class="home-main-hot">
    <h2 class="home-main-hot-title">微博热搜</h2>
    <div class="hot-wrape">
      <div v-for="(item, index) in weiboHotList" :key="index" class="hot-txt">
        <!-- 微博链接 -->
        <a :href="item.url" target="_blank">
          <p class="hot-title">#{{ item.hotWord }}#</p>
          <div class="hot-right">
            <img src="@/assets/image/hot.png" alt="">
            <span>{{ item.hotWordNum }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { weiboHotSearch } from '~/api/home'
export default {
  components: {},
  data() {
    return {
      // 微博热搜列表数据
      weiboHotList: []
    }
  },
  created() {
    this.getWeiboHotSearch()
  },
  methods: {
    /**
         * 获取微博热搜数据
         */
    getWeiboHotSearch() {
      weiboHotSearch().then((res) => {
        this.weiboHotList = res.data.weiBoTopList
        console.log(this.weiboHotList)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.home-main-hot {
	height: 100%;
}
.home-main-hot-title {
	font-size: 18px;
	margin-bottom: 16px;
	font-weight: 700;
}
.hot-txt {
	margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
	width: 100%;
}
.hot-wrape {
	height: 100%;
	overflow-y: scroll;
	a {
		color: #333;
		text-decoration: none;
		display: flex;
		justify-content: space-between;
		.hot-title {
			width: 130px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
        span{
            color: #ccc;
        }
		img {
			border: 0;
			width: 15px;
			margin-right: 10px;
      vertical-align: middle;

		}
        p:hover {
		color: #eb7350;
	}
	}
}

.hot-wrape::-webkit-scrollbar {
	display: none;
}
</style>
