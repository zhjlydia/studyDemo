<template>
  <div id="app">
    <div class="box0 ">
      <h1>城市</h1>
        <span v-for="city in citys">
        {{city}}
      </span>
      <h1>食物</h1>
        <span v-for="city in foods">
        {{city}}
      </span>
      <h1>国家</h1>
        <span v-for="city in state">
        {{city}}
      </span>
    </div>
    <!-- 公用组件vuex用法 -->
    <Box :items="citys" name="citys"></Box>
    <Box :items="foods" name="foods"></Box>
    <!-- 公用组件常规用法 -->
    <Box :items="state" name="state" v-on:addItem="addState"></Box>
  </div>
</template>

<script>
import Box from './components/Box'

export default {
  components:{
    Box
  },
  data(){
    return {
      state:["中国","美国"]
    }
  },
  computed: {
    citys:function(){
      return this.$store.state.citys
    },
    foods:function(){
      return this.$store.state.foods
    }
  },
  methods: {
    addCity :function(){
      return this.$store.action.addCity
    },
    addState:function(item){
      this.state.push(item)
    }
  }
}
</script>
<style>

.box0{
  background:#41B883;
}
.span{
  width:
}
</style>