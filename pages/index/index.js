const app = getApp()
const ctx = wx.createCanvasContext('shareCanvas')
const s = new (require("../../common/qqmap-wx-jssdk.min.js"))({
  key: "W2GBZ-W6TA5-HSDI5-QNYNQ-6FP7Q-RNBQA"
})
Page({

  data: {
    kongList:[],
    pageList:[],//分页数组
    indexList: [],//获取首页数组
    sendId:"",//发布人的id
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
    ifRelation: '',//关注/为关注
    if_like: '', //0点赞  1未点赞
    isVip:null,// 是否是vip
    content: '',//内容
    commentList: [],
    //播放按钮
    display_play: 'none',
    //点击评论隐藏图标
    display_pl: 'block',
    count: 1,//视频爱心点赞
    commentcount:1,//评论点赞
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
    isAdvertising:'none',//广告弹窗
    advertisingData:"",//广告数据
    advertisingNum:'5',
    isShow:"blcok",//蒙版展示,
    goodsList:[],//礼物列表
    goodIntegral:"",//礼物积分,
    isActiveVideo:false,
    activeId:"",//活动id
    activeSex:"",//参加活动性别
    nowAddress:"火星",
    wordsList:[
      {
        id:1,
        content:"大哥不差钱！"
      },{
        id:"2",
        content:"视频太棒了，赏你的！"
      }, {
        id: "3",
        content: "嗯！大哥看好你！"
      }, {
        id: "4",
        content: "想和你去兜兜风！"
      }
    ],
    sendintegral:"",
    giftId:"",
    showPoster:"none",
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().screenHeight
  },
  onReady: function (res) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdevertising();
    var that = this;
    this.videoContext = wx.createVideoContext('myVideo')
    wx.setNavigationBarTitle({
      title: "小PP短视频",
    })

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
          console.log(app.globalData.userInfo)
          if (app.globalData.userInfo==null){
              wx.getStorage({
                key: 'userMessage',
                success(res) {
                  console.log(res)
                  var sex = res.data.gender == 1 ? "男" : "女"
                  that.setData({
                    activeSex: sex
                  });
                }
              });
          } else if (app.globalData.uid == null){
            wx.getStorage({
              key: 'userUid',
              success(res) {
                console.log(res)
                that.setData({
                  uid: res.data
                });
              }
            });
          }else{
            var sex = app.globalData.userInfo.gender == 1 ? "男" : "女"
            that.setData({
              uid: app.globalData.uid,
              activeSex: sex
            });
          }
          console.log("zouzhe")
          that.getVideoMessage()
          // 获取当前位置
          wx.getLocation({
            type: "gcj02",
            success: function (a) {
              that.setData({
                locationFlag: !0
              }), s.reverseGeocoder({
                location: {
                  latitude: a.latitude,
                  longitude: a.longitude
                },
                coord_type: 5,
                success: function (a) {
                  console.log(a)
                  that.setData({
                    nowAddress: a.result.ad_info.province + a.result.ad_info.city
                  });
                },
                fail: function (t) { }
              });
            },
            fail: function (a) {
              that.setData({
                locationFlag: !1
              });
            }
          });
        } else {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

  onShow: function () {
    
  },
  // 广告
  getAdevertising:function(){
    var that = this;
    wx.request({
      url: app.globalData.serverPath + 'index_advertising',
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if(res.data.start==0){
            that.setData({
              isAdvertising:"block",
              advertisingData:res.data
            })
            var advertising = setInterval(function(){
            that.setData({
              advertisingNum: that.data.advertisingNum-1
            })
            if (that.data.advertisingNum<=0){
              clearInterval(advertising)
              that.setData({
                isAdvertising:"none"
              })
            }
          },1000)
        }
      },
      fail: function (err) { },
      complete: function () { }
    })
  },
  // 关闭广告
  closeAvertising:function(){
    this.setData({
      isAdvertising: "none"
    })
  },
  // 礼物top3详情
  giftPersonMessage:function(e){
    var otherId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './userdetail/userdetail?otherId=' + otherId
    })
  },
  // 视频用户详情页
  userdetail: function () {
    var otherId = this.data.sendId
    wx.navigateTo({
      url: './userdetail/userdetail?otherId=' + otherId 
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
  deposit:function(){
    this.hideModal()
    wx.navigateTo({
      url: './deposit/deposit',
    })
  },


// 评论点赞
  commentCollect:function(e){
    // console.log(e);
    var that=this;
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
          break;

        case "向下滑动":
          this.videoTogglePrev();
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
    if (this.data.pageIndex==0){
      wx.showToast({
        title: '到顶了哦~木有视频了！',
        icon:"none"
      })
    }else{
      this.setData({
        pageIndex : that.data.pageIndex-1,
        indexList: that.data.kongList.concat(that.data.pageList[that.data.pageIndex-1]),
      })
    }
  },
  videoToggleNext: function () {
    var that = this;
    var pageIndexLength = that.data.pageIndex+1
    var pageListLength = that.data.pageList.length
    console.log(pageIndexLength,pageListLength)
    if (pageIndexLength < pageListLength){
      console.log(that.data.pageList)
      console.log(that.data.pageIndex)

      this.setData({
        indexList: that.data.kongList.concat(that.data.pageList[that.data.pageIndex]),
        pageIndex: that.data.pageIndex + 1,
      })
      console.log(that.data.pageIndex)
    }else{
      this.setData({
        pageIndex: that.data.pageIndex + 1
      })
      that.getVideoMessage()
    }
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
      videoPlay:!0,
      display_play: 'none'
      }), 
      this.videoContext.play()
      );
  },

  bindInput: function (e) {
    this.setData({
      inputValue : e.detail.value
    })
  },

  //播放结束
  bindended:function(e){
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
      isShow:"none"
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
      isShow: "block",
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showGiftsStatus: false,
        heighTrue: true,
        
        display_pl: 'block'
      })
    }.bind(this), 200)
  },
  // 获取礼物数据
  getGoods:function(e){
  var that = this;
  console.log(that.data.uid)
    wx.request({
      url: app.globalData.serverPath + 'giftlist',
      data: {"uid":that.data.uid},
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
          goodsList:res.data.giftlist,
          goodIntegral:res.data.nowintegral
          })
       that.showgiftsModal()
      },
      fail: function (err) { }, 
      complete: function () { }  
    })
  },
  imageError:function(e){
    console.log(e)
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
  //礼物留言显示
  showWordsModal: function () {
    console.log(this.data.isShow)
    this.setData({
      isShow:"none"
    })
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationgifts: animation.export(),
      showWordsStatus: true,
      isShow: "none"
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationgifts: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏礼物留言
  hideWordsModal: function () {
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
        showWordsStatus: false,
        isShow: "block"
      })
    }.bind(this), 200)
  },
  chooseGift:function(e){
    this.setData({
      sendintegral : e.currentTarget.dataset.score,
      giftId : e.currentTarget.dataset.id,
    
    })
    this.hideModal()
    this.showWordsModal()
  },
  // 送出礼物 
  sendGift:function(e){
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '赠送礼物？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: app.globalData.serverPath + 'indexsendgift',
            data: {
              uid: that.data.uid,
              gid: that.data.giftId,
              income_uid: that.data.sendId,
              sendintegral: that.data.sendintegral,
              content: e.currentTarget.dataset.content
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
              that.hideWordsModal()
              console.log(res)
              if (res.data.info == "Insufficient integral") {
                wx.showToast({
                  title: '积分不足，请充值！',
                  icon: "none"
                })
              } else if (res.data.info == "success") {
                console.log(res.data.info)
                wx.showToast({
                  title: '赠送成功！',
                  icon: "none"
                })
              } else {
                console.log(res.data.info)
                wx.showToast({
                  title: '赠送失败！',
                  icon: "none"
                })
              }
            },
            fail: function (err) { that.hideWordsModal() },
            complete: function () { that.hideWordsModal() }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
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
  // 获取视频信息
  getVideoMessage: function () {
    console.log(132)
    var that = this;
    wx.showLoading()
    wx.request({
      url: app.globalData.serverPath + 'index',
      data: {
        uid: that.data.uid
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        that.setData({
          display_play: 'none',
          indexList: res.data,
          sendId:res.data[0].uid,
          isActiveVideo: res.data[0].if_activity,
          isVip: res.data[0].if_pass,
          if_like:res.data[0].if_like,
          activeId: res.data[0].aid,
          ifRelation:res.data[0].relation,
          likenum: res.data[0].likenum,
          id:res.data[0].id,
          pageList: that.data.pageList.concat(res.data[0])
        })

      },
      fail: function (err) { },
      complete: function () { }
    })
  },
  // 获取分页视频
  getPageVideoMessage:function(e){
    var that = this;
    console.log(that.data.uid, that.data.pageIndex)
    console.log()
    wx.request({
      url: app.globalData.serverPath + 'indexpage',
      data: {
        uid: that.data.uid,
        page:that.data.pageIndex
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if(res.data.length == 0){
          that.setData({
            display_play: 'none',
            pageIndex:0
          })
        }else{
          that.setData({
            display_play: 'none',
            indexList: res.data
          })
        }
      },
      fail: function (err) { },
      complete: function () { }
    })
  },
  // 获取评论信息
  getCommentMessage: function (e) {
    var that = this;
    var rid = e.currentTarget.dataset.id
    console.log(rid)
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
      fail: function (err) { }, 
      complete: function () { }  
    })
  },
  // 发送评论
  sendCommentMessage: function () {
    var that = this;
    wx.showLoading()
    console.log(that.data.uid, that.data.id)
    wx.request({
      url: app.globalData.serverPath + 'sendcomment',
      data: {
        uid:that.data.uid, 
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
        if(res.data.info == "success"){
          var commentNum = `indexList[0].commentnum`
            that.setData({
              inputText:"",
              [commentNum]: that.data.indexList[0].commentnum+1
            })
            wx.showToast({
              title: '评论成功！',
            })
          console.log(that.data.indexList[0].commentnum)
          that.hidegiftsModal()
        }else{
          wx.showToast({
            title: '评论失败！' + res.info,
            icon:"none"
          })
          that.hidegiftsModal()
        }
      },
      fail: function (err) { }, 
      complete: function () { }  
    })
  },
  // 点赞功能
  like:function(e){
    var that = this;
    console.log(that.data.uid)
    console.log(e)
    wx.request({
      url: app.globalData.serverPath + 'index_like',
      data: {
        uid: that.data.uid,
        rid: e.currentTarget.dataset.id
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
              if_like: 0
            })
          } else {
            that.setData({
              if_like: 1
            })
          }
          if (res.data.if_like == 0) {
            that.setData({
              likenum: that.data.likenum + 1
            })
          } else {
            that.setData({
              likenum: that.data.likenum - 1
            })
          }
        } else {
          wx.showToast({
            title: '点赞失败！' + res.data.info,
            icon: "none"
          })
        }
      },
      fail: function (err) { },
      complete: function () { }
    })
  },
  // 活动详情
  textclick:function(e){
    console.log(e)
    var activeId = e.currentTarget.dataset.aid
    wx.navigateTo({
      url: '../focus/active/active?id='+activeId,
    })
  },
  // 参加活动
  joinAvtive:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定参加此活动？',
      success: function (sm) {
        if (sm.confirm) {
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
            fail: function (err) { }, 
            complete: function () { }  
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  onHide:function(){
    console.log("隐藏")
    this.videoContext.pause();
    // this.setData({
    //   display_play: 'block'
    // })
  },
  onUnload: function () {
    this.videoContext.pause();
  },
  // 分享事件
  showShareBox:function(){
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
    var that = this;
    that.hideShareModal()
    console.log("分享")
    console.log(ops)
    var uid = ops.target.dataset.uid;
    var videoId = ops.target.dataset.vid
    // if(ops.from==='button'){}
    return {
      title:'小pp短视频',
      path: '/pages/playvideo/playvideo?uid='+uid+'&videoId='+videoId,
      success: function (res) {
        console.log(res)
        // 转发成功
        wx.showToast({
          title: '转发成功！',
        })
        var sharenum = `indexList[0].sharenum`
        that.setData({
          [sharenum]: that.data.indexList[0].sharenum + 1
        })

      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon:"none"
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
    console.log("哎呀！我被点了")
    wx.showLoading()
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
      ctx.drawImage(bg.path, 0, 0, wW-100, wH-250);
      ctx.drawImage(qr.path, qr.width-100, wH - qr.height - 130, qr.width * 0.4, qr.height * 0.4)
      ctx.setFontSize(20)
      ctx.setFillStyle('red')
      ctx.fillText('Hello world', qr.width - 100, wH - qr.height - 150)
      ctx.draw()
      wx.hideLoading()
      that.setData({
        showPoster: "block"
      })

      that.hideShareModal()
      wx.showModal({
        title: '提示',
        content: '图片绘制完成请保存到相册',
        showCancel: false,
        confirmText: "点击保存",
        success: function (res) {
          var sharenum = `indexList[0].sharenum`
          that.setData({
            showPoster: "none",
            [sharenum]: that.data.indexList[0].sharenum + 1
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
