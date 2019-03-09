
var t ,app = getApp(), a = void 0;
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    previewData: {},
    isMunted:"false",//是否静音
    isShow:"flex",
    musicList:[
      { id: 0,
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        name:"此时此刻"},
      { id:1,
        src: "http://www.170mv.com/kw/sd.sycdn.kuwo.cn/resource/n1/47/70/1534907298.mp3",
        name:"狂狼"}

    ],
    imagePreview: {
      indicatorDots: !1,
      current: 0,
      autoplay: !1,
      circular: !0,
      interval: 3e3,
      duration: 0,
    },
    musicAnimationData: {},//音乐弹窗
    pictureAnimationData: {},//贴纸弹窗
    // networkImageUrl: t.globalData.IMAGE_URL,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0//tab标题的滚动条位置

  },
  onReady: function (e) {
    
  },
  onShow:function(){

  },
  onLoad: function (t) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
		// /**
		//  * 监听音乐播放
		//  */
    // wx.onBackgroundAudioPlay(function () {
    //   console.log('onBackgroundAudioPlay')
    // })

		// /**
		//  * 监听音乐暂停
		//  */
    // wx.onBackgroundAudioPause(function () {
    //   console.log('onBackgroundAudioPause')
    // })

		// /**
		//  * 监听音乐停止
		//  */
    // wx.onBackgroundAudioStop(function () {
    //   console.log('onBackgroundAudioStop')
    // })

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
  onShow: function () {
    this.data.myVideo.play(), this.initMusicPlay();
  },
  onHide: function () {
    this.data.myVideo.pause(), this.stopMusicFn();
  },
  onUnload: function () {
    this.data.myVideo.stop(), this.stopMusicFn(), this.setData({
      myVideo: null
    });
  },
  stopTouchMove: function () {
    return !1;
  },
  returnEditPage: function() {
      wx.navigateBack();
  },
  gotoPubSubmitPage: function () {
    wx.navigateTo({
      url: "../publish-submit/publish-submit"
    });
  },
  gotoMusicPage: function (t) {
    wx.navigateTo({
      url: "../publish/music/music"
    });
  },
  initMusicPlay: function () {
    var t = this;
    if (this.setData({
      "imagePreview.current": 0,
      "imagePreview.autoplay": !0
    }), this.data.previewData.music) {
      var a = getCurrentPages();
      a[a.length - 2].setData({
        "previewData.music": this.data.previewData.music
      }), this.playMusicFn(this.data.previewData.music.url), 1 == this.data.previewData.detailData.length && this.setData({
        musicTimer: setInterval(function (a) {
          t.playMusicFn(t.data.previewData.music.url);
        }, 1e4)
      });
    }
  },
  playMusicFn: function (t) {
    a.destroy(), (a = wx.createInnerAudioContext()).title = "背景音乐", a.autoplay = !0,
      a.loop = !0, a.src = t;
  },
  stopMusicFn: function () {
    clearInterval(this.data.musicTimer), this.setData({
      musicTimer: null,
      "imagePreview.autoplay": !1
    }), a.stop();
  },
  swiperBindchange: function (t) {
    this.data.previewData.music && 0 == t.detail.current && this.playMusicFn(this.data.previewData.music.url);
  },
  showMusicBox: function () {
    this.showMusic()
  },
  // 配乐弹窗
  showMusic: function () {
    this.loadMusic();
    this.animation.bottom("0rpx").height("100%").step()
    this.setData({
      talksPage: 1,
      musicAnimationData: this.animation.export(),
      isShow:"none"
    })
  },

  hideMusic: function () {
    this.audioPause();
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
      talksPage: 1,
      musicAnimationData: this.animation.export(),
      isShow: "flex"
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
      pictureAnimationData: this.animation.export(),
      isShow: "none"
    })
  },

  hidePicture: function () {
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
      talksPage: 1,
      pictureAnimationData: this.animation.export(),
      isShow: "flex"
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
  audioPlay: function (e) {

    // wx.playBackgroundAudio({
    //   //播放地址
    //   dataUrl: this.data.musicList[e.currentTarget.dataset.index].src,
    //   title: '青云志',
    //   //图片地址
    //   coverImgUrl: 'http://r1.ykimg.com/050E0000576B75F667BC3C136B06E4E7'
    // })


    console.log(this)
    console.log(e)
    innerAudioContext.src = this.data.musicList[e.currentTarget.dataset.index].src
    innerAudioContext.play(()=>{
      this.setData({
        isMunted:"true"
      })

    });
  },
  audioPause: function (e) {
    // wx.pauseBackgroundAudio();
    innerAudioContext.pause(()=>{
      this.setData({
        isMunted: "false"
      })

    })
  },




  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    console.log("chufa")
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
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

  footerTap: app.footerTap
});