const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    headUrl:"",
    nickName:"",
    signature:"",
    place: "",
    sex:"",
    phone:"",
    phoneValue:0,
    wx:"",
    wxValue:0,
    birthday: '1950-01-01',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.setNavigationBarTitle({
      title: '编辑资料',
    })
    // 缓存中取信息
    wx.getStorage({
      key: 'userUid',
      success(res) {
        //console.log(res.data)
        that.setData({
          uid: res.data
        })
      }
    });
    wx.getStorage({
      key: 'userMessage',
      success(res) {
        //console.log(res.data)
        that.setData({
          sex: res.data.gender,
          place: res.data.city,
          nickName: res.data.nickName,
          headUrl: res.data.avatarUrl
        })
      }
    });


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
  
  getCall: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCallNum: function (e) {
    this.setData({
      phoneValue: e.detail.value
    })
  },
  getWx: function (e) {
    this.setData({
      wx: e.detail.value
    })
  },
  getWxNum: function (e) {
    this.setData({
      wxValue: e.detail.value
    })
  },
    bindDateChange(e) {
        this.setData({
            birthday: e.detail.value
        })
    },

 
  //编辑个人信息
  save: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.serverPath +"editpersonal",
      data: {
        "uid": that.data.uid,
        "wxname": that.data.nickName,
        "signature": that.data.signature ,
        "place": that.data.place,
        "sex": that.data.gender,
        "birthday": that.data.birthday,
        "phone": that.data.phone,
        "wx": that.data.wx,
        "phone_integral": that.data.phoneValue,
        "wx_integral":that.data.wxValue
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '保存成功！',
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '../myself',
          })
        },500)
      },
      fail:function(error){
        wx.showToast({
          title: '保存失败！',
          icon:"none"
        })
      }
    })
    
  },
})