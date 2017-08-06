var html = require("./template.html");
var _=require("underscore")
export default {
    template: html,
    props: {
        normalData: {
            type: Array
        },
        isMultiple:{
            type:Boolean
        }
    },
    data() {
        return {
            options: {
                shortcuts: [
                    {
                        text: '最近一周',
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近一个月',
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近三个月',
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    }
                ]
            },
            selectedData:{

            }
        }
    },
    computed: {

    },
    created() {
        var that = this;
        that.init();
    },
    methods: {
        init() {
            var that = this;
            _.each(that.normalData,function(item){
                var temp=item.ComponentConfig.Value;
                that.$set(that.selectedData,item.SortValue,temp);
            })
        },
        filterChanged(value){
            var that=this;
            console.log(that.selectedData);
        }
    }
}