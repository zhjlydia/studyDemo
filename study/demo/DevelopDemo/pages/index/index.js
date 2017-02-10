//index.js
//获取应用实例
import API from "../../data/api";
var pageSize = 15,
  statusList = [],
  templateIdList = [],
  sceneIdList = [],
  interests = [],
  salesMan = [],
  searchTags = [],
  searchCollectList = [],
  searchCollect = '',
  orderBy = 'Desc',
  orderByField = 'EditDate';
var queryType;
var allListPage = {
  totalCount: "",
  currentIndex: "",
  itemCount: ""
};

Page({
  data: {
    currentTab: 0,
    allListNormalData: {},
    showFilter: false,
    salesManLevel:false,
    scrollHeight: 890,
    // 跟进状态model
    statusModel: [{
      id: 1,
      con: "待跟进",
      status: false,
      order: 1
    }, {
      id: 2,
      con: "跟进中",
      status: false,
      order: 2
    }, {
      id: 3,
      con: "已成交",
      status: false,
      order: 4
    }, {
      id: 4,
      con: "已失效",
      status: false,
      order: 5
    }, {
      id: 5,
      con: "已到访",
      status: false,
      order: 3
    }],
    salesmanListStatues:[]
  },
  goSchedule: function (e) {
    wx.navigateTo({
      url: "../../pages/schedule/schedule"
    });
  },
  goAchievement: function (e) {
    wx.navigateTo({
      url: "../../pages/achievement/achievement"
    });
  },
  goChannel: function (e) {
    wx.navigateTo({
      url: "../../pages/channel/channel"
    });
  },
  toggleFilter: function () {
    var showFilter = !this.data.showFilter;
    this.setData({
      showFilter: showFilter
    });
    console.log(this.data.showFilter);
  },
  onReady: function () {
    queryType = '';
    this.getRegBookUserList(1, pageSize, 1, queryType, statusList, templateIdList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy);
    this.getFilterSalesMan();
  },
  //获取筛选销售员列表
  getFilterSalesMan:function(){
    API.getFilterSalesMan()
        .then((result) => {
          if (result.data.status == 1) { //获取成功
            this.setData({
              salesmanListStatues: result.data.data
            });
          }
          console.log(this.data.salesmanListStatues);
        });
  },
  getRegBookUserList: function (pageIndex, pageSize, regBookUserListType, queryType, followUpStatusList, regBookTemplateTypeList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy) {
    queryType = !queryType ? "reset" : "add";
    var data = this.data.allListNormalData;
    API.getRegBookUserList(pageIndex, pageSize, regBookUserListType, followUpStatusList, regBookTemplateTypeList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy)
      .then((result) => {
        if (result.data.status == 1) { //获取成功
          if (queryType == "reset") {
            data = [];
          }
          var normalList = data.concat(result.data.data.list);
          this.setData({
            allListNormalData: normalList
          });
          allListPage = result.data.data.page;
          console.log(this.data.allListNormalData);
        }
      });
  },
  loadMore: function () {
    var index = allListPage.currentIndex ? allListPage.currentIndex : 0,
      queryType = allListPage.currentIndex ? "add" : "";
    this.getRegBookUserList(index + 1, pageSize, 1, queryType, statusList, templateIdList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy);
  }
})