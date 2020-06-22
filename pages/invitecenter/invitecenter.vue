<template>
	<view>
		<!-- 头部图 -->
		<swiper class="invite_nav">
			<swiper-item v-for="item in banner" :key="item.id" @click="swiperClick(item.link,item.title)">
				<image :src="item.imgPath"></image>
			</swiper-item>
		</swiper>
		<!-- 邀请总数据 -->
		<view class="all" style="margin-bottom: 40rpx;">
			<view class="invite_data">
				<view class="yqname">
					<text>邀请数据</text>
					<image @click="essay" src="/static/yqzx_02.png"></image>
				</view>
				<view class="allyq">
					<text class="yqpeople">总邀请人数:{{subordinate_count}}</text>
					<text>总获奖励:{{total_commission}}</text>
				</view>
			</view>
			<!-- 邀请列表 -->
			<view class="invitelist" v-for="item in sublist" :key="item.id">
				<view class="inviteimg">
					<image :src="item.cover"></image>
					<view class="invitename yichu">
						{{item.nickname}}
					</view>
				</view>
				<view class="reward">
					<text class="reward_money">￥{{item.commission}}</text>
					<text class="reward_time">{{item.create_time}}</text>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="tixian_bottom" @click="invitepeople">
			<view>点击邀请好友</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				page: 1,
				pagesize: 10,
				sublist: [],
				subordinate_count: 0,
				total_commission: 0,

			}
		},
		onLoad() {
			this.loadData();
			this.loadData1();
			
		},
		onPullDownRefresh() {
			this.loadData();
			this.loadData1();
		},
		onReachBottom() {
			var index = this.page + 1;
			this.page = index;
			this.loadData1();
		},
		methods: {
			// 轮播跳转
			swiperClick(url, title) {
				url = 'https://www.baidu.com';
				this.To('/pages/web_url/web_url?url=' + encodeURIComponent(url) + '&title=' + title);
			},
			invitepeople(){
				this.To('/pages/invitefriend/invitefriend');
			},
			essay(){
				var that = this;
				var cate_id = 4;
				that.api.getbooklist(
				{
					cate_id:cate_id
				},
					function(res) {
						console.log(res)
						that.To('../essay/essay?title='+res[0].title +'&id='+res[0].id)	
					});
			},
			// 邀请轮播
			loadData() {
				var that = this;
				// var type = 0;
				// // #ifdef APP-PLUS
				// type = 0;
				// // #endif
				// // #ifdef H5
				// var ua = window.navigator.userAgent.toLowerCase();
				// if (ua.match(/micromessenger/i) == 'micromessenger') {
				// 	type = 1;
				// } else {
				// 	type = 3;
				// }
				// // #endif
				// // #ifdef MP-WEIXIN
				// type = 2;
				// // #endif
				var cate_id = 2;
				that.api.index({
						cate_id: cate_id
					},
					function(res) {
						console.log(res)
						that.banner = res;
					});
			},
			//获取邀请列表
			loadData1() {
				var that = this;
				that.api.getMyInvitationList({
						page: that.page,
						pagesize: that.pagesize
					},
					function(res) {
						console.log(res)
						that.subordinate_count = res.data.subordinate_count;
						that.total_commission = res.data.total_commission;
						that.sublist = res.data.subordinate_list;
					});
			},
			
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	/* 头部邀请图 */
	.invite_nav {
		width: 750rpx;
		height: 300rpx;
	}

	.invite_nav image {
		width: 100%;
		height: 100%;
	}

	.all {
		width: 100%;
	}

	/* 邀请总计 */
	.invite_data {
		width: 690rpx;
		height: 128rpx;
		margin-left: 30rpx;
		border-bottom: 2rpx solid rgba(242, 242, 242, 1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 30rpx;
	}

	.yqname {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		position: relative;
	}

	.yqname image {
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		top: 16rpx;
		left: 146rpx;
	}

	.allyq {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.yqpeople {
		margin-right: 20rpx;
	}

	/* 邀请列表 */
	.invitelist {
		width: 690rpx;
		height: 118rpx;
		margin-left: 30rpx;
		border-bottom: 2rpx solid rgba(242, 242, 242, 1);
		display: flex;
		justify-content: space-between;
		padding-right: 30rpx;
	}

	.inviteimg {
		display: flex;
		align-items: center;
	}

	.inviteimg image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.invitename {
		width: 350rpx;
		margin-left: 20rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(49, 49, 51, 1);
	}

	.reward {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
	}

	.reward_money {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(247, 77, 77, 1);
	}

	.reward_time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}
</style>
