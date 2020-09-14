// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
 const db=cloud.database()
 db.collection('aim').where({
    _id:event.id
  }).update({
  // data 传入需要局部更新的数据
  data: {
   daka:event.daka
  }
})
}