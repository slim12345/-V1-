<template>
	<view>
		<view class="update updatetop updatebottom">
			<input type="text" v-model="email" name="email" placeholder="请输入邮箱" placeholder-class="CCC" />
		</view>
		<view class="btn" @click="send">绑定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: ''
			}
		},
		onLoad(option) {
			var email = option.email;
			if (option.email != 'null' && option.email != undefined && option.email != '') {
				uni.setNavigationBarTitle({
					title: '修改绑定邮箱'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '绑定邮箱'
				})
			}
		},
		// #ifndef MP-WEIXIN
		onBackPress(){
		// 监听页面返回，自动关闭小键盘
		plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			send(e) {
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
						uni.navigateTo({
							url: '../yzmail/yzmail?email=' + email
						})
					},complete);
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
		width: 100%;
		padding-left: 30rpx;
	}
</style>
