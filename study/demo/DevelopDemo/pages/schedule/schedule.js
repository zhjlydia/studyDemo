var util = require('../../utils/util.js')
Page({
  data: {
    currentTab: 1,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    current: 1,

    weekday: ['日', '一', '二', '三', '四', '五', '六'],
    selectDay: new Date(),
    // 相当于使用过滤器的表达式
    userSelectDay: '',
    dateInfo: '',
    calendarPrev: [],
    calendarData: [],
    calendarNext: []
  },
  goAchievement: function (e) {
    wx.navigateTo({
      url: "../../pages/achievement/achievement"
    });
  },
  goConsult: function (e) {
    wx.navigateTo({
      url: "../../pages/index/index"
    });
  },
  goChannel: function (e) {
    wx.navigateTo({
      url: "../../pages/channel/channel"
    });
  },
  //更新视图数据
  updateData: function (data) {
    this.setData({
      selectDay: data,
      userSelectDay: util.formatTime(data),
      dateInfo: util.dateInfo(data),
    });
  },
  render: function (date) {
    var tempCalendarPrev = [];
    var tempCalendarData = [];
    var tempCalendarNext = [];

    var day = date.getDate();
    var weekd = date.getDay();
    if (weekd == 0) {
      weekd = 7;
    }
    for (var i = -weekd - 6; i <= -weekd; i++) {
      var d = new Date(date);
      d.setDate(day + i);
      var calenDate = {
        hasRemind: false,
        date: d,
        weekday: d.getDay(),
        day: d.getDate()
      };
      tempCalendarPrev.push(calenDate);
    }
    for (var i = -weekd + 1; i <= 7 - weekd; i++) {
      var d = new Date(date);
      d.setDate(day + i);
      var calenDate = {
        hasRemind: false,
        date: d,
        weekday: d.getDay(),
        day: d.getDate()
      };
      tempCalendarData.push(calenDate);
    }
    for (var i = -weekd + 8; i <= 14 - weekd; i++) {
      var d = new Date(date);
      d.setDate(day + i);
      var calenDate = {
        hasRemind: false,
        date: d,
        weekday: d.getDay(),
        day: d.getDate()
      };
      tempCalendarNext.push(calenDate);
    }
    this.setData({
      calendarPrev: tempCalendarPrev,
      calendarData: tempCalendarData,
      calendarNext: tempCalendarNext
    });
  },
  changeWeek: function (event) {
    var type=event.target.dataset.ui;
    var dish = (type == 'next') ? 7 : -7;
    this.data.selectDay.setDate(this.data.selectDay.getDate() + dish);
    this.updateData(this.data.selectDay);
    this.render(this.data.selectDay);
  },
  chooseDay: function (event) {
    var data = new Date(event.target.dataset.ui.date);
    if (data.getDate() != this.data.selectDay.getDate()) {
      this.updateData(data);
    }
  },
  goToday: function () {
    var today = new Date();
    this.updateData(today);
    this.render(today);
  },
  onLoad: function (query) {
    this.query = query;
  },
  onReady: function () {
    //初始化日期
    this.goToday();
  }

})