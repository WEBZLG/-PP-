// pages/fans/fans.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    Fans:[],
    wximage:'',
    wxname:'',
    eachother: '',//1互相关注  0未互相关注
    time:'',//关注时间
    info:'',//susccess//error
    status: '',//0是关注状态 1是未关注的状态
    attentid:''//粉丝id
  },
  changeMotto: function (e) {
    var that =this;
    console.log(e)
    const index = e.currentTarget.dataset.id;
    const eachotherStatus = e.currentTarget.dataset.item.eachother;
    const is = this.data.Fans[index].eachother;
    const chooseIndex = "Fans[" + index + "].eachother";
    this.setData({
      [chooseIndex]: 0,
      eachotherStatus: eachotherStatus,
      Fans: this.data.Fans,
      attentid: e.currentTarget.dataset.item.uid
    })
    wx.request({
      url: app.globalData.serverPath + 'attention',//请求地址
      data: {//发送给后台的数据
        uid:that.data.uid,
        attentid:attentid
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        console.log(res)
        if(res.data.info == "success"){
          if (eachotherStatus == 0) {
            that.setData({
              [chooseIndex]: 1,
            })
          } else {
            that.setData({
              [chooseIndex]: 0,
            })
          }
        }else{
          return false;
        }

      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })


    // console.log(this.data.Fans)
    // console.log(e.currentTarget.dataset.item.eachother);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that =this;
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
      title: '粉丝',
    }),
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#434343',
    }),
    this.getdata()
  },
  getdata: function () {
    wx.showLoading()
    const that = this;
    wx.request({
      url: app.globalData.serverPath +'fanlist',//请求地址
      data: {//发送给后台的数据
        uid:that.data.uid
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        that.setData({
          Fans: res.data
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