var t = getApp(), a = require("../../utils/config.js"), e = wx.createInnerAudioContext();

Page({
    data: {
        host: a.host,
        a: "ss",
        openid: "",
        src: "https://www.iav6.top/music/2018-11-20/5bf3b570bd284.mp3",
        w: "",
        h: ""
    },
    onLoad: function() {
        e.autoplay = !1, e.src = this.data.src, e.loop = !0;
        var o = this;
        wx.request({
            url: a.host + "index.php?c=Sharetxt&a=contxt",
            method: "post",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                console.log(t.data), o.setData({
                    sharearr: t.data
                });
            }
        }), wx.login({
            success: function(e) {
                wx.request({
                    url: a.requestUrl + "&a=getOpenid&code=" + e.code,
                    success: function(a) {
                        t.globalData.openid = a.data, o.setData({
                            openid: a.data
                        }), console.log(o.data.openid);
                    }
                });
            }
        });
    },
    zhizuo: function() {
        var t = this;
        e.pause(), wx.chooseImage({
            count: "1",
            sizeType: [ "compressed" ],
            sourceType: [ "album" ],
            success: function(e) {
                console.log(e), wx.uploadFile({
                    url: a.host + "index.php?c=HZH&a=wxUpload",
                    filePath: e.tempFilePaths[0],
                    name: "photo",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    formData: {
                        openid: t.data.openid,
                        skin: 7,
                        music: t.data.src
                    },
                    success: function(t) {
                        var a = t.data.replace(/\ufeff/g, ""), e = JSON.parse(a);
                        console.log(e.id), wx.navigateTo({
                            url: "zhizuo?id=" + e.id
                        });
                    }
                });
            }
        });
    },
    bindImageload: function(t) {
        this.setData({
            w: t.detail.width,
            h: t.detail.height
        }), console.log(this.data.w / this.data.h);
    }
});