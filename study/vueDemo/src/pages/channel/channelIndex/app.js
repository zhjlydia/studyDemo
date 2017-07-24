
var html = require("./template.html");

export default {
  components:{
  },
  template: html,
  data(){
      return{
          currentIndex:0
      }
  },
  computed: {
  },
  created: function() {
      this.init();
  },
  methods: {
      init:function(){
          console.log("Lut");
          this.$router.replace("/channel/channelList");
      }
  },
  watch: {
    '$route' (to, from) {
    if(this.$route.fullPath=="/channel"){
        this.init();
    }
    console.log(this.$route.fullPath);
    debugger;
  } 
  }
}
function zz(n){
   var m=((n+'').split('')).reduce(function(x,y){
       return Number(x)+Number(y);
   })
   return n<10?n:zz(n);
};