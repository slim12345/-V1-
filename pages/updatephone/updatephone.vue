<template>
	<view>
		<view class="update updatetop">
			<input class="widthss" v-model="oldmobile" type="number" placeholder="请输入原手机号" />
		</view>
		<view class="update flex">
			<input class="widths" v-model="mobile" type="number" placeholder="请输入新手机号" />
			<view class="getcode1" @click="getCode">{{sendText}}</view>
		</view>
		<view class="update updatebottom">
			<input class="widthss" v-model="yzm" type="number" placeholder="请输入验证码" />
		</view>
		<view class="btn" @click="updatephone">完成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSend: false,
				sendText: '获取验证码',
				currentTime: 60,
				mobile: '',
				oldmobile: '',
				disabled: false,
				yzm: ''
			}
		},
		onLoad(option) {
			// var oldmobile = option.mobile;
			// if (oldmobile) {
			// 	this.disabled = true
			// 	this.oldmobile = oldmobile;
			// }
		},
		methods: {
			// 获取手机验证码
			getCode() {
				var that = this;
				this.Click(function(complete) {
					var isSend = that.$data.isSend;
					console.log(isSend);
					if (isSend) {
						complete();
						return;
					}
					var mobile = that.$data.mobile;
					console.log(mobile);
					if (mobile == '') {
						that.util.msg('手机号不能为空');
						complete();
						return;
					}
					if (!getApp().globalData.mobileReg.test(mobile)) {
						that.util.msg('手机号格式不正确');
						complete();
						return;
					}
					that.api.sendcodeMobile({
						mobile: mobile
					}, function() { //发送成功 
						var intervalId = setInterval(function() {
							var time = that.currentTime--;
							if (time <= 0) {
								that.sendText = '获取验证码';
								that.isSend = false;
								that.currentTime = 60;
								clearInterval(intervalId);
							} else {
								that.sendText = time + 'S后重试';
								that.isSend = true;
							}
						}, 1000);
					}, complete);
				})
			},
			//提交 修改手机号码
			updatephone() {
				var that = this;
				var oldMobile = that.oldmobile;
				var mobile = that.mobile;
				var yzm = that.yzm;
				if (oldMobile == '') {
					that.util.msg('原手机号不能为空');
					return;
				}
				if (!getApp().globalData.mobileReg.test(oldMobile)) {
					that.util.msg('原手机号格式不正确');
					return;
				}
				if (mobile == '') {
					that.util.msg('新手机号不能为空');
					return;
				}
				if (!getApp().globalData.mobileReg.test(mobile)) {
					that.util.msg('新手机号格式不正确');
					return;
				}
				if (yzm == '') {
					that.util.msg('验证码不能为空');
					return;
				}
				that.api.updatephone(
				{
					oldMobile:oldMobile,
					mobile:mobile,
					yzm:yzm
				},
					function(res) {
						console.log(res);
						uni.navigateBack({
						});
					});
			}

		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	input {
		padding-left: 30rpx;
	}

	.getcode1 {
		height: 31rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(54, 134, 255, 1);
		margin-right: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flex {
		justify-content: space-between;
	}

	input {}

	.widths {
		width: 60%;
	}

	.widthss {
		width: 100%;
	}
</style>
