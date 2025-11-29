<template>
  <view class="container">
    <!-- 搜索工作栏 -->
    <wd-sticky>
      <wd-search
        v-model="queryParams.name"
        @focus="focus"
        @search="search"
        @clear="clear"
        maxlength="20"
        class="!w-[100vw]"
      >
        <template #suffix>
          <view class="filter-box" @click="showFilter">
            <wd-icon
              name="filter"
              size="22px"
              custom-style="filter-custom-style"
            ></wd-icon>
          </view>
        </template>
      </wd-search>
    </wd-sticky>

    <!-- 列表 -->
    <view class="content">
      <wd-row v-for="(item, index) in list" :key="index">
        <wd-col :span="24">
          <view class="item-box" @click="showItem(item)">
            <view class="list-item-content-title">
              {{ item.name }}/{{ item.code }}
            </view>
            <wd-gap bg-color="#FFFFFF"></wd-gap>
            <wd-row>
              <wd-col :span="8">
                <view class="tag-container">
                  <wd-tag type="primary" plain>{{ item.type }}</wd-tag>
                </view>
              </wd-col>
              <wd-col :span="12" :offset="4">
                <!-- TODO @yan：style 部分，需要改成 unocss -->
                <view style="width: 100%">{{ item.createTime }}</view>
                <view style="width: 100%; margin-top: 20px">
                  {{ item.remark }}
                </view>
              </wd-col>
            </wd-row>
          </view>
        </wd-col>
      </wd-row>
    </view>
  </view>

  <!-- popup 弹窗 -->
  <!-- page-meta 只能是页面内的第一个节点 -->
  <page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'};`" />

  <!-- 搜索弹窗 -->
  <wd-popup
    v-model="show"
    lock-scroll
    position="right"
    :safe-area-inset-bottom="true"
    custom-style="width: 70%;border-radius: 20px 0 0 20px;margin-top: 11%;"
    @close="closeFilter"
  >
    <wd-row gutter="20">
      <wd-gap bg-color="#FFFFFF"></wd-gap>
      <wd-col :span="24">
        <wd-text text="角色标识" bold size="19px" color="#333333"></wd-text>
        <wd-gap bg-color="#FFFFFF"></wd-gap>
      </wd-col>

      <wd-col :span="24">
        <wd-input
          v-model="queryParams.code"
          clearable
          placeholder="请输入角色标识"
        />
        <wd-gap bg-color="#FFFFFF" height="160rpx"></wd-gap>
      </wd-col>
      <wd-col :span="24">
        <wd-text text="角色类型" bold size="19px" color="#333333"></wd-text>
        <wd-gap bg-color="#FFFFFF"></wd-gap>
      </wd-col>
      <wd-col :span="24">
        <wd-radio-group v-model="queryParams.type" shape="button">
          <wd-radio :value="1">沃特</wd-radio>
          <wd-radio :value="2">商家后台</wd-radio>
        </wd-radio-group>
        <wd-gap bg-color="#FFFFFF" height="160rpx"></wd-gap>
      </wd-col>
      <wd-col :span="24">
        <wd-text text="创建时间" bold size="19px" color="#333333"></wd-text>
        <wd-gap bg-color="#FFFFFF"></wd-gap>
      </wd-col>
      <wd-col :span="24">
        <wd-datetime-picker v-model="queryParams.createTime" />
        <wd-gap bg-color="#FFFFFF" height="160rpx"></wd-gap>
      </wd-col>
    </wd-row>
  </wd-popup>

  <!-- 新增弹窗 -->
  <wd-fab>
    <wd-button type="primary" round size="small" @click="goEdit">
      新增
    </wd-button>
  </wd-fab>
</template>

<script lang="ts" setup>
  // TODO @芋艿：一些注释的补全
  import { getList } from '@/service/role/RoleApi'
  import { onLoad } from '@dcloudio/uni-app'

  // 搜索参数
  const queryParams = ref({
    name: '',
    code: '',
    status: 0,
    createTime: '',
    deptId: 151,
    pageNo: 1,
    pageSize: 10
  })

  const list = ref([])
  const show = ref(false)
  // 获取焦点
  const focus = () => {
    console.log('focus')
  }
  // 失去焦点
  const blur = () => {
    console.log('blur')
  }

  // 搜索
  const search = async () => {
    queryParams.value.pageNo = 1
    await getList(queryParams.value).then((res) => {
      list.value = res.data
    })
  }
  // 清空
  const clear = () => {
    queryParams.value.name = ''
  }

  const showFilter = () => {
    show.value = true
  }

  const closeFilter = () => {
    show.value = false
  }
  const showItem = (item) => {
    uni.navigateTo({
      url: '/pages/role/show?id=' + item.id
    })
  }
  const handleConfirm = (e) => {
    console.log(e)
  }

  const goEdit = () => {
    uni.navigateTo({
      url: '/pages/role/edit'
    })
  }

  // 在列表中查找id数据进行删除
  const deleteItem = (id) => {
    list.value = list.value.filter((item) => item.id !== id)
  }

  onLoad(async () => {
    const res = await getList(queryParams.value)
    list.value = res.data
  })

  onShow((query) => {
    if (query?.action === 'delete') {
      deleteItem(query.id)
    }
  })

  onReachBottom(async () => {
    queryParams.value.pageNo++
    const res = await getList(queryParams.value)
    list.value = list.value.concat(res.data)
  })
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* 使容器高度占满整个屏幕 */

    .content {
      min-height: 150px;
      padding: 10px;

      .item-box {
        padding: 10px;
        margin-bottom: 5px;
        background-color: #ffffff;
        border: 1px solid #e8e8e8;

        .list-item-content-title {
          font-size: 16px;
          color: #333333;
        }

        .tag-container {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
      }
    }
  }

  .filter-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 20px;
    background-color: #fff;
  }
</style>
<style lang="scss">
  .filter-custom-style {
    width: 300px;
  }
</style>
