// pages/depositapply/depositapply.js
const app = getApp()
// const api = require('../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    withdraw: "",
    bank: "",
    card_number: "",
    cardholder: "",
    bankaddress: "",
    isDis:false,
    integral:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.setNavigationBarTitle({
      title: '提现',
    })
    this.setData({
      integral: options.integral
    })
    if (app.globalData.uid == null) {
            wx.getStorage({
              key: 'userUid',
              success(res) {
                //console.log(res)
                that.setData({
                  uid: res.data
                });
              }
            });
          } else {
            that.setData({
              uid: app.globalData.uid
            });
          }
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

  // },

  getBankName: function (e) {
    this.setData({
      bank: e.detail.value
    })
  },
  getBankNum: function (e) {
    this.setData({
      card_number: e.detail.value
    })
  },
  getBankAddr: function (e) {
    this.setData({
      bankaddress: e.detail.value
    })
  },
  getUserName: function (e) {
    this.setData({
      cardholder: e.detail.value
    })
  },
  getApplyNum: function (e) {
    this.setData({
      withdraw: e.detail.value
    })
  },
  apply:function(){
    var that = this;
    if (that.data.withdraw === "" || that.data.bank === "" || that.data.card_number === "" || that.data.cardholder === "" || that.data.bankaddress===""){
      wx.showToast({
        title: '请完善提现信息!',
        icon:'none'
      })
      return false;
    }else{
    // 提现申请
    wx.request({
      url: app.globalData.serverPath+'withdraw',
      method: 'POST',
      data: {
        uid: that.data.uid,
        withdraw: that.data.withdraw,
        bank: that.data.bank,
        card_number: that.data.card_number,
        cardholder: that.data.cardholder,
        bankaddress: that.data.bankaddress
      },
      success: function (res) {
        wx.showToast({
          title: '提交成功!',
          icon: 'success'
        })
       that.setData({
         isDis:true
       })
        setTimeout(function () {
          wx.reLaunch({
            url: '../myself',
          })
        }, 500)
      },
      fail:function(error){
        wx.showToast({
          title: '提交成功!',
          icon: 'none'
        })
      }
    })
    }
  }

})