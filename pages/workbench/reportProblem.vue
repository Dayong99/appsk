<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">上报问题</view>
		</view>

		<view style="padding-top: 147rpx;padding-bottom: 50rpx;">
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>上报时间</view>
				<view class="listrig" @click="onShowDatePicker('datetime')">
					<view style="color: #E3E3E3;" v-if="datepent==1">请选择上报时间</view>
					<view v-if="datepent==2">{{datetime}}</view>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" @confirm="onSelectedb"
					@cancel="onSelected" />
				<image src="../../static/rili.png" class="rili"></image>
			</view>

			<view class="processlist">
				<view class="listleft"><text class="start">*</text>巡检人</view>
				<!-- <view class="listrig">
					<input class="uni-input" @tap="chosepeople" v-model="updatepeoples" style="" type="text"
						placeholder="请选择整改人">
				</view> -->
				<view class="listrig">
					<picker @change="changePollingPeople" :value="index4" :range="personList" :range-key="'personName'">
						<view class="uni-input" v-if="index4!==''">{{personList[index4].personName}}</view>
						<view class="uni-input" style="color: #E3E3E3;" v-else>请选择巡检人</view>
					</picker>
				</view>
				<image src="../../static/jkpe.png" class="poarrow"></image>
			</view>

			<block v-if="pollingType == 0">
				<view class="processlist">
					<view class="listleft"><text class="start">*</text>隐患类型（可多选）</view>
					<view class="listrig">
						<picker @change="problemPickerChange" :value="index3" :range="problemType" :range-key="'name'">
							<view class="uni-input" v-if="index3!==''">{{problemType[index3].name}}</view>
							<view class="uni-input" style="color: #E3E3E3;" v-else>请选择隐患类型</view>
						</picker>
					</view>
					<image src="../../static/jkpe.png" class="poarrow"></image>
				</view>
			</block>

			<view class="processlist">
				<view class="listleft"><text class="start">*</text>指派整改人</view>
				<!-- <view class="listrig">
					<input class="uni-input" v-model="inspectDutyPerson" style="" type="text" placeholder="请选择整改人">
				</view> -->
				<view class="listrig">
					<picker @change="changeDutyPeople" :value="index5" :range="personList" :range-key="'personName'">
						<view class="uni-input" v-if="index5!==''">{{personList[index5].personName}}</view>
						<view class="uni-input" style="color: #E3E3E3;" v-else>请选指派整改人</view>
					</picker>
				</view>
				<image src="../../static/jkpe.png" class="poarrow"></image>
			</view>

			<!-- <view class="processlist">
				<view class="listleft">问题部位</view>
				<view class="listrig">
					<input class="uni-input" v-model="inspectProblemArea" style="" type="text" placeholder="请填写问题部位">
				</view>
			</view> -->
			
			

			<!-- <block v-if="pollingType == 1">
				<view class="processlist">
					<view class="listleft"><text class="start">*</text>隐患类型</view>
					<view class="listrig">
						<picker @change="bindPickerChange" :value="index" :range="array" :range-key="'hazardTypeName'">
							<view class="uni-input" v-if="index!==''">{{array[index].hazardTypeName}}</view>
							<view class="uni-input" style="color: #E3E3E3;" v-else>请选择隐患类型</view>
						</picker>
					</view>
					<image src="../../static/jkpe.png" class="poarrow"></image>
				</view>
				<view class="processlist">
					<view class="listleft"><text class="start">*</text>隐患事件</view>
					<view class="listrig">
						<picker @change="bindPickerChange1" :range-key="'hazardContent'" :value="index1"
							:range="array1">
							<view class="uni-input" v-if="index1!==''">
								{{array1.length > 0? array1[index1].hazardContent: ''}}
							</view>
							<view class="uni-input" style="color: #E3E3E3;" v-else>请选择隐患事件</view>
						</picker>
					</view>
					<image src="../../static/jkpe.png" class="poarrow"></image>
				</view>
			</block> -->

			<view class="processlist">
				<view class="listleft"><text class="start">*</text>整改期限</view>
				<view class="listrig" @click="onShowDatePicker1('datetime1')">
					<view style="color: #E3E3E3;" v-if="datepent1==1">请选择巡检时间</view>
					<view v-if="datepent1==2">{{datetime1}}</view>
				</view>
				<mx-date-picker :show="showPicker1" :type="type" :value="value" @confirm="onSelectedb1"
					@cancel="onSelected" />
				<image src="../../static/rili.png" class="rili"></image>
			</view>
			
			<view class="photolist">
				<view class="listleft">问题图片</view>
				<view style="height: 200rpx;border-bottom: 1rpx solid #e7e7e7;">
					<view v-if="updateimg.length>0" v-for="item in updateimg">
						<view class="model">
							<image :src=item style="width: 100%;height: 100%;"></image>
						</view>
					</view>
					<view class="model" @tap="cI" v-if="updateimg.length!=3">
						<image src="../../static/jiahao.png" class="adds"></image>
						<view>上传照片</view>
					</view>
				</view>
			</view>

			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>问题描述</view>
				<view class="listrig">
					<textarea placeholder="请输入问题描述" v-model="updatedetails">

					</textarea>
				</view>
			</view>
			
			<view class="buttonyes" @tap="yesword">提交</view>
		</view>

		<!-- <view class="buttoncancel" @tap="goback">取消</view> -->
	</view>
	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {
		hiddenlibrary,
		hiddentype,
		qualityadd,
		personList
	} from '@/api/AlbumServer.js'
	components: {
		MxDatePicker
	}
	export default {
		data() {
			return {
				status: 1,
				reservoir: null,
				// 返回至巡检页时弹出层初始状态
				uniPopup: false,
				isConfirm: false, //处理返回逻辑
				datepent: 1,
				datepent1: 1,
				updatedetails: '',
				index: '',
				index1: '',
				array: ['中国', '美国', '巴西', '日本'],
				array1: [],
				showPicker: false,
				showPicker1: false,
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '',
				datetime1: '',
				range: ['2019/01/01', '2019/01/06'],
				rangetime: ['2019/01/08 14:00', '2019/01/16 13:59'],
				value: '',
				value1: '',
				type: 'datetime',
				updatepeoples: '',
				inspectDutyPerson: '',
				inspectProblemArea: '',
				updateresult: '',
				updatepeopleid: '',
				updateimg: [],
				parentVal: '',
				serios: {},
				pollingType: '',
				personList: [],
				index3: '',
				index4: '',
				index5: '',
				problemType: [{
						name: '坝顶积水',
						value: 1
					},
					{
						name: '工程质量通病',
						value: 2
					},
					{
						name: '工程质量事故',
						value: 3
					},
				]
			}
		},
		onLoad(option) {
			// 从“巡检页”跳到“上报问题”页时onload水库数据值，
			// 以解决因“巡检页”页面销毁时水库数据消失（当然了，前提是从“巡检页”跳到“上报问题”时通过路由传递水库数据），
			// 而导致的从“上报问题”页回到“巡检页”时没有数据可以展示的问题
			console.log(option)
			this.reservoir = JSON.parse(decodeURIComponent(option.reservoir));
			console.log(this.reservoir)


			this.pollingType = options.pollingType;
			console.log('polling', this.pollingType)
			// if(options&&options.val){
			// 	this.parentVal=JSON.parse(options.val)
			// 	console.log(this.parentVal)
			// }
			if (options && options.valid) {
				this.parentVal = options.valid
			}
			this.init();
			this.getPersonList();
		},

		onShow() {
			// console.log(this.serios)
			this.updatepeoples = this.serios.title;
			this.updatepeopleid = this.serios.key;
		},

		onBackPress(e) {
			if (this.isConfirm == false) {
				uni.showModal({
					content: '数据尚未保存,你确定要返回吗？',
					success: res => { // 一定要保证this的指向问题，否则会导致无限的弹出modal，可以考虑用that保存this指针或是使用箭头函数
						if (res.confirm) {
							this.isConfirm = true
							uni.navigateBack({ //navigateBack会再次执行onBackPress事件，所以在进入函数的时候我们加了isConfirm来判断是否执行自定义的事件
								// url: `/pages/workbench/reservoirPolling?uniPopup=${this.uniPopup}&reservoir=${encodeURIComponent(JSON.stringify(this.reservoir))}&status=${this.status}`,
								delta: 1
							})
						}
					}
				})
				return true
			} else {
				return false
			}

		},
		methods: {
			// 从“上报问题页”返回“巡检页”时传回水库数据和为null的status值
			goBack() {
				uni.showModal({
					content: '数据尚未保存,你确定要返回吗？',
					success: res => { // 一定要保证this的指向问题，否则会导致无限的弹出modal，可以考虑用that保存this指针或是使用箭头函数
						if (res.confirm) {
							this.isConfirm = true
							uni.navigateTo({
								url: `/pages/workbench/reservoirPolling?uniPopup=${this.uniPopup}&reservoir=${encodeURIComponent(JSON.stringify(this.reservoir))}&status=${this.status}`
							});
						}
					}
				})

			},
			chosepeople() {
				uni.navigateTo({
					url: '../updatepeople/updatepeople'
				})
			},
			init() {
				let params = {
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}
				hiddentype(params).then(res => {
					if (res.status == 200) {
						this.array = res.data.result.records;
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
			chosehidden() {
				if (this.index == 5) {
					uni.showToast({
						title: '请选择隐患类型',
						icon: 'none'
					})
					return
				} else {
					console.log(this.array1)
					this.indexp = true
				}
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
			//问题分类
			problemPickerChange(e) {
				this.index3 = e.target.value + 1;
			},
			//巡检人
			changePollingPeople(e) {
				this.index4 = e.target.value;
				console.log('巡检人', e.target.value)
			},
			//责任人
			changeDutyPeople(e) {
				this.index5 = e.target.value;
				console.log('责任人', e.target.value)
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				let params = {
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					hazardTypeId: this.array[this.index].id
				}
				console.log('请求参数', params)
				this.array1 = [];
				hiddenlibrary(params).then(result => {
					console.log(result.data.result.records)
					if (result.status == 200) {
						if (result.data.result.records.length > 0) {
							console.log('有数据')
							this.array1 = result.data.result.records;
						} else {
							console.log('无数据')
							this.array1 = []
						}
					} else {
						uni.showToast({
							title: '暂无数据',
							icon: 'none'
						})
					}
				})

			},
			bindPickerChange1: function(e) {
				console.log(this.array1)
				this.index1 = 0;
				console.log(e.target.value)
				console.log('picker发送选择改变，携带值为', e.target.value)
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
			yesword() {
				console.log(this.datetime.replace(/\//g, '-'), this.updatedetails)
				if (!this.datetime.replace(/\//g, '-') || this.index ==
					5 || this.index1 == 5 || !this.updatedetails) {
					uni.showToast({
						title: '带*号的不能为空',
						icon: 'none'
					})
					return;
				}

				let data = {
					inspectTime: this.datetime.replace(/\//g, '-') + ':00',
					inspector: this.personList[this.index4].phone,
					inspectDutyPerson: this.personList[this.index5].phone,
					inspectProblemArea: this.inspectProblemArea,
					hazardTypeId: this.pollingType == 1 ? this.array[this.index].id : '',
					hazardContentId: this.pollingType == 1 ? this.array1[this.index1].id : '',
					inspectContent: this.updatedetails,
					inspectValidityTime: this.datetime1.replace(/\//g, '-') + ':00',
					inspectPath: this.updateimg.toString(),
					planId: this.parentVal ? this.parentVal : '',
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					orderType: this.pollingType,
					orderStatus: 0,
					inspectProblemClassify: this.pollingType == 0 ? this.problemType[this.index3].value : ''
				}
				console.log(data)
				qualityadd(data).then(res => {
					console.log(res)
					if (res.status == 200) {
						uni.showToast({
							title: '提交成功'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: this.pollingType == 1 ? '../polling/polling' :
									'../qualityPolling/qualityPolling'
							})
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
			onShowDatePicker1(type) { //显示
				this.showPicker1 = true;
				this.value1 = this[type];
			},
			onSelected() { //选择
				this.showPicker = false;

			},
			onSelectedb(e) {
				this.datepent = 2
				this.showPicker = false;
				this.datetime = e.value;
			},
			onSelectedb1(e) {
				this.datepent1 = 2
				this.showPicker1 = false;
				this.datetime1 = e.value;
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
		background: linear-gradient(0deg, #235FED, #235FED);
		position: fixed;
		z-index: 999;
	}

	.boximgs {
		margin-top: -15rpx;
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}

	.safe {
		margin-top: -20rpx;
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
		width: 365rpx;
		/* border-right: 1rpx solid #EAE7E7; */
		text-align: left;
		padding-left: 27rpx;
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
		margin-top: 110rpx;
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

	/* 	uni-picker{
		height: 100%;
	} */
</style>
