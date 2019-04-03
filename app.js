//app.js
App({
  data:{

  },
  globalData: {
    serverPath: 'https://www.surenmedia.cn/index/port/',
    userInfo: null,
    uid: null,
    openId: null
  }, 
  onLaunch: function () {
    // 获取用户信息

  },
  onUnload: function () {
    wx.clearStorageSync()
    wx.clearStorage()
    console.log("清除了")
  }

})
/**
* 封装wx.request请求
* method： 请求方式
* url: 请求地址
* data： 要传递的参数
* callback： 请求成功回调函数
* errFun： 请求失败回调函数
**/
function wxRequest(method, url, data, callback, errFun) {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    dataType: 'json',
    success: function (res) {
      callback(res.data);
    },
    fail: function (err) {
      errFun(res);
    }
  })
}
module.exports = {
  wxRequest: wxRequest
}


