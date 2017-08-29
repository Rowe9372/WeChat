 // 引入数据文件
var postData = require("../../../data/posts-data.js");

//获取全局APP.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取url传过来的postid
    var postid = options.postid;
    // console.log(postid);
    var post = postData.postList[postid];
    // console.log(post);
    this.setData({
      postdata:post,
      currentpostid:postid
    })

    // 收藏/分享功能
    // 获取缓存
    var postCollected = wx.getStorageSync("post_collected");
    // 判断是否有值
    if(postCollected){
      var collected = postCollected[postid];
      this.setData({
        collected:collected
      })
    }
    else{
      // 如果postCollected 不存在 设置一个
      var postCollected = {};
      postCollected[postid]=false;
      // 同步到缓存
      wx.setStorageSync('post_collected', postCollected);
    }

    //分享
    var postShared = wx.getStorageSync("post_shared");
    if(postShared){
      var shared = postShared[postid];
      this.setData({
        shared:shared
      })
    }else{
      var postShared = {};
      postShared[postid]=false;
      wx.setStorageSync('post_shared', postShared);
    }

    //判断全局播放状态
    if(app.globalData.g_isPlayingMusic && app.globalData.currentMusicPostid == postid) {
      this.setData({
        isPlayingMusic:true
      })
    }else{
      this.setData({
        isPlayingMusic:false
      })
    }
    this.setMusicMonitor();
    

  },
  //音乐播放事件监听
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      });
      //保存全局播放状态
      app.globalData.g_isPlayingMusic = true;
      app.globalData.currentMusicPostid = that.data.currentpostid;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.currentMusicPostid = that.data.currentpostid;
    })
  },
  // 点击收藏事件
  onCollectionTap:function(){
    var postCollected = wx.getStorageSync('post_collected');
    var collected = postCollected[this.data.currentpostid];
    collected = !collected;
    // 更新数据绑定
    this.setData({
      collected:collected
    })
    // 更新缓存
    postCollected[this.data.currentpostid] = collected;
    wx.setStorageSync('post_collected', postCollected);

    // 状态通知
    wx.showToast({
      title: collected?'收藏成功':'取消成功',
      icon:'success', // 图标
      duration:1000  //显示时间
    })
  },
  //点击分享事件
  onShareTap:function(event){
    var that = this;
    var itemList = [
      "分享到QQ好友",
      "分享到QQ空间",
      "分享到微信好友",
      "分享到朋友圈",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor:"#F0F8FF",
      success:function(res){
        if(res.cancel){
          //res.cancel = true 点击了取消按钮
        }else{
          //否则点击了上面的分享，则已分享 ，目前小程序还不支持分享功能
          var postShared = wx.getStorageSync('post_shared'),
          shared = true;
          that.setData({
            shared:shared
          });

          postShared[that.data.currentpostid] = shared;
          wx.setStorageSync('post_shared', postShared);
        };
      }
    });


  },

  //music 事件
  onMusicTap:function(event){
    var musicData = postData.postList[this.data.currentpostid].music;

    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      //如果音乐正在播放，则暂停播放
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: musicData.musicurl,
        title:musicData.musicName,
        coverImgUrl:musicData.coverImage
      });
      this.setData({
        isPlayingMusic : true
      })
    };

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})