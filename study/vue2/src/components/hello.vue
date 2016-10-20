<script>
    export default {
         data () {
            return {
                message:"hello页面",
                ifShow:false
            }
        },
        methods:{
            reverseMessage:function(){
                this.ifShow = !this.ifShow;
                 this.message =  this.message.split('').reverse().join('')
            }

        }

    }
</script>
<template>
    <div>
        <h2>{{message}}</h2>
        <input v-model="message">
        <button @click="reverseMessage">反转</button>
    </div>
</template>
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