import { http, httpGet, httpPost } from '@/utils/http'

/**
 * 获取流程定义列表
 *
 * @param params
 */
export const getProcessDefinitionList = async (params): Promise<any> => {
  return await http<any>({
    url: '/bpm/process-definition/list',
    query: params,
    method: 'GET'
  })
}
