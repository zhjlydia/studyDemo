//index.js
//获取应用实例
Page({
  data:{
    currentTab:0
  },
   goSchedule : function(e){
      wx.navigateTo({
        url : "../../pages/schedule/schedule"
      });
  },
  goAchievement : function(e){
      wx.navigateTo({
        url : "../../pages/achievement/achievement"
      });
  },
  goChannel : function(e){
      wx.navigateTo({
        url : "../../pages/channel/channel"
      });
  }
})