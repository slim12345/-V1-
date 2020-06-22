<template>
	<view>
		<!-- 轮播 -->
		<swiper class="swiper" :indicator-dots="indicatorDots" indicator-active-color="#FFFFFF" :autoplay="autoplay"
		 :interval="interval" :duration="duration">
			<swiper-item v-for="item in banner" :key="item.id" @click="swiperClick(item.link,item.title)">
				<image :src="item.imgPath" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		
		<view class="nav">
			<view class="inner">
				
				<view v-for="(item,index) in navList" :class="tabCurrentIndex==index?'active':''" data-id="index" :key="index"
				 @click="isActive(index)">精选</view>
			</view>

		</view>
		<!-- 列表 -->
		<!-- <swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab"> -->
			<!-- <swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex"> -->
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<view class="content" >
						
					
					<!-- <view v-for="(item,index) in tabItem.orderList" :key="index" class="goods"> -->
					<view v-for="(item,index) in 7" :key="index" class="goods" @click="navToGoodsDetail">
						
						<!-- <view class="goods" v-for="(goodsItem, goodsIndex) in 7" :key="goodsIndex"> -->
							<image src="~@/static/fxzx_01.png" mode=""></image>
							<view class="desc">
							<view class="title">
								专业资质一次性医用口罩
							</view>
							<view class="nowPrice">
								<text class="yuan">￥</text>
								<text class="number">19.9</text>
							</view>
							<view class="oldPrice">
								<text class="yuan">￥</text>
								<text class="number">22</text>
							</view>
							</view>
					</view>
					</view>
					
					<!-- <uni-load-more :status="tabItem.loadingType"></uni-load-more> -->
				</scroll-view>
			<!-- </swiper-item> -->
		<!-- </swiper> -->
		<!-- <uni-load-more :status="more"></uni-load-more> -->
		<!-- 购物车图标 -->
		<image @click="navTo" src="../../static/icon_shop@2x.png" class="cart" mode="aspectFit"></image>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import Json from '@/Json';
	export default {
		data() {
			return {
				indicatorDots: true, //指示灯
				autoplay: true, //是否自动播放
				interval: 2000, //自动切换间隔时间
				duration: 500, //滑动动画时长
				banner: [],
				tabCurrentIndex: 0, //nav中的点击高亮的索引
				navList:[{
						state: 0,
						text: '精选',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '精选',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '精选',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '精选',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '精选',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 5,
						text: '精选',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 6,
						text: '精选',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 7,
						text: '精选',
						loadingType: 'more',
						orderList: []
					}
				]
			}
		},
		components: {
			uniLoadMore

		},
		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = 0;
			//#ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if (options.state == 0) {
				this.loadData()
			}
			// #endif

		},
		onShow() {

			
		},
		onPullDownRefresh() {
			
		},
		methods: {
			navToGoodsDetail(){
				this.To('/pages/goodsdetail/goodsdetail')
			},
			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#3686FF';
				switch (+state) {
					case 1:
						stateTip = '待付款';
						break;
					case 2:
						stateTip = '待发货';
						break;
					case 9:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;
			
						//更多自定义
				}
				return {
					stateTip,
					stateTipColor
				};
			},
			//nav点谁谁高亮
			isActive(index) {
				console.log(index);

				this.tabCurrentIndex = index;
			},
			swiperClick(url, title) {
				url = 'https://www.baidu.com';
				this.To('/pages/web_url/web_url?url=' + encodeURIComponent(url) + '&title=' + title);
			},
			navTo(){
				this.To('/pages/cart/cart')
			},
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			loadData(source) {
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
				var cate_id = 1;
				that.api.index({
						cate_id: cate_id
					},
					function(res) {
						console.log(res)
						that.banner = res;
					}
				);
				//获取订单列表

				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				
				let navItem = this.navList[index];
				let state = navItem.state;
console.log(index,navItem,state)
				if (source === 'tabChange' && navItem.loaded === true) {
					//tab切换只有第一次需要加载数据
					return;
				}
				if (navItem.loadingType === 'loading') {
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';

				setTimeout(() => {
					let orderList = Json.orderList.filter(item => {
						console.log(item)
						//添加不同状态下订单的表现形式
						item = Object.assign(item, that.orderStateExp(item.state));
						
						console.log(item)//演示数据所以自己进行状态筛选
						if (state === 0) {
							//0为全部订单
							return item;
						}
						return item.state === state
					});
					orderList.forEach(item => {
						navItem.orderList.push(item);
					})
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem, 'loaded', true);

					//判断是否还有数据， 有改为 more， 没有改为noMore 
					navItem.loadingType = 'more';
				}, 600);

			}
		}
	}
</script>

<style lang="scss" >
	page {
		background: #FFFFFF;
		height: 100%;
	}
.goods-section {
		margin-top: 20upx;
		background: #fff;
		padding-bottom: 1px;
		}
	/* 轮播图样式 */
	swiper {
		width: 100%;
		height: 422rpx;
	}
	.swiper-box {
		height: calc(100%);
	}
	
	
	

	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	swiper-item image {
		width: 100%;
		height: 100%;
	}

	.nav {
		width: 100%;
		overflow: scroll;
		height: 100rpx;

		.inner {
			width: auto;
			white-space: nowrap;

			.active {

				font-weight: 600;

			}

			.active:after {
				display: inline-block;
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				text-align: center;
				width: 40rpx;

				border-bottom: solid 2px #333333;
			}

			view {
				position: relative;
				line-height: 98rpx;
				display: inline-block;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);

				padding: 0 34rpx;


			}
		}
	}
	.list-scroll-content{
		height: 100%;
	}
	.content {
		
		box-sizing: border-box;
		padding: 30rpx;
		background-color: #FAFAFA;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
		.goods {
			width: 48%;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;

			image {
				width: 100%;
				height: 336rpx;
				border-radius: 4px;

			}

			.desc {
				border-radius: 10rpx;
				padding: 20rpx;

				.title {
					font-size: 28rpx;

					font-weight: 600;
					color: rgba(51, 51, 51, 1);
					line-height: 40rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					word-break: break-all;
				}

				.nowPrice {
					display: inline-block;
					margin-right: 4px;

					.yuan {
						font-size: 22rpx;

						font-weight: bold;
						color: rgba(247, 80, 80, 1);
						line-height: 40rpx;
					}

					.number {

						font-size: 28rpx;

						font-weight: bold;
						color: rgba(247, 80, 80, 1);
						line-height: 40rpx;
					}
				}

				.oldPrice {
					display: inline-block;
					text-decoration: line-through;

					.yuan {
						font-size: 22rpx;

						font-weight: bold;
						color: #999999;
						line-height: 40rpx;
					}

					.number {
						font-size: 26rpx;

						font-weight: bold;
						color: #999999;
						line-height: 40rpx;
					}
				}
			}


		}
	}

	.cart {
		position: fixed;
		bottom: 10%;
		right: 30rpx;
		width: 100rpx;
		height: 100rpx;
	}
</style>
