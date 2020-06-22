<template>
	<view class="content">
		<view class="top">
			
		
		<view class="uni-form-item uni-column">
			<view class="title">转出数量</view>
			<input class="uni-input" type="digit" placeholder-class="bigpl" maxlength="20" placeholder="可用0.000000" />
			<text class="measure">USDT</text>
			<view class="tip">
				<text class="left">余额：0.0000USDT</text>
				<text class="right">实际到账：0.0000USDT</text>
			</view>

		</view>
		<view class="uni-form-item uni-column">
			<view class="title">转出地址</view>
			<!-- #ifndef H5 -->
			<image src="../../static/icon_test@2x.png" mode="aspectFill" class="scan" @click="getScanCode"></image>
			<image src="../../static/icon_fuzhi@2x.png" mode="aspectFill" class="scan2" @click="paste"></image>
			<!-- #endif -->
			
			<!-- #ifdef H5 -->
			<image src="../../static/icon_test@2x.png" mode="aspectFill" class="scan" @click="getScanCode"></image>
			<image src="../../static/icon_fuzhi@2x.png" mode="aspectFill" class="scan2" @click="copy"></image>
			<!-- #endif -->
			
			<input class="uni-input" type="text" ref='getVal' @input='listenVal' placeholder-class="pl" placeholder="请输入区块链地址" v-model:value='zhuanchuAddress'/>


		</view>
		<view class="uni-form-item uni-column">
			<view class="title">手机验证</view>
			<input class="uni-input" type="" placeholder-class="pl" placeholder="请输入验证码" />
			<text class="getCheckCode" @click="getCheckCode">获取验证码</text>

		</view>
		<view class="uni-form-item uni-column">
			<view class="title">安全密码</view>
			<input class="uni-input" password type="number" placeholder-class="pl" placeholder="请输入6位纯数字安全密码" />
		</view>
		</view>
		<view class="bottom">
			<text> 矿工费：0.000USDT</text>
			<button type="primary">确认</button>
		</view>
		<view class="tips">
			<text class="title1">提币须知</text>
			<text>·提币一旦完成，平台将无法追回；</text>
<text>·最小可提币金额为10USDT;</text>
<text>·可提币金额≤账户可用资金-未经确认的数字资产；</text>
<text>·提币时请确认您网络环境的安全，防止信息被篡改或泄露。</text>
		</view>
	</view>
</template>

<script>
	export default{
		
		data(){
			return{
				zhuanchuAddress:''
			}
		},
		
		methods:{
			listenVal(event){
				console.log(event.target.value.length)
			// 	if(this.$refs.getVal.value.length==0){
			// 		this.copy();
			// 	}
			},
			getCheckCode(){
				// this.api.sendcodeMobile(data, success, complete)
			},
			getScanCode(){
				console.log(111)
				this.api.getScanCode()
			},
			  copy() {
				this.zhuanchuAddress='';
			       let content = 'H5复制插件' // 复制内容，必须字符串，数字需要转换为字符串
			       const result = this.h5Copy(content)
				  
					this.zhuanchuAddress=content;
			      console.log(this.zhuanchuAddress);
			
			     
			    },
			paste(){
				let that=this;
				uni.setClipboardData({
				    data: 'hello',
				    success: function () {
						uni.hideToast();
				        console.log('success');
						uni.getClipboardData({
						    success:function (res) {
							    console.log(res.data);
								that.zhuanchuAddress=res.data;
							}
						});
				    },
				})
			}
			
		}
		
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
	.tips{
		padding:70rpx 20rpx 0rpx;
		.title1{
			font-size:30rpx;
			line-height: 60rpx;
			font-weight: 400;
			
		}
		text{
			display:block;
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:36rpx;
		}
	}
	.scan,.scan2{
		position:absolute;
		z-index: 999;
		width: 50rpx;
		height:50rpx;
		
	}
	.scan{
		right:80rpx;
	}
	.scan2{
		right:0rpx;
	}
	.bigpl{
		font-size:38rpx;
	
		font-weight:bold;
		color:rgba(204,204,204,1);
		
	}
	.pl{
		font-size:28rpx;
	
		font-weight:bold;
		color:rgba(204,204,204,1);
		
	}
	.content{
		padding:40rpx 29rpx;
		.title{
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			line-height:100rpx;
		}
		.uni-input{
			padding-bottom:29rpx;
			border-bottom:solid 1px rgba(204,204,204,1);
				// color:rgba(204,204,204,1);
		}
		
		.uni-column{
			position: relative;
			.measure{
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
				
				position: absolute;
				right:0px;
				bottom:110rpx;
			}
			.tip{
				padding-bottom:20rpx;
				text{
					display: inline-block;
					width:50%;
					font-size:24rpx;
					
					font-weight:600;
					color:rgba(102,102,102,1);
					// line-height:120rpx;
				}
				text.left{
					text-align: left;
				}
				text.right{
					text-align: right;
				}
			}
		}
		
		.getCheckCode{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:#3686FF;
			
			position: absolute;
			right:0px;
			bottom:30rpx;
		}
		.bottom{
			// position: fixed;
			// bottom:20rpx;
			width:100%;
			margin-top: 128rpx;
			text-align: center;
			text{
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:600;
				color:rgba(102,102,102,1);
				line-height:60rpx;
			}
			button{
				width:630rpx;
				height:100rpx;
				background:rgba(54,134,255,1);
				border-radius:50rpx;
				margin:auto;

			}
		}
		}
		
	
</style>
