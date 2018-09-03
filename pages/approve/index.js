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
      { name: '2', value: '否', checked: 'true'},
      { name: '1', value: '是'}
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
    upImgStatu:false,
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
    // wx.showToast({
    //   title: '请上传头像',
    //   icon: 'none',
    //   duration: 2000
    // })
  },
  /*选择是否有跟随人员*/
  radioChange(e){
    let This = this;
    This.setData({
      selectaccompany: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
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
    if (This.data.identityId == 2 || This.data.identityId == 4){
      if (This.data.selectaccompany == 2) {
        maxImg = 1
      }
    }
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
                  console.log(maxImg)
                  if (This.data.identityId == 2 || This.data.identityId == 4){
                    if (This.data.selectaccompany == 2) {
                      let visitorImg = This.data.visitorImg;
                      visitorImg.push(data.data.filePath)
                      This.setData({
                        visitorImg: visitorImg,
                        upImgStatu: true,
                        upBtnHidden: true
                      })
                    } 
                  }else{
                    This.setData({
                      userImg: data.data.filePath,
                      upImgStatu: true
                    })
                  }
                }else{
                  let visitorImg = This.data.visitorImg;
                  visitorImg.push(data.data.filePath)
                    This.setData({
                      visitorImg: visitorImg,
                      upImgStatu: true
                    })
                  console.log(This.data.visitorImg)
                }

              }
              if (This.data.visitorImg.length>=5){
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
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!data.userName){
      wx.showToast({
        title: '请输入姓名',
        icon:'none',
        duration: 2000
      })
      return
    }
    if (!myreg.test(data.userPhone)){
      wx.showToast({
        title: '电话号码错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!data.patientOrder){
      wx.showToast({
        title: '住院单号错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!This.data.upImgStatu) {
      wx.showToast({
        title: '请上传头像',
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
    if (!data.checkorder) {
      wx.showToast({
        title: '检查单号错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (data.followerNumber>4) {
      wx.showToast({
        title: '随行人员最多4人',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (data.patientFollower==1){

      if (!This.data.upImgStatu) {
        wx.showToast({
          title: '请上传头像',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (data.facePicture.length != data.followerNumber) {
        wx.showToast({
          title: '头像数与随行人员数不一致',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
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
    console.log(This.data.userImg)
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
    if (!data.patientName) {
      wx.showToast({
        title: '请输入患者姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!data.patientRingId) {
      wx.showToast({
        title: '请输入患者手环ID',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!This.data.upImgStatu){
      wx.showToast({
        title: '请上传头像',
        icon: 'none',
        duration: 2000
      })
      return
    }
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
    if (!data.staffNumber) {
      wx.showToast({
        title: '请输入工号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!This.data.upImgStatu) {
      wx.showToast({
        title: '请上传头像',
        icon: 'none',
        duration: 2000
      })
    }
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
    if (!data.businessName) {
      wx.showToast({
        title: '请输商家名称',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!data.staffNumber) {
      wx.showToast({
        title: '请输入保安工号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!This.data.upImgStatu) {
      wx.showToast({
        title: '请上传头像',
        icon: 'none',
        duration: 2000
      })
    }
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
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!data.patientsName) {
      wx.showToast({
        title: '请输入被访人姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!myreg.test(data.patientsPhone)) {
      wx.showToast({
        title: '被访人电话号码错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!data.userName) {
      wx.showToast({
        title: '请输入访客姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!data.userPhone) {
      wx.showToast({
        title: '请输入访客电话',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (data.followerNumber > 5) {
      wx.showToast({
        title: '随行人员最多4人',
        icon: 'none',
        duration: 2000
      })
      return
    }
   
    if (data.patientFollower == 1) {
      if (!This.data.upImgStatu) {
        wx.showToast({
          title: '请上传随行人员头像',
          icon: 'none',
          duration: 2000
        })
        return
      }
      console.log(data.facePicture.length, data.followerNumber)
      if (data.facePicture.length != data.followerNumber) {
        wx.showToast({
          title: '头像数与随行人员数不一致',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }else{
      if (!data.facePicture.length) {
        wx.showToast({
          title: '请上传头像',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    
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
    data['userId'] = app.globalData.userInfo.userId;
    console.log(data)
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
    if (!This.data.upImgStatu) {
      wx.showToast({
        title: '请上传头像',
        icon: 'none',
        duration: 2000
      })
    }
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
