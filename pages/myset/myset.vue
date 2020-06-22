<template>
	<view>
		<view class="all">
			<view class="setlist" @click="about">
				<text>关于我们</text>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view>
			<view class="setlist" @click="user_xy">
				<text>用户协议</text>
				<image class="nav-jt" src="/static/icon_more.png"></image>
			</view>
		</view>
			<view class="bq_bottom">
				<view><text>Copyright©2020</text></view>
				<view><text style="margin-right: 10rpx;">敢想信息</text><text>版权所有</text></view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad(){
			this.loadData();
		},
		methods: {
		  about(){
			  var that = this;
			  var cate_id = 1;
			  that.api.getbooklist(
			  {
			  	cate_id:cate_id
			  },
			  	function(res) {
			  		console.log(res)
			  		that.To('../essay/essay?title='+res[1].title +'&id='+res[1].id)	
			  	});
		  },
		  user_xy(){
			  var that = this;
			  var cate_id = 1;
			  that.api.getbooklist(
			  {
			  	cate_id:cate_id
			  },
			  	function(res) {
			  		console.log(res)
			  		that.To('../essay/essay?title='+res[2].title +'&id='+res[2].id)	
			  	});
		  },
		  loadData(){
			  var that = this;
			  that.api.getversion(function(res){
				   console.log(res)
			  })
		  }
			
		}
	}
</script>

<style>
	page {
		background: #FAFAFA;
	}
.bq_bottom{
	width: 100%;
	position: fixed;
	bottom: 100rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #999999;
	font-size: 24rpx;
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
