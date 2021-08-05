<template>
	<view style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999; padding-bottom: 40rpx;">
		<view class="head flex mauto cwhite sw f34r" style="background-color: #208FE7;">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">隐患整改详情</view>
		</view>
		<view style="padding-top:154rpx;">
			<view class="Corrective-reply" >发现问题</view>
			<view style="padding-top:5rpx;" >
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>巡检时间</view>
				<view class="listrig">
					<view>{{parentVal.createTime}}</view>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" @confirm="onSelectedb"
					@cancel="onSelected"/>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>检查人</view>
				<view class="listrig">
					{{parentVal.inspector_dictText}}
				</view>
			</view>

			<view class="processlist">
				<view class="listleft"><text class="start">*</text>整改人</view>
				<view class="listrig">
					{{parentVal.repairer_dictText}}
				</view>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>问题部位</view>
				<view class="listrig">
					{{parentVal.checkPointId_dictText}}
				</view>
			</view>
			<block v-if="pollingType == 0">
				<view class="processlist">
					<view class="listleft"><text class="start">*</text>问题类型</view>
					<view class="listrig">
						{{parentVal.checkPointInfo_dictText}}
					</view>
				</view>
			</block>
			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>整改内容</view>
				<view class="listrig">
					{{parentVal.problemContent}}
				</view>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>整改期限</view>
				<view class="listrig">
					{{parentVal.rectificationPeriod}}
				</view>
			</view>
			<!-- 图片附件 -->
			<view class="photolist">
				<view class="listleft">问题图片</view>
				<view style="height: 200rpx;border-bottom: 1rpx solid #e7e7e7;">
					<view class="model">
						<image class="image-list" v-for="item in urlLists" :src="item" @click="previewImg(item)">
						</image>
					</view>
				</view>
			</view>
		</view>
		<view class="Corrective-reply" v-if="parentVal.orderStatusMain == 1 || parentVal.orderStatusMain == 2">整改回复</view>
		<view style="padding-top:5rpx;" v-if="parentVal.orderStatusMain == 1 || parentVal.orderStatusMain == 2">
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>整改人</view>
				<view class="listrig">
					{{parentVal.repairer_dictText}}
				</view>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>整改时间</view>
				<view class="listrig">
					{{parentVal.repaiTime}}
				</view>
			</view>
			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>整改描述</view>
				<view class="listrig">
					{{parentVal.repairDescribe}}
				</view>
			</view>
			<view class="photolist">
				<view class="listleft">整改图片</view>
				<view style="height: 200rpx;border-bottom: 1rpx solid #e7e7e7;">
					<view class="model">
						<image class="image-list" v-for="item in repairImg" :src="item" @click="previewImg(item)">
						</image>
					</view>
				</view>
			</view>
		</view>
		<!-- 已验收详情 -->
		<view class="Corrective-reply" v-if="parentVal.orderStatusMain===2">验收回复</view>
		<view style="padding-top:5rpx;" v-if="parentVal.orderStatusMain==2">
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>验收人</view>
				<view class="listrig">
					{{checkPerson_dictText}}
				</view>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>验收时间</view>
				<view class="listrig">
					{{checkTime}}
				</view>
			</view>

			<view class="processlist">
				<view class="listleft"><text class="start">*</text>是否合格</view>
				<view class="listrig">
					{{parentVal.orderStatusMain==0?'合格':'不合格'}}
				</view>
			</view>
			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>验收结果</view>
				<view class="listrig">
					{{checkDescribe}}
				</view>
			</view>
		</view>
		<view class="buttonyes" v-if="parentVal.orderStatusMain==0" @tap="yesword(0)">去整改</view>
		<view class="buttonyes" v-if="parentVal.orderStatusMain==1" @tap="yesword(1)">去验收</view>
	</view>
	</view>
