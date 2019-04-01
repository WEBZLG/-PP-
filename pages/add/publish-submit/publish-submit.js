const app = getApp()
var t = getApp(),
  a = require("../../../common/util.js"),
  e = a.postUrl,
  i = a.getUrl,
  o = require("../../../common/vod-web-sdk-v5"),
  s = new(require("../../../common/qqmap-wx-jssdk.min.js"))({
    key: "W2GBZ-W6TA5-HSDI5-QNYNQ-6FP7Q-RNBQA"
  }),
  n = void 0;

Page({
  data: {
    uid:"",
    musicId:0,
    topicAreaShow: !1,
    topicAreaValue: "",
    description: "",
    submitData:'',
    date:"",
    disabled: false,//设置是否能点击 false可以 true不能点击
    isVip:!1,//是否是会员
    isDis:true,//是否限制人数
    isLimit: 1,//是否限制人数
    isShow:"none",//是否开启活动
    isActive:0,//是否是活动视频
    activeManNum:0,//男成员
    activeWomanNum:0,//女成员
    activeTitle:"",//活动标题
    activeContent:"",//活动内容
    activeTime:"",//活动时间
    activeAdress:"",//活动地点
    isPublish:false,
    locationFlag: !1,
    address: {
      longitude: "",
      latitude: "",
      location: "",
      city: ""
    },
    previewData: {},
    uploadPics: [],
    imagePreview: {
      indicatorDots: !1,
      current: 0,
      autoplay: !1,
      circular: !0,
      interval: 3e3,
      duration: 0
    },
    previewBoxFlag: !1,
    worksPubSwitch: !0,
    stickerid:"",
    stickerx:"",
    stickery:"",
    videoType:0
  },
  onLoad: function(a) {
    console.log(a.videoType)
    var options = JSON.parse(a.preData)
    const that = this
    that.setData({
      musicId: options.musicid,
      stickerid: options.stickerid,
      stickerx: options.stickerx,
      stickery: options.stickery,
      videoType: a.videoType
    })
    console.log(getCurrentPages())
    wx.getStorage({
      key: 'userUid',
      success(res) {
        console.log(res.data)
        that.setData({
          uid: res.data
        })
      }
    });
    n = wx.createInnerAudioContext();
    var e = getCurrentPages(),
    
      i = e[e.length - 2].data.previewData;
    this.setData({
        previewData: i
      }),
      this.setData({
        myVideo: wx.createVideoContext("myVideo")
      }),
      this.data.myVideo.pause();
  },
  onShow: function() {
    var a = this;
    a.resetLocation();
  },
  onHide: function() {
    this.setData({
      worksPubSwitch: !0
    }), this.data.myVideo.pause(), this.stopMusicFn();
  },
  onUnload: function() {
    this.data.myVideo.stop(), this.setData({
      myVideo: null
    }), this.stopMusicFn();
  },
  resetLocation: function() {
    var t = this;
    wx.getLocation({
      type: "gcj02",
      success: function(a) {
        t.setData({
          locationFlag: !0
        }), s.reverseGeocoder({
          location: {
            latitude: a.latitude,
            longitude: a.longitude
          },
          coord_type: 5,
          success: function(a) {
            t.setData({
              "address.latitude": a.result.location.lat,
              "address.longitude": a.result.location.lng,
              "address.location": a.result.address,
              "address.city": a.result.ad_info.city
            });
          },
          fail: function(t) {}
        });
      },
      fail: function(a) {
        t.setData({
          locationFlag: !1
        });
      }
    });
  },
  locationSwitch: function(t) {
    var a = this;
    t.detail.value ? wx.getSetting({
      success: function(t) {
        t.authSetting["scope.userLocation"] ? a.setData({
          locationFlag: !0
        }) : a.setData({
          showModalFlag: !0
        });
      }
    }) : this.setData({
      locationFlag: !1
    });
  },
  chooseLocation: function() {
    var t = this;
    wx.chooseLocation({
      success: function(a) {
        t.setData({
          "address.location": a.address,
          "address.latitude": a.latitude,
          "address.longitude": a.longitude
        });
      }
    });
  },
  closeModal: function() {
    this.setData({
      locationFlag: this.data.locationFlag,
      showModalFlag: !1
    });
  },
  openSetting: function() {
    var t = this;
    wx.openSetting({
      success: function(a) {
        t.resetLocation(), t.setData({
          showModalFlag: !1
        });
      }
    });
  },
  /**
* 日历控件绑定函数 
* 点击日期返回
*/
  onPickerChange: function (e) {
    console.log(e.detail);
    this.setData({
      date: e.detail.dateString,
      activeTime: e.detail.dateString+":00",
    })
    console.log(this.data.activeTime)
  },
  // 是否参加会员
  vipSwitch:function(event){
    const that = this;
    console.log(event)
    if (event.detail.value==true){
      that.setData({
        isShow : "block",
        isActive:1
      })
    }else{
      that.setData({
        isShow : "none",
        isActive:0
      })
    }
  },

  // 发布活动
  publishWorks:function(options){
    const that = this
    wx.showLoading({
      title: "发布中"
    });
    that.setData({
      description: options.detail.value.textarea,
      worksPubSwitch: !1,
      isPublish:true
      })
    console.log(that.data.previewData)
    const videoUrl = that.data.previewData.videoUrl.tempFilePath

    var formData = {};
    if(that.data.stickerid==""){
      console.log("参数1")
      formData = {
        'uid': that.data.uid,
        'rplace': that.data.address.location,
        'musicid': that.data.musicId,
        'content': that.data.description,
        'if_activity': that.data.isActive,
        'man': that.data.activeManNum,
        'woman': that.data.activeWomanNum,
        'if_limit': that.data.isLimit,
        'time': that.data.activeTime,
        'place': that.data.activeAdress,
        'title': that.data.activeTitle,
        'content': that.data.activeContent,
        "videotype": that.data.videoType
      }
    }else{
      console.log("参数2")
      formData = {
        'uid': that.data.uid,
        'rplace': that.data.address.location,
        'musicid': that.data.musicId,
        'content': that.data.description,
        'if_activity': that.data.isActive,
        'man': that.data.activeManNum,
        'woman': that.data.activeWomanNum,
        'if_limit': that.data.isLimit,
        'time': that.data.activeTime,
        'place': that.data.activeAdress,
        'title': that.data.activeTitle,
        'content': that.data.activeContent,
        "videotype": that.data.videoType,
        "str": JSON.stringify([{
          "img": that.data.stickerid,
          "overlay": that.data.stickerx + ":" + that.data.stickery,
          "scale": "80:80"
        }])
      }
    }
    wx.uploadFile({
      url: app.globalData.serverPath +"release",
      filePath: videoUrl,
      name: 'mp4',
      method:"POST",
      header:{
        'content-type':'multipart/form-data'
      },
      formData: formData ,
      success: function (res) {
        console.log(res)
        if(res.data==1){
          wx.hideLoading();
          wx.showToast({
            title: '发布成功',
            icon:"success"
          })
          that.setData({
            isPublish:false
          })
          wx.reLaunch({
            url: '../../myself/myself',
          })
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '发布失败,请检查网络重试！',
            icon: "none"
          })
          that.setData({
            isPublish: false
          })
        }
      }
    })
  },
  // 是否限制人数
  checkboxChange:function(event){
    const that = this
    if(event.detail.value==""){
      that.setData({
        isLimit:1,
        isDis:true
      })      
    }else{
      that.setData({
        isLimit: 0,
        isDis:false
      })
    }
  },
  // 男成员
  manInput:function(event){
    console.log(event)
    this.setData({
      activeManNum:event.detail.value
    })
  },
  // 女成员
  womanInput: function (event){
    this.setData({
      activeWomanNum: event.detail.value
    })
  },
  // 活动标题
  activeInput: function (event) {
    this.setData({
      activeTitle: event.detail.value
    })
  },
  // 活动内容
  contentInput: function (event) {
    this.setData({
      activeContent: event.detail.value
    })
  },
 
  // 活动地点
  addressInput: function (event) {
    this.setData({
      activeAdress: event.detail.value
    })
  },
  getPublishInfo: function(t) {
    if (this.setData({
        worksPubSwitch: !0
      }), 100777 != t.code)
      if (100200 == t.code) {
        if (this.setData({
            uploadPics: [],
            description: ""
          }), wx.showToast({
            title: "发布成功，等待审核中…",
            icon: "none",
            duration: 2e3
          }), t.data.carClubId) {
          var a = wx.getStorageSync("clubRecord") || [];
          a.forEach(function(e, i) {
            e.clubId == t.data.carClubId && a.splice(i, 1);
          }), a.unshift({
            clubId: t.data.carClubId,
            clubName: t.data.clubName
          }), a = a.length > 10 ? a.slice(0, 10) : a, wx.setStorageSync("clubRecord", a);
        }
        wx.reLaunch({
          url: "/pages/publish/works-preview/works-preview?worksId=" + t.data.id + "&type=" + t.data.type
        });
      } else wx.showToast({
        title: "发布失败, 请稍后重试",
        icon: "none",
        duration: 2e3
      });
    else wx.showToast({
      title: "发布失败, 请检查是否包含敏感词等信息!",
      icon: "none",
      duration: 2e3
    });
  },
  gotoPubOriginPage: function() {
    wx.navigateBack()
  },
  uploadDIY: function(a, i, o) {
    var s = this,
      n = this;
    wx.uploadFile({
      url: t.globalData.PIC_UPLOAD_URL,
      filePath: a[i].src,
      name: "file",
      header: {
        "content-type": "multipart/form-data"
      },
      success: function(t) {},
      fail: function(t) {},
      complete: function(c) {
        i++;
        var l = n.data.uploadPics;
        if (l.push(c.data), n.setData({
            uploadPics: l
          }), i == o) {
          var r = n.data.previewData.detailData;
          r.forEach(function(t, a) {
            t.src = l[a], delete t.bottom;
          }), s.setData({
            "submitData.detailData": JSON.stringify(r)
          }), e({
            url: t.globalData.SAVE_WORKS_URL,
            data: n.data.submitData,
            callback: n.getPublishInfo
          });
        } else s.uploadDIY(a, i, o);
      }
    });
  },
  getSignature: function(a) {

  },
  previewBoxShow: function() {
    // this.setData({
    //   previewBoxFlag: !0
    // }), this.data.myVideo.play(), this.initMusicPlay();
  },
  previewBoxHide: function() {
    this.setData({
      previewBoxFlag: !1
    }), this.data.myVideo.pause(), this.stopMusicFn();
  },
  stopTouchMove: function() {
    return !1;
  },
  initMusicPlay: function() {
    var t = this;
    this.setData({
      "imagePreview.current": 0,
      "imagePreview.autoplay": !0
    }), this.data.previewData.music && (this.playMusicFn(this.data.previewData.music.url),
      1 == this.data.previewData.detailData.length && this.setData({
        musicTimer: setInterval(function(a) {
          t.playMusicFn(t.data.previewData.music.url);
        }, 1e4)
      }));
  },
  playMusicFn: function(t) {
    n.destroy(), (n = wx.createInnerAudioContext()).title = "背景音乐", n.autoplay = !0,
      n.loop = !0, n.src = t;
  },
  stopMusicFn: function() {
    clearInterval(this.data.musicTimer), this.setData({
      musicTimer: null,
      "imagePreview.autoplay": !1
    }), n.stop();
  },
  swiperBindchange: function(t) {
    this.data.previewBoxFlag && this.data.previewData.music && 0 == t.detail.current && this.playMusicFn(this.data.previewData.music.url);
  }
});