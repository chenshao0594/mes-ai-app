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
            {{ item.processInstanceName }}</text
          >
          <text
            class="px-2 py-1 rounded-xl bg-indigo-100 text-blue-500 text-sm font-medium">
            查看详情
          </text>
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
                >{{ item.creatorName[0] }}</view
              >
            </view>
            <text class="truncate w-36">{{ item.creatorName }}</text></view
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
