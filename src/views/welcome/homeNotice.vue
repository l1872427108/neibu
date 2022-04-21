<template>
  <el-card>
    <div slot="header">
      <span style="font-size: 18px; font-weight: 700">助理办公告</span>
      <router-link
        to="/noticeDetails"
        style="float: right; padding: 3px 0; color: gray"
      >更多</router-link>
    </div>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        v-infinite-scroll="load"
        class="list"
        infinite-scroll-disabled="disabled"
      >
        <li
          v-for="item in noticeList"
          :key="item.id"
          class="list-item"
          @click="checkList()"
        >
          {{ richTextFormat(item.title) }}
        </li>
      </ul>
      <p v-if="loading" class="home-list-message">加载中...</p>
      <p v-if="noMore" class="home-list-message">没有更多了</p>
    </div>
  </el-card>
</template>

<script>
// 公告详情
import { getLookAllBulletin } from '~/api/noticeList'
// 过滤富文本
import { richTextFormat } from '@/utils/content/index.js'
export default {
  data() {
    return {
      // 公告信息
      current: 1,
      noticeList: [],
      loading: false,
      totalPage: 0,
      richTextFormat,
      timer: null
    }
  },
  computed: {
    noMore() {
      // 当起始页数大于等于总页数时停止加载
      return this.current >= this.totalPage
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  created() {
    this.getNoticeList()
  },
  methods: {
    // 获取列表信息
    getNoticeList() {
      const data = {
        current: this.current,
        size: 5
      }
      getLookAllBulletin(data).then((res) => {
        console.log(res)
        if (res.code === 20000) {
        // 合并数组
          this.noticeList = [
            ...this.noticeList,
            ...res.data.bulletinIPage.records
          ]
          this.totalPage = res.data.bulletinIPage.total
          this.loading = false
        } else {
          this.$message({
            message: res.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 无限滚动
    load() {
    // 滑到底部时进行加载
      this.loading = true
      this.timer = setTimeout(() => {
        this.current++ // 滚动条到底时，页码自增 1
        this.getNoticeList() // 调用接口
      }, 1000)
    },
    // 点击单个跳转
    checkList() {
      this.$router.push('/noticeDetails')
    }
  }
}
</script>

<style lang="scss">
.list-item {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgb(233, 232, 232);
  cursor: pointer;
}

.infinite-list-wrapper {
  height: 200px;
}

.home-list-message {
  text-align: center;
  font-weight: 700;
  color: rgb(90, 156, 248);
}
</style>
