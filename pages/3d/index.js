var e = getApp(), a = require("../../utils/config.js");

Page({
    data: {
        ad: a.ad,
        host: a.host,
        openId:""
    },
    onLoad: function() {
      const that = this;
      wx.getStorage({
        key: 'openId',
        success(res) {
          console.log(res.data)
          that.setData({
            openId: res.data
          })
        }
      });
        wx.setNavigationBarTitle({
          title: '3D相册',
        }),
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#3E3E3E',
        })
        // wx.login({
        //     success: function(o) {
        //         wx.request({
        //             url: a.requestUrl + "&a=getOpenid&code=" + o.code,
        //             success: function(a) {
        //               console.log(a)
        //                 e.globalData.openid = a.data, console.log(e.globalData.openid);
        //             }
        //         });
        //     }
        // });
    },
    mybook: function() {
        wx.navigateTo({
            url: "mybook"
        });
    },
    newphoto: function(o) {
      console.log(o)
        var t = this, n = o.detail.formId;
        console.log(n), wx.request({
            url: a.host + "admin.php?m=Qwadmin&c=Zz&a=index",
            data: {
                apptype: a.apptype,
                openid: t.data.openid,
                template_id: a.template_id,
                formid: n
            }
        }), wx.chooseImage({
            count: 4,
            sizeType: [ "compressed" ],
            sourceType: [ "album" ],
            success: function(e) {
                console.log(e.tempFilePaths);
                e.tempFilePaths;
                t.uploadImage(e.tempFilePaths);
            }
        });
    },
    uploadImage: function(o) {
      var that = this;
        wx.uploadFile({
            url: a.host + "index.php?m=WEB&c=D3Uploader&a=wxUpload",
            filePath: o[0],
            name: "createImage",
            header: {
                chartset: "utf-8",
                "content-type": "multipart/form-data"
            },
            formData: {
              unionid: that.data.openid
            },
            success: function(e) {
                console.log(e.data);
                var t = e.data.replace(/\ufeff/g, ""), n = JSON.parse(t), i = parseInt(n.wxid);
                for (var s in o) wx.uploadFile({
                    url: a.host + "index.php?m=WEB&c=D3Uploader&a=wxUploadlist",
                    filePath: o[s],
                    name: "photo",
                    header: {
                        chartset: "utf-8",
                        "content-type": "multipart/form-data"
                    },
                    formData: {
                        tuid: i,
                        one: s
                    },
                    success: function(e) {
                        console.log("副表返回ID：" + e.data);
                    }
                });
                wx.navigateTo({
                    url: "view?id=" + parseInt(i) + "&share=0"
                });
            }
        });
    },
    onHide: function() {
        wx.pauseBackgroundAudio();
    },
    onShareAppMessage: function(e) {
        return "menu" === e.from && console.log(e.target), {
            title: "转发",
            path: "/pages/3d/index",
            success: function(e) {},
            fail: function(e) {}
        };
    }
});