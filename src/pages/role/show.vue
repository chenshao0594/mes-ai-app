<!-- TODO @yan：改成 detail.vue -->
<template>
  <view>
    <view class="content">
      <wd-cell-group>
        <wd-cell title="角色名称" :value="dataInfo.name" />
        <wd-cell title="角色类型">
          <view class="custom-value">
            <wd-tag type="primary" plain>{{ dataInfo.type }}</wd-tag>
          </view>
        </wd-cell>
        <wd-cell title="角色标识" :value="dataInfo.code" />
        <wd-cell title="显示排序" :value="dataInfo.sort" />
        <wd-cell title="备注" :value="dataInfo.remark" />
        <wd-cell title="状态">
          <view class="custom-value">
            <wd-tag type="primary" plain v-if="dataInfo.status === 1"
              >开启</wd-tag
            >
            <wd-tag type="danger" plain v-else>关闭</wd-tag>
          </view>
        </wd-cell>
        <wd-cell title="创建时间" :value="dataInfo.createTime" />
      </wd-cell-group>
    </view>
    <view class="fix-botton">
      <wd-row :gutter="5">
        <wd-col :span="10">
          <wd-button
            type="warning"
            :round="false"
            style="width: 100%"
            @click="goEdit"
            >编辑</wd-button
          >
        </wd-col>
        <wd-col :span="10">
          <wd-button
            type="error"
            :round="false"
            style="width: 100%"
            @click="deleteItem"
            >删除</wd-button
          >
        </wd-col>
        <wd-col :span="4">
          <wd-button type="primary" :round="false" @click="showOperation">
            <wd-icon name="more" size="22px"></wd-icon>
          </wd-button>
        </wd-col>
      </wd-row>
    </view>
  </view>
  <wd-message-box />
  <wd-action-sheet v-model="show" :actions="actions" @select="select" />
</template>

<script lang="ts" setup>
  // TODO @芋艿：一些注释的补全
  import { onLoad } from '@dcloudio/uni-app'
  import { deleteRole, getInfo } from '@/service/role/RoleApi'
  import { useMessage } from 'wot-design-uni'

  const message = useMessage()

  const dataInfo = ref({})
  const show = ref(false)
  const actions = [{ name: '菜单权限' }, { name: '数据权限' }]
  const goEdit = () => {
    uni.navigateTo({
      url: `/pages/role/edit?id=${dataInfo.value.id}`
    })
  }
  const deleteItem = () => {
    message
      .confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        const res = await deleteRole(dataInfo.value.id)
        if (res.code === 200) {
          uni.reLaunch({
            url: '/pages/role/index?action=delete&id=' + dataInfo.value.id
          })
        }
      })
      .catch(() => {
        message.info('已取消删除')
      })
  }
  const showOperation = () => {
    show.value = true
  }

  const select = (item) => {
    console.log(item)
  }

  onLoad(async (queryParam) => {
    const res = await getInfo(queryParam.id)
    dataInfo.value = res.data
  })
</script>

<style scoped>
  .content {
    padding-bottom: 8vh;
  }

  .fix-botton {
    position: fixed;
    bottom: 3%;
    width: 100%;
  }
</style>
