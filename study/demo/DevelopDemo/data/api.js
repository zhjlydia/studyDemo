const HOST = "http://localhost";
let Util = getApp().Util;

export default class  API {

     /**
     * 获得业绩数据
     */
    static getMyAchivement(param){
          var param='day';
          return Util.net.postJson(`${HOST}/RegistrationBook/GetMyAchivement`,{param : param });    
    }
} 