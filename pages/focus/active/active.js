// pages/message/noticeDetails/noticeDetails.js
const app = getApp()
const WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    time:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this;
    wx.request({
      url: app.globalData.serverPath + 'activityinfo',//请求地址
      data: {//发送给后台的数据
        id: options.id
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res)
//         const article = res.data.content;
//         WxParse.wxParse('article', 'html', article, that, 5);
//         console.log(res)
//         that.setData({
//           title: res.data.title,
//           time:res.data.time,
// 　　　　　})
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
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
  onShareAppMessage: function () {

  }
})