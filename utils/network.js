module.exports = {
    request: function(t, e, i, o) {
        this.requestLoading(t, e, "", i, o);
    },
    requestLoading: function(t, e, i, o, a) {
        wx.showNavigationBarLoading(), "" != i && wx.showLoading({
            title: i
        }), wx.request({
            url: t,
            data: e,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                wx.hideNavigationBarLoading(), 0 != t.data && (200 == t.statusCode ? o(t.data) : a()), 
                "" != i && wx.hideLoading();
            },
            fail: function(t) {
                wx.hideNavigationBarLoading(), "" != i && wx.hideLoading(), a();
            },
            complete: function(t) {
                wx.stopPullDownRefresh();
            }
        });
    }
};