// pages/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {

  },
  // 摄像功能
  getLocalVideo: function () {
    var that = this;
    var session_key = wx.getStorageSync('session_key');
    // wx.chooseVideo({
    //   maxDuration: 15,
    //   success: function (res) {
    //     console.log(res)
    //     // app.startOperating("上传中")
    //     // 这个就是最终拍摄视频的临时路径了
    //     var tempFilePath = res.tempFilePath;
    //   },
    //   fail: function () {
    //     console.error("获取本地视频时出错");
    //   }
    // })
    wx.navigateTo({
      url: 'publish/publish',
    })
  },
})