<!-- 工作台界面：用于各种 crud 管理操作 -->
<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '工作台'
  }
}
</route>

<template>
  <!-- 搜索框 -->
  <wd-search
    v-model="searchValue"
    @focus="searchFocus"
    @blur="searchBlur"
    @search="search"
    :maxlength="10"
    hide-cancel
    light
  />
  <view class="px-4 box-border">
    <!-- 系统管理相关的 -->
    <view class="bg-white rounded-5px flex flex-col box-border p-2">
      <view class="text-22rpx box-border">系统管理</view>
      <view class="flex flex-wrap gap-6 mt-2">
        <AppItems
          title="用户管理"
          icon="i-ic-baseline-account-box"
          link="/pages/user/index"
        />
        <AppItems
          title="角色管理"
          icon="i-ic-round-person-pin"
          link="/pages/role/index"
        />
        <AppItems title="菜单管理" icon="i-ic-twotone-list-alt" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  //
  import { ref } from 'vue'
  import AppItems from './components/AppItems.vue'

  const searchValue = ref('')
  /// ///////  搜索栏 事件////////////
  const searchFocus = () => {}
  const searchBlur = () => {}
  const search = () => {}
</script>

<style lang="scss" scoped>
  //
</style>
