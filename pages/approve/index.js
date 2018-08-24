// pages/approve/index.js

//获取应用实例
var app = getApp();
// console.log(app.api)
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
    console.log(e.id)
  },
  patientSubmit:function(){
    let This = this;
    This.formdataSubmit()
  },
  /*住院患者*/
  formdataSubmit(e){
    let This = this;
    let data =null;
    data = e.detail.value
    data['type']=1
    data['facePicture'] = '1222'
    data['userId'] = '22'
    data['openid'] = '11'
    console.log(data)
    app.api.patientSubmit(data).then((res) => {

    })
  },
   /*非住院患者*/
  formNopatientSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['type'] = 1;
    data['patientFollower'] =2;
    // data['facePicture'] = '1222'
    data['userId'] = '66';
    console.log(data)
    app.api.nopatientSubmit(data).then((res) => {

    })
  },
  /*护工身份认证*/
  formNursingSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['userId'] = '033xDyFN0MlD142KblDN0N0xDyFI';
    data['facePicture'] = '1222'
    console.log(data)
    app.api.nursingSubmit(data).then((res) => {

    })
  },
  /*工作人员认证*/
  formPersonnelSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['userId'] = '2';
    data['facePicture'] = '1222'
    console.log(data)
    app.api.nursingSubmit(data).then((res) => {

    })
  }
})
