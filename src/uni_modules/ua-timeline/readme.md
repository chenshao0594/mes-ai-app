## uniapp timeline时间轴提示

> **组件名：uaTimeline**
> 代码块： `<ua-timeline>` `ua-timeline-item`

uaTimeline一款基于uniapp vue3自定义多功能时间线组件。支持自定义节点类型/样式、时间戳、节点图标及分割线样式。

> **注意事项**
> 如果想自定义图标，需要自己引入iconfont图标

### 引入方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，只需将本组件放在components目录，在页面`template`中即可直接使用。

### 基本用法

**示例**

- 基础用法

```html
<ua-timeline>
  <ua-timeline-item timestamp="2021-12-28">创建成功</ua-timeline-item>
  <ua-timeline-item timestamp="2021-12-15" lineType="dotted">审核通过</ua-timeline-item>
  <ua-timeline-item>提交信息</ua-timeline-item>
</ua-timeline>
```

- 自定义节点及字体大小

```html
<ua-timeline>
  <ua-timeline-item timestamp="2021-12-12" size="18" icon="ve-icon-check" color="#f60" style="font-size: 16px;">自定义字体大小</ua-timeline-item>
  <ua-timeline-item timestamp="2021-12-15" size="24px" placement="top" hideTimestamp>bbbb</ua-timeline-item>
  <ua-timeline-item size="12px">cccc</ua-timeline-item>
</ua-timeline>
```

- 自定义设置type、size、icon、color属性自定义节点样式

```js
<script setup>
	import { ref } from 'vue'
	const timelineList = ref([
		{ content: '支持使用图标', timestamp: '2018-04-12 20:46', size: 18, type: 'primary', icon: 've-icon-favor' },
		{ content: '支持自定义颜色', timestamp: '2018-04-03 20:46', type: 'warning', lineColor: '#ff22cf' },
		{ content: '支持自定义颜色', timestamp: '2018-04-03 20:46', color: '#0ddaa1', lineType: 'dotted' },
		{ content: '支持自定义尺寸',timestamp: '2018-04-03 20:46',size: '21px' },
		{ content: '默认样式的节点',timestamp: '2018-04-03 20:46' }
	])
</script>
```

```html
<ua-timeline>
  <ua-timeline-item v-for="(item,index) in timelineList" :key="index" :timestamp="item.timestamp" :type="item.type" :size="item.size" :icon="item.icon" :color="item.color" :lineColor="item.lineColor" :lineType="item.lineType"> {{item.content}} </ua-timeline-item>
</ua-timeline>
```

- 自定义type=card卡片时间轴

```html
<ua-timeline type="card">
  <ua-timeline-item timestamp="2021-12-12" type="danger">
    <div>Create a services site 2015-09-01</div>
  </ua-timeline-item>
  <ua-timeline-item timestamp="2021-12-15" placement="top">
    <div>Technical testing 1</div>
    <div>Technical testing 2</div>
    <div>Technical testing 3</div>
  </ua-timeline-item>
  <ua-timeline-item size="12px" type="success">
    <template #dot><i class="ve-icon-edit"></i></template>
    <h4>更新 Github 模板</h4>
    <p>王小虎 提交于 2018/4/12 20:46</p>
  </ua-timeline-item>
</ua-timeline>
```

### API

### uaTimeline Props

| 属性名 |  类型  | 默认值 |    说明    |
| :----: | :----: | :----: | :--------: |
|  type  | String |   -    | 类型(card) |

### uaTimelineItem Props

|    属性名     |  类型   | 默认值 |                         说明                          |
| :-----------: | :-----: | :----: | :---------------------------------------------------: |
|     type      | String  |   -    | 节点类型(primary / success / warning / danger / info) |
|   timestamp   | String  |   -    |                        时间戳                         |
| hideTimestamp | Boolean |   -    |                    是否隐藏时间戳                     |
|   placement   | String  | bottom |               时间戳位置(top / bottom)                |
|     color     | String  |   -    |                       节点颜色                        |
|     icon      | String  |   -    |                       节点图标                        |
|     size      | Number  |   12   |                       节点尺寸                        |
|   lineType    | String  | solid  |          分割线类型(solid / dashed / dotted)          |
|   lineColor   | String  |   -    |                      分割线颜色                       |

#### 事件

- @click 触发点击

### 💝最后

开发不易，希望各位小伙伴们多多支持下哈~~ ☕️☕️
