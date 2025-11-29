<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '登录页面'
  },
  needLogin: false
}
</route>

<template>
  <view class="h-full pb-30 bg-white overflow-auto">
    <!-- banner区域 -->
    <Banner v-model:tenantId="tenantId" />

    <!-- 主要容器区域 -->
    <view class="p-4">
      <!-- tabs 切换 -->
      <wd-tabs v-model="tab">
        <wd-tab title="用户名登录">
          <LoginForm :agree="agree" :tenantId="tenantId" />
        </wd-tab>
        <wd-tab title="手机号登录">
          <PhoneLogin :agree="agree" :tenantId="tenantId" />
        </wd-tab>
      </wd-tabs>
    </view>

    <view class="fixed bottom-0 left-0 right-0 h-30 z-1">
      <!-- #ifndef H5 -->
      <!-- 更多登录方式 -->
      <MoreLoginWays :agree="agree" :tenantId="tenantId" class="mb-4" />
      <!-- #endif -->

      <!-- 隐私与用户条款 -->
      <Copyright v-model:agree="agree" />
    </view>
  </view>
</template>

<script lang="ts" setup>
  // banner
  import Banner from '@/pages/login/components/Banner.vue'
  // 隐私与用户条款
  import Copyright from '@/pages/login/components/Copyright.vue'
  // 更多登录方式
  import MoreLoginWays from '@/pages/login/components/MoreLoginWays.vue'
  // 手机号登录
  import PhoneLogin from '@/pages/login/components/PhoneLogin.vue'
  // 用户名登录
  import LoginForm from '@/pages/login/components/LoginForm.vue'

  const tenantId = ref('') // 当前租户 ID
  const tab = ref(0) // tabs 的索引
  const agree = ref(true) // 是否同意协议
</script>
