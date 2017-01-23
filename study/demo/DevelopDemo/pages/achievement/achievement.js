Page({
  data:{
    currentTab:2
  },
   goSchedule : function(e){
      wx.navigateTo({
        url : "../../pages/schedule/schedule"
      });
  },
  goConsult : function(e){
      wx.navigateTo({
        url : "../../pages/index/index"
      });
  },
  goChannel : function(e){
      wx.navigateTo({
        url : "../../pages/channel/channel"
      });
  }
})