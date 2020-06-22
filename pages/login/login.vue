<template>

	<view>
		<!--  #ifdef  H5 -->
		<!-- H5头部 -->
		<view class="head_bg">
			<image src="/static/login_01.png" mode="widthFix"></image>
		</view>
		<view class="reg_head zc">
			<image src="/static/login_02.png"></image>
			<view class="load" @click="downloadapp">
				下载APP
			</view>
		</view>
		<!--  #endif -->
		<!-- #ifdef APP-PLUS -->
		<!-- APP头部 -->
		<view class="login_bg">
			<view class="title_bar">
				<image @click="back()" class="nav_icon" src="/static/nav_btn_back_white.png" mode="aspectFill"></image>
			</view>
			<image src="/static/login_15.png" mode="widthFix"></image>
			<view class="loginname">登录</view>
		</view>
		<!-- #endif -->
		<!-- 登录表单 -->
		<form @submit="formSubmit">
			<view class="loginbox">
				<view class="area">
					<view class="icon">
						<image class="icon02" src="/static/login_05.png" mode="aspectFill"></image>
					</view>
					<input class="text text02" v-model="emailphone" type="text" placeholder="请输入您的手机号或者邮箱号" placeholder-class="CCC" />
				</view>
				<view class="area">
					<view class="icon">
						<image class="icon02" src="/static/login_07.png" mode="aspectFill"></image>
					</view>
					<input class="text text02" v-model="pwd" password="true" placeholder="请输入您的密码" placeholder-class="CCC" />
				</view>
				<button class="btn" style="margin-top: 90rpx;" form-type="submit">登录</button>
				<view class="read">
					没有账号？<text class="blue" @click="zc">立即注册</text>
					<text class="right" @click="wjpwd">忘记密码</text>
				</view>
			</view>
		</form>
		<!-- 登录表单结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emailphone: '',
				pwd: ''
			}
		},
		// #ifdef APP-PLUS
		onBackPress(){
		// 监听页面返回，自动关闭小键盘
		plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			// login(e){
			// 	 uni.navigateTo({
			// 	 	url:'../index/index'
			// 	 })
			// },
			formSubmit(e) {
				var that = this;
				this.Click(function(complete) {
					var emailphone = that.$data.emailphone;
					var data = {};
					if (emailphone == '') {
						that.util.msg('手机号或者邮箱不能为空');
						complete();
						return;
					}
					if (getApp().globalData.mobileReg.test(emailphone)) {
						data.mobile = emailphone
					} else if (getApp().globalData.emailReg.test(emailphone)) {
						data.email = emailphone
					} else {
						that.util.msg('手机号或邮箱号格式不正确');
						complete();
						return;
					}
					var pwd = that.$data.pwd;
					if (pwd == '') {
						that.util.msg('密码不能为空');
						complete();
						return;
					}
					data.password = pwd;
					that.api.Postlogin(data, function() {
						uni.switchTab({
							url: '../index/index'
						})
					}, complete);
				});
			},
			//下载APP
			downloadapp() {
				// #ifdef  H5
				var appURl = getApp().globalData.global_url + '/download/index.html';
				location = appURl;
				// #endif
			},
			// 跳转注册
			zc(e) {
				this.To('/pages/register/register')
			},
			// 跳转忘记密码
			wjpwd(e) {
				this.To('/pages/forgetpassword/forgetpassword')
			},
			// 返回上一页
			back() {
				uni.navigateBack({})
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	/* 头部样式 */
	.head_bg {
		width: 100%;
	}

	.head_bg image {
		width: 100%;
	}

	.login_bg {
		width: 100%;
		position: relative;
	}

	.login_bg image {
		width: 750rpx;
	}

	.loginname {
		position: absolute;
		top: 207rpx;
		left: 32rpx;
		font-size: 56rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	/* 头部样式结束 */

	/* 表单样式 */
	.loginbox {
		position: absolute;
		left: 30rpx;
		top: 303rpx;
		width: 690rpx;
		height: 598rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(204, 204, 204, 0.2);
		border-radius: 20rpx;
	}

	/*  #ifdef  H5  */
	.loginbox {
		top: 146rpx;
	}

	/*  #endif  */
	/*  #ifdef  APP-PLUS  */
	.loginbox {
		top: 303rpx;
	}

	.title_bar {
		position: absolute;
		top: 88rpx;
		background-color: rgba(255, 255, 255, 0) !important;
		z-index: 9999;
		line-height: 88rpx;
	}

	.title_bar .nav_icon {
		width: 16rpx;
		height: 30rpx;
		margin-left: 32rpx;
	}

	/*  #endif  */

	.btn {
		width: 606rpx;
		height: 90rpx;
		background: rgba(60, 137, 251, 1);
		border-radius: 16rpx;
		margin: 0 auto;
		text-align: center;
		line-height: 90rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	.read {
		width: 606rpx;
		height: 23rpx;
		margin: 44rpx auto 0;
		font-size: 24rpx;
		color: #6E8899;
	}

	.blue {
		color: #3C89FB;
	}

	.right {
		float: right;
	}
</style>
