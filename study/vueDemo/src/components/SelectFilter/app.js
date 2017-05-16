import moment from 'moment'
import startEndDatePicker from './../../components/startEndDatePicker/app'
var html = require("./template.html");
export default {
  components:{
    startEndDatePicker
  },
  template:html,
  props:{
      name:{
          type:String,
      },
      items:{
          type:Array
      },
      differDays:{
          type:Number
      }
  },
  data(){
      return{
          selectItems:[],
          saveItems:[],
          isCompare:true
      }
  },
  computed:{
      sortsData:function(){
          return this.items
      }
  },
  created:function(){
  },
  methods:{
    selectThisItem(item,fatherItem){
      var that=this;
      that.$set(item,'select',!item.select);
      if(!item.select){
        var index=that.selectItems.indexOf(item);
        if(index!==-1){
          that.selectItems.splice(index,1);
        }
      }
      else{
        that.selectItems.push(item);
      }
      fatherItem.unLimit=false;
    },
    setDateItem(item){
      var that=this;
      if(that.differDays>0){
        // if(index==0){//开始时间

        // }
      }
      console.log(item);
    },
    delSelectedItem(item){
      var that=this;
      var index=that.selectItems.indexOf(item);
      if(index!==-1){
         that.selectItems.splice(index,1);
      }
      item.select=false;
    },
    clearAll(){
      var that=this;
      that.selectItems.forEach(function(value,index){
        value.select=false;
      });
      that.selectItems=[];
    },
    unLimit(item){
      var that=this;
      that.$set(item,'unLimit',!item.unLimit);
      that.sortsData.forEach(function(value,index){
        if(value.unLimit){
          value.lables.forEach(function(item,index){
            that.delSelectedItem(item);
          })
        }
      })
    },
    compare(){
      var that=this;
      that.isCompare=!that.isCompare;
    },
    toggleShowAll(item){
      var that=this;
      that.$set(item,'showAll',!item.showAll);
    },
    onSearchBtnClicked(){
      var that=this;
      var temparr=[];
      that.saveItems=[];
      var saveObj={
        type:"",
        value:""
      }
      that.sortsData.forEach(function(value,index){
        temparr=[];
        value.lables.forEach(function(item,index){
          if(item.IsDate){
            return;
          }
         else if(item.select){
            temparr.push(item.lablevalue);
          }
        });
        saveObj={
          type:value.sortvalue,
          value:temparr.join(",")
        }
        that.saveItems.push(saveObj);
      });
      console.log(that.saveItems);
    },
    changeEvent1(dateArr){
      console.log(dateArr);
    },
    changeEvent2(dateArr){
      console.log(dateArr);
    }
  }
}