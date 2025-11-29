<!-- 更多登录方式 -->
<template>
  <view class="w-full">
    <wd-divider class="mb-4">更多登录方式</wd-divider>
    <view class="flex justify-around items-center">
      <view class="i-ic:round-wechat w-7 h-7 text-[var(--wot-color-primary)]" />
      <view class="i-cib:qq w-6 h-6 text-[var(--wot-color-primary)]" />
    </view>
  </view>
</template>

<script lang="ts" setup>
  defineOptions({ name: 'MoreLoginWays' })
</script>
