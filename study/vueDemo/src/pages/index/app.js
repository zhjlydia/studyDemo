
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
        //   this.$router.replace("/channel/channelList");
      }
  }
}