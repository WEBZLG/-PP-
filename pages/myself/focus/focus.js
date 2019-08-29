// pages/myself/focus/focus.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    focusList:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    var that = this
    //缓存中取uid
    wx.getStorage({
      key: 'userUid',
      success(res) {
        //console.log(res.data)
        that.setData({
          uid: res.data
        })
      wx.request({
        url: app.globalData.serverPath + 'myattention',
        data: { uid: that.data.uid },
        method: 'POST',
        success: function (res) {
          wx.hideLoading();
          console.log(res)
          that.setData({
            focusList: res.data
          })
        }, fail: function (e) {
          wx.hideLoading();
          //请求失败
          wx.showToast({
            title: '请求失败' + e,
            icon: 'none'
          })
        }
      })
      }
    })
  },
  // 视频用户详情页
  userdetail: function (e) {
    // console.log(e)
    var otherId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../index/userdetail/userdetail?otherId=' + otherId
    })
  },
  cancel:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.serverPath + 'attention',//请求地址
      data: {//发送给后台的数据
        uid: that.data.uid,
        attentid: id
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        console.log(res)
        that.onLoad();
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
  // onShareAppMessage: function () {

  // }
})