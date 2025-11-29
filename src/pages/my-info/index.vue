<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '用户信息'
  }
}
</route>
<template>
  <view class="my-info-container">
    <view class="header-section">
      <view class="avatar-container">
        <!-- TODO @dengbo：是不是 <wd-img-cropper /> 会更简洁一点哈；下面其他的也，建议类似这么搞 -->
        <wd-img-cropper
          v-model="show"
          :img-src="src"
          @confirm="handleConfirm"
        ></wd-img-cropper>
        <view v-if="!imgSrc" @click="upload" class="avatar-placeholder">
          <wd-icon name="camera" size="60px" color="#BDBDBD"></wd-icon>
        </view>
        <wd-img
          v-if="imgSrc"
          round
          width="200rpx"
          height="200rpx"
          :src="imgSrc"
          mode="aspectFill"
          custom-class="profile-img"
          @click="upload"
        />
        <view class="avatar-edit-text">修改头像</view>
      </view>
    </view>

    <wd-form ref="form" :model="formData" class="info-form" errorType="toast">
      <!-- 可编辑信息部分 -->
      <wd-cell-group border class="form-group editable-group">
        <view
          class="flex justify-between items-center"
          style="border-bottom: 2rpx solid #eaeaea"
        >
          <view class="section-title">个人信息</view>
          <view @click="editInfo" class="section-des"
            >修改信息<wd-icon name="arrow-right"></wd-icon
          ></view>
        </view>
        <!-- TODO @dengbo：是不是 wd-input 换成 wd-cell 比较合理 -->
        <wd-input
          label="用户名"
          label-width="180rpx"
          prop="nickname"
          disabled
          v-model="formData.nickname"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <wd-input
          label="邮箱"
          label-width="180rpx"
          prop="email"
          disabled
          v-model="formData.email"
          placeholder="请输入邮箱"
          :rules="[
            {
              required: true,
              message: '请输入邮箱',
              type: 'email'
            }
          ]"
        />
        <!-- TODO @芋艿：后续走字典 -->
        <wd-cell title="性别" title-width="180rpx">
          <view class="gender-selection">
            {{ formData.sex == 1 ? '男' : '女' }}
          </view>
        </wd-cell>
      </wd-cell-group>

      <!-- 不可编辑信息部分 -->
      <wd-cell-group border class="form-group info-group">
        <view class="section-title">账户信息</view>
        <wd-cell
          size="large"
          title="手机号"
          title-width="180rpx"
          :value="displayData.mobile"
        />
        <wd-cell
          size="large"
          title="所属部门"
          title-width="180rpx"
          :value="displayData.deptName"
        />
        <wd-cell
          size="large"
          title="所属岗位"
          title-width="180rpx"
          :value="displayData.postNames"
        />
        <wd-cell
          size="large"
          title="所属角色"
          title-width="180rpx"
          :value="displayData.roleNames"
        />
      </wd-cell-group>

      <!-- 密码修改部分 -->
      <wd-cell-group border class="form-group">
        <view class="section-title">安全设置</view>
        <wd-cell
          size="large"
          title="登录密码"
          title-width="180rpx"
          is-link
          @click="changePassword"
        >
          <view class="password-change">修改密码</view>
        </wd-cell>
        <wd-cell
          size="large"
          title="微信小程序"
          title-width="180rpx"
          @click="bindWechatMiniProgram"
          clickable
        >
          <template #icon>
            <view class="cell-icon"></view>
          </template>
          <!-- TODO @芋艿：三方登录搞了后，需要接入下 -->
          <view v-if="isWechatBound" class="wechat-info">
            <image src="/static/images/avatar1.jpg" class="wechat-avatar" />
            <text class="wechat-nickname">
              {{ wechatInfo.nickName || '用户b8x0m5t5' }}
            </text>
            <view class="wechat-unbind"> 解绑 </view>
          </view>
          <view v-else class="wechat-bind"> 未绑定 </view>
        </wd-cell>
      </wd-cell-group>

      <!-- 修改个人信息的组件 -->
      <InfoEdit
        :user-info="formData"
        v-model="showInfoEdit"
        @confirm="handleInfoEditConfirm"
      />
      <!-- 修改密码的组件 -->
      <PasswordEdit
        v-model="showPasswordEdit"
        @confirm="handlePasswordEditConfirm"
      />
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
  import { useToast } from 'wot-design-uni'
  import PasswordEdit from './components/PasswordEdit.vue'
  import InfoEdit from './components/InfoEdit.vue'
  import {
    getUserProfile,
    updateUserProfile,
    updateUserProfilePassword
  } from '@/service/my-info/MyInfoAPI'

  const src = ref<string>('')
  const imgSrc = ref<string>('')
  const show = ref<boolean>(false)

  // 表单数据
  const formData = reactive({
    nickname: '',
    email: '',
    sex: 1
  })

  // 显示数据
  const displayData = reactive({
    mobile: '',
    deptName: '',
    postNames: '',
    roleNames: ''
  })

  const { success: showSuccess } = useToast()
  const form = ref()

  const showInfoEdit = ref(false)
  const showPasswordEdit = ref(false)

  // 添加微信信息
  const wechatInfo = ref({
    avatarUrl: '',
    nickName: ''
  })

  // 添加微信绑定状态
  const isWechatBound = ref(true)

  function editInfo() {
    showInfoEdit.value = true
  }

  async function handleInfoEditConfirm(formData: any) {
    // 这里可以添加修改密码的逻辑
    const result = await updateUserProfile(formData)
    if (!result) {
      return
    }
    showSuccess({
      msg: '修改成功'
    })
    initInfo()
  }

  function changePassword() {
    showPasswordEdit.value = true
  }

  async function handlePasswordEditConfirm(formData: any) {
    // 这里可以添加修改密码的逻辑
    const result = await updateUserProfilePassword(formData)
    if (!result) {
      return
    }
    showSuccess({
      msg: '修改成功'
    })
  }

  function upload() {
    uni.chooseImage({
      count: 1,
      success: (res) => {
        src.value = res.tempFilePaths[0]
        show.value = true
      }
    })
  }

  function handleConfirm(event) {
    const { tempFilePath } = event
    uni.uploadFile({
      url: '/system/user/profile/update-avatar',
      filePath: tempFilePath,
      name: 'avatarFile',
      success: (res) => {
        imgSrc.value = tempFilePath
        showSuccess({
          msg: '头像修改成功'
        })
      }
    })
  }

  const user = ref<any>({})

  async function initInfo() {
    const res = await getUserProfile()
    if (!res) {
      return
    }
    user.value = res
    // 初始化表单数据
    imgSrc.value = user.value.avatar || ''
    formData.nickname = user.value.nickname || ''
    formData.email = user.value.email || ''
    formData.sex = user.value.sex || 1

    // 初始化显示数据
    displayData.mobile = user.value.mobile || ''
    displayData.deptName = user.value.dept?.name || ''
    displayData.postNames = getPostNames(user.value.posts || [])
    displayData.roleNames = getRoleNames(user.value.roles || [])

    // 获取微信绑定状态和信息
    // 这里需要从后端获取用户的微信绑定状态和信息
    // 例如：
    // const wechatBindInfo = await getUserWechatBindInfo()
    // if (wechatBindInfo) {
    //   isWechatBound.value = true
    //   wechatInfo.value = {
    //     avatarUrl: wechatBindInfo.avatarUrl,
    //     nickName: wechatBindInfo.nickName
    //   }
    // } else {
    //   isWechatBound.value = false
    // }
  }

  onLoad(async (_option) => {
    initInfo()
  })

  // 添加这两个新函数
  function getPostNames(posts: any[]): string {
    return posts.map((post) => post.name).join('、')
  }

  function getRoleNames(roles: any[]): string {
    return roles.map((role) => role.name).join('、')
  }

  function bindWechatMiniProgram() {
    if (isWechatBound.value) {
      // 如果已绑定，询问是否解绑
      uni.showModal({
        title: '解绑微信小程序',
        content: '确定要解绑微信小程序吗？',
        success: (res) => {
          if (res.confirm) {
            // 这里添加解绑逻辑
            unbindWechatMiniProgram()
          }
        }
      })
    } else {
      // 如果未绑定，执行绑定逻辑
      // uni.login({
      //   provider: 'weixin',
      //   success: (loginRes) => {
      //     if (loginRes.code) {
      //       // 获取到登录凭证（code）后，发送到后端进行绑定
      //       bindWechatWithCode(loginRes.code)
      //     } else {
      //       console.log('登录失败：' + loginRes.errMsg)
      //     }
      //   }
      // })
    }
  }

  function bindWechatWithCode(code: string) {
    // 这里添加向后端发送绑定请求的逻辑
    // 例如：
    // const result = await userProfileBindWechat(code)
    // if (result) {
    //   isWechatBound.value = true
    //   showSuccess({ msg: '微信小程序绑定成功' })
    // }
  }

  function unbindWechatMiniProgram() {
    // 这里添加向后端发送解绑请求的逻辑
    // 例如：
    // const result = await userProfileUnbindWechat()
    // if (result) {
    //   isWechatBound.value = false
    //   showSuccess({ msg: '微信小程序解绑成功' })
    // }
  }
