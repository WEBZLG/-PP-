
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    currentTab: 0,
    selectPerson: true,
    huodongList:[],
    guanzhuList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    var that = this
    //缓存中取uid
    wx.getStorage({
      key: 'userUid',
      success(res) {
        console.log(res.data)
        that.setData({
          uid: res.data
        })

        //1.开始初始化第一个TAB页的关注列表数据
        wx.request({
          url: app.globalData.serverPath + 'attentionlist',
          data: { uid: that.data.uid },
          method: 'POST',
          success: function (res) {
            console.log(res)
            that.setData({
              guanzhuList: res.data
            })
          }, fail: function (e) {
            //请求失败
            wx.showToast({
              title: '请求失败' + e,
              icon: 'none'
            })
          }
        })
        //2.开始初始化活动页面的数据
        wx.request({
          url: app.globalData.serverPath + "apply",
          data: { uid: that.data.uid },
          method: 'POST',
          success: function (res) {
            console.log(res)
            that.setData({
              huodongList: res.data
            });
          }, fail: function (e) {
            //请求失败
            wx.showToast({
              title: '请求失败' + e,
              icon: 'none'
            })
          }
        })
        wx.hideLoading()
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight-50
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
  },
  // 跳转详情
  viewDetails: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './active/active?id=' + id,
    })
  },
})