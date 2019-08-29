// pages/index/search/searchDetail/searchDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.request({
      url: app.globalData.serverPath + "search",
      data: {
        "uid": options.uid,
        "content": options.content
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data.info == "success") {
          that.setData({
            information : res.data.result
          })
        } else {
          wx.showToast({
            title: '数据异常！',
            icon: "none"
          })
        }
      }
    })
  },
  playVideo:function(e){
    // console.log(e)
    var uid = e.currentTarget.dataset.uid
    var videoId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../../playvideo/playvideo?uid=' + uid + '&videoId=' + videoId,
    })
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
  // onShareAppMessage: function () {

  // }
})