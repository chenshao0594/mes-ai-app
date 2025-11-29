<template>
  <view>
    <view
      class="px-5 bg-white flex items-center justify-center"
      @click="showPop = true"
    >
      <wd-icon name="filter" size="22px" custom-style="filter-custom-style" />
    </view>

    <wd-popup
      v-model="showPop"
      position="right"
      custom-style="border-radius:32rpx; width: 80%;"
      @close="closeDrawer"
    >
      <wd-checkbox-group v-model="value2" cell shape="button">
        <wd-checkbox modelValue="1" disabled>选项一</wd-checkbox>
        <wd-checkbox modelValue="2">选项二</wd-checkbox>
        <wd-checkbox modelValue="3">选项三</wd-checkbox>
        <wd-checkbox modelValue="4">选项四</wd-checkbox>
        <wd-checkbox modelValue="5">选项五</wd-checkbox>
        <wd-checkbox modelValue="6">选项六</wd-checkbox>
        <wd-checkbox modelValue="7">选项七</wd-checkbox>
      </wd-checkbox-group>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
  defineOptions({ name: 'filterDrawer' })

  const showPop = ref<boolean>(false)
  const value2 = ref([])

  function closeDrawer() {
    showPop.value = false
  }
</script>
