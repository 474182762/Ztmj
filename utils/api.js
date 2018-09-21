/**
 * @Author: PerfectYan
 */

import fetch from 'fetch'

import { API_DOMAIN } from './config'


/**
 * @param {string} action 接口请求地址
 * @param {object} params [params={}]
 * @param {object} header [header={}]
 */
const fetchApi = (action, params = {}, header = {}) => {
  return fetch('POST', `${API_DOMAIN}/hs/${action}`, params, header)
};

/**
 * @param {string} action 接口请求地址
 * @param {object} params [params={}]
 * @param {object} header [header={}]
 */
const fetchGetApi = (action, params = {}, header = {}) => {
  return fetch('GET', `${API_DOMAIN}/hs/${action}?`, params, header)
};

/**
 * 登录
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
const authLogin = (params) => {
    let header = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
  return fetchApi('login/getSessionKeyOropenid', params, header).then(res => res)
};
// const getUserInfo = (params) => {
//     let header = {
//         "Content-Type": "application/x-www-form-urlencoded"
//     };
//     return fetchApi('wechat/getUserInfo', params, header).then(res => res)
// };

/*查询用户个人信息*/
const getUserinfo = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('hospital/userinfo', params, header).then(res => res)
};

/*住院患者身份认证*/
const patientSubmit = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('authentication/patient', params, header).then(res => res)
};

/*非住院患者*/
const nopatientSubmit = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('authentication/nopatient', params, header).then(res => res)
};
/*访客身份认证*/
const visitorSubmit = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('authentication/visitor', params, header).then(res => res)
};

/*工作人员认证*/
const personnelSubmit = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('authentication/personnel', params, header).then(res => res)
};
/*护工身份认证*/
const nursingSubmit = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('authentication/nursing', params, header).then(res => res)
};
/*快递、外卖身份认证*/
const expressSubmit = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('authentication/express', params, header).then(res => res)
};

/*临时专家认证*/
const expertSubmit = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('authentication/expert', params, header).then(res => res)
};
/*生成二维码*/
const getQrcode = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('hospital/qrcode', params, header).then(res => res)
};

/*更换陪护*/
const changeEscort = (params) => {
  let header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return fetchApi('hospital/escort', params, header).then(res => res)
};

/*图片上传*/
// const uploadImg = (params) => {
//   let header = {
//     "Content-Type": "application/x-www-form-urlencoded"
//   };
//   return fetchApi('hospital/uploadImg', params, header).then(res => res)
// };
///hospital/uploadImg hospital/photoImg
const uploadImg = `${API_DOMAIN }/hs/hospital/photoImg`
/*数据为空判断*/
// const dataNull = (objval,content)=>{
//   if (!objval) {
//     wx.showToast({
//       title: content,
//       icon: 'none',
//       duration: 2000
//     })
//   }
//   return
// }
module.exports = {
  authLogin,
  patientSubmit,
  nopatientSubmit,
  visitorSubmit,
  personnelSubmit,
  nursingSubmit,
  expressSubmit,
  expertSubmit,
  getQrcode,
  changeEscort,
  getUserinfo,
  uploadImg
};