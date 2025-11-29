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
  <!-- TODO @芋艿：把 my/index.vue 掉，复制到 pages/my/index.vue 下，然后把相关的登录状态补上 -->
  <view class="main">
    <view class="head-card customer-card">
      <wd-row :gutter="10" style="display: block; height: 50px">
        <wd-col :span="4" style="position: relative; height: 80px">
          <div style="display: block">
            <wd-img class="avatar" src="/static/images/jdavatar.jpg" />
          </div>
          <div style="display: block"></div>
        </wd-col>
        <wd-col :span="12">
          <div class="user-name">王文斌（芋艿）</div>
        </wd-col>
        <wd-col :span="8">
          <button class="icon-btn">
            <img src="/static/icons/edit.png" alt="编辑" class="icon" />
            编辑资料
          </button>
        </wd-col>
      </wd-row>
    </view>

    <view class="customer-card">
      <wd-row :gutter="0" style="display: block; height: 32px">
        <wd-col class="card-line" :span="3">
          <img src="/static/icons/gift.png" alt="" class="card-icon" />
        </wd-col>
        <wd-col
          class="card-line"
          :span="14"
          style="font-weight: bold; white-space: nowrap"
        >
          站内信
        </wd-col>
      </wd-row>
    </view>

    <view class="customer-card">
      <wd-row :gutter="0" style="display: block; height: 32px">
        <wd-col class="card-line" :span="3">
          <img src="/static/icons/gift.png" alt="" class="card-icon" />
        </wd-col>
        <wd-col
          class="card-line"
          :span="14"
          style="font-weight: bold; white-space: nowrap"
        >
          帮助中心
        </wd-col>
        <wd-col
          class="card-line card-line-end"
          :span="7"
          style="color: darkgrey; white-space: nowrap"
        >
          >
        </wd-col>
      </wd-row>
      <div class="title-flex"></div>
      <wd-row :gutter="0" style="display: block; height: 32px">
        <wd-col class="card-line" :span="3">
          <img src="/static/icons/gift.png" alt="" class="card-icon" />
        </wd-col>
        <wd-col
          class="card-line"
          :span="14"
          style="font-weight: bold; white-space: nowrap"
        >
          联系客服
        </wd-col>
        <wd-col
          class="card-line card-line-end"
          :span="7"
          style="color: darkgrey; white-space: nowrap"
        >
          >
        </wd-col>
      </wd-row>
      <div class="title-flex"></div>
      <wd-row :gutter="0" style="display: block; height: 32px">
        <wd-col class="card-line" :span="3">
          <img src="/static/icons/gift.png" alt="" class="card-icon" />
        </wd-col>
        <wd-col
          class="card-line"
          :span="14"
          style="font-weight: bold; white-space: nowrap"
        >
          系统设置
        </wd-col>
        <wd-col
          class="card-line card-line-end"
          :span="7"
          style="color: darkgrey; white-space: nowrap"
        >
          >
        </wd-col>
      </wd-row>
    </view>
  </view>
</template>

<script setup lang="ts">
  // TODO @runslowly：处理未登录状态
  // TODO @runslowly：处理已登录的信息

  // TODO @runslowly：https://docs.qq.com/doc/DUGVWbXB0cE1pTFh1，对应第一个板块是（个人信息、站内信）、第二个版本是（联系客服、帮助中心、系统设置）
  // TODO @runslowly：1、个人信息，跳转到个人信息，就可以了
  // TODO @站内信：2、弹出个提示就好。后续再单独拆任务
  // TODO @联系客服：参考文档。就放一个二维码、拨打电话那个。
  // TODO @帮助中心：参考文档。帮助内容就写死就好了，主要有个列表就 ok 拉
  // TODO @系统设置：参考文档。重点是支持退出、和关于我们
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

  .card-line {
    display: flex;
    align-items: center;
    float: left;
    //justify-content: center;
    height: 100%;
    font-size: var(--wot-card-fs, var(--wot-fs-content, 14px));
  }

  .card-line-end {
    justify-content: end;
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

      .avatar {
        position: absolute;
        top: -20px;
        left: 0px;
        width: 50px; /* 或者使用具体的像素值 */
        height: 50px; /* 设置固定高度 */
        overflow: hidden;
        border-radius: 10px;
      }

      .user-name {
        align-content: center;
        justify-content: center;
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
    }
  }
</style>
