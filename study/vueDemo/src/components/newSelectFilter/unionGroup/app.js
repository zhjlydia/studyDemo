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
                sortName: "",
                data: []
            },
            parentValue: [],
            hasFetchData: false
        }
    },
    computed: {
        isDisabled() {
            if (this.model.parentSortValue && !this.parentValue.length) {
                return true;
            }
            return false;
        }
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
                        disabled: that.isDisabled,
                        filterable: that.model.componentConfig.filterable && !that.isDisabled,
                        remote: that.model.remoteUrl && that.model.remoteUrl.onSearch,
                        loading: that.model.componentConfig.loading,
                        "remote-method": that.remoteMethod,
                        "label-in-value": true
                    },
                    on: {
                        "on-change": seletedItem => {
                            that.selectedData.sortValue = that.model.sortValue;
                            that.selectedData.sortName = that.model.sortName;
                            that.selectedData.type = "union";
                            that.selectedData.data = seletedItem;
                            if (that.model.sonSortValue) {
                                emitter.$emit(that.model.sortValue + "union-change", {
                                    value: seletedItem,
                                    changeUrl: that.model.remoteUrl.onChange
                                })
                            }
                            that.$emit("union-data-change", that.selectedData)
                        }
                    }
                }, [
                    _.map(that.model.componentConfig.optionList, item => {
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
                        "ParentValue": that.parentValue,
                        "Filter": searchValue
                    }
                }
            };
            that.model.componentConfig.loading = true;
            that.model.componentConfig.optionList = [];
            axios.post("/api" + that.model.remoteUrl.onSearch, {
                reqObj
            }).then(res => {
                if (res.data.Status) {
                    var tempData = res.data.Data.ComponentConfig.OptionList;
                    if (tempData.length > 0) {
                        _.each(tempData, item => {
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
                    setTimeout(() => {
                        that.model.componentConfig.loading = false;
                    }, 500)

                }
            })
        },
        getUnionData(item) {
            var that = this;
            that.parentValue = [];
            if (item.value.length) {
                _.each(item.value, valueItem => {
                    that.parentValue.push(valueItem.value);
                })
            }
            var reqObj = {
                "req": {
                    "Filter": {
                        "ParentValue": that.parentValue,
                        "Filter": ""
                    }
                }
            };
            that.model.componentConfig.loading = true;
            that.model.componentConfig.optionList = [];
            axios.post("/api" + item.changeUrl, {
                reqObj
            }).then(res => {
                if (res.data.Status) {
                    that.model.componentConfig.loading = false;
                    that.hasFetchData = true;
                    var tempData = res.data.Data.ComponentConfig.OptionList;
                    if (tempData.length > 0) {
                        _.each(tempData, item => {
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
        },
        getfilterData(data) {
            var that = this;
            that.$emit("union-change", data)
        }
    }
}