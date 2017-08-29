var util = require('../../utils/utils.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    doubanTop:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var inTheaters = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoon = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var doubanTop = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    //传一个参数，存储该请求类型的数据
    this.getMovieListData(inTheaters,'inTheaters');
    this.getMovieListData(comingSoon,'comingSoon');
    this.getMovieListData(doubanTop,'doubanTop');

  },

  //请求获取movie数据，方法函数 
  getMovieListData:function(url,moviesDatakey){
    var that = this;
    //wx.request 发起请求
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res);
        //数据处理
        that.processDoubanData(res.data,moviesDatakey);
                
      },
      fail: function (error) {
        console.log("请求失败");
        console.log(error);
      },
      complete: function () {

      }
    })

  },

  //数据处理函数
  processDoubanData: function (moviesData,moviesDatakey){
    // console.log(moviesData);
    var movies = [],
        category = moviesData.title;
    // console.log(category);
    for (var idx in moviesData.subjects){
      var subject = moviesData.subjects[idx];
      //处理电影名过长问题
      var title = subject.title;
      title.length > 6 ? title = title.substring(0,6) + '...' : title = title;
      var temp = {
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieid:subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);      
    }
    //根据传入的参数，保存为出入参数的请求数据
    var readyData = {};
    readyData[moviesDatakey] = {
      movies: movies,
      category: category
    }
    this.setData(readyData);


  },

  // more 更多函数方法
  onMoreTap:function(event){
    console.log(event);
    //获取当前点击more的是哪个类目(category)
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'movies-more/movies-more?category='+ category, 
    })
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