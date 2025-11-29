import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAccessToken, removeToken, setToken } from '@/utils/auth'
import { getInfo, loginOut } from '@/service/login/LoginAPI'
import { currRoute } from '@/utils'

const initState: UserInfoVO = {
  permissions: [],
  roles: [],
  isSetUser: false,
  user: {
    id: 0,
    avatar: '',
    nickname: '',
    deptId: 0
  }
}

export const useUserStore = defineStore(
  'user',
  () => {
    // state

    const userInfo = ref<UserInfoVO>({ ...initState })

    /** 获取用户信息 */
    const setUserInfoAction = async () => {
      // 获取不到 accessToken，直接返回
      if (!getAccessToken()) {
        resetState()
        return
      }
      // 获取用户信息
      const data = await getInfo()
      userInfo.value = {
        ...data,
        isSetUser: true
      }
    }

    // 设置用户头像
    // TODO @芋艿：是不是不用了
    const setUserAvatarAction = async (avatar: string) => {
      userInfo.value.user.avatar = avatar
    }

    // 设置用户昵称
    // TODO @芋艿：是不是不用了
    const setUserNicknameAction = async (nickname: string) => {
      userInfo.value.user.nickname = nickname
    }

    /** 退出登录 */
    // TODO @芋艿：要改成 logout 方法
    const LogOut = async () => {
      await loginOut()
      removeToken()
      resetState()
    }

    /** 重置用户信息 */
    const resetState = () => {
      userInfo.value = initState
    }

    /** 登录后的回调 */
    const afterLogin = async (params: Recordable) => {
      // 设置 token
      setToken(params)
      // 获取用户信息，保存到 store
      await setUserInfoAction()

      // 跳转为登录前的页面（redirect）
      const fullPath = currRoute()
      uni.reLaunch({
        url: fullPath.query.redirect || '/pages/work/index'
      })
    }

    // 暴露到外面的方法
    return {
      userInfo,
      setUserInfoAction,
      setUserAvatarAction,
      setUserNicknameAction,
      LogOut,
      resetState,
      afterLogin
    }
  },
  {
    // 持久化
    persist: true
  }
)
