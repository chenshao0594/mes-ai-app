import { http } from '@/utils/http'

// TODO @芋艿：url 的风格
const UserApi = {
  // 获得基本信息
  getUserInfo: () => {
    return http({
      url: '/member/user/get',
      method: 'GET',
      custom: {
        showLoading: false,
        auth: true
      }
    })
  },
  // 修改基本信息
  updateUser: (data) => {
    return http({
      url: '/member/user/update',
      method: 'PUT',
      data,
      custom: {
        auth: true,
        showSuccess: true,
        successMsg: '更新成功'
      }
    })
  },
  // 修改用户手机
  updateUserMobile: (data) => {
    return http({
      url: '/member/user/update-mobile',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中',
        showSuccess: true,
        successMsg: '修改成功'
      }
    })
  },
  // 基于微信小程序的授权码，修改用户手机
  updateUserMobileByWeixin: (code) => {
    return http({
      url: '/member/user/update-mobile-by-weixin',
      method: 'PUT',
      data: {
        code
      },
      custom: {
        showSuccess: true,
        loadingMsg: '获取中',
        successMsg: '修改成功'
      }
    })
  },
  // 修改密码
  updateUserPassword: (data) => {
    return http({
      url: '/member/user/update-password',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中',
        showSuccess: true,
        successMsg: '修改成功'
      }
    })
  },
  // 重置密码
  resetUserPassword: (data) => {
    return http({
      url: '/member/user/reset-password',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中',
        showSuccess: true,
        successMsg: '修改成功'
      }
    })
  }
}

export default UserApi
