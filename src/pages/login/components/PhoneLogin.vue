<!-- 手机号登录 -->
<template>
  <wd-form :model="loginData.loginForm" ref="loginForm">
    <wd-input
      v-model="loginData.loginForm.phoneNo"
      prop="phoneNo"
      :rules="[
        {
          required: false,
          message: '手机号不正确',
          pattern: phoneReg
        }
      ]"
      placeholder="请输入手机号"
      prefixIcon="phone"
    />
    <view class="mt-5">
      还没有账号？
      <navigator href="#" class="inline text-[var(--wot-color-primary)]">
        注册账号
      </navigator>
    </view>

    <wd-button
      :block="true"
      :round="false"
      custom-class="mt-8"
      @click="getCode"
    >
      <text>下一步</text>
    </wd-button>

    <!-- 提示组件 -->
    <wd-toast />
  </wd-form>
</template>

<script lang="ts" setup>
  import { useToast } from 'wot-design-uni'
  import { phoneReg } from '@/utils/validator'
  import { getCode as getCodeApi } from '@/service/login/LoginAPI'

  defineOptions({ name: 'PhoneLogin' })

  const props = defineProps({
    tenantId: {
      // 租户 ID
      type: String
    },
    agree: {
      // 同意登录协议
      type: Boolean,
      required: true,
      default: false
    }
  })

  const toast = useToast() // 提示组件
  const loginForm = ref() // form ref
  const loginData = reactive({
    // 登录数据
    loginForm: {
      tenantId: props.tenantId,
      phoneNo: ''
    }
  })

  /** 获取验证码 */
  async function getCode() {
    if (!props.agree) {
      toast.warning('请阅读并同意《用户协议》和《隐私政策》')
      return
    }
    if (!props.tenantId) {
      toast.warning('请先选择租户!')
      return
    }

    try {
      const { valid } = await loginForm.value.validate()
      if (!valid) {
        return
      }

      // 获取验证码
      toast.loading('获取验证码......')
      const code = await getCodeApi(loginData.loginForm)
      await uni.navigateTo({
        url: `/pages/login/registerCode?phoneNo=${loginData.loginForm.phoneNo}&code=${code}`
      })
    } catch (error) {
      console.error('[getCode][获取验证码异常]', error)
    } finally {
      toast.close()
    }
  }
</script>