</script>

<style lang="scss" scoped>
  :deep(.uni-input-input:disabled) {
    color: var(--wot-cell-value-color, rgba(0, 0, 0, 0.85)) !important;
  }
  .my-info-container {
    min-height: 100vh;
    padding: 30rpx;
    background-color: #f0f2f5;
  }

  .header-section {
    display: flex;
    justify-content: center;
    margin-bottom: 50rpx;
  }

  .avatar-container {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
  }

  .avatar-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #e0e0e0;
  }

  .avatar-edit-text {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10rpx 0;
    font-size: 24rpx;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .info-form {
    overflow: hidden;
    background-color: transparent;
    border-radius: 16rpx;
  }

  .form-group {
    margin-bottom: 30rpx;
    overflow: hidden;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  }

  .section-title {
    padding: 30rpx 30rpx 20rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    background-color: #fff;
  }
  .section-des {
    margin-right: 20rpx;
    font-size: 28rpx;
    color: red;
  }

  .editable-group {
    background-color: #fff;
  }

  .info-group {
    background-color: #fafafa;
  }

  .gender-selection {
    display: flex;
    justify-content: flex-start;
  }

  .password-change {
    font-weight: 500;
    color: #2196f3;
  }

  .submit-button {
    margin-top: 60rpx;
  }

  .wechat-info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .wechat-avatar {
    width: 50rpx;
    height: 50rpx;
    margin-right: 10rpx;
    border-radius: 50%;
  }

  .wechat-nickname {
    margin-left: 10rpx;
    font-size: 28rpx;
    color: #333;
  }

  .wechat-bind {
    font-weight: 500;
    color: #2196f3;
  }
  .wechat-unbind {
    padding: 4rpx 24rpx;
    margin-left: 20rpx;
    color: #db8a5b;
    background-color: #fdf0e5;
    border-radius: 50rpx;
  }
</style>
