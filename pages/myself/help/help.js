// pages/help/help.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    chooseSize: false,
    animationData: {},
    helpList:[],
    content:"",
    isDis:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '帮助',
    });
    var that = this;
    //缓存中取uid
    wx.getStorage({
      key: 'userUid',
      success(res) {
        //console.log(res.data)
        that.setData({
          uid: res.data
        })
      }
    });
    wx.request({
      url: app.globalData.serverPath + "help",
      data: {},
      method: 'POST',
      success: function (res) {
        //console.log(res);
        that.setData({
          helpList : res.data
        })
      }
    })
  },
  // 弹窗
  chooseSezi: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  // 隐藏弹窗
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
  bindKeyInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  // 问题反馈
  problem:function(){
    var that = this;
    wx.request({
      url: app.globalData.serverPath + "problem",
      data: {
        uid:that.data.uid,
        content:that.data.content
      },
      method: 'POST',
      success: function (res) {
        //console.log(res);
        wx.showToast({
          title: '提交成功',
          icon:"cuccess"
        })
        that.hideModal()
      }
    })
  },
  // 查看详情
  viewDetails:function(e){
    //console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './helpDetails/helpDetails?id='+id,
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

})