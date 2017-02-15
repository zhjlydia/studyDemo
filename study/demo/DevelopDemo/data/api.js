const HOST = "http://localhost";
let Util = getApp().Util;

export default class  API {
    /**
     * 获得咨询列表
     */
    static getRegBookUserList(pageIndex, pageSize, regBookUserListType, followUpStatusList, regBookTemplateTypeList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy){
          var filter = {
                RegBookUserListType: regBookUserListType,
                FollowUpStatusList: followUpStatusList,
                RegBookTemplateTypeList: regBookTemplateTypeList,
                SceneIdList: sceneIdList,
                Interests: interests,
                SalesMan: salesMan,
                SearchTags: searchTags,
                SearchCollect: searchCollect,
                OrderBy: orderBy,
                OrderByField: orderByField
            }
          return Util.net.postJson(`${HOST}/RegistrationBook/GetRegBookUserList`,{page: {
                    pageIndex: pageIndex,
                    pageSize: pageSize
                },
                Filter: filter
            });    
    }
    /**
     * 获得筛选销售员列表
     */
    static getFilterSalesMan(){
          return Util.net.postJson(`${HOST}/RegistrationBook/GetFilterSalesMan`);    
    }
    /**
     * 获得筛选场景列表
     */
    static getRegistrationBookSceneList(pageIndex, pageSize){
          return Util.net.postJson(`${HOST}/RegistrationBook/GetRegistrationBookSceneList`,{page: {pageIndex: pageIndex,pageSize: pageSize}});    
    }
     /**
     * 获得业绩数据
     */
    static getMyAchivement(param){
          var param='day';
          return Util.net.postJson(`${HOST}/RegistrationBook/GetMyAchivement`,{param : param });    
    }
} 