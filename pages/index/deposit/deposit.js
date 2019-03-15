// pages/deposit/deposit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    huodongList: [],
    Deposite:[{
      id:1,
      score:50,
      rmb:5
    }, {
        id: 1,
        score: 100,
        rmb: 10
      }, {
        id: 2,
        score: 200,
        rmb: 20
      }, {
        id: 3,
        score: 500,
        rmb: 50
      }, {
        id: 4,
        score: 1000,
        rmb: 100
      }, {
        id: 1,
        score: 2000,
        rmb: 200
      }, {
        id: 1,
        score: 5000,
        rmb: 500
      }, {
        id: 1,
        score: 10000,
        rmb: 1000
      }]

  },
  // 充值记录跳转
  depositRecord:function(){
    wx.navigateTo({
      url: '../depositrecord/depositrecord',
    })
  },
  // 充值
  deposit:function(){
      this.setData({
        gold: ""
      })

      if (app.globalData.util.isNumber(this.data.moneyId) == true && this.data.moneyId != 0) {
        const params = {
          "customerId": this.data.mine.customerId,
          "money": this.data.moneyId,
          "terminal": 52
        };
        console.log(params);
        let paramsObj = {}
        app.globalData.api.GetHttp(app.globalData.api.API.customerRecharge.url, params)
          .then((data) => {
            if (data.data.status == 200) {
              paramsObj = data.data.data;
              wx.requestPayment(
                {
                  'timeStamp': paramsObj.timeStamp,
                  'nonceStr': paramsObj.nonceStr,
                  'package': paramsObj.package_value,
                  'signType': paramsObj.signType,
                  'paySign': paramsObj.paySign,
                  'success': function (res) {
                    console.log(res);
                    wx.navigateBack({
                      delta: 1,
                      success: function (res) {
                      },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                  },
                  'fail': function (res) {
                    console.log(res);
                    if (res.errMsg == 'requestPayment:fail cancel') {
                      wx.showModal({
                        title: '提示',
                        content: '微信支付已取消',
                        showCancel: false
                      })
                    }
                  },
                  'complete': function (res) {
                    console.log(res);
                  }
                })
            } else {
              console.log('充值接口失败');
              wx.showModal({
                title: '提示',
                content: data.data.info,
                showCancel: false
              })
            }
          })

      } else {
        wx.showModal({
          title: '提示',
          content: '请输入正确充值金额',
          showCancel: false
        })
      }
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

  }
})