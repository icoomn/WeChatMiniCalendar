// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultDate: {
      type: String,
      observer () {
        this.getCurrentDaysAndWeekStart();
        this.renderDate();
        this.triggerEvent('formatter', this.data.daysArray);
      }
    },
    isDataChange: {
      type: Boolean,
      value: false,
      observer () {
        this.triggerEvent('formatter', this.data.daysArray);
      }
    },
    daysData: {
      type: Array,
      observer (newVal) {
        if (newVal.length > 0) {
          this.setData({ daysArray: newVal });
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    Y: '', // 年
    M: '', // 月
    D: '', // 日
    W: '', // 星期
    firstDayWeek: '', // 当前月第一天星期几
    lastDayWeek: '',  // 当前月最后一天星期几
    daysCount: 0,  // 总天数
    daysArray: [], // 日历中天数数组
    title: '',
    currentDate: '0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取当前月的天数，以及当前月第一天是星期几，最后一天是星期几
    getCurrentDaysAndWeekStart () {
      let dateString = this.properties.defaultDate;
      let today = new Date();
      if (dateString) {
        today = new Date(dateString);
      }
      let Y = today.getFullYear();
      let M = today.getMonth() + 1;
      let D = today.getDate();
      let daysCount = new Date(Y, M, 0).getDate(); // 当前月最后一天日期，即当前月的天数
      let firstDayWeek = new Date(Y, M - 1, 1).getDay(); // 第一天星期几
      let lastDayWeek = new Date(Y, M, 0).getDay(); // 最后一天星期几
      this.setData({
        Y: Y,
        M: M,
        D: D,
        firstDayWeek: firstDayWeek,
        lastDayWeek: lastDayWeek,
        daysCount: daysCount,
        title: `${Y}年${M}月`
      });
    },

    // 根据总天数和第一天星期几，最后一天星期几，渲染日历天数数组
    renderDate () {
      let firstDayWeek = this.data.firstDayWeek;
      let lastDayWeek = this.data.lastDayWeek;
      let daysCount = this.data.daysCount;
      let days = []; // 当前月总天数数组
      for (let i = 1; i <= daysCount; i++) {
        days.push({
          date: i.toString(),
          topText: '',
          bottomText: ''
        });
      }
      
      // 补全前面 (因为一周七天，如果第一天是星期三，则需要把星期一和星期二数据补全)
      for (let i = 0; i < firstDayWeek; i++) {
        days.unshift({
          date: '',
          topText: '',
          bottomText: ''
        });
      }
      
      // 补全后面 (因为一周七天，如果最后一天是星期五，则需要把星期六和星期天数据补全)
      for (let i = lastDayWeek; i <= 7; i++) {
        days.push({
          date: '',
          topText: '',
          bottomText: ''
        });
      }

      this.setData({ daysArray: days });
    },

    // 点击单个日期事件
    clickItem (event) {
      let date = event.currentTarget.dataset.date;
      if (date) {
        this.setData({ currentDate: date });
        this.triggerEvent('select', `${this.data.Y}-${this.data.M}-${date}`);
      }
    }
  }
})
