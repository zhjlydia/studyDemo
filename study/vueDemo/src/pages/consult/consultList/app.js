import selectFilter from 'basePath/components/newSelectFilter/filter/app';
import netServices from 'basePath/netservices/net';
var consultBookServices = netServices.consultBook;
var html = require("./template.html");

export default {
  components: {
    selectFilter: selectFilter
  },
  template: html,
  data() {
    return {
      searchTypeList: [{
        value: "StuName",
        text: "学生姓名",
      }, {
        value: "Telphone",
        text: "学生电话"
      }],
      searchParam: {
        SearchKey: "StuName",
        SearchValue: ""
      },
      newFilterData: {},
      isShow: true,
      tableHeader: [{
        type: 'selection',
        width: 100,
        fixed: "left",
        _group:1
      }, {
        title: '星标',
        key: 'UserCollectionId',
        fixed: "left",
        width: 100,
        _group:1,
        render: function (h, params) {
          return h('div', [
            h('Icon', {
              props: {
                type: params.row.UserCollectionId === 0 ? 'star' : 'star-filled',
                size: '20',
                color: params.row.UserCollectionId === 0 ? "#eee" : "#f5a623"
              }
            })
          ]);
        }
      }, {
        title: '姓名',
        key: 'StuName',
        fixed: "left",
        width: 100,
        _group:1
      }, {
        title: '联系电话',
        key: 'TelPhoneUi',
        width: 120,
        _group:1
      }, {
        title: '校宝家关注',
        key: 'SphHome',
        width: 120,
        _group:1
      }, {
        title: '意向度',
        key: 'Interest',
        width: 120,
        _group:1
      }, {
        title: '意向课程',
        key: 'InterestClassListUi',
        width: 120,
        _group:1
      }, {
        title: '沟通记录',
        key: 'LastCommuContent',
        width: 120,
        _group:1
      }, {
        title: '标签',
        key: 'StuinfoTagsName',
        width: 120,
        _group:1
      }, {
        title: '关键词',
        key: 'Marker',
        width: 120,
        _group:1
      }, {
        title: '跟进状态',
        key: 'FollowUpState',
        width: 120,
        _group:1
      }, {
        title: '渠道',
        key: 'ChannelName',
        width: 120,
        _group:1
      }, {
        title: '最新跟进时间',
        key: 'EditDate',
        width: 120,
        _group:1
      }, {
        title: '咨询校区',
        key: 'SchoolName',
        width: 120,
        _group:1
      }],
      listData: [],
      minCellWidth: [],
      $headerCell: [],
      fixedWidth: 0,
      groupNum: 1, //轮播分组数
      currentGroup: 1
    }
  },
  computed: {
    searchPlaceHolder() {
      return "学生姓名"
    }

  },
  created: function () {
    var that = this;
    that.init();
  },
  mounted: function () {
    this.$headerCell = this.$refs.tableBody.querySelectorAll('thead th');
    this.getMinCellWidth();
    this.resizeHandle();
  },
  methods: {
    init: function () {
      var that = this;
      that.getFilterData();
      that.fetchData();
    },
    prevGroup: function () {
      if(this.currentGroup===1){
        return;
      }
      this.currentGroup -= 1;
    },
    nextGroup: function () {
      if(this.currentGroup<this.groupNum){
              this.currentGroup += 1;
      }

    },
    getMinCellWidth: function () {
      var fixedWidth=0;
      var that=this;
      _.each(this.$headerCell, function (item,i) {
        that.minCellWidth.push(item.offsetWidth);
        if (that.tableHeader[i].fixed) {
          fixedWidth += item.offsetWidth
        }
      })
      this.fixedWidth = fixedWidth;
    },
    resizeHandle: function () {
      var that=this;
      var group = 1;
      var swipeWidth = 0;
      var parentWidth = this.$refs.containter.offsetWidth;
      _.each(this.$headerCell, function (item,i) {
        var column = that.tableHeader[i];
        console.log(parentWidth);
        if (!column.fixed) {
          column._group = group;
          swipeWidth += that.minCellWidth[i];
        }
        if (swipeWidth > parentWidth - that.fixedWidth) {
          swipeWidth = that.minCellWidth[i];
          group += 1;
          column._group = group;
        }
      })
      console.log(this.tableHeader);
      this.groupNum = group;
    },
    getFilterData: function () {
      var that = this;
      consultBookServices.getConsultFilterData().then((res) => {
        if (res.data.Status) {
          that.newFilterData = that.firstStrlowerCase(res.data.Data);
        }
      });
    },
    //首字母小写
    firstStrlowerCase: function (obj) {
      var strObj = JSON.stringify(obj)
      var strObj2 = strObj.replace(/(\")(\w*)(\"\:)/g, function ($0, $1, $2, $3) {
        return $1 + $2.substring(0, 1).toLowerCase() + $2.substring(1) + $3;
      })
      return JSON.parse(strObj2);
    },
    //获取列表数据
    fetchData: function () {
      var that = this;
      var resultList = [];
      for (var i = 0; i < 50; i++) {
        resultList.push({
          "LessonClassName": "",
          "SecondLessonClassName": "",
          "ThirdLessonClassName": "",
          "LastCommuContent": "最大款嘟嘟嘟ududududududuudu嘟嘟嘟嘟",
          "SceneTitle": null,
          "ContentTemplateData": null,
          "UserCollectionId": 0,
          "SchoolName": "西华校区",
          "ChannelName": null,
          "SceneId": 0,
          "HrdocName": null,
          "Deleted": null,
          "SalesManViewName": "未关联账号",
          "SphHome": false,
          "SalesManList": [{
            "StuInfoId": 0,
            "FollowUpPeopleId": 1,
            "FollowUpPeopleName": "采单员",
            "SalesManHrdocId": 0,
            "SalesManHrdocName": null,
            "SalesManUserName": null
          }, {
            "StuInfoId": 0,
            "FollowUpPeopleId": 2,
            "FollowUpPeopleName": "电话销售",
            "SalesManHrdocId": 0,
            "SalesManHrdocName": null,
            "SalesManUserName": null
          }, {
            "StuInfoId": 0,
            "FollowUpPeopleId": 3,
            "FollowUpPeopleName": "前台",
            "SalesManHrdocId": 0,
            "SalesManHrdocName": null,
            "SalesManUserName": null
          }, {
            "StuInfoId": 0,
            "FollowUpPeopleId": 4,
            "FollowUpPeopleName": "销售员",
            "SalesManHrdocId": 0,
            "SalesManHrdocName": null,
            "SalesManUserName": null
          }, {
            "StuInfoId": 0,
            "FollowUpPeopleId": 5,
            "FollowUpPeopleName": "副销售员",
            "SalesManHrdocId": 0,
            "SalesManHrdocName": null,
            "SalesManUserName": null
          }],
          "StuinfoTags": [],
          "IdentityCard": null,
          "Industry": "",
          "Pofession": "",
          "Dbmarketing": "",
          "StuFileNumber": null,
          "PrimarySchool": "",
          "JuniorHighSchool": "",
          "SeniorHighSchool": "",
          "Nation": "",
          "ParentName": null,
          "Grade1": "",
          "ContractNumber": null,
          "JoinedInsurance": "",
          "TaekwondoRank": "",
          "Kindergarten": "",
          "QQNumber": null,
          "GraduationTime": null,
          "GraduationSchool": null,
          "Profession": null,
          "CompanyName": null,
          "HighestEducation": "",
          "Id": 584027,
          "OrgId": 1,
          "StuName": "开会完",
          "Sex": "男",
          "BirthDate": "\/Date(-62135596800000)\/",
          "MotherTel": "12352827621",
          "FatherTel": "",
          "OtherTel": "",
          "Enrolled": true,
          "CardId": "",
          "PubSchoolName": "",
          "PubSchoolGradeClass": "",
          "HomeAdd": "",
          "Comment": "",
          "AddDate": "\/Date(1513749130000+0800)\/",
          "CreatedAt": "\/Date(1513749130000+0800)\/",
          "SalesmanEditDate": "\/Date(-62135596800000)\/",
          "Cust1": null,
          "Cust2": null,
          "Cust3": null,
          "Cust4": null,
          "Cust5": null,
          "HeadImgUrl156": "//cdn.schoolpal.cn/male-small.jpg",
          "HeadImgUrl512": "//cdn.schoolpal.cn/male-small.jpg",
          "Remain": 0.0,
          "Misc": 0.0,
          "UsedCredit": 0.0,
          "UnusedCredit": 282.0,
          "SchoolId": 251,
          "WeChatId": "",
          "FollowUpState": 3,
          "EditDate": "\/Date(1513913034000+0800)\/",
          "IsActive": false,
          "RecentInteractiveAt": null,
          "DistrictId": 0,
          "Salesman": null,
          "SalesManHrDocId": 0,
          "Salesway": null,
          "Interest": "？",
          "Marker": null,
          "AscriptionSchoolId": 251,
          "HrDocId": 0,
          "Method": null,
          "LessonClassId": 0,
          "SecondLessonClassId": 0,
          "ThirdLessonClassId": 0,
          "User": null,
          "ChannelId": 0,
          "RegisterWay": 1005,
          "Arrearage": 0.0
        });
      };
      var list = [];
      _.each(resultList,
        function (item) {
          var model = that.getUiModel(item);
          list.push(model);
        });
      that.listData = list;
    },
    getUiModel: function (bizModel) {
      var that = this;
      var model = {
        Id: 0,
        UserCollectionId: 0,
        StuName: "",
        Sex: "男",
        TelPhone: "",
        TelPhoneUi: "",
        SphHome: "", //是否关注校宝家
        Interest: {
          interestStatus: "高",
          interestClass: ""
        },
        InterestClassList: [], //意向课程
        InterestClassListUi: "",
        LastCommuContent: "", //沟通记录
        StuinfoTags: [], // 标签
        StuinfoTagsName: "", //标签名字
        Marker: "", //关键字
        FollowUpState: {
          followUpStatus: 1,
          followUpDeacription: "待跟进",
          followUpClass: ""
        },
        followUpPopShow: false, //控制跟进状态下拉项显示
        Age: "",
        ChannelId: "",
        ChannelName: "",
        Method: "",
        SalesManList: [],
        EditDate: "",
        SchoolId: 0,
        SchoolName: "",
        AddDate: "",
        AddUser: "",
        isSelected: false
      };
      model.Id = bizModel.Id;
      model.UserCollectionId = bizModel.UserCollectionId;
      model.StuName = bizModel.StuName;
      model.Sex = bizModel.Sex;
      model.TelPhone = bizModel.MotherTel ? bizModel.MotherTel : (bizModel.FatherTel ? bizModel.FatherTel : bizModel.OtherTel);
      model.TelPhoneUi = that.formatTel(model.TelPhone, !that.hasTelphoneAuthority);
      model.SphHome = bizModel.SphHome;
      model.Interest = that.filterInterestStatus(bizModel.Interest);
      if (bizModel.LessonClassName) {
        model.InterestClassList.push({
          name: bizModel.LessonClassName,
          id: bizModel.LessonClassId
        });
      }
      if (bizModel.SecondLessonClassName) {
        model.InterestClassList.push({
          name: bizModel.SecondLessonClassName,
          id: bizModel.SecondLessonClassId
        });
      }
      if (bizModel.ThirdLessonClassName) {
        model.InterestClassList.push({
          name: bizModel.ThirdLessonClassName,
          id: bizModel.ThirdLessonClassId
        });
      }
      model.InterestClassListUi = _.map(model.InterestClassList, function (item) {
        return item.name
      }).join("/");
      model.LastCommuContent = bizModel.LastCommuContent;
      model.StuinfoTags = bizModel.StuinfoTags;
      model.StuinfoTagsName = _.map(model.StuinfoTags, function (item) {
        return item.Name
      }).join("/");
      model.Marker = bizModel.Marker;
      model.followUpPopShow = false;
      model.FollowUpState = that.filterFollowStatus(bizModel.FollowUpState);
      model.Age = bizModel.BirthDate === "\/Date(-62135596800000)\/" ? "未知" : moment().diff(moment(bizModel.BirthDate), "years") + "岁";
      model.ChannelId = bizModel.ChannelId;
      model.ChannelName = bizModel.ChannelName;
      model.Method = bizModel.Method;
      model.EditDate = bizModel.EditDate;
      model.SchoolId = bizModel.AscriptionSchoolId;
      model.SchoolName = bizModel.SchoolName;
      model.AddDate = bizModel.AddDate;
      model.AddUser = bizModel.User;
      model.isSelected = false;
      _.each(that.extendAttribute, function (item) {
        model[item.Column] = bizModel[item.Column];
      })
      var isMyConsult = false; //是否是我的咨询
      _.each(bizModel.SalesManList, function (item) {
        model.SalesManList.push({
          FollowUpPeopleId: item.FollowUpPeopleId,
          FollowUpPeopleName: item.FollowUpPeopleName,
          SalesManViewName: item.SalesManHrdocId > 0 ? item.SalesManHrdocName + (item.SalesManUserName ? "(" + item.SalesManUserName + ")" : "") : "",
          SalesManHrdocId: item.SalesManHrdocId,
          SalesManHrdocName: item.SalesManHrdocName,
          SalesManUserName: item.SalesManUserName
        })

        isMyConsult = true;

      });
      model.hasEditFollowAuthority = that.hasEditAllFollowAuthority || (that.hasEditMyFollowAuthority && isMyConsult); //是否有编辑该条跟进信息的权限
      _.sortBy(model.SalesManList, "FollowUpPeopleId");
      return model;
    },
    //跟进状态通用方法
    filterFollowStatus: function (followUpStatus) {
      var followUp = {
        followUpStatus: followUpStatus,
        followUpDeacription: "",
        followUpClass: ""
      }
      switch (followUpStatus) {
        case 1:
          followUp.followUpClass = "followUpState-color1";
          followUp.followUpDeacription = "待跟进";
          break;
        case 2:
          followUp.followUpClass = "followUpState-color2";
          followUp.followUpDeacription = "跟进中";
          break;
        case 3:
          followUp.followUpClass = "followUpState-color3";
          followUp.followUpDeacription = "已成交";
          break;
        case 4:
          followUp.followUpClass = "followUpState-color4";
          followUp.followUpDeacription = "已失效";
          break;
        case 5:
          followUp.followUpClass = "followUpState-color5";
          followUp.followUpDeacription = "已到访";
          break;
        case 6:
          followUp.followUpClass = "followUpState-color6";
          followUp.followUpDeacription = "已邀约";
          break;
        case 7:
          followUp.followUpClass = "followUpState-color7";
          followUp.followUpDeacription = "已试听";
          break;
      }
      return followUp;
    },
    //意向度通用方法
    filterInterestStatus: function (interestStatus) {
      var interest = {
        interestStatus: interestStatus,
        interestClass: ""
      }
      switch (interestStatus) {
        case "高":
          interest.interestClass = "intention-states4";
          break;
        case "中":
          interest.interestClass = "intention-states3";
          break;
        case "低":
          interest.interestClass = "intention-states2";
          break;
        default:
          interest.interestClass = "intention-states1";
          break;
      }
      return interest;
    },
    //*电话号码
    formatTel: function (tel, isHide) {
      if (!tel) {
        return "";
      }
      tel = tel.replace(/-/g, "");
      if (tel.length === 11) {
        if (isHide) {
          return tel.replace(/([0-9]{3})[0-9]{4}([0-9]{4})/, "$1****$2");
        } else {
          return tel.replace(/(^\d{3}|\d{4}\B)/g, "$1-")
        }
      }
      return tel;
    }
  }
}