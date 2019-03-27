const app = getApp()
Page({

  data: {
    uid:"",
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['全部', '视频','用户'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    searchInput: '',//搜索内容
    searchRecord: [],
    hotSearchData:[],
    more:true,
    display_play:'none',
    display_pl:'none',
    more:true,//控制活动下拉  true是显示   false是隐藏
    advertising:"",//活动图片
    activity:[],//活动
    hotuser:[]//明星
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  getSearchInput: function (e){
    this.setData({
      display_play:'block',
      searchInput:e.detail.value
    })
    // console.log(e);
  },

  openHistorySearch: function () {
    var that = this;
    wx.request({
      url: app.globalData.serverPath + "searchshow",
      data: {
        "uid": that.data.uid
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        res.data.advertising = "https://" + res.data.advertising
        that.setData({
          hotSearchData:res.data.rank,
          advertising: res.data.advertising,
          activity: res.data.activity,
          hotuser: res.data.hotuser
        })
      }
    })
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [],//若无储存则为空
    })
  },
  //点击搜索按钮提交表单跳转并储存历史记录  
  searchSubmitFn: function (e) {
    // console.log(e)    
    var that = this    
    var searchInput = this.data.searchInput    
    var searchRecord = this.data.searchRecord    
    if (searchInput == '') {      
      //输入为空时的处理   
    }    
    else {
      let arrnum = searchRecord.indexOf(searchInput);
      //判断是否是重复的搜索记录
      if (arrnum==-1){   
        searchRecord.unshift(searchInput)    
        //将历史记录数组整体储存到缓存中    
      } 
      else{
        // 删除已存在后重新插入至数组
        searchRecord.splice(arrnum, 1)
        searchRecord.unshift(searchInput)
      }
      wx.setStorageSync('searchRecord', searchRecord)  
    }
    this.setData({
      searchRecord: this.data.searchRecord
    })  
    var uid = that.data.uid;
    var content = that.data.searchInput
    wx.navigateTo({
      url: './searchDetail/searchDetail?uid=' + uid + '&content=' + content
    })
  },
  // 删除单条历史记录
  closeHistory: function (e) {
    var searchRecord = this.data.searchRecord
    var index=e.currentTarget.dataset.id
    console.log(searchRecord)
    searchRecord.splice(index, 1)
    this.setData({
      searchRecord: searchRecord.splice(index, 1)
    })
    wx.setStorageSync('searchRecord', searchRecord)
  },
  deleteHistory: function () {
    wx.clearStorageSync('searhRecord')
    this.setData({
      searchRecord: []
    })
  },
  // 返回搜索内容
  turnSearch:function(e){
    // console.log(this.data.searchRecord)
    // console.log(e)
    this.setData({
      searchInput: e.currentTarget.dataset.name
    }) 
    this.searchSubmitFn()
  },
  // 返回搜索页面
  returnLastPage:function(){
    this.setData({
      display_play: 'none',
    })
  },
  // 活动栏目显示
  more:function(){
    this.setData({
      display_pl:'block',
      more: false
    })
  },
  // 活动栏隐藏
  up: function () {
    this.setData({
      display_pl: 'none',
      more:true
    })
  },
  // 活动详情
  viewActive:function(e){
    var activeId = e.currentTarget.dataset.id
    var uid = this.data.uid
    wx.navigateTo({
      url: '../../focus/active/active?id=' + activeId+'&uid='+uid,
    })
  },
  //排行视频查看
  viewVideo:function(e){
    var vid = e.currentTarget.dataset.vid
    wx.navigateTo({
      url: '../../playvideo/playvideo?videoId=' + vid,
    })
  },
  //查看明星信息
  viewperson:function(e){
    var otherId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../userdetail/userdetail?otherId=' + otherId 
    })
  },
  onLoad: function (options) {
    var that = this
    // 缓存中取信息
    wx.getStorage({
      key: 'userUid',
      success(res) {
        console.log(res.data)
        that.setData({
          uid: res.data
        });
        that.openHistorySearch();
      }
    });
  }
  
})