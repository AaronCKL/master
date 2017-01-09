angular.module('starter.services', [])

  .service('HomeExchangeList', function($rootScope, $http, $log) {
       this.getHomeExchange = function(ccc,ddd) {
         var rates = $http({
           method: 'GET',
           headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
           url: 'http://api.yytianqi.com/observe?city='+ccc+'&key=4augp02ijrq762c8'
         }).success(function(data) {
           $log.log(data);
           data.data.fx=ddd;
            });
            return rates;
          };
  })
.factory('Search',[function(){
  var items = [{
    id:0,
    image:'img/6.jpg',
    city:'北京',
    id1:'CH010100',
    checked:false
  },{
    id:1,
    image:'img/1.jpg',
    city:'上海',
    id1:'CH020100',
    checked:false
  },{
    id:2,
    image:'img/8.jpg',
    city:'天津',
    id1:'CH030100',
    checked:false
  },{
    id:3,
    image:'img/9.jpg',
    city:'重庆',
    id1:'CH040100',
    checked:false
  },{
    id:4,
    image:'img/7.jpg',
    city:'深圳',
    id1:'CH280601',
    checked:true
  },{
    id:5,
    image:'img/2.jpg',
    city:'杭州',
    id1:'CH210101',
    checked:false
  },{
    id:6,
    image:'img/10.jpg',
    city:'南京',
    id1:'CH190101',
    checked:false
  },{
    id:7,
    image:'img/4.jpg',
    city:'六安',
    id1:'CH221501',
    checked:false
  },{
    id:8,
    image:'img/11.jpg',
    city:'黄山',
    id1:'CH221001',
    checked:false
  },{
    id:9,
    image:'img/5.jpg',
    city:'合肥',
    id1:'CH220101',
    checked:false
  },{
    id:10,
    image:'img/12.jpg',
    city:'马鞍山',
    id1:'CH220501',
    checked:false
  },{
    id:11,
    image:'img/13.jpg',
    city:'芜湖',
    id1:'CH220301',
    checked:false
  },{
    id:12,
    image:'img/14.jpg',
    city:'南宁',
    id1:'CH300101',
    checked:false
  },{
    id:13,
    image:'img/15.jpg',
    city:'安庆',
    id1:'CH220601',
    checked:false
  },{
    id:14,
    image:'img/16.jpg',
    city:'钓鱼岛',
    id1:'CH231001',
    checked:false
  }];
  return{
    all: function () {
      return items;
    },
    next:function () {
      return newItems; //返回newItem，模拟有更新
    }
  };
}]);


