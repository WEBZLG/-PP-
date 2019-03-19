const app = getApp()
// const api = require('../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    nickname: "小pp",
    gender: "1",
    city: "哈尔滨",
    provice: "黑龙江",
    country: "中国",
    avatarUrl: "",
    signature: "小pp视频专家",
    phone: "18888888888",
    birthday: "1999-09-09",
    wx: "wx88888888",
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    attention: 0,//关注
    fans: 0,//粉丝
    eachother: 0,//1互相关注  0未互相关注
    integral: 0,//积分
    like: 0,//点赞
    sendVideo: [],//发布的视频
    getVideo: [],//点赞的视频
    isDialog: "",//判断对话是否是当前人
    animationData: {},
    noteList: [],//私信留言
    noteListDetails: [],//私信留言详情
    sendGoodsList: [],//送出礼物
    getGoodsList: [],//收到礼物
    dialogWords: "",//对话发送内容
    receiveid: ""//接受消息人id
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '',
    }),
      // 缓存中取信息
      wx.getStorage({
        key: 'userUid',
        success(res) {
          // console.log(res.data)
          that.setData({
            uid: res.data
          });
          that.myselfinfo();
        }
      });
    wx.getStorage({
      key: 'userMessage',
      success(res) {
        // console.log(res.data)
        that.setData({
          nickname: res.data.nickName,
          gender: res.data.gender,
          city: res.data.city,
          province: res.data.province,
          country: res.data.country,
          avatarUrl: res.data.avatarUrl,
        })
      }
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
  },
 
  // 个人信息
  myselfinfo: function (e) {
    var that = this;
    // 缓存中取信息
    wx.getStorage({
      key: 'userUid',
      success(res) {
        // console.log(res.data)
        that.setData({
          uid: res.data
        });
      }
    });
    // console.log(that.data.uid)
    wx.request({
      url: app.globalData.serverPath + "myselfinfo",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        that.setData({
          sendVideo: res.data.release,
          attention: res.data.attention,
          fans: res.data.fans,
          if_verified: res.data.if_verified,
          integral: res.data.integral,
          like: res.data.like,
          birthday: res.data.birthday,
          phone: res.data.phone,
          wx: res.data.wx,
          signature: res.data.signature,
        })
      }
    })
  },
  // 发布的视频
  getSendVideo: function () {
    this.myselfinfo()
  },
  // 点赞视频
  getLikeVideo: function () {
    const that = this;
    wx.request({
      url: app.globalData.serverPath + "myselflike",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        that.setData({
          getVideo: res.data
        })
      }
    })
  },
  // 送出礼物
  getSendGoods: function () {
    const that = this
    wx.request({
      url: app.globalData.serverPath + "sendgift",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        that.setData({
          sendGoodsList: res.data
        })
      }
    })
  },
  // 收到礼物
  getReceiveGoods: function () {
    var that = this;
    wx.request({
      url: app.globalData.serverPath + "incomegift",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          getGoodsList: res.data
        })
      }
    })
  },
  // 播放单独的视频
  playVideo: function (e) {
    var videoId = e.currentTarget.dataset.id
    var uid = this.data.uid
    wx.navigateTo({
      url: '../../playvideo/playvideo?uid=' + uid + '&videoId=' + videoId,
    })
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


})