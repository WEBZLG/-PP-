
var t ,app = getApp(), a = void 0;
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    previewData: {},//发布数据
    isMunted:"false",//是否静音
    isShow:"flex",
    musicId:0,
    isAddSticker:"none",//是否添加贴纸
    sticker:"",
    isMusic:-1,//是否是当前播放歌曲
    musicTypeList:'',//音乐类型列表
    musicType: 1,//音乐类型
    musicList:[
      { id: 0,
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        name:"此时此刻"},
      { id:1,
        src: "http://www.170mv.com/kw/sd.sycdn.kuwo.cn/resource/n1/47/70/1534907298.mp3",
        name:"狂狼"}

    ],
    areaStickerList:[],//移动区域贴纸列表
    stickerList: [],//贴纸列表
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
    scrollLeft: 0, //tab标题的滚动条位置
    stv: {
      offsetX: 160,
      offsetY: 50,
      zoom: false, //是否缩放状态
      distance: 0,  //两指距离
      scale: 1,  //缩放倍数
      width: 50,
      height: 50,
    },
    stickerX:"",
    stickerY:"",
    stickerId:""
  },
  onReady: function (e) {
    
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
    var preData = JSON.stringify({
      "musicid": this.data.musicId,
      "stickerid": this.data.stickerId,
      "stickerx" : this.data.stickerX,
      "stickery" : this.data.stickerY})
  
    wx.navigateTo({
      url: "../publish-submit/publish-submit?preData=" + preData
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
  // 选择配乐
  showMusicBox: function () {
    const that = this;
    wx.request({
      url: app.globalData.serverPath + "musictype",
      data: {},
      method: 'POST',
      success: function (res) {
        console.log(res);
        that.setData({
          musicTypeList:res.data
        })
        that.loadMusic()
      }
    })
  },
  // 配乐弹窗
  showMusic: function () {
    this.animation.bottom("0rpx").height("100%").step()
    this.setData({
      talksPage: 1,
      musicAnimationData: this.animation.export(),
      isShow:"none"
    })
  },
  //隐藏弹窗
  hideMusic: function () {
    this.audioPause();
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
      talksPage: 1,
      musicAnimationData: this.animation.export(),
      isShow: "flex"
    })
  },
  //加载音乐
  loadMusic: function (e) {
    const that = this;
    wx.request({
      url: app.globalData.serverPath + "musiclist",
      data: {
        typeid:that.data.musicType
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        that.setData({
          musicList: res.data
        })
        that.showMusic()
      }
    })
  },
  // 贴纸弹窗
  showPicture: function () {
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
    wx.request({
      url: app.globalData.serverPath + "pastepic",
      data: {},
      method: 'POST',
      success: function (res) {
        console.log(res);
        that.setData({
          stickerList: res.data
        })
        that.showPicture()
      }
    })

  },
  // 第一张贴图触摸开始
  touchstartCallback: function (e) {
    // console.log('touchstartCallback');
    // console.log(e);
    if (e.touches.length === 1) {
      let { clientX, clientY } = e.touches[0];
      this.startX = clientX;
      this.startY = clientY;
      this.touchStartEvent = e.touches;
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      this.setData({
        'stv.distance': distance,
        'stv.zoom': true, //缩放状态
      })
    }
  },

  // 第一张贴图触摸移动中
  touchmoveCallback: function (e) {
    // console.log('touchmoveCallback');
    // console.log(e);
    if (e.touches.length === 1) {
      //单指移动
      if (this.data.stv.zoom) {
        //缩放状态，不处理单指
        return;
      }
      let { clientX, clientY } = e.touches[0];
      let offsetX = clientX - this.startX;
      let offsetY = clientY - this.startY;
      this.startX = clientX;
      this.startY = clientY;
      let { stv } = this.data;
      stv.offsetX += offsetX;
      stv.offsetY += offsetY;
      stv.offsetLeftX = -stv.offsetX;
      stv.offsetLeftY = -stv.offsetLeftY;
      var nowWidth = this.data.stv.width;
      var maxoffsetX = 320 - nowWidth;
      var nowHeight = this.data.stv.height;
      var maxoffsetY = 178.125 - nowHeight;

      if (stv.offsetX > maxoffsetX) {
        stv.offsetX = maxoffsetX;
      } else if (stv.offsetX < 0) {
        stv.offsetX = 0;
      }
      if (stv.offsetY > maxoffsetY) {
        stv.offsetY = maxoffsetY;
      } else if (stv.offsetY < 0) {
        stv.offsetY = 0;
      }
      this.setData({
        stv: stv
      });

    } else {
      //双指缩放
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);

      let distanceDiff = distance - this.data.stv.distance;
      let newScale = this.data.stv.scale + 0.005 * distanceDiff;
      if (newScale < 0.5) {
        newScale = 0.5;
      }
      if (newScale > 4) {
        newScale = 4;
      }
      let newWidth = newScale * 50;
      let newHeight = newScale * 50;

      this.setData({
        'stv.distance': distance,
        'stv.scale': newScale,
        'stv.width': newWidth,
        'stv.height': newWidth,
      })
      //console.log(this.data.stv.scale)
    }
  },

  // 第一张贴图触摸结束
  touchendCallback: function (e) {
    // console.log('touchendCallback');
    console.log(e);
    this.setData({
      stickerX: e.changedTouches[0].pageX,
      stickerY: e.changedTouches[0].pageY,
      stickerId: e.currentTarget.dataset.id
    })

    if (e.touches.length === 0) {
      this.setData({
        'stv.zoom': false, //重置缩放状态
      })
    }
  },

  // 缩放贴纸
  onScale(e) {
    console.log(e.detail)
  },
  // 添加贴纸
  addSticker(e) {
    var that = this;
    if (that.data.isAddSticker=="block"){
      wx.showToast({
        title: '仅限一张贴纸',
        icon:"none"
      })
      that.hidePicture();
    }else{
      that.setData({
        sticker: {
          id: e.currentTarget.dataset.id,
          x: 0,
          y: 0,
          src: e.currentTarget.dataset.src
        },
        isAddSticker:"block",
      })
      that.hidePicture();
    }
  },

  // 删除贴纸
  delSticker(e){
    console.log("删除")
    this.setData({
      sticker: {
        id: "",
        x: 0,
        y: 0,
        src: ""
      },
      isAddSticker: "none"
    })
  },
  // 播放音乐
  audioPlay: function (e) {
    var that = this;
    console.log(e)
    const index = e.currentTarget.dataset.id;
    if(that.data.isMusic == index){
      that.audioPause();
      that.setData({
        isMusic: -1
      })
    }else{
      innerAudioContext.src = this.data.musicList[e.currentTarget.dataset.index].url
      innerAudioContext.play();
      that.setData({
        isMunted: "true",
        isMusic: index
      })
    }
  },
  audioPause: function (e) {
    innerAudioContext.pause(()=>{
      this.setData({
        isMunted: "false"
      })

    })
  },


// 添加音乐
  addMusic:function(e){
    console.log(this)
    console.log(e)
    this.setData({
      musicId: e.currentTarget.dataset.item.id
    })
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2e3,
      mask: true,
    })
    this.hideMusic()
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
    var cur = e.target.dataset.current;
    console.log(e)
    this.setData({
      musicType:e.currentTarget.dataset.id
    })
    this.loadMusic(e.currentTarget.dataset.id)
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  swichNavPic: function (e) {
    var cur = e.target.dataset.current;
    console.log(e)
    // this.setData({
    //   musicType: e.currentTarget.dataset.id
    // })
    // this.loadMusic(e.currentTarget.dataset.id)
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