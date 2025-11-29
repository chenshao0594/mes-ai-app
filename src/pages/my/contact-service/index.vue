<route lang="json5" type="page">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '联系客服'
  }
}
</route>
<template>
  <view class="contact-service-page">
    <view class="contact-qrcode">
      <img :src="QRCode" alt="微信二维码" />
    </view>
    <wd-text text="添加客服二维码" color="#31322c" bold />
    <div class="space"></div>
    <wd-text
      text="服务时间：早上 9:00 - 22:00"
      color="rgba(49, 50, 44, 0.6)"
      bold
      size="14px"
    />
    <wd-text
      text="客服电话：18818818818"
      color="rgba(49, 50, 44, 0.6)"
      bold
      size="14px"
    >
      <!-- TODO @guanhai：@click 还没实现 -->
      <template #suffix>
        <wd-text
          custom-class="phone-dial"
          text="拨打"
          decoration="underline"
          @click="console.log('拨打')"
        />
      </template>
    </wd-text>
    <view class="save-qrcode">
      <wd-button @click="handleSaveQRCode" block>保存二维码图片</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
  import QRCode from '@/static/images/QRCode.png'

  // TODO @guanhai：可以封装一个下载方法，在 /utils/common.ts 里。类似 yudao-ui-admin-vue3 的 download0。ps：小程序，和微信 uniapp 还不太一样，得用 https://blog.csdn.net/qq_40745143/article/details/107287300
  const handleSaveQRCode = () => {
    const a = document.createElement('a')
    a.href = QRCode
    a.download = 'weixin_qrcode.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
</script>

<style scoped lang="scss">
  .contact-service-page {
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: calc(100% - 30px);
    min-height: 50vh;
    padding: 40px 80px;
    margin: 10px 15px 0;
    background-color: white;
    border-radius: 5px;
    .contact-qrcode {
      width: 140px;
      height: 140px;
      img,
      image {
        width: 100%;
        height: 100%;
      }
    }
    .save-qrcode {
      width: 100%;
      margin-top: 15px;
    }
  }

  .space {
    height: 20px;
  }

  :deep(.phone-dial) {
    padding-left: 5px;
  }
</style>
