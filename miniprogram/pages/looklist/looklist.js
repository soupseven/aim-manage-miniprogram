// miniprogram/pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic:"",
    list: [],
    result: [],
    icon:"start-o",
    date:'',
    id:'',
     getdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getdata:JSON.parse(options.list)   
    })
    this.setData({
      list:this.data.getdata.list,
      result:this.data.getdata.result,
      id:this.data.getdata._id
    })
    console.log(this.data.list)
  },
  onUnload(){
     this.update()
    },
  bindKeyInput: function (e) {
    this.setData({
      topic:e.detail.value
    })
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

     
onChange(event) {
  this.setData({
    result: event.detail,
  });
},
update:function(){
  wx.cloud.callFunction({
    name:'updateRe',
    data:{
     id:this.data.id,
     result:this.data.result,
     list:this.data.list
    },
   
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '调用失败',
      })
      console.error('[云函数] [更新数据] 调用失败：', err)
    }
  })

},
delete:function(){
  wx.cloud.callFunction({
    name:'deletelist',
    data:{
     id:this.data.id
    },
  success:res=>{
    wx.showToast({
      icon: 'none',
      title: '删除成功',
    })
   wx.navigateBack({
     delta: 1,
   })
    
  },
  fail: err => {
    wx.showToast({
      icon: 'none',
      title: '调用失败',
    })
    console.error('[云函数] [更新数据] 调用失败：', err)
  }
  
  })
 
}
})