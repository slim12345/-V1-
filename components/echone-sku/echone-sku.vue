<template>
	<popup-bottom :show="show" @close="closeSkuBox">
		<view class="sku-box">
				<view class="sku-header container">
					<image class="goods-img" :src="selectSkuInfo[cbImage]"></image>
					
					<view class="sku-goods-info">
						<view class="money" :style="{color:themeColor}">
							<text class="symbol fs-26">￥</text>
							<text class="amount fs-38">{{selectSkuInfo[cbPrice] | toFixed2}}</text>
						</view>
						<view class="stock fs-24">
							库存{{selectSkuInfo[cbStock]}}件
						</view>
						<view class="fs-24">
							已选："{{selectSkuInfo[cbValue]}}"
						</view>
					</view>
				</view>
				<view class="sku-item container" v-for="(sku,sIndex) in mySpecifications" :key="sku[speId]">
					<view class="sku-name">{{sku[speName]}}</view>
					<view class="sku-content">
						<text 
							class="sku-content-item" 
							v-for="(item,index) in sku[speList]"
							:key="index" 
							:style="{
								border: index===sku.sidx?`${borderWidth}px solid ${themeColor}`:`${borderWidth}px solid transparent`,
								color:index===sku.sidx?'#fff':'#333',
								backgroundColor: index===sku.sidx?'#3686FF':'#f5f5f5' }" 
							@click="selectSku(sIndex,index)"
						>{{item}}</text>
					</view>
				</view>
				<view class="sku-item container count">
					<view class="sku-name">数量</view>
					<view class="count-box">
						<text class="minus" :class="{disabled:buyCount<=1}" @click="handleBuyCount('minus')">-</text>
						<input class="count-content" v-model="buyCount" :disabled="selectSkuInfo[cbStock]<=0"/>
						<text class="add" :class="{disabled:buyCount>=selectSkuInfo[cbStock]}" @click="handleBuyCount('add')">+</text>
					</view>
				</view>
				
				<view class="confirm-btn bottomBtn"	v-if="selectSkuInfo[cbStock]<=0" :class="{disabled:selectSkuInfo[cbStock]==0}" :style="{backgroundColor:themeColor}" @click="handleConfirm">
					<!-- {{selectSkuInfo[cbStock]>0?'立即购买':'缺货中'}} -->
					
						<text>缺货中</text>
					
				</view>
				<view class="container" 	v-else :class="{disabled:selectSkuInfo[cbStock]==0}" :style="{backgroundColor:themeColor}" @click="handleConfirm">
					<!-- {{selectSkuInfo[cbStock]>0?'立即购买':'缺货中'}} -->
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
			</view>
	</popup-bottom>
</template>

