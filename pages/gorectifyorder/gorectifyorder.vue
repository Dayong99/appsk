<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
		<view class="head flex mauto cwhite sw f34r" style="position: fixed;overflow: hidden;">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter" style="margin-left: -20rpx;">上报问题</view>
		</view>
		<view style="padding-top: 150rpx;">
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>上报时间</view>
				<view class="listrig" @click="onShowDatePicker('datetime')">
					<!-- <view style="color: #E3E3E3;" v-if="datepent==1">请选择上报时间</view> -->
					<view style="text-align: right;">{{this.time}}</view>
				</view>
			</view>

			<!-- 巡检人 -->
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>巡检人</view>
				<view class="listrig">
					<!-- 
					@change="changePeople"——选项发生变化时，将选项存储在本地（有可能会供接口使用）
					:range="personList"——range选择范围、personList从接口获得的、被存储在本地的巡检人、整改人
					personList[personPicker].personName——personPicker当选择发生变化时获取选项的value值，
					对应personList数组里的具有该选项所有信息的那个对象
					v-if="personPicker !==''——回显控制，personPicker为空时显示默认文本‘请选择巡检人’，不为空时显示被选选项
					-->
					<!-- <picker @change="changePeople" :value="personPicker" :range="personList" :range-key="'personName'">
						<view class="uni-input" v-if="personPicker !==''">{{personList[personPicker].personName}}</view>
						<view class="uni-input" style="color: #E3E3E3;" v-else>请选择巡检人</view>
					</picker> -->
					<view style="text-align: right;">
						{{this.$store.getters['user/getAccountInfoData'].username?this.$store.getters['user/getAccountInfoData'].username:this.$store.getters['user/getAccountInfoData'].personName}}
					</view>
				</view>
			</view>

			<!-- 隐患类型 -->
			<block>
				<view class="processlist">
					<view class="listleft" style="width: auto;padding-left: 20rpx;"><text
							class="start">*</text>隐患类型(可多选)</view>
					<checkbox-group @change="checkboxChange" @click="toggle('center')">
						<view style="display: flex;">
							<view class="uni-input"
								style=" width: 290rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding-left: 20rpx;"
								v-if="this.checkValue!==''">{{this.checkValue}}
							</view>
							<view class="check-input" style="color: #E3E3E3;margin-left: -4rpx;width: auto;" v-else>
								请选择隐患类型
							</view>
							<image
								style="width: 15rpx; height: 26rpx;margin-top: 30rpx;margin-left: 420rpx; opacity: 0.4;position: absolute;"
								src="../../static/workbench/imgGo.png">
							</image>
						</view>
						<!-- 弹出层 -->
						<uni-popup ref="popup" :animation="false" v-show="uniPopup">
							<view
								style="width: 400rpx;height: auto;background-color: #FFFFFF; padding: 20rpx 40rpx 30rpx;border-radius: 20rpx;">
								<!-- getHazardTypes——隐患类型被选择范围 -->
								<view style="text-align: center;font-size: 40rpx;font-weight: bold;">选择隐患类型</view>
								<label class="uni-check" style="border-bottom: 1rpx solid #E8E8E8;"
									v-for="item in getHazardTypes" :key="item.typeName">
									<view>
										<checkbox style="transform:scale(0.8)" :value="item.typeName" />
									</view>
									<view>{{item.typeName}}</view>
								</label>
								<view style="padding: 20rpx 0 0 0;">
									<button
										style="width: 190rpx; height: 80rpx;color: #FFFFFF;background-color: #208FE7;border-radius: 45rpx;font-size: 32rpx;"
										@click="dialogClose()">确定</button>
								</view>
							</view>
						</uni-popup>
					</checkbox-group>
				</view>
			</block>

			<!-- 指派整改人 -->
			<view class="processlist">
				<view class="listleft" style="width: 190rpx;padding-left: 20rpx;padding-right: 10rpx;">
					<text class="start">*</text>指派整改人
				</view>
				<view class="listrig">
					<input @tap="chosepeople" class="uni-input" v-model="updatepeoples" style="font-size: 30rpx;"
						type="text" :focus="false" placeholder="请指派整改人">
					</input>
				</view>
				<image src="../../static/jkpe.png" class="poarrow"></image>
			</view>

			<!-- 整改期限 -->
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>整改期限</view>
				<view class="listrig" @click="onShowDatePicker2('datetime2')">
					<view style="color: #E3E3E3;" v-if="datepent==1">请选择整改期限</view>
					<view v-if="datepent==2">{{datetime2}}</view>
				</view>
				<mx-date-picker :show="showPicker2" :type="type" :value="value" @confirm="onSelectedb2"
					@cancel="onSelected" />
				<image src="../../static/rili.png" class="rili"></image>
			</view>

			<!-- 验收照片 -->
			<view class="photolist">
				<view class="listleft">验收照片(最多10张)</view>
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

			<!-- 问题描述 -->
			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>问题描述</view>
				<view class="listrig">
					<textarea placeholder="请输入问题描述" v-model="updatedetails" id="problemText" @input="problemTextInput">
					</textarea>
				</view>
			</view>
		</view>
		<view class="buttonyes" @tap="submit" style="top: 1235rpx;">提交</view>
		<view class="buttoncancel" style="position: absolute;top: 1300rpx;" @tap="goback">取消</view>
	</view>
	</view>
