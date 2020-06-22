<template>
	<view>
		<!-- 地址 -->
		<!-- <navigator url="/pages/address/address?source=2" class="address-section"> -->
		<view class="address-section">


			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>


				<view class="cen">
					<view class="top">
						<text class="name">{{addressData.name}}</text>
						<text class="mobile">{{addressData.mobile}}</text>
					</view>
					<text class="address">{{addressData.address}} {{addressData.area}}</text>
				</view>
				<!-- <text class="yticon icon-you"></text> -->
			</view>

			<!-- </navigator> -->
		</view>
		<view class="goods-section">
			<view class="g-header b-b">
				<text class="name">订单状态</text>
				<text class="statusTxt">待发货</text>
			</view>
			<!-- 商品列表 -->
			<view class="g-item" v-for='item in 2' :key='item'>
				<image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg"></image>
				<view class="right">
					<text class="title clamp">古黛妃 短袖t恤女夏装2019新款</text>
					<text class="spec">春装款 L</text>
					<view class="price-box">
						<text class="price">￥17.8</text>
					</view>
					<text class="number">x 1</text>
				</view>
			</view>

		</view>



		<!-- 金额明细 -->
		<view class="yt-list">


			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单号</text>
				<text class="cell-tip">44787466414495714</text>
			</view>
			<view class="yt-list-cell b-b">

				<text class="cell-tit clamp">支付方式</text>
				<text class="cell-tip">微信支付</text>
			</view>
			<view class="yt-list-cell b-b">

				<text class="cell-tit clamp">下单时间</text>
				<text class="cell-tip">2020-05-21 12：05</text>
			</view>
			<view class="yt-list-cell b-b">

				<text class="cell-tit clamp">运费合计</text>
				<text class="cell-tip">￥0.00</text>
			</view>
			<view class="yt-list-cell b-b">

				<text class="cell-tit clamp">总计</text>
				<text class="cell-tip totalPrice">￥408.00</text>
			</view>

		</view>

		<!-- 底部 -->
		<view class="footer" v-if="state">
			<text class="payLeftTime">剩余支付款时间：15:31:12</text>
			<text class="submit" @click="submit">去支付</text>
			<!-- <text class="grey" @click="submit">查看物流</text> -->
			<text class="submit" @click="confirmGetGoods">确认收货</text>
			<text class="grey" @click="delOrder">删除订单</text>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {

				state:true,
				payType: 1, //1微信 2支付宝
				// addressData:''
				addressData: {
					name: '许小星',
					mobile: '13853989563',
					addressName: '金九大道',
					address: '山东省济南市历城区',
					area: '149号',
					default: false,
				}
			}
		},
		onLoad(option) {
			//商品数据
			//let data = JSON.parse(option.data);
			//console.log(data);
		},
		methods: {
			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type) {
				this.payType = type;
			},
			submit() {
				uni.navigateTo({

					url: '/pages/money/pay'
				})
			},
			stopPrevent() {}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 150upx;
		
	}

	.address-section {
		padding: 50upx 0;
		background: #fff;
		position: relative;

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

			.mobile {
				font-size: 30rpx;

				font-weight: 400;
				color: rgba(153, 153, 153, 1);

			}
		}

		.name {
			font-size: 30upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			font-size: 26rpx;

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

	.goods-section {
		margin-top: 20upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
			justify-content: space-between;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			// color: $font-color-base;
			
		}
		.statusTxt{
			color:#3686FF;
			font-size: 30upx;
			
		}
		.g-item:last-child{
			border-bottom:none;
		}
		.g-item {
			display: flex;
			padding: 30upx 30upx;
			border-bottom:solid 1px #FAFAFA;
			image {
				flex-shrink: 0;
				display: block;
				width: 190upx;
				height: 190upx;
				// border-radius: 4upx;
			}
			
			.right {
				position: relative;
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30rpx;

				font-weight: bold;
				color: rgba(51, 51, 51, 1);

			}

			.spec {
				font-size: 26upx;
				color: rgba(102, 102, 102, 1);
			}

			.price-box {


				font-size: 28upx;
				color: rgba(247, 80, 80, 1);
				padding-top: 10upx;

				.price {
					position: absolute;
					bottom: 0;
				}

			}

			.number {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 0;
				// float:right;
				// margin-top:-50rpx;
				font-size: 30rpx;

				color: rgba(102, 102, 102, 1);

			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		font-size: 26rpx;

		color: rgba(51, 51, 51, 1);
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;
		.totalPrice{
			font-weight: bold;
		}
		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			// color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: #333333;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			// color: $font-color-dark;

			&.disabled {
				// color: $font-color-light;
			}

			&.active {
				// color: $base-color;
			}

			&.red {
				// color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			// font-size: $font-base;
			// color: $font-color-dark;
		}
	}

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			// color: $base-color;
		}

		.tit {
			font-size: 32upx;
			// color: $font-color-dark;
			flex: 1;
		}
	}

	.footer {
		box-sizing: border-box;
		padding:0 30upx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		// color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.payLeftTime{
			color:#333;
		}

		

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			// width:auto;
			padding:0 4px;
			width: 190upx;
			height: 70%;
			color:#3686FF;
			font-size: 30upx;
			border:solid 1px #3686FF;
			border-radius: 40rpx;
			margin-right: 10rpx;
			
		}
		.grey{
			padding:0 4px;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 190upx;
			height: 70%;
			color:#666666;
			font-size: 30upx;
			border:solid 1px #666666;
			border-radius: 40rpx;
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			// color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			// color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			// color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 44upx;

			// color: $base-color;
			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			// color: $font-color-light;
			color: #007AFF;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}
</style>
