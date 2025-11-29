import { http, httpGet, httpPost } from '@/utils/http'

// TODO @芋艿：后续诺到 UserApi.ts 下

/**
 * 获取用户信息
 */
export const getUserProfile = () => {
  return httpGet('/system/user/profile/get')
}

/**
 * 修改用户个人信息
 */
export const updateUserProfile = (data: any) => {
  return http({
    url: '/system/user/profile/update',
    method: 'PUT',
    data
  })
}

/**
 * 修改用户个人密码
 */
export const updateUserProfilePassword = (data: any) => {
  return http({
    url: '/system/user/profile/update-password',
    method: 'PUT',
    data
  })
}
