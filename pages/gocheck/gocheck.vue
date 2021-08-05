<template>
	<view style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999; padding-bottom: 40rpx;">
		<view class="head flex mauto cwhite sw f34r" style="background-color: #208FE7;">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">去验收</view>
		</view>
		<view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>验收时间</view>
				<view class="listrig" @click="onShowDatePicker('datetime')" style="margin-left: -20rpx;">
					<view style="text-align: right;">{{time}}</view>
				</view>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>隐患类型</view>
				<view class="listrig">
					{{parentVal.checkPointInfo_dictText}}
				</view>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>验收人</view>
				<view class="listrig">
					{{checkPerson_dictText}}
				</view>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>整改描述</view>
				<view class="listrig">
					{{repairDescribe}}
				</view>
			</view>
			<!-- 整改照片 -->
			<view class="photolist">
				<view class="listleft">整改照片</view>
				<view style="height: 200rpx;border-bottom: 1rpx solid #e7e7e7;">
					<view class="model">
						<image class="image-list" v-for="item in urlLists" :src="item" @click="previewImg(item)">
						</image>
					</view>
				</view>
			</view>
			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>验收意见</view>
				<radio-group @change="radioChange" style="display: flex; margin-left: 16rpx;">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<!-- 验收结果 -->
			<view class="processlist" style="height: 120rpx; margin-bottom: 40rpx;">
				<view class="listleft"><text class="start">*</text>验收结果</view>
				<view class="listrig">
					<input placeholder="请输入验收结果" v-model="checkDescribe">

					</input>
				</view>
			</view>
		</view>
		<view style="margin-top: -20rpx;">
			<view class="buttonyes" @tap="yesword">提交</view>
			<view class="buttoncancel" @tap="goback">取消</view>
		</view>
	</view>
	</view>
</template>
<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {
		hiddendangeredit,
		personList,
		poAcceptance,
		querySafetySubByMainId
	} from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				urlLists: [], //整改图片
				// 实时时间
				time: new Date().toISOString(+new Date() + 8 * 3600 * 1000).substr(0, 4) + new Date(+new Date() + 8 *
					3600 * 1000).toISOString().substr(4, 15).replace(/T/g, " "),
				checkPerson_dictText: '', //验收人
				checkPerson: '', //验收人id
				repairDescribe: '', //整改描述
				checkDescribe: '', //验收结果
				mainId: '', //子表里的mainId
				sonId: '', //子表id
				current: 0,
				items: [{
					value: 0,
					name: '合格'
				}, {
					value: 1,
					name: '不合格'
				}, ],
				updateimg: [],


				datepent: 1,
				updatedetails: '',
				index: 5,
				index1: 5,
				showPicker: false,
				datetime: '',
				value: '',
				type: 'datetime',
				parentVal: {},
				parentId: {},
				checkStatus: 0,
				updatepeopleid: '', //验收人key
				serios: {},
				singleconfim: 1,
				pollingType: '',
				personList: [],
				personPicker: '',
				updateimgList: '',
				nows: ''
			}
		},
		computed: {

		},
		components: {
			MxDatePicker
		},
		onLoad(options) {
			// 有两个页面可以跳入去验收页面，一个是巡检计划隐患整改详情页面（gorectifydetail/gorectifydetail）
			// 一个是我的任务隐患整改单页面（qualityPolling/qualityPolling）
			this.baseUrl = this.$store.state.baseUrl.toString()


			if(options.valentIngorectifydetail) {
				this.parentVal = (JSON.parse(options.valentIngorectifydetail))
				this.valentCome = 'valentIngorectifydetail'
				console.log('巡检计划隐患整改详情页面跳入clicked',this.parentVal.clicked)
			} else if(options.valentInqualityPolling){
				this.parentVal = (JSON.parse(options.valentInqualityPolling))
				this.valentCome = 'valentInqualityPolling'
				console.log('我的任务隐患整改单页面跳入clicked',this.parentVal)
			}
			console.log(this.parentVal, '主表数据')
			this.urlLists = this.parentVal.problemPhotos.split(',')
			this.getNowDate()
			this.getCheckPerson()
		},
		onShow() {
			this.updatepeoples = this.serios.title;
			this.updatepeopleid = this.serios.key;
		},
		methods: {
			getCheckPerson() {
				// 从子表取数据——页面展示或者提交验收时所需参数
				querySafetySubByMainId(this.parentVal.id).then(res => {
					if (res.data.code == 200) {
						this.checkPerson_dictText = res.data.result.records[0].checkPerson_dictText
						this.repairDescribe = res.data.result.records[0].repairDescribe
						this.checkPerson = res.data.result.records[0].checkPerson
						this.mainId = res.data.result.records[0].mainId
						this.sonId = res.data.result.records[0].id
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					}
				})
			},
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
			// 提交验收
			yesword() {
				if (!this.checkDescribe) {
					uni.showToast({
						title: '带*号的不能为空',
						icon: 'none'
					})
					return
				}
				let data = {
					checkStatus: this.checkStatus, //验收意见 0是合格1是不合格
					id: this.sonId, //子表id
					mainId: this.mainId, //子表里的mainId
					checkTime: this.time, //验收时间
					checkPerson: this.checkPerson, //验收人id
					repairDescribe: this.repairDescribe, //整改描述
					repairPath: this.urlLists.toString(), //整改图片
					orderStatus: 2, //已验收
					checkDescribe: this.checkDescribe, //验收结果
				}
				console.log("提交验收data", data)
				//提交验收请求
				poAcceptance(data).then(res => {
					console.log(res, '提交验收res')
					if (res.status == 200) {
						uni.showToast({
							title: '验收成功!'
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
								uni.$emit('refreshData',1)
							}
						}, 1000)
					} else {
						uni.showToast({
							title: '验收失败'
						})
					}
				})
			},
			// 验收意见变化时，在提交时所需的参数this.checkStatus跟着变化
			radioChange: function(evt) {
				this.checkStatus = evt.detail.value
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
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
		/* position: fixed; */
		left: 63rpx;
	}

	.buttoncancel {
		border: 1px solid #BFBFBF;
		margin-top: 20rpx;
		/* position: fixed; */
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

	.uni-textarea-textarea {
		height: 80rpx;
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
