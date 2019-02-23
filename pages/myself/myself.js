const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: app.globalData.uid,
    nickname:"",
    gender:"",
    city:"",
    provice:"",
    country:"",
    avatarUrl:"",
    phone:"",
    birthday:"",
    wx:"",
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    attention: 0,
    fans: 0,
    if_verified:"未认证",
    integral:0,
    like:0,
    release:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      nickname: app.globalData.userInfo.nickName,
      gender: app.globalData.userInfo.gender,
      city: app.globalData.userInfo.city,
      province: app.globalData.userInfo.province,
      country: app.globalData.userInfo.country,
      avatarUrl: app.globalData.userInfo.avatarUrl,
    })
    this.myselfinfo();
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
        "uid": app.globalData.uid
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        that.setData({
          attention : res.data.attention,
          fans: res.data.fans,
          if_verified: res.data.if_verified,
          integral: res.data.integral,
          like: res.data.like,
          birthday: res.data.birthday,
          phone:res.data.phone,
          wx:res.data.wx,
          signature:res.data.signature,
          release: res.data.release
        })
      }
    })
  },
  // 发布的视频
  getSendVideo:function(){
    this.myselfinfo()
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
  // 点赞视频
  getLikeVideo:function(){
    wx.request({
      url: "http://192.168.1.180/index/port/myselflike",
      data: {
        "uid": this.data.uid
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  // 送出礼物
  getSendGoods:function(){
    wx.request({
      url: "http://192.168.1.180/index/port/sendgift",
      data: {
        "uid": this.data.uid
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  // 收到礼物
  getReceiveGoods:function(){
    wx.request({
      url: "http://192.168.1.180/index/port/incomegift",
      data: {
        "uid": this.data.uid
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  getNote:function(){
    wx.request({
      url: "http://192.168.1.180/index/port/letters",
      data: {
        "uid": this.data.uid
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
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
    console.log("滚动"+ e)
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
    };
    if (e.target.dataset.current==0){
      this.getSendVideo();
    } else if (e.target.dataset.current==1){
      this.getLikeVideo();
    } else if (e.target.dataset.current == 2) {
      this.getSendGoods();
    } else if (e.target.dataset.current == 3) {
      this.getReceiveGoods();
    } else if (e.target.dataset.current == 4) {
      this.getNote();
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