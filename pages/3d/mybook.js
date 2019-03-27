var t = getApp(), e = require("../../utils/config.js");

Page({
    data: {
        photolist: [],
        userInfo: [],
        UnionID: null,
        ad: e.ad,
        host: e.host
    },
    photoLoad: function(t) {
        var a = this;
        wx.request({
            url: e.host + "index.php?m=WEB&c=D3Photos&a=WXgetListByuid",
            data: {
                uid: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.setData({
                    photolist: t.data
                }), console.log(t.data);
            }
        });
    },
    onLoad: function() {
      const that = this;
      wx.setNavigationBarTitle({
        title: '我的相册',
      }),
        wx.getStorage({
          key: 'openId',
          success(res) {
            console.log(res.data)
            that.setData({
              UnionID: res.data
            })
          }
        });
    },
    onShow: function() {
      const that = this;
      this.photoLoad(that.data.UnionID);
    },
    newphoto: function() {
        var t = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "compressed" ],
            sourceType: [ "album" ],
            success: function(e) {
                console.log("获取图片路径"), console.log(e.tempFilePaths);
                e.tempFilePaths;
                t.uploadImage(e.tempFilePaths);
            }
        });
    },
    uploadImage: function(t) {
        wx.uploadFile({
            url: e.host + "index.php?m=WEB&c=D3Uploader&a=wxUpload",
            filePath: t[0],
            name: "createImage",
            header: {
                chartset: "utf-8",
                "content-type": "multipart/form-data"
            },
            formData: {
                unionid: this.data.UnionID
            },
            success: function(a) {
                var o = a.data.replace(/\ufeff/g, ""), n = JSON.parse(o), i = parseInt(n.wxid);
                for (var s in t) wx.uploadFile({
                    url: e.host + "index.php?m=WEB&c=D3Uploader&a=wxUploadlist",
                    filePath: t[s],
                    name: "photo",
                    header: {
                        chartset: "utf-8",
                        "content-type": "multipart/form-data"
                    },
                    formData: {
                        tuid: i,
                        one: s
                    },
                    success: function(t) {
                        console.log("副表返回ID：" + t.data);
                    }
                });
                wx.navigateTo({
                    url: "view?id=" + parseInt(i) + "&share=0"
                });
            }
        });
    },
    remove: function(t) {
        console.log(t);
        var e = this;
        wx.showModal({
            title: "温馨提示",
            content: "是否确定删除该相册",
            showCancel: !0,
            success: function(a) {
                console.log(a), a.confirm ? (console.log(t.currentTarget.dataset.id), e.del(t.currentTarget.dataset.id)) : console.log("用户点击取消");
            }
        });
    },
    del: function(t) {
        var a = this;
        wx.request({
            url: e.host + "index.php?m=WEB&c=D3View&a=delKxiuByid",
            data: {
                wxid: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), console.log(t.data), a.photoLoad(t.data);
            }
        });
    },
    backindex: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    sharee: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "share?id=" + e
        });
    },
    look: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "view?id=" + e + "&share=1"
        });
    },
    dan: function(t) {
        var a = t.currentTarget.dataset.id;
        t.currentTarget.dataset.bg, t.currentTarget.dataset.skinurl, t.currentTarget.dataset.musicurl;
        wx.request({
            url: e.host + "index.php?m=WEB&c=D3View&a=addclick",
            data: {
                wxid: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                wx.navigateTo({
                    url: "view?id=" + a + "&share=0"
                });
            }
        });
    }
});