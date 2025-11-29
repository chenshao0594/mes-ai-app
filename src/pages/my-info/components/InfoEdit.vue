<script setup lang="ts">
  import { useToast } from 'wot-design-uni'
  const { success: showSuccess, error: showError } = useToast()

  const emit = defineEmits(['update:modelValue', 'confirm'])
  const props = defineProps<{
    modelValue: boolean
    userInfo: object
  }>()
  const form = reactive({
    nickname: '',
    email: '',
    sex: ''
  })
  const formRef = ref()
  const rules = {
    nickname: [{ required: true, message: '请输入用户名' }],
    email: [
      {
        required: true,
        message: '请输入邮箱',
        type: 'email'
      }
    ]
  }

  watch(
    () => props.modelValue,
    () => {
      if (!props.userInfo) {
        return
      }
      form.nickname = props.userInfo.nickname
      form.email = props.userInfo.email
      form.sex = props.userInfo.sex
    }
  )

  const resetForm = () => {
    form.nickname = ''
    form.email = ''
    form.sex = ''
  }

  const handleClose = () => {
    emit('update:modelValue', false)
    resetForm()
  }

  const handleConfirm = () => {
    formRef.value.validate().then(({ valid, errors }) => {
      if (!valid) {
        showError({ msg: '请检查输入是否正确' })
        return
      }
      // 这里可以添加修改密码的逻辑
      emit('confirm', form)
      // TODO @芋艿：接口待接入
      handleClose()
    })
  }
</script>

<template>
  <wd-popup
    customStyle="border-radius: 26rpx 26rpx 0 0;"
    :model-value="props.modelValue"
    position="bottom"
    @close="handleClose"
  >
    <view class="edit-container">
      <view class="edit-title">修改信息</view>
      <wd-form ref="formRef" :model="form" :rules="rules">
        <wd-input
          label="用户名"
          label-width="180rpx"
          prop="nickname"
          v-model="form.nickname"
          placeholder="请输入用户名"
        />
        <wd-input
          label="邮箱"
          label-width="180rpx"
          prop="email"
          v-model="form.email"
          placeholder="请输入邮箱"
        />
        <wd-cell title="性别" title-width="180rpx">
          <view class="gender-selection">
            <wd-radio-group v-model="form.sex" inline shape="dot">
              <wd-radio :value="1">男</wd-radio>
              <wd-radio :value="2">女</wd-radio>
            </wd-radio-group>
          </view>
        </wd-cell>
      </wd-form>
      <view class="edit-buttons">
        <wd-button size="large" type="primary" block @click="handleConfirm"
          >确认</wd-button
        >
      </view>
    </view>
  </wd-popup>
</template>

<style scoped lang="scss">
  .gender-selection {
    display: flex;
    justify-content: flex-start;
  }
  .edit-container {
    width: 100%;
    padding: 30rpx;
    background-color: #fff;
    border-radius: 16rpx;
  }

  .edit-title {
    margin-bottom: 30rpx;
    font-size: 36rpx;
    font-weight: bold;
  }

  .edit-buttons {
    margin-top: 40rpx;
  }
</style>
