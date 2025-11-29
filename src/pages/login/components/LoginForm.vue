<!-- 账号密码登录 -->
<template>
  <wd-form :model="loginData.loginForm" ref="loginForm">
    <wd-input
      v-model="loginData.loginForm.username"
      prop="username"
      :rules="[{ required: true, message: '请填写用户名' }]"
      placeholder="请输入用户名"
      prefixIcon="user"
    />
    <wd-input
      v-model="loginData.loginForm.password"
      prop="password"
      :rules="[{ required: true, message: '请填写密码' }]"
      placeholder="请输入密码"
      show-password
      prefixIcon="lock-on"
    />

    <view class="flex items-center justify-between mt-4">
      <wd-checkbox
        v-model="loginData.loginForm.rememberMe"
        prop="rememberMe"
        shape="square"
      >
        记住我
      </wd-checkbox>
      <navigator url="forget" class="text-[var(--wot-color-primary)]">
        忘记密码
      </navigator>
    </view>

    <wd-button
      :block="true"
      :round="false"
      custom-class="mt-8"
      @click="handleLogin('password')"
    >
      <text>登录</text>
    </wd-button>

    <!-- 除 H5 本机号一键登录 -->
    <!-- #ifndef H5 -->
    <wd-button
      :block="true"
      :round="false"
      :plain="true"
      type="info"
      class="mt-4"
      @click="handleLogin('phoneIndex')"
    >
      <text>本机号登录</text>
    </wd-button>
    <!-- #endif -->

    <!-- 提示组件 -->
    <wd-toast />
  </wd-form>
</template>

<script setup lang="ts">
  import { useToast } from 'wot-design-uni'
  import { login } from '@/service/login/LoginAPI'
  import { useUserStore } from '@/store'

  const props = defineProps({
    tenantId: {
      // 租户 ID
      type: Number
    },
    agree: {
      // 同意登录协议
      type: Boolean,
      required: true,
      default: false
    }
  })

  const toast = useToast() // 提示组件
  const loginForm = ref() // 登录表单 Ref
  const loginData = reactive({
    // 登录信息
    isShowPassword: false, // 是否展示密码
    captchaEnable: import.meta.env.VITE_APP_CAPTCHA_ENABLE,
    tenantEnable: import.meta.env.VITE_APP_TENANT_ENABLE,
    loginForm: {
      tenantId: props.tenantId,
      username: import.meta.env.VITE_APP_DEFAULT_LOGIN_USERNAME || '',
      password: import.meta.env.VITE_APP_DEFAULT_LOGIN_PASSWORD || '',
      captchaVerification: '',
      rememberMe: true // 默认记录我。如果不需要，可手动修改
    }
  })

  /** 执行登录 */
  const handleLogin = async (type: string) => {
    if (!props.agree) {
      toast.warning('请阅读并同意《用户协议》和《隐私政策》')
      return
    }
    if (!props.tenantId) {
      toast.warning('请先选择租户!')
      return
    }

    // 账号密码登录
    const { afterLogin } = useUserStore()
    if (type === 'password') {
      try {
        // 校验表单
        const { valid } = await loginForm.value.validate()
        if (!valid) {
          return
        }
        toast.loading('登录中...')

        // 调用登录接口
        const data = (await login(loginData.loginForm)) as Recordable
        // 登录成功后的回调
        await afterLogin(data)
      } catch (error) {
        console.error('[handleLogin][执行登录失败]', error)
      } finally {
        toast.close()
      }
      return
    }

    // 本机号一键登录
    await uni.login({
      provider: 'univerify',
      univerifyStyle: {
        fullScreen: true
      }
    })
    // uni.navigateTo({ url: '/pages/login/phoneIndex' })
  }
</script>
