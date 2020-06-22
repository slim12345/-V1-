import Vue from 'vue'
import App from './App'
import store from './store'

import Json from './Json' //测试用数据

Vue.config.productionTip = false

//防止多次点击跳转
Vue.prototype.isClick = true;

//navigateTo（跳转可后退）
Vue.prototype.To = function(url) {
	if (!Vue.prototype.isClick) {
		return;
	}
	Vue.prototype.isClick = false;
	uni.navigateTo({
		url: url,
		complete: function() {
			Vue.prototype.isClick = true;
		}
	});
}

//重定向（跳转不可后退）
Vue.prototype.redirect = function(url) {
	if (!Vue.prototype.isClick) {
		return;
	}
	Vue.prototype.isClick = false;
	uni.redirectTo({
		url: url,
		complete: function() {
			Vue.prototype.isClick = true;
		}
	});
}

//关闭所有页面，打开新的页面
Vue.prototype.relaunch = function(url) {
	if (!Vue.prototype.isClick) {
		return;
	}
	Vue.prototype.isClick = false;
	uni.reLaunch({
		url: url,
		complete: function() {
			Vue.prototype.isClick = true;
		}
	});
}

//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
Vue.prototype.switchtab = function(url) {
	if (!Vue.prototype.isClick) {
		return;
	}
	Vue.prototype.isClick = false;
	uni.switchTab({
		url: url,
		complete: function() {
			Vue.prototype.isClick = true;
		}
	});
}

//防多调用函数
Vue.prototype.Click = function(success) {
	if (!success) {
		return;
	}
	if (!Vue.prototype.isClick) {
		return;
	}
	Vue.prototype.isClick = false;
	success(function() {
		Vue.prototype.isClick = true;
	});
}
//结束


//自定义弹出层组件
import neilModal from '@/components/neil-modal/neil-modal.vue';
Vue.component('neilModal', neilModal); //设置组件名称
//结束


const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}


//全局函数
import api from '@/utils/api.js';
import util from '@/utils/util.js';
import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
Vue.prototype.api = api;
Vue.prototype.util = util;
Vue.prototype.h5Copy=h5Copy;
Vue.prototype.$store = store;
Vue.prototype.$apiJson= {json};
//结束



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
