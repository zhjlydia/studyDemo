export default class HomeController {
  constructor(randomNames) {
    this.random = randomNames;
    this.name = 'World';
    this.chartConfig={
      chartsData: "",//图表数据
      chartsOption: {
          title: {
            show: false
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}({d}%)",
            position: ["5%", "2%"],
          },
          legend: {
            show: false
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,

            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }//图表自定义配置属性
    }
  }

  changeName() {
    this.name = 'angular-tips';
  }

  randomName() {
    this.name = this.random.getName();
  }
}

HomeController.$inject = ['randomNames'];
