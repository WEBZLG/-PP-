//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '素人短视频',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: '',
    wxname: '',
    wximage: '',
    code:"",
    sex:""
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      });
    }
  },
  getUserInfo: function (e) {
    var that = this
    if (app.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口 第一次授权登陆
      wx.login({
        success: function (res) {
          var code = res.code
          that.setData({
            code:res.code
          })
          // 获取用户信息
          wx.getUserInfo({
            success: function (data) {
              console.log(data)
              app.globalData.userInfo = data.userInfo
              // 缓存用户信息
              wx.setStorage({
                key: 'userMessage',
                data: data.userInfo,
              })
              wx.setStorageSync('userMessage', data.userInfo)
              // console.log("code="+that.data.code)
              wx.request({
                url: app.globalData.serverPath+"login",
                data: {
                  "code": that.data.code,
                },
                method: 'GET',
                success: function (res) {
                  // console.log(res)
                  // 缓存openid
                  wx.setStorage({
                    key: 'openId',
                    data: res.data.openid
                  })
                  wx.setStorageSync('openId', res.data.openid)
                  app.globalData.openId = res.data.openid
                  that.setData({
                    userInfo: e.detail.userInfo,
                    hasUserInfo: true,
                    openid: res.data.openid, //用户openid
                    wxname: data.userInfo.nickName,//用户昵称
                    wximage: data.userInfo.avatarUrl,//用户头像
                    sex:data.userInfo.gender//性别
                  })
                  that.setuserinfo();//第一次授权保存用户信息
                }
              })
            }
          })
        }
      })
    };
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      // console.log("登录")
      wx.reLaunch({
        url: '../index/index'
      })
    } else {
      wx.showToast({
        title: '授权失败！',
        icon: 'none',
        duration: 2000
      })
    };

  },
  // 保存信息
  setuserinfo: function (e) {
    var openid = this.data.openid;
    var wxname = this.data.wxname;
    var wximage = this.data.wximage;
    var sex = this.data.sex==1?"男":"女"
    console.log(sex)
    wx.request({
      url: app.globalData.serverPath+"setuserinfo",
      data: {
        "openid": openid,
        "wxname": wxname,
        "wximage": wximage,
        "sex":sex
      },
      method: 'POST',
      success: function (res) {
        // console.log(res)
        // 缓存uid
        app.globalData.uid = res.data.uid
        wx.setStorage({
          key: 'userUid',
          data: res.data.uid
        })
        wx.setStorageSync('userUid', res.data.uid)
        // console.log(app.globalData.uid)
      }
    })
  }
})
