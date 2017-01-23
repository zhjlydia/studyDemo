'use strict';

angular.module('com.ngnice.app').controller('ReaderCreateController', function ReaderListController(Reader) {
  var vm = this;
  vm.submit=function(form){
    console.log(form);
  }
});