<script>
	import PopupBottom from './popup-bottom'
	export default {
		components:{
			PopupBottom
		},
		filters: {
			toFixed2: function (value) {
			  if(!value) return '0.00'
			  return Number(value).toFixed(2)
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			themeColor: {
				type: String,
				default: '#1ac792'
			},
			combinations: {
				type: Array,
				default(){
					return []
				}
			},
			specifications: {
				type: Array,
				default(){
					return []
				}
			},
			defaultSelectIndex: {
				type: Number,
				default: 0
			},
			combinationsProps: {
				type: Object,
				default(){
					return {
						id: 'id',
						value: 'value',
						image: 'image',
						price: 'price',
						stock: 'stock'
					}
				}
			},
			specificationsProps: {
				type: Object,
				default(){
					return {
						id: 'id',
						list: 'list',
						name: 'name'
					}
				}
			},
		},
		data() {
			return {
				buyCount: 1,
				selectedIndex: 0,
				borderWidth: uni.upx2px(2),
				mySpecifications: [],
				selectSkuInfo: {},
			}
		},
		watch:{
			specifications(val){
				this.initSkuData()
			}
		},
		computed: {
			speId() {
				return this.specificationsProps.id
			},
			speList() {
				return this.specificationsProps.list
			},
			speName() {
				return this.specificationsProps.name
			},
			cbValue() {
				return this.combinationsProps.value
			},
			cbImage() {
				return this.combinationsProps.image
			},
			cbPrice() {
				return this.combinationsProps.price
			},
			cbStock() {
				return this.combinationsProps.stock
			}
		},
		created() {
			if(this.specifications.length) {
				this.initSkuData()
			}
		},
		methods: {
			navToCart(){
				this.To('/pages/cart/cart')
			},
			navToCreateOrder(){
				this.To('/pages/order/createOrder')
			},
			initSkuData() {
				this.selectedIndex = this.defaultSelectIndex
				this.selectSkuInfo = this.combinations[this.selectedIndex]
				this.mySpecifications = JSON.parse(JSON.stringify(this.specifications))
				this.mySpecifications.forEach((item,idx) => {
					//当前规格组合值
					const selects = this.combinations[this.selectedIndex][this.cbValue].split(',')
					//每类规格对应其列表的下标 并记录在属性sidx在mySpecifications的子对象中
					const sIndex = item[this.speList].indexOf(selects[idx])
					this.$set(item,'sidx',sIndex>-1?sIndex:0)
				})
			},
			selectSku(sIndex,index) {
				this.mySpecifications[sIndex].sidx = index
				const selectInfo = this.mySpecifications.reduce((prev,cur) => {
					if(prev) {
						return prev+','+cur[this.speList][cur.sidx]
					}else {
						return cur[this.speList][cur.sidx]
					}
				},'')
				this.selectedIndex = this.combinations.findIndex(item => item[this.cbValue] === selectInfo)
				this.selectSkuInfo = this.combinations[this.selectedIndex]
				if(this.selectSkuInfo[this.cbStock] === 0) {
					this.buyCount = 0
				}
				if(this.selectSkuInfo[this.cbStock] !== 0 && this.buyCount*1 === 0) {
					this.buyCount = 1
				}
			},
			handleBuyCount(type) {
				if(type === 'minus') {
					if(this.buyCount <= 1) return
					this.buyCount = this.buyCount*1 - 1
				}
				if(type === 'add') {
					if(this.buyCount >= this.selectSkuInfo[this.cbStock]) return
					this.buyCount = this.buyCount*1 + 1
				}
			},
			closeSkuBox() {
				this.$emit('close')
			},
			handleConfirm() {
				const result = this.selectSkuInfo
				result.count = this.buyCount*1
				this.$emit('confirm', result)
			}
		}
	}
</script>

<style>
	page {
		font-size: 28upx;
		color: #333333;
	}
</style>
<style lang="scss" scoped>
	
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
	@mixin flex-center {
		display: flex;
		align-items: center;
	}

	@mixin flex-center-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	$font-color-light: #999999;
	$page-bg-color-grey: #f5f5f5;

	.fs-24 {
		font-size: 24upx;
	}

	.fs-26 {
		font-size: 26upx;
	}

	.fs-38 {
		font-size: 38upx;
	}

	.container {
		width: 690upx;
		margin: 0 auto;
	}

	.sku-box {
		min-height: 500upx;
		background-color: white;
		padding-bottom: 120upx;
		.sku-header {
			display: flex;
			padding: 40upx 0 20upx;
			.goods-img {
				width: 200upx;
				height: 200upx;
				border-radius: 6upx;
				border: 4upx solid white;
				flex: none;
				margin-top: -80upx;
			}
		}
		.sku-goods-info {
			margin-left: 20upx;
			.money {
				border: none;
				padding-bottom: 0;
			}
			.stock {
				color: $font-color-light;
			}
		}
		.sku-item {
			padding: 20upx 0;
			.sku-name {
				font-size: 30upx;
			}
			.sku-content {
				// border-bottom: 2upx solid $page-bg-color-grey;
				padding: 10upx 0;
				@include flex-center;
				flex-wrap: wrap;
				.sku-content-item {
					padding: 16upx 20upx;
					border-radius: 6upx;
					margin: 0 30upx 20upx 0;
				}
			}
			&.count {
				@include  flex-center;
				justify-content: space-between;
				.count-box {
					@include flex-center;
					text,.count-content {
						@include flex-center-center;
						width: 70upx;
						height: 70upx;
						font-size: 32upx;
						border: 2upx solid $page-bg-color-grey;
					}
					.add,.minus {
						font-size: 44upx;
						
						
						// border:solid 1px #3686FF;
						// color:#3686FF;
					}
					.count-content {
						border-width: 2upx 0;
						text-align: center;
					}
				}
			}
		}
		.confirm-btn {
			// @include flex-center-center;
			height: 80upx;
			border-radius: 80upx;
			color: white;
			font-size: 32upx;
			margin-top: 10upx;
			line-height: 80upx;
			width:92% !important;
			text-align: center;
			line-height: 80upx;
			left:50%;
			transform:translateX(-50%);
			margin-top:-10rpx;
			bottom:20rpx;
			
		}
	}

	[class*=disabled] {
		color: $font-color-light;
		opacity: .7;
	}
</style>
