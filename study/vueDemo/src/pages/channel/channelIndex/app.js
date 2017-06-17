
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