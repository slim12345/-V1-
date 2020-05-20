<template>
	<view>
		
		<view class="yzmail">
		    <text>我们已向您的邮箱</text>
			<text style="font-weight:bold;">458645213@qq.com </text>
			<text>发送了一封邮件，请您注意接收邮件</text>
		</view>
		 <view class="btn" @click="send">确认</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	  background: #FFFFFF;
  }
  input{
	  padding-left: 30rpx;
  }
  .yzmail{
	  width: 690rpx;
	  height: 100rpx;
	  margin: 0 30rpx;
	  display: flex;
	  flex-direction: column;
	  padding-top: 212rpx;
	  padding-bottom: 100rpx;
	  font-size:32rpx;
	  font-family:PingFang SC;
	  font-weight:400;
	  color:rgba(51,51,51,1);
	  }
	  .yzmail text{
		  line-height: 50rpx;
	  }
</style>
