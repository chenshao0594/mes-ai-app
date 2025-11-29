import { http, httpGet, httpPost } from '@/utils/http'

// BPM 流程分类 VO
export interface CategoryVO {
  id: number // 分类编号
  name: string // 分类名
  code: string // 分类标志
  status: number // 分类状态
  sort: number // 分类排序
}

export const getCategorySimpleList = (): Promise<CategoryVO[]> => {
  return httpGet<CategoryVO[]>('/bpm/category/simple-list')
}
