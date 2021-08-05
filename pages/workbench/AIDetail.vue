<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
		<!-- 滚动内容区 -->
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">AI监测详情</view>
		</view>
		<view>
			<!-- 任务ID -->
			<!-- <view class="processlist">
				<view class="listleft"><text class="start">*</text>任务ID</view>
				<view class="listrig" style="text-align: right;" >
					<view>{{textObj.reservoirId_dictText}}</view>
				</view>
			</view> -->

			<!-- 预警类型 -->
			<!-- 	<view class="processlist">
				<view class="listleft"><text class="start">*</text>预警类型</view>
				<view class="listrig" style="text-align: right;" >
					<view>{{textObj.eventMonitorId_dictText}}</view>
				</view>
			</view> -->
			<!-- 预警规则 -->
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>预警规则</view>
				<view class="listrig" style="text-align: right;">

					<view>{{textObj.eventMonitorId_dictText}}</view>
				</view>
			</view>
			<!-- 关联设备 -->
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>关联设备</view>
				<view class="listrig" style="text-align: right;">
					<view>{{textObj.reservoirId_dictText}}摄像头</view>
				</view>
			</view>
			<!-- 审核状态 -->
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>审核状态</view>
				<view class="listrig" style="text-align: right;">
					<view>{{textObj.checkState_dictText}}</view>
				</view>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>监测时间
				</view>
				<view class="listrig" style="text-align: right;">
					<view>{{textObj.createTime}}</view>
				</view>

			</view>
			<!-- 验收照片 -->
			<view class="processlist1">
				<view class="listleft">
					<text class="start">*</text>抓拍图片
				</view>
				<image class="pro-img" :src="textObj.picUrl" @click="previewImg(textObj.picUrl)"></image>
				</image>

			</view>


		</view>
		<view v-if="textObj.checkState==='0'">
			<view class="buttonyes" style="top: 1080rpx;height: 80rpx;" @click="MonitorPut('1')">核实</view>
			<view class="buttoncancel" style="position: absolute;top: 1150rpx;height: 80rpx;" @click="MonitorPut('2')">
				无效</view>
		</view>

	</view>
	</view>
