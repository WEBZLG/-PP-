// pages/3d/book/book.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    bookList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'userUid',
      success(res) {
        //console.log(res)
        that.setData({
          uid: res.data
        })
        //console.log(that.data.uid)
        wx.request({
          url: app.globalData.serverPath + "photolist",
          data: {
            uid: that.data.uid
          },
          method: 'POST',
          success: function (res) {
            //console.log(res);
            that.setData({
              bookList : res.data
            })
          }
        })
      }
    })
  },
  viewBook:function(e){
    //console.log(e)
    var pid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../view/view?pid='+pid,
    })
  },
  delBook:function(e){
    var that = this;
    wx.showLoading()
    wx.request({
      url: app.globalData.serverPath + "del_photo",
      data: {
        "id": e.currentTarget.dataset.id
      },
      method: 'POST',
      success: function (res) {
        //console.log(res)
        wx.hideLoading()
      if(res.data =="1"){
          wx.showToast({
            title: '删除成功！',
            icon:"success"
          })
        that.onLoad()
      }else{
        wx.showToast({
          title: '删除失败！',
          icon: "none"
        })
      }
      }
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