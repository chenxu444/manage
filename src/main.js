import Vue from 'vue'
import App from './App'

import store from './store'

import "./static/css/base.css";
import "./static/css/color.css";
import './static/fonts/iconfont.css';

import API from './static/js/api.js'

const api = new API();
Vue.prototype.api = api;

//development:开发环境
//weixi-test:微信小程序测试环境
//h5-test:h5测试环境
//weixin-pro:微信小程序正式环境
//h5-pro:h5正式环境
const DEPLOY_MODE = process.env.VUE_APP_ENV;
if(DEPLOY_MODE == 'development'){
	Vue.prototype.server_base = 'https://wechat.gzppc.com.cn';
	Vue.prototype.base = 'https://wechat.gzppc.com.cn/web-omall';
	// Vue.prototype.base = 'http://192.168.189.97:8081/web-omall'; 
	// Vue.prototype.server_base = 'http://192.168.189.97:8080';
	Vue.prototype.baseUrl = 'https://wechat.gzppc.com.cn/app/';
	Vue.prototype.hostBase = 'wechat.gzppc.com.cn';
	Vue.prototype._storeId_ = '77258';
	Vue.prototype.cacheType = 'dev_';
} else if(DEPLOY_MODE == 'h5test' || DEPLOY_MODE == 'weixintest'){
	Vue.prototype.server_base = 'https://wechat-test.gzppc.com.cn';
	Vue.prototype.base = 'https://wechat-test.gzppc.com.cn/web-omall';
	Vue.prototype.baseUrl = 'https://wechat.gzppc.com.cn/app/';
	Vue.prototype.hostBase = 'wechat-test.gzppc.com.cn';
	Vue.prototype._storeId_ = '1';
	Vue.prototype.cacheType = 'test_';
} else if(DEPLOY_MODE == 'h5pro' || DEPLOY_MODE == 'weixinpro'){
	Vue.prototype.server_base = 'https://wechat.gzppc.com.cn';
	Vue.prototype.base = 'https://wechat.gzppc.com.cn/web-omall';
	Vue.prototype.baseUrl = 'https://wechat.gzppc.com.cn/app/';
	Vue.prototype._storeId_ = '77258';
	Vue.prototype.hostBase = 'wechat.gzppc.com.cn';
	Vue.prototype.cacheType = 'formal_';
}

Vue.prototype.wechat_base =  'https://wechat.gzppc.com.cn';//微信授权服务接口
Vue.prototype.apis_map_qq_url = 'https://apis.map.qq.com/ws/geocoder/v1/?';
Vue.prototype._consignorId_ = '0834a63196dc47139706cf20d52ea07a';
Vue.prototype.customerTel = '4000250288';
Vue.config.productionTip = false;

// 腾讯地图申请密钥
Vue.prototype.QQmapKey = 'LCDBZ-5RU35-7ETIW-QUFKF-47H23-2WBK3';
// 高德地图申请密钥
Vue.prototype.AmapKey = '';

// 公用颜色
Vue.prototype.baseColor = '#007BC8';

// 公用分享描述
Vue.prototype.shareContent = '向您推荐一个好物';

/* 身份证校验 */
import idCardNoUtil from './static/js/idcardcheck.js'
Vue.prototype.idCardNoUtil = idCardNoUtil;

import { goUrl, replaceUrl, resetUrl, gotoOtherMini, ebigRequest, doRequest, ebigWXRequest, encode64, decode64, getSystemDate, isPhone, isIDcard, mapKey, _getSystemInfo, pathToBase64, base64ToPath, setStor, getStor, removeStor, sharePageFunc } from './static/js/utils.js';
Vue.prototype.goUrl = goUrl;
Vue.prototype.replaceUrl = replaceUrl;
Vue.prototype.resetUrl = resetUrl;
Vue.prototype.gotoOtherMini = gotoOtherMini;
Vue.prototype.ebigRequest = ebigRequest;
Vue.prototype.doRequest = doRequest;
Vue.prototype.ebigWXRequest = ebigWXRequest;
Vue.prototype.getSystemDate = getSystemDate;
Vue.prototype.encode64 = encode64;
Vue.prototype.decode64 = decode64;
Vue.prototype.isPhone = isPhone;
Vue.prototype.isIDcard = isIDcard;
Vue.prototype.mapKey = mapKey;
Vue.prototype._getSystemInfo = _getSystemInfo;
Vue.prototype.pathToBase64 = pathToBase64;
Vue.prototype.base64ToPath = base64ToPath;
Vue.prototype.setStor = setStor;
Vue.prototype.getStor = getStor;
Vue.prototype.removeStor = removeStor;
Vue.prototype.sharePageFunc = sharePageFunc;

