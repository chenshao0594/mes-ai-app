<!-- banner区域 -->
<template>
  <view class="relative w-full h-50">
    <view class="absolute pt-15 pl-8 z-1 text-white">
      <view>
        <text class="text-8 font-700">你好</text>
      </view>
      <view class="mt-4">
        <!-- TODO @芋艿：这里后续把“芋道快速开发平台”作为占位符 -->
        <text class="text-6">欢迎登录芋道快速开发平台</text>
      </view>
    </view>

    <!-- 租户选择 -->
    <wd-select-picker
      v-model="currentTenant.id"
      :columns="tenantList"
      :use-default-slot="true"
      :filterable="true"
      :loading="loading"
      :show-confirm="false"
      value-key="id"
      label-key="name"
      type="radio"
      title="请选择租户"
      placeholder="请选择租户"
      @confirm="selectTenant"
    >
      <view
        class="absolute top-3 right-3 z-1 flex gap-1 text-white text-3 items-center"
      >
        <view>{{ currentTenant.name || '请选择租户' }}</view>
        <view class="i-mdi:settings-outline w-5 h-5" />
      </view>
    </wd-select-picker>

    <!-- TODO @芋艿：后续把静态资源，放到 CDN -->
    <image
      class="w-full h-full"
      src="/static/images/login-bg.png"
      mode="aspectFill"
    />
  </view>
</template>

<script lang="ts" setup>
  import { getTenants } from '@/service/login/LoginAPI'
  import { setTenantId, getTenantId } from '@/utils/auth'

  defineOptions({ name: 'Banner' })

  defineProps({
    tenantId: {
      type: Number
    }
  })

  const emits = defineEmits(['update:tenantId'])

  const loading = ref(false) // loading
  const tenantList = ref([]) // 租户列表
  const currentTenant = ref<{ name: string; id: string }>({
    name: '',
    id: ''
  }) // 当前租户

  /** 获取租户列表 */
  async function getTenantList() {
    try {
      // 加载租户
      loading.value = true
      tenantList.value = (await getTenants()) as []

      // 默认选中租户
      const tenantId = getTenantId()
      let tenant = tenantList.value.find((item) => item.id === tenantId)
      if (!tenant && tenantList.value.length > 0) {
        tenant = tenantList.value[0]
      }
      if (tenant) {
        selectTenant({
          selectedItems: tenant
        })
      }
    } catch (error) {
      console.error('[getTenantList][加载租户异常]', error)
    } finally {
      loading.value = false
    }
  }

  /** 选择租户信息 */
  function selectTenant({ selectedItems }) {
    currentTenant.value = selectedItems
    emits('update:tenantId', selectedItems.id)
    // 缓存租户编号
    setTenantId(selectedItems.id)
  }

  /** 初始化 */
  onMounted(() => {
    getTenantList()
  })
</script>
