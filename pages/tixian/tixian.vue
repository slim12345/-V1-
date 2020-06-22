<template>
	<view>
		<!-- 输入提现金额 -->
		<form @submit="formSubmit">
			<view class="tixian_cnt">
				<view class="txmoney"><text>提现金额</text></view>
				<view class="input">
					<text>￥</text>
					<input type="number" v-model="money" name="money" :placeholder="'最低' +limit_min+'元起提现'" placeholder-style="color:#CCCCCC;"
					 @input="onInput" />
				</view>
				<view class="viewinput"></view>
				<view class="ts">*每笔最高提现{{limit_max}}元（扣除{{kouchu}}元手续费，费率{{rate}}%）</view>
			</view>
			<!-- 提现到账方式 -->
			<view class="tixian_type">
				<view class="type">
					<text>提现到账方式</text>
				</view>
				<view class="row">
					<view class="payMethod" @click="clickTab(1)">
						<image v-if="currentTab==1" class="bg" src="/static/money_03.png"></image>
						<image v-else class="bg" src="/static/money03.png"></image>
						<view class="typelist">
							<image class="icon" src="/static/money_04.png"></image>
							<text>微信</text>
						</view>
					</view>
					<view class="payMethod" @click="clickTab(2)">
						<image v-if="currentTab==2" class="bg" src="/static/money_03.png"></image>
						<image v-else class="bg" src="/static/money03.png"></image>
						<view class="typelist">
							<image class="icon" src="/static/money_05.png"></image>
							<text>支付宝</text>
						</view>
					</view>
					<view class="payMethod" @click="clickTab(3)">
						<image v-if="currentTab==3" class="bg" src="/static/money_03.png"></image>
						<image v-else class="bg" src="/static/money03.png"></image>
						<view class="typelist">
							<image class="icon" src="/static/money_06.png"></image>
							<text>银行卡</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 支付宝提现表单 -->
			<view class="all" v-if="currentTab==2">
				<view class="tx_xinxi">填写信息</view>
				<view class="tx_show">
					<text>真实姓名</text>
					<input name="full_name" type="text" placeholder="请输入您的真实姓名" />
				</view>
				<view class="tx_show">
					<text>支付宝账号</text>
					<input name="to_account" type="text" placeholder="请输入您的支付宝账号" />
				</view>

			</view>
			<!-- 银行卡提现表单 -->
			<view class="all" v-if="currentTab==3">
				<view class="tx_xinxi">填写信息</view>
				<view class="tx_show">
					<text>银行信息</text>
					<input name="bank" type="text" placeholder="请输入提现银行名称" />
				</view>
				<view class="tx_show">
					<text>开户支行</text>
					<input name="sub_branch" type="text" placeholder="请输入开户支行地址" />
				</view>
				<view class="tx_show">
					<text>开户姓名</text>
					<input name="full_name" type="text" placeholder="请输入开户人姓名" />
				</view>
				<view class="tx_show">
					<text>银行卡号</text>
					<input name="to_account" type="text" placeholder="请输入银行卡号" />
				</view>
			</view>
			<!-- 提交 -->
			<view class="tixian_bottom">
				<!-- <view @click="tj">提交</view> -->
				<button form-type="submit">提交</button>
			</view>
		</form>
		<neil-modal :auto-close="false" :show="show" @close="closeModal()" :title="title" :content="content" @cancel="bindBtn('cancel')"
		 @confirm="bindBtn('confirm')">
		</neil-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 1,
				show: false,
				title: '',
				content: '',
				limit_min: 0,
				limit_max: 0,
				rate: '',
				kouchu: 0,
				money: 0
			}
		},
		onLoad() {
			var that = this;
			that.api.tianxianfee({}, function(res) {
				console.log(res)
				var kouchu = (res.limit_min * res.rate / 100).toFixed(2);
				that.kouchu = kouchu;
				that.limit_max = res.limit_max;
				that.limit_min = res.limit_min;
				that.money = res.limit_min;
				that.rate = res.rate;
			})
		},
		// #ifndef MP-WEIXIN
		onBackPress() {
			// 监听页面返回，自动关闭小键盘
			plus.key.hideSoftKeybord();
		},
		// #endif
		methods: {
			onInput(e) {
				var that = this;
				var money = parseFloat(e.detail.value);
				if (isNaN(money)) {
					money = 0;
				}
				var min = this.limit_min;
				var max = this.limit_max;
				// if (money < min) {
				// 	money = min;
				// }
				if (money > max) {
					money = max;
				}
				var kouchu = (money * this.rate * 0.01).toFixed(2);
				this.kouchu = kouchu;
				setTimeout(function() {
					if (money <= 0) {
						that.money = '';
					} else {
						that.money = money;
					}

					console.log(that.money);
				}, 100);
			},
			//提现接口提交
			formSubmit(e) {
				var that = this;
				this.Click(function(complete) {
					var data = {};
					var type = that.$data.currentTab;
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
					data.type = type;
					if (type == 1) {} else if (type == 2) {
						var full_name = e.detail.value.full_name;
						var to_account = e.detail.value.to_account;
						data.full_name = full_name;
						data.to_account = to_account;
					} else if (type == 3) {
						var bank = e.detail.value.bank;
						var sub_branch = e.detail.value.sub_branch;
						var full_name = e.detail.value.full_name;
						var to_account = e.detail.value.to_account;
						data.full_name = full_name;
						data.to_account = to_account;
						data.bank = bank;
						data.sub_branch = sub_branch;
					}
					console.log(data);
					that.api.Usertianxian(
						data,
						function(res) {

						}, complete);
				})
			},
			// 提现方式切换
			clickTab(e) {
				var that = this;
				this.$data.currentTab = e;
			},
			// 弹出层
			tj(e) {

				this.title = '提现失败';
				this.content = '你的微信未绑定，请前往设置绑定微信';
				this.show = true;
			},
			bindBtn(e) {
				if (e == 'confirm') {
					this.title = '';
					this.content = '';
					this.show = false;
				} else {
					this.title = '';
					this.content = '';
					this.show = false;
				}
			},
			closeModal() {

			}
		},
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	/* 提现到账方式 */
	.type {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		padding: 60rpx 0 42rpx 30rpx;
	}

	.typelist {
		width: 180rpx;
		height: 70rpx;
		font-size: 26rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		position: relative;
		background: rgba(255, 255, 255, 1);
		top: -90rpx;
	}

	.payMethod {
		width: 320rpx;
		height: 90rpx;
		/* border: 4rpx solid rgba(238, 238, 238, 1); */
		border-radius: 10px;
		background: rgba(255, 255, 255, 1);
		margin-bottom: 30rpx;
	}

	.bg {
		width: 320rpx;
		height: 90rpx;
	}

	.icon {
		width: 36rpx;
		height: 28rpx;
		margin-right: 12rpx;
	}

	.row {
		width: 690rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.active {
		background: rgba(255, 255, 255, 1);
		/* border: 4rpx solid rgba(54, 134, 255, 1); */
		top: -90rpx;
	}

	.all {
		width: 100%;
		margin-top: 20rpx;
		margin-bottom: 200rpx;
	}

	/* 提现方式填写表单 */
	.tx_xinxi {
		margin: 40rpx 0 30rpx 30rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1)
	}

	.tx_show {
		width: 690rpx;
		height: 100rpx;
		background: rgba(255, 255, 255, 1);
		margin: 0 30rpx;
		border-bottom: 2rpx solid rgba(238, 238, 238, 1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
	}

	.tx_show input {
		font-size: 30rpx;
		text-align: right;
	}
</style>
