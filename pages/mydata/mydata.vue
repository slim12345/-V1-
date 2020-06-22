<template>
	<view>
		<!-- 修改头像 -->
		<view class="mytitle">
			<view class="myimg" @click="photo">
				<image :src="userimg"></image>
			</view>
			<text class="mytitle_text" @click="photo">点击更换头像</text>
		</view>
		<view class="all">
			<!-- 修改昵称 -->
			<view class="mylist" @click="updatename">
				<view class="listcnt">
					<text class="textstyle">昵称</text>
					<view class="cnt">
						<text class="textstyle black">{{nickname}}</text>
						<image class="nav-jt" src="/static/icon_more.png"></image>
					</view>
				</view>
			</view>
			<!-- 修改性别 -->
			<view class="mylist">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="listcnt">
						<text class="textstyle">性别</text>
						<view class="cnt">
							<text class="textstyle black">{{array[index]}}</text>
							<image class="nav-jt" src="/static/icon_more.png"></image>
						</view>

					</view>
				</picker>
			</view>
			<!-- 修改出生年月 -->
			<view class="mylist">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="listcnt">
						<text class="textstyle">出生年月</text>
						<view class="cnt">
							<text class="textstyle black">{{date}}</text>
							<image class="nav-jt" src="/static/icon_more.png"></image>
						</view>
					</view>
				</picker>
			</view>
		</view>
		<view class="all" style="margin: 20rpx 0 40rpx;">
			<view class="mylist1">
				<view class="listcnt">
					<text class="textstyle01">账号管理</text>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="mylist">
				<view class="listcnt">
					<text class="textstyle">微信</text>
					<view class="cnt">
						<text class="textstyle gray">未绑定</text>
						<image class="nav-jt" src="/static/icon_more.png"></image>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- 修改手机 -->
			<view class="mylist">
				<view class="listcnt" @click="updatephone">
					<text class="textstyle">手机</text>
					<view class="cnt">
						<text v-if="isdisplayMobile" class="textstyle black">{{mobile}}</text>
						<text v-else class="textstyle gray">未绑定</text>
						<image class="nav-jt" src="/static/icon_more.png"></image>
					</view>
				</view>
			</view>
			<!-- 更改邮箱 -->
			<view class="mylist">
				<view class="listcnt" @click="updatemail">
					<text class="textstyle">邮箱</text>
					<view class="cnt">
						<text v-if="isdisplayEmail" class="textstyle black">{{email}}</text>
						<text v-else class="textstyle gray">未绑定</text>
						<image class="nav-jt" src="/static/icon_more.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="data_bottom" @click="exitlogin" v-if="isexit">
			<text>退出登录</text>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: ['未知', '男', '女'],
				index: 0,
				date: currentDate,
				userimg: '/static/user_14.png',
				nickname: '哈哈哈',
				mobile: 0,
				email: '',
				isexit: false,
				isload: false,
				isdisplayMobile: false,
				isdisplayEmail: false
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			// #ifdef H5
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/micromessenger/i) != 'micromessenger') {
				this.isexit = true;
			}
			// #endif
			// #ifdef APP-PLUS
			this.isexit = true;
			// #endif
			var isload = this.isload;
			if (!isload) {
				this.loadData();
			}

		},
		onShow() {
			var isload = this.isload;
			if (isload) {
				this.loadData();
			}
		},
		// #ifndef MP-WEIXIN
		onBackPress() {
			// 监听页面返回，自动关闭小键盘
			plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			photo(e) {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						if (tempFilePaths && tempFilePaths.length > 0) {
							that.api.uploadimg(tempFilePaths[0], function(res) {
								console.log(res);
								var url = res.url;
								var path = res.path;
								var id = res.id;
								var data = {};
								data.fieldName = 'cover';
								data.val = id;
								that.api.updatedata(data, function() {
									that.userimg = url;
								});
							})
						} else {
							that.util.msg('请选择头像');
						}
					},
					fail: function() {
						that.util.msg('您取消了上传头像');
					}
				});
			},
			exitlogin() {
				var that = this;
				uni.showModal({
					content: '请确定是否退出登录',
					success: function(res) {
						if (res.confirm) {
							that.api.coderesult(-1, '退出成功');
						}
					}
				});
			},
			updatename(e) {
				this.To('../updatename/updatename?name=' + this.nickname);
			},
			updatephone(e) {
				var mobile = this.mobile;
				console.log(mobile);
				this.To('../updatephone/updatephone?mobile=' +mobile);
				
				// uni.navigateTo({
				// 	url: '?mobile=' + mobile
				// })
			},
			updatemail(e) {
				var email = this.email;
				this.To('../updatemail/updatemail?email='+email);
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				var that = this;
				var data = {};
				data.fieldName = 'sex';
				data.val = e.target.value;
				that.api.updatedata(data, function() {
					that.index = e.target.value;
				});

			},
			bindDateChange: function(e) {
				// this.date = e.target.value;
				// console.log(e.target.value);
				var that = this;
				var data = {};
				var chooseTime = (new Date(e.target.value)).getTime();
				chooseTime = Math.round(chooseTime / 1000);
				console.log(chooseTime)
				data.fieldName = 'birth';
				data.val = chooseTime;
				that.api.updatedata(data, function() {
					that.date = e.target.value;
				});
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;

			},
			loadData() {
				var that = this;
				that.api.my(
					function(res) {
						console.log(res)
						if (res.email != null && res.email != '' && res.email != undefined) {
							that.isdisplayEmail = true
						}
						if (res.mobile != null && res.mobile != '' && res.mobile != undefined) {
							that.isdisplayMobile = true
						}
						that.userimg = res.coverPath;
						that.email = res.email;
						that.index = res.sex;
						that.mobile = res.mobile;
						that.nickname = res.nickname;
						that.userimg = res.coverPath;
						var userbirth = res.birth;
						var timer = that.util.fomateYMD(userbirth);
						console.log(timer)
						// var userbirth = res.birth * 1000;
						// let date = new Date(userbirth);
						// //时间戳为10位需*1000，时间戳为13位的话不需乘1000
						// var Y = date.getFullYear() + '-';
						// var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
						// var D = '0' + date.getDate();
						// var timer = Y + M + D;
						that.date = timer;
					},
					function() {
						that.isload = true;
					});
			}
		}
	}
</script>

<style>
	page {
		background: #FAFAFA;
	}

	.all {
		width: 100%;
		background: #FFFFFF;
	}

	.mytitle {
		width: 750rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 60rpx 0;
	}

	.myimg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.myimg image {
		width: 100%;
		height: 100%;
	}

	.mytitle_text {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-top: 19rpx;
	}

	.mylist {
		width: 690rpx;
		height: 100rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid rgba(238, 238, 238, 1);
	}

	.mylist1 {
		width: 690rpx;
		height: 100rpx;
		margin: 0 30rpx;
	}

	.listcnt {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.textstyle {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		margin-right: 16rpx;
	}

	.black {
		color: rgba(51, 51, 51, 1);
	}

	.gray {
		color: rgba(153, 153, 153, 1);
	}

	.textstyle01 {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.data_bottom {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 100rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
