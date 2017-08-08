var html = require("./template.html");
import normalFilter from 'basePath/components/newSelectFilter/normalFilter/app';
import unionFilter from 'basePath/components/newSelectFilter/unionFilter/app';
export default {
    template: html,
    components: {
        normalFilter: normalFilter,
        unionFilter: unionFilter
    },
    props: {
        filterData: {
            type:Object
        }
    },
    data() {
        return {
            isShowFilterOption: false
        }
    },
    computed: {
        singleModelList() {
            return this.filterData.singleModel ? this.filterData.singleModel.modelList : []
        },
        multiModelList() {
            return this.filterData.multiModel ? this.filterData.multiModel.modelList : []
        },
        unionModelList() {
            return this.filterData.unionModel ? this.filterData.unionModel.modelList : []
        }
    },
    created() {
        var that = this;
        that.init();
    },
    methods: {
        init() {
            
        },
        toggleFilterOption() {
            var that = this;
            that.isShowFilterOption = !that.isShowFilterOption;
        }
    }
}