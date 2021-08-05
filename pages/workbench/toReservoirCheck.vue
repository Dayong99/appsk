<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
		<view class="head flex mauto cwhite sw f34r" style="position: fixed;overflow: hidden;">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">去检查</view>
		</view>
		<view style="padding-top: 150rpx;">
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>检查时间</view>
				<view class="listrig" @click="onShowDatePicker('datetime')">
					<view style="color: #E3E3E3;" v-if="datepent==1">请选择验收时间</view>
					<view v-if="datepent==2">{{datetime}}</view>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" @confirm="onSelectedb"
					@cancel="onSelected" />
				<image src="../../static/rili.png" class="rili"></image>
			</view>

			<!-- 巡检人 -->
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>巡检人</view>
				<!-- <view class="listrig">
					<input class="uni-input" v-model="updatepeoples" style="" type="text" placeholder="请选择整改人">
				</view> -->
				<view class="listrig">
					<picker @change="changePeople" :value="personPicker" :range="personList" :range-key="'personName'">
						<view class="uni-input" v-if="personPicker !==''">{{personList[personPicker].personName}}</view>
						<view class="uni-input" style="color: #E3E3E3;" v-else>请选择巡检人</view>
					</picker>
				</view>
				<image src="../../static/jkpe.png" class="poarrow"></image>
			</view>

			<!-- 检查结果 -->
			<!-- 	<view class="processlist">
				<view class="listleft"><text class="start">*</text>检查结果</view>
				<view class="listrig" style="display: flex;">
					<view v-for="(item,index) in array1" class="singlechose">
						<view class="square" @tap="choseSingle(index)" :class="{'singleconfim':singleconfim==index}">
							<text></text>
						</view>
						<text>{{item}}</text>
					</view>
				</view>
			</view> -->

			<!-- 隐患类型 -->
			<block>
				<view class="processlist">
					<view class="listleft" style="width: 240rpx;"><text class="start">*</text>隐患类型(可多选)</view>
					<checkbox-group @change="checkboxChange">
						<view style="display: flex;">
							<view class="uni-input"
								style=" width: 290rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding-left: 20rpx;"
								v-if="this.checkValue!==''">{{this.checkValue}}</view>
							<view class="check-input" style="color: #E3E3E3;margin-left: -4rpx;" v-else>请选择隐患类型</view>
							<image
								style="width: 15rpx; height: 26rpx;margin-top: 30rpx;margin-left: 430rpx; opacity: 0.4;position: absolute;"
								src="../../static/workbench/imgGo.png" @click="toggle('center')"></image>
						</view>
						<!-- 弹出层 -->
						<uni-popup ref="popup" :animation="false" v-show="uniPopup">
							<view class="popup">
								<!-- 文字提示部分 -->
								<label class="uni-check" v-for="item in items" :key="item.value">
									<view>
										<checkbox style="transform:scale(0.8)" :value="item.value" />
									</view>
									<view>{{item.value}}</view>
								</label>
								<button class="normal" @click="dialogClose()">确定</button>
							</view>
						</uni-popup>
					</checkbox-group>
				</view>
			</block>

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

			<!-- 验收结果 -->
			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>验收结果</view>
				<view class="listrig">
					<textarea placeholder="请输入验收结果" v-model="updatedetails">

					</textarea>
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
		personList
	} from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				items: [{
						value: '不平整',
					},
					{
						value: '有缺损',
					},
					{
						value: '有高大树木',
					},
					{
						value: '有高草',
					},
					{
						value: '有积水',
					},
					{
						value: '有弃物',
					}
				],
				checkValue: '',
				uniPopup: false,
				
				updateimg: [],

				datepent: 1,
				updatedetails: '',
				index: 5,
				array: ['中国', '美国', '巴西', '日本'],
				index1: 5,
				array1: ['正常', '不正常'],
				showPicker: false,
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '',
				range: ['2019/01/01', '2019/01/06'],
				rangetime: ['2019/01/08 14:00', '2019/01/16 13:59'],
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
				personPicker: ''
			}
		},
		computed: {

		},
		components: {
			MxDatePicker
		},
		onLoad(options) {
			this.pollingType = options.pollingType;
			console.log(options)
			if (options.valent) {
				console.log(JSON.parse(options.valent))
				this.parentVal = (JSON.parse(options.valent)).id
			}
			this.getPersonList()
		},
		onShow() {

		},
		methods: {
			// 打开弹框基础内容
			toggle(type) {
				this.uniPopup = true
				this.type = type
				this.$refs.popup.open()
			},
			// 关闭弹框
			dialogClose() {
				this.uniPopup = false,
					this.msgType = 'info'
				this.message = '点击了对话框的取消按钮'
				this.$refs.popup.close()
			},
			// 当复选框发生选择变化时
			checkboxChange(e) {
				// console.log(e)
				console.log(e.detail.value.toString())
				this.checkValue = e.detail.value.toString()
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
			fnOpenWin(type) {
				uni.navigateTo({
					url: `/pages/news/${type}/${type}`
				})
			},
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
