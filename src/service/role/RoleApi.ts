import { httpGet, httpPost } from '@/utils/http'
import Mock from 'mockjs'

export interface RoleVO {
  id: number
  name: string
  code: string
  sort: number
  data_scope: string
  data_scope_dept_ids: string
  status: number
  type: number
  remark: string
  createTime: string
}

const useMock = import.meta.env.VITE_USE_MOCK === 'true'
// 模拟数据类型是数组
const mockConfig = (type = 'array') => {
  if (type === 'array') {
    return {
      'data|10': [
        {
          'id|+1': 1,
          name: '@name',
          code: '@word',
          'sort|1-100': 1,
          data_scope: '@word',
          data_scope_dept_ids: '@word',
          'status|1-2': 1,
          'type|1-2': '@word',
          remark: '@sentence',
          createTime: '@datetime'
        }
      ]
    }
  } else {
    return {
      data: {
        id: 1,
        name: '@name',
        code: '@word',
        'sort|1-100': 1,
        data_scope: '@word',
        data_scope_dept_ids: '@word',
        'status|1-2': 1,
        'type|1-2': '@word',
        remark: '@sentence',
        createTime: '@datetime'
      }
    }
  }
}
export const getList = (query: object) => {
  if (useMock) {
    return new Promise((resolve) => {
      const data = Mock.mock(mockConfig('array'))
      resolve({ data: data.data })
    })
  } else {
    return httpGet('/system/role/page', query)
  }
}
export const getInfo = (id: number): Promise<RoleVO> => {
  if (useMock) {
    return new Promise((resolve) => {
      const data = Mock.mock(mockConfig('object'))
      resolve({ data: data.data })
    })
  } else {
    return httpGet<RoleVO>('/system/role/get?id=' + id)
  }
}

export const createRole = (data: object) => {
  if (useMock) {
    return new Promise((resolve) => {
      const data = Mock.mock(mockConfig('object'))
      resolve({ data: data.data })
    })
  } else {
    return httpPost('/system/role/create', data)
  }
}

export const updateRole = (data: object) => {
  if (useMock) {
    return new Promise((resolve) => {
      const data = Mock.mock(mockConfig('object'))
      resolve({ data: data.data })
    })
  } else {
    return httpPost('/system/role/update', data)
  }
}

export const deleteRole = (id: number) => {
  if (useMock) {
    return new Promise((resolve) => {
      resolve({ data: null, code: 200, msg: '删除成功' })
    })
  } else {
    return httpPost('/system/role/delete' + { id })
  }
}
