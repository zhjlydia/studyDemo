var html = require("./template.html");
import normalFilter from 'basePath/components/newSelectFilter/normalFilter/app';
import unionFilter from 'basePath/components/newSelectFilter/unionFilter/app';
import emitter from "basePath/mixins/emitter.js";

export default {
    template: html,
    components: {
        normalFilter: normalFilter,
        unionFilter: unionFilter
    },
    props: {
        filterData: {
            type: Object
        }
    },
    data() {
        return {
            isShowFilterOption: false,
            filterResult: []
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
        },
        filterCount() {
            var count = 0;
            _.each(this.filterResult, item => {
                count += item.data.length;
            })
            return count;
        }
    },
    created() {
        var that = this;
        that.init();
    },
    methods: {
        init() {
            var that = this;
        },
        toggleFilterOption() {
            var that = this;
            that.isShowFilterOption = !that.isShowFilterOption;
        },
        getFilterResultData(result) {
            var that = this;
            _.each(result, item => {
                var temp = _.findWhere(that.filterResult, {
                    sortValue: item.sortValue
                });
                if (!temp) {
                    that.filterResult.push(item);
                }
            });
        },
        closeTag(item) {
            console.log(item);
        }
    }
}