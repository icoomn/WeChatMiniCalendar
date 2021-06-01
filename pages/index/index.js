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
        date: '29',
        show: true
      },
      {
        date: '13',
        show: true
      },
      {
        date: '24',
        show: true
      },
      {
        date: '5',
        show: true
      },
      {
        date: '16',
        show: true
      },
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
        date: '10',
        show: true
      },
      {
        date: '20',
        show: true
      },
      {
        date: '11',
        show: true
      },
      {
        date: '12',
        show: true
      },
      {
        date: '13',
        show: true
      },
      {
        date: '16',
        show: true
      },
    ]
    this.setData({
      daysList: dt,
      isDataChange: !this.data.isDataChange
    })
  },
  formatter (res) {
    console.log(123);
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

    this.setData({ daysData: da });
  }
})
