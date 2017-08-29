
//电影评星级处理函数
function convertToStarsArray(stars){
  var num = + stars;
  var array = [];
  for(var i=1;i<=5;i++) {
    if(i*10 <= num ) {
      array.push(1);
    }else if(i*10 <= num + 5) {
      array.push(2);
    }else {
      array.push(0);
    }
  }

  return array ;
};

//请求数据函数
function getMovieListData(url,callBack) {
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
      //数据处理
      callBack(res.data);

    },
    fail: function (error) {
      console.log(error);
    },
    complete: function () {

    }
  })

}



module.exports = {
  convertToStarsArray : convertToStarsArray,
  getMovieListData: getMovieListData
}