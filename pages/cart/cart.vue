<template>
	<view class="container">
		<!-- 空白页 !hasLogin ||-->
		<view v-if="empty===true" class="empty">
				<!-- 已登录，暂无物品 -->
				<view v-if="hasLogin">
					<image src="/static/img_material2@2x.png" mode="aspectFit"></image>
			
					<view class="empty-tips" >
						暂无物品，
						<navigator class="navigator" url="../market/market" open-type="switchTab">快去逛逛吧~</navigator>
					</view>
				
				</view>
			<!-- 未登录 -->
			<view   v-else>
				<image src="/static/img_material2@2x.png" mode="aspectFit"></image>
				<view class="empty-tips" >
					暂无物品,
					<navigator class="navigator" url="../market/market" open-type="switchTab">去登陆~</navigator>
					
				</view>
				
			</view>
		</view>

		<view v-else>
			<view class="status" @click="statusChange">
				{{status?'编辑':'完成'}}
			</view>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="yticon icon-xuanzhong2 checkbox" :class="{checked: item.checked}" @click="check('item', index)"></view>
						<view class="imageWrapper">
							<!-- <image :src="item.image" 
								:class="[item.loaded]"
								mode="aspectFill" 
								lazy-load 
								@load="onImageLoad('cartList', index)" 
								@error="onImageError('cartList', index)"
							></image> -->
							<image :src="item.image" mode=""></image>

						</view>
						<view class="item-right">
							<text class="clamp title">{{item.title}}</text>
							<text class="attr">{{item.attr_val}}</text>
							<text class="price">¥{{item.price}}</text>
							<uni-number-box class="step" :min="1" :max="item.stock" :value="item.number>item.stock?item.stock:item.number"
							 :isMax="item.number>=item.stock?true:false" :isMin="item.number===1" :index="index" @eventChange="numberChange"></uni-number-box>
						</view>
						<!-- <text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text> -->
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			
			<!-- 结算 -->
			<view v-if="status" class="action-section" >
				<view class="checkbox">
					
					<image :src="allChecked?'/static/icon_sure@2x.png':'/static/icon_sure1@2x.png'" mode="aspectFit" @click="check('all')"></image>
					<text>全选</text>
					<!-- <view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view> -->
					
					
				</view>
				<view class="total-box">
					<text class="allText">合计：</text>
					<text class="price">¥{{total}}</text>
					<!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">结算({{piece}})</button>
			</view>
			<!-- 删除 -->
			<view v-else class="action-section" >
					<view class="checkbox">
						<image :src="allChecked?'/static/icon_sure@2x.png':'/static/icon_sure1@2x.png'" mode="aspectFit" @click="check('all')"></image>
						<text>全选</text>
						
					</view>
					<view class="total-box" style="display: none;">
						
						<text class="price">¥{{total}}</text>
						
					</view>
					<button  class="delBtn" @click="clearChecked">删除</button>
			
			</view> 
		</view>
		</view>
		
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				piece:0,//结算件数
				status:true,//编辑:true|完成：false
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				//购物车列表
				cartList: [],
				hasLogin:false
			}
		},
		onLoad() {
			this.loadData();
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		computed: {
			// ...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			async loadData() {
				let list = await this.$apiJson.json('cartList'); 
				let cartList = list.map(item => {
					item.checked = true;
					return item;
				});
				this.cartList = cartList;
				this.calcTotal(); //计算总价
			},
			// 监听image加载完成
			// onImageLoad(key, index) {
			// 	this.$set(this[key][index], 'loaded', 'loaded');
			// },
			// // 监听image加载失败
			// onImageError(key, index) {
			// 	this[key][index].image = '/static/errorImage.jpg';
			// },
			navToLogin() {
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/applogin/applogin'
				})
				// #endif
				// #ifndef APP-PLUS
				uni.navigateTo({
					url: '/pages/login/login'
				})
				// #endif
				
			},
			//编辑完成状态变化
			statusChange(){
				this.status=!this.status;
				//状态改变重新计算总价和件数
				this.calcTotal();
				 
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data) {
				this.cartList[data.index].number = data.number;
				this.calcTotal();
			},
			//删除当前
			deleteCartItem(index) {
				let list = this.cartList;
				let row = list[index];
				let id = row.id;

				this.cartList.splice(index, 1);
				this.calcTotal();
				uni.hideLoading();
			},
			//清空
			clearCart() {
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							this.cartList = [];
						}
					}
				})
			},
			//选中删除
		    clearChecked(){
					let list = this.cartList;
					let total = 0;
					let indexDel=[]
					//选中项从cartlist中除掉
					
					list.forEach((item,index) => {
						if (item.checked === true) {
							console.log(index)
							indexDel.push(index)
						  
						} 
					})
					// 将索引集合按照倒序排列，然后splice从数组尾巴开始删除，这样就不会数组的变化就不会影响删除的实现
					indexDel.sort(function(a, b) { return b - a});
					indexDel.forEach(index=>{
						this.cartList.splice(index, 1);
					})
					
					//剩下的计算总价
					this.calcTotal();
					indexDel=[];
			},
			//计算总价，结算件数同时发生
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					console.log(this.empty)
					this.empty = true;
					console.log(this.empty)
					return;
				}
				let total = 0;
				let checked = true;
				let piece=0;
				list.forEach(item => {
					if (item.checked === true) {
						console.log(111);
						total += item.price * item.number;
						piece+=item.number;
					} else if (checked === true) {
						console.log(222);
						checked = false;
						
					}
				})
				this.allChecked = checked;
				this.piece=piece;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder() {
				let list = this.cartList;
				let goodsData = [];
				list.forEach(item => {
					if (item.checked) {
						goodsData.push({
							attr_val: item.attr_val,
							number: item.number
						})
					}
				})

				uni.navigateTo({
					url: `/pages/order/createOrder?data=${JSON.stringify({
						goodsData: goodsData
					})}`
				})
				// this.$api.msg('跳转下一页 sendData');
			}
		}


	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 630rpx;
				height: 464rpx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				/* display: flex; */
				text-align: center;
				font-size: 36rpx;
				color: $font-color-disabled;
				font-weight: 400;
				color: #666666;
				margin-top: -50rpx;

				/* line-height:23px; */
				.navigator {
					display: inline-block;
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.status{
		height:88rpx;
		background:#FAFAFA;
		padding-right:30rpx;
		line-height: 88rpx;
		text-align: right;
		font-size:30rpx;
		
		color:rgba(51,51,51,1);
		
	}
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 20upx;
		border-bottom:solid #EEEEEE 1px;

		.imageWrapper{
			width: 190upx;
			height: 190upx;
			flex-shrink: 0;
			position: relative;

			image {
				width:100%;
				height: 100%;
				
			}
		}

		.checkbox {
			height: 100%;
			font-size: 44upx;
			/* line-height: 1; */
			margin-right: 30rpx;
			/* padding: 4upx; */
			/* color: $font-color-disabled; */
			color: #999999;
			background: #fff;
			
			transform: translateY(135%);
			/* border:solid #333 1px; */
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title{
				font-size: 30rpx;
				font-weight:bold;
				color:rgba(51,51,51,1);
				
			}
			.price{
				position: absolute;
				bottom:0;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(247,80,80,1);
				
			}

			.attr {
				font-size:26rpx;
			
				font-weight:400;
				color:rgba(102,102,102,1);
				
			}

			
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}
	/deep/.uni-numbox {
		/* #ifndef H5 */
		position: absolute;
		left:50%!important; 
		/* right:10px; */
		/* transform: translateX(-50%)!important; */
		/* #endif */
		/* #ifdef H5 */
		position: absolute;
		
		left:50%; 
		
		
		/* #endif */
		background:#fff;
		height: auto;
		
	}
	
	/deep/.uni-numbox-minus,
	/deep/.uni-numbox-value,
	/deep/.uni-numbox-plus{
		width:48rpx;
		height:48rpx;
		border:1px solid rgba(54,134,255,1);
		border-radius:24rpx;
		font-size: 30rpx;
		color:#3686FF;
		line-height: 48rpx;
		background-color: #fff;
	
	}
	/deep/.uni-numbox-value{
		width:100rpx;
		color:#333333;
	}
	/deep/.uni-numbox-minus .yticon,
	/deep/.uni-numbox-plus .yticon{
		color:#3686FF;
	}
	/deep/.uni-numbox-value{
		border:1px solid rgba(255,255,255,1);
		}
	
	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		/* margin-bottom: 100upx; */
		/* #endif */
		position: fixed;
		bottom:0;
		box-sizing: border-box;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		/* border-radius: 16upx; */

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
				vertical-align: text-bottom;
				margin-right:4px;
			}
			text{
				font-size:30rpx;
				
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:52upx;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			/* display: flex; */
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;
			
			.allText{
				
				font-size:30rpx;
				
				font-weight:bold;
				color:rgba(0,0,51,1);
				
			}
			.price {
				
				font-size: $font-lg;
				color: #F75050;
			}

			.coupon {
				display: none;
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			/* padding: 0 38upx; */
			width:auto;
			margin: 0;
			border-radius: 100px;
			height: 80upx;
			line-height: 80upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			/* box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72) */
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
	.delBtn{
		position: absolute;
		right:0;
		width: 190rpx;
		height: 80rpx;
		background: none;
		font-size:30rpx;
		border:solid 1px #F75050;
		color:rgba(247,80,80,1);
		line-height:100rpx;
		margin-right:30rpx;
	}
</style>
