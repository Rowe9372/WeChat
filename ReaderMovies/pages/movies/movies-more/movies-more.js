// pages/movies/movies-more/movies-more.js
var util = require("../../../utils/utils.js");
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitle:'',
    movies:{},
    requestUrl:'',
    totalCount:0,
    movieEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //动态标题  拿到通过url穿过来的参数 category 
    var category = options.category;
    // console.log(category);

    var doubanMoviesUrl = "";
    switch(category){
      case "正在上映的电影-北京":
        doubanMoviesUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
      break;
      case "即将上映的电影":
        doubanMoviesUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
      break;
      case "豆瓣电影Top250":
        doubanMoviesUrl = app.globalData.doubanBase + "/v2/movie/top250";
      break;
    }

    this.setData({
      navigationBarTitle: category,
      requestUrl : doubanMoviesUrl
    })
    //发送请求
    util.getMovieListData(doubanMoviesUrl, this.processDoubanData);

  },

  //数据处理函数
  processDoubanData: function (moviesData) {
    console.log(moviesData);
    var movies = [];
    var totalCount = this.data.totalCount;
        totalCount+=20;
        console.log(totalCount);
    for (var idx in moviesData.subjects) {
      var subject = moviesData.subjects[idx];
      //处理电影名过长问题
      var title = subject.title;
      title.length > 6 ? title = title.substring(0, 6) + '...' : title = title;
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieid: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    //上滑显示数据
    var totalMovies = {};
    if(this.data.movieEmpty) {
      totalMovies = movies;
      this.data.movieEmpty = false;
    }else{
      totalMovies = this.data.movies.concat(movies);
    }
    this.setData({
      movies:totalMovies,
      totalCount:totalCount
    });
    wx.hideNavigationBarLoading();

  },

  //上滑加载更多
  onScrolltolower:function(){
    console.log("上滑加载更多");
    var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + "&count=20";
    util.getMovieListData(nextUrl, this.processDoubanData);

    //loading设置
    wx.showNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  //动态设置导航标题 通过data 里面的拿到共享数据
  wx.setNavigationBarTitle({
    title:this.data.navigationBarTitle,
  })
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