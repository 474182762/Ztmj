// pages/goOtherHome/index.js

//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '通行申请',
    })
  },
  gohomeSubmit(e){
    let This = this;
    let data = {};
    data = e.detail.value
    // data['type'] = 1
    // data['openid'] = '033xDyFN0MlD142KblDN0N0xDyFI'
    console.log(data)
    // wx.navigateTo({
    //   url:"/pages/audit/index"
    // })
    // app.api.patientSubmit(data).then((res) => {

    // })
  }
 
})