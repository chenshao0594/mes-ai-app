<script setup lang="ts">
  import { useToast } from 'wot-design-uni'

  const { success: showSuccess, error: showError } = useToast()

  const props = defineProps<{
    modelValue: boolean
  }>()
  const emit = defineEmits(['update:modelValue', 'confirm'])

  const form = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const formRef = ref()

  const rules = {
    oldPassword: [{ required: true, message: '请输入旧密码' }],
    newPassword: [
      { required: true, message: '请输入新密码' },
      { min: 6, message: '密码长度不能小于6位' }
    ],
    confirmPassword: [
      { required: true, message: '请确认新密码' },
      {
        validator: (value: string) => value === form.newPassword,
        message: '两次输入的密码不一致'
      }
    ]
  }

  const resetForm = () => {
    form.oldPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
  }

  const handleClose = () => {
    emit('update:modelValue', false)
    resetForm()
  }

  const handleConfirm = () => {
    formRef.value.validate().then(({ valid, errors }) => {
      // TODO @dengbo：建议 if (!valid) showError({ msg: '请检查输入是否正确' })，return；这样的话，整个逻辑会看起来更干净。
      if (valid) {
        // TODO @芋艿：接口待接入
        // 这里可以添加修改密码的逻辑
        emit('confirm', form)
        showSuccess({ msg: '密码修改成功' })
        handleClose()
      } else {
        showError({ msg: '请检查输入是否正确' })
      }
    })
  }
</script>

<template>
  <!-- TODO @芋艿：后续抽一个通用的圆角 css -->
  <wd-popup
    customStyle="border-radius: 26rpx 26rpx 0 0;"
    :model-value="props.modelValue"
    position="bottom"
    @close="handleClose"
  >
    <view class="password-edit-container">
      <view class="password-edit-title">修改密码</view>
      <wd-form ref="formRef" :model="form" :rules="rules">
        <wd-input
          v-model="form.oldPassword"
          label="旧密码"
          prop="oldPassword"
          type="password"
          placeholder="请输入旧密码"
        />
        <wd-input
          v-model="form.newPassword"
          label="新密码"
          prop="newPassword"
          type="password"
          placeholder="请输入新密码"
        />
        <wd-input
          v-model="form.confirmPassword"
          label="确认密码"
          prop="confirmPassword"
          type="password"
          placeholder="请再次输入新密码"
        />
      </wd-form>
      <view class="password-edit-buttons">
        <wd-button size="large" type="primary" block @click="handleConfirm">
          确认
        </wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<style scoped lang="scss">
  .password-edit-container {
    width: 100%;
    padding: 30rpx;
    background-color: #fff;
    border-radius: 16rpx;
  }

  .password-edit-title {
    margin-bottom: 30rpx;
    font-size: 36rpx;
    font-weight: bold;
  }

  .password-edit-buttons {
    margin-top: 40rpx;
  }
</style>
