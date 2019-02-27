var t = getApp(), i = require("../../utils/config.js"), c = wx.createInnerAudioContext();

Page({
    data: {
        host: i.host,
        tabs: [],
        tabW: 0,
        a: [],
        xcid: "",
        tu: {},
        skinid: "",
        skinmusic: "",
        sharearr: [],
        texiao: [ {
            id: 7,
            title: "夕阳红",
            icon: "https://www.vop2.cn/icon/xiyanghong.jpg",
            music: "https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3"
        }, {
            id: 12,
            title: "桃花源",
            icon: "https://www.vop2.cn/icon/taohua.jpg",
            music: "https://www.vop2.cn/music/hzh/taohua1.mp3"
        }, {
            id: 9,
            title: "风车",
            icon: "https://www.vop2.cn/icon/fengche.jpg",
            music: "https://www.vop2.cn/music/hzh/5bf3b02617fe5.mp3"
        }, {
            id: 13,
            title: "玫瑰",
            icon: "https://www.vop2.cn/icon/meigui.jpg",
            music: "https://www.vop2.cn/music/hzh/meigui1.mp3"
        }, {
            id: 1,
            title: "蒲公英",
            icon: "https://www.vop2.cn/icon/pugongying.jpg",
            music: "https://www.vop2.cn/music/hzh/5befb45f42688.mp3"
        }, {
            id: 14,
            title: "莲",
            icon: "https://www.vop2.cn/icon/lianhua.jpg",
            music: "https://www.vop2.cn/music/hzh/lianhua1.mp3"
        }, {
            id: 5,
            title: "彩蝶",
            icon: "https://www.vop2.cn/icon/caidie.jpg",
            music: "https://www.vop2.cn/music/hzh/5bf3afffa8c9e.mp3"
        }, {
            id: 11,
            title: "雪季",
            icon: "https://www.vop2.cn/icon/xue.jpg",
            music: "https://www.vop2.cn/music/hzh/xue1.mp3"
        }, {
            id: 6,
            title: "雨天",
            icon: "https://www.vop2.cn/icon/yutian.jpg",
            music: "https://www.vop2.cn/music/hzh/5be923394153a.mp3"
        }, {
            id: 15,
            title: "紫藤",
            icon: "https://www.vop2.cn/icon/ziteng.jpg",
            music: "https://www.vop2.cn/music/hzh/ziteng1.mp3"
        }, {
            id: 10,
            title: "晚安",
            icon: "https://www.vop2.cn/icon/wanan.jpg",
            music: "https://www.vop2.cn/music/hzh/5be9311db2934.mp3"
        }, {
            id: 3,
            title: "纸飞机",
            icon: "https://www.vop2.cn/icon/feiji3.jpg",
            music: "https://www.vop2.cn/music/hzh/5be0fae43cafb.mp3"
        } ]
    },
    onLoad: function(c) {
        var o = this;
        wx.request({
            url: i.host + "index.php?c=Sharetxt&a=contxt",
            method: "post",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                o.setData({
                    sharearr: t.data
                });
            }
        }), this.setData({
            xcid: c.id
        }), this.huoqutupian(), wx.login({
            success: function(c) {
                wx.request({
                    url: i.requestUrl + "&a=getOpenid&code=" + c.code,
                    success: function(i) {
                        t.globalData.openid = i.data, o.setData({
                            openid: i.data
                        }), console.log(o.data.openid);
                    }
                });
            }
        });
    },
    huoqutupian: function() {
        var t = this;
        wx.request({
            url: i.host + "index.php?c=HZH&a=getHZHbyid",
            data: {
                id: this.data.xcid
            },
            success: function(i) {
                console.log(i.data), t.setData({
                    tu: i.data
                }), c.src = i.data.music, c.autoplay = !0, c.loop = !0;
                var o = [];
                o[i.data.skin_id] = "display:block", t.setData({
                    a: o
                });
            }
        });
    },
    zhizuo: function() {
        var t = this;
        c.pause(), wx.chooseImage({
            count: "1",
            sizeType: [ "compressed" ],
            sourceType: [ "album" ],
            success: function(c) {
                console.log(c), wx.uploadFile({
                    url: i.host + "index.php?c=HZH&a=wxUpload",
                    filePath: c.tempFilePaths[0],
                    name: "photo",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    formData: {
                        openid: t.data.openid,
                        skin: 7,
                        music: "https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3"
                    },
                    success: function(t) {
                        var i = t.data.replace(/\ufeff/g, ""), c = JSON.parse(i);
                        console.log(c.id), wx.navigateTo({
                            url: "zhizuo?id=" + c.id
                        });
                    }
                });
            }
        });
    }
});