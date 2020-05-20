<template>
	<view>
		    <rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				content:''
			}
		},
		onLoad(option){
			var id = option.id;
			this.id = id;
			var title = option.title;
			uni.setNavigationBarTitle({
			　　title:title
			});
			this.loadData();
		},
		methods: {
			// 获取文章列表
			loadData(){
			var that = this;
			that.api.getbookdetail(
			{id: that.id},
				function(res) {
					console.log(res)
					that.content = res.content;
				});
			},
		}
	}
</script>

<style>

</style>
