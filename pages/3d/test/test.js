var app = getApp();
var upload = require("../../../app.js")
const innerAudioContext = wx.createInnerAudioContext();
Page({

  data: {
    pics: [],
    musicAnimationData: {},//音乐弹窗
    musicList: [],
    musicTypeList: [],
    musicType: 1,
    musicId: 1,
    winHeight: "",
    musicName: "选择音乐",
    isShow:"block"
  },

  choose: function () {//这里是选取图片的方法

    var that = this;

    wx.chooseImage({

      count: 4, // 最多可以选择的图片张数，默认9

      sizeType: ['original'], // original 原图，compressed 压缩图，默认二者都有

      sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有

      success: function (res) {
        console.log(res)

        var imgsrc = res.tempFilePaths;
        if (imgsrc.length != 4) {
          wx.showToast({
            title: '请上传四张照片',
            icon: "none"
          })

          return false;
        } else {

          that.setData({
            pics: imgsrc
          });
          that.uploadimg()
        }
      },

      fail: function () {

        // fail

      },

      complete: function () {

        // complete

      }

    })



  },

  uploadimg: function () {//这里触发图片上传的方法

    var pics = this.data.pics;

    upload.uploadimg({

      url: app.globalData.serverPath + 'sendimages',//这里是你图片上传的接口

      path: pics//这里是选取的图片的地址数组
    });

  },
  musicContent: function (options) {
    console.log(options)
    app.data.musicContent = options.detail.value
  },
  onLoad: function (options) {
    var that = this;
    // 评论弹出层动画创建
    this.animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
      delay: 0
    })


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
    wx.request({
      url: app.globalData.serverPath + "musictype",
      data: {},
      method: 'POST',
      success: function (res) {
        console.log(res);
        that.setData({
          musicTypeList: res.data
        })
        that.loadMusic()
      }
    })
  },
  // 配乐弹窗
  showMusic: function () {
    this.animation.bottom("0rpx").height("100%").step()
    this.setData({
      musicAnimationData: this.animation.export(),
      isShow: "none"
    })
  },
  //隐藏弹窗
  hideMusic: function () {
    this.audioPause();
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
      musicAnimationData: this.animation.export(),
      isShow: "block"
    })
  },
  // 选择配乐
  showMusicBox: function () {
    const that = this;
    that.showMusic()
  },
  //加载音乐
  loadMusic: function (e) {
    const that = this;
    wx.request({
      url: app.globalData.serverPath + "musiclist",
      data: {
        typeid: that.data.musicType
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        that.setData({
          musicList: res.data,
        })

      }
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    console.log(e)
    this.setData({
      musicType: e.currentTarget.dataset.id
    })
    this.loadMusic(e.currentTarget.dataset.id)
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  // 添加音乐
  addMusic: function (e) {
    console.log(this)
    console.log(e)
    this.setData({
      musicId: e.currentTarget.dataset.item.id,
      musicName: e.currentTarget.dataset.item.name,
    })
    app.data.musicId = e.currentTarget.dataset.item.id
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2e3,
      mask: true,
    })
    this.hideMusic()
  },
  // 播放音乐
  audioPlay: function (e) {
    var that = this;
    console.log(e)
    const index = e.currentTarget.dataset.id;
    if (that.data.isMusic == index) {
      that.audioPause();
      that.setData({
        isMusic: -1
      })
    } else {
      innerAudioContext.src = this.data.musicList[e.currentTarget.dataset.index].url
      innerAudioContext.play();
      that.setData({
        isMunted: "true",
        isMusic: index
      })
    }
  },
  audioPause: function (e) {
    innerAudioContext.pause(() => {
      this.setData({
        isMunted: "false"
      })

    })
  },
  // 我的相册
  getBook: function () {
    wx.navigateTo({
      url: '../book/book'
    })
  }

})