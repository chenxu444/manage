/**
 * 
 * 文件描述：uniapp 微信公众号封装函数库
 * created by @Howard 2021-01-21 
 */

import Vue from 'vue';

// #ifdef H5
let u =  navigator.userAgent;
let isWx = /wxwork/i.test(u) || /MicroMessenger/i.test(navigator.userAgent);
let isWxWork = /wxwork/i.test(u) && /MicroMessenger/i.test(navigator.userAgent);
let wechatDebug = false;
let isInitAgent = false;
if(isWxWork){
    document.write('<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>');
    document.write('<script type="text/javascript" src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script>');
}else{
    let jweixin = require('jweixin-module');
}

let jweixin = require('jweixin-module');
let jsApiList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
    'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem',
    'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice',
    'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage',
    'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow',
    'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard', 'updateTimelineShareData',
    'updateAppMessageShareData', 'invokeMiniProgramAPI'];
export function configWechat() {
    return new Promise(function (resolve, reject) {
        if(!isWx){
            return;
        }
        uni.request({
            url: Vue.prototype.wechatBase + '/' + Vue.prototype.h5APPID + '/initjs',
            type: "post",
            dataType: "json",
            data: { 'locationHref': window.location.href },
            success(data) {
                let res = data.data;
                if (res && res.success == true) {
                    let config = res.value;
                    jweixin.config({
                        debug: wechatDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: config.appId, // 必填，公众号的唯一标识
                        timestamp: config.timestamp, // 必填，生成签名的时间戳
                        nonceStr: config.nonceStr, // 必填，生成签名的随机串
                        signature: config.signature,// 必填，签名
                        jsApiList: jsApiList // 必填，需要使用的JS接口列表
                    });
                    jweixin.ready(response => {
                        resolve(response);
                    });
                    jweixin.error(function (res) {
                        uni.showModal({
                            content: '微信提示：' + JSON.stringify(res),
                            showCancel: false,
                            success: res1 => {
                            }
                        });
                    });
                } else {
                    reject(res.errorMsg)
                    uni.showModal({
                        content: '微信提示：' + res.errorMsg,
                        showCancel: false,
                        success: res1 => {
                        }
                    });
                }
            },
            fail(err) {
                reject(err);
            },
            complete() {

            }
        });
    })
}
/**
 * @name: 微信分享
 * @param {*}
 */
export function sharePlatform(linktitle, linkdesc, listoldurl, linkimg, _callPayReply) {
    jweixin.ready(function () {
        //获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
        jweixin.updateAppMessageShareData({
            title: linktitle, // 分享标题
            desc: linkdesc, // 分享描述
            link: listoldurl, // 分享链接
            imgUrl: linkimg, // 分享图标
            success: function () {
            }
        })
        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
        jweixin.updateTimelineShareData({
            title: linktitle, // 分享标题
            desc: linkdesc, // 分享描述
            link: listoldurl, // 分享链接
            imgUrl: linkimg, // 分享图标
            success: function () {
            }
        })
    })
}

/**
 * @name：微信授权前链接编译
 * @params: wechatScope: snsapi_userinfo(获取用户信息userinfo)、snsapi_base(获取openid)
 * @params：wechatState: getUserinfo(获取用户信息userinfo)、getOpenid(获取openid)
 */
export function getWecharCodeUrl(appId, getOpenid){
    let toUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + Vue.prototype.baseUrl +  'pages/welcome/welcome&response_type=code&scope=' + (getOpenid === true ? 'snsapi_base' : 'snsapi_userinfo') + '&state=' + (getOpenid === true ? 'getOpenid' : 'getUserinfo') + '#wechat_redirect';
    return toUrl;
}

// #endif
 
 /**
  * @name：微信定位
  */
export function catchPosition() {
    return new Promise(function (resolve, reject) {
        // #ifdef MP-WEIXIN
        uni.getLocation({
            type: 'gcj02',
            success: res => {
                resolve(res);
            },
            fail: err => {
                reject(err)
            }
        });
        // #endif

        // #ifdef H5
        jweixin.ready(function () {
            jweixin.getLocation({
                type: 'gcj02',
                success: res => {
                    resolve(res);
                },
                fail: err => {
                    reject(err)
                }
            });
        })
        // #endif
    })
}
 
 /**
  * @name：微信扫描
  */
export function scanQRCode(){
    //每次都需要重新初始化配置，才可以进行扫码
    return new Promise(function (resolve, reject) {
        // #ifdef MP-WEIXIN
        uni.scanCode({
            scanType: ["qrCode", "barCode"],
            success: (res) => {
                resolve(res);
            },
            fail: err => {
                reject(err)
            }
        });
        // #endif

        // #ifdef H5
        jweixin.ready(function () {
            jweixin.scanQRCode({
                needResult: 1, // 0扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: res => {
                    resolve(res);
                },
                fail: err => {
                    reject(err)
                }
            });
        })
        // #endif
    })
}