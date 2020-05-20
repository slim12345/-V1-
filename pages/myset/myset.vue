<template>
	<view>
		<view class="all">
			<view class="setlist"  v-for="item in list" :key="item.id" @click="userxx(item.id,item.title)">
				<text>{{item.title}}</text>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view>
			<!-- <view class="setlist" @click="abount">
				<text>关于我们</text>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
              list:[]
			}
		},
		onLoad(){
			this.loadData();
		},
		methods: {
			// 获取文章类型
			loadData(){
			var that = this;
			var cate_id = 1;
			that.api.getbooklist(
			{
				cate_id:cate_id
			},
				function(res) {
					console.log(res)
					that.list = res;
				});
			},
			// 跳转文章
			userxx(id,title) {
				this.To('../essay/essay?id=' + id +'&title=' +title);
			},
		   // 联系我们
			lianxi(e) {
				uni.makePhoneCall({
				    phoneNumber: '18909090808' //仅为示例
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
		margin-top: 20rpx;
	}

	.setlist {
		width: 690rpx;
		height: 100rpx;
		margin: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		border-bottom: 2rpx solid rgba(238, 238, 238, 1);
	}
</style>
