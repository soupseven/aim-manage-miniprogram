var app=getApp()
Page({
  data: {
    openid:"",
    aim_list_doing:[],
    aim_list_done:[],
  },

  add_aims:function(){
    wx.navigateTo({
      url: '../add_aims/add_aims',
    })
  },
  lookaim:function(e){
    var index=e.currentTarget.dataset.name;
     wx.navigateTo({
       url:'../lookaim/lookaim?aim='+JSON.stringify(this.data.aim_list_doing[index])
      })
  },
  lookaim_done:function(e){
    var index=e.currentTarget.dataset.name;
     wx.navigateTo({
       url:'../lookaim/look_aim_done?aim='+JSON.stringify(this.data.aim_list_done[index])
      })
  },
  onLoad(){
    this.setData({
      openid:app.globalData.openid
    })
    wx.cloud.callFunction({
      name:'aim_query_doing',
      data:{
        openid:this.data.openid
      },
      success:res=>{
        this.setData({
          aim_list_doing:res.result.data
        })
      },
    })
    wx.cloud.callFunction({
      name:'aim_query_done',
      data:{
        openid:this.data.openid
      },
      success:res=>{
        this.setData({
          aim_list_done:res.result.data
        })
      },
    })
   
  },
  onShow:function(){
    wx.cloud.callFunction({
      name:'aim_query_doing',
      data:{
        openid:this.data.openid
      },
      success:res=>{
        this.setData({
          aim_list_doing:res.result.data
        })
        console.log(res.result.data)
      },
    })
    wx.cloud.callFunction({
      name:'aim_query_done',
      data:{
        openid:this.data.openid
      },
      success:res=>{
        this.setData({
          aim_list_done:res.result.data
        })
        console.log(res.result.data)
      },
    })
  }
})