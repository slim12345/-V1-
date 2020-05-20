<template>
	<view>
		<!-- 注册页 -->
		<view class="all">
			<view class="head_bg">
				<!-- H5头部 -->
				<!--  #ifdef  H5 -->
				<image class="head_icon" src="/static/login_01.png" mode="widthFix"></image>
				<view class="reg_head zc">
					<image src="/static/login_02.png"></image>
					<view class="load">
						下载APP
					</view>
				</view>
				<!--  #endif -->
				<!-- APP头部 -->
				<!--  #ifdef APP-PLUS  -->
				<view class="title_bar">
					<image @click="back()" class="nav_icon" src="/static/nav_btn_back_white.png" mode="aspectFill"></image>
				</view>
				<image class="head_icon" src="/static/login_15.png" mode="widthFix"></image>
				<view class="loginname">注册</view>
				<!--  #endif -->
			</view>
			<!-- 注册表单 -->
			<form @submit="formSubmit">
				<view class="content">
					<view class="tab">
						<view class="tabbar">
							<view :class="'bom '+(currentTab==1?'active':'')" @click="clickTab" data-current="1">手机</view>
						</view>
						<view class="tabbar">
							<view :class="'bom '+(currentTab==2?'active':'')" @click="clickTab" data-current="2">邮箱</view>
						</view>
					</view>

					<!-- 表单 -->
					<!-- <view class="area" v-for="item in reslist" :key="item.id">
						<view class="icon">
							<image class="icon02" :src="global_url+item.cover" mode="aspectFill"></image>
						</view>
						<block v-if="item.type=='select'">
							<picker :range="item.extra" :value="0">
								<text class="text text01">{{}}</text>
								<image class="area_jt" src="/static/login_04.png" mode="aspectFill"></image>
							</picker>
						</block>
						<block v-else-if="item.name=='code'">
							<input class="text text03" :name="item.name" type="number" :placeholder="item.tip" />
							<view class="getcode" @click="getCode">{{sendText}}</view>
						</block>
						<block v-else-if="item.name=='mobile'">
							<input class="text text02" v-model="mobile" :name="item.name" type="number" :placeholder="item.tip" />
						</block>
						<block v-else-if="item.name=='email'">
							<input class="text text02" v-model="email" :name="item.name" type="text" :placeholder="item.tip" />
						</block>
						<block v-else>
							<input class="text text02" :name="item.name" type="text" :placeholder="item.tip" />
						</block>
					</view> -->

					<picker :range="range" range-key="value" :value="index" v-if="currentTab==1" @change="bindPickerChange">
						<view class="area" v-if="currentTab==1">
							<view class="icon">
								<image class="icon01" src="/static/login_03.png" mode="aspectFill"></image>
							</view>
							<text class="text text01">{{range[index].value}}</text>
							<image class="area_jt" src="/static/login_04.png" mode="aspectFill"></image>
						</view>
					</picker>
					<view class="area" v-if="currentTab==1">
						<view class="icon">
							<image class="icon02" src="/static/login_05.png" mode="aspectFill"></image>
						</view>
						<input class="text text02" v-model="mobile" name="mobile" type="number" placeholder="请输入手机号" placeholder-class="CCC"/>
					</view>
					<view class="area" v-if="currentTab==2">
						<view class="icon">
							<image class="icon02" src="/static/login_16.png" mode="aspectFill"></image>
						</view>
						<input class="text text02" v-model="email" name="email" type="text" placeholder="请输入邮箱号" placeholder-class="CCC"/>
					</view>
					<view class="area">
						<view class="icon">
							<image class="icon03" src="/static/login_06.png" mode="aspectFill"></image>
						</view>
						<input class="text text03" name="code" type="number" placeholder="请输入验证码" placeholder-class="CCC"/>
						<view class="getcode" @click="getCode">{{sendText}}</view>
					</view>
					<view class="area">
						<view class="icon">
							<image class="icon04" src="/static/login_07.png" mode="aspectFill"></image>
						</view>
						<input class="text text02" password="true" name="password" placeholder="请设置您的密码" placeholder-class="CCC"/>
					</view>
					<view class="area">
						<view class="icon">
							<image class="icon05" src="/static/login_08.png" mode="aspectFill"></image>
						</view>
						<input class="text text02" name="invitation" placeholder="请输入您的邀请码" placeholder-class="CCC"/>
					</view>

					<button class="btn" style="margin-top: 90rpx;" form-type="submit">注册</button>
					<view class="read">
						点击注册即代表您同意<text class="blue">《用户协议》</text>
						<text class="right" @click="pwdlogin">密码登录</text>
					</view>
				</view>
			</form>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 1,
				mobile: "",
				isSend: false,
				sendText: '获取验证码',
				currentTime: 60,
				email: "",
				reslist: [],
				range: [{
					key: '86',
					value: '中国 +86'
				} ],
				index: 0,
				global_url: getApp().globalData.global_url
			}
		},
		onLoad() {
			var that = this;
			that.loadData(that)
		},
		methods: {
			loadData(that) {
				var that = this;
				var type = that.$data.currentTab;
				that.api.Getregister({
					type: type
				}, function(res) {
					console.log(res);
					that.$data.reslist = res;
				});
			},
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
					var type = that.currentTab;
					if (type == 1) {
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
								console.log(time);
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
					} else {
						var email = that.$data.email;
						console.log(email);
						if (email == '') {
							that.util.msg('邮箱不能为空');
							complete();
							return;
						}
						if (!getApp().globalData.emailReg.test(email)) {
							that.util.msg('邮箱格式不正确');
							complete();
							return;
						}
						that.api.sendcodeEmail({
							email: email
						}, function() { //发送成功 
							var intervalId = setInterval(function() {
								var time = that.currentTime--;
								console.log(time);
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
					}

				})

			},
			// 提交注册接口
			formSubmit(e) {
				var that = this;
				this.Click(function(complete) {
					var type = that.currentTab;
					var data = {};
					data.type = type;
					if (type == 1) {
						var mobile = e.detail.value.mobile;
						var mo = e.detail.value['mobile'];
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
						data.mobile = mobile;
					} else {
						var email = e.detail.value.email;
						if (email == '' && email == undefined) {
							that.util.msg('邮箱号不能为空');
							complete();
							return;
						}
						if (!getApp().globalData.emailReg.test(email)) {
							that.util.msg('邮箱号格式不正确');
							complete();
							return;
						}
						data.email = email;
					}
					var code = e.detail.value.code;
					if (code == '') {
						that.util.msg('验证码不能为空');
						complete();
						return;
					}
					if (code.length != 6) {
						that.util.msg('验证码长度为6位');
						complete();
						return;
					}
					var password = e.detail.value.password;
					if (password == '') {
						that.util.msg('密码不能为空');
						complete();
						return;
					}
					var invitation = e.detail.value.invitation;

					data.password = password;
					data.code = code;
					data.invitation = invitation;
					console.log(data);
					that.api.Postregister(
						data,
						function(res) {
							uni.redirectTo({
								url: '../login/login'
							})
						}, complete);
				})
			},
			clickTab(e) {
				var that = this;
				console.log(e)
				if (this.$data.currentTab === e.target.dataset.current) {
					that.loadData(that)
					return false;
				} else {
					that.$data.currentTab = e.target.dataset.current
					that.loadData(that)
				}
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			pwdlogin(e) {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			back() {
				uni.navigateBack({

				})
			}

		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	/*  #ifdef  H5  */
	.content {
		top: 146rpx;
	}

	/*  #endif  */
	/*  #ifdef  APP-PLUS  */
	.content {
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

	.loginname {
		top: 207rpx;
	}

	/*  #endif  */


	.tab {
		width: 100%;
		height: 110rpx;
		display: flex;
		flex-direction: row;

	}

	.loginname {
		position: absolute;
		left: 32rpx;
		font-size: 56rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}


	.tabbar {
		width: 50%;
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}

	.bom {
		padding: 16rpx 0;
		border-bottom: 4rpx solid #FFFFFF;
	}

	.active {
		color: #3C89FB;
		border-bottom: 4rpx solid rgba(60, 137, 251, 1);
	}

	.head_bg {
		width: 100%;
	}

	.head_bg .head_icon {
		width: 100%;
	}

	.content {
		position: absolute;
		width: 686rpx;
		margin: 0 32rpx;
		padding-bottom: 70rpx;
		margin-bottom: 40rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(204, 204, 204, 0.2);
		border-radius: 20rpx;
	}


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
		border: none;
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
