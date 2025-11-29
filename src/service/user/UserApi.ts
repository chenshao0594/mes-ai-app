import { httpGet, httpPost } from '@/utils/http'
import Mock from 'mockjs'

export interface UserVO {
  id: number
  avatar: string
  username: string
  job: string
  tel: string
  email: string
  deptInfo: string
  //   code: string
  //   sort: number
  //   data_scope: string
  //   data_scope_dept_ids: string
  //   status: number
  //   type: number
  //   remark: string
  //   createTime: string
}

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

// 模拟数据类型是数组
const mockConfig = (type = 'array') => {
  if (type === 'array') {
    return {
      'data|10': [
        {
          'id|+1': 1,
          avatar: 'https://picsum.photos/150/150?random=1',
          username: '@cname',
          job: '前端开发',
          tel: '@phone',
          email: '@email',
          deptInfo: '研发部',

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

/*
 *@Description: 获取用户列表
 *@MethodAuthor: xiaohong
 *@Date: 2024-11-27 18:48:44
 */
export const getList = (
  query?: object
): Promise<{ data: UserVO[]; total: number }> => {
  if (useMock) {
    return new Promise((resolve) => {
      const data = Mock.mock(mockConfig('array'))
      setTimeout(() => {
        resolve({ data: data.data, total: 30 })
      }, 2000)
    })
  } else {
    return httpGet('/system/user/page', query)
  }
}
/*
 *@Description: 获取用户信息
 *@MethodAuthor: xiaohong
 *@Date: 2024-11-27 18:49:19
 */
export const getInfo = (id: number): Promise<{ data: UserVO }> => {
  if (useMock) {
    return new Promise((resolve) => {
      const data = Mock.mock(mockConfig('object'))
      resolve({ data: data.data })
    })
  } else {
    return httpGet<{ data: UserVO }>('/system/user/get?id=' + id)
  }
}

/*
 *@Description: 新增用户
 *@MethodAuthor: xiaohong
 *@Date: 2024-11-27 18:49:30
 */
export const createUser = (data: object) => {
  if (useMock) {
    return new Promise((resolve) => {
      const data = Mock.mock(mockConfig('object'))
      resolve({ data: data.data })
    })
  } else {
    return httpPost('/system/user/create', data)
  }
}
/*
 *@Description: 更新用户信息
 *@MethodAuthor: xiaohong
 *@Date: 2024-11-27 18:49:40
 */
export const updateUser = (data: object) => {
  if (useMock) {
    return new Promise((resolve) => {
      const data = Mock.mock(mockConfig('object'))
      resolve({ data: data.data })
    })
  } else {
    return httpPost('/system/user/update', data)
  }
}

/*
 *@Description: 删除用户
 *@MethodAuthor: xiaohong
 *@Date: 2024-11-27 18:49:50
 */
export const deleteUser = (id: number) => {
  if (useMock) {
    return new Promise((resolve) => {
      resolve({ data: null, code: 200, msg: '删除成功' })
    })
  } else {
    return httpPost('/system/user/delete' + { id })
  }
}