/* 引入uni 生成条形码插件 */
import uniBarcode from '@/components/uni-barcode/uni-barcode'
Vue.component('uniBarcode', uniBarcode);

/* 引入uni列表插件 */
import uniList from '@/components/uni-list/uni-list'
import uniListItem from "@/components/uni-list-item/uni-list-item"
Vue.component('uniList', uniList);
Vue.component('uniListItem', uniListItem);

/* 引入上拉刷新下拉加载插件 */
import uniPulldownRefresh from "@/components/uni-pulldown-refresh/uni-pulldown-refresh.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
Vue.component('uniPulldownRefresh', uniPulldownRefresh);
Vue.component('uniLoadMore', uniLoadMore);

/* 引入uni 数字输入框 */
import uniNumberBox from '@/components/uni-number-box/uni-number-box'
Vue.component('uniNumberBox', uniNumberBox);

/* 引入uni 圆圈 */
import uniCircle from '@/components/uni-circle/uni-circle';
Vue.component('uniCircle', uniCircle);

/* 引入uni 日历 */
import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";
Vue.component('uniCalendar', uniCalendar);

/* 引入uni swipe插件 */
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item'
Vue.component('uniSwipeAction', uniSwipeAction);
Vue.component('uniSwipeActionItem', uniSwipeActionItem);

/* 引入uni 公告 */
import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar";
Vue.component('uniNoticeBar', uniNoticeBar);

/* 引入uni 公用底部导航 */
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar";
Vue.component('uniNavBar', uniNavBar);

/* 引入uni 字符图标库 */
import uniIcons from "@/components/uni-icons/uni-icons";
Vue.component('uniIcons', uniIcons);

/* 引入uni 数字角标 */
import uniBadge from "@/components/uni-badge/uni-badge";
Vue.component('uniBadge', uniBadge);

/* 引入uni Picker插件 */
import wPicker from "@/components/w-picker/w-picker.vue";
Vue.component('wPicker', wPicker);

/* 引入uni popup插件 */
import uniPopup from "@/components/uni-popup/uni-popup.vue";
Vue.component('uniPopup', uniPopup);

/* 引入uni Picker省市区插件 */
import uniCityPicker from "@/components/uni-cityPicker/uni-cityPicker.vue";
Vue.component('uniCityPicker', uniCityPicker);

/* 引入 图片预览插件 */
import uniPreviewImage from '@/components/uni-previewImage/uni-previewImage.vue'; //引用插件
Vue.component('uniPreviewImage', uniPreviewImage);

/* 引入uni 公用标题栏(h5使用) */
import uniNavHfbar from "@/components/uni-nav-hfbar/uni-nav-hfbar";
Vue.component('uniNavHfbar', uniNavHfbar);

Vue.config.productionTip = false;

// 存储与获取缓存中的商户consignorId
Vue.prototype.$setConsignorId = function (res) {
	Vue.prototype.setStor('_consignorId_', res);
}
Vue.prototype.$getConsignorId = function () {
	let consignorId = Vue.prototype.getStor('_consignorId_');
	if (typeof (consignorId) == 'undefined' || consignorId == null || consignorId == '') {
		return null;
	} else {
		return consignorId;
	}
}
Vue.prototype.$setshopConsignorId = function (res) {
	Vue.prototype.setStor('_shopConsignorId_', res);
}
Vue.prototype.$getshopConsignorId = function () {
	let consignorId = Vue.prototype.getStor('_shopConsignorId_');
	if (typeof (consignorId) == 'undefined' || consignorId == null || consignorId == '') {
		return null;
	} else {
		return consignorId;
	}
}

