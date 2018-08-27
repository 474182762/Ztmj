// pages/doctorHelp/doctor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identityList: [
      { imgUrl: '../../images/identify7.png', 'identity': '访客', 'id': 2 },
      { imgUrl: '../../images/identify4.png', 'identity': '临时专家', 'id': 7 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择身份',
    })
  },
  /*进入访客或者专家*/
  selectIdentity(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "/pages/approve/index?id=" + e.currentTarget.dataset.id
    })
  },
  // enterVisitor() {
  //   wx.navigateTo({
  //     url: "/pages/approve/index?id=" + 2
  //   })
  // },
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