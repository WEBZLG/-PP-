const app = getApp()

Page({

  data: {
    IndexList: [],//获取首页数组
    uid: '',//发布人的ID
    content: '',//发布介绍
    url: '',//视频地址
    pic: '',//第一帧图片
    id: '',//作品ID
    wxname: '',//发布人昵称
    wximage: '',//发布人头像
    name: '',//歌曲名
    if_pass: '',//是否认证
    if_activity: '',//1为发布活动 0为普通发布
    likenum: '',//点赞数
    commentnum: '',//评论数
    sharenum: '',//分享数
    top: '',//送礼物排行榜
    relation: '',//关注/为关注
    if_like: '', //0未点赞  1点赞了
    // 评论
    content: '',//内容
    // CommentList: [],
    commentList: [{
      // userzan:0,
      userimg:'../../image/like_red.png',
      username: 'Luka Addway',
      ComTime: '02-19 11:25',
      ComContent: '兄弟你这也太帅了,兄弟你这也太帅了,兄弟你这也太帅了,兄弟你这也太帅了',
    }, {
        userimg: '../../image/like_red.png',
        username: '叫我老王',
        ComTime: '02-19 11:25',
        ComContent: '可以可以',
      }],
    ball_height: 2,
    //播放按钮
    display_play: 'none',
    //点击评论隐藏图标
    display_pl: 'block',
    count: 1,//视频爱心点赞
    commentcount:1,//评论点赞
    index_num: 1,
    play: 'none',
    inputValue: '',
    index: 1,
    vid: 0,
    pagey: '',
    vsrc: ['http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" binderror="videoErrorCallback', 'http://v2018.zhuoxuncn.com/zhuoxunvideo/20181220/0104_1.mp4', 'http://v2018.zhuoxuncn.com/zhuoxunvideo/20181123/27.mp4', 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" ,binderror="videoErrorCallback', 'http://v2018.zhuoxuncn.com/zhuoxunvideo/20181220/0104_1.mp4', 'http://v2018.zhuoxuncn.com/zhuoxunvideo/20181123/27.mp4', 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" binderror="videoErrorCallback', 'http://v2018.zhuoxuncn.com/zhuoxunvideo/20181220/0104_1.mp4',],
    src: '',

  },
  //地址
  switchcity: function () {
    wx.navigateTo({
      url: '../switchcity/switchcity'
    })
  },
  //搜索
  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 关注
  focus: function (e) {
    var that=this;
    const index=e.currentTarget.dataset.id;
    const eachrelation = e.currentTarget.dataset.item.relation;
    const relationIndex = "IndexList[" + index + "].relation";
    this.setData({
      [relationIndex]: 1,
      eachrelation: eachrelation,
      IndexList: this.data.IndexList,
    })
    if (eachrelation == 0) {
      this.setData({
        [relationIndex]: 1,
      })
    } else {
      this.setData({
        [relationIndex]: 0,
      })
    }
  },
  /// 单击、双击
  multipleTap: function (e) {
    var that = this
    var currentTime = e.timeStamp
    var lastTapTime = that.lastTapTime
    that.lastTapTime = currentTime
    if (currentTime - lastTapTime < 300) {
      // 双击触发
      // console.log("double tap")
      clearTimeout(that.lastTapTimeoutFunc);
      // console.log(this.data)
      var that = this;
      // 提交点赞
      var vid = this.data.vid;
      if (this.data.count == '1') {
        that.setData({
          fav: -1,
          if_like: 0,
          count: 2
        })
      } else if (this.data.count == '2') {
        that.setData({
          if_like: 1,
          count: 1
        })
      }
    } else {
      //单击触发
      that.lastTapTimeoutFunc = setTimeout(function () {
        // console.log(that.data)
        // console.log(that.data.index_num)
        that.setData({
          index_num: that.data.index_num + 1
        });
        if (that.data.index_num % 2 == 1) {
          // console.log('播放')
          that.videoContext.play()
          that.setData({
            display_play: 'none'
          })
        } else {
          // console.log('暂停')
          that.videoContext.pause()
          that.setData({
            display_play: 'block'
          })
        }
      }, 300);
    }

  },
  // 点击图片的点赞事件  
  toCollect: function (e) {

    var that = this;
    // 获取脚标
    const index = e.currentTarget.dataset.id;
    // console.log(e.currentTarget.dataset.id)
    // 获取点赞的值
    const eachiflike = e.currentTarget.dataset.item.if_like;
    const iflikeIndex = "IndexList[" + index + "].if_like";
    // console.log(iflikeIndex)
    // console.log(eachoiflike)
    this.setData({
      [iflikeIndex]: 1,
      eachiflike: eachiflike,
      IndexList: this.data.IndexList,
    })
    if (eachiflike == 0) {
      this.setData({
        [iflikeIndex]: 1,
      })
    } else {
      this.setData({
        [iflikeIndex]: 0,
      })
    }
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  
// 评论点赞
  commentCollect:function(e){
    console.log(e);
    var that=this;
    // var vid = e.currentTarget.dataset.id;
    if (this.data.commentcount == 1) {
      that.setData({
        fav: -1,
        comment_not_zan: true,
        commentcount: 2
      })
    } else {
      that.setData({
        fav: 0,
        comment_not_zan: false,
        commentcount: 1
      })
    }
  },
  bindPlay: function () {
    this.videoContext.play()
    
  },
  touchstart: function (res) {
    this.setData({
      pagey: res.changedTouches[0].pageY
    })
    // console.log(res)
  },
  touchend: function (res) {
    if (res.changedTouches[0].pageY - this.data.pagey > 100) {

      var isZero = this.data.vid == 0
      var id = this.data.vid == 0 ? 0 : this.data.vid - 1
      if (isZero) {
        wx.showToast({
          title: '已是第一个！',
        })
      } else {
        this.setData({
          vid: id,
          index: 1

        })
        var that = this
        setTimeout(function () {
          that.bindPlay()
        }, 500)
      }
    } else if (this.data.pagey - res.changedTouches[0].pageY > 100) {
      var islast = this.data.vid == this.data.vsrc.length - 1
      var lid = this.data.vid == this.data.vsrc.length - 1 ? this.data.vsrc.length - 1 : this.data.vid + 1
      if (islast) {
        wx.showToast({
          title: '已是最后一个！',
        })
      } else {
        this.setData({
          vid: lid,
          index: 1
        })
      }
      var that = this
      setTimeout(function () {
        that.bindPlay()
      }, 500)
    }
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  // 播放
  bindPlay: function () {
    this.videoContext.play()
  },
  // 暂停播放
  bindPause: function () {
    this.videoContext.pause()
    display_play: 'block'
  },
  //播放结束
  bindend: function () {
    var a = this.data.index
    var a_dow = a + 1
    // console.log(a + 1);
    this.setData({
      index: a_dow,
      vid: this.data.scrollTop_list[parseInt(a_dow)].vid,
      display_play: 'none',
      video: [],
    })
    // 获取视频
    this.tab_video()
    // 获取评论列表
    this.getcomment()
  },
  videoErrorCallback: function (e) {
    // console.log('视频错误信息:')
    // console.log(e.detail.errMsg)

  },

  //评论
  showModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      heighTrue: false,
      video_heighe: 45,
      ball_height: 1,
      display_pl: 'none'
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        heighTrue: true,
        video_heighe: 100,
        ball_height: 2,
        display_pl: 'block'
      })
    }.bind(this), 200)
  },
  getComment:function(e){
    console.log(this)
  },
  getdata: function () {
    var that = this;
    wx.request({
      url: app.globalData.serverPath + 'index',//请求地址
      data: {//发送给后台的数据
        // uid: that.data.uid
        uid:3
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        console.log(res.data)
        that.setData({
          IndexList: res.data
        })

      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  getdata2: function () {
    var that = this;
    wx.request({
      url: app.globalData.serverPath + 'indexcomment',//请求地址
      data: {//发送给后台的数据


      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        // console.log(res.data)
        that.setData({
          CommentList: res.data
        })

      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.setNavigationBarTitle({
      title: "小PP短视频",
    })
    wx.getStorage({
      key: 'userUid',
      success(res) {
        console.log(res.data)
        that.setData({
          uid: res.data
        });
      }
    });
    // this.getdata()
    // this.getdata2()
  },
  onShow:function(){
    
  }
  

})