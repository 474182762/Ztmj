// import Promise from '../libs/js/bluebird' //为了兼容异步请求问题

/**
 * 验证返回的的code码问题
 * @param {*} resolve
 * @param {*} res 返回的data
 */
const checkCode = (resolve, res) => {
    switch (res.code) {
        case 0:
            resolve(res);
            break;
        case 501: //参数错误
            wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 3000,
                mask: true
            });
            break;
        case 404: //服务器异常
            wx.showToast({
                title: res.message,
                // image: '/images/others/icon-error.png',
                duration: 3000,
                mask: true
            });
            break;
        case 500: //服务器异常
            wx.showToast({
                title: '服务器开小差啦',
                icon: 'none',
                duration: 3000,
                mask: true
            });
            break;
        case 403000: //token失效
            wx.showToast({
                title: '登录状态已失效',
                image: '/images/icon-error.png',
                duration: 1500,
                mask: true
            });
            //清除所有登录信息
            wx.removeStorageSync('userInfo');
            wx.clearStorageSync();
            setTimeout(() => {
                wx.redirectTo({url: '/pages/authorize/index'})
            }, 1500);
            break;
        default:
            resolve(res);
    }
};

const urlParam = function (obj) {
    var arr = [];
    for (var k in obj) {
        if (obj[k] != null && obj[k] != '') {
            arr.push(k + '=' + obj[k]);
        }
    }
    return arr.join('&');
};

/**
 * 请求API接口
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Object} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */

module.exports = function (methods, path, params, header = {}) {
    wx.showLoading();
    return new Promise((resolve) => {
        wx.request({
            url: path,
            data: Object.assign({}, params),
            method: methods,
            timeout: '5000',
            header: Object.assign({}, header),
            success: function (res) {
                wx.hideLoading();
                checkCode(resolve, res.data);
            },
            fail: function () {
                wx.hideLoading();
                wx.showToast({
                    title: '网络请求异常',
                    image: '/images/icon-error.png',
                    duration: 3000,
                    mask: true
                });

            }
        })
    })
};
