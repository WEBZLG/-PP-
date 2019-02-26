function t(t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t;
}

var a = getApp(), i = require("../../../../common/util"), s = i.getUrl, c = (i.postUrl, 
void 0);

Page({
    data: {
        musicType: "",
        music: {
            pageNo: 1,
            pageSize: 10,
            count: 0,
            lastId: 0,
            list: [],
            listEnd: !1,
            loadFlag: !0
        },
        currentMusic: {
            id: 0,
            url: "",
            name: ""
        },
        collectFlag: !0
    },
    onLoad: function(t) {
        c = wx.createInnerAudioContext();
        var a = getCurrentPages(), i = a[a.length - 2].data.previewData;
        this.setData({
            previewData: i
        }), t && this.setData({
            musicType: t.musicType
        });
    },
    onReady: function() {
        this.getMusicList(this.data.musicType);
    },
    onShow: function() {},
    onHide: function() {
        this.stopMusicFn();
    },
    onUnload: function() {
        this.stopMusicFn();
    },
    onPullDownRefresh: function() {
        this.setData({
            music: {
                pageNo: 1,
                pageSize: 10,
                count: 0,
                lastId: 0,
                list: [],
                listEnd: !1,
                loadFlag: !0
            },
            currentMusic: {
                id: 0,
                url: "",
                name: ""
            },
            collectFlag: !0
        }), this.getMusicList(this.data.musicType), c.stop();
    },
    onReachBottom: function() {
        this.getMusicList(this.data.musicType);
    },
    getMusicList: function(t) {
        var i = this;
        this.data.music.listEnd || this.data.music.loadFlag && (this.setData({
            "music.loadFlag": !1
        }), s({
            url: a.globalData.GET_MUSIC_LIST_URL,
            data: {
                musicType: t,
                pageNo: this.data.music.pageNo,
                pageSize: this.data.music.pageSize,
                lastId: this.data.music.lastId
            },
            callback: function(t) {
                if (100200 == t.code) {
                    if (!t.data.list || 0 == t.data.list.length) return void i.setData({
                        "music.listEnd": !0
                    });
                    t.data.list.length < i.data.music.pageSize && i.setData({
                        "music.listEnd": !0
                    }), i.data.music.lastId || i.setData({
                        "music.count": t.data.count
                    }), t.data.list.forEach(function(t) {
                        t.playFlag = !1;
                    }), i.setData({
                        "music.loadFlag": !0,
                        "music.pageNo": i.data.music.pageNo + 1,
                        "music.lastId": t.data.list[t.data.list.length - 1].musicId,
                        "music.list": i.data.music.list.concat(t.data.list)
                    });
                }
            }
        }));
    },
    playMusicFn: function(t) {
        c.stop(), (c = wx.createInnerAudioContext()).title = "背景音乐", c.autoplay = !0, c.loop = !0, 
        c.src = t;
    },
    stopMusicFn: function() {
        var t = this.data.music.list;
        t.forEach(function(t) {
            t.playFlag = !1;
        }), this.setData({
            "currentMusic.id": 0,
            "currentMusic.url": "",
            "currentMusic.name:": "",
            "music.list": t
        }), c.stop(), c.destroy();
    },
    playMusicHandle: function(t) {
        var a = t.currentTarget.dataset.id, i = t.currentTarget.dataset.thumbs, s = this.data.music.list, c = "", e = "";
        i ? this.stopMusicFn() : (s.forEach(function(t) {
            a == t.musicId ? (t.playFlag = !t.playFlag, c = t.musicUrl, e = t.musicName) : t.playFlag = !1;
        }), this.setData({
            "currentMusic.id": a,
            "currentMusic.url": c,
            "currentMusic.name": e,
            "music.list": s
        }), this.playMusicFn(this.data.currentMusic.url));
    },
    chooseMusicHandle: function(t) {
        var a = getCurrentPages(), i = a[a.length - 2], s = a[a.length - 3];
        this.setData({
            "previewData.music": this.data.currentMusic
        }), i.setData({
            "previewData.music": this.data.currentMusic
        }), s.setData({
            "previewData.music": this.data.currentMusic
        }), wx.showLoading({
            title: "音乐加载中",
            mask: !0
        }), setTimeout(function() {
            wx.hideLoading(), wx.navigateBack({
                delta: 2
            });
        }, 1500);
    },
    collectMusicHandle: function(i) {
        var c = this;
        if (this.data.collectFlag) {
            var e = i.currentTarget.dataset.id, u = this.data.music.list;
            this.setData({
                collectFlag: !1,
                collectMusicId: e
            }), s({
                url: a.globalData.COLLECT_MUSIC_URL,
                data: {
                    musicId: e
                },
                callback: function(a) {
                    100200 == a.code && (c.setData({
                        collectFlag: !0
                    }), a.data.collectionStatus ? (u.some(function(a, i) {
                        if (a.musicId == c.data.collectMusicId) return c.setData(t({}, "music.list[" + i + "].thumbs", !a.thumbs)), 
                        !0;
                    }), wx.showToast({
                        title: "收藏成功",
                        icon: "none"
                    })) : (u.some(function(a, i) {
                        if (a.musicId == c.data.collectMusicId) return 1002 == c.data.musicType ? (u.splice(i, 1), 
                        u.length < 6 && u.length < c.data.music.count && c.getMusicList(c.data.musicType)) : c.setData(t({}, "music.list[" + i + "].thumbs", !a.thumbs)), 
                        !0;
                    }), wx.showToast({
                        title: "取消收藏成功",
                        icon: "none"
                    })), c.setData({
                        "music.list": u
                    }));
                }
            });
        }
    }
});