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
        tuurl: "",
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
    onLoad: function(t) {
        var c = this;
        this.setData({
            xcid: t.id
        }), wx.request({
            url: i.host + "index.php?c=Sharetxt&a=contxt",
            method: "post",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                c.setData({
                    sharearr: t.data
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
                }), c.src = i.data.music;
                var s = [];
                s[i.data.skin_id] = "display:block", t.setData({
                    a: s
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        c.autoplay = !0, c.src = "", c.loop = !0;
        this.huoqutupian();
    },
    onShareAppMessage: function() {
        return {
            title: "我的照片动起来了，简直太美了！",
            path: "/pages/hzh/share?id=" + this.data.xcid,
            imageUrl: i.host + this.data.tu.image,
            success: function() {
                wx.showToast({
                    title: "分享成功",
                    icon: "success"
                });
            }
        };
    },
    texiao: function(s) {
        console.log(s);
        var a = this, n = s.currentTarget.dataset.id, o = s.currentTarget.dataset.music;
        c.src = o;
        var e = [];
        e[n] = "display:block", a.setData({
            a: e,
            skinid: n,
            skinmusic: o
        }), wx.request({
            url: i.host + "index.php?c=HZH&a=shareAdd",
            data: {
                openid: t.globalData.openid,
                imageurl: a.data.tu.image,
                skin: n,
                music: o
            },
            success: function(t) {
                a.setData({
                    xcid: t.data
                });
            }
        });
    },
    changeimage: function() {
        var c = this;
        wx.chooseImage({
            count: "1",
            sizeType: [ "compressed" ],
            sourceType: [ "album" ],
            success: function(s) {
                wx.uploadFile({
                    url: i.host + "index.php?c=HZH&a=wxUpload",
                    filePath: s.tempFilePaths[0],
                    name: "photo",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    formData: {
                        openid: t.globalData.openid,
                        skin: c.data.skinid,
                        music: "https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3"
                    },
                    success: function(t) {
                        var i = t.data.replace(/\ufeff/g, ""), s = JSON.parse(i);
                        console.log(s.id), c.setData({
                            xcid: s.id
                        }), c.huoqutupian();
                    }
                });
            }
        });
    }
});