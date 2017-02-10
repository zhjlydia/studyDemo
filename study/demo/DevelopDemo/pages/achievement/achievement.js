import API from "../../data/api";
Page({
  data: {
    currentTab: 2,
    statisData: {},
    consultData: {},
    cacheData: {},
    topCurrentTab: 0,
    bottomCurrentTab: 0
  },
  goSchedule: function (e) {
    wx.navigateTo({
      url: "../../pages/schedule/schedule"
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
  onLoad: function (query) {
    this.query = query;
  },
  onReady: function () {
    //初始化日期
    this.getMyAchivement();
  },
  //决定更新顶部统计数据还是底部根据数据
  changeDataByPosition: function (data, position) {
    if (!position || position == "top") {
      this.setData({
        statisData: data
      });
    }
    if (!position || position == "bottom") {
      this.setData({
        consultData: data.consult
      });
      this.countPercent();
    }
  },
  //计算成交率和流失率
  countPercent: function () {
    var data = this.data.consultData;
    if (data.all != 0 && !data.all) {
      return;
    }
    // 成交率
    if (data.DealDone) {
      data.dealpercent = Math.round(data.DealDone * 100 / data.all);
    } else {
      data.dealpercent = 0;
    }
    //流失率
    if (data.Expired) {
      data.losingpercent = Math.round(data.Expired * 100 / data.all);
    } else {
      data.losingpercent = 0;
    }
    this.setData({
      consultData: data
    });
  },
  getMyAchivement: function (param, position) {
    var data = this.data.cacheData;
    if (data[param]) {
      this.changeDataByPosition(data[param], position);
    }
    else {
      API.getMyAchivement(param)
        .then((result) => {
          if (result.data.status == 1) { //获取成功
            this.changeDataByPosition(result.data.data, position);
            data[param] = result.data.data;
            this.setData({
              cacheData: data
            });
          }
        });
    }
  },
  changeTab: function (e) {
    var current = e.target.dataset.current;
    var position = e.target.dataset.type;
    var param;
    if (position == "top") {
      this.setData({
        topCurrentTab: current
      });
    }
    else {
      this.setData({
        bottomCurrentTab: current
      });
    }
    switch (current) {
      case "0":
        param = "day";
        break;
      case "1":
        param = "week";
        break;
      case "2":
        param = "month";
        break;
    }
    this.getMyAchivement(param, position);
  }

})