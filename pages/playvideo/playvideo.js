const app = getApp()
const ctx = wx.createCanvasContext('shareCanvas')
Page({

  data: {
    indexList: [],//获取首页数组
    sendId: "",//发布人的id
    uid: '',//自己的id
    content: '',//发布介绍
    url: '',//视频地址
    pic: '',//第一帧图片
    id: '',//作品ID
    wxname: '',//发布人昵称
    wximage: '',//发布人头像
    name: '',//歌曲名
    if_pass: '',//是否认证
    if_activity: '',//1为发布活动 0为普通发布
    likenum: '',//点赞数
    commentnum: '',//评论数
    sharenum: '',//分享数
    top: '',//送礼物排行榜
    relation: '',//关注/为关注
    if_like: '', //0点赞  1未点赞
    isVip: null,// 是否是vip
    content: '',//内容
    commentList: [],
    //播放按钮
    display_play: 'none',
    //点击评论隐藏图标
    display_pl: 'block',
    count: 1,//视频爱心点赞
    commentcount: 1,//评论点赞
    index_num: 1,
    play: 'none',
    inputValue: '',//发送评论的内容
    index: 1,
    vid: 0,
    pageIndex: 0,
    videoToggle: {
      data: {},
      isReady: !1,
      loading: !1,
      flag: 0
    },
    videoPlay: !0,
    videoPlayFlag: !0,
    isShow: "blcok",//蒙版展示,
    goodsList: [],//礼物列表
    goodIntegral: "",//礼物积分,
    isActiveVideo: false,
    activeId: "",//活动id
    activeSex: "",//参加活动性别
    nowAddress: "火星",
    showPoster: "none",
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().screenHeight
  },
  // 视频用户详情页
  userdetail: function () {
    wx.navigateTo({
      url: './userdetail/userdetail',
    })
  },
  //地址
  switchcity: function () {
    wx.navigateTo({
      url: '../switchcity/switchcity'
    })
  },
  //搜索
  search: function () {
    wx.navigateTo({
      url: './search/search'
    })
  },
  // 充值
  deposit: function () {
    this.hideModal()
    wx.navigateTo({
      url: '../index/deposit/deposit',
    })
  },

  // 评论点赞
  commentCollect: function (e) {
    // console.log(e);
    var that = this;
    // var vid = e.currentTarget.dataset.id;
    if (this.data.commentcount == 1) {
      that.setData({
        fav: -1,
        comment_not_zan: true,
        commentcount: 2
      })
    } else {
      that.setData({
        fav: 0,
        comment_not_zan: false,
        commentcount: 1
      })
    }
  },

  handletouchmove: function (a) {
    if (0 === this.data.videoToggle.flag) {
      var t = a.touches[0].pageX,
        e = a.touches[0].pageY,
        o = t - this.data.lastX,
        s = e - this.data.lastY, i = "";
      switch (Math.abs(o) > Math.abs(s) ? o < -10 ? (i = "向左滑动", this.setData({
        "videoToggle.flag": 1
      })) : o > 10 && (i = "向右滑动", this.setData({
        "videoToggle.flag": 2
      })) : s < -10 ? (i = "向上滑动", this.setData({
        "videoToggle.flag": 3
      })) : s > 10 && (i = "向下滑动", this.setData({
        "videoToggle.flag": 4
      })), i) {
        case "向上滑动":
          this.videoToggleNext();
          // console.log("向上")
          break;
        case "向下滑动":
          this.videoTogglePrev();
        // console.log("向下")
      }
      this.setData({
        lastX: t,
        lastY: e
      });
    }
  },
  handletouchstart: function (a) {
    this.setData({
      lastX: a.touches[0].pageX,
      lastY: a.touches[0].pageY
    });
  },
  handletouchend: function (a) {
    this.setData({
      "videoToggle.flag": 0
    });
  },
  videoTogglePrev: function () {
    var that = this;
    if (this.data.pageIndex == 0) {
      wx.showToast({
        title: '到顶了哦~木有视频了！',
        icon: "none"
      })
    } else {
      this.setData({
        display_play: 'none',
        pageIndex: that.data.pageIndex - 1
      })
      console.log(that.data.pageIndex)
      that.getPageVideoMessage()
    }
  },
  videoToggleNext: function () {
    var that = this;
    this.setData({
      display_play: 'none',
      pageIndex: that.data.pageIndex + 1
    })
    // console.log(that.data.pageIndex)
    that.getPageVideoMessage()
  },
  videoHandle: function (a) {
    this.data.videoPlay ? (
      this.setData({
        videoPlayFlag: !1,
        videoInfoHide: !1,
        videoPlay: !1,
        display_play: 'block'
      }),
      this.videoContext.pause()
    ) : (
        this.setData({
          videoPlayFlag: !0,
          videoInfoHide: !0,
          videoPlay: !0,
          display_play: 'none'
        }),
        this.videoContext.play()
      );
  },

  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log(e.detail.value)
  },

  //播放结束
  bindended: function (e) {
    this.setData({
      display_play: 'block',
      videoPlay: !1,
    })
  },


  //评论弹窗
  showModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      heighTrue: false,
      video_heighe: 45,
      ball_height: 1,
      display_pl: 'none',
      isShow: "none"
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏礼物
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showGiftsStatus: false,
        heighTrue: true,
        isShow: "block",
        display_pl: 'block'
      })
    }.bind(this), 200)
  },
  // 获取礼物数据
  getGoods: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.serverPath + 'giftlist',
      data: { "uid": that.data.uid },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        res.data.giftlist && res.data.giftlist.map((item, index) => {
          item.pic = "https://" + item.pic
        })
        that.setData({
          goodsList: res.data.giftlist,
          goodIntegral: res.data.nowintegral
        })
        that.showgiftsModal()
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

  //礼物显示
  showgiftsModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationgifts: animation.export(),
      showGiftsStatus: true,
      isShow: "none",
      display_pl: 'none'
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationgifts: animation.export()
      })
    }.bind(this), 200)
  },
  // 送出礼物

  sendGift: function (e) {
    var that = this;
    console.log(e)
    wx.request({
      url: app.globalData.serverPath + 'indexsendgift',
      data: {
        uid: that.data.uid,
        income_uid: that.data.sendId,
        sendintegral: e.currentTarget.dataset.score
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.info == "Insufficient integral") {
          wx.showToast({
            title: '积分不足，请充值！',
            icon: "none"
          })
        } else if (res.data.info == "succss") {
          console.log(res.data.info)
        } else {
          console.log(res.data.info)
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  //隐藏评论
  hidegiftsModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationgifts: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationgifts: animation.export(),
        showModalStatus: false,
        heighTrue: true,
        isShow: "block",
        display_pl: 'block',
      })
    }.bind(this), 200)
  },

  // 获取评论信息
  getCommentMessage: function (e) {
    var that = this;
    console.log(e)
    var rid = e.currentTarget.dataset.id
    wx.showLoading()
    wx.request({
      url: app.globalData.serverPath + 'indexcomment',
      data: {
        rid: rid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        that.setData({
          commentList: res.data
        })
        that.showModal()

      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  // 发送评论
  sendCommentMessage: function () {
    var that = this;
    wx.showLoading()
    wx.request({
      url: app.globalData.serverPath + 'sendcomment',
      data: {
        uid: that.data.uid,
        rid: that.data.id,
        content: that.data.inputValue
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.info == "success") {
          var commentNum = `indexList.commentnum`
          that.setData({
            inputText: "",
            [commentNum]: that.data.indexList.commentnum + 1
          })
          wx.showToast({
            title: '评论成功！',
          })
          that.hidegiftsModal()
        } else {
          wx.showToast({
            title: '评论失败！' + res.info,
            icon: "none"
          })
          that.hidegiftsModal()
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  // 点赞功能
  like: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.serverPath + 'index_like',
      data: {
        uid: that.data.uid,
        rid: that.data.id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.info == "success") {
          if (res.data.if_like == 0) {
            that.setData({
              if_like: 1
            })
          } else {
            that.setData({
              if_like: 0
            })
          }
          // var likeNum = that.data.indexList.likenum
          if (res.data.if_like == 0) {
            that.setData({
              likeNum: that.data.likeNum + 1
            })
          } else {
            that.setData({
              likeNum: that.data.likeNum - 1
            })
          }
        } else {
          wx.showToast({
            title: '点赞失败！' + res.data.info,
            icon: "none"
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  // 参加活动
  joinAvtive: function (e) {
    var that = this
    wx.request({
      url: app.globalData.serverPath + 'join_activity',
      data: {
        uid: that.data.uid,
        aid: that.data.activeId,
        sex: that.data.activeSex
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.result == "success") {
          wx.showToast({
            title: res.data.info,
            icon: "success"
          })
        } else if (res.data.result == "no") {
          wx.showToast({
            title: res.data.info,
            icon: "none"
          })
        } else if (res.data.result == "not") {
          wx.showToast({
            title: res.data.info,
            icon: "none"
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading()
    var that = this;
    wx.setNavigationBarTitle({
      title: "小PP短视频",
    })
    wx.getStorage({
      key: 'userUid',
      success(res) {
        that.setData({
          uid: res.data
        });
      }
    });
    wx.getStorage({
      key: 'userMessage',
      success(res) {
        var sex = res.data.gender == 1 ? "男" : "女"
        that.setData({
          activeSex: sex
        });
      }
    });
    wx.request({
      url: app.globalData.serverPath + "release_one",
      data: {
        "uid": options.uid,
        "rid": options.videoId
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        that.setData({
          display_play: 'none',
          indexList: res.data,
          sendId: res.data.uid,
          isActiveVideo: res.data.if_activity,
          isVip: res.data.if_pass,
          if_like: res.data.if_like,
          activeId: res.data.aid,
          likeNum: res.data.likenum
        })

      }
    })
  },
  onShow: function () {
  },
  onHide: function () {
    this.setData({
      display_play: 'block'
    })
    this.videoContext.pause();
  },
  // 分享事件
  showShareBox: function () {
    this.showShareModal();
    wx.hideTabBar();
  },
  showShareModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationgifts: animation.export(),
      showShareStatus: true,
      isShow: "none",
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationgifts: animation.export()
      })
    }.bind(this), 200)
  },
  hideShareModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      isShow: "block",
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showShareStatus: false,
        heighTrue: true,
      })
    }.bind(this), 200)
    wx.showTabBar()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    that.hideShareModal()
    var uid = ops.target.dataset.uid;
    var videoId = ops.target.dataset.vid
    // if(ops.from==='button'){}
    return {
      title: '小pp短视频',
      path: '/pages/playvideo/playvideo?uid=' + uid + '&videoId=' + videoId,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功！',
        })
        var shareNum = `indexList.sharenum`
        that.setData({
          [shareNum]: that.data.indexList.sharenum + 1
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: "none"
        })
        that.hideShareModal()
      }
    }
  },
  // 生成海报
  getImage: function (url) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: function (res) {
          resolve(res)
        },
        fail: function () {
          reject("")
        }
      })
    })
  },
  getImageAll: function (image_src) {
    let that = this;
    var all = [];
    image_src.map(function (item) {
      all.push(that.getImage(item))
    })
    return Promise.all(all)
  },
  //创建
  create: function () {
    // wx.showLoading()
    let that = this;
    //图片一把是通过接口请求后台，返回俩点地址，或者网络图片
    let bg = 'http://statics.logohhh.com/forum/201610/24/170644l325qooyabhioyaa.jpg';
    let qr = 'http://image.weiued.com/UploadImages/question/20170420/3e384842-6af7-44cb-aeb1-f427731c8271.jpg';
    let wW = that.data.windowWidth;
    let wH = that.data.windowHeight;
    //图片区别下载完成，生成临时路径后，在进行绘制
    this.getImageAll([bg, qr]).then((res) => {
      let bg = res[0];
      let qr = res[1];
      let ctx = wx.createCanvasContext('canvas');
      ctx.drawImage(bg.path, 0, 0, wW - 100, wH - 250);
      ctx.drawImage(qr.path, qr.width - 100, wH - qr.height - 130, qr.width * 0.4, qr.height * 0.4)
      ctx.setFontSize(20)
      ctx.setFillStyle('red')
      ctx.fillText('Hello world', qr.width - 100, wH - qr.height - 150)
      ctx.draw()
      that.setData({
        showPoster: "block"
      })
      console.log(that.data.showPoster)
      that.hideShareModal()
      wx.showModal({
        title: '提示',
        content: '图片绘制完成请保存到相册',
        showCancel: false,
        confirmText: "点击保存",
        success: function (res) {
          var shareNum = `indexList.sharenum`
          that.setData({
            showPoster: "none",
            [shareNum]: that.data.indexList.sharenum + 1
          })
          that.save()
        }
      })
    })
  },
  //保存
  save: function () {
    wx.canvasToTempFilePath({//canvas 生成图片 生成临时路径
      canvasId: 'canvas',
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({ //下载图片
          filePath: res.tempFilePath,
          success: function () {
            wx.showToast({
              title: "保存成功",
              icon: "success",
            })
          }
        })
      }
    })
  }
})
