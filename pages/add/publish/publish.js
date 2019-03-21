var t, e = getApp();

Page({
    data: {
        token: "",
        tokenFlag: !0,
        devicePosition: "back",
        flash: "off",
        cameraType: 0,
        recordState: 0,
        time: 30,
        timeFlag: "",
        setTime:'',
        limitTime:15,
        stepWidth: 0,
        camSetFlag: !0,
        camSetBtn:0,
        previewData: {
        },
        vWidth: "",
        vHeight: "",
        networkImageUrl: e.globalData.IMAGE_URL
    },
    onLoad: function(e) {
      var that = this;
      wx.hideTabBar(), t = wx.createCameraContext();
      wx.getSystemInfo({
        success: function (res) {
          var ww = res.windowWidth
          var wh = res.windowHeight
          console.log(ww, wh)
          that.setData({
            vWidth: ww,
            vHeight: wh
          })
        }
      })
    },
    onShow: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
              console.log(e)
                e.authSetting["scope.camera"] && t.setData({
                    camSetFlag: !0
                }), 1 == t.data.recordState && (e.authSetting["scope.record"] ? t.recordVideo() : wx.showModal({
                    content: "请授权录音功能",
                    showCancel: !1,
                    cancelText: "取消",
                    cancelColor: "#333333",
                    confirmText: "确定",
                    confirmColor: "#333333",
                    success: function(t) {
                        t.cancel || wx.openSetting();
                    }
                }));
            }
        });
    },
    onUnload: function() {
        clearInterval(this.data.timeFlag);
    },
    cameraError: function() {
        this.setData({
            camSetBtn: !0
        });
    },
    cameraSetSwitch: function(t) {
        wx.openSetting();
    },
    stepFormat: function(t) {
      return 100 - t / 30 * 100;
    },
    // 摄像头翻转
    deviceRadioChange: function() {
        this.setData({
            devicePosition: "back" == this.data.devicePosition ? "front" : "back"
        });
    },
    flashRadioChange: function() {
        this.setData({
            flash: "off" == this.data.flash ? "on" : "off"
        });
    },
    // switchChange: function(t) {
    //     this.data.cameraType != t.currentTarget.dataset.type && (clearInterval(this.data.timeFlag), 
    //     this.setData({
    //         cameraType: t.currentTarget.dataset.type,
    //         recordState: 0,
    //         timeFlag: "",
    //         // time: 30,
    //         stepWidth: 0
    //     }));
    // },
    // takePhoto: function() {
    //     var t = this, e = this;
    //     wx.createCameraContext(this).takePhoto({
    //         quality: "normal",
    //         success: function(a) {
    //             var i = [], o = {
    //                 text: "",
    //                 src: a.tempImagePath
    //             };
    //             i.push(o), t.setData({
    //                 "previewData.type": "image",
    //                 "previewData.detailData": i
    //             }), e.gotoEditPage();
    //         }
    //     });
    // },
    recordVideo: function() {
        var e = this, a = this;
        var index = 0

        wx.setKeepScreenOn({
            keepScreenOn: !0
        }), a.setData({
            recordState: 1,
            time: 30
        }), t.startRecord({
            success: function(t) {
              e.setData({
                setTime: setInterval(function () {
                  index++
                  if (index > e.data.limitTime) {
                    clearInterval(e.data.setTime)
                    e.stopRecord()
                  }
                  console.log(index)
                }, 1000)

              });
              e.setData({
                  timeFlag: setInterval(function() {
                      e.setData({
                          time: e.data.time - .1,
                          stepWidth: e.stepFormat(e.data.time - .1)
                      });
                  }, 100)
              });
            },
                
            timeoutCallback: function(t) {
                0 != e.data.recordState && (wx.showLoading({
                    title: "视频生成中",
                    mask: !0
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 5e3), e.endRecordHandle(t));
            },
            fail: function(t) {
                wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.record"] || wx.showModal({
                            content: "请授权录音功能",
                            showCancel: !1,
                            cancelText: "取消",
                            cancelColor: "#333333",
                            confirmText: "确定",
                            confirmColor: "#333333",
                            success: function(t) {
                              console.log(t)
                              if (t.cancel){
                                  wx.openSetting();
                                }else{
                                e.setData({
                                  setTime: setInterval(function () {
                                    index++
                                    if (index > e.data.limitTime) {
                                      clearInterval(e.data.setTime)
                                      e.stopRecord()
                                    }
                                    console.log(index)
                                  }, 1000)
                                })
                              }
                            }
                        });
                    }
                });
            }
        });

    },
    stopRecord: function() {
        var e = this;
        clearInterval(e.data.setTime)
        2 != this.data.recordState && (this.setData({
            recordState: 2
        }), clearInterval(this.data.timeFlag), wx.showLoading({
            title: "视频生成中",
            mask: !0
        }), setTimeout(function() {
            wx.hideLoading();
        }, 5e3), t.stopRecord({
            success: function(t) {
                e.endRecordHandle(t);
            }
        }));
    },
    endRecordHandle: function(t) {
        wx.hideLoading();
        var a = this;
        clearInterval(this.data.timeFlag), a.setData({
            time: 30,
            stepWidth: 0,
            "previewData.type": "video",
            "previewData.videoType": 1,
            "previewData.videoUrl": {
                tempFilePath: t.tempVideoPath
            },
            "previewData.detailData": [ {
                src: t.tempThumbPath
            } ]
        }), a.data.previewData.videoType = 1, wx.setKeepScreenOn({
            keepScreenOn: !1
        }), a.gotoPreviewPage(), setTimeout(function() {
            a.setData({
                recordState: 0
            });
        }, 750);
    },
    // chooseImage: function() {
    //     var t = this;
    //     wx.chooseImage({
    //         sizeType: [ "original" ],
    //         sourceType: [ "album" ],
    //         success: function(e) {
    //             var a = [];
    //             e.tempFilePaths.forEach(function(t) {
    //                 var e = {
    //                     text: "",
    //                     src: t
    //                 };
    //                 a.push(e);
    //             }), t.setData({
    //                 "previewData.type": "image",
    //                 "previewData.detailData": a
    //             }), t.gotoEditPage();
    //         }
    //     });
    // },
    // chooseVideo: function() {
    //     var t = this;
    //     wx.chooseVideo({
    //         sourceType: [ "album" ],
    //         maxDuration: t.data.limitTime,
    //         compressed: !1,
    //         success: function(a) {
    //           console.log(a)
    //             var i = a.width > a.height ? 0 : 1;
    //           a.duration <= t.data.limitTime ? (t.setData({
    //                 "previewData.type": "video",
    //                 "previewData.videoType": i,
    //                 "previewData.videoUrl": {
    //                     tempFilePath: a.tempFilePath
    //                 },
    //                 "previewData.detailData": [ {
    //                     src: t.data.networkImageUrl + "textpreviewbg.jpg"
    //                 } ]
    //             }), t.data.previewData.videoType = i, t.gotoPreviewPage()) : wx.showModal({
    //               content: "上传视频超过" + t.data.limitTime+"s, 请重新上传",
    //                 cancelText: "取消",
    //                 confirmText: "重新上传",
    //                 success: function(t) {}
    //             });
    //         }
    //     });
    // },
    gotoPreviewPage: function () {
      var vWidth = this.data.vWidth
      var vHeight = this.data.vHeight
      console.log(vWidth, vHeight)
      wx.navigateTo({
        url: "../publish-preview/publish-preview?vWidth=" + vWidth + "&vHeight=" + vHeight
      });
    },

    writeTextHandle: function() {
        this.setData({
            "previewData.type": "text"
        }), this.gotoEditPage();
    },
    gotoPubOriginPage: function() {
        wx.reLaunch({
            url: '../../add/add'
        })
    }
});