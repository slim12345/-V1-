<template>
	<view >
		
	
	<view class="emptyAddress" v-show="false">
		<image src="/static/img_wudizhi@2x.png" mode=""></image>
		<text>暂无地址信息，快去填写吧~</text>
		<button type="default" class="addAddressBtn" @click.stop="addAddress('edit')">添加新地址</button>
	</view>
	<view class="content b-t" >
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="address-section">
				
			
				<view class="order-content">
				<view class="cen" >
					<view class="top">
						<text class="name">{{item.name}}</text>
						<text class="mobile">{{item.mobile}}</text>
						<text v-if="item.default" class="tag">默认地址</text>
					</view>
					<text class="address">{{item.addressName}} {{item.area}}</text>
				</view>
			
				<text class="yticon icon-you" @click.stop="addAddress('edit', item)"></text>
			</view>
			</view>
			<!-- <view class="wrapper">
				<view class="address-box"> 
					<text v-if="item.default" class="tag">默认</text>
					<text class="address">{{item.addressName}} {{item.area}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.name}}</text>
					<text class="mobile">{{item.mobile}}</text>
				</view>
			</view> -->
		</view>
		<text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 1.6;color: #fa436a;font-size: 24upx;">
			重要：添加和修改地址回调仅增加了一条数据做演示，实际开发中将回调改为请求后端接口刷新一下列表即可
		</text>
		<button type="default" class="addAddressBtn" @click="addAddress('add')">添加新地址</button>
		<!-- <button class="add-btn" @click="addAddress('add')">新增地址</button> -->
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: 0,
				addressList: [
					{
						name: '刘晓晓',
						mobile: '18666666666',
						addressName: '贵族皇仕牛排(东城店)',
						address: '北京市东城区',
						area: 'B区',
						default: true
					},{
						name: '刘大大',
						mobile: '18667766666',
						addressName: '龙回1区12号楼',
						address: '山东省济南市历城区',
						area: '西单元302',
						default: false,
					}
				]
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
		},
		methods: {
			//选择地址
			checkAddress(item){
				if(this.source == 2){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.util.prePage().addressData = item;
					
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				
				console.log(data, type);
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.address-section {
		width: 100%;
		padding: 36upx 0;
		background: #fff;
		position: relative;
		border-bottom: solid 1px #EEEEEE;
		.order-content {
			display: flex;
			align-items: center;
		}
	
		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}
	
		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			.tag{
				background:rgba(228,239,255,1);
				border-radius:8rpx;
				background-color: #E4EFFF;
				font-size:24rpx;
				color:rgba(54,134,255,1);
				padding:8rpx 13rpx;
				margin-left:20rpx;
			}
			.mobile{
				font-size:30rpx;
				
				font-weight:400;
				color:rgba(153,153,153,1);
				
			}
		}
	
		.name {
			font-size: 30upx;
			margin-right: 24upx;
		}
	
		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			font-size:26rpx;
			
		}
	
		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}
	
		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}
	button.addAddressBtn{
		font-size:30rpx;
		color:#fff;
		position: absolute;
		left:50%;
		transform: translateX(-50%);
		bottom:18rpx;
		/* box-sizing: border-box; */
		margin:auto;
		width:90%;
		height:100rpx;
		background:rgba(54,134,255,1);
		border-radius:50rpx;
	
	}
	.emptyAddress{
		width:100vw;
		height:auto;
		position: absolute;
		top:0;
		bottom: 0;
		text-align: center;
		image{
			transform: translateY(25%);
			display: block;
			width: 239rpx;
			height: 572rpx;
			margin:auto;
		}
		text{
			
			font-size:36rpx;
			font-family:PingFang SC;
		
			color:rgba(102,102,102,1);
			line-height:23rpx;
		}
		
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 10upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			/* color: $base-color; */
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	button.addAddressBtn{
		font-size:30rpx;
		color:#fff;
	
		/* box-sizing: border-box; */
		
		
		
		background:rgba(54,134,255,1);
		border-radius:50rpx;
		position: fixed;
		left:50%;
	/* 	right: 30upx; */
		bottom: 18upx;
		z-index: 95;
	
		
		
	}
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
</style>
