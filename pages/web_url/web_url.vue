<template>
	<view>
		 <web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(option) {
			var url = option.url;
			console.log(option);
			var title = option.title;
			uni.setNavigationBarTitle({
			　　title:title
			})
			this.url = decodeURIComponent(decodeURIComponent(url));
			console.log(this.$data);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
