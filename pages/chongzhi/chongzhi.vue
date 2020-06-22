<template>
	<view>
		<!-- 输入充值金额 -->
		<form @submit="formSubmit">
			<view class="tixian_cnt">
				<view class="txmoney"><text>充值金额</text></view>
				<view class="input">
					<text>￥</text>
					<input type="number" name="money" placeholder="请输入您要充值的金额" placeholder-style="color:#CCCCCC" />
				</view>
				<view class="viewinput"></view>
			</view>
			<!-- 选择支付方式 -->
			<view class="chongzhi_type">
				<view class="type">
					<text>选择支付方式</text>
				</view>
				<view class="cz_typelist border" @click="changetype(1)" v-if="wxpay">
					<view class="cz_name">
						<image class="payicon" src="/static/money_04.png"></image>
						<view>微信</view>
					</view>
					<image v-if="pay_type == 1" class="selectpay" src="/static/money_07.png"></image>
				</view>
				<view class="cz_typelist" @click="changetype(2)" v-if="zfbpay">
					<view class="cz_name">
						<image class="payicon" src="/static/money_05.png"></image>
						<view>支付宝</view>
					</view>
					<image v-if="pay_type == 2" class="selectpay" src="/static/money_07.png"></image>
				</view>
			</view>
			<!-- 立即充值按钮 -->
			<view class="tixian_bottom">
				<button form-type="submit">立即充值</button>
			</view>

		</form>
	</view>
</template>

<script>
	// #ifdef H5
	import jweixin from '@/utils/jwx.js';
	// #endif
	
	export default {
		data() {
			return {
				pay_type: 1,
				zfbpay: true,
				wxpay: true
			}
		},
		onLoad() {
			var that = this;
			var zfbpay = true;
			var wxpay = true;
			// #ifdef MP-WEIXIN
			zfbpay = false;
			// #endif
			// #ifdef H5
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/micromessenger/i) == 'micromessenger') {
				zfbpay = false;
			} else {
				zfbpay = false;
				wxpay = false;
			}
			// #endif
			that.zfbpay = zfbpay;
			that.wxpay = wxpay;
		},
		// #ifndef MP-WEIXIN
		onBackPress() {
			// 监听页面返回，自动关闭小键盘
			plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			formSubmit(e) {
				var that = this;
				this.Click(function(complete) {
					var data = {};
					var pay_type = that.$data.pay_type;
					data.pay_type = pay_type;
					var money = e.detail.value.money;
					if (money == '') {
						that.util.msg('请输入提现金额');
						complete();
						return;
					}
					var tempmoney = parseFloat(money);
					if (isNaN(tempmoney)) {
						that.util.msg('请输入数字金额');
						complete();
						return;
					}
					data.money = tempmoney;
					// #ifdef H5
					var ua = window.navigator.userAgent.toLowerCase();
					if (ua.match(/micromessenger/i) == 'micromessenger') {
						data.wechat_pay_type = 1;
					} else {
						that.util.msg('请在微信中支付！');
						complete();
						return;
					}
					// #endif
					// #ifdef APP-PLUS
					data.wechat_pay_type = 2;
					// #endif
					// #ifdef MP-WEIXIN
					data.wechat_pay_type = 3;
					// #endif
					that.api.Userchongzhi(data, function(res) {
						console.log(res);
						if(data.pay_type == 1){
							// #ifdef H5
							var ua = window.navigator.userAgent.toLowerCase();
							if (ua.match(/micromessenger/i) == 'micromessenger') { //微信公众号
								 jweixin.wxpay({
									 timeStamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
									 nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位  
									 package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
									 signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
									 paySign: res.sign,
								 },function(callback){
									 console.log(callback)
									 uni.navigateBack({
									 });
								 })
								 
							} else { //普通H5
							
							}
							// #endif
						}else if(data.pay_type == 2){   //支付宝
							
						}else{
							
						}
                       
					}, complete);
				})
			},

			//切换支付方式
			changetype(e) {
				this.pay_type = e;
			},
			// 跳转充值结果
			ljcz() {
				uni.navigateTo({
					url: '../payresult/payresult'
				})
			},
		},

	}
</script>

<style>
	page {
		background: #FAFAFA;
	}

	/* 选择支付方式 */
	.chongzhi_type {
		width: 100%;
		background: #FFFFFF;
		margin-top: 20rpx;
	}

	.type {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		padding: 38rpx 0 29rpx 30rpx;
	}

	.cz_typelist {
		width: 690rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 0 30rpx;
		font-size: 30rpx;
		line-height: 100rpx;
	}

	.cz_name {
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cz_name view {
		margin-left: 12rpx;
	}

	.border {
		border-bottom: 2rpx solid rgba(238, 238, 238, 1);
	}

	.cz_typelist .payicon {
		width: 36rpx;
		height: 28rpx;

	}

	.selectpay {
		width: 30rpx;
		height: 21rpx;
	}
</style>
