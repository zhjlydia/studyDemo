var html = require("./template.html");
import unionGroup from 'basePath/components/newSelectFilter/unionGroup/app';
var _ = require("underscore")
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
            selectedData: {

            }
        }
    },
    computed: {
        data(){
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
            _.each(that.normalData, function (item) {
                var temp = item.componentConfig.value;
                that.$set(that.selectedData, item.sortValue, temp);
            })
        },
        filterChanged(value) {
            var that = this;
            console.log(that.selectedData);
        }
    }
}