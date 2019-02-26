function t(t, a, s) {
    return a in t ? Object.defineProperty(t, a, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = s, t;
}

var a = getApp(), s = require("../../../common/util"), i = s.getUrl, e = (s.postUrl, 
void 0);

Page({
    data: {
        musicMenu: [],
        hotMusic: {
            typeId: 1001,
            pageNo: 1,
            pageSize: 30,
            data: {}
        },
        collectMusic: {
            typeId: 1002,
            pageNo: 1,
            pageSize: 10,
            data: {}
        },
        collectFlag: !0,
        searchFlag: !1,
        search: {
            keyWord: "",
            value: "",
            pageNo: 1,
            pageSize: 10,
            count: 0,
            lastId: 0,
            list: [],
            listEnd: !1,
            LoadFlag: !0
        },
        currentMusic: {
            id: 0,
            url: "",
            name: ""
        },
        currType: 1001,
        previewData: {}
    },
    onLoad: function(t) {
        e = wx.createInnerAudioContext();
        var a = getCurrentPages(), s = a[a.length - 2].data.previewData;
        this.setData({
            previewData: s
        });
    },
    onReady: function() {
        this.getMusicMenu(), this.getMusicList(this.data.hotMusic.typeId, this.data.hotMusic.pageNo, this.data.hotMusic.pageSize), 
        this.getMusicList(this.data.collectMusic.typeId, this.data.collectMusic.pageNo, this.data.collectMusic.pageSize);
    },
    onShow: function() {
        this.getMusicList(this.data.hotMusic.typeId, this.data.hotMusic.pageNo, this.data.hotMusic.pageSize), 
        this.getMusicList(this.data.collectMusic.typeId, this.data.collectMusic.pageNo, this.data.collectMusic.pageSize);
    },
    onHide: function() {
        this.stopMusicFn();
    },
    onUnload: function() {
        this.stopMusicFn();
    },
    onReachBottom: function() {
        this.data.searchFlag && this.loadSearhMusic();
    },
    getMusicMenu: function() {
        var t = this;
        i({
            url: a.globalData.GET_MUSIC_TYPE_URL,
            data: {},
            callback: function(a) {
                100200 == a.code && t.setData({
                    musicMenu: a.data.list
                });
            }
        });
    },
    getMusicList: function(t, s, e) {
        var c = this;
        i({
            url: a.globalData.GET_MUSIC_LIST_URL,
            data: {
                musicType: t,
                pageNo: s,
                pageSize: e
            },
            callback: function(t) {
                if (100200 == t.code) {
                    if (!t.data.list) return;
                    t.data.list.forEach(function(t) {
                        t.playFlag = !1;
                    }), t.data.musicType == c.data.hotMusic.typeId && c.setData({
                        "hotMusic.data": t.data
                    }), t.data.musicType == c.data.collectMusic.typeId && c.setData({
                        "collectMusic.data": t.data
                    });
                }
            }
        });
    },
    musicListTab: function(t) {
        this.setData({
            currType: t.currentTarget.dataset.type
        }), this.data.currentMusic.id && this.stopMusicFn();
    },
    playMusicFn: function(t) {
        e.destroy(), (e = wx.createInnerAudioContext()).title = "背景音乐", e.autoplay = !0, 
        e.loop = !0, e.src = t;
    },
    stopMusicFn: function() {
        var t = this.data.hotMusic.data.list, a = this.data.collectMusic.data.list, s = this.data.search.list;
        t.forEach(function(t) {
            t.playFlag = !1;
        }), a.forEach(function(t) {
            t.playFlag = !1;
        }), s.forEach(function(t) {
            t.playFlag = !1;
        }), this.setData({
            "currentMusic.id": 0,
            "currentMusic.url": "",
            "currentMusic.name:": "",
            "hotMusic.data.list": t,
            "collectMusic.data.list": a,
            "search.list": s
        }), e.stop();
    },
    playMusicHandle: function(t) {
        var a = t.currentTarget.dataset.id, s = t.currentTarget.dataset.thumbs, i = this.data.hotMusic.data.list, e = this.data.collectMusic.data.list, c = this.data.search.list, l = "", u = "";
        s ? this.stopMusicFn() : (this.data.searchFlag ? (c.forEach(function(t) {
            a == t.musicId ? (t.playFlag = !t.playFlag, u = t.musicUrl, l = t.musicName) : t.playFlag = !1;
        }), this.setData({
            "search.list": c
        })) : this.data.currType == this.data.hotMusic.typeId ? (i.forEach(function(t) {
            a == t.musicId ? (t.playFlag = !t.playFlag, u = t.musicUrl, l = t.musicName) : t.playFlag = !1;
        }), this.setData({
            "hotMusic.data.list": i
        })) : this.data.currType == this.data.collectMusic.typeId && (e.forEach(function(t) {
            a == t.musicId ? (t.playFlag = !t.playFlag, u = t.musicUrl, l = t.musicName) : t.playFlag = !1;
        }), this.setData({
            "collectMusic.data.list": e
        })), this.setData({
            "currentMusic.id": a,
            "currentMusic.url": u,
            "currentMusic.name": l
        }), this.playMusicFn(this.data.currentMusic.url));
    },
    chooseMusicHandle: function(t) {
        var a = getCurrentPages(), s = a[a.length - 2];
        this.setData({
            "previewData.music": this.data.currentMusic
        }), s.setData({
            "previewData.music": this.data.currentMusic
        }), wx.showLoading({
            title: "音乐加载中",
            mask: !0
        }), setTimeout(function() {
            wx.hideLoading(), wx.navigateBack();
        }, 1500);
    },
    collectMusicHandle: function(s) {
        var e = this;
        if (this.data.collectFlag) {
            var c = s.currentTarget.dataset.id, l = this.data.hotMusic.data.list, u = this.data.collectMusic.data.list, o = this.data.search.list;
            this.setData({
                collectFlag: !1,
                collectMusicId: c
            }), i({
                url: a.globalData.COLLECT_MUSIC_URL,
                data: {
                    musicId: c
                },
                callback: function(a) {
                    if (100200 == a.code) {
                        if (e.setData({
                            collectFlag: !0
                        }), a.data.collectionStatus) {
                            var s = [];
                            l.some(function(a, i) {
                                if (a.musicId == e.data.collectMusicId) return e.setData(t({}, "hotMusic.data.list[" + i + "].thumbs", !a.thumbs)), 
                                s = a, !0;
                            }), o.some(function(a, i) {
                                if (a.musicId == e.data.collectMusicId) return e.setData(t({}, "search.list[" + i + "].thumbs", !a.thumbs)), 
                                s = a, !0;
                            }), u.unshift(s), wx.showToast({
                                title: "收藏成功",
                                icon: "none"
                            });
                        } else l.some(function(a, s) {
                            if (a.musicId == e.data.collectMusicId) return e.setData(t({}, "hotMusic.data.list[" + s + "].thumbs", !a.thumbs)), 
                            !0;
                        }), o.some(function(a, s) {
                            if (a.musicId == e.data.collectMusicId) return e.setData(t({}, "search.list[" + s + "].thumbs", !a.thumbs)), 
                            !0;
                        }), u.some(function(t, a) {
                            if (t.musicId == e.data.collectMusicId) return u.splice(a, 1), !0;
                        }), wx.showToast({
                            title: "取消收藏成功",
                            icon: "none"
                        });
                        e.setData({
                            "hotMusic.data.list": l,
                            "collectMusic.data.list": u,
                            "search.list": o
                        });
                    }
                }
            });
        }
    },
    gotoMusicListPage: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/publish/music/music-list/music-list?musicType=" + a
        });
    },
    searchHandle: function() {
        this.setData({
            searchFlag: !this.data.searchFlag,
            search: {
                keyWord: "",
                value: "",
                pageNo: 1,
                pageSize: 10,
                count: 0,
                lastId: 0,
                list: [],
                listEnd: !1,
                LoadFlag: !0
            }
        });
    },
    searchMusic: function(t) {
        (t.detail.value.text || t.detail.value) && (this.setData({
            search: {
                keyWord: t.detail.value.text || t.detail.value,
                value: "",
                pageNo: 1,
                pageSize: 10,
                count: 0,
                lastId: 0,
                list: [],
                listEnd: !1,
                LoadFlag: !0
            }
        }), this.loadSearhMusic());
    },
    searchBindinput: function(t) {
        this.setData({
            "search.value": t.detail.value,
            "search.keyWord": t.detail.value
        });
    },
    loadSearhMusic: function() {
        var t = this;
        this.data.search.listEnd || this.data.search.LoadFlag && (this.setData({
            "search.LoadFlag": !1
        }), i({
            url: a.globalData.SEARCH_MUSIC_URL,
            data: {
                pageNo: this.data.search.pageNo,
                pageSize: this.data.search.pageSize,
                keyWord: this.data.search.keyWord,
                lastId: this.data.search.lastId
            },
            callback: function(a) {
                if (100200 == a.code) {
                    if (!a.data.list || 0 == a.data.list.length) return void t.setData({
                        "search.listEnd": !0
                    });
                    a.data.list.length < t.data.search.pageSize && t.setData({
                        "search.listEnd": !0
                    }), t.data.search.lastId || t.setData({
                        "search.count": a.data.count
                    }), a.data.list.forEach(function(t) {
                        t.playFlag = !1;
                    }), t.setData({
                        "search.LoadFlag": !0,
                        "search.pageNo": t.data.search.pageNo + 1,
                        "search.lastId": a.data.list[a.data.list.length - 1].musicId,
                        "search.list": t.data.search.list.concat(a.data.list)
                    });
                }
            }
        }));
    }
});