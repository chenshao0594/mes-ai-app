<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '审批详情'
  }
}
</route>

<template>
  <wd-card>
    <template #title>
      <view class="flex flex-row justify-start items-center font-bold text-md">
        <view>{{ state.processInstanceInfo.name }}</view>
        <view class="ml-1">
          <wd-tag color="#0083ff" bg-color="#d0e8ff">{{
            getStatusText(state.processInstanceInfo.status)
          }}</wd-tag>
        </view>
      </view>
    </template>
    <view class="flex flex-row justify-start items-center text-sm">
      <wd-img
        v-if="state.processInstanceInfo.startUser?.avatar"
        class="avatar"
        :src="state.processInstanceInfo.startUser?.avatar"
        alt="发起人头像"
        round
        mode="scaleToFill"
      />
      <view
        v-else
        class="bg-blue-6 color-white timelineavatar rounded-full flex justify-center items-center"
        >{{ state.processInstanceInfo.startUser?.nickname[0] }}</view
      >
      <wd-text
        class="ml-1"
        color="black"
        :text="state.processInstanceInfo.startUser?.nickname"
      />
      <wd-text
        class="ml-1"
        color="black"
        :text="state.processInstanceInfo.startUser?.deptName"
      />
    </view>
    <template #footer>
      <view class="flex flex-row justify-between items-center">
        <view
          >提交于
          {{
            timeFormat(state.processInstanceInfo.startTime, 'm月d日 hh:MM')
          }}</view
        >
        <wd-icon name="service" />
      </view>
    </template>
  </wd-card>
  <wd-card>
    <template #title>
      <view class="flex flex-row justify-start items-center font-bold text-md">
        <view>审批信息</view>
      </view>
    </template>
    <wd-textarea readonly auto-height v-model="state.processInfo">
    </wd-textarea>
  </wd-card>
  <wd-card>
    <template #title>
      <view
        class="flex flex-row justify-between items-center font-bold text-md"
      >
        <view>审批记录</view>
        <wd-icon :name="state.orderIcon" @click="orderClick" />
      </view>
    </template>
    <ua-timeline>
      <ua-timeline-item
        v-for="(item, index) in state.tasks"
        :key="index"
        :type="getTaskTimelineItemType(item)"
      >
        <view class="flex flex-col justify-start items-start">
          <view class="font-bold text-md">{{ item.name }}</view>
          <view class="flex flex-row justify-start items-center w-full">
            <wd-img
              v-if="item.assigneeUser?.avatar"
              class="timelineavatar"
              :src="item.assigneeUser?.avatar"
              alt="审批人头像"
              round
              mode="scaleToFill"
            />
            <view
              v-else
              class="bg-blue-6 color-white timelineavatar rounded-full flex justify-center items-center"
              >{{ item.assigneeUser?.nickname[0] }}</view
            >
            <view class="flex flex-col justify-start items-start ml-1 w-full">
              <view class="flex flex-row justify-between items-baseline w-full">
                <view
                  v-if="item?.assigneeUser"
                  class="flex flex-row justify-start items-baseline"
                >
                  <view>{{ item.assigneeUser?.nickname }}</view>
                  <wd-tag
                    v-if="item.assigneeUser?.deptName"
                    type="default"
                    class="ml-1"
                    >{{ item.assigneeUser?.deptName }}</wd-tag
                  >
                </view>
                <view
                  v-if="item?.endTime"
                  class="color-black color-op-30 text-xs"
                  >{{ timeFrom(item?.endTime) }}</view
                >
              </view>
              <view class="flex flex-row justify-between items-baseline w-full">
                <view class="text-xs">
                  <wd-text
                    :type="getTaskTimelineItemType(item)"
                    :text="getStatusText(item?.status)"
                  />
                  <wd-text
                    v-if="item?.reason"
                    :text="item.reason"
                    class="ml-1"
                  />
                  <wd-text
                    v-if="item?.durationInMillis"
                    type="success"
                    text="耗时："
                    class="ml-1"
                  />
                  <wd-text
                    v-if="item?.durationInMillis"
                    type="success"
                    :text="formatPast2(item?.durationInMillis)"
                  />
                </view>
                <view
                  v-if="item?.createTime"
                  class="color-black color-op-30 text-xs whitespace-nowrap"
                  >{{ timeFormat(item?.createTime, 'm月d日 hh:MM') }}</view
                >
              </view>
            </view>
          </view>
        </view>
      </ua-timeline-item>
    </ua-timeline>
  </wd-card>
  <view
    v-if="state.runningTasks && state.runningTasks.length > 0"
    class="approval-operation"
  >
    <wd-button
      type="error"
      icon="close-bold"
      plain
      @click="handleAudit(state.runningTasks[0], false)"
      >拒绝</wd-button
    >
    <wd-button
      type="primary"
      icon="check-bold"
      @click="handleAudit(state.runningTasks[0], true)"
      >同意</wd-button
    >
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { useToast } from 'wot-design-uni'
  import { useUserStore } from '@/store'
  import { timeFormat, timeFrom, formatPast2 } from '@/utils/time'
  import { isEmpty } from '@/utils/is'
  import * as bpmAPI from '@/service/bpm/BpmAPI'
  import { processInstance, tasksForInstance } from '../mock'
  import UaTimelineItem from '@/uni_modules/ua-timeline/components/ua-timeline-item/ua-timeline-item.vue'

  const toast = useToast()
  const userStore = useUserStore()

  const auditForms = ref<any[]>([]) // 审批任务的表单
  const auditRule = reactive({
    reason: [{ required: true, message: '审批建议不能为空', trigger: 'blur' }]
  })
  const approveForms = ref<any[]>([]) // 审批通过时，额外的补充信息
  const approveFormFApis = ref<ApiAttrs[]>([]) // approveForms 的 fAPi
  const state = reactive({
    processInstanceId: '',
    processLoading: true, // 审批信息 加载中
    processInstanceInfo: {}, // 审批信息
    processInfo: '', // 审批内容
    tasksLoad: false, // 任务列表 加载中
    orderIcon: 'order-descending', // 任务列表排序图标
    tasks: [], // 任务列表
    runningTasks: [] // 进行中的任务
  })

  onLoad(async (options) => {
    // 非法参数
    if (!options.id) {
      state.processInstanceInfo = null
      return
    }
    state.processInstanceId = options.id
    // 1. 加载审批详情
    await getProcessInstance(options.id)
    await getTaskList(options.id)
  })

  /** 加载流程实例信息 */
  const getProcessInstance = async (id: string) => {
    state.processLoading = true
    try {
      // 真实数据
      // const data = await bpmAPI.getProcessInstance(id)
      // mock数据
      const data = processInstance
      state.processInstanceInfo = data
      state.processInfo = getProcessInfo(data)
    } finally {
      state.processLoading = false
    }
  }

  /** 加载任务列表 */
  const getTaskList = async (id) => {
    auditForms.value = []
    approveForms.value = []
    approveFormFApis.value = []
    try {
      // 获得未取消的任务
      state.tasksLoad = true
      // 真实数据
      // const data = await bpmAPI.getTaskListByProcessInstanceId(id)
      // mock数据
      const data = tasksForInstance
      state.tasks = []
      // 1.1 移除已取消的审批
      data.forEach((task) => {
        if (task.status !== 4) {
          state.tasks.push(task)
        }
      })
      // 1.2 排序，默认按顺序排列；
      state.tasks.sort((a, b) => {
        // 有已完成的情况，按照完成时间倒序
        if (a.endTime && b.endTime) {
          return a.endTime - b.endTime
        } else if (a.endTime) {
          return -1
        } else if (b.endTime) {
          return 1
          // 都是未完成，按照创建时间倒序
        } else {
          return a.createTime - b.createTime
        }
      })

      // 1.3 构建结束节点
      const finishTask = {
        name: '结束',
        assigneeUser: {
          nickname: '系统',
          avatar: '/static/images/robot-head-avatar.jpg' // TODO @gitlh：这个是不是可以弄成 svg。图片有点大
        },
        status: state.processInstanceInfo.status === 2 ? 2 : 0,
        createTime: state.processInstanceInfo.endTime,
        endTime: state.processInstanceInfo.endTime
      }
      if (state.orderIcon === 'order-descending') {
        state.tasks.push(finishTask)
      } else {
        state.tasks.unshift(finishTask)
      }

      // 获得需要自己审批的任务
      await loadRunningTask(state.tasks)
      console.log('state.runningTasks', state.runningTasks)
    } finally {
      state.tasksLoad = false
    }
  }

  /**
   * 设置 runningTasks 中的任务
   */
  const loadRunningTask = async (tasks) => {
    state.runningTasks = []
    tasks.forEach((task) => {
      if (!isEmpty(task.children)) {
        loadRunningTask(task.children)
      }
      // 2.1 只有待处理才需要
      if (task.status !== 1 && task.status !== 6) {
        return
      }
      // 2.2 自己不是处理人
      if (
        !task.assigneeUser ||
        task.assigneeUser.id !== userStore.userInfo.user.id
      ) {
        return
      }

      // 2.3 添加到处理任务
      state.runningTasks.push({ ...task })
      state.runningTasks.sort((a, b) => {
        return a.createTime - b.createTime
      })
      auditForms.value.push({
        reason: '',
        copyUserIds: []
      })

      // 2.4 处理 approve 表单
      // if (task.formId && task.formConf) {
      //   const approveForm = {}
      //   setConfAndFields2(approveForm, task.formConf, task.formFields, task.formVariables)
      //   approveForms.value.push(approveForm)
      // } else {
      //   approveForms.value.push({}) // 占位，避免为空
      // }
    })
  }

  /**
   * 构建流程实例描述信息
   */
  const getProcessInfo = (processInstanceInfo) => {
    return `审批流程：${processInstanceInfo.name}\n审批状态：${getStatusText(
      processInstanceInfo.status
    )}\n发起人：${processInstanceInfo.startUser?.nickname}\n发起部门：${
      processInstanceInfo.startUser?.deptName
    }\n发起时间：${timeFormat(
      processInstanceInfo.startTime,
      'yyyy年m月d日 hh:MM'
    )}`
  }

  /**
   * 审批记录排序方向切换
   */
  const orderClick = async () => {
    state.tasks.reverse()
    if (state.orderIcon === 'order-descending') {
      state.orderIcon = 'order-ascending'
    } else {
      state.orderIcon = 'order-descending'
    }
  }

  /**
   * 处理审批通过和不通过的操作
   */
  const handleAudit = async (task, pass) => {
    // TODO @芋艿：审批通过和不通过统一处理暂未实现
    // 1. 校验审批意见
    // const auditForm = auditForms.value[0]
    // const auditFormFApi = auditFormFApis.value[0]
    // await auditFormFApi.validate()
    // if (auditFormFApi.hasError()) {
    //   return
    // }
    // 2. 提交审批
    // const auditData = {
    //   taskId: state.runningTasks[0].id,
    //   reason: auditForm.reason,
    //   copyUserIds: auditForm.copyUserIds
    // }
    // await bpmAPI.approveTask(auditData)
    // 3. 刷新审批记录
    await getProcessInstance(state.processInstanceId)
    await getTaskList(state.processInstanceId)
  }

  // 获取流程状态文本
  const getStatusText = (status: number) => {
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

  /** 获得任务对应的颜色 */
  const getTaskTimelineItemType = (item: any) => {
    if ([1, 6, 7].includes(item.status)) {
      return 'primary'
    }
    if (item.status === 0) {
      return 'default'
    }
    if (item.status === 2) {
      return 'success'
    }
    if (item.status === 3) {
      return 'danger'
    }
    if (item.status === 4) {
      return 'info'
    }
    if (item.status === 5) {
      return 'warning'
    }
    return ''
  }
</script>

<style scoped lang="scss">
  .avatar {
    width: 40rpx;
    height: 40rpx;
  }
  .timelineavatar {
    width: 60rpx;
    height: 60rpx;
  }
  .approval-operation {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    background-color: #ffffff;
    border-top: 1px solid #e0e0e0;
  }
</style>
