import { http, httpGet, httpPost } from '@/utils/http'
import Mock from 'mockjs'

/** 获取租户列表 */
export const getTenants = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 20 }, (_, index) => {
          return {
            name: `租户${index}`,
            id: index + 1
          }
        })
      )
    }, 2000)
  })
}

/** 获取验证码 */
export const getCode = (data: Recordable) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@string("number", 6)'))
    }, 2000)
  })
}

/** 账号 + 密码登录 */
export const login = (data: object) => {
  return http({
    url: '/system/auth/login',
    method: 'POST',
    data
  })
  if (false) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          Mock.mock({
            accessToken: '@guid',
            refreshToken: '@guid'
          })
        )
      }, 2000)
    })
  }
}

/** 退出 */
export const loginOut = () => {
  return httpPost('/system/auth/logout')
}

/** 获取用户信息 */
export const getInfo = (): Promise<UserInfoVO> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Mock.mock({
          permissions: [],
          roles: [],
          isSetUser: true,
          user: {
            id: 0,
            avatar: '',
            nickname: '@cname',
            deptId: 0
          }
        })
      )
    }, 2000)
  })
  // return httpGet<UserInfoVO>('/system/auth/get-permission-info')
}
