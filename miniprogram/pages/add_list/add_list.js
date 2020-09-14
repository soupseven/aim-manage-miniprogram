const app=getApp()
Page({
  data: {
    topic:"",
    list: [],
    result: [],
    icon:"start-o",
    date:'',
    openid:''
  },
  submit:function(){
    var date=new Date()
    var str=this.dateFormat("YYYY-mm-dd HH:MM", date)
    this.setData({
        date:str,
        openid:app.globalData.openid
    })
    wx.cloud.callFunction({
      name:'updatelist',
      data:{
        openid:this.data.openid,
        date: this.data.date,
        list: this.data.list,
        result:this.data.result
      },
      success:res=>{
          console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [update] 调用失败：', err)
      }
    })
    console.log("保存成功")
    wx.redirectTo({
      url: '../list/list',
    })
  },
  bindKeyInput: function (e) {
      this.setData({
        topic:e.detail.value
      })
      console.log(this.data.topic)
  },
  add:function(){
    let list= this.data.list
    list.push(this.data.topic)   
    this.setData({
      list:list,
      topic:""
    })
    console.log(this.data.list)
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
    ret:function(){
        wx.switchTab({
          url: '../list/list',
        })
    } , 
  onChange(event) {
    this.setData({
      result: event.detail,
    });
  }
})