<template>
	<view>
		<view class="all">
			<view class="title_bar">
				<image @click="back()" class="nav_icon" src="/static/nav_btn_back_black.png" mode="aspectFill"></image>
			</view>
			<view class="login_bg">
				<view class="loginname">忘记密码</view>
			</view>
			<view class="forget_tabbar">
				<view :class="'tabbar_type '+(currentTab==1?'active':'')" @click="clickTab(1)">
					<view>手机找回</view>
					<view v-if="currentTab == 1" class="forget_tab_xian"></view>
					<view v-if="currentTab == 2" class="forget_tab_xian02"></view>
				</view>
				<view :class="'tabbar_type '+(currentTab == 2?'active':'')" @click="clickTab(2)">
					<view>邮箱找回</view>
					<view v-if="currentTab == 1" class="forget_tab_xian02"></view>
					<view v-if="currentTab==2" class="forget_tab_xian"></view>
				</view>
			</view>
			<view class="phonetype" v-if="currentTab == 1">
				<view class="forgetPwd_input">
					<picker :range="range" range-key="value" :value="index" v-if="currentTab==1" @change="bindPickerChange">
						<view class="internation_text">
							<text>{{range[index].value}}</text>
							<image class="area_jt" src="/static/login_04.png" mode="aspectFill"></image>
						</view>
					</picker>
					<view><input class="inputwidth01" v-model="mobile" type="number" placeholder="请输入您当前绑定的手机号" placeholder-style="color:#CCC"></view>
				</view>
				<view class="update flex">
					<input type="text" v-model="phonecode" placeholder="请输入验证码" placeholder-class="CCC" />
					<view class="getcode1" @click="forgetphone_next">{{sendText}}</view>
				</view>
				<view class="update">
					<input password="true" v-model="password" placeholder="请输入您的新密码" placeholder-class="CCC" />
				</view>
				<view class="update updatebottom">
					<input password="true" v-model="password_again" placeholder="请确认您的新密码" placeholder-class="CCC" />
				</view>
				<view class="forgetpwd_tj" @click="forgetpwd_submit">
					完成
				</view>
			</view>
			<view class="emailtype" v-if="currentTab == 2">
				 <view class="update" v-if="forgetNext">
				 	<input v-model="email" type="text" placeholder="请输入您的邮箱号" placeholder-class="CCC" />
				 </view>
				 <view class="email_cnt" v-if="!forgetNext">
					 <view style="color: #999999;">已向您的邮箱发送了验证码</view>
					 <view style="font-weight: bold;">{{email}}</view>
				 </view>
				 <view class="update" v-if="!forgetNext">
				 	<input v-model="emailcode" type="number" placeholder="请输入您的验证码" placeholder-class="CCC" />
				 </view>
				 <view class="update" v-if="!forgetNext">
				 	<input v-model="emailpwd" password="true" placeholder="请输入您的新密码" placeholder-class="CCC" />
				 </view>
				 <view class="update" v-if="!forgetNext">
				 	<input v-model="emailpwd_again" password="true" placeholder="请确认您的新密码" placeholder-class="CCC" />
				 </view>
				 <view class="forgetpwd_tj forgetpwd_next" @click="forgetemail_next" v-if="forgetNext">
				 	下一步
				 </view>
				 <view class="forgetpwd_tj forgetpwd_next"  v-if="!forgetNext" @click="forget_refrush">
				 	完成
				 </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 1,
				range: [{
					key: '86',
					value: '+86'
				}],
				email:'',
				index: 0,
				forgetNext:true,
				phonecode:'',
				emailcode:'',
				mobile:'',
				password_again:'',
				password:'',
				isSend:false,
				sendText: '获取验证码',
				currentTime: 60,
				emailpwd:'',
				emailpwd_again:''
				
			}
		},
		// #ifndef MP-WEIXIN
		onBackPress() {
			// 监听页面返回，自动关闭小键盘
			plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			back() {
				uni.navigateBack({})
			},
			clickTab(e) {
				var that = this;
				that.currentTab = e;
			},
			//填写手机发送验证码
			forgetphone_next(){
				var that = this;
				that.Click(function(complete) {
					var isSend = that.$data.isSend;
					console.log(isSend);
					if (isSend) {
						complete();
						return;
					}
					var  mobile= that.$data.mobile;
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
					},complete);
				});
				
			},
			//填写邮箱发送验证码
			forgetemail_next(){
				var that = this;
				that.Click(function(complete) {
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
					  that.forgetNext = false;
						
					},complete);
				});
				
			},
			// 手机找回
			forgetpwd_submit(){
			  	var that = this;
			  	var data= {};
				data.type = that.currentTab;
				data.mobile = that.mobile;
				data.password = that.password;
				data.password_again = that.password_again;
			  	data.code = that.phonecode;
			  	that.api.forgetPassword(
			  		data
			  	, function() { //发送成功 
			  	 uni.reLaunch({
			  	 	url:'/pages/login/login'
			  	 })
			  	});
			},
			// 邮箱找回提交
			forget_refrush(){
				var that = this;
				var data= {};
				data.type = that.currentTab;
				data.code = that.emailcode;
				data.email = that.email;
				data.password = that.emailpwd;
				data.password_again = that.emailpwd_again;
				that.api.forgetPassword(
					data
				, function() { //发送成功 
				 uni.reLaunch({
				 	url:'/pages/login/login'
				 })
				 
				});
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.forgetPwd_input {
		width: 690rpx;
		margin: 0 30rpx;
		display: flex;
		flex-direction: row;
		padding: 60rpx 0 26rpx;
		border-bottom: 1rpx solid #CCCCCC;
	}

	.inputwidth01 {
		width: 500rpx;
	}

	.internation_text {
		margin-left: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 32rpx;
	}

	.internation_text text {
		margin-right: 20rpx;
	}

	.all {
		width: 750rpx;
	}

	.loginname {
		font-size: 56rpx;
		font-family: PingFang SC;
		font-weight: bold;
		margin-left: 30rpx;

	}

	.forgetpwd_tj {
		width: 690rpx;
		height: 90rpx;
		background-color: #3686FF;
		border-radius: 10rpx;
		margin: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		color: #FFFFFF;
	}
.forgetpwd_next{
	margin-top: 70rpx;
}
	input {
		margin-left: 30rpx;
	}

	.wubai {
		width: 500rpx;
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

	.martop {
		width: 100%;

	}

	/*  #ifdef  APP-PLUS  */
	.martop {
		padding-top: 172rpx;
	}

	/*  #endif  */
	
	.martop {
		margin-top: 84rpx;
	}

	.title_bar {
		margin-top: 88rpx;
		background-color: rgba(255, 255, 255, 1) !important;
		z-index: 9999;
		line-height: 88rpx;
	}

	.title_bar .nav_icon {
		width: 16rpx;
		height: 30rpx;
		margin-left: 32rpx;
	}

	.forget_tabbar {
		width: 100%;
		display: flex;
		flex-direction: row;
		font-size: 30rpx;
		margin-top: 70rpx;
	}

	.forget_tabbar .tabbar_type {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.forget_tab_xian {
		width: 68rpx;
		height: 4rpx;
		background: rgba(54, 134, 255, 1);
		border-radius: 2rpx;
		margin-top: 26rpx;
	}

	.forget_tab_xian02 {
		width: 68rpx;
		height: 4rpx;
		background: #FFFFFF;
		border-radius: 2rpx;
		margin-top: 26rpx;
	}

	.active {
		font-weight: bold;
	}
 .email_cnt{
	 margin-top: 40rpx;
	 display: flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	 font-size: 32rpx;
 }
	
</style>
