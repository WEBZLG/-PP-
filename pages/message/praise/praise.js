// pages/zan/zan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Zan:[],//数组
    id:'',//作品ID
    pic:'',//作品封面
    time:'',//点赞时间
    uid:'',//点赞人ID
    wximage:'',//头像
    wxname:'',//昵称

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 缓存获取uid
    wx.getStorage({
      key: 'userUid',
      success(res) {
        // console.log(res.data)
        that.setData({
          uid: res.data
        })
        that.getdata()
      }
    });
    wx.setNavigationBarTitle({
      title: '赞',
    }),
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#434343',
    })
      // console.log(this.data.uid)
    
  },
  getdata: function () {
   
    wx.showLoading()
    var that = this;
    wx.request({
      url: app.globalData.serverPath +'likelist',//请求地址
      data: {//发送给后台的数据
        uid: that.data.uid
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        // console.log(res.data)
        wx.hideLoading()
        that.setData({
          Zan: res.data
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