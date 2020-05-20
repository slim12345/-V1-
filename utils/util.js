import md5 from "@/utils/md5.js";

//弹出提示
const msg = (title, icon = 'none', mask = false, duration = 1500) => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
	setTimeout(function() {
		uni.hideToast();
	}, duration);
}

//上一页面对象
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
//时间戳转日期
//时间戳为10位需*1000，时间戳为13位的话不需乘1000
// 一种 返回年月日时分秒
function fomateDate(num) {
	let date = new Date(num * 1000);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	return Y + M + D + h + m + s;
}
// 二种 返回年月日
function fomateYMD(num) {
	let date = new Date(num * 1000);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	if (date.getDate() < 10) {
		D = '0' + date.getDate()
	} else {
		D = date.getDate()
	}
	return Y + M + D;
}
//获取当前页面对象
function currentPage() {
	var pages = getCurrentPages();
	var page = pages[pages.length - 1];
	// #ifdef H5
	return page;
	// #endif
	return page.$vm;
}

//数据生成签名
function toMd5(requestData, timestamp, nonce) {
	// var key = getApp().globalData.api_key;
	var key = getApp().globalData.api_key;
	requestData['nonce'] = nonce;
	requestData['timestamp'] = timestamp;
	requestData['key'] = key;
	var data = dicOrderWithData(requestData);
	console.log(data);
	return md5.md5(data);
}
//排序处理成字符串
function dicOrderWithData(data) {
	var result = '';
	var keys = [];
	for (var k in data) {
		keys.push(k);
	}
	keys.sort();
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var v = data[k];
		var value = '';
		if (v == null || v == undefined) {
			value = '';
		} else {
			value = v;
		}
		result += k + '=' + value + '&';
	}
	if (result.length > 1) {
		result = result.substr(0, result.length - 1);
	}
	return result;
}


//POST方式网络请求
function PostRequest(url, data, success, complete, isLoad = false, title = '正在加载') {
	if (isLoad) {
		uni.showLoading({
			title: title,
			mask: true
		});
	}
	var requestData = {};
	for (var k in data) {
		requestData[k] = data[k];
	}
	var timestamp = Date.parse(new Date()) / 1000;
	var nonce = Math.random().toString(36).substr(2, 15);
	var sign = toMd5(requestData, timestamp, nonce);
	var token = uni.getStorageSync('token');
	var header = {
		'content-type': 'application/x-www-form-urlencoded',
		'jwt': token,
		'signtoken': sign
		// 'timestamp': timestamp,
		// 'nonce': nonce,
		// 'sign': sign
	};

	uni.request({
		url: getApp().globalData.global_url + url,
		data: data,
		method: 'POST',
		header: header,
		success: function(res) {
			//console.log(res);
			if (res && res.statusCode == 200) {
				success(res.data);
			} else {
				var json = {
					code: -999,
					msg: '基础网络连接错误！'
				};
				success(json);
			}
		},
		fail: function() {
			msg('请检查网络连接！');
		},
		complete: function() {
			if (isLoad) {
				uni.hideLoading();
			}
			if (complete) {
				complete();
			}
		}
	});
}
//GET方式网络请求
function GetRequest(url, data, success, complete, isLoad = false, title = '正在加载') {
	if (isLoad) {
		uni.showLoading({
			title: title,
			mask: true
		});
	}
	var requestData = {};
	var queryString = '';
	for (var k in data) {
		requestData[k] = data[k];
		queryString += k + '=' + data[k] + '&';
	}
	if (queryString.length > 1) {
		queryString = queryString.substr(0, queryString.length - 1);
	}
	var timestamp = Date.parse(new Date()) / 1000;
	var nonce = Math.random().toString(36).substr(2, 15);
	var sign = toMd5(requestData, timestamp, nonce);
	var token = uni.getStorageSync('token');
	var header = {
		'jwt': token,
		// 'signtoken': 'sign'
	};
	uni.request({
		url: getApp().globalData.global_url + url + '?' + queryString,
		method: 'GET',
		header: header,
		success: function(res) {
			//console.log(res);
			if (res && res.statusCode == 200) {
				success(res.data);
			} else {
				var json = {
					code: -999,
					msg: '基础网络连接错误！'
				};
				success(json);
			}
		},
		fail: function() {
			msg('请检查网络连接！');
		},
		complete: function() {
			if (isLoad) {
				uni.hideLoading();
			}
			if (complete) {
				complete();
			}
		}
	});
}
//上传文件
function uploadFile(url, file, name, data, success, complete, isLoad = false, title = '正在上传') {
	if (isLoad) {
		uni.showLoading({
			title: title,
			mask: true
		});
	}
	uni.uploadFile({
		url: getApp().globalData.global_url + url,
		filePath: file,
		name: name,
		formData: data,
		// fileType:image/video/audio
		success: function(res) {
			// console.log(res);
			if (res && res.statusCode == 200) {
				success(res.data);
			} else {
				var json = {
					code: -999,
					msg: '基础网络连接错误！'
				};
				success(json);
			}
		},
		fail: function() {
			msg('请检查网络连接！');
		},
		complete: function() {
			if (isLoad) {
				uni.hideLoading();
			}
			if (complete) {
				complete();
			}
		}
	});
}
export default {
	msg: msg,
	prePage: prePage,
	PostRequest: PostRequest,
	GetRequest: GetRequest,
	currentPage: currentPage,
	uploadFile: uploadFile,
	fomateDate: fomateDate,
	fomateYMD: fomateYMD
}
