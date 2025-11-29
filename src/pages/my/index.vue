<!-- 我的界面 -->
<route lang="json5" type="page">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的信息'
  }
}
</route>
<template>
  <!-- TODO @guanhai：相关的 style，都换成 unocss -->
  <view class="main">
    <!-- 头部：个人信息 -->
    <view class="head-card customer-card">
      <wd-row :gutter="10" style="display: block; height: 50px">
        <wd-col :span="4">
          <div class="user-avatar">
            <wd-img
              custom-class="avatar"
              mode="center"
              round
              :src="avatar ? avatar : '/static/images/avatar2.jpg'"
            />
          </div>
          <div style="display: block"></div>
        </wd-col>
        <wd-col :span="12">
          <div v-if="nickname" class="user-name">{{ nickname }}</div>
          <div v-else style="letter-spacing: 0.2rem" class="ml-5">
            <wd-text
              text="未登录"
              bold
              size="18px"
              color="#a9a9a9"
              :lines="2"
              lineHeight="50px"
              @click="handleLogin"
            />
          </div>
        </wd-col>
        <wd-col :span="8">
          <div
            class="flex justify-center items-center h50px"
            @click="handleToUserInfo"
          >
            <wd-button
              size="small"
              type="info"
              icon="info-circle"
              plain
              hairline
            >
              个人信息
            </wd-button>
          </div>
        </wd-col>
      </wd-row>
    </view>

    <!-- 【我的】相关 card 列表 -->
    <view class="customer-card">
      <wd-row :gutter="0" style="display: block; height: 32px">
        <wd-col custom-class="card-line" :span="3">
          <img src="/static/icons/message.png" alt="" class="card-icon" />
        </wd-col>
        <wd-col custom-class="card-line card-title" :span="14"> 站内信 </wd-col>
      </wd-row>
    </view>

    <!-- 【系统】相关 card 列表 -->
    <!-- TODO guanhai：字和 icon 没有对齐 -->
    <view class="customer-card">
      <wd-row :gutter="0" style="display: block; height: 32px">
        <wd-col custom-class="card-line" :span="3">
          <img src="/static/icons/help.png" alt="" class="card-icon" />
        </wd-col>
        <div @click="handleToHelper">
          <wd-col custom-class="card-line card-title" :span="14">
            帮助中心
          </wd-col>
          <wd-col custom-class="card-line card-line-end card-title" :span="7">
            >
          </wd-col>
        </div>
      </wd-row>
      <div class="title-flex"></div>
      <wd-row :gutter="0" style="display: block; height: 32px">
        <wd-col custom-class="card-line" :span="3">
          <img src="/static/icons/contact.png" alt="" class="card-icon" />
        </wd-col>
        <div @click="handleToContactService">
          <wd-col custom-class="card-line card-title" :span="14">
            联系客服
          </wd-col>
          <wd-col
            custom-class="card-line card-line-end card-title"
            :span="7"
            style="color: darkgrey; white-space: nowrap"
          >
            >
          </wd-col>
        </div>
      </wd-row>
      <div class="title-flex"></div>
      <wd-row :gutter="0" style="display: block; height: 32px">
        <wd-col custom-class="card-line" :span="3">
          <img src="/static/icons/setting.png" alt="" class="card-icon" />
        </wd-col>
        <div @click="handleToSystemSetting">
          <wd-col custom-class="card-line card-title" :span="14">
            系统设置
          </wd-col>
          <wd-col custom-class="card-line card-line-end card-title" :span="7">
            >
          </wd-col>
        </div>
      </wd-row>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store'

  const userStore = useUserStore()
  const {
    userInfo: {
      user: { avatar, nickname }
    }
  } = userStore
  const user = ref<any>({})

  // TODO @guanhai：管理后台 uniapp，默认需要登录。所以应该就没有 handleLogin 的情况啦。
  /** 跳转登录 */
  const handleLogin = () => {
    uni.redirectTo({ url: '/pages/login/index' })
  }

  /** 跳转个人信息 */
  const handleToUserInfo = () => {
    uni.navigateTo({ url: '/pages/my-info/index' })
  }

  /** 跳转帮助中心 */
  const handleToHelper = () => {
    uni.navigateTo({ url: '/pages/my/helper/index' })
  }

  /** 跳转联系客服 */
  const handleToContactService = () => {
    uni.navigateTo({ url: '/pages/my/contact-service/index' })
  }

  /** 跳转系统设置 */
  const handleToSystemSetting = () => {
    uni.navigateTo({ url: '/pages/my/system-setting/index' })
  }

  /** 初始化 */
  onLoad((_option) => {
    user.value = userStore.userInfo.user
  })
</script>
<style scoped lang="scss">
  .title-flex {
    display: flex;
    align-items: center;
    font-size: 0.4rem;
    color: ghostwhite;
  }

  .title-flex::before,
  .title-flex::after {
    flex: 1;
    height: 1px;
    margin: 4px 0px;
    content: '';
    background: ghostwhite;
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 8px;
    font-size: 12px;
    color: #6c757d;
    text-align: center;
    cursor: pointer;
    background-color: #ffffff;
    border: 1px ghostwhite;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .icon-btn.button-hover {
    background-color: ghostwhite;
  }

  .icon-btn .icon {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }

  .icon-btn:focus {
    outline: none;
  }

  .card-icon {
    width: 24px;
    height: 24px;
    padding: 0px;
    //display: block;
    //margin-right: 6px;
  }

  :deep(.card-line) {
    display: flex;
    align-items: center;
    float: left;
    height: 100%;
    font-size: var(--wot-card-fs, var(--wot-fs-content, 14px));
    line-height: var(--wot-card-fs, var(--wot-fs-content, 24px));
  }

  :deep(.card-title) {
    font-weight: bold;
    white-space: nowrap;
  }

  :deep(.card-line-end) {
    justify-content: flex-end;
    //text-align: end;
  }

  .main {
    background-color: #f2f1f5;

    .customer-card {
      padding: var(--wot-card-padding, 0 var(--wot-size-side-padding, 15px));
      //margin-top:50px;
      //padding: 10px 0px;
      padding-top: 10px;
      padding-bottom: 10px;
      margin: var(--wot-card-margin, 0 var(--wot-size-side-padding, 15px));
      margin-bottom: 12px;
      font-size: var(--wot-card-fs, var(--wot-fs-content, 14px));
      line-height: var(--wot-card-line-height, 1.1);
      background-color: var(--wot-card-bg, var(--wot-color-white, white));
      border-radius: var(--wot-card-radius, 8px);
      box-shadow: var(
        --wot-card-shadow-color,
        0px 4px 8px 0px rgba(0, 0, 0, 0.02)
      );
    }

    .head-card {
      margin-top: 50px;

      .user-avatar {
        display: flex;
      }

      :deep(.avatar) {
        flex: 1;
        width: 50px; /* 或者使用具体的像素值 */
        height: 50px; /* 设置固定高度 */
        border-radius: 10px;
        transform: translateY(-20px);
      }

      .user-name {
        align-content: center;
        justify-content: center;
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        color: darkgrey;
        text-align: center;
      }
    }
  }
</style>
