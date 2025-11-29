<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: ''
  },
  needLogin: false
}
</route>

<template>
  <view class="h-full bg-white text-center pt-30 px-10">
    <view class="text-5">{{ phoneNo }}</view>
    <view class="text-3 text-[var(--wot-color-secondary)]">
      认证服务由中国移动提供
    </view>
    <wd-button :block="true" :round="false" custom-class="my-2">
      <text>本机号一键登录</text>
    </wd-button>
    <wd-button :block="true" :round="false" @click="otherLoginWay">
      <text>其他登录方式</text>
    </wd-button>

    <more-login-ways class="fixed bottom-10 left-0 right-0" />
  </view>
</template>

<script lang="ts" setup>
  import MoreLoginWays from './components/MoreLoginWays.vue'
  // 手机号
  const phoneNo = ref('157****1576')

  function otherLoginWay() {
    uni.navigateTo({ url: '/pages/login/index' })
  }
</script>

<style lang="scss" scoped>
  //
</style>
