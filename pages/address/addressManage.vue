<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">收货人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="填写姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">联系电话</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="请填写手机号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">所在地区</text>
			<text @click="chooseLocation" class="input location ">
				{{addressData.addressName}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<!-- <text class="tit">请填写详细地址</text> -->
			
			<textarea class="multiRow"   v-model="addressData.area" placeholder="请填写详细地址" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认地址</text>
			<switch :checked="addressData.default" color="#3686FF" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					name: '',
					mobile: '',
					addressName: '在地图选择',
					address: '',
					area: '',
					default: false
				}
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.default = e.detail.value;
				console.log(e.detail.value)
			},
			
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
			
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.name){
					this.util.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
					this.util.msg('请输入正确的手机号码');
					return;
				}
				if(!data.address){
					this.util.msg('请在地图选择所在位置');
					return;
				}
				if(!data.area){
					this.util.msg('请填写详细地址');
					return;
				}
				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				this.util.prePage().refreshList(data, this.manageType);
				this.util.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				setTimeout(()=>{
					uni.navigateBack()
				}, 800)
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		// height: 110upx;
		background: #fff;
		border-bottom:solid 1px #EEEEEE;
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
			text-align: right;
		}
		.icon-shouhuodizhi{
			font-size: 36rpx;
		
			color: $font-color-light;
		}
		.location{
			display: inline-block;
			line-height: 100rpx;
			margin-right:4px;
		}
		.multiRow{
			font-size:30rpx;
			line-height: 60rpx;
			height:208rpx;
			text-align: left;
			
		}
	}
	.default-row{
		margin-top: 30upx;
		height:100rpx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		// background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
