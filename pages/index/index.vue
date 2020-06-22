<template>
	<view>
		<!-- 轮播 -->
		<swiper class="swiper" :indicator-dots="indicatorDots" indicator-active-color="#FFFFFF" :autoplay="autoplay"
		 :interval="interval" :duration="duration">
			<swiper-item v-for="item in banner" :key="item.id" @click="swiperClick(item.link,item.title)">
				<image :src="item.imgPath" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- <button @click="reg">哈哈哈</button> -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="wxlogin" v-if="isToken">
			<text>点击这里前往登录哦~</text>
			<button open-type="getUserInfo" @getuserinfo="getUserInfo">
				登录注册
			</button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true, //指示灯
				autoplay: true, //是否自动播放
				interval: 2000, //自动切换间隔时间
				duration: 500, //滑动动画时长
				isToken: true,
				banner: [],
				isReg: true,
				title: 'Hello'
			}
		},
		onLoad(options) {
			this.loadData();
		},
		onShow() {
			this.isWxLogin();
		},
		onReady() {
			this.getVersion();
		},
		onPullDownRefresh() {
			this.loadData();
		},
		onShareAppMessage: function() {},
		// #ifndef MP-WEIXIN
		onBackPress() {
			// 监听页面返回，自动关闭小键盘
			plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			// reg(){
			// 	var that = this;
			// 	that.api.Getregister(
			// 		{type:1,
			// 		},
			// 		function(res) {
			// 		});
			// },
			swiperClick(url, title) {
				url = 'https://www.baidu.com';
				this.To('/pages/web_url/web_url?url=' + encodeURIComponent(url) + '&title=' + title);
			},
			getUserInfo(e) {
				var that = this;
				that.Click(function(complete) {
					var errMsg = e.detail.errMsg;
					console.log(errMsg);
					if (errMsg == 'getUserInfo:ok') {
						var encryptedData = e.detail.encryptedData;
						var iv = e.detail.iv;
						that.api.wxsmaillogin(encryptedData, iv, function(res) {
							that.isWxLogin();
							that.isReg = res.isReged;
							console.log(res)
							if (res.isReged) {
								uni.switchTab({
									url: '/pages/personal/personal'
								})
							} else {
								uni.navigateTo({
									url: '/pages/userbind/userbind'
								})
							}
						}, complete);
					} else {
						complete();
					}
				});
			},
			isWxLogin() {
				var token = uni.getStorageSync('token');
				if (token != undefined && token != '' && token != null) {
					if (this.isReg) {
						this.isToken = false;
					} else {
						this.isToken = true;
					}
				} else {
					this.isToken = true;
				}
			},
			loadData() {
				var that = this;
				// var type = 0;
				// // #ifdef APP-PLUS
				// type = 0;
				// // #endif
				// // #ifdef H5
				// var ua = window.navigator.userAgent.toLowerCase();
				// if (ua.match(/micromessenger/i) == 'micromessenger') {
				// 	type = 1;
				// } else {
				// 	type = 3;
				// }
				// // #endif
				// // #ifdef MP-WEIXIN
				// type = 2;
				// // #endif
				var cate_id = 1;
				that.api.index({
						cate_id: cate_id
					},
					function(res) {
						// console.log(res)
						that.banner = res;
					});
			},
			getVersion() {
				var that = this;
				// #ifdef APP-PLUS
				that.api.getversion(function(res) {
					console.log(res);
					//当前版本
					var banben = plus.runtime.version;

					if (uni.getSystemInfoSync().platform == 'android') {
						//安卓信息
						var android_download = res.ANDROID_LINK.value;
						var apibanben = res.ANDROID_VERSION.value;
						var android_updatecnt = res.ANDROID_DESC.value;
						var androidIshave = res.ANDROID_IS_HAVE.value;

						if (apibanben != banben) {
							var buttons = [];
							if (androidIshave == "0") {
								buttons = ['立即更新', '暂不更新'];
							} else {
								buttons = ['立即更新'];
							}
							var isCancel = androidIshave == "0";
							plus.nativeUI.confirm(android_updatecnt, function(e) {
								console.log("Close confirm: " + e.index);
								if (e.index == 0) {
									var dtask = plus.downloader.createDownload(android_download, {}, function(s, status) {
										// 下载完成
										if (status == 200) {
											plus.runtime.install(plus.io.convertLocalFileSystemURL(s.filename), {}, function(widgetInfo) {
												console.log(widgetInfo);
											}, function(error) {
												that.util.msg('安装失败');
											});
										} else {
											that.util.msg('下载失败');
										}
									});
									//dtask.addEventListener("statechanged", onStateChanged, false);
									dtask.start();
									var Waiting = plus.nativeUI.showWaiting('下载进度0%', {
										padding:'4%'
									});

									dtask.addEventListener('statechanged', function(
										task,
										status 
									) {
										//console.log(task,status);
										switch (task.state) {
											case 1:
												break;
											case 2:
												break;
											case 3:
												var pro = parseInt(task.downloadedSize / task.totalSize * 100);
												//console.log(pro)
												Waiting.setTitle('下载进度' + pro + '%');
												break;
											case 4:
												Waiting.close();
												//下载完成
												break;
										}
									});
								}
							}, {
								'title': 'APP更新',
								'buttons': buttons,
								'verticalAlign': 'center'
							});
						}
					}


					//ios信息
					var ios_download = res.IOS_LINK.value;
					var apibanben01 = res.IOS_VERSION.value;
					var ios_updatecnt = res.IOS_DESC.value;
					var iosIshave = res.IOS_IS_HAVE.value;



				});
				// #endif
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	/* 轮播图样式 */
	swiper {
		width: 100%;
		height: 422rpx;
	}

	swiper-item image {
		width: 100%;
		height: 100%;
	}

	.wxlogin {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 100rpx;
		background: rgba(51, 51, 51, 0.8);
		line-height: 100rpx;
		display: flex;
		justify-content: space-between;
	}

	.wxlogin text {
		font-size: 30rpx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		margin-left: 31rpx;
	}

	.wxlogin button {
		width: 140rpx;
		height: 52rpx;
		background: rgba(31, 144, 232, 1);
		border-radius: 10rpx;
		border: none;

		font-size: 26rpx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		padding: 0;
		margin: 25rpx 30rpx 0 0;
		line-height: 52rpx;
	}

	.wxlogin button:after {
		padding: 0;
		margin: 0;
	}
</style>
