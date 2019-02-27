var e = getApp(), i = require("../../utils/config.js");

Page({
    data: {
        dview: "",
        id: 0
    },
    onLoad: function(a) {
        var t = this;
        wx.login({
            success: function(s) {
                wx.request({
                    url: i.requestUrl + "&a=getOpenid&code=" + s.code,
                    success: function(s) {
                        e.globalData.openid = s.data, t.setData({
                            dview: i.host + "index.php?c=D3View&a=overall&id=" + a.id + "&share=" + a.share,
                            id: a.id
                        });
                    }
                });
            }
        }), console.log(i.host + "index.php?c=D3View&a=overall&id=" + a.id + "&share=" + a.share), 
        wx.showLoading({
            title: "等待...",
            mask: 1
        }), setTimeout(function() {
            wx.hideLoading();
        }, 1e3);
    },
    onShareAppMessage: function(e) {
        return "menu" === e.from && console.log(e.target), {
            title: "我制作了一个魔幻3D全景立体相册，打开看看",
            path: "/pages/3d/view?id=" + this.data.id + "&share=1"
        };
    }
});