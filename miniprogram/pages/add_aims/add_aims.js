var app=getApp()

Page({
  data: {
    topic:"",
    long:"",
    private:false,
    moremessage:"",
    witness:[],
    isDone:false,
    date:"",
    daka:[],
    friend:[],
    openid:''
  },
  input_topic:function(e){
       this.setData({
         topic:e.detail.value
       })
  },
  input_time:function(e){
    this.setData({
      long:e.detail.value
    })
  },
  choose30:function(){
    this.setData({
      long:"30天"
    })
  },
  choose60:function(){
    this.setData({
      long:"60天"
    })
  },
  choose90:function(){
    this.setData({
      long:"90天"
    })
  },
  isprivate:function(){
    var now=!this.data.private
    this.setData({
      private:now
    })
  },
  moreInput:function(e){
    this.setData({
      moremessage:e.detail.value
    })
  },
   create:function(){
    var date=new Date()
    var str=this.dateFormat("YYYY-mm-dd HH:MM", date)
    this.setData({
        date:str,
        openid:app.globalData.openid
    })
    wx.cloud.callFunction({
      name:'aim_add',
      data:{
        topic:this.data.topic,
        long:this.data.long,
        private:this.data.private,
        moremessage:this.data.moremessage,
        witness:this.data.witness,
        isDone:this.data.isDone,
        date:this.data.date,
        daka:this.data.daka,
        friend:this.data.friend,
        openid:this.data.openid
      },
      success:res=>{
     wx.navigateBack({
       delta: 1,
     })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [update] 调用失败：', err)
      }
    })
  
   },
   dateFormat:function(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
},
onShareAppMessage: function( options ){
  　　var that = this;
  　　if( options.from == 'button' ){
  　　}
      return {
        title: "我正在完成这个目标，快来当我的见证人吧",
         path: 'pages/index/index?scene=2&myopenid='+this.data.openid,//点击分享消息是打开的页面
        imageUrl: "",
        success: function (res) {
          // 转发成功
          console.log("转发成功:" + JSON.stringify(res));
          var shareTickets = res.shareTickets;

        },
        fail: function (res) {
          // 转发失败
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
  }
})