var html = require("./template.html");
var _ = require("underscore");
var axios = require("axios");

const normalComponent = {
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
            }
        }
    },
    computed: {

    },
    render(h) {
        var that = this;
        if (that.model.componentType === "daterange") {
            return h(
                "Date-picker", {
                    props: {
                        type: that.model.componentType,
                        format: "yyyy-MM-dd",
                        value: that.model.componentConfig.value,
                        placement: "bottom-end",
                        placeholder: that.model.sortName,
                        options: that.setDateOption(that.model.componentConfig.optionList)
                    },
                    on: {
                        "on-change": function (seletedItem) {
                            that.selectedData.sortValue = that.model.sortValue;
                            that.selectedData.sortName = that.model.sortName;
                            that.selectedData.data = seletedItem;
                            that.$emit("data-change", that.selectedData);
                        }
                    }
                }
            )
        } else if (that.model.componentType === "select") {
            return h(
                "i-select", {
                    props: {
                        value: that.model.componentConfig.value,
                        placeholder: that.model.sortName,
                        multiple: that.model.componentConfig.multiple,
                        disabled: that.model.componentConfig.disabled,
                        filterable: that.model.componentConfig.filterable,
                        remote: that.model.remoteUrl && that.model.remoteUrl.onSearch,
                        loading: that.model.componentConfig.loading,
                        "remote-method": that.remoteMethod,
                        "label-in-value": true
                    },
                    on: {
                        "on-change": function (seletedItem) {
                            that.selectedData.sortValue = that.model.sortValue;
                            that.selectedData.sortName = that.model.sortName;
                            that.selectedData.data = seletedItem;
                            that.$emit("data-change", that.selectedData);
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
            that.$set(that.model.componentConfig, "disabled", false);
            that.$set(that.model.componentConfig, "loading", false);
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
                    that.model.componentConfig.loading = false;
                }
            })
        },
        setDateOption(dateList) {
            var options = {
                shortcuts: []
            }
            if (dateList && dateList.length) {
                _.each(dateList, function (item) {
                    options.shortcuts.push({
                        text: item.label,
                        value() {
                            return item.value.split(",");
                        }
                    });
                })
            }
            return options;
        }
    }

}
export default {
    template: html,
    props: {
        normalData: {
            type: Array
        },
        isMultiple: {
            type: Boolean
        }
    },
    data() {
        return {
            currentView: normalComponent,
            normalFilterData: []
        }
    },
    computed: {

    },
    created() {
        var that = this;
        that.init();
    },
    methods: {
        init() {
            var that = this;
        },
        getNormalFilterData(result) {
            var that = this;
            console.log("hhd");
            var temp = _.findWhere(that.normalFilterData, {
                sortValue: result.sortValue
            });
            if (!temp) {
                that.normalFilterData.push(result);
            }
            that.$emit("get-normal-result", that.normalFilterData);
        }
    }
}