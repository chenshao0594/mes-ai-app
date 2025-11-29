<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '获取验证码'
  },
  needLogin: false
}
</route>

<template>
  <view class="h-full bg-white p-4">
    <view class="text-5 mb-4">验证手机号</view>
    <view class="text-3.5">
      请输入发送至
      <em>{{ phoneNumber }}</em>
      的 6 位验证码,有效期 10 分钟。如未收到,请重新获取验证码
    </view>

    <!-- 密码输入框 -->
    <wd-password-input
      v-model="code"
      :mask="false"
      :focused="showKeyboard"
      class="my-4!"
      @focus="showKeyboard = true"
    />

    <view v-if="codeDisabled"> {{ loadTime }}秒后可重新获取验证码<br /> </view>
    <wd-button v-else :block="true" @click="getCode">获取验证码</wd-button>

    <!-- 数字键盘 -->
    <wd-number-keyboard v-model:visible="showKeyboard" v-model="code" />
    <!-- 提示组件 -->
    <wd-toast />
  </view>
</template>

<script lang="ts" setup>
  import { useToast } from 'wot-design-uni'
  import { getCode as getCodeApi } from '@/service/login/LoginAPI'

  const toast = useToast() // 提示组件
  const phoneNo = ref() // 手机号
  const code = ref() // 验证码
  const timer = ref(0) // 定时器
  const loadTime = ref(3)
  const codeDisabled = ref(true)
  const showKeyboard = ref(true) // 数字键盘

  const phoneNumber = computed(() =>
    phoneNo.value.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1****$2')
  )

  function getTime() {
    loadTime.value--
    if (loadTime.value === 0) {
      clearInterval(timer.value)
      codeDisabled.value = false
      showKeyboard.value = false
    }
  }

  /** 获取验证码 */
  async function getCode() {
    try {
      toast.loading('获取验证码......')
      await getCodeApi({
        phoneNo: phoneNo.value
      })

      // 倒计时
      loadTime.value = 5
      codeDisabled.value = true
      showKeyboard.value = true
      timer.value = setInterval(getTime, 1000)
      toast.loading({ msg: '验证码已发送......', duration: 2000 })
    } catch (error) {
      console.error('[getCode][获取验证码异常]', error)
    }
  }

  /** 初始化 */
  onLoad((option) => {
    phoneNo.value = option.phoneNo
    code.value = option.code
    timer.value = setInterval(getTime, 1000)
  })
</script>
