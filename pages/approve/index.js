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
    userImg:'../../images/avatar.png',
    visitorImg:[],
    upBtnHidden:false,
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
  upImage(e){
    let This = this;
    let maxImg = e.currentTarget.dataset.maximg
    wx.showActionSheet({
      itemList: ['拍摄', '从手机相册选择'],
      success: function (res) {
        This.upSaveImage(res.tapIndex, maxImg)
        // console.log(res.tapIndex, maxImg)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /*上传图片方法*/
  upSaveImage(index, maxImg){
    let This =this;
    let type = index == 0?'camera':'album';
    wx.chooseImage({
      count: maxImg,
      sourceType: [type], 
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length;i++){
          wx.uploadFile({
            url: app.api.uploadImg, //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            // header:{
            //   "Content-Type": "application/x-www-form-urlencoded"
            // },
            header: {
              "Content-Type": "multipart/form-data"
            },
            name: 'file',
            // formData: {
            //   'user': 'test'
            // },
            success: function (res) {
              var data = JSON.parse(res.data);
              console.log(data)
              if (data.code == '200') {
                if (maxImg == 1) {
                  This.setData({
                    userImg: data.data.filePath
                  })
                }else{
                  let visitorImg = This.data.visitorImg;
                  visitorImg.push(data.data.filePath)
                    This.setData({
                      visitorImg: visitorImg
                    })
                }

              }
              if (This.data.visitorImg.length>=4){
                This.setData({
                  upBtnHidden: true
                })
              }
            }
          })
        }
        
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
    data['facePicture'] = This.data.userImg
    data['openid'] = app.globalData.openid
    console.log(data)
    wx.navigateTo({
      url:"/pages/audit/index"
    })
    app.api.patientSubmit(data).then((res) => {
      if(res.code=='200'){
        wx.setStorageSync('userInfo', res.data.userInfo || '');
      }
    })
  },
   /*非住院患者*/
  formNopatientSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['type'] = 1;
    data['patientFollower'] = This.data.selectaccompany;
    data['facePicture'] = This.data.visitorImg
    data['openid'] = app.globalData.openid
    console.log(data)
    app.api.nopatientSubmit(data).then((res) => {
      if(res.code == '200'){
        wx.setStorageSync('userInfo', res.data.userInfo || '');
        wx.navigateTo({
          url: "/pages/audit/index"
        })
      }
    })
  },
  /*护工身份认证*/
  formNursingSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['openid'] = app.globalData.openid;
    data['facePicture'] = This.data.userImg
    console.log(data)
    app.api.nursingSubmit(data).then((res) => {
      if (res.code == '200') {
        wx.setStorageSync('userInfo', res.data.userInfo || '');
        wx.navigateTo({
          url: "/pages/audit/index"
        })
      }
    })
  },
  /*工作人员认证*/
  formPersonnelSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['openid'] = app.globalData.openid;
    data['facePicture'] = This.data.userImg
    data['staffPostName'] = This.data.workSekect
    console.log(data)
    app.api.personnelSubmit(data).then((res) => {
      if (res.code == '200') {
        wx.setStorageSync('userInfo', res.data.userInfo || '');
        wx.navigateTo({
          url: "/pages/audit/index"
        })
      }
    })
  },
  /*快递、外卖人员认证*/
  formExpressSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['openid'] = app.globalData.openid;
    data['facePicture'] = This.data.userImg
    data['type'] = This.data.expressSelect
    console.log(data)
    app.api.expressSubmit(data).then((res) => {
      if (res.code == '200') {
        wx.setStorageSync('userInfo', res.data.userInfo || '');
        wx.navigateTo({
          url: "/pages/audit/index"
        })
      }
    })
  },
  /*访客身份认证*/
  formvisitorSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['patientFollower'] = This.data.selectaccompany;
    data['facePicture'] = This.data.visitorImg
    data['openid'] = app.globalData.openid;
    console.log(data)
    app.api.visitorSubmit(data).then((res) => {
      if (res.code == '200') {
        wx.setStorageSync('userInfo', res.data.userInfo || '');
        wx.navigateTo({
          url: "/pages/audit/index"
        })
      }
    })
  },
  /*临时专家身份认证*/
  formExpertSubmit(e){
    let This = this;
    let data = null;
    data = e.detail.value;
    data['facePicture'] = This.data.userImg
    data['openid'] = app.globalData.openid;
    console.log(data)
    app.api.expertSubmit(data).then((res) => {
      if (res.code == '200') {
        wx.setStorageSync('userInfo', res.data.userInfo || '');
        wx.navigateTo({
          url: "/pages/audit/index"
        })
      }
    })
  }
})
