// pages/courier/index.js


Page({
  /**
   * 页面的初始数据
   */
  data: {
    auditInfo:{
      img: '',
      info:"正在审核，请稍后...",
      showQrcode:false
    },
    imgshow:5,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let This = this;
    let i=5;
    let oTimer = null;
    let imgSrc = null;
    wx.setNavigationBarTitle({
      title: '审核结果',
    })
    clearInterval(oTimer);
    oTimer = setInterval(function(){
      i--;
      if (i<=0){
        clearInterval(oTimer);
        This.setData({
          imgshow: i,
          auditInfo: {
            info: "审核成功！",
            showQrcode: true
          }
        })
        return
      }
      This.setData({
        imgshow: i,
        auditInfo: {
          info: "正在审核，请稍后...",
          showQrcode: false
        }
      })
    },1000)
  },
  /*获取二维码*/
  getQrcode(){
    wx.navigateTo({
      url: "/pages/qrcode/index"
    })
  }
})