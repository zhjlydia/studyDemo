var axios = require("axios");
// 请求拦截
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截
axios.interceptors.response.use(function (response) {
    return response;

}, function (error) {
    return Promise.reject(error);
});

var selectFilterData={
  "Status": true,
  "Code": null,
  "Message": null,
  "Data": [
    {
      "sortname": "试听上课时间",
      "sortvalue": "periodStart",
      "HasDate": true,
      "father": null,
      "son": null,
      "isSingle": false,
      "userDefined": false,
      "lables": [
        {
          "lablename": "开始日期",
          "lablevalue": "2017-05-03",
          "IsDate": true,
          "IsDelete": false
        },
        {
          "lablename": "结束日期",
          "lablevalue": "2017-05-09",
          "IsDate": true,
          "IsDelete": false
        },
        {
          "lablename": "开始日期",
          "lablevalue": "2017-05-03",
          "IsDate": true,
          "IsDelete": false
        },
        {
          "lablename": "结束日期",
          "lablevalue": "2017-05-09",
          "IsDate": true,
          "IsDelete": false
        }
      ],
      "lablename": null,
      "isShowAll": false
    },
    {
      "sortname": "试听校区",
      "sortvalue": "schoolId",
      "HasDate": false,
      "father": null,
      "son": null,
      "isSingle": false,
      "userDefined": false,
      "lables": [
        {
          "lablename": "西华校区",
          "lablevalue": "251",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "校区史校史区校史",
          "lablevalue": "257",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "zbt测试",
          "lablevalue": "1475",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "测试校区测试长度",
          "lablevalue": "1173",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "校宝在线",
          "lablevalue": "1339",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "测试删除",
          "lablevalue": "1424",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "实小二校",
          "lablevalue": "255",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "北海校区",
          "lablevalue": "252",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "成大校区",
          "lablevalue": "254",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "古德校区",
          "lablevalue": "250",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "西华校区",
          "lablevalue": "256",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "成信校区",
          "lablevalue": "249",
          "IsDate": false,
          "IsDelete": false
        }
      ],
      "lablename": null,
      "isShowAll": false
    },
    {
      "sortname": "试听操作人",
      "sortvalue": "trialUserId",
      "HasDate": false,
      "father": null,
      "son": null,
      "isSingle": false,
      "userDefined": false,
      "lables": [
        {
          "lablename": "徐焱",
          "lablevalue": "2140",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "周慧娟zhj",
          "lablevalue": "4081",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "jiebo",
          "lablevalue": "1047",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "项梦圆",
          "lablevalue": "3987",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "mariage.czll",
          "lablevalue": "4846",
          "IsDate": false,
          "IsDelete": false
        }
      ],
      "lablename": null,
      "isShowAll": false
    },
    {
      "sortname": "试听课程",
      "sortvalue": "lessonId",
      "HasDate": false,
      "father": null,
      "son": null,
      "isSingle": false,
      "userDefined": false,
      "lables": [
        {
          "lablename": "课后作业专用课程1",
          "lablevalue": "12100",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "2014年春-按期收费1",
          "lablevalue": "5653",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "一对一经典课堂",
          "lablevalue": "1869",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "校宝语文课",
          "lablevalue": "5114",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "蒙古舞-按时间收费1",
          "lablevalue": "1874",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "导入测试-按课时",
          "lablevalue": "5880",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "云图按时间（班课）",
          "lablevalue": "5123",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "课程2课程2课程2课程2课程2课程2课程2课程2课程2课程2课程2课程",
          "lablevalue": "12158",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "都是送的点的1",
          "lablevalue": "10227",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "春季计算机1年级课程2",
          "lablevalue": "12118",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "课程A",
          "lablevalue": "12206",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "新课标1A-按时间收费1",
          "lablevalue": "2033",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "策士",
          "lablevalue": "10174",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "三年级数学",
          "lablevalue": "1865",
          "IsDate": false,
          "IsDelete": false
        }
      ],
      "lablename": null,
      "isShowAll": false
    },
    {
      "sortname": "任课老师",
      "sortvalue": "teacherHrDocId",
      "HasDate": false,
      "father": null,
      "son": null,
      "isSingle": false,
      "userDefined": false,
      "lables": [
        {
          "lablename": "任远",
          "lablevalue": "720",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "00000",
          "lablevalue": "3560",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "张飞",
          "lablevalue": "716",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "Catom-销售",
          "lablevalue": "3973",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "小路。",
          "lablevalue": "4797",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "小潘老师1",
          "lablevalue": "4408",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "80000",
          "lablevalue": "3090",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "3048",
          "lablevalue": "3932",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "鸣人",
          "lablevalue": "845",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "项梦圆",
          "lablevalue": "4389",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "1",
          "lablevalue": "3125",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "11111",
          "lablevalue": "3104",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "前台测试",
          "lablevalue": "3271",
          "IsDate": false,
          "IsDelete": false
        }
      ],
      "lablename": null,
      "isShowAll": false
    },
    {
      "sortname": "试听状态",
      "sortvalue": "trialStatus",
      "HasDate": false,
      "father": null,
      "son": null,
      "isSingle": false,
      "userDefined": false,
      "lables": [
        {
          "lablename": "进行中",
          "lablevalue": "0",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "已到课",
          "lablevalue": "1",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "未到课",
          "lablevalue": "2",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "已取消",
          "lablevalue": "3",
          "IsDate": false,
          "IsDelete": false
        }
      ],
      "lablename": null,
      "isShowAll": false
    },
    {
      "sortname": "是否转化",
      "sortvalue": "conversion",
      "HasDate": false,
      "father": null,
      "son": null,
      "isSingle": false,
      "userDefined": false,
      "lables": [
        {
          "lablename": "是",
          "lablevalue": "1",
          "IsDate": false,
          "IsDelete": false
        },
        {
          "lablename": "否",
          "lablevalue": "0",
          "IsDate": false,
          "IsDelete": false
        }
      ],
      "lablename": null,
      "isShowAll": false
    }
  ]
}
var filterDemo={
    //获取筛选条件
    GetAuditionFilter: function (req,callback) {
        callback(selectFilterData);
    }
}
//模拟接口
var consultBook = {
    //获取权限点
    getConsultFilterData: function () {
        return axios.post("api/ConsultBook/GetConsultFilterData");
    }
}
export default {
    filterDemoServices: filterDemo,
    consultBook:consultBook
}