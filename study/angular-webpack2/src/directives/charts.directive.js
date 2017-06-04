import echarts from 'echarts';
import angular from 'angular';

function charts() {
  return {
    restrict: "E",
    scope: {
      name: "="
    },
    template: '<div></div>',
    link: function (scope, iElement, iAttr) {
      var defaultConfigObj = {
        chartsData: "",//图表数据
        chartsOption: ""//图表自定义配置属性
      };
     var configObj = angular.extend(defaultConfigObj, scope.name);
      function initChart() {
        var myChart = echarts.init(iElement[0]);
        myChart.setOption(configObj.chartsOption);
      }
      initChart();
    }
  }
}

export default angular.module('directives.charts', [])
  .directive('charts', charts)
  .name;
