//app.js
App({
  data:{

  },
  globalData: {
    serverPath: 'https://www.surenmedia.cn/index/port/'
  }, 
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

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
