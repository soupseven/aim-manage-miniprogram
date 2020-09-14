// miniprogram/pages/lookaim/lookaim.js
Page({
  data: {
    getdata:'',
    topic:"",
    long:"",
    private:false,
    moremessage:"",
    witness:[],
    isDone:false,
    date:"",
    daka:[],
    id:'',
   show:false,
   daka_message:""
  },
  onLoad: function (options) {
    this.setData({
      getdata:JSON.parse(options.aim)   
    })
    this.setData({
      topic:this.data.getdata.topic,
      long:this.data.getdata.long,
      private:this.data.getdata.private,
      moremessage:this.data.getdata.moremessage,
      witness:this.data.getdata.witness,
      date:this.data.getdata.date,
      daka:this.data.getdata.daka,
      id:this.data.getdata._id,
    })
  },
  changeshow:function(){
      this.setData({
        show:true
      })
  },
  textareaAInput:function(e){
   this.setData({
    daka_message:e.detail.value
   })
  },

  add_daka:function(){
    var date=new Date()
    var str=this.dateFormat("mm-dd", date)
    var content=this.data.daka_message
    this.data.daka.unshift({date:str,message:content})
    wx.cloud.callFunction({
      name:'add_daka',
      data:{
       id:this.data.id,
       daka:this.data.daka
      }
    })
    this.setData({
      show:false,
      daka:this.data.daka
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
delete_aim:function(){
  console.log(this.data.id)
wx.cloud.callFunction({
  name:'aim_delete',
  data:{
    id:this.data.id
  }
})
wx.navigateTo({
  url: '../aims/aims',
})
},
complete_aim:function(){
  wx.cloud.callFunction({
    name:'aim_update',
    data:{
      id:this.data.id
    }
  })
  wx.navigateBack({
    delta: 1,
  })
}
})