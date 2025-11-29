import { http, httpGet, httpPost } from '@/utils/http'

export type DictDataVO = {
  id: number | undefined
  sort: number | undefined
  label: string
  value: string
  dictType: string
  status: number
  colorType: string
  cssClass: string
  remark: string
  createTime: Date
}

export const getSimpleDictDataList = (): Promise<DictState> => {
  if (true) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          []
        )
      }, 2000)
    })
  }
  return httpGet<DictState>('/system/dict-data/simple-list')
}
