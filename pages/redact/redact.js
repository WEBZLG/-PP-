const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: app.globalData.uid,
    signature:"",
    place: "",
    sex:"",
    birthday:"",
    phone:"",
    wx:"",
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }
    ],
    chooseSize: false,
    animationData: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      place: app.globalData.userInfo.city
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
    this.setData({
      birthday: event.detail.year + "-" + event.detail.month + "-" + clickDay
    })
    this.hideModal();

  },
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },
  //编辑个人信息
  save: function (e) {
    var that = this;
    console.log(app.globalData.userInfo)
    wx.request({
      url: "http://192.168.1.180/index/port/editpersonal",
      data: {
        "uid": app.globalData.uid,
        "wxname": app.globalData.userInfo.nickName,
        "signature": that.data.signature ,
        "place": that.data.place,
        "sex": app.globalData.userInfo.gender,
        "birthday": that.data.birthday,
        "phone": that.data.phone,
        "wx": that.data.wx,
      },
      method: 'POST',
      success: function (res) {
        wx.showModal({
          content: "保存成功!",
          showCancel: false
        });
        // this.setData({
        //   isDis:true
        // })
      },
      fail:function(error){
        wx.showModal({
          content: error,
          showCancel: false
        })
      }
    })
  },
})