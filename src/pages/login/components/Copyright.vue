<!-- 隐私与用户条款 -->
<template>
  <view class="pb-2 flex justify-center text-3 text-[#999]">
    <wd-checkbox v-model="isAgree" @change="toggleAgree" />
    <text>已阅读并同意</text>
    <!-- TODO 芋艿：后续要加下链接地址 -->
    <text class="text-[#0B5EFF]">《用户协议》</text>
    <text>和</text>
    <text class="text-[#0B5EFF]">《隐私政策》</text>
  </view>
</template>

<script lang="ts" setup>
  defineOptions({ name: 'Copyright' })
  const props = defineProps({
    agree: {
      type: Boolean
    }
  })
  const isAgree = ref(props.agree)

  const emits = defineEmits(['update:agree'])
  /*
   *@Description: 是否阅读且同意协议
   *@MethodAuthor: xiaohong
   *@Date: 2024-10-17 16:08:17
   */
  function toggleAgree() {
    emits('update:agree', isAgree.value)
  }
</script>
