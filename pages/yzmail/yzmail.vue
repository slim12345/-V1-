<template>
	<view>
		
		<view class="yzmail">
		    <text>我们已向您的邮箱</text>
			<text style="font-weight:bold;">{{email}}</text>
			<text>发送了一封邮件，请您注意接收邮件</text>
		</view>
		<view class="update  updatebottom">
			<input type="number" v-model="yzm" placeholder="请输入验证码" placeholder-class="CCC"/>
		</view>
		 <view class="btn" @click="send">确认</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				yzm:''
			}
		},
		onLoad(option) {
			var email = option.email;
			this.email = email;
		},
		// #ifndef MP-WEIXIN
		onBackPress(){
		// 监听页面返回，自动关闭小键盘
		plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			send(){
				var that = this;
				var data = {};
				data.type = 'email';
				data.val = that.email;
				data.code = that.yzm;
				that.api.bindedit(
					data,
					function(res) {
						uni.removeStorageSync('token');
						uni.setStorageSync('token',res)
						uni.redirectTo({
							url:'/pages/mydata/mydata'
						})
					});
			}
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
