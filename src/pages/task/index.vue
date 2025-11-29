<!-- 审批界面：用于 bpm 工作流 -->
<!-- TODO @芋艿：替代 pages/colab/index -->
<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '审批'
  }
}
</route>

<template>
  <view class="h-full w-full flex flex-col justify-center items-center">
    <wd-sticky class="h-full w-full">
      <view class="h-full !w-[100vw]">
        <!-- tabs 切换 -->
        <wd-tabs @change="onTabsChange" color="#2a6be5ca">
          <block v-for="(item, index) in state.tabs" :key="index">
            <wd-tab
              :title="index === 0 ? `${item} (${state.toDoCount})` : `${item}`"
              :name="item"
            />
          </block>
        </wd-tabs>
        <view class="h-full w-full">
          <!-- TODO @alwayssuper：最好用更明确的条件。例如说 [0, 1].include(state.tabIndex)。 -->
          <!-- TODO @alwayssuper：clean 貌似爆红了。 -->
          <wd-search
            v-model="state.search.keyword"
            :placeholder="
              [0, 1].includes(state.tabIndex)
                ? '请输入任务名称'
                : '请输入流程名称'
            "
            @search="search"
            @cancel="cancel"
            maxlength="10"
            placeholder-left
            cancel-txt="筛选"
          />
        </view>
      </view>
    </wd-sticky>
    <view>
      <TodoList :pagination="state.pagination" v-if="state.tabIndex === 0" />
      <DoneList :pagination="state.pagination" v-if="state.tabIndex === 1" />
      <CopyList :pagination="state.pagination" v-if="state.tabIndex === 2" />
      <MyTaskList :pagination="state.pagination" v-if="state.tabIndex === 3" />
      <!-- TODO @alwayssuper：是不是要把 state.loadStatus 也加到 v-if 里哈 -->
      <!-- 讨论：没有想清楚在这里添加state.loadStatus的逻辑QAQ -->
      <wd-status-tip
        v-if="state.pagination.total === 0"
        image="/static/images/empty.png"
        tip="没有相应流程"
      />
    </view>
    <wd-loadmore
      v-if="state.pagination.total > 0"
      :state="state.loadStatus"
      @reload="loadMore"
    />
  </view>
  <!-- TODO @alwayssuper：handleClose9 爆红 -->
  <wd-popup
    v-model="state.showPopup"
    position="bottom"
    :safe-area-inset-bottom="true"
    custom-style="height: 250px; display: flex; flex-direction: column; justify-content: space-between;padding:20px 5px 100px 5px;"
  >
    <!-- TODO @alwayssuper：handleConfirmPeriod 爆红 -->
    <view>
      <wd-datetime-picker
        v-if="state.tabIndex === 0 || state.tabIndex === 1"
        label="创建时间"
        v-model="state.search.createTime"
        size="large"
      />
      <wd-datetime-picker
        v-if="state.tabIndex === 2"
        label="抄送时间"
        v-model="state.search.createTime"
        size="large"
      />
      <wd-datetime-picker
        v-if="state.tabIndex === 3"
        label="发起时间"
        v-model="state.search.createTime"
        size="large"
      />
      <wd-picker
        v-if="state.tabIndex === 3"
        :columns="getIntDictOptions(DICT_TYPE.BPM_PROCESS_INSTANCE_STATUS)"
        label="流程状态"
        v-model="state.search.status"
        size="large"
      />
      <wd-picker
        v-if="state.tabIndex === 3"
        :columns="state.categoryList"
        label="流程分类"
        v-model="state.search.categoryId"
        size="large"
      />
    </view>
    <view><wd-button block @click="search">筛选</wd-button></view>
  </wd-popup>
</template>

