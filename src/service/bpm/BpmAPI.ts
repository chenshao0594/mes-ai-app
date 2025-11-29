import { http, httpGet, httpPost } from '@/utils/http'

// TODO @芋艿：后续要拆下。不然单个 api 太多了。

// 获取待办任务分页
export const getTaskTodoPage = async (params: any) => {
  return await http({
    url: '/bpm/task/todo-page',
    query: params,
    method: 'GET'
  })
}

export const getProcessInstanceMyPage = async (params: any) => {
  return await http({
    url: '/bpm/process-instance/my-page',
    query: params,
    method: 'GET'
  })
}

// 获得指定流程实例的任务列表，包括完成的、未完成的
export const getTaskListByProcessInstanceId = async (
  processInstanceId: string
) => {
  return await http({
    url:
      '/bpm/task/list-by-process-instance-id?processInstanceId=' +
      processInstanceId,
    method: 'GET'
  })
}

// 获取流程实例相关信息
export const getProcessInstance = async (id: string) => {
  return await http({
    url: '/bpm/process-instance/get?id=' + id,
    method: 'GET'
  })
}

// 获取已处理的任务分页
export const getTaskDonePage = async (params: any) => {
  return await http({
    url: '/bpm/task/done-page',
    query: params,
    method: 'GET'
  })
}

// 获取我参与的流程实例分页
export const getProcessInstanceCopyPage = async (params: any) => {
  return await http({
    url: '/bpm/process-instance/copy/page',
    query: params,
    method: 'GET'
  })
}
