var UA = window.navigator.userAgent.toLowerCase()
var isAndroid = UA && UA.indexOf('android') > 0
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
var reg = /^[\d\.]+$/

var app = new Vue({
  el: '#app',
  data: function () {
    return {
      salary: '',//税前
      deduct1: '0',//专项附加扣除
      deduct2: '0',//各项社会保险费
      result: [],
      isMobile: false,
      showMoneyI: false,

    }
  },
  mounted: function() {
    this.isMobile = false
    this.$nextTick(function() {
      $(".page-share").ofoShare({
        link: location.href,
        title: "2020新个税计算器分享",
        desc: "最新2020新个税计算器，看看明年你每个月交税情况，看看你的收入分布。",
        comment:"最新2020新个税计算器，看看明年你每个月交税情况，看看你的收入分布。",
        pics: "http://ofoyou.com/source/tax.png",
        beforeClick: function(e, t) {
          if (e === "weibo") {
            t.title = t.desc;
          }
          return t;
        },
        afterClick: function(e) {
        }
      });
    })
  },
  methods: {
    shuilv:function(money){
      var money = Number(money);
      switch (true){
        case money<=36000:
          return {
            lv:0.03,
            kouchu:0
          };
        case 36000<money&&money<=144000:
          return {
            lv:0.1,
            kouchu:2520
          };
        case 144000<money&&money<=300000:
          return {
            lv:0.2,
            kouchu:16920
          };
        case 300000<money&&money<=420000:
          return {
            lv:0.25,
            kouchu:31920
          };
        case 420000<money&&money<=660000:
          return {
            lv:0.3,
            kouchu:52920
          };
        case 660000<money&&money<=960000:
          return {
            lv:0.35,
            kouchu:85920
          };
        case 960000<money:
          return {
            lv:0.45,
            kouchu:181920
          }
      }
    },
    count:function(month){//计算方法 参数：月份
      var count = 0;
      for(var i=0;i<this.result.length;i++){
        count+=Number(this.result[i].tax);
      }
      var ct = month*(this.salary-5000-this.deduct1-this.deduct2);
      ct = this.shuilv(ct).lv*ct-this.shuilv(ct).kouchu - count;
      // console.log(this.salary - ct - this.deduct2)
      
      this.result.push({
        month: month,
        tax: ct.toFixed(2),
        money: (this.salary - ct - this.deduct2).toFixed(2),
      })
    },
    post: function () {
      this.result = []
      switch ('') {
        case this.salary:
          return alert('请输入收入金额');
        case this.deduct1:
          return alert('请输入专项附加扣除');
        case this.deduct2:
          return alert('请输入各项社会保险费')
      }
      switch (false) {
        case reg.test(this.salary):
        case reg.test(this.deduct1):
        case reg.test(this.deduct2):
          return alert('请输入收入金额');
      }
      this.salary = Number(this.salary);
      this.deduct1 = Number(this.deduct1);
      this.deduct2 = Number(this.deduct2);
      if((this.salary-5000-this.deduct1-this.deduct2)<=0){
        for(var i = 1;i<=12;i++){
          this.result.push({
            month: i,
            tax: 0,
            money: (this.salary - this.deduct2).toFixed(2),
          })
        }
      }else{
        for(var i = 1;i<=12;i++){
          this.count(i)
        }
      }
      var taxCount = 0;
      var moneyCount = 0;
      for(var i=0;i<this.result.length;i++){
        taxCount+=Number(this.result[i].tax);
        moneyCount+=Number(this.result[i].money);
      }
      this.result.push({
        month: 'all',
        tax: taxCount.toFixed(2),
        money: moneyCount.toFixed(2),
      })
      axios.get('http://geshui2019.ofoyou.com/getInfo', {
        params: {
          salary: this.salary,
          deductV1: this.deduct1,
          deductV2: this.deduct2
        }
      }).then(function(res) {})
      
    },
    reset: function() {
      this.salary = ''
      this.deduct1 = '0'
      this.deduct2 = '0'
      this.result = []
    },
  }
})
