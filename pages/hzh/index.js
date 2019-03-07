var e = getApp(), t = require("../../utils/config.js"), o = wx.createInnerAudioContext();

Page({
    data: {
        host: t.host,
        a: "ss",
        openid: "",
        src: "https://www.vop2.cn/music/hzh/bf3b570bd284.mp3"
    },
    onLoad: function() {
        o.autoplay = !1, o.src = "https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3", o.loop = !0;
        var a = this;
      wx.getStorage({
        key: 'openId',
        success(res) {
          console.log(res.data)
          a.setData({
            openid: res.data
          })
        }
      });
        wx.request({
            url: t.host + "index.php?c=Sharetxt&a=contxt",
            method: "post",
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
              console.log(e)
                a.setData({
                    sharearr: e.data
                });
            }
        })
        // wx.login({
        //     success: function(o) {
        //         wx.request({
        //             url: t.requestUrl + "&a=getOpenid&code=" + o.code,
        //             success: function(t) {
        //                 e.globalData.openid = t.data, 
        //                 a.setData({
        //                     openid: t.data
        //                 }), console.log(a.data.openid);
        //             }
        //         });
        //     }
        // });
    },
    zhizuo: function() {
        var e = this;
        o.pause(), wx.chooseImage({
            count: "1",
            sizeType: [ "compressed" ],
            sourceType: [ "album" ],
            success: function(o) {
                console.log(o), wx.uploadFile({
                    url: t.host + "index.php?c=HZH&a=wxUpload",
                    filePath: o.tempFilePaths[0],
                    name: "photo",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    formData: {
                        openid: e.data.openid,
                        skin: 7,
                        music: "https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3"
                    },
                    success: function(e) {
                        var t = e.data.replace(/\ufeff/g, ""), o = JSON.parse(t);
                        console.log(o.id), wx.navigateTo({
                            url: "zhizuo?id=" + o.id
                        });
                    }
                });
            }
        });
    }
});