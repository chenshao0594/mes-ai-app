<template>
  <view class="p-4 flex flex-wrap gap-x-4">
    <view
      v-for="item in pagination.list"
      :key="item.id"
      class="w-88 bg-white rounded-2xl p-3 pb-0 mb-4"
    >
      <view class="w-full">
        <view class="flex justify-between items-center mb-2">
          <text class="font-bold text-xl text-black truncate w-54">{{
            item.processInstance.name
          }}</text>
          <!-- todo 查看详情去掉，改成点击卡片，跳转到审批界面 -->
          <text
            class="px-2 py-1 rounded-xl bg-indigo-100 text-blue-600 text-sm font-medium"
            >查看详情</text
          >
        </view>
        <view class="w-full truncate mb-2">
          <!-- TODO 摘要 -->
          <text class="truncate">
            单行文本:54354455465465465xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </text>
        </view>
        <view class="w-full truncate mb-2">
          <text class="truncate">单行文本:543544554654654584864</text>
        </view>
        <view class="flex justify-between items-center text-sm mb-2">
          <view class="flex items-center">
            <view class="mr-3">
              <view
                class="bg-blue-6 color-white timelineavatar rounded-full flex justify-center items-center w-7 h-7"
                >{{ item.processInstance.startUser.nickname[0] }}</view
              >
            </view>
            <text class="truncate w-36">{{
              item.processInstance.startUser.nickname
            }}</text>
          </view>
          <text class="text-orange-500"
            >{{ getTimeDifference(item.createTime) }}以前到达</text
          >
        </view>
      </view>
      <!-- todo 审批拒绝、审批同意，没有接入 -->
      <view
        class="flex justify-between h-12 items-center border-solid border-b-0 border-x-0 border-t-[1px] border-[#E3E2E2]"
      >
        <view
          class="w-1/2 h-14 flex justify-center items-center border-solid border-b-0 border-r-1 border-l-0 border-t-0 border-[#E3E2E2]"
          @click="reject(item)"
        >
          <text class="text-blue-500 text-lg font-semibold">拒绝</text>
        </view>
        <view
          class="w-1/2 h-14 flex justify-center items-center"
          @click="agree(item)"
        >
          <text class="text-blue-500 text-lg font-semibold">同意</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { getTimeDifference } from '@/utils/dateUtil'
  const props = defineProps({
    pagination: {
      type: Object,
      default() {
        return {}
      }
    }
  })
  const agree = async (itemObj: any) => {
    // 跳转到同意页面
    uni.navigateTo({
      url: '/pages/task/components/ApprovePage' + '?id=' + itemObj.id
    })
  }
  const reject = async (itemObj: any) => {
    // 跳转到拒绝页面
    uni.navigateTo({
      url: '/pages/task/components/RejectPage' + '?id=' + itemObj.id
    })
  }
</script>

<style lang="scss" scoped></style>
