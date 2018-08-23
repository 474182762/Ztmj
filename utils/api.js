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
    return fetch('POST', `${API_DOMAIN}/${action}`, params, header)
};

/**
 * @param {string} action 接口请求地址
 * @param {object} params [params={}]
 * @param {object} header [header={}]
 */
const fetchGetApi = (action, params = {}, header = {}) => {
    return fetch('GET', `${API_DOMAIN}/${action}?`, params, header)
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
    return fetchApi('wechat/authLogin', params, header).then(res => res)
};

const getUserInfo = (params) => {
    let header = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    return fetchApi('wechat/getUserInfo', params, header).then(res => res)
};

/*住院患者身份认证*/
const patientSubmit = (params) => {
  return fetchApi('authentication/patient', params).then(res => res)
};



module.exports = {
    authLogin,
    getUserInfo,
    patientSubmit
};