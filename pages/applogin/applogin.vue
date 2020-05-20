<template>
	<view>
		<view class="login_bg">
			<!-- logo -->
			<view class="logo">
				<image src="/static/login_10.png"></image>
			</view>
			<!-- 登录注册按钮 -->
				<view class="login_btn size" @click="login">登录</view>
				<view class="zc_btn size" @click="zc">注册</view>
			<!-- 微信 -->
			<view class="login_wx" @click="wxlogin()">
				<image src="/static/login_11.png"></image>
			</view>
			<!-- 同意协议 -->
			<view class="bottom_text">
				<view :class="'ok '+(isSelect ? 'ok_color1' : 'ok_color')" @click="select">
					<image v-if="isSelect" src="/static/login_13.png"></image>
					<image v-else src="/static/login_14.png"></image>
					<text>同意</text>
				</view>
				<view><text>《用户协议》</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSelect: true
			}
		},
		methods: {
			login() {
				var isSelect = this.isSelect;
				if(isSelect){
					uni.navigateTo({
						url: '../login/login'
					})
				}else{
					this.util.msg('请先同意《用户协议》')
				}
				
			},
			zc() {
				var isSelect = this.isSelect;
				if(isSelect){
					uni.navigateTo({
						url: '../register/register'
					})
				}else{
					this.util.msg('请先同意《用户协议》')
				}
			},
			select() {
				this.$data.isSelect = !this.$data.isSelect;
			},
			wxlogin() {
				var that = this;
				var isSelect = that.isSelect;
				if(isSelect){
					that.api.wxapplogin(function(res) {
						if(res.isReg){
							that.switchtab('/pages/index/index');
						}else{
							that.util.msg('请先绑定用户');
							that.To('/pages/userbind/userbind');
						}
						
					});
				}else{
					that.util.msg('请先同意《用户协议》')
				}
			
				
			}
		}
	}
</script>

<style>
	/* 背景颜色 */
	page {
		margin: 0;
		padding: 0;
		background: linear-gradient(-30deg, rgba(54, 134, 255, 1), rgba(93, 158, 255, 1));
	}

	/* logo图 */
	.login_bg {
		width: 100%;

	}

	.logo image {
		position: absolute;
		top: 200rpx;
		left: 242rpx;
		width: 266rpx;
		height: 169rpx;
	}

	.size {
		font-size: 32rpx;
	}

	/* 登录注册按钮 */
	.btn {
		width: 100%;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
	}

	.login_btn {
		position: absolute;
		left: 32rpx;
		bottom: 414rpx;
		width: 686rpx;
		height: 100rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #3686FF;
	}

	.zc_btn {
		position: absolute;
		left: 32rpx;
		bottom: 284rpx;
		width: 686rpx;
		height: 100rpx;
		background: rgba(54, 134, 255, 1);
		border: 2rpx solid rgba(255, 255, 255, 1);
		border-radius: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}

	/* 微信登录 */
	.login_wx {
		position: absolute;
		bottom: 124rpx;
		left: 340rpx;
	}

	.login_wx image {
		width: 70rpx;
		height: 70rpx;
	}

	/* 同意,阅读 */
	.bottom_text {
		position: absolute;
		bottom: 60rpx;
		left: 258rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: row;
		align-items: center;
		line-height: 50rpx;
	}

	.bottom_text image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 12rpx;
	}

	.ok {
		display: flex;
		align-items: center;
	}

	.ok_color1 {
		color: rgba(255, 255, 255, 1);
	}

	.ok_color {
		color: rgba(255, 255, 255, 0.4);
	}
</style>
