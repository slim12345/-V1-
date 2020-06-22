<template>
	<view>
		    <view class="pay_result">
				  <image src="/static/icon_failure.png" mode="widthFix"></image>
				  <text class="state">支付失败</text>
				  <text class="remind">失败了~请重新支付</text>
			</view>
			<navigator url="/pages/index/index" open-type="switchTab" class="pay_btn">返回首页</navigator>
			<!-- <view class="pay_btn" @click="goindex">返回首页</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			 goindex(e){
				 console.log(e)
				 uni.redirectTo({
				 	url:'pages/index/index'
				 })
			 }
		}
	}
</script>

<style>
    page{
		background: #FFFFFF;
	}
	.pay_result{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.pay_result image{
		width:128rpx;
		height:128rpx;
		margin-top: 70rpx;
	}
	.state{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-top: 30rpx;
	}
	.remind{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		margin-top: 20rpx;
	}
	.pay_btn{
		width:510rpx;
		margin: 116rpx auto 0;
		height:90rpx;
		background:rgba(54,134,255,1);
		border-radius:45rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
