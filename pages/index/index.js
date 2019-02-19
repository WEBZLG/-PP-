//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'PP短视频',
    userInfo: {},
    openId:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/home/home'
    })
  },
  onLoad: function () {
    console.log(app.globalData.userInfo)


    // var item = "djma";
    // var key = "132465";
    // wx.request({
    //   method: 'POST',
    //   data: {
    //     item: item,
    //     key: key
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   url: serverPath + "userinfo",
    //   success: function (res) {
    //     console.log(res)

    //   }
    // })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    var that = this;
    wx.login({
      success: function (res) {
        console.log("login by code > " + res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      var code = res.code;
      wx.request({
        method: 'POST',
        data: {
          code:code,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url:"http://192.168.1.180/index/port/login",
        success: function (res) {
          console.log(res)
          that.openId = res.data
        }
      })
      }
    });
    wx.request({
      method: 'POST',
      data: {
        // openId: that.openId,
        // avatarUrl:e.detail.userInfo.avatarUrl,
        // city: e.detail.userInfo.city,
        // country: e.detail.userInfo.country,
        // gender: e.detail.userInfo.gender,
        // language: e.detail.userInfo.language,
        // nickName: e.detail.userInfo.nickName,
        // province: e.detail.userInfo.province,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: "http://192.168.1.180/index/port/userinfo",
      success: function (res) {
        console.log(res)

      }
    })

    if (e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      wx.navigateTo({
        url: '../subject/subject'
      })
    }else{
      wx.showToast({
        title: '授权失败！',
        icon: 'none',
        duration: 2000
      })
    }

  }
})
