var html = require("./template.html");
import normalFilter from 'basePath/components/newSelectFilter/normalFilter/app';
export default {
    template: html,
    components:{
        normalFilter:normalFilter
    },
    props: {
        filterData: {}
    },
    data() {
        return {
            isShowFilterOption:false
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
            console.log(that.filterData);
        },
        toggleFilterOption(){
            var that=this;
            that.isShowFilterOption=!that.isShowFilterOption;
        }
    }
}