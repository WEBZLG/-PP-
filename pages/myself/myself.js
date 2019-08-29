const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    nickname: "素人",
    gender: "1",
    city: "哈尔滨",
    provice: "黑龙江",
    country: "中国",
    avatarUrl: "",
    signature: "素人短视频",
    phone: "未设置",
    birthday: "未设置",
    wx: "未设置",
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    attention: 0, //关注
    fans: 0, //粉丝
    if_verified: "未认证", //是否认证
    integral: 0, //积分
    like: 0, //点赞
    sendVideo: [], //发布的视频
    getVideo: [], //点赞的视频
    isDialog: "", //判断对话是否是当前人
    animationData: {},
    noteList: [], //私信留言
    noteListDetails: [], //私信留言详情
    sendGoodsList: [], //送出礼物
    getGoodsList: [], //收到礼物
    dialogWords: "", //对话发送内容
    receiveid: "", //接受消息人id
    touchStartTime: 0,
    touchEndTime: 0,
    // 最后一次单击事件点击发生时间
    lastTapTime: 0,
    // 单击事件点击后要触发的函数
    lastTapTimeoutFunc: null,
    iosShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var that = this;
    wx.showTabBar()
    wx.setNavigationBarTitle({
        title: '我的信息',
      }),
      // // 苹果充值显隐
      // wx.request({
      //   url: app.globalData.serverPath + 'kaiguan',
      //   data: {},
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   method: "POST",
      //   success: function(res) {
      //     console.log(res)
      //     if (res.data == 0) {
      //       that.setData({
      //         iosShow: false
      //       })
      //     } else {
      //       that.setData({
      //         iosShow: true
      //       })
      //     }
      //   },
      //   fail: function(err) {},
      //   complete: function() {}
      // })
      wx.getSystemInfo({
        success: function (res) {
          if (res.platform == "ios") {
            that.setData({
              iosShow: true
            })
          } else if (res.platform == "android") {
            that.setData({
              iosShow: false
            })
          }
        }
      })
    // 缓存中取信息
    wx.getStorage({
      key: 'userUid',
      success(res) {
        //console.log(res.data)
        that.setData({
          uid: res.data
        });
        that.myselfinfo();
      }
    });
    wx.getStorage({
      key: 'userMessage',
      success(res) {
        // console.log(res)
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


    // 评论弹出层动画创建
    this.animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
      delay: 0
    });
    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 536;
        // //console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },

  // 个人信息
  myselfinfo: function(e) {
    wx.showLoading()
    var that = this;
    wx.request({
      url: app.globalData.serverPath + "myselfinfo",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function(res) {
        wx.hideLoading()
        //console.log(res);
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
  getSendVideo: function() {
    this.myselfinfo()
  },
  // 编辑资料
  redact: function() {
    wx.navigateTo({
      url: './redact/redact'
    })
  },
  // 查看明细
  viewDetails: function() {
    wx.navigateTo({
      url: './viewdetails/viewdetails'
    })
  },
  // 提现申请
  depositApply: function() {
    var integral = this.data.integral
    wx.navigateTo({
      url: './depositapply/depositapply?integral=' + integral
    })
  },
  // 帮助跳转
  help: function() {
    wx.navigateTo({
      url: './help/help'
    })
  },
  goZan: function() {
    wx.navigateTo({
      url: '../message/praise/praise'
    })
  },
  goFocus: function() {
    wx.navigateTo({
      url: './focus/focus'
    })
  },
  goFans: function() {
    wx.navigateTo({
      url: '../message/fans/fans'
    })
  },
  // 点赞视频
  getLikeVideo: function() {
    wx.showLoading()
    const that = this;
    wx.request({
      url: app.globalData.serverPath + "myselflike",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function(res) {
        wx.hideLoading()
        //console.log(res);
        that.setData({
          getVideo: res.data
        })
      }
    })
  },
  // 送出礼物
  getSendGoods: function() {
    wx.showLoading()
    const that = this
    wx.request({
      url: app.globalData.serverPath + "sendgift",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function(res) {
        wx.hideLoading()
        console.log(res);
        that.setData({
          sendGoodsList: res.data
        })
      }
    })
  },
  // 收到礼物
  getReceiveGoods: function() {
    wx.showLoading()
    var that = this;
    wx.request({
      url: app.globalData.serverPath + "incomegift",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        wx.hideLoading()
        that.setData({
          getGoodsList: res.data
        })
      }
    })
  },
  //私信留言
  getNote: function() {
    wx.showLoading()
    const that = this;
    wx.request({
      url: app.globalData.serverPath + "letters",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function(res) {
        wx.hideLoading()
        //console.log(res);
        that.setData({
          noteList: res.data
        })
      }
    })
  },
  //私信留言详情
  getNoteDetails: function(event) {
    wx.showLoading()
    const that = this;
    this.setData({
      "receiveid": event.currentTarget.dataset.id,
    })
    wx.request({
      url: app.globalData.serverPath + "lettersinfo",
      data: {
        "uid": event.currentTarget.dataset.id,
        "myselfid": that.data.uid
      },
      method: 'POST',
      success: function(res) {
        wx.hideLoading()
        //console.log(res);
        that.setData({
          noteListDetails: res.data,
          isDialog: that.data.uid
        })
        that.showDialog()
      }
    })
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    // //console.log(e)
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
  swichNav: function(e) {
    // //console.log(e)
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    };
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
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
  showDialog: function() {
    wx.hideTabBar({
      animation: true
    })
    console.log('执行了隐藏导航')
    this.loadDialog();
    this.animation.bottom("0rpx").height("100%").step()
    this.setData({
      talksPage: 1,
      animationData: this.animation.export()
    });
  },

  hideDialog: function() {
    wx.showTabBar({
      animation: true
    })
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
      talksPage: 1,
      animationData: this.animation.export()
    })
  },
  loadDialog: function() {
    var that = this;
  },
  //获取对话内容
  getDialogWords: function(e) {
    this.setData({
      dialogWords: e.detail.value
    })
  },
  //发送对话内容
  senWords: function() {
    wx.showLoading()
    var that = this;
    const nowTime = this.formatTime(new Date())
    wx.request({
      url: app.globalData.serverPath + "sendmessage",
      data: {
        "sendid": that.data.uid,
        "receiveid": that.data.receiveid,
        "content": that.data.dialogWords,
        "time": nowTime
      },
      method: 'POST',
      success: function(res) {
        wx.hideLoading()
        //console.log(res);
        if (res.data.info == "success") {
          wx.showToast({
            title: '留言成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          that.setData({
            dialogWords: ""
          })
          that.hideDialog()
          that.getNote()
        } else {
          wx.showModal({
            content: "留言失败!请重新提交。",
            showCancel: false
          });
        }
      }
    })
  },
  //手机认证
  authentication: function() {
    wx.navigateTo({
      url: './bindPhone/bindPhone'
    })
  },
  // 时间格式
  formatTime: function(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒";
  },
  /// 按钮触摸开始触发的事件
  touchStart: function(e) {
    this.touchStartTime = e.timeStamp
  },

  /// 按钮触摸结束触发的事件
  touchEnd: function(e) {
    this.touchEndTime = e.timeStamp
  },
  // 播放单独的视频
  playVideo: function(e) {
    //console.log(e)
    var videoId = e.currentTarget.dataset.id
    var uid = this.data.uid
    wx.navigateTo({
      url: '../playvideo/playvideo?uid=' + uid + '&videoId=' + videoId,
    })
  },
  /// 单击、双击
  multipleTap: function(e) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      // 更新最后一次点击时间
      that.lastTapTime = currentTime

      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        //console.log("double tap")
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
        // wx.showModal({
        //   title: '提示',
        //   content: '双击事件被触发',
        //   showCancel: false
        // })
      } else {
        // 单击事件延时300毫秒执行，这和最初的浏览器的点击300ms延时有点像。
        that.lastTapTimeoutFunc = setTimeout(function() {
          //console.log("tap")
          that.playVideo(e)
        }, 300);
      }
    }
  },
  // 长按删除视频
  delVideo: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此视频吗？',
      success: function(sm) {
        if (sm.confirm) {
          wx.showLoading()
          wx.request({
            url: app.globalData.serverPath + "del_release",
            data: {
              "id": e.currentTarget.dataset.id,
            },
            method: 'POST',
            success: function(res) {
              wx.hideLoading()
              //console.log(res);
              if (res.data == "1") {
                wx.showToast({
                  title: '删除成功',
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                })
                that.myselfinfo()
              } else {
                wx.showModal({
                  content: "删除失败",
                  showCancel: false
                });
              }
            }
          })
        } else if (sm.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  // 视频用户详情页
  userdetail: function(e) {
    var otherId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../index/userdetail/userdetail?otherId=' + otherId
    })
  },
  // 充值
  deposit: function() {
    // this.hideModal()
    wx.navigateTo({
      url: '../index/deposit/deposit',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },


})