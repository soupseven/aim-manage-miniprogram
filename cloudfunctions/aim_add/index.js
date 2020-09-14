// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db=cloud.database()
exports.main = async (event, context) => {
  let{  topic,
  long,
  private,
  moremessage,
  witness,
  isDone,
  date,
  daka,
  friend,
  openid
}=event
  db.collection("aim").add({
    data:{
      topic,
      long,
      private,
      moremessage,
      witness,
      isDone,
      date,
      daka,
      friend,
      openid,
      createTime:db.serverDate() 
    },
    success: function(res) {
      console.log(res)
    }
  })
}