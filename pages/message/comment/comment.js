// pages/comment/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Comment:[],//数组
    wximage:'',//评论头像
    wxname:'', //评论昵称
    time:'', //评论时间
    uid:'', //评论人的ID
    pic:'',//作品封面
    rid:'',//作品ID
    content:''//评论内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'userUid',
      success(res) {
        console.log(res.data)
        that.setData({
          uid: res.data
        })
      }
    });
    wx.setNavigationBarTitle({
      title: '评论',
    }),
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#434343',
    }),
      this.getdata()
  },
  getdata: function () {
    var that = this;
    wx.request({
      url: app.globalData.serverPath +'commentlist',//请求地址
      data: {//发送给后台的数据
        uid: that.data.uid
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        console.log(res.data)
        that.setData({
          Comment: res.data
        })
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