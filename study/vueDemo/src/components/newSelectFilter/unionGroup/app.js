var html = require("./template.html");
var _ = require("underscore");
var axios = require("axios");
import emitter from "basePath/mixins/emitter.js";
const unionComponent = {
    props: {
        model: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            selectedData: {
                sortValue: "",
                value: []
            },
            parentValue: ""
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
                        disabled: that.model.componentConfig.disabled,
                        filterable: that.model.componentConfig.filterable,
                        remote: that.model.remoteUrl && that.model.remoteUrl.onSearch,
                        loading: that.model.loading,
                        "remote-method": that.remoteMethod
                    },
                    on: {
                        "on-change": function (value) {
                            that.selectedData.sortValue = that.model.sortValue;
                            that.selectedData.value = value;
                            if (that.model.sonSortValue) {
                                emitter.$emit(that.model.sortValue + "union-change", {
                                    value: value,
                                    changeUrl: that.model.remoteUrl.onChange
                                })
                            }
                        }
                    }
                }, [
                    _.map(that.model.componentConfig.optionList, function (item) {
                        return h('i-option', {
                            props: {
                                label: item.label,
                                value: item.value,
                                disabled: item.disabled
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
            that.bindEvent();
            that.$set(that.model.componentConfig, "disabled", false);
            that.$set(that.model.componentConfig, "loading", false);
        },
        bindEvent() {
            var that = this;
            emitter.$on(that.model.parentSortValue + "union-change", that.getUnionData);
        },
        remoteMethod(searchValue) {
            var that = this;
            var reqObj = {
                "req": {
                    "Filter": {
                        "ParentValue": "",
                        "Filter": searchValue
                    }
                }
            };
            that.model.componentConfig.loading = true;
            axios.post("/api" + that.model.remoteUrl.onSearch, {
                reqObj
            }).then(function (res) {
                if (res.data.Status) {
                    that.model.componentConfig.loading = false;
                    that.model.componentConfig.optionList = [];
                    var tempData = res.data.Data.ComponentConfig.OptionList;
                    if (tempData.length > 0) {
                        _.each(tempData, function (item) {
                            that.model.componentConfig.optionList.push({
                                value: item.Value,
                                label: item.Label,
                                disabled: false
                            })
                        })
                    } else {
                        that.model.componentConfig.optionList.push({
                            value: "empty",
                            label: "暂无数据",
                            disabled: true
                        })
                    }
                }
            })
        },
        getUnionData(item) {
            var that = this;
            that.parentValue = item.value;
            var reqObj = {
                "req": {
                    "Filter": {
                        "ParentValue": that.parentValue,
                        "Filter": ""
                    }
                }
            };
            that.model.componentConfig.loading = true;
            axios.post("/api" + item.changeUrl, {
                reqObj
            }).then(function (res) {
                if (res.data.Status) {
                    that.model.componentConfig.optionList = [];
                     that.model.componentConfig.loading = false;
                    var tempData = res.data.Data.ComponentConfig.OptionList;
                    if (tempData.length > 0) {
                        _.each(tempData, function (item) {
                            that.model.componentConfig.optionList.push({
                                value: item.Value,
                                label: item.Label,
                                disabled: false
                            })
                        })
                    } else {
                        that.model.componentConfig.optionList.push({
                            value: "empty",
                            label: "暂无数据",
                            disabled: true
                        })
                    }
                }
            })
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