<script lang="ts" setup>
  import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
  import TodoList from './components/TodoList.vue'
  import DoneList from './components/DoneList.vue'
  import CopyList from './components/CopyList.vue'
  import MyTaskList from './components/MyTaskList.vue'
  import {
    getCategorySimpleList,
    CategoryVO
  } from '@/service/category/CategoryApi'
  import {
    getProcessInstanceCopyPage,
    getProcessInstanceMyPage,
    getTaskDonePage,
    getTaskTodoPage
  } from '@/service/task/TaskApi'
  import _ from 'lodash'
  import { formatTimestamps } from '@/utils/dateUtil'
  const state = reactive({
    tabs: ['待办', '已办', '抄送我', '已发起'], // tabs的标题 TODO @@alwayssuper 中英文之间，需要空格。https://github.com/ruanyf/document-style-guide
    tabIndex: 0, // tabs 的索引
    toDoCount: 0, // tabs 的待办流程总数 TODO @alwayssuper 变量建议用 todoCount。因为不是求和，而是待办数量
    showPopup: false, // 筛选弹窗控制
    categoryList: [], // 流程分类列表
    search: {
      keyword: '', // 关键词
      status: undefined, // 流程状态的索引 TODO @alwayssuper，改成 status
      categoryId: undefined, // 流程分类的索引 TODO @alwayssuper，改成 categoryId
      createTime: [] // 流程所在时间范围 TODO @alwayssuper createTime，和后端的字段一直，会好维护点
    },
    pagination: {
      list: [],
      total: 0,
      pageNo: 1,
      pageSize: 6
    }, // 流程列表
    loadStatus: ''
  })

  // TODO @alwayssuper 建议用 name。tabName。这样，它可以是 todo、done、copy、myTask
  // 选中 tab
  function onTabsChange(tabName: { index: number }) {
    state.tabIndex = tabName.index
    paginationNull()
    // TODO @alwayssuper：tab 切换的时候，是不是不用去掉搜搜条件哈。
    // 讨论：在四个子页面的搜索中，有任务名称搜索和流程名称搜索两种关键词，但都仅靠 placeholder 提示是哪一种 keyword，如果不重置，则带着 keyword 跳转，遮挡 placeholder，可能会影响使用流程。
    resetSearch()
    loadData()
  }
  // TODO @alwayssuper：注释使用 /** */ 主要 idea 可以高亮的更明显哈
  // 重头加载代码
  function paginationNull() {
    state.pagination.list = []
    state.pagination.total = 0
    state.pagination.pageNo = 1
    state.pagination.pageSize = 6
  }

  // TODO @alwayssuper：方法和方法之间，最后有空行，这样，看起来更清晰。
  // 初始化搜索信息
  // TODO @alwayssuper：resetSearch，会更好点。
  function resetSearch() {
    state.search.keyword = ''
    state.search.categoryId = undefined
    state.search.status = undefined
    state.search.createTime = []
  }
  // 根据tab加载数据
  // TODO @alwayssuper：loadData 就好啦。
  function loadData() {
    switch (state.tabIndex) {
      case 0:
        getTaskTodoList()
        break
      case 1:
        getTaskDoneList()
        break
      case 2:
        getProcessInstanceCopyList()
        break
      case 3:
        getProcessInstanceMyList()
        break
    }
  }
  // 设置加载状态
  function setLoadingStatus() {
    state.loadStatus = 'loading'
  }

  // 更新分页信息
  function updatePagination(data: { list: any[]; total: number }) {
    state.pagination.list = _.concat(state.pagination.list, data.list)
    state.pagination.total = data.total
    state.loadStatus =
      state.pagination.list.length < state.pagination.total ? '' : 'finished'
  }

  // 获取待办流程列表
  const getTaskTodoList = async () => {
    try {
      setLoadingStatus()
      // TODO @alwayssuper：最好 try catch。万一请求失败。参考后端 vue3 的写法
      // 讨论：找到的H5后台vue3的使用情况是结合了饿了么列表组件，准备后续参考他人在uniapp的try catch机制QAQ
      const data = await getTaskTodoPage({
        pageNo: state.pagination.pageNo,
        pageSize: state.pagination.pageSize,
        name: state.search.keyword,
        createTime: formatTimestamps(state.search.createTime)
      })
      updatePagination(data)
      state.toDoCount = data.total
    } catch (error) {
      // 处理请求错误
      console.error('获取待办流程列表失败:', error)
    }
  }

  // 获取已办流程列表
  const getTaskDoneList = async () => {
    try {
      setLoadingStatus()
      const data = await getTaskDonePage({
        pageNo: state.pagination.pageNo,
        pageSize: state.pagination.pageSize,
        name: state.search.keyword,
        createTime: formatTimestamps(state.search.createTime)
      })
      updatePagination(data)
    } catch (error) {
      // 处理请求错误
      console.error('获取已办流程列表:', error)
    }
  }

  // 获取抄送我的流程列表
  const getProcessInstanceCopyList = async () => {
    try {
      setLoadingStatus()
      const data = await getProcessInstanceCopyPage({
        pageNo: state.pagination.pageNo,
        pageSize: state.pagination.pageSize,
        processInstanceName: state.search.keyword,
        createTime: formatTimestamps(state.search.createTime)
      })
      updatePagination(data)
    } catch (error) {
      // 处理请求错误
      console.error('获取抄送我的流程列表:', error)
    }
  }

  // 获取已发起流程列表
  const getProcessInstanceMyList = async () => {
    try {
      setLoadingStatus()
      const data = await getProcessInstanceMyPage({
        pageNo: state.pagination.pageNo,
        pageSize: state.pagination.pageSize,
        name: state.search.keyword,
        category: state.search.categoryId,
        status: state.search.status,
        createTime: formatTimestamps(state.search.createTime)
      })
      updatePagination(data)
    } catch (error) {
      // 处理请求错误
      console.error('获取已发起流程列表:', error)
    }
  }

  // 加载更多
  function loadMore() {
    if (state.loadStatus === 'finished') {
      return
    }
    state.pagination.pageNo++
    loadData()
  }
  // 获取流程分类列表
  const getCategoryList = async () => {
    const data = await getCategorySimpleList()

    // TODO 可以做个专门适配的钩子函数
    // 转换为该 ui 组件选取器的属性
    data.forEach((category: CategoryVO) => {
      state.categoryList.push({
        label: category.name,
        value: category.code
      })
    })
  }
  function search() {
    paginationNull()
    loadData()
    state.showPopup = false
  }
  function cancel() {
    state.showPopup = true
  }

  onLoad(() => {
    getCategoryList()
  })
  onReachBottom(() => {
    loadMore()
  })

  // TODO @alwayssuper：貌似进入界面的时候，会查询两次列表
</script>
<style lang="scss" scoped></style>
