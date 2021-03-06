// var jweixin = require('@/utils/jweixin.js');
import jweixin from "@/utils/jweixin.js";
import util from "@/utils/util.js";

export default {
	//判断是否在微信中    
	isWechat: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			console.log('是微信客户端')
			return true;
		} else {
			console.log('不是微信客户端')
			return false;
		}
	},
	initJssdk: function(callback) {
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		var h = window.location.href;
		var uri = h.split('#')[0]; //encodeURIComponent(window.location.href.split('#')[0]); //获取当前url然后传递给后台获取授权和签名信息
		console.log(uri);
		util.PostRequest('/auth/Jssdk/getJSSDKConfig', {
			url: uri,
			apis:'chooseWXPay'
		}, function(res) {
			console.log(res);
			if (res.code == 1) {
				//返回需要的参数appId,timestamp,noncestr,signature等
				//注入config权限配置  
				jweixin.config({
					debug: false,
					appId: res.data.appId,
					timestamp: res.data.timestamp,
					nonceStr: res.data.nonceStr,
					signature: res.data.signature,
					jsApiList: res.data.jsApiList
				});
				if (callback) {
					callback(res.data);
				}
			} else {
				util.msg(res.msg);
			}
		})
	},
	//在需要定位页面调用
	getlocation: function(callback) {
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				jweixin.getLocation({
					type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'  
					success: function(res) {
						// console.log(res);  
						callback(res)
					},
					fail: function(res) {
						console.log(res)
					},
					// complete:function(res){  
					//     console.log(res)  
					// }  
				});
			});
		});
	},
	openlocation: function(data, callback) { //打开位置  
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				jweixin.openLocation({ //根据传入的坐标打开地图  
					latitude: data.latitude,
					longitude: data.longitude
				});
			});
		});
	},
	chooseImage: function(callback) { //选择图片  
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		//console.log(data);  
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				jweixin.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function(rs) {
						callback(rs)
					}
				})
			});
		});
	},
	//微信支付  
	wxpay: function(data, callback) {
		this.initJssdk(function(sdkres) {
			jweixin.ready(function() {
				// console.log('测试1', data);
				jweixin.chooseWXPay({
					timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
					nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
					package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
					signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
					paySign: data.paySign, // 支付签名  
					success: function(res) {
						// console.log(res);
						callback(res);
					},
					fail: function(res) {
						util.msg('您取消了支付！');
					},
					// complete:function(res){  
					//     console.log(res)  
					// }
				});
			});
		});
	},
	wxShare: function(data) {
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				
				jweixin.onMenuShareAppMessage({
					title: data.title,
					desc: data.desc,
					link: data.link,
					imgUrl: data.imgUrl,
					success: function(res) {

					},
					fail: function(res) {

					},
					// complete:function(res){  
					//     console.log(res)  
					// }
				});
				jweixin.onMenuShareTimeline({
					title: data.title, // 分享标题
					link: data.link, // 
					imgUrl: data.imgUrl, // 分享图标
					success: function() {

					}
				});
			});
		});
	}
}