</template>
<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {
		updaterecords,
		beamfieldstatus,
		hiddendanger, //隐患整改单主表数据
		querySafetySubByMainId //隐患整改单子表数据
	} from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				sonId: '', //隐患整改详情子表数据id
				checkDescribe: '', //验收结果
				checkTime: '', //验收时间
				checkPerson_dictText: '', //验收人
				datepent: 1,
				updatedetails: '',
				index: 5,
				index1: 5,
				showPicker: false,
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '',
				value: '',
				type: 'datetime',
				updatepeoples: '',
				updateresult: '',
				updatepeopleid: '',

				urlLists: [], //问题图片
				repairImg: [], //整改图片

				updateimg: '',
				parentVal: {},
				serios: {},
				pollingType: ''
			}
		},
		computed: {

		},
		components: {
			MxDatePicker
		},
		onLoad(options) {
			this.baseUrl = this.$store.state.baseUrl.toString()
			//在巡检计划页面内点击隐患整改详情时，完全根据传过来的计划id获得主表数据、再根据主表数据获得子表数据
			if (options.planId) {
				this.planId = options.planId.toString()
				console.log('从巡检计划页面传过来的计划id', this.planId)
				this.getData()
				//在隐患整改单里点击隐患整改详情，此时页面的‘问题图片’由通过路由从applist页面所传过来的主表数据获得，其他数据的获得与上面的一样
			} else {
				this.parentVal = JSON.parse(options.lists) //从隐患整改单过来applist的数据
				console.log('从隐患整改单过来applist的数据', this.parentVal)

				this.urlLists = this.parentVal.problemPhotos.split(',')
				this.planId = this.parentVal.planId.toString()
				console.log('从隐患整改单过来计划id', this.planId)
				this.getData()
			}
		},
		onShow() {},
		methods: {
			// 图片放大
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					urls: imgsArray
				});
			},
			// 根据巡检计划页传过来的planId【计划id】获取隐患整改详情主表数据和子表数据
			getData() {
				let arr = {
					planId: this.planId
				}
				hiddendanger(arr).then(res => {
					if (res.data.code == 200) {
						this.parentVal = res.data.result.records[0];
						console.log('获取主表数据', this.parentVal)
						this.urlLists = this.parentVal.problemPhotos.split(',')

						this.sonId = res.data.result.records[0].id;
						console.log('获取子表id', this.sonId)
						// 利用子表id获取子表数据
						querySafetySubByMainId(this.sonId).then(res => {
							if (res.data.code == 200) {
								console.log('子表数据', res.data.result.records[0])
								this.parentVal.repaiTime = res.data.result.records[0].repaiTime //整改时间
								this.parentVal.repairDescribe = res.data.result.records[0]
									.repairDescribe //整改描述
								this.parentVal.repairPath = res.data.result.records[0].repairPath //整改图片
								this.repairImg = this.parentVal.repairPath.split(',')
								this.checkDescribe = res.data.result.records[0].checkDescribe //验收结果
								this.checkTime = res.data.result.records[0].checkTime //验收时间
								this.checkPerson_dictText = res.data.result.records[0]
									.checkPerson_dictText //验收人
								console.log('子表数据this.parentVal', this.parentVal)
							}
						})
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
							url: that.baseUrl + '/sys/common/upload',
							// filePath  需要上传的文件
							filePath: imgFiles,
							name: 'file',
							header: {
								'X-Access-Token': uni.getStorageSync('TOKEN') || '',
							},
							success: (res) => {
								console.log(res.data)
								if (res.statusCode == 200) {
									that.updateimg = (JSON.parse(res.data)).message
									console.log((JSON.parse(res.data)).message)
								}
							}
						});
					}
				})
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			bindPickerChange1: function(e) {
				console.log(e.target.value)
				this.index1 = e.target.value
			},
			/// 跳转打开新窗口
			fnOpenWin(type) {
				uni.navigateTo({
					url: `/pages/news/${type}/${type}`
				})
			},
			goback() {
				uni.navigateBack()
			},
			yesword(item) {
				let parentVal = JSON.stringify(this.parentVal)
				if (item === 1) {
					//跳转到去验收模块
					console.log('跳转到去验收模块')
					uni.navigateTo({
						url: '../gocheck/gocheck?valentIngorectifydetail=' + parentVal
					})

				} else {
					console.log('跳转到去整改模块')
					// 跳转到去整改模块
					uni.navigateTo({
						url: '../gorectify/gorectify?valentIngorectifydetail=' + parentVal
					})
				}
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
	.Corrective-reply {
		height: 68rpx;
		line-height: 68rpx;
		background-color: #EEEEEE;
		padding: 0rpx 44rpx;
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
		font-size: 28rpx;
		color: #999999;
	}

	.listrig {
		width: 543rpx;
		padding-left: 18rpx;
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		/* color: #E3E3E3; */
	}

	.rili {
		width: 30rpx;
		height: 29rpx;
		top: 39rpx;
		right: 35rpx;
		position: absolute;
		z-index: -2;
	}

	page {
		background: #fff;
	}

	.head {
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7);
		position: fixed;
		z-index: 999;
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

	.photolist .listleft {
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		height: 80rpx;
		line-height: 80rpx;
		padding-top: 13rpx;
		padding-bottom: 13rpx;
		color: #555555;
		width: 150rpx;
		text-align: right;
		padding-right: 27rpx;
	}

	.processlist .listleft {
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #555555;
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
		/* color: #E3E3E3; */
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
		margin-top: 20rpx;
		margin-bottom: 50rpx;
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
		/* background: #FBFBFB; */
		/* border: 1rpx solid #EAE7E7; */
		margin-left: 33rpx;
	}

	.model .image-list {
		width: 200rpx;
		height: 160rpx;
		margin-right: 28rpx;
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
</style>
