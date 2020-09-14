 const app=getApp()
Page({
  data:{
    avatarUrl:"https://706f-potato-7bxul-1302996334.tcb.qcloud.la/delu.jpg?sign=3b5c0aaca7df39400681ab9efacd227b&t=1599395984",
    nickname:"",
    openid:"",
    saying:"人生没有白走的路 每一步都算数",
    showchange:false
  },
  aim:function(){
     wx.navigateTo({
       url: '../aims/aims',
     })
  },
  setting:function(){
    var now=!this.data.showchange
    this.setData({
      showchange:now
    })
  },
  list:function(){
wx.navigateTo({
  url: '../list/list',
})
  },
  onLoad: function (options) {
    var say=wx.getStorageSync("say")
    if(say!=""){
      this.setData({
      saying:say
    })
    }
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
                app.globalData.userInfo=res.userInfo ,
                 this.setData({
                  avatarUrl:res.userInfo.avatarUrl,
                  nickname:res.userInfo.nickName
                 })
                 console.log(res.userInfo)
                 this. onGetOpenid()
            }
          })
        }
      }
    })
  },
  bindKeyInput: function (e) {
    wx.setStorage({
      data: e.detail.value,
      key: 'say',
    })
    console.log(e.detail.value)
    this.setData({
      saying:e.detail.value
    })
},
onShow(){
  var say=wx.getStorageSync("say")
  if(say!=" "){
    this.setData({
  saying:say
})
  }

},
  onGetUserInfo:function(){ 
     this.onGetOpenid
     wx.getUserInfo({
    success: res => {
      this.setData({
        avatarUrl:res.userInfo.avatarUrl
      })
      app.globalData.userInfo=res.userInfo ,
    
      wx.cloud.callFunction({
        name:'add_user',
        data:{
          avatarUrl:this.data.avatarUrl,
          openid:this.data.openid
        }
      })
    }
  })
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        this.setData({
          openid:res.result.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  }
})