</template>
<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {
		hiddendangeredit,
		personList,
		putMonitorResult
	} from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				updateimg: [],

				datepent: 1,
				updatedetails: '',
				index: 5,
				// array: ['中国', '美国', '巴西', '日本'],
				index1: 5,
				array1: ['已核实', '未核实'],
				showPicker: false,
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '',
				value: '',
				type: 'datetime',
				updatepeoples: '',
				updateresult: '',
				updatepeopleid: '',
				parentVal: '',
				serios: {},
				singleconfim: 1,
				pollingType: '',
				personList: [],
				personPicker: '',

				textObj: {}

			}
		},
		computed: {

		},
		components: {
			MxDatePicker
		},
		onLoad(options) {
			this.pollingType = options.pollingType;
			const item = JSON.parse(decodeURIComponent(options.textObj));
			this.textObj = item
			var pages = getCurrentPages();
			console.log(options)
			if (options.valent) {
				console.log(JSON.parse(options.valent))
				this.parentVal = (JSON.parse(options.valent)).id
			}
			this.getPersonList()


		},
		methods: {
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					urls: imgsArray
				});
			},
			//审核状态判断 
			MonitorPut(item) {
				console.log(item)
				let arr = {
					id: this.textObj.id,
					checkState: item
				}
				putMonitorResult(arr).then(res => {
					if (res.data.code !== 200) {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});

					} else {
						uni.navigateBack({
											delta: 1
						})
						// uni.redirectTo({
						// 	url: '/pages/workbench/aiMonitor'
						// })
					}
				})
			},

			cI() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['copressed'],
					success(res) {
						//因为有一张图片， 输出下标[0]， 直接输出地址
						var imgFiles = res.tempFilePaths[0]
						console.log(imgFiles)
						// 上传图片
						// 做成一个上传对象
						var uper = uni.uploadFile({
							// 需要上传的地址
							url: 'http://192.168.1.130:9999/sys/common/upload',
							// filePath  需要上传的文件
							filePath: imgFiles,
							name: 'file',
							header: {
								'X-Access-Token': uni.getStorageSync('TOKEN') || '',
							},
							success: (res) => {
								console.log(res.data)
								if (res.statusCode == 200) {
									that.updateimg.push((JSON.parse(res.data)).message)
									console.log((JSON.parse(res.data)).message)
								}
							}
						});
					}
				})
			},

			getPersonList() {
				let params = {
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					pageSize: 50,
				};

				personList(params).then(res => {
					console.log(res.data.code)
					if (res.data.code == 200) {
						this.personList = res.data.result.records;
						console.log('人员', this.personList)
					}

				})
			},
			changePeople(e) {
				this.personPicker = e.target.value;
			},
			choseSingle(index) {
				this.singleconfim = index;
			},
			/// 跳转打开新窗口
			// fnOpenWin(type) {
			// 	uni.navigateTo({
			// 		url: `/pages/news/${type}/${type}`
			// 	})
			// },
			goback() {
				uni.navigateBack()
			},
			yesword() {
				if (!this.datetime.replace(/\//g, '-')) {
					uni.showToast({
						title: '带*号的不能为空',
						icon: 'none'
					})
					return
				}
				let data = {
					checkPerson: this.personList[this.personPicker].phone,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					checkDescribe: this.updatedetails,
					id: this.parentVal,
					checkStatus: this.singleconfim,
					orderStatus: 2,
					checkTime: this.datetime.replace(/\//g, '-') + ':00',
					orderType: this.pollingType
				}
				console.log(data)
				hiddendangeredit(data).then(res => {
					console.log(res)
					if (res.status == 200) {
						uni.showToast({
							title: '提交成功!'
						})
						setTimeout(() => {
							uni.navigateBack({})
						}, 1000)
					} else {
						uni.showToast({
							title: '提交失败'
						})
					}
				})
			},
			onShowDatePicker(type) { //显示
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected() { //选择
				this.showPicker = false;

			},
			onSelectedb(e) {
				this.datepent = 2
				this.showPicker = false;
				this.datetime = e.value;
			},
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
		}
	}
</script>

<style>
	.pro-img {
		width: 200rpx;
		height: 144rpx;
		margin-top: 24rpx;
		margin-right: 28rpx;


	}



	page {
		background: #fff;
	}

	.head {
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7);
	}

	.boximgs {
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}

	.safe {
		width: 70%;
		padding-left: 80rpx;
	}

	.processlist {
		height: 80rpx;
		line-height: 80rpx;
		padding-top: 13rpx;
		padding-bottom: 13rpx;
		border-bottom: 1rpx solid #EAE7E7;
		display: flex;
		position: relative;
	}

	.processlist1 {
		height: 204rpx;
		line-height: 204rpx;
		padding-top: 13rpx;
		padding-bottom: 13rpx;
		border-bottom: 1rpx solid #EAE7E7;
		display: flex;
		justify-content: space-between;
		margin-left: 20rpx;
	}

	.processlist1 .listleft {
		font-family: PingFang-SC-Bold;
		font-weight: Bold;
		color: #333333;
		padding-right: 17rpx;
		border-right: 1rpx solid #EAE7E7;
	}

	.processlist1 {
		height: 204rpx;
		line-height: 204rpx;
		padding-top: 13rpx;
		padding-bottom: 13rpx;
		border-bottom: 1rpx solid #EAE7E7;
		display: flex;
		justify-content: space-between;
		margin-left: 20rpx;

	}

	.processlist1 .listleft {
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #333333;
		width: 140rpx;
		padding-right: 17rpx;
		border-right: 1rpx solid #EAE7E7;
	}

	.photolist .listleft {
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		height: 80rpx;
		line-height: 80rpx;
		padding-top: 13rpx;
		padding-bottom: 13rpx;
		color: #333333;
		width: 290rpx;
		text-align: right;
		padding-right: 27rpx;
	}

	.processlist .listleft {
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #333333;
		width: 150rpx;
		border-right: 1rpx solid #EAE7E7;
		text-align: right;
		padding-right: 27rpx;
	}

	.listrig {
		width: 543rpx;
		padding-left: 18rpx;
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #55555;
	}

	.poarrow {
		position: absolute;
		width: 13rpx;
		height: 23rpx;
		right: 41rpx;
		top: 39rpx;
		z-index: -2;
	}

	/* 样式 */
	.start {
		color: red;
		margin-top: 14rpx;
	}

	.buttonyes,
	.buttoncancel {
		width: 625rpx;
		height: 90rpx;
		border-radius: 45rpx;
		font-size: 35rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		margin: 0 auto;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
	}

	.buttonyes {
		background: #649AFF;
		position: fixed;
		bottom: 79rpx;
		left: 63rpx;
	}

	.buttoncancel {
		border: 1px solid #BFBFBF;
		margin-top: 40rpx;
		position: fixed;
		bottom: 69rpx;
		left: 63rpx;
		color: #9C9C9C;
	}

	textarea {
		margin-top: 18rpx;
		width: 540rpx;
	}

	.model {
		width: 200rpx;
		height: 167rpx;
		background: #FBFBFB;
		border: 1rpx solid #EAE7E7;
		margin-left: 33rpx;
		float: left;
	}

	.model .adds {
		width: 31rpx;
		height: 31rpx;
		margin-top: 55rpx;
		margin-left: 85rpx;
	}

	.model view {
		font-size: 20rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #808184;
		text-align: center;
	}

	.uni-textarea-placeholder {
		color: #E3E3E3;
	}

	.rili {
		width: 30rpx;
		height: 29rpx;
		top: 39rpx;
		right: 35rpx;
		position: absolute;
		z-index: -2;
	}

	uni-input {
		padding-top: 20rpx;
	}

	.uni-input-placeholder {
		color: #E3E3E3
	}

	.singlechose {
		display: flex;
		justify-content: space-between;
	}

	.square {
		width: 40rpx;
		height: 40rpx;
		position: relative;
		border: 1px solid #E1E1E1;
		border-radius: 50%;
		display: inline-block;
		margin-top: 18rpx;
		margin-left: 43rpx;
		margin-right: 17rpx;
	}

	.square text {
		width: 13rpx;
		height: 13rpx;
		border-radius: 50%;
		display: inline-block;
		position: absolute;
		top: 34%;
		left: 36%
	}

	.singleconfim text {
		background: #235FED;
	}
</style>
