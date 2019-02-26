//index.js
//引入路径列表JS
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    selectPerson: true,
    huodongList:[],
    guanzhuList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    //初始化页面数据
   
    //1.开始初始化第一个TAB页的关注列表数据
    wx.request({
      url: 'http://192.168.1.180/index/port/attentionlist',
      data: { uid: app.globalData.uid},
      success:function(res){
        //请求成功
        console.log(res)
        that.setData({
          guanzhuList:res.data
        })
      },fail:function(e){
        //请求失败
        wx.showToast({
          title: '请求失败'+e,
          icon:'none'
        })
      }
    })
    //2.开始初始化活动页面的数据
    wx.request({
      url: "http://192.168.1.180/index/port/apply",
      data: { uid: app.globalData.uid},
      success:function(res){
        that.setData({
          huodongList:res.data
        });
      },fail:function(e){
        //请求失败
        wx.showToast({
          title: '请求失败'+e,
          icon:'none'
        })
      }
    })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    
   },

  swiperchange: function (e) {
    var that = this
    console.log(e.detail.current)
    that.setData({
      'currentTab': e.detail.current
    })
  },


  //获取当前滑块的index
  swiperchange: function (e) {
    const that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) { 
    const that = this;
 
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})