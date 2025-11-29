<template>
  <view class="p-4 flex flex-wrap gap-x-4">
    <view
      class="w-88 bg-white rounded-2xl p-3 mb-4"
      v-for="item in pagination.list"
      :key="item.id"
    >
      <view class="w-full">
        <view class="flex justify-between items-center mb-2"
          ><text class="font-bold text-xl text-black truncate w-54">
            {{ item.processInstance.name }}</text
          >
          <text
            v-if="item.status === 1"
            class="px-2 py-1 rounded-xl bg-indigo-100 text-blue-600 text-sm font-medium"
            >审批中</text
          >
          <text
            v-if="item.status === 2"
            class="px-2 py-1 rounded-xl bg-green-100 text-green-600 text-sm font-medium"
            >已通过</text
          >
          <text
            v-if="item.status === 3"
            class="px-2 py-1 rounded-xl bg-rose-100 text-rose-600 text-sm font-medium"
            >不通过</text
          >
          <text
            v-if="item.status === 4"
            class="px-2 py-1 rounded-xl bg-orange-100 text-orange-600 text-sm font-medium"
            >已取消</text
          >
        </view>
        <view class="w-full truncate mb-2">
          <text class="truncate"
            >单行文本:54354455465465465xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</text
          >
        </view>
        <view class="w-full truncate mb-2">
          <text class="truncate">单行文本:543544554654654584864</text>
        </view>
        <view class="flex justify-between items-center text-sm"
          ><view class="flex items-center">
            <view class="mr-3">
              <view
                class="bg-blue-6 color-white timelineavatar rounded-full flex justify-center items-center w-7 h-7"
                >{{ item.processInstance.startUser.nickname[0] }}</view
              >
            </view>
            <text class="truncate w-36">{{
              item.processInstance.startUser.nickname
            }}</text></view
          ><text class="text-gray-500">{{
            formatTimestamp(item.createTime)
          }}</text></view
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { formatTimestamp } from '@/utils/dateUtil'
  const props = defineProps({
    pagination: {
      type: Object,
      default() {
        return {}
      }
    }
  })
</script>

<style lang="scss" scoped></style>
