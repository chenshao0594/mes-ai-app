<route lang="json5" type="home">
{
  layout: 'default',
  type: 'page',
  style: {
    navigationBarTitleText: '发起申请'
    // navigationStyle: 'custom'  TODO 这个导航栏需要自定义吗？
  }
}
</route>

<template>
  <view
    class="h-full w-full flex flex-col justify-center items-center pb-100rpx"
  >
    <wd-sticky class="h-full w-full">
      <view class="h-full !w-[100vw]">
        <!-- 搜索框 -->
        <view class="p-20rpx bg-white">
          <wd-search
            v-model="searchName"
            placeholder="请输入申请名称"
            cancel-txt="筛选"
            placeholder-left
            @search="handleSearch"
            @cancel="handleSearch"
          />
        </view>

        <!-- 流程分类 -->
        <view class="flex px-10rpx bg-white overflow-x-auto">
          <view
            v-for="(tab, index) in categoryList"
            :key="index"
            class="tab-item"
            :class="{ active: activeTab === index }"
            @click="switchTab(index)"
          >
            {{ tab.name }}
          </view>
        </view>
      </view>
    </wd-sticky>
    <!-- 添加间距容器 -->
    <scroll-view
      scroll-y
      class="category-scroll-view"
      :key="activeTab"
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
    >
      <view
        class="mt-20rpx"
        v-for="(definitions, category, categoryIndex) in processDefinitionGroup"
        :key="categoryIndex"
        :id="`category-${category}`"
      >
        <view
          class="flex justify-between items-center text-28rpx font-bold px-30rpx py-20rpx"
        >
          {{ getCategoryName(category) }}
          <wd-icon
            name="arrow-down"
            v-if="!categoryExpanded[categoryIndex]"
            @click="categoryExpanded[categoryIndex] = true"
          />
          <wd-icon
            name="arrow-up"
            v-else
            @click="categoryExpanded[categoryIndex] = false"
          />
        </view>
        <view class="px-20rpx pb-20rpx" v-if="categoryExpanded[categoryIndex]">
          <view
            v-for="(item, index) in definitions"
            :key="index"
            class="list-item"
          >
            <view
              class="item-icon"
              :style="{
                backgroundColor: iconList[index % iconList.length].color
              }"
            >
              <wd-icon
                :name="iconList[index % iconList.length].icon"
                size="20"
                color="#FFF"
              />
            </view>
            <view class="text-30rpx">{{ item.name }}</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部工具栏 @芋艿 这个需要tabbar 需要单独的吗？ -->
    <view class="fixed bottom-0 left-0 right-0 bg-white h-100rpx flex">
      <view class="flex-1 flex flex-col justify-center items-center">
        <wd-icon name="add-circle" color="#0083ff" size="20" />
        <text class="text-24rpx mt-5rpx text-blue-500">发起申请</text>
      </view>
      <!-- 审批中心 @芋艿 审批中心需要放这里吗？-->
      <view class="flex-1 flex flex-col justify-center items-center">
        <wd-icon name="service" size="20" />
        <text class="text-24rpx mt-5rpx">审批中心</text>
      </view>
      <!-- 待定 @芋艿 这里放什么？ -->
      <view class="flex-1 flex flex-col justify-center items-center">
        <wd-icon name="setting" size="24" />
        <text class="text-24rpx mt-5rpx">待定</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import {
    getCategorySimpleList,
    CategoryVO
  } from '@/service/category/CategoryApi'
  import * as DefinitionApi from '@/service/bpm/definition/index'

  // 流程分类
  const categoryList = ref<CategoryVO[]>([])
  // 流程定义列表
  const processDefinitionList = ref([])
  /** 过滤后流程定义列表 */
  const filteredProcessDefinitionList = ref([])
  // 当前选中的分类
  const activeTab = ref(0)
  // 搜索关键字
  const searchName = ref('')
  // 滚动位置
  const scrollTop = ref(0)
  // 流程分类展开
  const categoryExpanded = ref<boolean[]>([])

  // 流程定义图标列表 @芋艿 这个图标需要配置，还是给默认的
  const iconList = [
    {
      icon: 'warning',
      color: '#D98469'
    },
    {
      icon: 'heart',
      color: '#7BC67C'
    },
    {
      icon: 'cart',
      color: '#4A7FEB'
    },
    {
      icon: 'home',
      color: '#4A7FEB'
    },
    {
      icon: 'location',
      color: '#4A9DEB'
    }
  ]

  /** 流程定义的分组 */
  const processDefinitionGroup = computed<Record<string, any[]>>(() => {
    if (!filteredProcessDefinitionList.value?.length) {
      return {}
    }
    const grouped = {}
    filteredProcessDefinitionList.value.forEach((item) => {
      if (!item.category) {
        return
      }
      if (grouped[item.category]) {
        grouped[item.category].push(item)
      } else {
        grouped[item.category] = []
        grouped[item.category].push(item)
      }
    })
    const orderedGroup = {}
    // 按照 categoryList 的顺序重新组织数据
    categoryList.value.forEach((category: any) => {
      if (grouped[category.code]) {
        orderedGroup[category.code] = grouped[category.code]
      }
    })
    return orderedGroup
  })

  /**
   * 获取流程分类列表
   */
  const getCategoryList = async () => {
    try {
      categoryList.value = await getCategorySimpleList()
      categoryExpanded.value = categoryList.value.map(() => true)
    } catch (error) {
      // 处理请求错误
      console.error('获取流程分类失败:', error)
    }
  }

  /** 获取流程定义数据 */
  const getProcessDefinitionList = async () => {
    try {
      // 流程定义
      processDefinitionList.value =
        await DefinitionApi.getProcessDefinitionList({ suspensionState: 1 })
      // 初始化过滤列表为全部流程定义
      filteredProcessDefinitionList.value = processDefinitionList.value
    } catch (error) {
      // 处理请求错误
      console.error('获取流程定义失败:', error)
    }
  }

  /** 通过分类 code 获取对应的名称 */
  const getCategoryName = (categoryCode: string) => {
    return categoryList.value?.find(
      (ctg: CategoryVO) => ctg.code === categoryCode
    )?.name
  }

  /**
   * 切换流程分类
   *
   */
  const switchTab = (index: number) => {
    activeTab.value = index
    const currentCategory = categoryList.value[index]
    categoryExpanded.value[index] = true
    if (currentCategory && currentCategory.code) {
      // 先重置 scrollTop
      scrollTop.value = 0
      setTimeout(() => {
        const query = uni.createSelectorQuery()
        // 选择目标元素
        query.select(`#category-${currentCategory.code}`).boundingClientRect()
        // 获取 scroll-view 位置
        query.select('.category-scroll-view').boundingClientRect()
        query.exec(function (res) {
          if (res && res[0] && res[1]) {
            // 计算元素相对于 scroll-view 的相对位置
            const targetOffset = res[0].top - res[1].top
            // 更新 scrollTop
            scrollTop.value = targetOffset
          }
        })
      }, 100)
    }
  }

  /** 搜索流程定义 */
  const handleSearch = () => {
    if (searchName.value.trim()) {
      // 如果有搜索关键字，进行过滤
      filteredProcessDefinitionList.value = processDefinitionList.value.filter(
        (definition: any) =>
          definition.name.toLowerCase().includes(searchName.value.toLowerCase())
      )
    } else {
      // 如果没有搜索关键字，恢复所有数据
      filteredProcessDefinitionList.value = processDefinitionList.value
    }
  }

  onLoad(() => {
    getCategoryList()
    getProcessDefinitionList()
  })
</script>
<style lang="scss" scoped>
  .tab-item {
    position: relative;
    padding: 20rpx 30rpx;
    font-size: 28rpx;
    white-space: nowrap;

    &.active {
      font-weight: bold;
      color: #0083ff;

      &:after {
        position: absolute;
        right: 30rpx;
        bottom: 0;
        left: 30rpx;
        height: 4rpx;
        content: '';
        background-color: #0083ff;
      }
    }
  }

  .category-scroll-view {
    height: calc(100vh - 160rpx);
    padding-top: 20rpx;
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: 20rpx;
    margin-bottom: 16rpx;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    border-radius: 8rpx;

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }

    .item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60rpx;
      height: 60rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
    }

    .item-name {
      font-size: 28rpx;
    }
  }
</style>
