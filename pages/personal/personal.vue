<template>
	<view>
		<!-- 我的 -->
		<!-- 头像-开始 -->
		<view class="user_bg">
			<image src="/static/user_01.png" @click="mydata"></image>
			<view class="user_img" @click="mydata">
				<image :src=" coverPath" mode="aspectFill">
				</image>
			</view>
			<view class="row" @click="mydata">
				<view class="user_name">
					{{nickname}}
				</view>
				<view class="level_img" @click="mydata">
					<image src="/static/user_03.png"></image>
				</view>
				<view class="level" @click="mydata">
					<text>Lv{{member_level}}</text>
				</view>
			</view>
			<view class="user_jt" @click="mydata">
				<image src="/static/user_04.png"></image>
			</view>
			<view class="user_id" v-if="id">
				ID：{{id}}
			</view>
			<view class="user_msg">
				<view class="msg_item" @click="purse">
					<text class="money">{{money}}</text>
					<text class="unit">余额(元)</text>
				</view>
				<view class="msg_item">
					<text class="money">{{countInvite}}</text>
					<text class="unit">邀请人数</text>
				</view>
			</view>
		</view>
		<!-- 头像-结束 -->
		<!-- 订单 -->
		<view class="order">
			<view class="order_t">
				<text>订单中心</text>
			</view>
			<view class="order_type">
				<view class="type_item">
					<image src="/static/user_05.png"></image>
					<text>全部订单</text>
				</view>
				<view class="type_item">
					<image src="/static/user_06.png"></image>
					<text>可使用</text>
				</view>
				<view class="type_item">
					<image src="/static/user_07.png"></image>
					<text>已使用</text>
				</view>
				<view class="type_item">
					<image src="/static/user_08.png"></image>
					<text>退款订单</text>
				</view>
			</view>
		</view>
		<!-- 功能列表 -->
		<view class="nav">
			<view class="nav-item borderbom" @click="purse">
				<image class="nav-image" src="/static/user_09.png"></image>
				<text>我的钱包</text>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view>
			<view class="nav-item borderbom" @click="myset">
				<image class="nav-image" src="/static/user_10.png"></image>
				<text>系统设置</text>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view>
			<view class="nav-item borderbom" @click="invite">
				<image class="nav-image" src="/static/user_11.png"></image>
				<text>邀请中心</text>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view>
			<view class="nav-item borderbom" @click="notice">
				<image class="nav-image" src="/static/user_12.png"></image>
				<text>系统通知</text>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view>
			<view class="nav-item" @click="about">
				<image class="nav-image" src="/static/user_15.png"></image>
				<text>联系我们</text>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coverPath: '', //头像
				id: 0, //id
				member_level: 0, //等级
				mobile: 0,
				nickname: '登录/注册',
				money: '--',
				countInvite: '--',
				isload: false
			}
		},
		onLoad() {
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
		onPullDownRefresh() {
			this.loadData();
		},
		// #ifndef MP-WEIXIN
		onBackPress(){
		// 监听页面返回，自动关闭小键盘
		plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			// 跳转我的钱包
			purse(e) {
				this.To('../mypurse/mypurse');
			},
			// 跳转系统通知
			notice(e) {
				this.To('../sysnotice/sysnotice');

			},
			// 跳转我的资料
			mydata(e) {
				this.To('../mydata/mydata');

			},
			// 邀请好友跳转
			invite(e) {
				this.To('../invitecenter/invitecenter');
			},
			// 跳转邀请好友
			invfriend(e) {
				this.To('../invitefriend/invitefriend');

			},
			// 跳转设置
			myset(e) {
				this.To('../myset/myset');
			},
			// 跳转关于我们
			about(e) {
				var that = this;
				var cate_id = 1;
				that.api.getbooklist(
				{
					cate_id:cate_id
				},
					function(res) {
						console.log(res)
						that.To('../essay/essay?title='+res[0].title +'&id='+res[0].id)	
					});
			},
			loadData() {
				var that = this;
				that.api.my(
					function(res) {
						console.log(res)
						that.coverPath = res.coverPath;
						that.id = res.id;
						that.mobile = res.mobile;
						that.nickname = res.nickname;
						that.countInvite = res.countInvite;
						that.money = res.money;
						that.member_level = res.member_level;
					},
					function() {
						that.isload = true;
						uni.stopPullDownRefresh();
					},true);

			}
		}
	}
</script>

<style>
	page {
		background: #FAFAFA;
	}

	/* 头部样式 */
	.user_img {
		position: relative;
	}

	.user_bg image {
		width: 100%;
		height: 410rpx;
	}

	.user_img {
		position: absolute;
		top: 101rpx;
		left: 30rpx;
		width: 120rpx;
		height: 120rpx;
		background: rgba(128, 128, 128, 1);
		border: 2rpx solid rgba(229, 240, 254, 1);
		border-radius: 50%;
		overflow: hidden;
	}

	.user_img image {
		width: 100%;
		height: 100%;
	}

	.row {
		width: 576rpx;
		position: absolute;
		top: 110rpx;
		left: 174rpx;
		display: flex;
		flex-direction: row;
	}

	.user_name {
		font-size: 40rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	.level {
		margin-top: 8rpx;
		margin-left: -6rpx;
		height: 34rpx;
		background: rgba(51, 51, 51, 0.4);
		border-radius: 0rpx 17rpx 17rpx 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0rpx 18rpx 0rpx 0;
	}

	.level_img image {
		width: 29rpx;
		height: 42rpx;
		margin-top: 6rpx;
		margin-left: 11rpx;
	}

	.level text {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		margin-left: 18rpx;
	}

	.user_jt image {
		width: 13rpx;
		height: 24rpx;
		position: absolute;
		top: 149rpx;
		right: 30rpx;
	}

	.user_id {
		position: absolute;
		top: 174rpx;
		left: 174rpx;
		height: 19rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}

	.user_msg {
		position: absolute;
		top: 268rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.msg_item {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.money {
		font-size: 42rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	.unit {
		margin-top: 14rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);

	}

	/* 订单中心 */
	.order {
		width: 750rpx;
		background: rgba(255, 255, 255, 1);
		margin: 20rpx 0;
	}

	.order_t {
		width: 690rpx;
		margin: 0 30rpx;
		padding: 26rpx 0;
		border-bottom: 2rpx solid rgba(230, 230, 230, 1);
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.order_type {
		width: 690rpx;
		margin: 0 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	/* 功能列表 */
	.type_item {
		width: 25%;
		padding: 40rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.imageleft {
		margin-left: 30rpx;
	}

	.imageright {
		margin-right: 30rpx;
	}

	.type_item image {
		width: 42rpx;
		height: 42rpx;
		margin-bottom: 18rpx;
	}

	.nav {
		width: 100%;
		margin-bottom: 40rpx;
		background: #FFFFFF;
	}

	.nav-item {
		width: 690rpx;
		height: 120rpx;
		margin: 0 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.borderbom {
		border-bottom: 2rpx solid #EEEEEE;
	}

	.nav-item text {
		width: 579rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.nav-image {
		width: 38rpx;
		height: 38rpx;
	}
</style>
