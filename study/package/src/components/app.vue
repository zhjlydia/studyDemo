<script>

    var todos = [
                    {text:"VUE"},
                    {text:"Angular"},
                    {text:"React"}
                ];

    export default {
        el:"#app",
         data () {
            return {
                name:"cxd",
                age:"21",
                message:"",
                todos:todos,
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
        <h1>姓名：{{name}}</h1>
        <h2>{{age}}</h2>
        <h2>{{message}}</h2>
        <input v-model="message">
        <ul v-if="ifShow">
            <li v-for="todo in todos">
                {{todo.text}}
            </li>
        </ul>
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
        h1:hover{
            height:100px;
        }
        h2{
            background-color: #fff;
        }
    }
</style>