
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    signature:"",
    place:"",
    sex:"",
    birthday:"",
    phone:"",
    wx:"",
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }
    ],

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
  getSign: function (e) {
    this.setData({
      signature: e.detail.value
    })
  },
  getBirth: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  getCall: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getWx: function (e) {
    this.setData({
      wx: e.detail.value
    })
  },
  dayClick: function (event) {
    console.log(event)
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "#84e7d0"
    })

  },
})