<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '用户管理'
  }
}
</route>

<template>
  <view>
    <wd-sticky>
      <wd-search
        v-model="keyword"
        :maxlength="20"
        class="!w-[100vw] mb-3"
        @clear="getUserList"
        @focus="getUserList"
        @search="getUserList"
      >
        <template #suffix>
          <!-- 筛选的弹窗 -->
          <filterDrawer />
        </template>
      </wd-search>
    </wd-sticky>
    <wd-card
      v-for="user in userList"
      :key="user.id"
      :title="`${user.username}-【${user.job}】`"
      custom-title-class="!py-0 !mb-3 !text-3.5"
      custom-footer-class="!py-0"
      @click="toUserDetail(user)"
    >
      <view class="flex gap-3 items-center">
        <wd-img
          v-if="user.avatar"
          :src="user.avatar"
          :round="true"
          width="42"
          height="42"
          class="flex-none"
        />
        <view
          v-else
          class="w-10.5 h-10.5 rounded-50% bg-gray-3 flex items-center justify-center text-5"
        >
          {{ user.username.charAt(0) }}
        </view>

        <view class="flex flex-col">
          <wd-text :text="user.tel" prefix="电话：" :lines="1" />
          <wd-text :text="user.email" prefix="邮箱：" :lines="1" />
          <wd-text :text="user.deptInfo" prefix="部门：" :lines="1" />
        </view>
      </view>
    </wd-card>
    <!-- 加载更多 -->
    <wd-loadmore :state="loadMoreState" @reload="getUserList" />
    <!-- 用户新增按钮 -->
    <wd-fab
      :expandable="false"
      type="primary"
      draggable
      position="right-bottom"
      @click="toUserForm"
    />
  </view>
</template>

<script lang="ts" setup>
  import { getList, UserVO } from '@/service/user/UserApi'
  import { LoadMoreState } from '@/types/enums'
  import filterDrawer from './components/filterDrawer.vue'

  const keyword = ref()
  const loadMoreState = ref(LoadMoreState.loading)
  const totalCount = ref(0)
  const userList = ref<UserVO[]>([])

  /** 获取用户列表 */
  async function getUserList() {
    try {
      // 加载列表数据
      const { data, total } = await getList()
      totalCount.value = total
      userList.value = userList.value.concat(data)
      // 设置加载状态
      loadMoreState.value =
        userList.value.length === totalCount.value
          ? LoadMoreState.finished
          : LoadMoreState.loading
    } catch (error) {
      loadMoreState.value = LoadMoreState.error
    }
  }

  /** 跳转到用户详情 */
  function toUserDetail(user: UserVO) {
    uni.navigateTo({
      url: '/pages/user/show'
    })
  }

  function toUserForm() {
    uni.navigateTo({
      url: '/pages/user/edit'
    })
  }

  onReachBottom(() => {
    if (userList.value.length >= totalCount.value) {
      loadMoreState.value = LoadMoreState.finished
      return
    }
    // 加载更多
    getUserList()
  })

  onMounted(() => {
    getUserList()
  })
</script>

<style lang="scss" scoped>
  :deep(.wd-text.is-default) {
    font-size: 12px;
    uni-text {
      color: var(--wot-search-cancel-color, rgba(0, 0, 0, 0.65));
    }
  }
</style>
