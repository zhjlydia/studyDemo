<template>
    <div>
       <h1>姓名:{{name}}</h1>
       <h2>{{age}}</h2>
       <button @click="golist">router查看</button>
       <a v-link="{name:'list'}">v-link查看列表</a>>
       <a v-link="{ name: 'hello' }">嵌套的路由</a>
       <a v-link="{name:'index'}">回到主页</a>
       <div>{{fullName}}</div>
    </div>
    <!--<hello></hello>-->
    <router-view></router-view>
</template>
<script>
    import hello from "./hello.vue";//组件嵌套
    export default {
         data () {
            return {
                name:"zhj",
                age:"21",
                firstName: 'Foo',
                lastName: 'Bar'
            }
        },
        methods:{
            golist:function(){
               this.$route.router.go({name:"list"})
            }

        },
        components:{
            hello
        },
        computed: {
           fullName: function () {
           return this.firstName + ' ' + this.lastName
    }
    }
    }
</script>
<style lang="sass">
    $qwe:#098;
    body{
        background-color: $qwe;
        h1{
            background-color: #eee;
            color: red;
            transform: translate(10%, 10%);/*测试自动添加前缀*/
        }
        h2{
            background-color: #fff;
        }
    }
</style>