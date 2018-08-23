// pages/approve/index.js

//获取应用实例
var app = getApp();
console.log(app.api)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    identityId:'',
    patientdata:{
      username:'',
      userPhone:'',
      patientOrder:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let This = this;
    wx.setNavigationBarTitle({
      title: '身份认证',
    })
    This.setData({
      identityId: e.id,
    })
  },
  patientSubmit:function(){
    let This = this;
    This.formdataSubmit()
  },
  formdataSubmit(e){
    let This = this;
    let data =null;
    data = e.detail.value
    data['type']=1
    data['facePicture'] = '1222'
    data['userId'] = '033xDyFN0MlD142KblDN0dTJFN0xDyFI'
    console.log(data)
    app.api.patientSubmit(data).then((res) => {

    })
  }

})