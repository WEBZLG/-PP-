function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = getApp(), a = require("../../../common/util.js"), i = a.getUrl, n = a.postUrl;

Page({
    data: {
        previewData: {},
        hotMusic: [],
        networkImageUrl: e.globalData.IMAGE_URL,
        textbgImg: e.globalData.IMAGE_URL + "textpreviewbg.jpg"
    },
    onLoad: function(t) {
        var e = getCurrentPages(), a = e[e.length - 2].data.previewData;
        this.setData({
            previewData: a
        }), this.getMusicList(1001, 1, 30);
    },
    disTextSubmit: function(t) {
        var a = this;
        "" != t.detail.value.textarea ? (this.setData({
            "previewData.type": "text",
            "previewData.detailData": [ {
                text: t.detail.value.textarea,
                src: this.data.networkImageUrl + "textpreviewbg.jpg"
            } ]
        }), n({
            url: e.globalData.CHECK_TEXT_URL,
            data: {
                text: t.detail.value.textarea
            },
            callback: function(t) {
                100200 == t.code ? a.gotoPreviewPage() : wx.showToast({
                    title: "请检查是否包含敏感词等信息!",
                    icon: "none",
                    duration: 2e3
                });
            }
        })) : wx.showModal({
            content: "请输入文字内容",
            showCancel: !1,
            cancelColor: "#333333",
            confirmText: "确定",
            confirmColor: "#333333",
            success: function(t) {}
        });
    },
    delImageHandle: function(t) {
        if (0 != this.data.previewData.detailData.length) {
            var e = t.currentTarget.dataset.index, a = this.data.previewData.detailData;
            a.splice(e, 1), this.setData({
                "previewData.detailData": a
            });
        }
    },
    addImageHandle: function(t) {
        var e = this, a = t.currentTarget.dataset.index, i = e.data.previewData.detailData;
        wx.chooseImage({
            sizeType: [ "original" ],
            success: function(t) {
                var n = t.tempFilePaths;
                0 != n.length && (i.length + n.length > 9 ? wx.showModal({
                    title: "提示",
                    content: "您只能再选" + (9 - i.length) + "张图片, 请重新选择",
                    success: function(t) {}
                }) : (n.forEach(function(t) {
                    var e = {
                        text: "",
                        src: t
                    };
                    i.splice(a + 1, 0, e), a++;
                }), e.setData({
                    "previewData.detailData": i
                })));
            }
        });
    },
    editAreaFocus: function(e) {
        var a = "previewData.detailData[" + e.currentTarget.dataset.index + "].error";
        this.setData(t({}, a, !1));
    },
    writeImgTxt: function(e) {
        var a = "previewData.detailData[" + e.currentTarget.dataset.index + "].text";
        this.setData(t({}, a, e.detail.value));
    },
    checkTextHandle: function(a, i) {
        var o = this, r = this;
        n({
            url: e.globalData.CHECK_TEXT_URL,
            data: {
                text: i[a].text
            },
            callback: function(e) {
                100200 == e.code ? (++a == i.length && o.gotoPreviewPage(), a < i.length && r.checkTextHandle(a, i)) : (wx.showToast({
                    title: "请检查是否包含敏感词等信息!",
                    icon: "none",
                    duration: 2e3
                }), o.setData(t({}, "previewData.detailData[" + a + "].error", !0)));
            }
        });
    },
    disImageSubmit: function(t) {
        if (0 != this.data.previewData.detailData.length) {
            var e = this.data.previewData.detailData;
            this.checkTextHandle(0, e);
        }
    },
    deletePreviewData: function() {
        wx.showModal({
            content: "是否放弃此次编辑 ？",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "#333333",
            confirmText: "确定",
            confirmColor: "#333333",
            success: function(t) {
                t.cancel || wx.navigateBack();
            }
        });
    },
    gotoPreviewPage: function() {
        var t = this;
        if (this.data.previewData.music) if ("image" == this.data.previewData.type) {
            var e = this.data.previewData.detailData;
            this.setTextPosition(e, function() {
                var a = [];
                if (e.forEach(function(t, e) {
                    t.size && a.push(parseInt(e) + 1);
                }), a.length > 0) return wx.showToast({
                    title: "第" + a.join(", ") + "张图片尺寸不支持",
                    icon: "none",
                    duration: 2500
                }), void t.setData({
                    "previewData.detailData": e
                });
                e.forEach(function(t) {
                    delete t.error, delete t.size;
                }), t.setData({
                    "previewData.detailData": e
                }), wx.navigateTo({
                    url: "/pages/add/publish-preview/publish-preview"
                });
            });
        } else wx.navigateTo({
            url: "/pages/add/publish-preview/publish-preview"
        }); else wx.showToast({
            title: "请选择音乐",
            icon: "none"
        });
    },
    setTextPosition: function(t, e) {
        var a = [];
        t.forEach(function(t) {
            var e = new Promise(function(e, a) {
                wx.getImageInfo({
                    src: t.src,
                    success: function(a) {
                        e(a), a.width < 2.2 * a.height && 2.2 * a.width > a.height ? t.size = !1 : t.size = !0, 
                        a.width < a.height ? t.bottom = "20%" : t.bottom = (wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth * a.height / a.width) / 2 + "px";
                    },
                    fail: function(t) {
                        a(t);
                    }
                });
            });
            a.push(e);
        }), Promise.all(a).then(function(t) {
            return e();
        });
    },
    gotoMusicPage: function(t) {
        wx.navigateTo({
            url: "/pages/add/music/music"
        });
    },
    getMusicList: function(t, a, n) {
        var o = this;
        i({
            url: e.globalData.GET_MUSIC_LIST_URL,
            data: {
                musicType: t,
                pageNo: a,
                pageSize: n
            },
            callback: function(t) {
                if (100200 == t.code) {
                    if (!t.data.list) return;
                    var e = t.data.list, a = Math.floor(Math.random() * e.length + 1) - 1, i = {
                        id: e[a].musicId,
                        url: e[a].musicUrl,
                        name: e[a].musicName
                    };
                    o.setData({
                        hotMusic: e,
                        "previewData.music": i
                    });
                }
            }
        });
    }
});