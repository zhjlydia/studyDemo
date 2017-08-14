var html = require("./template.html");
import unionGroup from 'basePath/components/newSelectFilter/unionGroup/app';
var _ = require("underscore");

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
        },
        //外部清除某项
        clearFilter(item, index) {
            var that = this;
            var temp = {};
            _.each(that.unionFilterData, unionItem => {
                var findItem = _.findWhere(unionItem, {
                    sortValue: item.sortValue
                });
                if (findItem) {
                    temp = findItem;
                }
            })
            var tempValue = [];
            _.each(item.data, valueItem => {
                tempValue.push(valueItem.value);
            });
            if (temp) {
                temp.componentConfig.value = tempValue;
            }
        }
    }
}