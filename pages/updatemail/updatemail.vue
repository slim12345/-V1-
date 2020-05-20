<template>
	<view>
			 <view class="update updatetop updatebottom">
			 			   <input type="text" placeholder="请输入邮箱" placeholder-class="CCC"/>
			 </view>
			  <view class="btn" @click="send">绑定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			send(e){
				uni.navigateTo({
					url:'../yzmail/yzmail'
				})
			}
		}
	}
</script>

<style>
  page{
	  background: #FFFFFF;
  }
  input{
	  width: 100%;
	  padding-left: 30rpx;
  }
  
</style>
