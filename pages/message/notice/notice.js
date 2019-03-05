// pages/notice/notice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Notice: [],
    title:'',//标题
    content:'',//内容
    time:'',//时间
    id:''
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '公告',
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
      url: app.globalData.serverPath +'infolist',//请求地址
      data: {//发送给后台的数据
        id:15
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
　　　　　　that.setData({
　　　　　　Notice: res.data
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
