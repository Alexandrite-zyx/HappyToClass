// miniprogram/pages/adminPage/adminPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "",
    today: {},
  },

  /**
   * 管理账号，这算作教务功能
   */
  manageID: function () {
    wx.navigateTo({
      url: '../manageID/manageID',
    })
  },
  /**
   * 管理所有过审核的课程页面
   */
  manageCourse: function () {
    wx.navigateTo({
      url: '../manageCourses/manageCourses',
    })
  },
  /**
   * 审核课程页面
   */
  confirmCourse: function () {
    wx.navigateTo({
      url: '../confirmCourse/confirmCourse',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo()
  },
  
  myPage: function () {
    wx.navigateTo({
      url: '../myMainPage/MainPage',
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

  },
  /**
   * 加载天气相关信息
   */
  loadInfo: function () {
    var page = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude, longitude);
        page.loadCity(latitude, longitude);
      }
    })
  },
  loadCity: function (latitude, longitude) {
    var page = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=D6WOzHaymzVVKvgiy8UbhQEznkgeK6BD&location=' +
        latitude + ',' + longitude + '&output=json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var city = res.data.result.addressComponent.city;
        city = city.replace("市", "");
        page.setData({
          city: city
        });
        page.loadWeather(city);
      }
    })
  },
  loadWeather: function (city) {
    var page = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        today.todayInfo = todayInfo;
        page.setData({
          today: today
        });
        console.log(today.wendu);
      }
    });
  }
})