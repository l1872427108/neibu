<template>
  <el-carousel :indicator-position="isShowIndicator ? '' : 'none'">
    <el-carousel-item v-for="item in carouselList" :key="item.id">
      <!-- 轮播图内容包裹区域 -->
      <div class="carousel-wrap">
        <!-- 图片 -->
        <el-image :src="item.pictureUrl" />
        <!-- 文字 -->
        <p class="carousel-title">{{ item.sentence }}</p>
        <!-- 标志 -->
        <p class="carousel-title-copyright"> <i class="el-icon-minus" />puge</p>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { searchCarousel } from '~/api/home'
export default {
  name: 'HomeCarousel',
  data() {
    return {
      // 轮播图数据
      carouselList: [],
      isShowIndicator: true
    }
  },
  created() {
    this.getCarouselData()
    this.onLayoutResize();
  },
  methods: {
    // 获取轮播图
    async getCarouselData() {
      const res = await searchCarousel()
      console.log(res.data.arrayList)
      this.carouselList = res.data.arrayList
    },
    onLayoutResize() {
      const clientWidth = document.body.clientWidth
      if (clientWidth < 1000) {
        this.isShowIndicator = false
      } else {
        this.isShowIndicator = true
      }
    }
  }
}
</script>

<style lang="scss">
.carousel-wrap {
  height: 100%;
  width: 100%;
  .el-image {
    width: 100%;
    height: 100%;
  }
  .carousel-title, .carousel-title-copyright {
    position: absolute;
    z-index: 100;
    transform: translate(-50%, -50%);
    font-weight: 700;
    color: #fff;
    opacity: .9;
  }
  .carousel-title {
    top: 50%;
    left: 50%;
    font-size: 20px;
  }
  .carousel-title-copyright {
    top: 90%;
    left: 90%;
    font-size: 16px;
  }
}
</style>
