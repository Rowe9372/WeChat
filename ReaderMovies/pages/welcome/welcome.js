Page({
  // API使用
  tapeName:function(){
    //保留当前页面,跳转到应用内的某个页面, 使用wx.navigateTo 可以返回原页面
    // wx.navigateTo({
    //   url:"../posts/posts"
    // });

    // 关闭当前页面，跳转到应用内某个页面 (跳转到tabBar页面必须用 switchTab)
    wx.switchTab({
      url: '/pages/posts/posts'
    });
  },
  //监听页面关闭执行函数
  onUnload:function(){
    console.log("wx.redirectTo API 会关闭页面，执行该函数")
  },
  // 监听页面隐藏时执行函数
  onHide:function(){
    console.log("wx.navigateTo API 会隐藏页面，执行该函数")
  }


})