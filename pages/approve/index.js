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
    accompany:[
      { name: '2', value: '否',checked: 'true'},
      { name: '1', value: '是'},
    ],
    workName:[
      { name: '1', value: '医生', checked: 'true' },
      { name: '2', value: '护士' },
      { name: '3', value: '安保人员' },
    ],
    expressType: [
      { name: '1', value: '临时进入', checked: 'true' },
      { name: '2', value: '长期合作' }
    ],
    selectaccompany:2,
    workSekect:1,
    expressSelect:1,
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
  /*选择是否有跟随人员*/
  radioChange(e){
    let This = this;
    This.setData({
      selectaccompany: e.detail.value
    })
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  workChange(e){
    let This = this;
    This.setData({
      workSekect: e.detail.value
    })
  },
  expressChange(e){
    let This = this;
    This.setData({
      expressSelect: e.detail.value
    })
  },
  /*点击上传图片*/
  upImage:function(){
    wx.showActionSheet({
      itemList: ['拍摄', '从手机相册选择'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
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
    data['openid'] = '033xDyFN0MlD142KblDN0N0xDyFI'
    console.log(data)
    // wx.navigateTo({
    //   url:"/pages/audit/index"
    // })
    app.api.patientSubmit(data).then((res) => {

    })
  },
   /*非住院患者*/
  formNopatientSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['type'] = 1;
    data['patientFollower'] = This.data.selectaccompany;
    data['facePicture'] = '1222'
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
    data['openid'] = '033xDyFN0MlD142KblDN0N0xDyFI';
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
    data['openid'] = '2';
    data['facePicture'] = '1222'
    data['staffPostName'] = This.data.workSekect
    console.log(data)
    app.api.nursingSubmit(data).then((res) => {

    })
  },
  /*快递、外卖人员认证*/
  formExpressSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['openid'] = '2';
    data['facePicture'] = '1222'
    data['type'] = This.data.expressSelect
    console.log(data)

    app.api.expressSubmit(data).then((res) => {

    })
  },
  /*访客身份认证*/
  formvisitorSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['patientFollower'] = This.data.selectaccompany;
    data['facePicture'] = '1222'
    data['userId'] = '66';
    console.log(data)

    app.api.visitorSubmit(data).then((res) => {

    })
  }
})
