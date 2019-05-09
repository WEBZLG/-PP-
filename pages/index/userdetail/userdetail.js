const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    nickname: "素人",
    gender: "男",
    city: "哈尔滨",
    provice: "黑龙江",
    country: "中国",
    avatarUrl: "",
    signature: "素人短视频",
    phone: "电话保密",
    birthday: "生日保密",
    wx: "微信保密",
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
    receiveid: "",//接受消息人id,
    ifRelation:"",//是否关注
    otherId:"",
    uid_send_otherpeopleid_integral:0,
    wx_integral:0,
    phone_integral:0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    // console.log(options)
    var that = this;
    wx.setNavigationBarTitle({
      title: '个人信息',
    }),
    that.setData({
      // ifRelation: options.ifRelation,
      otherId: options.otherId
    });
    // 缓存中取信息
    wx.getStorage({
      key: 'userUid',
      success(res) {
        // console.log(res.data)
        that.setData({
          uid: res.data
        });
        that.otherInfo();
      }
    });

    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 480;
        // console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
 
  // 个人信息
  otherInfo: function (e) {
    wx.showLoading()
    var that = this;
    wx.request({
      url: app.globalData.serverPath + "otherpeople",
      data: {
        "uid": that.data.uid,
        "otherpeopleid":that.data.otherId
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        wx.hideLoading()
        that.setData({
          sendVideo: res.data.release,
          attention: res.data.attention,
          fans: res.data.fans,
          like: res.data.obtainlike,
          birthday: res.data.birthday,
          phone: res.data.phone,
          wx: res.data.wx,
          gender:res.data.sex,
          signature: res.data.signature,
          avatarUrl: res.data.wximage,
          nickname:res.data.wxname,
          ifRelation:res.data.if_attention,
          uid_send_otherpeopleid_integral: res.data.uid_send_otherpeopleid_integral,
          phone_integral: res.data.phone_integral,
          wx_integral: res.data.wx_integral
        })
      }
    })
  },
  // 发布的视频
  getSendVideo: function () {
    this.otherInfo()
  },
  // 点赞视频
  getLikeVideo: function () {
    wx.showLoading()
    const that = this;
    wx.request({
      url: app.globalData.serverPath + "myselflike",
      data: {
        "uid": that.data.otherId
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        // console.log(res);
        that.setData({
          getVideo: res.data
        })
      }
    })
  },
  // 送出礼物
  getSendGoods: function () {
    wx.showLoading()
    const that = this
    wx.request({
      url: app.globalData.serverPath + "sendgift",
      data: {
        "uid": that.data.otherId
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        // console.log(res);
        that.setData({
          sendGoodsList: res.data
        })
      }
    })
  },
  // 收到礼物
  getReceiveGoods: function () {
    wx.showLoading()
    var that = this;
    wx.request({
      url: app.globalData.serverPath + "incomegift",
      data: {
        "uid": that.data.otherId
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        that.setData({
          getGoodsList: res.data
        })
      }
    })
  },
  // 播放单独的视频
  playVideo: function (e) {
    var videoId = e.currentTarget.dataset.id
    var uid = this.data.otherId
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
  // 关注
  focus: function (e) {
    var that = this;
    // console.log(that.data.uid, that.data.otherId)
    wx.request({
      url: app.globalData.serverPath + "attention",
      data: {
        "uid": that.data.uid,
        "attentid": that.data.otherId
      },
      method: 'POST',
      success: function (res) {
        // console.log(res)
        if(res.data.info=="success"){
          if(res.data.status==0){
            that.setData({
              ifRelation: 1
            })
          }else{
            that.setData({
              ifRelation: 0
            })
          }
        }else{
          // console.log(res)
        }
        
      }
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


})