var t = getApp(), a = require("crypto-js.js"), e = function(t) {
    for (var a = Object.keys(t).sort(), e = "", n = 0; n < a.length; n++) e += 0 == n ? "?" + a[n] + "=" + t[a[n]] : "&" + a[n] + "=" + t[a[n]];
    return e;
}, n = function(a) {
    a.data.token = t.globalData.token || wx.getStorageSync("token"), wx.request({
        url: a.url,
        data: a.data,
        method: "POST",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            a.callback && a.callback(t.data);
        },
        fail: function(t) {}
    });
}, r = function(t) {
    var a = t.key;
    for (var e in t.data) "openid" != e && (a += "_" + t.data[e]);
    return a;
};

module.exports = {
    postUrl: n,
    getUrl: function(a) {
        a.data.token = t.globalData.token || wx.getStorageSync("token"), wx.request({
            url: a.url,
            data: a.data,
            method: "GET",
            success: function(t) {
                a.callback && a.callback(t.data);
            },
            fail: function(t) {}
        });
    },
    getCache: function(t) {
        t.key = r(t);
        var a = wx.getStorageSync(t.key) || {};
        if (void 0 == a.data || a.expires && a.expires < Date.now()) {
            var e = {
                url: t.url,
                data: t.data,
                callback: function(a) {
                    var e = {
                        data: a,
                        expires: Date.now() + 1e3 * t.time
                    };
                    wx.setStorageSync(t.key, e), t.callback && t.callback(a);
                }
            };
            n(e);
        } else t.callback && t.callback(a.data);
    },
    wxPromisify: function(t) {
        return function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(e, n) {
                a.success = function(t) {
                    e(t);
                }, a.fail = function(t) {
                    n(t);
                }, t(a);
            });
        };
    },
    encryptPostUrl: function(n) {
        n.data.secretId = 56598565254, n.data.timestamp = +new Date(), n.data.nonce = Math.floor(1e9 * Math.random());
        var r = e(n.data), o = a.HmacSHA256(r, "acdef123541UIKssC"), c = a.enc.Base64.stringify(o);
        n.data.sign = c, n.data.token = t.globalData.token || wx.getStorageSync("token"), 
        wx.request({
            url: n.url,
            data: n.data,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                n.callback && n.callback(t.data);
            },
            fail: function(t) {}
        });
    },
    getRealHeight: function(t) {
        return t * wx.getSystemInfoSync().windowWidth / 750;
    },
    switchUserPage: function(a) {
        if (a == t.globalData.userInfo.userId) return wx.switchTab({
            url: "/pages/tabBar/user/user"
        }), !0;
    },
    linkRule: function(t) {
        getCurrentPages().length > 6 ? wx.redirectTo({
            url: t
        }) : wx.navigateTo({
            url: t
        });
    },
    gaussBlur: function(t) {
        var a, e, n, r, o, c, l, i, u, s, f = t.data, d = t.width, g = t.height, w = [], k = 0;
        for (c = 1 / (5 * Math.sqrt(2 * Math.PI)), o = -.02, l = 0, a = -10; a <= 10; a++, 
        l++) r = c * Math.exp(o * a * a), w[l] = r, k += r;
        for (l = 0, s = w.length; l < s; l++) w[l] /= k;
        for (e = 0; e < g; e++) for (a = 0; a < d; a++) {
            for (n = r = o = c = 0, k = 0, i = -10; i <= 10; i++) (u = a + i) >= 0 && u < d && (n += f[l = 4 * (e * d + u)] * w[i + 10], 
            r += f[l + 1] * w[i + 10], o += f[l + 2] * w[i + 10], k += w[i + 10]);
            f[l = 4 * (e * d + a)] = n / k, f[l + 1] = r / k, f[l + 2] = o / k;
        }
        for (a = 0; a < d; a++) for (e = 0; e < g; e++) {
            for (n = r = o = c = 0, k = 0, i = -10; i <= 10; i++) (u = e + i) >= 0 && u < g && (n += f[l = 4 * (u * d + a)] * w[i + 10], 
            r += f[l + 1] * w[i + 10], o += f[l + 2] * w[i + 10], k += w[i + 10]);
            f[l = 4 * (e * d + a)] = n / k, f[l + 1] = r / k, f[l + 2] = o / k;
        }
        return t;
    },
    drawTextFn: function(t, a, e, n, r, o) {
        for (var c = 0, l = r + 20, i = 0, u = 0; u < a.length; u++) (c += t.measureText(a[u]).width) > o && (t.fillText(a.substring(i, u), e, n, o), 
        n += r, c = 0, i = u, l += r), u == a.length - 1 && t.fillText(a.substring(i, u + 1), e, n, o);
        return l;
    }
};