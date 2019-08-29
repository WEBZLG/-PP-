// pages/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    vWidth:"",
    vHeight:"",
    duration:15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 缓存中取信息
    wx.getStorage({
      key: 'userUid',
      success(res) {
        //console.log(res.data)
        that.setData({
          uid: res.data
        })
        wx.request({
          url: app.globalData.serverPath + "myselfinfo",
          data: {
            uid: that.data.uid
          },
          method: 'POST',
          success: function (res) {
            if (res.data.if_verified == 0) {
              that.setData({
                duration: 15,
              })
            } else {
              that.setData({
                duration: 30,
              })
            }
          },
          fail: function (error) {
            wx.showToast({
              title: '发送失败！',
              icon: "none"
            })
          }
        })
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showTabBar()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
  // 本地视频
  chooseVideo: function () {
    var t = this;
    wx.chooseVideo({
      sourceType: ['album'],
      maxDuration: t.data.duration,
      compressed: !1,
      success: function (a) {
        //console.log(a)
        t.setData({
          vWidth:a.width,
          vHeight:a.height
        })
        var i = a.width > a.height ? 0 : 1;
        a.duration <= t.data.duration ? (t.setData({
          "previewData.type": "video",
          "previewData.videoType": i,
          "previewData.videoUrl": {
            tempFilePath: a.tempFilePath
          },
          "previewData.detailData": [{
            src: a.thumbTempFilePath
          }]
        }), t.data.previewData.videoType = i, t.gotoPreviewPage()) : wx.showModal({
            content: "上传视频超过" + t.data.duration +"s, 请重新上传",
          cancelText: "取消",
          confirmText: "重新上传",
          success: function (t) { }
        });
      }
    });
  },
  gotoPreviewPage: function () {
    var vWidth = this.data.vWidth
    var vHeight = this.data.vHeight
    wx.navigateTo({
      url: "./publish-preview/publish-preview?vWidth=" + vWidth+"&vHeight="+vHeight
    });
  },
  // 摄像功能
  getLocalVideo: function () {
    var duration = this.data.duration
    wx.navigateTo({
      url: 'publish/publish?duration=' + duration,
    })
  },
  get3dAlbum:function(){
    wx.navigateTo({
      url: '../3d/test/test',
    })
  }
})