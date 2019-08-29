// pages/bindPhone/bindPhone.js
let phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnText: "获取验证码",
    number: 60,
    isGetCode: "auto",
    iptPhone: "",
    iptCode: "",
    returnCode:"",
    returnPhone:""
  },
  getCode: function () {
    var that = this;
    let phoneNumber = this.data.iptPhone;
    let codeNumber = this.data.iptCode;
    if (phoneNumber.length == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: "none"
      })
      return false;
    } else if (!phonereg.test(phoneNumber)) {
      wx.showToast({
        title: '请填正确手机号',
        icon: "none"
      })
      return false;
    }else{ 
      wx.request({
        url: app.globalData.serverPath + "sendmsg",
        data: {
          "tel": this.data.iptPhone
        },
        method: 'POST',
        success: function (res) {
          //console.log(res)
          if(res.data.result=="success"){
            wx.showToast({
              title: '发送成功！',
            });
            that.setData({
              returnCode:res.data.code,
              returnPhone:res.data.tel
            })
          }else{
            wx.showToast({
              title: '发送失败！请重新获取',
              icon: "none"
            })
          }
        },
        fail: function (error) {
          wx.showToast({
            title: '发送失败！',
            icon: "none"
          })
        }
      })
      var Num = setInterval(function () {
        that.setData({
          number: that.data.number - 1,
          btnText: that.data.number + "秒后获取",
          isGetCode: 'none'
        })
        //console.log(that.data.number)
        if (that.data.number == 0 || that.data.number < 1) {
          clearInterval(Num)
          that.setData({
            btnText: "获取验证码",
            number: 60,
            isGetCode: 'auto'
          })
        }
      }, 1000)
    }
  },
  iptPhone: function (e) {
    //console.log(e)
    this.setData({
      iptPhone: e.detail.value
    })
  },
  iptCode: function (e) {
    this.setData({
      iptCode: e.detail.value,
    })
  },
  submit: function () {
    let that = this
    let phoneNumber = this.data.iptPhone;
    let codeNumber = this.data.iptCode;
    if (phoneNumber.length =='') {
      wx.showToast({
        title: '请填写手机号',
        icon:"none"
      })
      return false;
    } else if (!phonereg.test(phoneNumber)) {
      wx.showToast({
        title: '请填正确手机号',
        icon: "none"
      })
      return false;
    } else if (codeNumber==''){
      wx.showToast({
        title: '请填写验证码',
        icon: "none"
      })
      return false;
    }  else {
      if (phoneNumber==that.data.returnPhone){
        if(codeNumber==that.data.returnCode){
          wx.request({
            url: app.globalData.serverPath + "check_code",
            data: {
              "tel": this.data.iptPhone,
              "code": this.data.iptCode,
              "uid": this.data.uid
            },
            method: 'POST',
            success: function (res) {
              if (res.data.result == "2") {
                wx.showToast({
                  title: '认证成功！',
                });
                wx.reLaunch({
                  url: '../../myself/myself'
                })
              } else {
                wx.showToast({
                  title: '认证失败！请重新认证',
                  icon: "none"
                })
              }
            },
            fail: function (error) {
              wx.showToast({
                title: '发送失败！',
                icon: "none"
              })
            }
          })
        }else{
          wx.showToast({
            title: '验证码有误',
            icon: "none"
          })
        }
      }else{
        wx.showToast({
          title: '手机号码不匹配',
          icon: "none"
        })
      }

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userUid',
      success(res) {
        //console.log(res.data)
        that.setData({
          uid: res.data
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
  // onShareAppMessage: function () {

  // }
})