//  require 引js模块 同node  这里只能用相对路径
var postData = require("../../data/posts-data.js")


Page({

  /* 页面的初始数据
   */
  data: {
    post1: {
      date: "June 25 2017",
      img: {
        author_img: "/images/avatar/author01.png",
        post_img: "/images/post/chaidanzhuanjia.jpg"
      },
      title: "刘德华姜武正邪较量",
      condition: true,//wx:if="true/false" 控制wxml元素显隐
      content: "刘德华与姜武因“无间道”引发了一场硬汉之间的惊天大开撕，邱礼涛导演派出数百号人质，给红磡海底隧道华丽添堵，令华仔不得不“人艰偏拆”，救人质、救队友、救女友，甚至不惜打碎主角光环，只为让本片全程无尿点，惊险到永远。",
      like: "520",
      browse: "869"
    }
    // 模拟数据， 实际从服务器请求数据，在onLoad执行



  },
  //详情页函数
  onTapDetail:function(event){
    // currentTarget 当前鼠标点击的目标  dataset 所有自定义属性集合
    var postid = event.currentTarget.dataset.postid;
    // console.log("post-detail"+postid);
    wx.navigateTo({
      url:"post-detail/post-detail?postid="+postid
    })
  },
  // Swiper 点击进入详情页
  onSwiperTap:function(event){
    //event 属性中 target 指当前鼠标点击的组件 currentTarget 是指事件捕获的组件
    var postid = event.target.dataset.postid;
    //console.log("swiper"+postid);
    wx.navigateTo({
      url:'post-detail/post-detail?postid='+postid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载页面 ， 请求服务器数据
    var post_content = [
      {
        date: "June 26 2017",
        author_img: "/images/avatar/author03.png",
        title: "卡西获奥斯卡影帝之作",
        post_img: "/images/post/haibiandemanqiesite.jpg",
        content: "卡西在这部反鸡汤电影中不小心制造了火灾，导致妻离女亡，此后一路拒绝撩妹、拒绝复婚、拒绝安抚，故事中没有救赎，没有解脱，但这种遗憾恰恰是本片最好看的地方，影片凭借细腻的表演和情感共鸣，为卡西赢得奥斯卡影帝桂冠。",
        like: "678",
        browse: "906"
      },
      {
        date: "June 25 2017",
        author_img: "/images/avatar/author02.png",
        title: "原著粉放心，苏有朋的改编是合格的",
        post_img: "/images/post/xianyiren-X.jpg",
        content: "《嫌疑人X的献身》看完影片后，实际上，苏有朋的这次改编是合格的，原著粉大可放心了。在他的执导下，王凯的唐川教授，张鲁一的石泓，表现足以惊艳观众。尤其是张鲁一，很好地诠释出了石泓作为天才的孤独，以及他对陈婧的深情。最后在监狱的爆发，足可见演员功力。",
        like: "560",
        browse: "978"
      }
    ]

    // 设置数据到data中 ，this.setData 详细文档 逻辑层“注册页面”
    this.setData({
      posts_key: post_content,
      postList:postData.postList  //设置引入js模块数据到data
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