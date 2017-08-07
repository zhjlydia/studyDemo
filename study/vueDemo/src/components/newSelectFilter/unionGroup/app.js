var html = require("./template.html");
var _ = require("underscore")

const unionComponent = {
    props: {
        model: {
            type: Object,
            require: true
        }
    },
    data() {
        return {}
    },
    computed: {

    },
    render(h) {
        var that = this;
        if (that.model.ComponentType === "select") {
            return h(
                "i-select", 
                {

                }
            );
        }
    },
    created() {
        var that = this;
        that.init();
    },
    methods: {
        init() {
            var that = this;
            console.log(that.model);
        }
    }

}
export default {
    template: html,
    props: {
        unionSelectData: {
            type: Array
        }
    },
    data() {
        return {
            selectedData: {},
            currentView: unionComponent
        }
    },
    computed: {
        data() {
            return this.unionSelectData;
        }

    },
    created() {
        var that = this;
        that.init();
    },
    methods: {
        init() {
            var that = this;
            _.each(that.data, function (item) {
                var temp = item.ComponentConfig.Value;
                that.$set(that.selectedData, item.SortValue, temp);
                that.$set(item.ComponentConfig, "disabled", false);
            })
        }
    }
}