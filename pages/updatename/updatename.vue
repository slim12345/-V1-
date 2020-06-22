<template>
	<view>
		<view class="update updatetop updatebottom">
			<input v-model="nickname" type="text" placeholder-style="color:#CCCCCC" placeholder="请输入昵称" />
		</view>
		<view class="btn" @click="save">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: ""
			}
		},
		onLoad(options) {
			var name = options.name;
			this.nickname = name;
		},
		// #ifndef MP-WEIXIN
		onBackPress(){
		// 监听页面返回，自动关闭小键盘
		plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			save() {
				var that = this;
				var nicknameVal = that.$data.nickname;
				var data = {};
				data.fieldName = 'nickname';
				data.val = nicknameVal;
				if (nicknameVal) {
					that.api.updatedata(data, function(res) {
						uni.navigateBack({})
					});

				} else {
					that.util.msg('修改的昵称不能为空');
				}

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
	}
</style>
