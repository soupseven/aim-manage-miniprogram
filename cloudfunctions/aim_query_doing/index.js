// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
const db=cloud.database()
exports.main = async (event, context) => {
  let resp=await db.collection('aim').where({  
    openid:event.openid,
    isDone:false
  }).orderBy('createTime','asc').get({
  })
   return resp
}