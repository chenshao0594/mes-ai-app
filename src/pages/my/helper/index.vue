<route lang="json5" type="page">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '帮助中心'
  }
}
</route>
<template>
  <view class="helper-page">
    <wd-input
      custom-class="head-input"
      v-model="searchValue"
      prefix-icon="search"
      focus
      clearable
      placeholder="请输入你想咨询的问题"
    />
    <wd-tabs v-model="tab">
      <!-- TODO @guanhai：是不是可以搞成 for 循环，不用写 2 遍噢？ -->
      <wd-tab title="热门问题" name="hot">
        <wd-cell-group border>
          <wd-cell
            v-for="(item, idx) in tabContents.get('hot')"
            :title="item.text"
            :key="idx"
            is-link
          >
            <template #icon>
              <view class="prefix-icon">
                <!-- TODO 芋艿：搞到 cdn -->
                <img src="\static\icons\memorandum.png" alt="" />
              </view>
            </template>
          </wd-cell>
        </wd-cell-group>
      </wd-tab>
      <wd-tab title="最近更新" name="recently">
        <wd-cell-group border>
          <wd-cell
            v-for="(item, idx) in tabContents.get('recently')"
            :title="item.text"
            :key="idx"
            is-link
            use-slot
          >
            <template #icon>
              <!-- TODO 芋艿：搞到 cdn -->
              <view class="prefix-icon">
                <img src="\static\icons\memorandum.png" alt="" />
              </view>
            </template>
          </wd-cell>
        </wd-cell-group>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script setup lang="ts">
  const searchValue = ref('')
  const tab = ref<string>('hot')
  // TODO @芋艿：后续换一下内容
  const tabContents = new Map([
    [
      'hot',
      [
        { text: '如何切换用户?' },
        { text: '如何修改密码?' },
        { text: '如何找回密码?' },
        { text: '如何更新系统?' }
      ]
    ],
    [
      'recently',
      [
        { text: '如何更新系统?' },
        { text: '如何找回密码?' },
        { text: '如何修改密码?' },
        { text: '如何切换用户?' }
      ]
    ]
  ])
</script>

<style scoped lang="scss">
  :deep(.head-input) {
    margin: 5px 8px;
    .wd-input__prefix {
      padding-left: 8px;
      .wd-icon {
        vertical-align: text-top;
      }
    }
  }

  .prefix-icon {
    width: var(--wot-card-fs, var(--wot-fs-content, 18px));
    height: var(--wot-card-fs, var(--wot-fs-content, 24px));
    margin-right: 8px;
    img,
    image {
      width: var(--wot-card-fs, var(--wot-fs-content, 18px));
      height: var(--wot-card-fs, var(--wot-fs-content, 18px));
      vertical-align: sub;
    }
  }
</style>
