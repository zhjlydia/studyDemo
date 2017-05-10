<template>
    <div class="box1">
        <input type="text" v-model="newitem">
        <span v-for="item in currentItem">
        {{item}}
        </span>
        </br>
        
        <span v-for="item in cacheItems">
        {{item}}
        </span>
         </br>

        <button @click="addtoThis">提交至上级</button>
        <button @click="addCache">提交至本级</button>
    </div>
</template>

<script>

export default {
  props:{
      name:{
          type:String,
      },
      items:{
          type:Array
      }
  },
  data(){
      return{
          newitem:"",
          cacheItems:[]
      }
  },
  computed:{
      currentItem:function(){
          return this.items
      }
  },
  created:function(){
      this.cacheItems = this.currentItem.concat();
  },
  methods:{
    addtoThis:function(){
        this.addCache();
        if(this._events.addItem){
            this.$emit("addItem",this.newitem)
        }else{
            this.$store.dispatch("addItem",{
            type:this.name,
            item:this.newitem
            })
        }
    },
    addCache:function(){
        this.cacheItems.push(this.newitem)
    }
  }
}
</script>
<style>
.box1{
 padding:20px;
 margin:10px 0;
 background:#00A779;
}
</style>