<template>
	<view>
		<view class="all">
			<view class="notice_item" v-for="item in list" :key="item.id" @click="sysdetail(item.id,item.title)">
				<view class="noticeimg">
					<image :src="item.coverPath"></image>
				</view>
				<view class="content"><text class="title yichu">{{item.title}}</text><text class="time">{{item.create_time}}</text></view>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.loadData();
		},
		onPullDownRefresh() {
			this.loadData();
		},
		methods: {
			// 获取文章类型
			loadData() {
				var that = this;
				var cate_id = 2;
				that.api.getbooklist(
				{cate_id:cate_id},
					function(res) {
						console.log(res)
						for (var i = 0; i < res.length; i++) {
							res[i].create_time = that.util.fomateDate(res[i].create_time)
						}
						that.list = res;
					});
			},
			// 跳转到详情
			sysdetail(id,title){
				this.To('../essay/essay?id=' + id +'&title=' +title);
			}
		},
		
			
	}
</script>

<style>
	.all {
		width: 100%;
		background: #FFFFFF;
	}

	.notice_item {
		width: 690rpx;
		height: 140rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid rgba(238, 238, 238, 1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.noticeimg {
		width: 90rpx;
		height: 90rpx;
		border-radius: 10rpx;
		margin: 25rpx 0;
		overflow: hidden;
	}

	.nav-jt {
		width: 12rpx;
		height: 24rpx;
		margin-top: 58rpx;
	}

	.noticeimg image {
		width: 100%;
		height: 100%;
	}

	.content {
		width: 548rpx;
		display: flex;
		flex-direction: column;
		margin-top: 37rpx;
	}

	.title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-top: 4rpx;
	}
</style>
