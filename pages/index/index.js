//index.js
//获取应用实例
const app = getApp()
import { formatDateTime} from '../../utils/util'
// console.log(app.globalData.userInfo)
Page({
  data: {
    firstEnter:true,
    userInfo:{},
    //身份列表
    identityList:[
        { imgUrl: '../../images/identify2.png', 'identity': '住院患者','id':1 },
        { imgUrl: '../../images/identify7.png', 'identity': '访客', 'id': 2  },
        { imgUrl: '../../images/identify1.png', 'identity': '医生/护士', 'id': 3  },
        { imgUrl: '../../images/identify3.png', 'identity': '非住院患者','id': 4 },
        { imgUrl: '../../images/identify5.png', 'identity': '护工','id': 5},
        { imgUrl: '../../images/identify6.png', 'identity': '快递/外卖员', 'id': 6}
      ],
    motto: 'Hello World',
    user: {
      userImg:'../../images/identify4.png',
      name:'赵小强',
      identity:'住院患者',
      expiryTime:'',
      id:1
    },
    user_limit:[
        { img: '../../ images / identify4.png',name:'二维码'}
      ],
    hasUserInfo: false,
    // canIUse: wx.canIUs('button.open-type.getUserInfo')
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onReady() {
    let This = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res);
          //用户授权登录模块1.接收用户信息
          let params = {
            code: res.code
          };
          app.api.authLogin(params).then(res => {
            // wx.setStorageSync('userId', res.content.userId || '');
            // wx.setStorageSync('userInfo_status', res.content.userInfo_status || 1);
            wx.setStorageSync('openid', res.openid || '');
            app.globalData.openid = res.openid;
            This.searchUserInfo(res.openid)
          });
        } else {
          console.log(res);
        }
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
  /*查询用户信息*/
  searchUserInfo(openid){
    let data={
      openid:openid
    }
    app.api.getUserinfo(data).then((res) => {
        if(!res.data.length){
          wx.removeStorageSync("userInfo")
        }
    })
  },
  onLoad: function () {
    let This = this;
    if (wx.getStorageSync("userInfo").roleType) {
      let user = {};
      // user['userImg'] = app.globalData.userInfo.facePicture;
      user['userImg'] = '../../images/identify4.png'
      user['name'] = wx.getStorageSync("userInfo").userName;
      if (wx.getStorageSync("userInfo").roleType == 3) {
        console.log(app.globalData.userInfo.staff.staffPostName)
        if (wx.getStorageSync("userInfo").staff.staffPostName == 1) {
          user['identity'] = '医生'
        } else if (wx.getStorageSync("userInfo").staff.staffPostName == 2) {
          user['identity'] = '护士'
        } else {
          user['identity'] = '保安'
        }
      } else {
        user['identity'] = wx.getStorageSync("userInfo").roleName
      }
      user['id'] = wx.getStorageSync("userInfo").roleType
      user['expiryTime'] = formatDateTime(wx.getStorageSync("userInfo").expiryTime)
      This.setData({
        firstEnter: false,
        user: user
      })
      return;
    }

  },
  /*权限列表*/
  getLimitList(){

  },
  /*选择身份*/
  selectIdentity:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/approve/index?id="+id
    })    
    // console.log(e.currentTarget.dataset.id)
  },
  /*进入二维码页面*/
  enterQrcode(){
    wx.navigateTo({
      url: '/pages/qrcode/index'
    })
  },
  /*进入申请通行*/
  enterPass() {
    wx.navigateTo({
      url: '/pages/goOtherHome/index'
    })
  },
  /*更换陪护*/
  enterChaperone(){
    let This = this;
   
    
    wx.showModal({
      // title: '温馨提示',
      content: '您确定要更换陪护吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(11)
          let data = {};
          data['userId'] = app.globalData.userInfo.userId
          console.log(data)
          app.api.changeEscort(data).then((res) => {
            if (res.code == '200') {
              wx.navigateTo({
                url: '/pages/chaperone/chaperone'
              })
            }else{ 
              wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /*进入访客*/
  enterVisitor(){
    wx.navigateTo({
      url: "/pages/approve/index?id=" + 2
    })   
  },
  /*医生申请帮助*/
  docutorVisitor() {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo.staff.staffPostName==3){
      wx.navigateTo({
        url: "/pages/ambuHelp/index"
      })
    }else{
      wx.navigateTo({
        url: "/pages/doctorHelp/doctor"
      })
    }
    
  },
  // getUserInfo: function(e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  //   console.log(e.detail.userInfo)
  // }
})
