<template>
	<view>
		<view class="white">
			<text class="title">充值地址</text>
			<text class="code">0x6a1982243bB1cfc33d116422EC8E54B8A804dbDc
				adsa5a</text>
			<image src="/static/user_13.png" mode=""></image>
			<view class="function">

				<text @click="copyChongZhiAddress">复制地址</text>
				<text class="line">|</text>
				<!-- #ifndef MP-WEIXIN -->
				
				<text @click="saveImgToLocal">保存二维码</text>

				<!-- #endif -->
				

				<!-- #ifdef MP-WEIXIN -->
				
				<text v-if="openSettingBtnHidden" @click="saveEwm">保存二维码</text>
				<!-- <view v-if="openSettingBtnHidden" class="purple_btn btn_box" @click="saveEwm">
			            保存到相册
			        </view> -->

				<button class="copyCode" v-else hover-class="none" open-type="openSetting" @opensetting='handleSetting'>去授权</button>
				<!-- #endif -->

			</view>
		</view>
		<text class="tip">温馨提示：本地址只接受xxx区块链代币，其他币种充值均无法找回</text>
	<view class="warn">
				<text class="title1">转入须知</text>
				<text>请勿向上述地址转入任何非数字货币资产，否则资产将不可找回。</text>



	<text>您转入至上述地址后，需整个网络节点的确认，2次网络确认可划转，到账时间一般为10分钟-60分钟。</text>
	<text>您的转入地址不会经常改变，可以重复转入；如有更改，我们会尽量通过网站公告或邮件通知您。</text>
	<text>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</text>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chongzhiAddress: '',
				openSettingBtnHidden: true, //是否授权
				ewmImg: "http://b.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbb3586c0168224f4a20a4dd7e.jpg" //这是要保存的图片
			}
		},


		methods: {
			// 微信小程序保存到相册
			handleSetting(e) {
				let _self = this;
				console.log(e, this.openSettingBtnHidden)
				if (!e.detail.authSetting['scope.writePhotosAlbum']) {
					_self.openSettingBtnHidden = false;

				} else {
					_self.openSettingBtnHidden = true;
				}
			},
			saveEwm: function(e) {
				let _self = this;
				//先判断是否有获取相册授权
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							console.log(res.authSetting['scope.writePhotosAlbum'])
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
							
									//这里是用户同意授权后的回调
									_self.saveImgToLocal();
								},
								fail() { //这里是用户拒绝授权后的回调
									uni.showToast({
										title: '请设置授权保存到相册权限',
										icon: 'none',
										duration: 3000
									})
									console.log(res);
									_self.openSettingBtnHidden = false;
									
									// _self.handleSetting()
								}
							})
						} else { //用户已经授权过了
							_self.saveImgToLocal();
						}
					}
				})
			},
			//保存图片到本地
			saveImgToLocal: function(e) {
				let _self = this;
				uni.downloadFile({
					url: _self.ewmImg, //图片地址
					// url:'http://b.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbb3586c0168224f4a20a4dd7e.jpg',
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败",
										icon: "none"
									});
								}
							});
						}
					}
				})


			
		 },
	

	
	//复制地址
		copyChongZhiAddress() {
			let that = this;
			// #ifdef H5

			that.chongzhiAddress = '';
			let content = 'aa' // 复制内容，必须字符串，数字需要转换为字符串
			const result = that.h5Copy(content)
			if (result !== false) {

				uni.showToast({
					title: '复制成功',

				})
				that.chongzhiAddress = content;
			} else {
				uni.showToast({
					title: '复制失败'
				})
			}


			



			// #endif
			// #ifndef H5

			uni.setClipboardData({
				data: 'hello',
				success: function() {

					console.log('success');
					uni.getClipboardData({
						success: function(res) {
							console.log(res.data);
							that.chongzhiAddress = res.data;
						}
					});
				},
			})
			// #endif

		}
	}
	}
</script>

<style lang="scss">
	page {
		background: #407FFF;
		padding-bottom:30rpx;
	}
.warn{
		padding:70rpx 20rpx 0rpx;
		.title1{
			font-size:30rpx;
			line-height: 60rpx;
			font-weight: 400;
			
		}
		text{
			color:#fff;
			display:block;
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:400;
			
			line-height:40rpx;
			padding-bottom: 10rpx;
		}
	}
	.white {
		text-align: center;
		width: 92%;
		// height:730rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		margin: 40rpx auto;

		.title {
			display: block;
			font-size: 30rpx;

			font-weight: 600;
			color: rgba(51, 51, 51, 1);
			line-height: 120rpx;
		}

		.code {

			font-size: 24rpx;

			font-weight: 600;
			color: rgba(51, 51, 51, 1);
			line-height: 36rpx;
		}

		image {
			display: block;
			width: 350rpx;
			height: 350rpx;
			margin: 59rpx auto 40rpx;

		}

		.function {
			width: 350rpx;

			margin: 0 auto;

			text.line {
				color: rgba(204, 204, 204, 1);
				padding: 20rpx;
			}

			text,
			.copyCode {
				// padding: ;
				display: inline;
				font-size: 30rpx;
				font-weight: 600;
				color: rgba(54, 134, 255, 1);
				line-height: 120rpx;
				background: none;
				border: 1px solid rgba(255,255,255,1);

				padding: 0;
				margin: 0;
			}
			button::after{
				border:none;
			}
		}
	}

	.tip {
		display: block;
		width: 92%;
		text-align: left;
		font-size: 24rpx;

		font-weight: 600;
		color: rgba(255, 255, 255, .7);
		line-height: 36rpx;
		margin: 40rpx auto;

	}
</style>
