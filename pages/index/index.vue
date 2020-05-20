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
				isReg:true
			}
		},
		onLoad() {

		},
		onShow() {
			this.isWxLogin();
			this.loadData();
		},
		onPullDownRefresh() {
			this.loadData();
		},
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
						  that.isReg = res.isReg;
						  console.log(res)
							if(res.isReg){
								uni.switchTab({
									url:'/pages/personal/personal'
								})
							}else{
								uni.navigateTo({
									url:'/pages/userbind/userbind'
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
					if(this.isReg){
						this.isToken = false;
					}else{
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
						console.log(res)
						that.banner = res;
					});
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
