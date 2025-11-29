<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '忘记密码'
  },
  needLogin: false
}
</route>

<template>
  <view class="h-full p-4 bg-white">
    <view class="mb-5 font-700 text-5">忘记密码</view>
    <wd-form :model="formData.phoneNo" ref="form">
      <wd-input
        v-model="formData.phoneNo"
        prop="phoneNo"
        :rules="[{ required: true, message: '请输入手机号' }]"
        type="number"
        placeholder="请输入手机号"
        prefixIcon="phone"
      />

      <wd-button
        :block="true"
        :round="false"
        class="mt-4"
        @click="getRegisterCode"
      >
        <text>获取验证码</text>
      </wd-button>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
  //
  const formData = ref({
    phoneNo: ''
  })

  /*
   *@Description: 跳转到验证码填写页面
   *@MethodAuthor: xiaohong
   *@Date: 2024-10-17 15:32:31
   */
  function getRegisterCode() {
    uni.navigateTo({ url: '/pages/login/registerCode' })
  }
</script>

<style lang="scss" scoped>
  //
</style>
