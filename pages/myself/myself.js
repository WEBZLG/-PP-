const app = getApp()
// const api = require('../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: app.globalData.uid,
    nickname:"小pp",
    gender:"1",
    city:"哈尔滨",
    provice:"黑龙江",
    country:"中国",
    avatarUrl:"",
    signature:"小pp视频专家",
    phone:"18888888888",
    birthday:"1999-09-09",
    wx:"wx88888888",
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    attention: 0,
    fans: 0,
    if_verified:"未认证",
    integral:0,
    like:0,
    release:[],
    isDialog:"",//判断对话是否是当前人
    animationData:{},
    noteList:[],//私信留言
    noteListDetails: [],//私信留言详情
    sendGoodsList:[],//送出礼物
    getGoodsList:[]//收到礼物

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的',
    }),

    // 评论弹出层动画创建
    this.animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
      delay: 0
    });
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 550;
        // console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

    this.setData({
      nickname: app.globalData.userInfo.nickName,
      gender: app.globalData.userInfo.gender,
      city: app.globalData.userInfo.city,
      province: app.globalData.userInfo.province,
      country: app.globalData.userInfo.country,
      avatarUrl: app.globalData.userInfo.avatarUrl,
    })
    this.myselfinfo();


    
  },

  // 个人信息
  myselfinfo: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.serverPath+"myselfinfo",
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
    wx.navigateTo({
      url: '../redact/redact'
    })
  },
  // 查看明细
  viewDetails: function () {
    wx.navigateTo({
      url: '../viewdetails/viewdetails'
    })
  },
  // 提现申请
  depositApply: function () {
    wx.navigateTo({
      url: '../depositapply/depositapply'
    })
  },
  // 点赞视频
  getLikeVideo:function(){
    // api.getGoods({
    //   data: {
    //     "uid": this.data.uid
    //   },
    //   success: function () {
    //     console.log(res);
    //   }
    // })
    wx.request({
      url: app.globalData.serverPath+"myselflike",
      data: {
        // "uid": this.data.uid
        "uid": 3
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  // 送出礼物
  getSendGoods:function(){
    const that = this
    wx.request({
      url: app.globalData.serverPath+"sendgift",
      data: {
        // "uid": this.data.uid
        "uid": 3
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        that.setData({
          sendGoodsList:res.data
        })
      }
    })
  },
  // 收到礼物
  getReceiveGoods:function(){
    var that = this;
    wx.request({
      url: app.globalData.serverPath+"incomegift",
      data: {
        // "uid": this.data.uid
        "uid": 3
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          getGoodsList: res.data
        })
      }
    })
  },
  //私信留言
  getNote:function(){
    const that = this;
    wx.request({
      url: app.globalData.serverPath+"letters",
      data: {
        // "uid": this.data.uid
        "uid": 3
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        that.setData({
          noteList:res.data
        })
      }
    })
  },
//私信留言详情
  getNoteDetails: function (event) {
    const that = this;
    wx.request({
      url: app.globalData.serverPath+"lettersinfo",
      data: {
        "uid": event.currentTarget.dataset.id
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        that.setData({
          noteListDetails: res.data,
          isDialog:res.data[0].sid
        })
        that.showDialog()
      }
    })
  },
  // 帮助跳转
  help: function () {
    wx.navigateTo({
      url: '../help/help'
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
    // console.log(e)
    if (e.detail.current == 0) {
      this.getSendVideo();
    } else if (e.detail.current == 1) {
      this.getLikeVideo();
    } else if (e.detail.current == 2) {
      this.getSendGoods();
    } else if (e.detail.current == 3) {
      this.getReceiveGoods();
    } else if (e.detail.current == 4) {
      this.getNote();
    }
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    // console.log(e)
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    };
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
  },
  // 对话弹窗
  showDialog: function () {
    wx.hideTabBar({ animation:true})
    this.loadDialog();
    this.animation.bottom("0rpx").height("100%").step()
    this.setData({
      talksPage: 1,
      animationData: this.animation.export()
    });
  },

  hideDialog: function () {
    wx.showTabBar({ animation: true })
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
      talksPage: 1,
      animationData: this.animation.export()
    })
  },
  loadDialog: function () {
    var that = this;
    // api.loadTalks({
    //   data: {
    //     subjectId: this.data.subject.subjectId,
    //     page: that.data.talksPage
    //   },
    //   success: function (page) {
    //     that.setData({
    //       talks: page.content,
    //       talksPages: page.pages,
    //       animationData: that.animation.export()
    //     })
    //   }
    // });
  },

})