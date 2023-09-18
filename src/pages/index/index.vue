<script setup lang="ts">
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
// 轮播图
const bannerList = ref<BannerItem[]>([])
const getHomeBanner = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
// 分类图
const categoryList = ref<CategoryItem[]>([])
const getHomeCategory = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
//热门推荐
const hotList = ref<HotItem[]>([])
const getHomeHot = async () => {
  const res = await getHomeHotAPI()
  console.log(res.result)
  hotList.value = res.result
}
onLoad(() => {
  getHomeBanner(), getHomeCategory(), getHomeHot()
})
</script>

<template>
  <!-- 导航栏 -->
  <CustomNavbar />
  <scroll-view class="scroll-view" scroll-y>
    <!-- 轮播图 -->
    <XtxSwiper :list="bannerList" />
    <!-- 分类栏 -->
    <CategoryPanel :list="categoryList" />
    <!-- 热门推荐 -->
    <HotPanel :list="hotList" />
    <!-- 猜你喜欢 -->
    <XtxGuess />
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f1f1f1;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
