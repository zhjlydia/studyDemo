var html = require("./template.html");
var _ = require("underscore");
var axios = require("axios");
var moment = require("moment");

const normalComponent = {
    props: {
        model: {
            type: Object,
            require: true
        },
        isMultiple: {
            type: Boolean
        }
    },
    data() {
        return {
            selectedData: {
                type: "",
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
                        "on-change": seletedItem => {
                            that.selectedData.sortValue = that.model.sortValue;
                            that.selectedData.sortName = that.model.sortName;
                            that.selectedData.type = "single";
                            that.selectedData.data = [];
                            that.selectedData.data.push({
                                value: seletedItem,
                                label: "开始时间：" + moment(seletedItem[0]).format("YYYY年MM月DD日") + " - 结束时间：" + moment(seletedItem[1]).format("YYYY年MM月DD日")
                            })
                            that.$emit("data-change", that.selectedData);
                        }
                    }
                }
            )
        } else if (that.model.componentType === "select") {
            return h(
                "i-select", {
                    props: {
                        value: that.isMultiple ? that.model.componentConfig.value : that.model.componentConfig.value[0],
                        placeholder: that.model.sortName,
                        multiple: that.isMultiple,
                        disabled: that.model.componentConfig.disabled,
                        filterable: that.model.componentConfig.filterable,
                        remote: that.model.remoteUrl && that.model.remoteUrl.onSearch,
                        loading: that.model.componentConfig.loading,
                        "remote-method": that.remoteMethod,
                        "label-in-value": true
                    },
                    on: {
                        "on-change": seletedItem => {
                            that.selectedData.sortValue = that.model.sortValue;
                            that.selectedData.sortName = that.model.sortName;
                            that.selectedData.type = that.isMultiple ? "multi" : "single";
                            var tempData = [];
                            if (!that.isMultiple) {
                                tempData.push(seletedItem);
                            } else {
                                tempData = seletedItem;
                            }
                            that.selectedData.data = tempData;
                            that.$emit("data-change", that.selectedData);
                            console.log(that.selectedData);
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
            that.$set(that.model.componentConfig, "disabled", false);
            that.$set(that.model.componentConfig, "loading", false);
            that.initData();
        },
        initData() {
            var that = this;
            if (that.model.componentConfig.value && that.model.componentConfig.value.length) {
                that.selectedData.sortValue = that.model.sortValue;
                that.selectedData.sortName = that.model.sortName;
                that.selectedData.type = that.isMultiple ? "multi" : "single";
                if (that.model.componentType === "select") {
                    _.each(that.model.componentConfig.value, item => {
                        var temp = _.findWhere(that.model.componentConfig.optionList, {
                            value: item
                        });
                        if (temp) {
                            that.selectedData.data.push(temp);
                        }
                    })
                } else if (that.model.componentType === "daterange") {
                    that.selectedData.data.push({
                        value: that.model.componentConfig.value,
                        label: "开始时间：" + moment(that.model.componentConfig.value[0]).format("YYYY年MM月DD日") + " - 结束时间：" + moment(that.model.componentConfig.value[1]).format("YYYY年MM月DD日")
                    })
                }
                that.$emit("data-change", that.selectedData);
            }
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
            }).then(res => {
                if (res.data.Status) {
                    that.model.componentConfig.optionList = [];
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
                    that.model.componentConfig.loading = false;
                }
            })
        },
        setDateOption(dateList) {
            var options = {
                shortcuts: []
            }
            if (dateList && dateList.length) {
                _.each(dateList, item => {
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
            var temp = _.findWhere(that.normalFilterData, {
                sortValue: result.sortValue
            });
            if (!temp) {
                that.normalFilterData.push(result);
            }
            that.$emit("get-normal-result", that.normalFilterData);
        },
        //外部清除某项
        clearFilter(item, index) {
            var that = this;
            var temp = _.findWhere(that.normalData, {
                sortValue: item.sortValue
            });
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