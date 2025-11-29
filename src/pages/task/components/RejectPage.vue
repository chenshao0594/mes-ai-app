<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '拒绝'
  }
}
</route>

<template>
  <!-- TODO @alwayssuper：审批通过、不通过，可以用一个 vue 界面哇？ -->
  <wd-card>
    <template #title>
      <view class="flex flex-row justify-start items-center font-bold text-md">
        <view>审批意见</view>
      </view>
    </template>
    <view class="border-solid border-1 border-[#E3E2E2]">
      <wd-textarea
        v-model="state.reason"
        placeholder="请输入审批意见"
        :maxlength="500"
        show-word-limit
        required
      ></wd-textarea>
    </view>
  </wd-card>
  <wd-button
    :block="true"
    :round="false"
    :loading="state.isSubmitting"
    :disabled="state.isSubmitting"
    custom-class="mt-8"
    @click="reject()"
    class="m-4"
  >
    <text>拒绝</text>
  </wd-button>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { rejectTask } from '@/service/task/TaskApi'

  const state = reactive({
    id: '', // 任务编号
    reason: '', // 审批意见
    isSubmitting: false // 提交状态
  })

  // 校验表单 审批意见不为空
  const validateForm = () => {
    if (!state.reason) {
      uni.showToast({
        title: '请输入审批意见',
        icon: 'none'
      })
      return false
    }
    return true
  }

  const reject = async () => {
    try {
      // 如果已经在提交中，直接返回
      if (state.isSubmitting) return

      // 设置提交状态为true
      state.isSubmitting = true

      // 校验表单
      if (!validateForm()) {
        state.isSubmitting = false
        return
      }

      // 调用审批通过接口
      const data = await rejectTask(state)

      // 审批成功后的回调
      if (data === true) {
        uni.showToast({
          title: '审批成功',
          icon: 'success'
        })
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/task/index'
          })
        }, 1500)
      } else {
        uni.showToast({
          title: '审批失败',
          icon: 'none'
        })
      }
    } catch (error) {
      console.error('[approve][执行审批失败]', error)
      uni.showToast({
        title: '审批失败',
        icon: 'none'
      })
    } finally {
      // 无论成功还是失败，最后都要将提交状态设置回false
      state.isSubmitting = false
    }
  }

  onLoad(async (options) => {
    // 非法参数
    if (!options.id) {
      state.id = null
      uni.showToast({
        title: '参数错误',
        icon: 'none'
      })
      return
    }
    state.id = options.id
  })
</script>

<style scoped lang="scss"></style>
