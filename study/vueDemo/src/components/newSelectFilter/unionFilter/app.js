var html = require("./template.html");
import unionGroup from 'basePath/components/newSelectFilter/unionGroup/app';
var _ = require("underscore");
import emitter from "basePath/mixins/emitter.js";

export default {
    template: html,
    components: {
        unionGroup: unionGroup
    },
    props: {
        unionFilterData: {
            type: Array
        }
    },
    data() {
        return {
            selectedData: []
        }
    },
    computed: {
        data() {
            return this.unionFilterData;
        }

    },
    created() {
        var that = this;
        that.init();
    },
    methods: {
        init() {
            var that = this;
            that.bindEvent();
        },
        getfilterResult(result) {
            var that = this;
            var temp = _.findWhere(that.selectedData, {
                sortValue: result.sortValue
            });
            if (!temp) {
                that.selectedData.push(result);
            }
            that.$emit("get-union-result", that.selectedData)
        },
        bindEvent() {
            var that = this;
            // emitter.$on("union-change", that.getfilterResult);
        }
    }
}