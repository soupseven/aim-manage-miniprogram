var app=getApp();
Page({

  data: {
    listtodo:[],
    date:'',
    list:'',
    openid:'',
    id:''
    },
  onLoad(){
    this.setData({
      openid:app.globalData.openid
    })
    wx.cloud.callFunction({
      name:'querylist',
      data:{
        openid:this.data.openid
      },
      success:res=>{
        this.setData({
          listtodo:res.result.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [query] 调用失败：', err)
      }
    })
  },

  onShow: function () {
    this.onLoad()
  },
  addthings:function(){
    wx.redirectTo({
      url: '../add_list/add_list',
    })
  },
  look:function(e){
     var index=e.currentTarget.dataset.name;
    console.log(this.data.listtodo[index])
     wx.navigateTo({
       url:'../looklist/looklist?list='+JSON.stringify(this.data.listtodo[index])
      })
  }
})