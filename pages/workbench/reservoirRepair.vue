<template>
	<view>
		<map id="myMap" style="width: 750rpx; height: 1624rpx;" :latitude="latitude" :longitude="longitude"
			:markers="covers" :scale="10" @markertap="markertap" show-location>
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 33.307274,
				longitude: 111.473645,
				covers: [{
					id: 0,
					latitude: 33.416192,
					longitude: 111.333893,
					label: {
						content: "庄口水库",
						color: "#22b2ff"
					}
				}, {
					id: 1,
					latitude: 33.404848,
					longitude: 111.244201,
					label: {
						content: "重阳水库"
					}
				}, {
					id: 2,
					latitude: 33.284241,
					longitude: 111.68167,
					label: {
						content: "红山水库"
					}
				}, {
					id: 3,
					latitude: 33.234108,
					longitude: 111.618291,
					label: {
						content: "七峪水库"
					}
				}],
				markerId: null,
				// 巡检页弹出层初始状态
				uniPopup:false,
			}
		},
		onLoad() {
			// let self = this
			// // 获取当前map
			// mapCtx = wx.createMapContext('myMap')
			// self.getAuthorizeInfo()
			// uni.getLocation({
			// 	type: 'gcj02',
			// 	geocode: true, //设置该参数为true可直接获取经纬度及城市信息
			// 	success: function(res) {
			// 		console.log(res)
			// 		that.addrDel = res;
			// 	},
			// 	fail: function() {
			// 		uni.showToast({
			// 			title: '获取地址失败，将导致部分功能不可用',
			// 			icon: 'none'
			// 		});
			// 	}
			// });

			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				}
			});
		},
		methods: {
			// map点击事件
			markertap(e) {
				if (e) {
					this.markerId = e.detail.markerId
				}
				console.log(e.detail.markerId)
				// 从地图页跳转到巡检页
				uni.navigateTo({
					url: "/pages/workbench/repairDetail"
				})
			},


		}
	}
</script>

<style>

</style>
