const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    nickname:"PP小白",
    gender:"男",
    city:"哈尔滨",
    provice:"黑龙江",
    country:"中国",
    avatarUrl:"",
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    attention: 0,
    fans: 0,
    if_verified:"未认证",
    integral:0,
    like:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      nickname: app.globalData.userInfo.nickName,
      gender: app.globalData.userInfo.gender,
      city: app.globalData.userInfo.city,
      province: app.globalData.userInfo.province,
      country: app.globalData.userInfo.country,
      avatarUrl: app.globalData.userInfo.avatarUrl,
    })
    this.myselfinfo();
    this.uid = app.globalData.uid;
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 650;
        that.setData({
          winHeight: calc
        });
      }
    });
    
  },

  // 个人信息
  myselfinfo: function (e) {
    var that = this;
    wx.request({
      url: "http://192.168.1.180/index/port/myselfinfo",
      data: {
        "uid": this.uid
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var verified = "未认证";
        if (res.data.if_verified=="0"){
          verified = "未认证";
        }else{
          verified = "已认证";
        }
        that.setData({
          attention : res.data.attention,
          fans: res.data.fans,
          if_verified:verified,
          integral: res.data.integral,
          like: res.data.like
        })
      }
    })
  },
  // 编辑资料
  redact:function(){
    wx.redirectTo({
      url: '../redact/redact'
    })
  },
  // 查看明细
  viewDetails: function () {
    wx.redirectTo({
      url: '../viewdetails/viewdetails'
    })
  },
  // 提现申请
  depositApply: function () {
    wx.redirectTo({
      url: '../depositapply/depositapply'
    })
  },
  // 导航
  videolist: function () {
    console.log("ceshi")
    wx.redirectTo({
      url: '../subject/subject'
    })
  },
  focus: function () {
    wx.redirectTo({
      url: '../focus/focus'
    })
  },
  message: function () {
    console.log("ceshi")
    wx.redirectTo({
      url: '../message/message'
    })
  },
  myself: function () {
    console.log("ceshi")
    wx.redirectTo({
      url: 'myself'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    console.log(e)
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  }

})