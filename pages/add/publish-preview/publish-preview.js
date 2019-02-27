
var t = getApp(), a = void 0;

Page({
    data: {
        previewData: {},
        imagePreview: {
            indicatorDots: !1,
            current: 0,
            autoplay: !1,
            circular: !0,
            interval: 3e3,
            duration: 0,
        },
        musicAnimationData: {},
        pictureAnimationData:{},
        networkImageUrl: t.globalData.IMAGE_URL
    },
    onLoad: function(t) {
      // 评论弹出层动画创建
      this.animation = wx.createAnimation({
        duration: 400,
        timingFunction: "ease",
        delay: 0
      })
        a = wx.createInnerAudioContext();
        var i = getCurrentPages(), e = i[i.length - 2].data.previewData;
        this.setData({
            previewData: e
        }), this.setData({
            myVideo: wx.createVideoContext("myVideo")
        });
    },
    onShow: function() {
        this.data.myVideo.play(), this.initMusicPlay();
    },
    onHide: function() {
        this.data.myVideo.pause(), this.stopMusicFn();
    },
    onUnload: function() {
        this.data.myVideo.stop(), this.stopMusicFn(), this.setData({
            myVideo: null
        });
    },
    stopTouchMove: function() {
        return !1;
    },
    // returnEditPage: function() {
    //     wx.navigateBack();
    // },
    gotoPubSubmitPage: function() {
        wx.navigateTo({
            url: "../publish-submit/publish-submit"
        });
    },
    gotoMusicPage: function(t) {
        wx.navigateTo({
            url: "../publish/music/music"
        });
    },
    initMusicPlay: function() {
        var t = this;
        if (this.setData({
            "imagePreview.current": 0,
            "imagePreview.autoplay": !0
        }), this.data.previewData.music) {
            var a = getCurrentPages();
            a[a.length - 2].setData({
                "previewData.music": this.data.previewData.music
            }), this.playMusicFn(this.data.previewData.music.url), 1 == this.data.previewData.detailData.length && this.setData({
                musicTimer: setInterval(function(a) {
                    t.playMusicFn(t.data.previewData.music.url);
                }, 1e4)
            });
        }
    },
    playMusicFn: function(t) {
        a.destroy(), (a = wx.createInnerAudioContext()).title = "背景音乐", a.autoplay = !0, 
        a.loop = !0, a.src = t;
    },
    stopMusicFn: function() {
        clearInterval(this.data.musicTimer), this.setData({
            musicTimer: null,
            "imagePreview.autoplay": !1
        }), a.stop();
    },
    swiperBindchange: function(t) {
        this.data.previewData.music && 0 == t.detail.current && this.playMusicFn(this.data.previewData.music.url);
    },
    showMusicBox:function(){
      this.showMusic()
    },
    // 配乐弹窗
    showMusic: function () {
      this.loadMusic();
      this.animation.bottom("0rpx").height("100%").step()
      this.setData({
        talksPage: 1,
        musicAnimationData: this.animation.export()
      })
    },

  hideMusic: function () {
      this.animation.bottom("-100%").height("0rpx").step()
      this.setData({
        talksPage: 1,
        musicAnimationData: this.animation.export()
      })
    },
  loadMusic: function () {
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
      //       musicAnimationData: that.animation.export()
      //     })
      //   }
      // });
    },
  // 贴纸弹窗
  showPicture: function () {
    this.loadMusic();
    this.animation.bottom("0rpx").height("100%").step()
    this.setData({
      talksPage: 1,
      pictureAnimationData: this.animation.export()
    })
  },

  hidePicture: function () {
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
      talksPage: 1,
      pictureAnimationData: this.animation.export()
    })
  },
  loadPicture: function () {
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
    //       pictureAnimationData: that.animation.export()
    //     })
    //   }
    // });
  },
});