<template>
	<view>
		<!-- 邀请码 -->
		<view class="invtitle bordertop">
			<view class="title">
				<text>邀请码</text>
			</view>
			<view class="link">
				<view><text class="yqm">{{invite_code}}</text></view>
				<view class="linkbtn" @click="fuzhi(invite_code)">复制邀请码</view>
			</view>
		</view>
		<!-- 邀请链接 -->
		<view class="invtitle">
			<view class="title">
				<text>专属邀请链接</text>
			</view>
			<view class="link">
				<view class="yqm yichu"><text>{{url}}</text></view>
				<view class="linkbtn" @click="fuzhi(url)">复制链接</view>
			</view>
		</view>
		<!-- 邀请二维码 -->
		<view class="invtitle">
			<view class="title">
				<text>专属邀请二维码</text>
			</view>
			<view class="ewmimg">
				<image class="img1" :src="inviteImg" mode="widthFix"></image>
				<!-- <view class="share">
				<view class="sharetxt">
						<text class="sharename">@Share</text>
						<text class="sharecnt">向你分享了一张图片</text>
					</view>
					<image :src="inviteImg"></image>
				</view> -->
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="save" @click="saveimg">
			<image src="/static/load.png"></image>
			<text>保存图片到本地</text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		data() {
			return {
				inviteImg: '',
				url: '',
				invite_code: ''
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			loadData() {
				var that = this;
				that.api.getInviteFriends(
					function(res) {
						that.inviteImg = res.invite_posterbase64.replace(/[\r\n]/g, '');
						that.invite_code = res.invite_code;
						that.url = res.url;
					});
			},

			fuzhi(val) {
				var that = this;
				console.log(val);
				// #ifndef H5
				uni.setClipboardData({
					data: val,
					success() {
						that.util.msg('复制成功');
					}
				})
				// #endif
				// #ifdef H5
				let content = val ;// 复制内容，必须字符串，数字需要转换为字符串
				const result = h5Copy(content)
				if (result === false) {
					that.util.msg('复制失败');
				} else {
					that.util.msg('复制成功');
				}
				// #endif
			},
			saveimg(e) {
				uni.downloadFile({
					url: 'http://b.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbb3586c0168224f4a20a4dd7e.jpg', //图片地址
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功,请到相册中查看",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败",
										icon: "none"
									});
								}
							});
						}
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	/* 邀请码 */
	.invtitle {
		width: 100%;
		margin-bottom: 60rpx;
	}

	.bordertop {
		border-top: 2rpx solid rgba(238, 238, 238, 1);
	}

	.title {
		width: 690rpx;
		height: 100%;
		margin: 40rpx 30rpx 30rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.link {
		width: 690rpx;
		height: 90rpx;
		margin: 0 30rpx;
		background: rgba(250, 250, 250, 1);
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.yqm {
		width: 450rpx;
		font-size: 26rpx;
		margin-left: 20rpx;
	}

	.linkbtn {
		width: 220rpx;
		height: 90rpx;
		background: rgba(54, 134, 255, 1);
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 分享内容图 */
	.ewmimg {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.img1 {
		width: 548rpx;
	}

	/* 分享信息 */
	.share {
		width: 548rpx;
		height: 130rpx;
		background: rgba(255, 255, 255, 1);
		border: 2rpx solid rgba(204, 204, 204, 1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.sharetxt {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 30rpx;
	}

	.sharename {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.sharecnt {
		margin-top: 10rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.share image {
		width: 94rpx;
		height: 94rpx;
		margin-right: 30rpx;
	}

	/* 保存图片 */
	.save {
		width: 240rpx;
		margin: 0 auto;
		padding: 0 0 40rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(54, 134, 255, 1);
		text-align: center;
	}

	.save image {
		width: 22rpx;
		height: 24rpx;
		margin-right: 10rpx;
	}
</style>
