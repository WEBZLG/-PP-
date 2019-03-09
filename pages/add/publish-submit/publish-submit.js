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
    topicAreaShow: !1,
    topicAreaValue: "",
    description: "",
    submitData:'',
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
    worksPubSwitch: !0
  },
  onLoad: function(a) {
    const that = this
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
  publishWorks:function(options){
    const that = this
    wx.showLoading({
      title: "发布中"
    });
    that.setData({
      description: options.detail.value.textarea,
      worksPubSwitch: !1
      })
    const videoUrl = that.data.previewData.videoUrl.tempFilePath
    console.log(that.data.uid)    
    console.log(that.data.description)
    console.log(that.data.address.location)
    console.log(that.data.previewData)
    wx.uploadFile({
      url: app.globalData.serverPath +"release",
      filePath: videoUrl,
      name: 'mp4',
      method:"POST",
      header:{
        'content-type':'multipart/form-data'
      },
      formData: {
        'uid': that.data.uid,
        'rplace': that.data.address.location,
        'if_activity':0,
        'musicid':1,
        'content': that.data.description
      },
      success: function (res) {
        
        console.log(res)
        if(res.data==1){
          wx.hideLoading();

        }
        console.log(res.data)
      }

    })
  },
  // publishWorks: function(a) {
  //   var i = this;
  //   if (this.data.worksPubSwitch)
  //     wx.showLoading({
  //       title: "发布中"
  //     });
  //   var s = this,
  //     n = {
  //       status: a.detail.target.dataset.status
  //     };
  //     this.setData({
  //       description: a.detail.value.textarea
  //     }),
  //     this.setData({
  //       worksPubSwitch: !1
  //     }),
  //     n = Object.assign({}, n, {
  //       description: s.data.description,
  //     }),
  //     console.log(n)
  //     s.data.locationFlag && (n = Object.assign({}, n, {
  //       longitude: s.data.address.longitude,
  //       latitude: s.data.address.latitude,
  //       location: s.data.address.location,
  //       city: s.data.address.city
  //     })),
  //     this.setData({
  //       submitData: n
  //     }),
  //     s.setData({
  //       "submitData.type": 3
  //     }),
  //     o.start({
  //       videoFile: s.data.previewData.videoUrl,
  //       getSignature: s.getSignature,
  //       success: function(t) {},
  //       error: function(t) {
  //         wx.showModal({
  //           title: "视频上传失败"
  //         }), i.setData({
  //           worksPubSwitch: !0
  //         }), wx.hideLoading();
  //       },
  //       progress: function(t) {},
  //       finish: function(a) {
  //         var i = [{
  //           text: "",
  //           src: a.videoUrl
  //         }];
  //         s.setData({
  //           "submitData.videoFileId": a.fileId,
  //           "submitData.detailData": JSON.stringify(i)
  //         }), e({
  //           url: t.globalData.SAVE_WORKS_URL,
  //           data: s.data.submitData,
  //           callback: s.getPublishInfo
  //         });
  //       }
  //     });
  // },
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
    // t.globalData.publishOrigin.path.includes("/tabBar/") ? wx.switchTab({
    //   url: t.globalData.publishOrigin.path
    // }) : wx.reLaunch({
    //   url: t.globalData.publishOrigin.path
    // }), t.globalData.previewData = {}, t.globalData.publishOrigin = {};
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
    // wx.request({
    //   url: app.globalData.serverPath,
    //   method: "GET",
    //   success: function(t) {
    //     if (!t.data.code || 100200 != t.data.code) return "获取签名失败";
    //     a(t.data.flag);
    //   },
    //   error: function(t) {}
    // });
  },
  previewBoxShow: function() {
    this.setData({
      previewBoxFlag: !0
    }), this.data.myVideo.play(), this.initMusicPlay();
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