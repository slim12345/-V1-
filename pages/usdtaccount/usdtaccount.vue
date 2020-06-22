<template>
	<view>
		<view class="purse_bg">
			<!-- #ifdef APP-PLUS -->
			<view class="purse_title">
				<image src="/static/nav_btn_back_white.png" @click="back()"></image>
				<text>我的钱包</text>
			</view>
			<!-- #endif -->
			<image class="purse_bgimg" src="/static/money_01.png" mode="aspectFill"></image>
			<view class="zh_yue">
				账户余额（USDT）
			</view>
			<view class="money">
				<text>*{{money}}</text>
				<view class="yqzx" @click="pursedetail">
					<image src="/static/money_02.png"></image>
				</view>
			</view>
			<view class="profit">
				<view class="left">
					<text>可用数量</text>
					<text>*{{allEarning}}</text>
				</view>
				<view class="right">
					<text >冻结数量</text>
					<text>*{{allEarning}}</text>
				</view>
				
			</view>
		</view>
		<view class="money_type">
			<view :class="'types '+(currentTab==0?'active':'')" @click="clickTab" data-current="0">全部</view>
			<view :class="'types '+(currentTab==1?'active':'')" @click="clickTab" data-current="1">转入</view>
			<view :class="'types '+(currentTab==2?'active':'')" @click="clickTab" data-current="2">转出</view>
		</view>
		<view class="all">
			<view class="purselist" v-for="item in purselist" :key="item.id">
				<view class="pay">
					<text class="trade">*{{item.remarks}}</text>
					<text class="time">*{{item.create_time}}</text>
				</view>
				<view class="num">
					<text class="number">*{{item.symbol}}{{item.change}}</text>
					<text class="hasReturn">已返还账户</text>
				</view>
			</view>
		</view>
		<view class="purse_bottom">
			<view class="tx" @click="tx"><text>转出</text></view>
			<view class="cz" @click="cz"><text>转入</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0,
				purselist: [{}],
				money: '',
				allEarning: '',
				page: 1,
				limit: 10
			}
		},
		onLoad() {
			// this.loadData();
			// this.loadData2();
		},
		onPullDownRefresh() {
			// this.loadData();
			// this.loadData2();
			// uni.stopPullDownRefresh();
		},
		onReachBottom() {
			var index = this.page + 1;
			this.page = index;
			this.loadData();
		},
		methods: {
			// 后退
			back() {
                uni.navigateBack({
                });
			},
			//钱包富文本
			pursedetail(){
				var that = this;
				var cate_id = 3;
				that.api.getbooklist(
				{
					cate_id:cate_id
				},
					function(res) {
						console.log(res)
						that.To('../essay/essay?title='+res[0].title +'&id='+res[0].id)
					});
				
			},
			clickTab(e) {
				var that = this;
				var type = that.currentTab;
				if (type === e.target.dataset.current) {
					that.currentTab = type;
					that.loadData();
					return false;
				} else {
					type = e.target.dataset.current;
					that.currentTab = type;
					that.loadData();
				}
			},
			tx(e) {
				this.To('../usdtzhuanchu/usdtzhuanchu');
			},
			cz(e) {
				this.To('../usdtzhuanru/usdtzhuanru');
			},
			// 获取钱包列表记录
			loadData() {
				var that = this;
				var type = that.currentTab;
				console.log(type)
				var page = that.page;
				var limit = that.limit;
				that.api.mypurse(
				{
					type:type,
					page:page,
					limit:limit
				},
					function(res) {
							for (var i = 0; i < res.length; i++) {
								res[i].create_time = that.util.fomateDate(res[i].create_time)
							}
						that.purselist = res;
						console.log(res)
					});
			},
			// 获取我的钱包 收益 余额
			loadData2() {
				var that = this;
				that.api.my(
					function(res) {
						console.log(res)
						that.allEarning = res.allEarning;
						that.money = res.money;
					},function(){
						uni.stopPullDownRefresh();
					});

			}
		}
	}
</script>

<style lang="scss">
	.purse_bg {
		position: relative;
	}

	.purse_title {
		width: 690rpx;
		margin: 0 30rpx;
		position: absolute;
		top: 67rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		z-index: 99999;
		display: flex;
		align-items: center;
	}

	.purse_title text {
		margin-left: 261rpx;
	}

	.purse_title image {
		width: 20rpx;
		height: 37rpx;
	}

	.purse_bg .purse_bgimg {
		width: 100%;
	}

	.zh_yue {
		position: absolute;
		top: 177rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	.money {
		position: absolute;
		top: 250rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 68rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: row;
	}

	.yqzx image {
		width: 28rpx;
		height: 28rpx;
		margin-left: 20rpx;
	}

	.profit {
		margin-top:69rpx;
		width:100%;
		position: absolute;
		top: 300rpx;
		// left: 30rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		.left,.right{
			float: left;
			text-align: center;
			width:49%;
			text{
				display: block;
			}
		}
		.right::before{
			display: block;
			float:left;
			content:'|';
			
			transform: translateY(50%);
			opacity: 0.6;
		}
	}
	

	.money_type {
		width: 690rpx;
		margin: 0 30rpx;
		background: rgba(255, 255, 255, 1);
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		display: flex;
		flex-direction: row;
		padding: 26rpx 0 22rpx;
		border: 2rpx solid #FFFFFF;
	}

	.types {
		padding: 13rpx 26rpx;
		margin-right: 20rpx;
		border: 2rpx solid #FFFFFF;
	}

	.active {
		background: rgba(255, 255, 255, 1);
		border: 2rpx solid rgba(54, 134, 255, 1);
		border-radius: 26rpx;
		color: rgba(54, 134, 255, 1);
	}

	.all {
		width: 100%;
		background: #FFFFFF;
		margin-bottom: 40rpx;
	}

	.purselist {
		width: 690rpx;
		height: 120rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid rgba(229, 229, 229, 1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.pay {
		display: flex;
		flex-direction: column;

	}

	.trade {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		margin-top: 4rpx;
	}
	.num{
		text-align: right;
	}
	.number {
		
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
	}
	.hasReturn{
		display: block;
		font-size:26rpx;
	
		color:rgba(237,81,75,1);
		line-height:32rpx;
	}

	.purse_bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		font-size: 30rpx;
	}

	.tx {
		width: 335rpx;
		height: 100rpx;
		background: rgba(255, 255, 255, 1);
		border: 2rpx solid rgba(54, 134, 255, 1);
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(54, 134, 255, 1);
	}

	.cz {
		width: 335rpx;
		height: 100rpx;
		background: rgba(54, 134, 255, 1);
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
	}
</style>
