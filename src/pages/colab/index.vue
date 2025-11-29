<!-- 协作界面：用于 bpm 工作流 -->
<!-- TODO @芋艿：这个需要和 src/pages/task/index.vue 进行合并 -->
<route lang="json5" type="page">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '协作'
  }
}
</route>

<template>
  <view class="page-container">
    <!-- 页签 -->
    <wd-tabs v-model="tab" class="tabs" swipeable @change="tabChange">
      <block v-for="item in tabs" :key="item">
        <wd-tab :title="`${item}`" :name="item"> </wd-tab>
      </block>
    </wd-tabs>
    <!-- 搜索框暂未增加 -->
    <view class="scrollable-content">
      <wd-gap />
      <view v-for="(item, index) in list" :key="index" class="list-item">
        <wd-card>
          <template #title>
            <view class="flex flex-row justify-between items-baseline">
              <view class="font-bold">{{ item.title }}</view>
              <view class="color-black color-op-30 text-xs">
                {{ timeFormat(item.createTime, 'mm-dd hh:MM:ss') }}
              </view>
            </view>
          </template>
          <view class="justify-start h-auto">
            <text class="color-black">{{ item.content }}</text>
          </view>
          <template #footer>
            <view>
              <wd-button
                v-if="canProcess"
                size="small"
                @click="handleClik(item)"
                >立即处理</wd-button
              >
              <wd-button v-else size="small" plain @click="handleClik(item)"
                >查看详情</wd-button
              >
            </view>
          </template>
        </wd-card>
      </view>
      <wd-loadmore
        :state="loadmorestate"
        @reload="loadmore(currentTabIndex.value)"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { onLoad, onReachBottom } from '@dcloudio/uni-app'
  import { useToast } from 'wot-design-uni'
  import { timeFormat } from '@/utils/time'
  import * as bpmAPI from '@/service/bpm/BpmAPI'
  import * as mockData from './mock'
  const total = ref(0) // 列表的总页数
  const mockList = ref({})
  const list = ref([]) // 列表的数据
  const queryParams = reactive({
    pageNo: 1,
    pageSize: 10,
    name: '',
    processDefinitionKey: undefined,
    category: undefined,
    status: undefined,
    createTime: []
  })
  const toast = useToast()
  const tabs = ref(['待我处理', '我已处理', '我创建的', '我参与的'])
  const tab = ref('待我处理')
  const currentTabIndex = ref(0)
  const canProcess = ref(false)
  const myCreated = ref(false)
  const loadmorestate = ref<string>('loading')
  const handleClik = async (itemObj: any) => {
    // 跳转到审批详情
    uni.navigateTo({
      url: '/pages/colab/detail/index' + '?id=' + itemObj.procInstId
    })
  }

  // 切换tab页签
  const tabChange = async (tabPage) => {
    queryParams.pageNo = 1
    currentTabIndex.value = tabPage.index
    await loadMore(tabPage.index)
  }

  const loadMore = async (index: number) => {
    if (index === 0) {
      canProcess.value = true
    } else {
      canProcess.value = false
    }
    if (index === 2) {
      myCreated.value = true
    } else {
      myCreated.value = false
    }
    switch (index) {
      case 0: {
        mockList.value = mockData.todoPage
        await getBpmList(bpmAPI.getTaskTodoPage)
        break
      }
      case 1: {
        mockList.value = mockData.taskDonePage
        await getBpmList(bpmAPI.getTaskDonePage)
        break
      }
      case 2: {
        mockList.value = mockData.myPage
        await getBpmList(bpmAPI.getProcessInstanceMyPage)
        break
      }
      case 3: {
        mockList.value = mockData.copyPage
        await getBpmList(bpmAPI.getProcessInstanceCopyPage)
        break
      }
    }
    await setBpmTitleAndDescription()
  }

  /** 加载待处理、已处理、我的、我参与的各页签流程数据列表 */
  const getBpmList = async (api) => {
    try {
      // 真实数据
      // const data = await api(queryParams)
      // mock数据
      const data = mockList.value
      if (queryParams.pageNo > 1) {
        list.value = list.value.concat(data.list)
      } else {
        list.value = data.list
      }
      total.value = data.total
      if (list.value.length < total.value) {
        loadmorestate.value = 'loading'
      } else {
        loadmorestate.value = 'finished'
      }
    } catch (error) {
      toast.warning(error)
      loadmorestate.value = 'error'
    }
  }

  // 获取流程状态文本
  const getStatusText = async (status: number) => {
    switch (status) {
      case 0:
        return '待审批'
      case 1:
        return '审批中'
      case 2:
        return '审批通过'
      case 3:
        return '审批不通过'
      case 4:
        return '已取消'
      case 5:
        return '已退回'
      case 6:
        return '委派中'
      case 7:
        return '审批通过中'
      default:
        return '待审批'
    }
  }

  // 获取流程描述信息
  const setBpmTitleAndDescription = async () => {
    for (const item of list.value) {
      const statusText = await getStatusText(item.status)
      if (myCreated.value) {
        item.procInstId = item.id
        item.title = item.name
        item.content = `${item.name}，${item.tasks[0]?.name} ${statusText}`
      } else {
        item.procInstId = item.processInstance.id
        item.title = item.processInstance?.name
        item.content = `${item.processInstance?.startUser?.nickname} ${item.processInstance?.name}，${item.name} ${statusText}`
      }
    }
  }

  onReachBottom(async () => {
    if (list.value.length < total.value) {
      loadmorestate.value = 'loading'
      queryParams.pageNo++
      await loadMore(currentTabIndex.value)
    } else {
      loadmorestate.value = 'finished'
    }
  })

  onLoad(async () => {
    await loadMore(currentTabIndex.value)
  })
</script>

<style lang="scss" scoped>
  .page-container {
    display: flex;
    flex-direction: column;
    height: 88vh;
    overflow: hidden;
  }
  .tabs {
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .scrollable-content {
    flex: 1;
    overflow-y: auto;
  }
</style>
