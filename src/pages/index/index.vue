<script setup lang="ts">
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import pageSkeleton from './components/PageSkeleton.vue'
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
  hotList.value = res.result
}
const guessRef = ref<XtxGuessInstance>()
//滚动触底
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
//下拉刷新
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  isTriggered.value = true
  guessRef.value?.resetData()
  await Promise.all([getHomeBanner(), getHomeCategory(), getHomeHot(), guessRef.value?.getMore()])
  isTriggered.value = false
}
//加载
const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBanner(), getHomeCategory(), getHomeHot()])
  isLoading.value = false
})
</script>

<template>
  <!-- 导航栏 -->
  <CustomNavbar />
  <scroll-view
    class="scroll-view"
    scroll-y
    refresher-enabled
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    @refresherrefresh="onRefresherrefresh"
  >
    <pageSkeleton v-if="isLoading" />
    <!-- 轮播图 -->
    <template v-else>
      <XtxSwiper :list="bannerList" />
      <!-- 分类栏 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
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
