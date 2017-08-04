<template>
    <div class="new-filter-wrap clearfix">
        <div class="floatL">
            <slot name="customLeft"></slot>
        </div>
        <!--<div class="floatR">
            <i-select v-model="searchParam.SearchKey" style="width:170px">
                <i-option v-for="item in searchTypeList" :value="item.value" :key="item">{{ item.label }}</i-option>
            </i-select>
            <i-input v-model="searchParam.SearchValue" icon="search" @on-click="fetchData()" @on-enter="fetchData()" :placeholder="searchPlaceHolder" style="width: 200px"></i-input>
        </div>-->
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        items: {
            type: Array
        },
        config: {
            isHaveSearchButton: true,
            diffDay: ""
        }
    },
    data() {
        return {
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
        }
    }
}
</script>