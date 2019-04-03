getApp();

var e = require("../../utils/config.js");

Page({
    data: {
        photolist: [],
        sharearr: [],
        visibility_baocun: " visibility:hidden",
        baocun: 0,
        sharepic: "",
        touxiang: "",
        id: 0,
        ma: "",
        sign: "0",
        ad: e.ad,
        host: e.host,
        userInfo: []
    },
    onLoad: function(t) {
      console.log("share")
        this.setData({
            id: t.id
        });
        var a = this;
        wx.request({
            url: e.host + "index.php?&m=Web&c=D3Photos&a=getTuwenlist",
            data: {
                id: t.id
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data), t.data.wxcove = e.host + t.data.wxcove, a.setData({
                    photolist: t.data,
                    sharepic: t.data.wxcove,
                    sign: t.data.sign
                });
            }
        });
    },
    pengyou: function() {
        var t = this;
        wx.showLoading({
            title: "保存中，请稍后"
        }), wx.downloadFile({
            url: e.host + "background/bg.jpg",
            success: function(a) {
                console.log(a.tempFilePath), wx.downloadFile({
                    url: t.data.sharepic,
                    success: function(a) {
                        console.log(a.tempFilePath), wx.request({
                            url: e.host + "/index.php?c=Dd&a=careteqc",
                            data: {
                                id: t.data.id,
                                sign: t.data.sign
                            },
                            success: function(o) {
                                console.log(o.data), console.log(e.host + "/" + o.data), wx.downloadFile({
                                    url: e.host + "/" + o.data,
                                    success: function(e) {
                                        console.log(e.tempFilePath);
                                        var o = wx.createCanvasContext("shareCanvas");
                                        o.setFillStyle("#ffffff"), o.fillRect(0, 0, 400, 600), o.setFillStyle("#000000"), 
                                        o.setFontSize(40), o.fillText("我的3D全景相册", 54, 45), o.drawImage(a.tempFilePath, 15, 65, 371, 386), 
                                        o.drawImage(e.tempFilePath, 148, 457, 106, 106), o.setFillStyle("#000000"), o.setFontSize(20), 
                                        o.fillText("长按识别二维码查看", 109, 585), o.draw(), setTimeout(function() {
                                            t.canvasSave("shareCanvas");
                                        }, 200), wx.hideLoading();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    canvasSave: function(e) {
        wx.canvasToTempFilePath({
            canvasId: "shareCanvas",
            fileType: "jpg",
            quality: 1,
            success: function(e) {
                console.log(e), wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        wx.hideLoading(), wx.showToast({
                            title: "保存到手机相册成功",
                            icon: "succes",
                            duration: 1e3,
                            mask: !0
                        });
                    },
                    fail: function(e) {
                        console.log(e), "saveImageToPhotosAlbum:fail auth deny" === e.errMsg && (console.log("用户一开始拒绝了，我们想再次发起授权"), 
                        console.log("打开设置窗口"), wx.openSetting({
                            success: function(e) {
                                console.log(e), e.authSetting["scope.writePhotosAlbum"] ? console.log("获取权限成功，给出再次点击图片保存到相册的提示。") : console.log("获取权限失败，给出不给权限就无法正常使用的提示");
                            }
                        }));
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {
        var e = this.data.photolist;
        return {
            title: e.wxtitle,
            path: "/pages/3d/view?id=" + e.wxid + "&share=1",
            imageUrl: e.wxcove
        };
    },
    clkyulan: function() {
        var e = this.data.photolist;
        wx.navigateTo({
            url: "/pages/3d/view?id=" + e.wxid + "&share=1"
        });
    },
    backbtn: function() {
        wx.reLaunch({
            url: "index"
        });
    },
    xcbook: function() {
        wx.reLaunch({
            url: "mybook"
        });
    }
});