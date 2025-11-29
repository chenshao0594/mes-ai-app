import { http, httpGet, httpPost, httpPut } from '@/utils/http'

// TODO 测试使用  拒绝anysripe
// 查询待办流程分页列表
export const getTaskTodoPage = (params: any): Promise<any> => {
  return httpGet<any>('/bpm/task/todo-page', params)
}
// 查询已办流程分页列表
export const getTaskDonePage = (params: any): Promise<any> => {
  return httpGet<any>('/bpm/task/done-page', params)
}
// 查询抄送我的流程分页列表
export const getProcessInstanceCopyPage = (params: any): Promise<any> => {
  return httpGet<any>('/bpm/process-instance/copy/page', params)
}
// 查询我的流程分页列表
export const getProcessInstanceMyPage = (params: any): Promise<any> => {
  return httpGet<any>('/bpm/process-instance/my-page', params)
}
// 审批通过
export const approveTask = (data: any): Promise<any> => {
  return httpPut<any>('/bpm/task/approve', data)
}

// 审批不通过
export const rejectTask = (data: any): Promise<any> => {
  return httpPut<any>('/bpm/task/reject', data)
}
