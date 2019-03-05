// pages/fans/fans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Fans:[],
    wximage:'',
    wxname:'',
    eachother: '',//1互相关注  0未互相关注
    time:'',//关注时间
    info:'',//susccess//error
    status: '',//0是关注状态 1是未关注的状态
    uid:''
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
    })
    if (eachotherStatus==0){
      this.setData({
        [chooseIndex]: 1,
      })
    }else{
      this.setData({
        [chooseIndex]: 0,
      })
    }
    // console.log(this.data.Fans)
    // console.log(e.currentTarget.dataset.item.eachother);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '粉丝',
    }),
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#434343',
      }),
      this.getdata()
      // this.getdata2()

  },
  getdata: function () {
    const that = this;
    wx.request({
      url: app.globalData.serverPath +'fanlist',//请求地址
      data: {//发送给后台的数据
        uid: 3
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        console.log(res)
        that.setData({
          Fans: res.data
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  getdata2: function () {
    const that = this;
    wx.request({
      url: app.globalData.serverPath +'attention',//请求地址
      data: {//发送给后台的数据
        uid: 3,
        attentid:5
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        // console.log(res.data)
        that.setData({
          attention: res.data
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