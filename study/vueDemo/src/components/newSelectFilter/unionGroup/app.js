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
        return {
            selectedData:{
                sortValue:"",
                value:[],
            }
        }
    },
    computed: {

    },
    render(h) {
        var that = this;
        if (that.model.componentType === "select") {
            return h(
                "i-select", {
                    props: {
                        value: that.model.componentConfig.value,
                        placeholder: that.model.sortName,
                        multiple: that.model.componentConfig.multiple,
                        disabled: that.model.disabled,
                        filterable:that.model.filterable,
                        remote:that.model.remoteUrl.onSearch,
                        loading:that.model.loading,
                        "remote-method":that.remoteMethod
                    },
                    on:{
                        "on-change":function(value){
                            that.selectedData.sortValue=that.model.sortValue;
                            that.selectedData.value=value;
                        }
                    }
                }, [
                    _.map(that.model.componentConfig.optionList, function (item) {
                        return h('i-option', {
                            props: {
                                label: item.label,
                                value: item.value
                            }
                        })
                    })
                ]
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
            that.$set(that.model.componentConfig, "disabled", false);
            that.$set(that.model.componentConfig, "loading", false);
        },
        remoteMethod(searchValue){

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
        }
    }
}