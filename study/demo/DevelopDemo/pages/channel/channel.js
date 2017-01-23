Page({
  data:{
    currentTab:3
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
  goAchievement : function(e){
      wx.navigateTo({
        url : "../../pages/achievement/achievement"
      });
  }
})