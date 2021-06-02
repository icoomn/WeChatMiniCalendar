// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
     defaultDate: '',
     daysList: [],
     daysData: [],
     isDataChange: false
  },
  onLoad() {
    let daysList = [
      {
        date: '10',
        show: true
      },
      {
        date: '13',
        show: true
      },
      {
        date: '24',
        show: true
      }
    ]
    this.setData({
      defaultDate: '2021/3/2',
      daysList: daysList
    })
  },
  select (res) {
    wx.showToast({
      title: res.detail,
      icon: 'success'
    })
  },
  changeDate () {
    this.setData({
      defaultDate: '2021/5/2'
    })
  },
  changeData () {
    let dt = [
      {
        date: '11',
        show: true
      },
      {
        date: '12',
        show: true
      },
      {
        date: '19',
        show: true
      },
      {
        date: '22',
        show: true
      }
    ]
    this.setData({
      daysList: dt,
      isDataChange: !this.data.isDataChange // 用户数据改变了
    })
  },
  formatter (res) {
    // res.detail 为日历组件传出的日期数据数组

    let da = res.detail;
    let dl = this.data.daysList;

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
})
