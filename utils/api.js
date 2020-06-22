import util from "@/utils/util.js";

//处理code
function coderesult(code, msg) {
	console.log(code, msg)
	if (code == -1) {
		uni.removeStorageSync('token');
		// #ifdef APP-PLUS
		uni.reLaunch({
			url: '/pages/applogin/applogin'
		})
		// #endif
		// #ifdef H5
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			util.msg(msg);
			// uni.reLaunch({
			// 	url: '/pages/login/login'
			// })
		} else {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
		// #endif
		// #ifdef MP-WEIXIN
		uni.reLaunch({
			url: '/pages/index/index'
		})
		// #endif
	} else if (code == -2) {
		// .redirect('/pages/userbind/userbind');
	} else {
		util.msg(msg);
	}
}

// 用户绑定
function Userbind(data, success, complete) {
	util.PostRequest('/auth/auth/bind', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, complete, false);
}
//H5 APP 用户登录
function Postlogin(data, success, complete) {
	util.PostRequest('/auth/auth/login', data, function(res) {
		if (res.code == 1) {
			var data = res.data;
			uni.setStorageSync('token', data.jwt);
			if (success) {
				success();
			}
		} else {
			util.msg(res.msg);
		}
	}, complete, false);
}
//用户提现
function Usertianxian(data, success, complete) {
	util.PostRequest('/withdrawal/index/index', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}

	}, complete, false);
}
//用户充值
function Userchongzhi(data, success, complete) {
	util.PostRequest('/index/recharge/pay', data, function(res) {
		console.log(data)
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, complete, false);
}
//GET获取表单数据
function Getregister(data, success, complete) {
	util.GetRequest('/auth/auth/reg', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, complete, false);
}
//POST提交注册
function Postregister(data, success, complete) {
	util.PostRequest('/auth/auth/reg', data, function(res) {
		if (res.code == 1) {
			util.msg('注册成功，请登录');
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, complete, false);
}

//获取验证码(手机)
function sendcodeMobile(data, success, complete) {
	util.PostRequest('/auth/sendcode/mobile', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success();
				util.msg(res.msg);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, complete, false);
}
//获取验证码(邮箱)
function sendcodeEmail(data, success, complete) {
	util.PostRequest('/auth/sendcode/email ', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success();
				util.msg(res.msg);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, complete, false);
}

//微信小程序用户信息登录
function wxsmaillogin(encryptedData, iv, success, complete) {
	// #ifdef MP-WEIXIN
	var session_key = uni.getStorageSync('session_key');
	util.PostRequest('/auth/auth/decryptdata', {
		sessionKey: session_key,
		encryptedData: encryptedData,
		iv: iv
	}, function(decres) {
		if (decres.code == 1) {
			var token = decres.data.jwt;
			uni.setStorageSync('token', token);
			if (success) {
				success(decres.data);
			}

		} else {
			coderesult(decres.code, decres.msg);
		}
	}, complete, false);

	// #endif
}
//轮播图
function index(data, success) {
	util.GetRequest('/banner/index/index', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, function() {
		uni.stopPullDownRefresh();
	}, false);
}
// 我的 获取用户信息
function my(success, complete, isGo = false) {
	util.GetRequest('/index/center/getuserinfo', {}, function(res) {
		console.log(res)
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			// coderesult(res.code, res.msg);
			if (isGo) {
				util.msg('您还没有登录或注册哦')
			} else {
				coderesult(res.code, res.msg);
			}
		}
	}, complete);
}
// 获取我的钱包
function mypurse(data, success) {
	util.GetRequest('/index/center/getmywallet', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	});
}
//修改手机号码
function updatephone(data, success) {
	util.GetRequest('/index/center/editmobile', data, function(res) {
		if (res.code == 1) {
			util.msg(res.msg);
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	});
}
// 上传图片
function uploadimg(file, success, complete) {
	util.uploadFile('/index/upload/pictures', file, 'file', {}, function(response) {
		var res = eval("(" + response + ")");
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, complete, false);
}
//上传文件
function uploadfile(file, success, complete) {
	util.uploadFile('/index/upload/files', file, 'file', {}, function(response) {
		var res = eval("(" + response + ")");
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, complete, false);
}
//修改个人资料
function updatedata(data, success, complete) {
	util.PostRequest('/index/center/edit', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success();
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, complete, false);
}

//APP微信授权登录
function wxapplogin(success) {
	// #ifdef APP-PLUS
	var aweixin = getApp().globalData.auths['weixin'];
	// console.log(getApp().globalData.auths);
	if (!aweixin) {
		util.msg('当前环境不支持微信登录');
		return;
	}
	aweixin.authorize(function(e) {
		if (e && e.code) {
			//console.log(e);
			var code = e.code;
			util.PostRequest('/auth/auth/wxapplogin', {
				code: code,
				pid: 0
			}, function(res) {
				console.log(res);
				if (res.code == 1) {
					var token = res.data.jwt;
					uni.setStorageSync('token', token);
					if (success) {
						success(res.data);
					}
				} else {
					util.msg(res.msg);
				}
			}, undefined, false);
		}
	}, function(e) {
		util.msg('您取消了微信授权！');
	}, {
		scope: 'snsapi_userinfo',
		state: '',
		appid: getApp().globalData.appid,
		//'wx4910300b1af06fd3'
	});
	// #endif
}

// 获取文章列表
function getbooklist(data, success) {
	util.GetRequest('/article/index/getlist', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, function() {
		uni.stopPullDownRefresh();
	}, false);
}
// 文章详情
function getbookdetail(data, success) {
	util.GetRequest('/article/index/getdetail', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	});
}
// 获取邀请列表
function getMyInvitationList(data, success) {
	util.GetRequest('/index/Invitation/getMyInvitationList', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	}, function() {
		uni.stopPullDownRefresh();
	}, false);
}
//邀请好友 获取海报
function getInviteFriends(success) {
	util.GetRequest('/index/Invitation/getInviteFriends', '', function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	});
}
//获取版本控制信息
function getversion(success) {
	util.GetRequest('/other/index/getversion', {}, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	});
}
//提现配置
function tianxianfee(data, success, complete) {
	util.PostRequest('/withdrawal/index/fee', data, function(res) {
		if (res.code == 1) {
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}

	}, complete, false);
}
//忘记密码
function forgetPassword(data,success,complete){
	util.PostRequest('/auth/auth/forgetPassword', data, function(res) {
		if (res.code == 1) {
			util.msg(res.msg)
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	
	}, complete, false);
}
// 绑定手机号 修改邮箱 绑定邮箱/auth/auth/bindedit
function bindedit(data,success,complete){
	util.PostRequest('/auth/auth/bindedit', data, function(res) {
		if (res.code == 1) {
			console.log(res)
			util.msg('绑定成功')
			if (success) {
				success(res.data);
			}
		} else {
			coderesult(res.code, res.msg);
		}
	
	}, complete, false);
}

export default {
	Getregister: Getregister,
	Postregister: Postregister,
	sendcodeMobile: sendcodeMobile,
	sendcodeEmail: sendcodeEmail,
	Postlogin: Postlogin,
	Usertianxian: Usertianxian,
	Userbind: Userbind,
	wxsmaillogin: wxsmaillogin,
	Userchongzhi: Userchongzhi,
	index: index,
	my: my,
	mypurse: mypurse,
	uploadimg: uploadimg,
	uploadfile: uploadfile,
	updatedata: updatedata,
	updatephone: updatephone,
	wxapplogin: wxapplogin,
	coderesult: coderesult,
	getbooklist: getbooklist,
	getbookdetail: getbookdetail,
	getMyInvitationList: getMyInvitationList,
	getInviteFriends: getInviteFriends,
	getversion: getversion,
	tianxianfee: tianxianfee,
	forgetPassword:forgetPassword,
	bindedit:bindedit
}
