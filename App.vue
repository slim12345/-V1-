<script>
	export default {
		globalData: {
			global_url: "https://pangu.gx11.cn",
			site: '/web_view/#/', //H5站点
			api_key: 'gx123456789',
			mobileReg: /^1\d{10}$/,
			emailReg: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
			// 当前环境支持的所有授权登录对象
			auths: {},
			//微信开放平台AppId
			appid: 'wx4910300b1af06fd3',
			msg: function(title, icon = 'none', mask = false, duration = 1500) {
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
		},
		onLaunch: function(options) {
			// #ifdef APP-PLUS
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					//console.log('运行Android上') 
					plus.navigator.closeSplashscreen();
					break;
				case 'ios':
					//console.log('运行iOS上') 
					plus.navigator.closeSplashscreen();
					break;
				default:
					//console.log('运行在开发者工具上') 
					break;
			}
			// #endif

			var that = this;
			var token = uni.getStorageSync('token');

			// #ifdef MP-WEIXIN
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes);
					uni.request({
						url: that.globalData.global_url + '/auth/auth/getwxsmalluserinfo', 
						data: {
							jscode: loginRes.code
						},
						method: 'POST',
						success: function(res) {
							//console.log(res);
							if (res && res.statusCode == 200) {
								var data = res.data;
								console.log(data);
								if (data.code == 1) {
									var session_key = data.data.session_key;
									uni.setStorageSync('session_key', session_key);
								} else {
									that.globalData.msg(data.msg);
								}
							} else {
								var json = {
									code: -999,
									msg: '基础网络连接错误！'
								};
								that.globalData.msg(json.msg);
							}
						},
						fail: function() {
							that.globalData.msg('请检查网络连接！');
						},
						complete: function() {

						}
					});
				},
				fail() {
					that.globalData.msg('微信登录失败！');
				}
			})
			// #endif

			// #ifdef H5
			// var ua = window.navigator.userAgent.toLowerCase();
			// if (ua.match(/micromessenger/i) == 'micromessenger') {
			// 	if (options.query.jwt && options.query.jwt != '') {
			// 		var tempToken = options.query.jwt;
			// 		uni.setStorageSync('token', tempToken);
			// 		console.log(tempToken);
			// 	} else if (token == undefined || token == '' || token == null) {
			// 		var pid = '';
			// 		if (options.query.pid) {
			// 			pid = options.query.pid;
			// 		}
			// 		var path = '';
			// 		if (options.path) {
			// 			path = options.path;
			// 		}
			// 		var to_url = that.globalData.global_url + that.globalData.site + path;
			// 		var url = that.globalData.global_url +
			// 			'/auth/auth/wxpubliclogin?to_url=' + encodeURIComponent(to_url) +
			// 			'&pid=' + pid;
			// 		//console.log(url);
			// 		location.replace(url);
			// 	}
			// } else {
			//	// that.globalData.msg('请在微信中打开！');
			// }
			// #endif

			// #ifdef APP-PLUS

			// 获取登录授权认证服务列表，单独保存微信登录授权对象

			plus.oauth.getServices(function(services) {
				for (var i in services) {
					var service = services[i];
					that.globalData.auths[service.id] = service;
				}
				// aweixin = auths['weixin'];
			}, function(e) {
				// plus.nativeUI.alert("获取登录授权服务列表失败：" + JSON.stringify(e));
				that.globalData.msg('获取鉴权失败！');
			});



			//APP判断是否已登录
			if (token == undefined || token == null || token == '') { //未登录

			} //判断token结束
			// #endif
		},

		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	.CCC{
		color: #CCCCCC;
	}
	/* 重写标题栏 */
	.title_bar {
		width: 750rpx;
		height: 88rpx;
		background: rgba(255, 255, 255, 1);
	}


	/* 单行溢出 */
	.yichu {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}


	.reg_head {
		position: absolute;
		top: 0;
		width: 750rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 999;
	}

	.reg_head image {
		width: 88rpx;
		height: 38rpx;
		margin-left: 30rpx;
	}

	.load {
		width: 149rpx;
		height: 60rpx;
		margin-right: 30rpx;
		border-radius: 4rpx;
		line-height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(54, 134, 255, 1);
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		z-index: 999;
	}

	.zc {
		background: rgba(51, 51, 51, 0.4);
	}

	.wjmm {
		background: rgba(238, 238, 238, 1);
	}

	.area {
		width: 560rpx;
		border-bottom: 2rpx solid rgba(238, 238, 238, 1);
		margin: 0 auto;
		height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 50rpx 20rpx 32rpx 27rpx;
	}

	.icon {
		width: 42rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
	}

	.text01 {
		width: 375rpx;
	}

	.text {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.text02 {
		width: 460rpx;
	}

	.text03 {
		width: 250rpx;
	}

	.icon01 {
		width: 42rpx;
		height: 42rpx;
	}

	.icon02 {
		width: 42rpx;
		height: 42rpx;
	}

	.icon03 {
		width: 42rpx;
		height: 42rpx;
	}

	.icon04 {
		width: 42rpx;
		height: 42rpx;
	}

	.icon05 {
		width: 42rpx;
		height: 42rpx;
	}

	.area_jt {
		width: 20rpx;
		height: 12rpx;
	}

	.getcode {
		width: 150rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(60, 137, 251, 1);
		text-align: right;
	}

	/* 箭头 */
	.nav-jt {
		width: 12rpx;
		height: 24rpx;
	}

	.tixian_cnt {
		width: 750rpx;
		background: rgba(255, 255, 255, 1);
		padding-top: 38rpx;
		padding-bottom: 60rpx;
	}

	.txmoney {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin: 0rpx 0 29rpx 31rpx;
	}

	.input {
		width: 750rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.input text {
		margin-left: 28rpx;
	}

	.input input {
		margin-left: 10rpx;
		font-size: 40rpx;
	}

	.viewinput {
		width: 650rpx;
		margin-left: 74rpx;
		height: 2rpx;
		background: rgba(238, 238, 238, 1);
	}

	.ts {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		margin: 20rpx 0 0 29rpx;
	}

	.tixian_type {
		width: 100%;
	}

	.tixian_bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 20rpx 0;
		background: #FFFFFF;
	}

	.tixian_bottom view,
	button {
		width: 630rpx;
		height: 100rpx;
		margin: 0 60rpx;
		background: rgba(54, 134, 255, 1);
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}

	.update {
		width: 690rpx;
		height: 100rpx;
		margin: 0 30rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid rgba(238, 238, 238, 1);
	}

	.updatetop {
		margin-top: 212rpx;
	}

	.updatebottom {
		margin-bottom: 70rpx;
	}

	input {
		font-size: 30rpx;
	}

	.btn {
		width: 690rpx;
		height: 90rpx;
		margin: 0 30rpx;
		background: rgba(54, 134, 255, 1);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}
</style>
