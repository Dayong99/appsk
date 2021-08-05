<template>
	<view>
		<map id="myMap" style="width: 750rpx; height: 1624rpx;" :latitude="latitude" :longitude="longitude"
			:markers="markers" :scale="10" @markertap="markertap" show-location>
		</map>
	</view>
</template>

<script>
	import {
		getReservoir
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				latitude: 33.307274,
				longitude: 111.473645,
				iconPath: '../../static/b1.png',
				markers: [],
				setMarkers: [],
				reservoirList: [],
				// markers: [{
				// 	id: 0,
				// 	latitude: 33.416192,
				// 	longitude: 111.333893,
				// 	label: {
				// 		content: "庄口水库",
				// 		color: "#22b2ff"
				// 	}
				// }, {
				// 	id: 1,
				// 	latitude: 33.404848,
				// 	longitude: 111.244201,
				// 	label: {
				// 		content: "重阳水库"
				// 	}
				// }, {
				// 	id: 2,
				// 	latitude: 33.284241,
				// 	longitude: 111.68167,
				// 	label: {
				// 		content: "红山水库"
				// 	}
				// }, {
				// 	id: 3,
				// 	latitude: 33.234108,
				// 	longitude: 111.618291,
				// 	label: {
				// 		content: "七峪水库"
				// 	}
				// }, {
				// 	id: 4,
				// 	latitude: 33.420126,
				// 	longitude: 111.168365,
				// 	label: {
				// 		content: "香坊沟水库"
				// 	}
				// }, ],
				markerId: null,
				// 巡检页弹出层初始状态
				uniPopup: false,
			}
		},
		onLoad() {
			this.letGetReservoir()
			uni.getStorage({
				key: 'id', // 储存在本地的变量名
				success: res => {
					// 成功后的回调
					console.log('getStorage成功后的回调', res.data);
					this.markers = res.data
				}
			})

			//获取存储值
			// const markers2 = uni.getStorage('storage_key');
			// console.log('onLoad 获取markers2', this.markers2)
			console.log('onLoad this.markers.length', this.markers)
			console.log('onLoad this.markers.length', this.markers.length)
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				}
			});
		},

		methods: {
			letGetReservoir() {
				let arr = {
					pageNo: 1,
					pageSize: 100,
				}
				getReservoir(arr).then(res => {
					if (res.data.code === 200) {
						this.reservoirList = res.data.result.records
						console.log('获取水库信息', this.reservoirList)
						// setTimeout(() => {
						this.reservoirList.forEach((value, index) => {
								this.setMarkers.push({
									name: value.reservoirName,
									id: value.id,
									latitude: value.latitude,
									longitude: value.longitude,
									label: {
										content: value.reservoirName,
										color: "#22b2ff"
									}
								})
							}

						)
						// }, 1000)
						console.log('getReservoir this.markers.length', this.setMarkers.length)
						uni.setStorage({
							key: 'id', // 存储值的名称
							data: this.setMarkers, //   将要存储的数据
							success: res => {
								// 成功后的回调
								console.log('setStorage成功后的回调', res.errMsg);
							}
						});

					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					}

				})
				console.log('out getReservoir this.markers.length', this.markers.length)
			},
			// map点击事件
			markertap(e) {
				if (e) {
					this.markerId = e.detail.markerId
				}
				console.log('点击时的e',e)
				console.log('点击时的this.markerId',typeof(this.markerId))
				console.log('e.detail.markerId',this.markerId)
				let r = this.markers.filter(v => v.id == this.markerId)
				console.log('r',r)
				// 从地图页跳转到巡检页，并将水库的数据传过去以供使用
				uni.navigateTo({
					url: `/pages/workbench/reservoirPolling?reservoir=${encodeURIComponent(JSON.stringify(this.markers.filter(v => v.id == this.markerId)))}`
				})
			},


		}
	}
</script>

<style>

</style>
