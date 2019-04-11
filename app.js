//app.js
var i ,success,fail;
App({
  data:{
    order:0,
    uid:"",
    pid:"",
    imgsrc: "",
    musicId:"",
    musicContent:""

  },
  globalData: {
    serverPath: 'https://www.surenmedia.cn/index/port/',
    userInfo: null,
    uid: null,
    openId: null
  }, 
  onLaunch: function () {
    // 获取用户信息

  },
  onUnload: function () {
    wx.clearStorageSync()
    wx.clearStorage()
    console.log("清除了")
  }

})
/**
* 封装wx.request请求
* method： 请求方式
* url: 请求地址
* data： 要传递的参数
* callback： 请求成功回调函数
* errFun： 请求失败回调函数
**/
function wxRequest(method, url, data, callback, errFun) {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    dataType: 'json',
    success: function (res) {
      callback(res.data);
    },
    fail: function (err) {
      errFun(res);
    }
  })
}
//多张图片上传

function uploadimg(data) {
  var that = this
  wx.getStorage({
    key: 'userUid',
    success(res) {
      console.log(res)
      getApp().data.uid = res.data

    i = data.i ? data.i : 0,

    success = data.success ? data.success : 0,

    fail = data.fail ? data.fail : 0;

  wx.uploadFile({

    url: data.url,

    filePath: data.path[i],

    name: 'files',

    formData: {
      order:getApp().data.order,
      uid: getApp().data.uid,
      pid: getApp().data.pid,
      content: getApp().data.musicContent,
      mid: getApp().data.musicId
    },

    success: (resp) => {
      console.log(resp)
      console.log(JSON.parse(resp.data))
      var data = JSON.parse(resp.data)
      getApp().data.pid = data.pid

      success++;


      console.log(i);

      //这里可能有BUG，失败也会执行这里

    },

    fail: (res) => {

      fail++;

      console.log('fail:' + i + "fail:" + fail);

    },

    complete: () => {

      console.log(i);

      getApp().data.order = i+1

      console.log(getApp().data.order)
      i++;

      if (i == data.path.length) { //当图片传完时，停止调用   
        console.log('执行完毕');
        var pid = getApp().data.pid
        console.log('成功：' + success + " 失败：" + fail);
        wx.navigateTo({
          url: '../view/view?pid='+pid,
        })
      } else {//若图片还没有传完，则继续调用函数

        console.log(i);

        data.i = i;

        data.success = success;

        data.fail = fail;

        that.uploadimg(data);

      }



    }

  });
    }
  });
}
module.exports = {
  wxRequest: wxRequest,
  uploadimg: uploadimg
}


