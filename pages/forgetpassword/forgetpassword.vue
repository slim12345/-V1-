<template>
	<view>
		<!--  #ifdef  H5 -->
		<view class="all">
		<view class="reg_head wjmm">
			<image src="/static/login_02.png"></image>
			<view class="load">
				下载APP
			</view>
		</view>
		<!--  #endif -->
		<!--  #ifdef  APP-PLUS -->
		<view class="title_bar">
			<image @click="back()" class="nav_icon" src="/static/nav_btn_back_black.png" mode="aspectFill"></image>
		</view>
		<view class="login_bg">
			<view class="loginname">忘记密码</view>
		</view>
		<!--  #endif -->
		<view class="martop">
			<view class="update">
				<input class="wubai" type="text" placeholder="请输入您当前绑定的手机号" placeholder-class="CCC"/>
			</view>
			<view class="update flex">
				<input type="text" placeholder="请输入验证码" placeholder-class="CCC"/>
				<view class="getcode1">获取验证码</view>
			</view>
			<view class="update">
				<input password="true" placeholder="请输入您的新密码" placeholder-class="CCC"/>
			</view>
			<view class="update updatebottom">
				<input password="true" placeholder="请确认您的新密码" placeholder-class="CCC"/>
			</view>

		</view>
		<view class="tixian_bottom">
			<view @click="tj">提交</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
      back(){s
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
    .all{
		width: 100%;
		margin: 0;
		padding: 0;
	}
	.login_bg {
		width: 100%;
		position: relative;
		top: 30rpx;
		left: 34rpx;
		z-index: 9999;
	}

	.loginname {
		font-size: 56rpx;
		font-family: PingFang SC;
		font-weight: bold;

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

	/*  #ifdef  H5  */
	.martop {
		padding-top: 172rpx;
	}

	/*  #endif  */
	/*  #ifdef  APP-PLUS  */
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

	/*  #endif  */
</style>
