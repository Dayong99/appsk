<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
		<!-- 滚动内容区 -->
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">去整改</view>
		</view>
		<view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>整改时间</view>
				<view class="listrig" @click="onShowDatePicker('datetime')" style="margin-left: -20rpx;">
					<view style="text-align: right;">{{time}}</view>
				</view>
			</view>
			<block>
				<view class="processlist">
					<view class="listleft"><text class="start">*</text>隐患类型</view>
					<input style="margin-left: 12rpx;" :value="parentVal.checkPointInfo_dictText" disabled />
				</view>
			</block>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>验收人</view>
				<view class="listrig">
					<input @tap="chosepeople" class="uni-input" v-model="updatepeoples" type="text"
						placeholder="请选择验收人">
				</view>
			</view>
			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>整改描述</view>
				<view class="listrig">
					<textarea placeholder="请输入整改描述" v-model="updatedetails">

					</textarea>
				</view>
			</view>
			<!-- 验收照片 -->
			<view class="photolist">
				<view class="listleft" style="padding-left: 22rpx;">验收照片(最多3张)</view>
				<view style="height: 200rpx;border-bottom: 1rpx solid #e7e7e7;">
					<view v-if="updateimg.length>0" v-for="item in updateimg">
						<view class="model">
							<image :src=item style="width: 100%;height: 100%;"></image>
						</view>
					</view>
					<view class="model" @tap="cI" v-if="updateimg.length!=3">
						<image src="../../static/workbench/photograph.png" class="adds"></image>
						<view>上传照片</view>
					</view>
				</view>
			</view>
		</view>
		<view class="buttonyes" @tap="yesword" style="top: 1035rpx;">提交</view>
		<view class="buttoncancel" style="position: absolute;top: 1100rpx;" @tap="goback">取消</view>
	</view>
	</view>
</template>
<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {
		hiddendangeredit,
		personList,
		poRectify
	} from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				valentCome:'',
				// 实时时间
				time: new Date().toISOString(+new Date() + 8 * 3600 * 1000).substr(0, 4) + new Date(+new Date() + 8 *
					3600 * 1000).toISOString().substr(4, 15).replace(/T/g, " "),
				updateimg: [],
				updateimgList: '',
				HazardType: '坝顶积水', //隐患类型
				checkValue: '',
				uniPopup: false,

				datepent: 1,
				updatedetails: '', //获取验收结果
				index: 5,
				// array: ['中国', '美国', '巴西', '日本'],
				index1: 5,
				showPicker: false,

				datetime: '',

				value: '',
				type: 'datetime',
				nows: '', //时间戳
				updatepeoples: '',
				serios: {},
				updateresult: '',
				updatepeopleid: '', //选取人员key
				parentVal: '',
				serios: {},
				singleconfim: 1,
				pollingType: '',
				personList: [],
				personPicker: ''
			}
		},
		computed: {

		},
		components: {
			MxDatePicker
		},
		onLoad(options) {
			// 有两个页面可以跳入去整改页面，一个是巡检计划隐患整改详情页面（gorectifydetail/gorectifydetail）
			// 一个是我的任务隐患整改单页面（qualityPolling/qualityPolling）
			this.baseUrl = this.$store.state.baseUrl.toString()
			if(options.valentIngorectifydetail) {
				this.parentVal = (JSON.parse(options.valentIngorectifydetail))
				this.valentCome = 'valentIngorectifydetail'
				console.log('巡检计划隐患整改详情页面跳入',this.valentCome)
			} else if(options.valentInqualityPolling){
				this.parentVal = (JSON.parse(options.valentInqualityPolling))
				this.valentCome = 'valentInqualityPolling'
				console.log('我的任务隐患整改单页面跳入',this.valentCome)
			}
			console.log('1111', this.parentVal)
			this.getPersonList()
			this.getNowDate()
		},
		onShow() {
			console.log('选择人员this.serios',this.serios)
			this.updatepeoples = this.serios.title;
			this.updatepeopleid = this.serios.key;
			console.log('选择人员this.updatepeopleid',this.updatepeopleid)
		},
		methods: {
			getNowDate() {
				var myDate = new Date;
				var year = myDate.getFullYear(); //获取当前年
				var mon = myDate.getMonth() + 1; //获取当前月
				var date = myDate.getDate(); //获取当前日
				var hours = myDate.getHours(); //获取当前小时
				var minutes = myDate.getMinutes(); //获取当前分钟
				var seconds = myDate.getSeconds(); //获取当前秒
				this.nows = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
				return this.nows;
			},
			chosepeople() {
				uni.navigateTo({
					url: '../updatepeople/updatepeople'
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
									that.updateimg.push((JSON.parse(res.data)).message)
									console.log(that.updateimg)
									that.updateimgList = that.updateimg.join(',')
									console.log(that.updateimgList)

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
			fnOpenWin(type) {
				uni.navigateTo({
					url: `/pages/news/${type}/${type}`
				})
			},
			goback() {
				uni.navigateBack()
			},
			// 提交整改
			yesword() {
				console.log(this.updatedetails)
				console.log(this.updatepeopleid)
				let data = {
					repaiTime: this.time, //整改时间
					mainId: this.parentVal.id, //id
					checkPerson: this.updatepeopleid, //验收人，人员传id
					repairDescribe: this.updatedetails, //整改描述
					repairPath: this.updateimgList, //图片附件
					orderStatus: 1,
				}
				console.log(data)
				poRectify(data).then(res => {
					console.log('整改', res)
					if (res.status == 200) {
						uni.showToast({
							title: '整改成功'
						})
						setTimeout(() => {
							// uni.$emit('refreshData');
							// 如果返回巡检计划隐患整改详情页面，则需要返回一步，然后刷新巡检计划隐患整改详情页面
							if(this.valentCome == 'valentIngorectifydetail'){
								uni.navigateBack({
									delta:2
								})
								// uni.$emit('refreshDetailData');
								// 如果返回我的任务隐患整改单页面，则需要返回两步
							} else if(this.valentCome == 'valentInqualityPolling') {
								uni.navigateBack({
									delta:1
								})
								uni.$emit('refreshData2',0)
							}
						}, 500)
					} else {
						uni.showToast({
							title: '整改失败'
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
	.uni-check {
		/* position: relative; */
		display: flex;
		justify-content: flex-start;
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

	.photolist .listleft {
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		height: 80rpx;
		line-height: 80rpx;
		padding-top: 13rpx;
		padding-bottom: 13rpx;
		color: #555555;
		width: 290rpx;

		padding-right: 27rpx;
	}

	.processlist .listleft {
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #555555;
		width: 150rpx;
		border-right: 1rpx solid #EAE7E7;
		/* text-align: right; */
		padding-left: 22rpx;
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
