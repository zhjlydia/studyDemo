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
            multiFilterResult: [],
            singleFilterResult: [],
            unionFilterResult: []
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
        filterResult() {
            return _.union(this.singleFilterResult, this.unionFilterResult, this.multiFilterResult);
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
        getUnionFilterData(value) {
            var that = this;
            that.unionFilterResult = value;
            console.log(that.filterResult);
        },
        getSingleFilterData(value) {
            var that = this;
            that.singleFilterResult = value;
            console.log(that.filterResult);
        },
        getMultiFilterData(value) {
            var that = this;
            that.multiFilterResult = value;
            console.log(that.filterResult);
        }
    }
}