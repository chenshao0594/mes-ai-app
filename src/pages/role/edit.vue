<!-- TODO @yan：改成 form.vue -->
<template>
  <view>
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input
          label="角色名称"
          label-width="100px"
          prop="name"
          clearable
          v-model="model.name"
          placeholder="请输入角色名称"
          :rules="[{ required: true, message: '请填写角色名称' }]"
        />
        <wd-input
          label="角色类型"
          label-width="100px"
          prop="type"
          v-model="model.type"
          placeholder="请输入角色类型"
          :rules="[{ required: true, message: '请填写角色类型' }]"
        />
        <wd-input
          label="角色标识"
          label-width="100px"
          prop="code"
          v-model="model.code"
          placeholder="请输入角色标识"
          :rules="[{ required: true, message: '请填写角色标识' }]"
        />
        <wd-cell title="显示排序">
          <view class="custom-value">
            <wd-input-number v-model="model.sort" />
          </view>
        </wd-cell>
        <wd-cell title="备注">
          <template #label>
            <view class="custom-value">
              <wd-textarea v-model="model.remark" placeholder="请输入备注" />
            </view>
          </template>
        </wd-cell>
        <wd-cell title="状态">
          <view class="custom-value">
            <wd-switch v-model="model.status" />
          </view>
        </wd-cell>
      </wd-cell-group>
      <view class="fix-botton">
        <wd-row :gutter="5">
          <wd-col :span="12">
            <wd-button
              type="primary"
              :round="false"
              style="width: 100%"
              @click="handleSubmit"
              >保存</wd-button
            >
          </wd-col>
          <wd-col :span="12">
            <wd-button
              type="error"
              :round="false"
              style="width: 100%"
              @click="goBack"
              >返回</wd-button
            >
          </wd-col>
        </wd-row>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
  // TODO @芋艿：一些注释的补全
  import { getInfo, createRole, updateRole } from '@/service/role/RoleApi'
  import { onLoad } from '@dcloudio/uni-app'

  const form = ref()

  const model = reactive({
    id: '',
    name: '',
    type: '',
    code: '',
    sort: 0,
    remark: '',
    status: true
  })

  const handleSubmit = () => {
    form.value
      .validate()
      .then(({ valid }) => {
        if (valid) {
          if (model.id) {
            updateRole(model).then((res) => {
              uni.navigateBack()
            })
          } else {
            createRole(model).then((res) => {
              uni.navigateBack()
            })
          }
        }
      })
      .catch((error) => {
        console.log(error, 'error')
      })
  }

  const goBack = () => {
    uni.navigateBack()
  }

  onLoad(async (queryParam) => {
    if (queryParam.id) {
      const res = await getInfo(queryParam.id)
      model.id = res.data.id
      model.name = res.data.name
      model.type = res.data.type
      model.code = res.data.code
      model.sort = res.data.sort
      model.remark = res.data.remark
      model.status = res.data.status === 1
    }
  })
</script>

<style scoped>
  .fix-botton {
    position: fixed;
    bottom: 3%;
    width: 100%;
  }
</style>
