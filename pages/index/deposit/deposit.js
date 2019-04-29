// pages/deposit/deposit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    money:"",//充值金额
    integral:0,//积分
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
  deposit:function(e){
    var that = this
    that.setData({
      money: e.currentTarget.dataset.rmb
    })
    wx.showModal({
      title: '提示',
      content: '确定充值' + e.currentTarget.dataset.rmb+"元？",
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          that.payorder()
        } else if (sm.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
    },
  payorder: function (e) {
    var that = this
    //console.log(that.data.uid, that.data.money )
    wx.request({
      url: "https://www.surenmedia.cn/index/pay/insert",
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        'uid': that.data.uid,
        'amount': that.data.money
      },
      success: function (res) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success: function (res) {
            wx.showToast({
              title: '充值成功！',
            })
                wx.redirectTo({
                url: './deposit',
              })
          },
          fail: function (res) {
            // fail
            //console.log(res);
          },
          complete: function (res) {
            // complete
            //console.log(res);
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      // 缓存中取信息
      wx.getStorage({
        key: 'userUid',
        success(res) {
          //console.log(res.data)
          that.setData({
            uid: res.data
          });
          wx.request({
            url: app.globalData.serverPath + "myselfinfo",
            data: {
              "uid": that.data.uid
            },
            method: 'POST',
            success: function (res) {
              //console.log(res);
              that.setData({
                integral: res.data.integral
              })
            }
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

  }
})