</template>
<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {
		reportProblem, //上报问题接口
		personList, //巡检人、整改人接口
		hazardType, //隐患类型
		personTree, //巡检人列表查询
		putInspectionResult, //改变巡检状态接口，已检查未检查
	} from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				// 实时时间
				time: new Date().toISOString(+new Date() + 8 * 3600 * 1000).substr(0, 4) + new Date(+new Date() + 8 *
					3600 * 1000).toISOString().substr(4, 15).replace(/T/g, " "),

				// 巡检人
				repairName: this.$store.getters['user/getAccountInfoData'].username,

				// 区分数据是从水库保养扫码结果页过来的还是从点位巡检过来的
				problemType: '',

				// 从点位巡检巡检传过来的数据
				status:'',
				uniPopup:'',
				longitude: '',
				latitude: '',
				isCloud: 1,
				content: '',

				// 扫描结果页携带过来的信息
				id: '', //计划id
				checkPoint: '', //点位id
				personPhone: '',
				inspectionStatus: '',
				reservoirId: '', //水库id

				// 巡检人、整改人本地数据

				personList: [], //所有巡检人、整改人本地存储
				personPicker: '', //被选择的巡检人本地存储
				personPicker2: '', //被选择的整改人本地存储

				// 时间选择器本地数据
				datepent: 1, //时间选择器回显、默认显示文本控制
				showPicker: false, //上报时间时间选择器的显示隐藏控制，默认隐藏，在取消时整改期限与之共用
				showPicker2: false, //整改期限时间选择器的显示隐藏控制，默认隐藏
				datetime: '', //上报时间的本地存储
				datetime2: '', //整改期限的本地存储

				baseUrl: '',

				// 弹出层本地数据
				arrCheckPointInfo: [], //隐患类型数组id
				strCheckPointInfo: '', //隐患类型字符串id
				getHazardTypes: [], //隐患类型数据
				hazardTypes: '', // 弹出框被选择项的本地存储
				checkValue: '', //被选中隐患
				arrCheckValue: [], //被选中隐患数组
				uniPopup: false,

				updateimg: [], //上传照片
				updateimgStr: '', //上传图片字符串格式

				strProblemText: '', //问题描述字符串

				updatedetails: '',

				value: '',
				type: 'datetime',
				updatepeoples: '',
				updateresult: '',
				updatepeopleid: '',
				parentVal: '', //从路由传过来的巡检人、整改人

				// 指派整改人本地数据
				serios: {},
				singleconfim: 1,
				pollingType: '',
			}
		},
		computed: {

		},
		components: {
			MxDatePicker
		},
		onLoad(options) {
			this.baseUrl = this.$store.state.baseUrl.toString() //获取照片上传地址
			this.getPersonList() //获取巡检人、整改人

			if (options.valent) {
				console.log(JSON.parse(options.valent))
				this.parentVal = (JSON.parse(options.valent)).id
			}

			// 从扫码结果页传过来的数据planSubId、checkPoint、personPhone、inspectionResult供上报问题时使用
			//从巡检页传过来的数据是点位id（checkPoint）
			if (options && options.completedData) {
				this.id = (JSON.parse(options.completedData)).planSubId //计划id
				this.checkPoint = (JSON.parse(options.completedData)).checkPoint //点位id，实际来自于扫码
				// this.inspectionStatus = (JSON.parse(options.data)).inspectionStatus //即使这个用得到，也应该是inspectionResult
				this.reservoirId = (JSON.parse(options.completedData)).reservoirId //从扫码结果页过来时传过来的水库id
				this.problemType = (JSON.parse(options.completedData)).problemType
				console.log('从扫码结果页传过来的数据', this.id, this.checkPoint, this.reservoirId)
			} else if (options && options.cloudData) { //从点位巡检页面传过来的数据
				this.pollingType = (JSON.parse(options.cloudData)).pollingType
				this.isCloud = (JSON.parse(options.cloudData)).isCloud
				this.checkPoint = (JSON.parse(options.cloudData)).checkPoint
				this.reservoirId = (JSON.parse(options.cloudData)).reservoirId
				this.problemType = (JSON.parse(options.cloudData)).problemType

				this.status = (JSON.parse(options.cloudData)).status
				this.uniPopup = (JSON.parse(options.cloudData)).uniPopup
				this.longitude = (JSON.parse(options.cloudData)).longitude
				this.latitude = (JSON.parse(options.cloudData)).latitude
				this.content = (JSON.parse(options.cloudData)).content
				let opD = (JSON.parse(options.cloudData))
				console.log('从点位巡检页面传过来的数据', opD)
			}

			this.personPhone = this.$store.getters['user/getAccountInfoData'].phone //实际来自于注册用户
			this.getHazardType() //根据通过路由传过来的点位id（checkPointId）获取隐患类型
		},
		onShow() {
			this.updatepeoples = this.serios.title;
			this.updatepeopleid = this.serios.key;
		},
		methods: {
			// 返回扫码结果页，如果返回就意味着正常，则将注释代码放开，并将inspectionResult的值改为0
			// 如果返回意味着需要重新确定状态，即还能点【去检查】,则不需要改动
			goback() {
				uni.showModal({
					title: '提示',
					content: '是否取消上报问题？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.navigateBack()
						} else if (res.cancel) {
							console.log('用户点击取消');
							return
						}
					}
				});
				// let data = {
				// 	planSubId: this.id, //计划id,正常是最好不传的，传了也不要用，否则跳转至查询页时只有这巡检计划数据，而实际上是容许有其他计划数据的
				// 	checkPoint: this.checkPoint, //点位id，实际来自于扫码
				// 	reservoirId: this.reservoirId, //水库id
				// 	inspectionResult: null, //巡检结果，0-正常，1-异常，unll-状态未知
				// }
				// putInspectionResult(data).then(res => { //调用接口，上传巡检结果0-正常
				// 	console.log(res)
				// 	if (res.status == 200) {
				// 		uni.showToast({
				// 			title: '状态修改成功!'
				// 		})
				// 	} else {
				// 		uni.showToast({
				// 			title: '提交失败'
				// 		})
				// 	}
				// })
				// setTimeout(() => {
					// uni.navigateBack()
				// }, 200)
			},
			// 获取巡检人、整改人，已经不需要了，只要获取存储在全局的巡检人username就可以了
			getPersonList() {
				let params = {
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					pageSize: 1000,
				};
				personList(params).then(res => {
					if (res.data.code == 200) {
						this.personList = res.data.result.records;
						// console.log('人员', this.personList)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					}

				})
			},

			// 获取隐患类型数据
			getHazardType() {
				console.log('this.checkPoint', this.checkPoint)
				let params = {
					checkPointId: this.checkPoint,
				}
				hazardType(params).then(res => {
					if (res.data.code == 200) {
						this.getHazardTypes = res.data.result;
						console.log('getHazardTypes', this.getHazardTypes)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					}
				})
			},
			// 打开弹框基础内容
			toggle(type) {
				this.uniPopup = true
				this.type = type
				this.$refs.popup.open()
			},
			// 点击确定、关闭弹框
			dialogClose(e) {
				this.uniPopup = false
				this.msgType = 'info'
				this.message = '点击了对话框的取消按钮'
				this.$refs.popup.close()
				for (let i = 0; i < this.arrCheckValue.length; i++) {
					this.getHazardTypes.find((obj) => {
						if (obj.typeName == this.arrCheckValue[i]) {
							this.arrCheckPointInfo.push(obj.id)
						}
					})
				}
				const set = new Set(this.arrCheckPointInfo);
				this.strCheckPointInfo = [...set].toString()
				// this.strCheckPointInfo = this.arrCheckPointInfo.toString()
				console.log('隐患类型字符串id', this.strCheckPointInfo)
			},
			// 当复选框发生选择变化时，记录被选中隐患
			checkboxChange(e) {
				this.checkValue = e.detail.value.toString()
				this.arrCheckValue = this.checkValue.split(",")
				console.log(e.detail.value.toString(), 'e.detail.value.toString()')
			},

			// 指派整改人处理方法
			chosepeople() {
				uni.navigateTo({
					url: '../updatepeople/updatepeople'
				})
			},

			// 巡检人、整改人选取处理方法
			// 巡检人发生变化时
			changePeople(e) {
				// this.personPicker被选取的巡检人、存储在本地
				this.personPicker = e.target.value;
			},
			// 整改人发生变化时
			changeDutyPeople(e) {
				// this.personPicker2被选取的整改人、存储在本地
				this.personPicker2 = e.target.value;
			},

			// 时间选择器处理方法
			onShowDatePicker(type) { //上报时间显示
				this.showPicker = true;
				this.value = this[type];
			},
			onShowDatePicker2(type) { //整改期限显示
				this.showPicker2 = true;
				this.value = this[type];
			},
			onSelected() { //选择，关闭上报时间时间选择器
				this.showPicker = false;
			},
			onSelected() { //选择，关闭整改期限时间选择器
				this.showPicker2 = false;
			},
			onSelectedb(e) { //上报时间确认
				this.datepent = 2
				this.datetime = e.value; /*上报时间被存储在本地*/
				this.showPicker = false;
			},
			onSelectedb2(e) { //整改期限确认
				this.datepent = 2
				this.showPicker2 = false;
				this.datetime2 = e.value.replace(/\//g, "-"); /*整改期限被存储在本地*/
				console.log('this.datetime2', this.datetime2)
			},

			// 获取问题描述文本
			problemTextInput(e) {
				this.strProblemText = e.detail.value
			},

			// 提交问题
			submit() {
				if (!this.datetime2 || !this.strProblemText) {
					uni.showToast({
						title: '带*号的不能为空',
						icon: 'none'
					})
					return
				}
				if (this.problemType == 'completedProblem') {
					let data = {
						inspectTime: this.time, //上报时间
						inspector: this.$store.getters['user/getAccountInfoData'].phone, //检查人-巡检人
						checkPointInfo: this.strCheckPointInfo, //隐患类型
						repairer: this.updatepeopleid, //整改人
						rectificationPeriod: this.datetime2, //整改期限
						problemPhotos: this.updateimgStr, //问题照片
						problemContent: this.strProblemText, //问题描述


						relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds, //租户

						planId: this.id, //计划id
						checkPointId: this.checkPoint, //点位id，实际来自于扫码
						reservoirId: this.reservoirId, //水库id
						// inspectionStatus: this.inspectionStatus, //巡检结果，此时为1-异常，此时不需要

						// safetySubList: [
						// 	{

						// 	}
						// ] //子表-在整改时需要，上报问题时不需要
					}
					reportProblem(data).then(res => { //调用接口，上传巡检结果0-正常
						console.log('水库保养上报问题页上传参数', data)
						if (res.status == 200) {
							uni.showToast({
								title: '提交成功!'
							})
							setTimeout(() => {
								let data = {
									// planSubId: this.id,
									//计划id,正常是最好不传的，传了也不要用，否则跳转至查询页时只有这巡检计划数据，而实际上是容许有其他计划数据的
									checkPoint: this.checkPoint, //点位id，实际来自于扫码
									inspectionResult: 0, //巡检结果，0-正常，1-异常，并根据计划id和点位id跳转到上报问题页
									reservoirId: this
										.reservoirId, // 为了在上报问题后能够跳转到一开始的水库巡检计划页，此时必须带水库id
								}
								// 提交成功后跳转到回扫码结果页，并传递以上参数
								uni.redirectTo({
									url: `/pages/workbench/inspectionCompleted?problemData=${encodeURIComponent(JSON.stringify(data))}`,
								})
							}, 1000)
						} else {
							uni.showToast({
								title: '提交失败'
							})
						}
					})
				} else if (this.problemType == 'cloudProblem') {
					console.log('执行到了这')
					let data = {
						inspectTime: this.time, //上报时间
						inspector: this.$store.getters['user/getAccountInfoData'].phone, //检查人-巡检人
						checkPointInfo: this.strCheckPointInfo, //隐患类型
						repairer: this.updatepeopleid, //整改人
						rectificationPeriod: this.datetime2, //整改期限
						problemPhotos: this.updateimgStr, //问题照片
						problemContent: this.strProblemText, //问题描述
						isCloud: this.isCloud,

						relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds, //租户

						checkPointId: this.checkPoint,
						reservoirId: this.reservoirId,
					}
					reportProblem(data).then(res => { //调用接口，上传巡检结果0-正常
						console.log('点位巡检上报问题页上传参数', data)
						if (res.status == 200) {
							uni.showToast({
								title: '提交成功!'
							})
							setTimeout(() => {
								let data = {
									status:this.status,
									uniPopup:this.uniPopup,
									longitude: this.longitude,
									latitude: this.latitude,
									content: this.content,
									reservoirId: this.reservoirId
								}
								// 提交成功后跳转到回扫码结果页，并传递以上参数
								uni.redirectTo({
									url: `/pages/workbench/reservoirPolling?problemData=${encodeURIComponent(JSON.stringify(data))}`,
								})
							}, 1000)
						} else {
							uni.showToast({
								title: '提交失败'
							})
						}
					})
				}

			},

			// 上传照片			
			cI() {
				let that = this;
				// 选择图片
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success(res) {
						//因为有一张图片，输出下标[0]， 直接输出地址
						let imgFiles = res.tempFilePaths[0]
						// 上传图片，并做成一个上传对象
						let uper = uni.uploadFile({
							// 需要上传的地址
							// url: 'http://47.118.53.33:9999/sys/common/upload',
							url: that.baseUrl + '/sys/common/upload',
							// filePath  需要上传的文件
							filePath: imgFiles,
							name: 'file',
							header: {
								'X-Access-Token': uni.getStorageSync('TOKEN') || '',
							},
							success: (res) => {
								if (res.statusCode == 200) {
									that.updateimg.push((JSON.parse(res.data)).message)
									console.log('JSON.parse(res.data)).message', (JSON.parse(res.data))
										.message)

									that.updateimgStr = that.updateimg.toString()
									console.log('that.updateimgStr', that.updateimgStr)
								}
							}
						});
					}
				})
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
	.check-input {
		font-size: 30rpx;
		font-weight: 500;
		padding-left: 20rpx;
	}

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
