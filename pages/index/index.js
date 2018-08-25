//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    firstEnter:false,
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
      id:1
    },
    user_limit:[
        { img: '../../ images / identify4.png',name:'二维码'}
      ],
    hasUserInfo: false,
    // canIUse: wx.canIUs('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let This = this;
    
    // console.log(This.data.firstEnter)
    if (!This.data.firstEnter){
      This.getLimitList()
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          // console.log(res.userInfo)
        }
      })
    }
    // console.log(this.userInfo)
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
    wx.showModal({
      // title: '温馨提示',
      content: '您确定要更换陪护吗？',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/chaperone/chaperone'
          })
          console.log('用户点击确定')
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
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(e.detail.userInfo)
  }
})
