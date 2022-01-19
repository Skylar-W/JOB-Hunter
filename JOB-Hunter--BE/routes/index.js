const express = require('express');
const router = express.Router();
const { UserModel } = require('../database/models')
// 引入 md5 加密函数库
const md5 = require('blueimp-md5')
const filter = {password: 0, _v: 0} // 查询时过滤出指定的属性

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//注册路由: '/register'
/* 
  提供一个用户注册的接口
a) path 为: /register
b) 请求方式为: POST
c) 接收 userName 和 pwd 参数
d) admin 是已注册用户
e) 注册成功返回: {code: 0, data: {_id: 'abc', userName: ‘xxx’, pwd:’123’}
f) 注册失败返回: {code: 1, msg: '此用户已存在'}
*/
/* router.post('/register', (req, res) => {
  //1.获取请求参数
  const { userName, pwd } = req.body
  //2.处理请求参数
  if (userName === 'admin') {
    //3.返回数据给前台
    res.send({ code: 1, msg: '您输入的用户名已被注册，请更换用户名重新注册!' })
  } else {
    res.send({ code: 0, data: { id: `${userName}${Date.now()}`, userName, pwd } })
  }
}) */

// 注册路由
router.post('/register', function (req, res) {
  // 1. 获取请求参数数据(userName, pwd, type)
  const { userName, pwd, type } = req.body
  // 2. 处理数据
  // 3. 返回响应数据
  // 2.1. 根据 userName 查询数据库, 看是否已存在 user
  UserModel.findOne({ userName }, function (err, user) {
    // 3.1. 如果存在, 返回一个提示响应数据: 此用户已存在
    if (user) {
      res.send({ code: 1, msg: '此用户名已存在!' }) // code 是数据是否是正常数据的标识
    } else {
      // 2.2. 如果不存在, 将提交的 user 保存到数据库
      new UserModel({ userName, type, pwd: md5(pwd)}).save(function (err, user) {
        // console.log(user);
        // 生成一个 cookie(userid: user._id), 并交给浏览器保存
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 }) // 持久化 cookie, 浏览器会保存在本地文件
        const data = { _id: user._id, userName, type } // 返回的数据中不要携带 pwd
        // 3.2. 保存成功, 返回成功的包含user的响应数据
        res.send({ code: 0, data })
      })
    }
  })
})

// 登陆路由
router.post('/login', function (req, res) {
  // 1. 获取请求参数数据(userName, pwd)
  const { userName, pwd } = req.body
  // 2. 处理数据: 根据 userName 和 pwd 去数据库查询得到 user
  UserModel.findOne({ userName, pwd: md5(pwd) }, filter, function (err, user) {
    // 3. 返回响应数据
    // 3.1. 如果 user 没有值, 返回一个错误的提示: 用户名或密码错误
    if (!user) {
      res.send({ code: 1, msg: '用户名或密码错误' })
    } else {
      // 生成一个 cookie(userid: user._id), 并交给浏览器保存
      res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
      // 3.2. 如果 user 有值, 返回 user
      res.send({ code: 0, data: user }) // user 中没有 pwd
    }
  })
})

module.exports = router;
