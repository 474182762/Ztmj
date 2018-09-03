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
    data['type'] = 2
    data['openid'] = app.globalData.userInfo.openid
    console.log(app.globalData)
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!data.userName) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!myreg.test(data.userPhone)) {
      wx.showToast({
        title: '电话号码错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!data.patientOrder) {
      wx.showToast({
        title: '住院单号错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    app.api.patientSubmit(data).then((res) => {
        if(res.code=='200'){
          wx.navigateTo({
            url: "/pages/audit/index"
          })
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
    })
  }
 
})