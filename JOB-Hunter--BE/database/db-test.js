/* 
  测试数据库的连接
*/
/*
1. 连接数据库
  1.1. 引入 mongoose
  1.2. 连接指定数据库(URL 只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)

2. 得到对应特定集合的 Model
  2.1. 定义 Schema(描述文档结构)
  2.2. 定义 Model(与集合对应, 可以操作集合)

3. 通过 Model 或其实例对集合数据进行 CRUD 操作
  3.1. 通过 Model 实例的 save()添加数据
  3.2. 通过 Model 的 find()/findOne()查询多个或一个数据
  3.3. 通过 Model 的 findByIdAndUpdate()更新某个数据
  3.4. 通过 Model 的 remove()删除匹配的数据
*/
const md5 = require('blueimp-md5')
// 1. 连接数据库
// 1.1. 引入 mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL 只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/JobHunter_test')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
  console.log('数据库JobHunter_test连接成功.....')
})

// 2. 得到对应特定集合的 Model
// 2.1. 定义 Schema(描述文档结构)
const userSchema = mongoose.Schema({
  userName: { type: String, required: true }, // 用户名
  pwd: { type: String, required: true }, // 密码
  type: { type: String, required: true }, // 用户类型: hunter/boss
})
// 2.2. 定义 Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema) // 集合名: user

// CRUD
// 3.1. 通过 Model 实例的 save()添加数据
function testSave() {
  // user 数据对象
  const user = {
    userName: 'Merine',
    pwd: md5('aaccvy87'),
    type: 'hunter',
  }
  const userModel = new UserModel(user)
  // 保存到数据库
  userModel.save(function (err, user) {
    console.log('save() 存入了一条数据! ', err, user)
  })
}
// testSave()

// 3.2. 通过 Model 的 find()/findOne()查询多个或一个数据
function testFind() {
  // 查找多个
  UserModel.find(function (err, users) {
    // 如果有匹配返回的是一个[user1, user2, ..., userN], 如果没有一个匹配的返回[]
    console.log('find() 查找多条数据! ', err, users)
  })
  // 查找一个
  UserModel.findOne({ _id: ("61e84c27bb0cb1862b54e326") }, function (err, user) {
    // 如果有匹配返回的是一个 user, 如果没有一个匹配的返回 null
    console.log('findOne() 查找一条数据! ', err, user)
  })
}
// testFind()

// 3.3. 通过 Model 的 findByIdAndUpdate()更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate({ _id: '61e84c27bb0cb1862b54e326' }, { userName: 'Higgins' },
    function (err, user) {
      console.log('findByIdAndUpdate() 更新了数据! ', err, user)
    })
}
// testUpdate()

// 3.4. 通过 Model 的 remove()删除匹配的数据
function testDelete() {
  UserModel.deleteOne({ _id: '61e8527b3464ccec224a8039' }, function (err, result) {
    console.log('deleteOne() 删除了数据! ', err, result)
  })
}
// testDelete()