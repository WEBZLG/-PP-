function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    formatTime: function(e) {
        var n = e.getMonth() + 1, o = e.getDate(), r = e.getHours(), i = e.getMinutes();
        return [ n, o ].map(t).join("-") + " " + [ r, i ].map(t).join(":");
    }
};