## 微信小程序自定义日历组件
<br/><br/>

## 一、效果
<br/>

![图片alt](https://github.com/imxiaoer/WeChatMiniCalendar/blob/main/screenshot/picture1.gif)

<br/><br/>

## 二、属性
<br/>

|名称|类型|描述|
|:----|:----|:----|
|defaultDate|String|传入的日期，根据此日期生成日历，不传时默认当天日期，考虑到兼容性问题，建议格式为：2021/2/12|
|isDataChange|Boolean|此字段用来判断用户数据是否改变，通过监控此数据来控制日历是否要重新渲染|
|daysData|Array|传入的日历数据，此数据是经过formatter处理后的数据|

<br/><br/>

## 三、事件
<br/>

|名称|描述|
|:----|:----|
|select|选中单个日期时的事件，返回值为选中的日期字符串，格式为： 2020-12-22|
|formatter|用于处理日历数据，通过此事件动态渲染日历标注，返回值为：日历数据数组|

<br/><br/>

## 四、用法
<br/>

```html
<calendar
    defaultDate="{{defaultDate}}"
    isDataChange="{{isDataChange}}"
    daysData="{{daysData}}"
    bind:select="select"
    bind:formatter="formatter">
</calendar>
```
```javascript
// formatter方法使用
formatter (res) {
    let da = res.detail; // da为日历组件传出的日期数据数组，提供给外部处理
    let dl = this.data.daysList; // 用户数据

    // 先清空
    da.forEach(x => { x.topText = ''; x.bottomText = ''; });

    // 再赋值
    for (let i = 0, len = dl.length; i < len; i++) {
      if (dl[i].show) {
        let model = da.find(x => x.date == dl[i].date);
        model && (model.bottomText = '预约(4)');
      }
    }

    // 将处理后的日期数据再传入日历组件
    this.setData({ daysData: da });
}
```

<br/><br/>

## 五、项目中的实际使用效果
<br/>

![图片alt](https://github.com/imxiaoer/WeChatMiniCalendar/blob/main/screenshot/picture2.gif)