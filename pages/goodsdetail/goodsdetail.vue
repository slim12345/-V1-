<template>
	<view>
		<!-- 轮播 -->
		<view class="contain">
			<uni-swiper-dot :info="info" :current="current" field="content"  :mode="mode">
			    <swiper class="swiper-box" @change="change" :autoplay="autoplay" :interval="interval" :duration="duration">
			        <swiper-item v-for="(item ,index) in info" :key="index">
			            <view class="swiper-item">
			              <image :src="item.url" mode="widthFix"></image>
			            </view>
			        </swiper-item>
			    </swiper>
			</uni-swiper-dot>
		</view>
		<!-- 标题 -->
				<view class="desc">
					<image src="../../static/btn_fengxiang@2x.png"  class="share" mode="widthFix"></image>
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
				
		<!-- 商品规格 -->
		<view class="goodsParams" @click="handleClose">
			<text class="left">商品规格</text>
			<image src="../../static/icon_more.png" mode=""></image>
			<text class="right">已选：深黑色；M</text>
		</view>
		<!-- <uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup> -->
		
		<!-- —— 商品详情 —— -->
		<view class="detail">
			<view class="title">
				—— 商品详情 ——
			</view>
			<view class="content">
				
			</view>
		</view>
		<echone-sku
		  :show="popupShow"
		  :theme-color="themeColor"
		  :combinations="combinations"
		  :specifications="specifications"
		  :default-select-index="selectedIndex"
		 
		  @close="handleClose"
		  @confirm="handleConfirm"
		>
		
		</echone-sku>
		<!-- :combinations-props="combinationsProps"
		  :specifications-props="specificationsProps" -->
		<!-- 购物车图标 -->
		<image src="../../static/icon_shop@2x.png" class="cart" mode="aspectFit"></image>
	<!-- 加入购物车,立即购买按钮 -->
	<view class="bottomBtn" >
		<view class="addCart">
			<view class="whole" @click="navToCart">
				<text>加入购物车</text>
				<image src="../../static/tab_blue1@2x.png" mode="aspectFill"></image>
			</view>
			<view class="whole whole2" @click="navToCreateOrder">
			<text>立即购买</text>
			<image src="../../static/tab_blue@2x.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import echoneSku from '@/components/echone-sku/echone-sku.vue'
	// import uniPopup from '@/components/uni-popup/uni-popup.vue'
	// import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	// import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				autoplay:true,
				interval:2000,
				duration:500,
				  info: [{
				              content:'',
								url: '../../static/cloth.png',
				            }, {
								 content:'',
				                url: '../../static/cloth.png',
				            }],
				            current: 0,
				            mode: 'nav',
				//商品规格--------------------------------------------
				popupShow:false,
				themeColor:"#3686FF",
				//商品规格数据组合Array
				combinations: [
				  {
				    id: '1',
				    value: '深黑色,M',
				    image:
				      'https://miniprogram-img01.caishuib.com/wx15168444f005a4ab/material/image/202005135/3a014c2f42c1c46b.PNG',
				    price: 299.00,
				    stock: 1000,
				  },
				  {
				    id: '2',
				    value: '深黑色,L',
				    image:
				      'https://miniprogram-img01.caishuib.com/wx15168444f005a4ab/material/image/20200383/ebd0c8d01a6e9c10.PNG',
				    price: 299.00,
				    stock: 500,
				  },
				  {
				    id: '3',
				    value: '深黑色,XL',
				    image:
				      'https://miniprogram-img01.caishuib.com/wx15168444f005a4ab/material/image/202005135/3a014c2f42c1c46b.PNG',
				    price: 299.00,
				    stock: 1000,
				  },
				  {
				    id: '4',
				    value: '深灰色,M',
				    image:
				      'https://miniprogram-img01.caishuib.com/wx15168444f005a4ab/material/image/20200383/ebd0c8d01a6e9c10.PNG',
				    price: 100.0,
				    stock: 0,
				  },
				  {
				    id: '5',
				    value: '深灰色,L',
				    image:
				      'https://miniprogram-img01.caishuib.com/wx15168444f005a4ab/material/image/20200383/ebd0c8d01a6e9c10.PNG',
				    price: 100.0,
				    stock: 10,
				  },
				],
				//商品规格数据Array
				specifications:[
					 {
					    name: '颜色',
					    id: '123',
					    list: ['深黑色', '深灰色','深黑色'],
					  },
					  {
					    name: '尺码',
					    id: '456',
					    list: ['M', 'L','XL'],
					  },
				],
				selectedIndex:0,//Number
				// combinationsProps:'',//自定义商品规格数据组合属性,默认属性名 id,value,image,price,stock
				// specificationsProps:'',//自定义商品规格数据属性,默认属性名 id,list,name
				
			}
		},
		 components: {uniSwiperDot,
		  echoneSku
		    // uniPopup,
		    //      uniPopupMessage,
		    //      uniPopupDialog
				 },
		onLoad() {

		},
		onShow() {
			
			
		},
		onPullDownRefresh() {
			
		},
		methods: {
			navToCart(){
				this.To('/pages/cart/cart')
			},
			navToCreateOrder(){
				this.To('/pages/order/createOrder')
			},
			handleClose(){
				this.popupShow=!this.popupShow;
			},
			handleConfirm(){
				console.log(1);
				
			},
			open(){
			         this.$refs.popup.open()
			      },
			 change(e) {
			            this.current = e.detail.current;
			        }
			}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	/* 轮播图样式 */
	.contain{
		width: 100%;
		
		background:rgba(249,249,249,1);
	}
	swiper {
		width: 92%;
		height: 750rpx;
		position: relative;
		margin:20rpx auto 0 auto;
	}
	swiper-item{
		width:100%;
		height: 100%;
		margin:auto;
		height: 628rpx;
	}
	swiper-item image {
		width: 100%;
		height: 100%;
	}
	/deep/.uni-swiper__dots-nav{
		position: absolute;
		left:86%;
		bottom:50rpx;
		
		height: auto;
		/* width: 36rpx; */
		
		// /* padding:6rpx 26rpx; */
		background:rgba(51,51,51,0.4);
		/* background: none; */
		border-radius:18rpx;
		/* overflow: hidden; */
	}
	.desc{
		position: relative;
		border-bottom:solid #FAFAFA 13rpx ;
		.share{
			position: absolute;
			top:64rpx;
			right:0;
			width:136rpx;
			height:52rpx;
		}
		padding:40rpx 0 0 32rpx ;
		
		.title{
			width:565rpx;
			font-size:40rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(0,0,0,1);
			line-height:60rpx;
		}
		.nowPrice{
			display: inline-block;
			margin-right:4px;
			.yuan{
				font-size:22rpx;
				
				font-weight:bold;
				color:rgba(247,80,80,1);
				line-height:40rpx;
			}
			.number{
				
				font-size:28rpx;
				
				font-weight:bold;
				color:rgba(247,80,80,1);
				line-height:40rpx;
			}
		}
		
		.oldPrice{
			display: inline-block;
			text-decoration:line-through;  
			.yuan{
				font-size:22rpx;
				
				font-weight:bold;
				color:#999999;
				line-height:40rpx;
			}
			.number{
				font-size:26rpx;
				
				font-weight:bold;
				color:#999999;
				line-height:40rpx;
			}
		}
	}
	.goodsParams{
		border-top:solid #EEEEEE 1px;
		position: relative;
		box-sizing: border-box;
		
		height:100rpx;
		background:rgba(255,255,255,1);
		padding:0 31rpx;
		text{
			font-size:26rpx;
			
			font-weight:400;
			
			line-height:100rpx;
		}
		.left{
			color:rgba(102,102,102,1);
			float:left;
		}
		.right{
			font-size:26rpx;
			
			color:rgba(51,51,51,1);
			float:right;
			margin-right:58rpx;
			
		}
		image{
			position: absolute;
			width:12rpx;
			height:22rpx;
			right:30rpx;
			top:50%;
			transform: translateY(-50%);
			
		
		}
	}
	.detail{
		margin-top:1px;
		width:100%;
		.title{
			height:60rpx;
			line-height: 60rpx;;
			background-color: #FAFAFA;
			text-align: center;
			color:#666666;
			font-size:24rpx;
		}
		.content{
			height: 20px;
			background-color: #333;
		}
	}
	.cart{
		position:fixed;
		bottom:10%;
		right:30rpx;
		width:100rpx;
		height:100rpx;
		box-shadow:0px 7px 20px 0px rgba(51,51,51,0.2);
		border-radius:50px;
	}
	.bottomBtn{
		position: fixed;
		bottom:0;
		left:0;
		width: 100%;
		height:120rpx;
		background:rgba(255,255,255,1);
		border-top:solid 1px #EEEEEE;
		.addCart{
			width: 92%;
			margin: 20rpx auto;
			height: 80rpx;
			.whole{
				width:50%;
				height:100%;
				position: relative;
				text{
					position: absolute;
					left:50%;
					top:50%;
					transform: translate(-50%,-50%);
					color:#fff;
					font-size: 30rpx;
					
				}
				image{
					position: absolute;
					
					z-index: -1;
					width:100%;
					height:100%;
				}
			}
			.whole2{
				right: -50%;
				top: -100%;
			}
			
		}
	}
</style>
