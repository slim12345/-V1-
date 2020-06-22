<template>
	<view>
		<view class="card" @click="navigateTo">
			<image class="bgi" src="../../static/img_banner@2x.png" mode="scaleToFill"></image>
			<text class="first">钱包资产折合（USDT）</text>
			<text class='card_total'>11.234587</text>
			<text class="third">≈340.587945 CNY</text>
			<view class="tag">
				<image src="../../static/icon_anquan@2x.png" mode="aspectFill"></image>
				<text>资产保障中</text>
			</view>
		</view>
		<view class="content">
			<view class="item">
				<view class="left">
					<image src="../../static/icon_usdt@2x.png" mode=""></image>
					<text>USDT</text>
				</view>
				<view class="right">
					<text class="first">可用：0.045872</text>
					<text class="second">冻结：0.045872</text>
				</view>
			</view>
			<view class="item">
				<view class="left">
					<image src="../../static/icon_eth@2x.png" mode=""></image>
					<text>USDT</text>
				</view>
				<view class="right">
					<text class="first">可用：0.045872</text>
					<!-- <text class="second">冻结：0.045872</text> -->
				</view>
			</view>
			<view class="item">
				<view class="left">
					<image src="../../static/icon_xxx@2x.png" mode=""></image>
					<text>USDT</text>
				</view>
				<view class="right">
					<text class="first">可用：0.045872</text>
					<text class="second">冻结：0.045872</text>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			navigateTo(){
				this.To('/pages/usdtaccount/usdtaccount')
			}
		}
	}
</script>

<style lang="scss">
	$grey: #ABABB4;
	$fff: #FFFFFF;
	.card{
		position: relative;
		box-sizing: border-box;
	
		color:$grey;
		width:691rpx;
		height:300rpx;
	margin: auto;
		border-radius: 10rpx;
		
		.bgi{
			width:691rpx;
			position: absolute;
			height:300rpx;
			z-index: -1;
		
			
			
		}
		text{
			padding:37rpx 0 0rpx 40rpx;
			display: block;
		}
		.first{
			font-size: 28.14rpx;
		}
		&_total{
			// line-height:100rpx;
			
			color:$fff;
			font-size:51.39rpx;
		}
		.third{
			font-size: 25.57rpx;
			// line-height:17rpx;
			// padding-top: 57rpx;
		}
		.tag{
			
			position: absolute;
			right:0px;
			top:33rpx;
			// width:182rpx;
			// height:64rpx;
			background:rgba(255,255,255,.2);
			// opacity:0.2;
			
			border-radius:32rpx 0rpx 0rpx 32rpx;
			
			image{
				// position: absolute;
				// z-index: 999;
				width:24rpx;
				height:30rpx;
				vertical-align: middle;
				margin:17rpx 0rpx 17rpx 30rpx;
			}
			text{
				padding-left:8rpx;
				display: inline;
				color:#fff;
				font-size:20rpx;
				padding-right: 17rpx;
			}
		}
	}
	.content{
		width:92%;
		margin:auto;
		margin-top:30rpx;
		.item{
			clear: both;
			height:160rpx;
			border-bottom:solid 1px rgba(238,238,238,1);
			.left{
				    transform: translateY(25%);
				
				float:left;
				width:40%;
				height: 100%;
				image{
					width:76rpx;
					height: 76rpx;
					vertical-align: middle;
				}
				text{
					margin-left:17rpx;
					color:#333;
					font-size:30rpx;
					
					font-weight:bold;
					color:rgba(51,51,51,1);
					
				}
			}
			.right{
				width:60%;
				float:right;
				height: 100%;
				   transform: translateY(25%);
			
				text{
					
					display: block;
					text-align:right;
					
				}
				text.first{
					font-size:30rpx;
					 
					font-weight:bold;
					color:rgba(51,51,51,1);
					
				}
				text.second{
					font-size:26rpx;
					line-height:50rpx;
					font-weight:bold;
					color:rgba(153,153,153,1);
				
				}
			}
		}
		
	}
</style>
