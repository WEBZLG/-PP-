const ajax = require('ajax.js');

// 登录
function login(success) {
  wx.login({
    success: function (res) {
      // console.log("login by code > " + res.code)
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      ajax.request({
        method: 'GET',
        url: 'user/login?code=' + res.code,
        // url:"192.168.1.180/index/port/userinfo",
        success: loginRes => {
          wx.setStorageSync('token', loginRes.token);
          if (success) {
            success(loginRes);
          }
        }
      })
    }
  })
}

// 获取用户信息
function getUserInfo(success) {
  console.log("getUserInfo...")
  ajax.request({
    method: 'GET',
    url: 'user/getUserInfo',
    success: success
  })
}

// 更新用户信息
function updateUserInfo(userInfo, success) {
  console.log("updateUserInfo...")
  ajax.request({
    method: 'POST',
    url: 'user/updateUserInfo',
    data: userInfo,
    success: success
  })
}

// 获取推荐的视频列表
function getRecommendList(opt) {
  // console.log("getRecommendList...")

  ajax.request({
    url: 'subject/recommendList',
    data: opt.data || {
      page: 1,
      rows: 25
    },
    success: opt.success
  })
}

// 获取热门的视频列表
function getHotList(opt) {
  console.log("getHotList...")

  ajax.request({
    url: 'subject/hotList',
    data: opt.data || {
      page: 1,
      rows: 25
    },
    success: opt.success
  })
}

// 获取指定视频
function getSubjectInfo(subjectId, success) {
  ajax.request({
    url: 'subject/info/' + subjectId,
    success: success
  })
}

// 发表一个说说
function applySubject(opt) {
  console.log("applySubject...")
  wx.showNavigationBarLoading();
  var token = wx.getStorageSync("token");
  wx.uploadFile({
    url: ajax.serverPath + 'subject/apply?key=' + ajax.key + '&token=' + token,
    filePath: opt.filePath,
    name: 'file',
    formData: opt.formData || {},
    success: function (res) {
      wx.hideNavigationBarLoading();
      if (opt.success) {
        opt.success(res.data);
      }
    }
  })
}

function applyVideoSubject(opt) {
  console.log("applySubject...")
  wx.showNavigationBarLoading();
  var token = wx.getStorageSync("token");
  wx.uploadFile({
    url: ajax.serverPath + 'subject/applyVideo?key=' + ajax.key + '&token=' + token,
    filePath: opt.filePath,
    name: 'file',
    formData: opt.formData || {},
    success: function (res) {
      wx.hideNavigationBarLoading();
      if (opt.success) {
        opt.success(res.data);
      }
    }
  })
}

function like(data, success){
  ajax.request({
    url: 'subject/like',
    data: data,
    success: success
  })
}

function share(data, success) {
  // ajax.request({
  //   url: 'subject/share',
  //   data: data,
  //   success: success
  // })
  onShareAppMessage()
}

function onShareAppMessage (options) {
  console.log("diaoyongfenxing")
  　　var that = this;
  　　// 设置菜单中的转发按钮触发转发事件时的转发内容
  　　var shareObj = {
    　　　　title: "转发的标题",        // 默认是小程序的名称(可以写slogan等)
    　　　　path: '',        // 默认是当前页面，必须是以‘/’开头的完整路径
    　　　　imgUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    　　　　success: function (res) {
      　　　　　　// 转发成功之后的回调
      　　　　　　if (res.errMsg == 'shareAppMessage:ok') {
      　　　　　　}
    　　　　},
    　　　　fail: function () {
      　　　　　　// 转发失败之后的回调
      　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {
        　　　　　　　　// 用户取消转发
      　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
        　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
      　　　　　　}
    　　　　},
    　　　　complete:function(){

      　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
    }

    　　　　
　　};
　　// 来自页面内的按钮的转发
　　if (options.from == 'button') {
  　　　　var eData = options.target.dataset;
  　　　　console.log(eData.name);     // shareBtn
  　　　　// 此处可以修改 shareObj 中的内容
  　　　　shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
　　}
　　// 返回shareObj
　　return shareObj;
}

function loadTalks(opt){
  ajax.request({
    url: 'subject/talks',
    data: opt.data,
    success: opt.success
  })
}

function applyTalk(opt){
  ajax.request({
    method: 'POST',
    url: 'subject/talk',
    data: opt.data,
    success: opt.success
  })
}

module.exports = {
  login: login,
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo,
  applySubject: applySubject,
  applyVideoSubject: applyVideoSubject,
  getRecommendList: getRecommendList,
  getHotList: getHotList,
  getSubjectInfo: getSubjectInfo,
  like: like,
  share: share,
  loadTalks: loadTalks,
  applyTalk: applyTalk
}