// 存储与获取缓存中的门店storeId
Vue.prototype.$setStoreId = function (res) {
	Vue.prototype.setStor('_storeId_', res);
}
Vue.prototype.$getStoreId = function () {
	let storeId = Vue.prototype.getStor('_storeId_');
	if (typeof (storeId) == 'undefined' || storeId == null || storeId == '') {
		return null;
	} else {
		return storeId;
	}
}
Vue.prototype.$setshopStoreId = function (res) {
	Vue.prototype.setStor('_shopStoreId_', res);
}
Vue.prototype.$getshopStoreId = function () {
	let storeId = Vue.prototype.getStor('_shopStoreId_');
	if (typeof (storeId) == 'undefined' || storeId == null || storeId == '') {
		return null;
	} else {
		return storeId;
	}
}

// 存储与获取缓存中的openId
Vue.prototype.$setOpenId = function (res) {
	Vue.prototype.setStor('$openId', res);
}
Vue.prototype.$getOpenId = function () {
	let openId = Vue.prototype.getStor('$openId');
	if (typeof (openId) == 'undefined' || openId == null || openId == '') {
		return null;
	} else {
		return openId;
	}
}

// 存储与获取缓存中的用户授权手机号码
Vue.prototype.$setUserMobile = function (res) {
	Vue.prototype.setStor('$userMobile', res);
}
Vue.prototype.$getUserMobile = function () {
	let userMobile = Vue.prototype.getStor('$userMobile');
	if (typeof (userMobile) == 'undefined' || userMobile == null || userMobile == '') {
		return null;
	} else {
		return userMobile;
	}
}

// 存储与获取缓存中的用户授权手机号码
Vue.prototype.$setSessionKey = function (res) {
	Vue.prototype.setStor('$sessionKey', res);
}
Vue.prototype.$getSessionKey = function () {
	let sessionKey = Vue.prototype.getStor('$sessionKey');
	if (typeof (sessionKey) == 'undefined' || sessionKey == null || sessionKey == '') {
		return null;
	} else {
		return sessionKey;
	}
}

// 存储与获取缓存中的用户信息
// 存储例子：this.$setUserInfo(this.encode64(JSON.stringify(res)));
Vue.prototype.$setUserInfo = function (res) {
	Vue.prototype.setStor('$userinfo', res);
}
// 获取例子：JSON.parse(this.decode64(this.$getUserInfo()))
Vue.prototype.$getUserInfo = function () {
	let userinfo = Vue.prototype.getStor('$userinfo');
	if (typeof (userinfo) == 'undefined' || userinfo == null || userinfo == '') {
		return null;
	} else {
		return userinfo;
	}
}

// #ifdef H5
Vue.prototype.h5APPID = 'wx75e565cb7f39455d';
Vue.prototype.h5PAYAPPID = 'wx7b0d27cc5a9e1eb8';
Vue.prototype.wechatBase = Vue.prototype.server_base + '/wechatcenter/wechat/v1';
import {configWechat, sharePlatform, getWecharCodeUrl, wxOrderPay} from './static/js/jwx.js';
Vue.prototype.configWechat = configWechat;
Vue.prototype.sharePlatform = sharePlatform;
Vue.prototype.getWecharCodeUrl = getWecharCodeUrl;
Vue.prototype.wxOrderPay = wxOrderPay;
Vue.prototype.payPlatform = 'icbcjft';
// #endif
import {catchPosition, scanQRCode} from './static/js/jwx.js';
Vue.prototype.catchPosition = catchPosition;
Vue.prototype.scanQRCode = scanQRCode;
Vue.mixin({
	onShow() {
		// #ifdef H5
		Vue.prototype.configWechat();
		// #endif
	},
	created() {
		//#ifdef MP-WEIXIN
		// /* 微信小程序分享 */
        // wx.showShareMenu({
        //     withShareTicket: true,
        //     menus: ['shareAppMessage', 'shareTimeline']
        // });
        //#endif
    },
});


Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()