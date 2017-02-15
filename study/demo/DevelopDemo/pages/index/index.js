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
var sceneListPage = {
  totalCount: "",
  currentIndex: "",
  itemCount: ""
};
var scenePageSize = 10;
Page({
  data: {
    currentTab: 0,
    allListNormalData: {},
    showFilter: false,
    salesManLevel: false,
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
    salesmanListStatues: [],
    //有无星标
    searchCollectModel: [{
      id: 1,
      con: "有",
      status: false,
      order: 2
    }, {
      id: 2,
      con: "无",
      status: false,
      order: 1
    }],
    //意向度
    interestsModel: [{
      id: 1,
      addclass: "regis_icon1",
      status: false
    }, {
      id: 2,
      addclass: "regis_icon2",
      status: false
    }, {
      id: 3,
      addclass: "regis_icon3",
      status: false
    }, {
      id: 4,
      addclass: "regis_icon4",
      status: false
    }],
    //标签model
    searchTagsModel: [{
      id: 1,
      con: "本地",
      status: false,
      order: 1
    }, {
      id: 2,
      con: "外地",
      status: false,
      order: 2
    }, {
      id: 3,
      con: "已报名",
      status: false,
      order: 4
    }, {
      id: 4,
      con: "未报名",
      status: false,
      order: 3
    }],
    filterSelectList: []
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
    this.getRegistrationBookSceneList(1, scenePageSize);
  },
  regStateTabSelect:function(e){
    console.log(e);
  },
  filterSalesManName: function (obj) {
    var HrdocName = obj.HrdocName,
      SalesManViewName = obj.SalesManViewName;
    if (HrdocName && HrdocName.length > 6) {
      HrdocName = HrdocName.slice(0, 6) + "...";
    }
    if (SalesManViewName && SalesManViewName.length > 6) {
      SalesManViewName = SalesManViewName.slice(0, 6) + "...";
    }
    if (SalesManViewName) {
      return HrdocName + "（" + SalesManViewName + "）";
    } else {
      return HrdocName;
    }
  },
  //获取筛选销售员列表
  getFilterSalesMan: function () {
    var salesmanListStatues = [];
    API.getFilterSalesMan()
      .then((result) => {
        if (result.data.status == 1) { //获取成功
          //加入无销售员筛选
          var salesList = result.data.data.slice(0);
          salesList.unshift({
            SalesManHrDocId: 0,
            HrdocName: "无"
          });
          for (var i = 0; i < salesList.length; i++) {
            var item = salesList[i];
            var obj = {
              id: item.SalesManHrDocId,
              viewName: this.filterSalesManName(item),
              salesMan: item.Salesman ? item.Salesman : "",
              status: false //销售员添加选中状态属性
            };
            salesmanListStatues.push(obj);
          }
          this.setData({
            salesmanListStatues: salesmanListStatues
          });
        }
      });
  },
  getRegistrationBookSceneList: function (pageIndex, pageSize) {
    var data = this.data.filterSelectList;
    API.getRegistrationBookSceneList(pageIndex, pageSize)
      .then((result) => {
        if (result.data.status == 1) { //获取成功
          var list = result.data.data.list.splice(0);
          for (var i = 0; i < list.length; i++) {
            list[i].Id = list[i].Id;
            list[i].RegBookTemplateType = list[i].RegBookTemplateType;
            list[i].status = false;
            if (list[i].ShareConfig && JSON.parse(list[i].ShareConfig).title) {
              list[i].Title = JSON.parse(list[i].ShareConfig).title;
            } else if (list[i].TemplateShareConfig && JSON.parse(list[i].TemplateShareConfig).title) {
              list[i].Title = JSON.parse(list[i].TemplateShareConfig).title;
            } else {
              list[i].Title = defaultSceneTitle;
            }
          }
          var sceneList=data.concat(list);
          this.setData({
            filterSelectList: sceneList
          });
          sceneListPage=result.data.data.page;
        }
      });
  },
  loadMoreScene:function(){
    this.getRegistrationBookSceneList(sceneListPage.currentIndex + 1, scenePageSize);
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