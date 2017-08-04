import selectFilter from 'basePath/components/newSelectFilter/filter';
import netServices from 'basePath/netservices/net';
var html = require("./template.html");

export default {
  components: {
    selectFilter: selectFilter
  },
  template: html,
  data() {
    return {}
  },
  computed: {

  },
  created: function () {
    var that = this;
    that.init();
  },
  methods: {
    init: function () {
      var that = this;
    }
  }
}