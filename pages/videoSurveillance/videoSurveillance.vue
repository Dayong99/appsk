<template>
	<view class="page_cont" style="background-color: #FFFFFF;">
		<view style="height: 70rpx;background-color: #bfbfbf;width: 750rpx;"></view>
		<view class="video_cont">
			<!-- <view class="back" style="padding-top: 70rpx;z-index: 999;">
						<view class="back_icon" @tap="goBack">
							<image src="../../static/fanhui1.png"></image>
						</view>
						<text>2021-4-14 12:30:45</text>
					</view> -->
			<!-- <cover-image style="width: 50rpx;height: 50rpx;margin-left: 30rpx;"
				src="../../static/workbench/mapBack.png" @tap="goBack">
			</cover-image> -->
			<view class="video" id="canvas" ref="canvas">
				<video id="myVideo" :src="videoSrc" autoplay muted :controls="true" :enable-progress-gesture="false"
					object-fit="fill"></video>
			</view>
			<!-- <cs-ruler @post-NumValue="rulerNum" :maxNum='240' :minNum='0' :pointerColor="'#20BDF1'"></cs-ruler> -->
		</view>
		<!-- <view class="control_cont">
			<view class="mute">静音</view>
			<view class="screenshot" @click="printScreen">截图</view>
			<view class="full_screen">全屏</view>
		</view> -->

		<view class="cloud_cont">
			<view class="monitor-nav">
				<view class="title" v-for="(item,index) in monitorNav" :class="selectIndex==index ? 'active':''"
					@click="chooseNav(index)">{{item}}
					<view class="spoticon"></view>
				</view>
			</view>
			<!-- <view class="cloud" v-show="selectIndex==0">
				<view class="add" @click="turnOn($event,8)">+</view>
				<view class="direction">
					<view class="dire_top" @click="turnOn($event,0)">上</view>
					<view class="dire_bottom" @click="turnOn($event,1)">下</view>
					<view class="close_cloud">{{controlText}}</view>
					<view class="dire_left" @click="turnOn($event,2)">左</view>
					<view class="dire_right" @click="turnOn($event,3)">右</view>
				</view>
				<view class="minus" @click="turnOn($event,9)">-</view>
			</view> -->
			<view class="time-picker">
				<view class="time-picker-box">
					<view class="time-picker-block clearfix">
						<view class="time-picker-text">开始时间:</view>
						<view class="time-picker-cont">
							<uni-datetime-picker type="datetime" :value="start" @change="startTimeChange"
								ref="starttime"></uni-datetime-picker>
							<!-- <a-date-picker
								:allowClear="false"
							    :locale="locale"
								format="YYYY-MM-DD HH:mm:ss"
								:disabled-date="disabledDateEnd"
								:disabled-time="disabledDateTimeEnd"
								:show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
								v-model="timevalueStart"
							    /> -->
							<!-- <view class="timepholder" v-if="datepent==1">请选择日期</view>
							<view class="timevalue" v-if="datepent==2">{{datetime}}</view> -->
							<image class="timeicon" src="../../static/rilitime.png"></image>
						</view>
						<!-- <mx-date-picker :show="showPicker" :type="type" :value="value" @confirm="onSelectedb" @cancel="onSelected" :showSeconds="true"/> -->
					</view>
					<view class="time-picker-block clearfix">
						<view class="time-picker-text">结束时间:</view>
						<view class="time-picker-cont">
							<uni-datetime-picker type="datetime" :value="end" @change="endTimeChange" ref="endtime">
							</uni-datetime-picker>
							<!-- <a-date-picker
									:allowClear="false"
								    :locale="locale"
									format="YYYY-MM-DD HH:mm:ss"
									:disabled-date="disabledDateStart"
									:disabled-time="disabledDateTimeStart"
									:show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
									v-model="timevalueEnd"
								    /> -->
							<image class="timeicon" src="../../static/rilitime.png"></image>
						</view>
						</swiper>
					</view>
					<view class="time-picker-btngroup">
						<button type="primary" @click="handleSearch">查询</button>
						<button type="primary" plain="true" @click="handleReset">重置</button>
						<button type="primary" plain="true" @click="goBack">返回</button>
					</view>
				</view>
			</view>
		</view>
		<image :src="imgSrc" mode=""></image>
	</view>
</template>

<script>
	import Vue from 'vue'
	import appHead from "@/components/appHead/appHead";
	// import uniDatatimePicker from '@/components/uni-datetime-picker/uni-datetime-picker'
	// import uniIcons from '@/components/uni-icons/uni-icons'
	import html2Canvas from "html2canvas"
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	// import moment from 'moment';
	// import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
	import {
		queryById,
		ptzStart,
		ptzStop,
		videoBack
	} from "@/api/AlbumServer.js"
	// import vueScale from "@/components/vueScale/index.vue"
	export default {
		data() {
			return {
				title: "视频监控",
				videoSrc: "",
				deviceId: '',
				deviceNumber: '',
				imgSrc: '',
				channelNo: '',
				serialCode: '',
				startControl: false,
				controlText: '',
				monitorNav: ['视频回放'],
				selectIndex: 0,
				timevalueStart: '',
				timevalueEnd: '',
				// locale,
				showPicker: false,
				value: '',
				type: 'datetime',
				datepent: 1,
				start: '',
				end: ''
			};
		},
		components: {
			appHead,
			MxDatePicker
			// uniDatatimePicker,
			// uniIcons
			// vueScale
		},
		onLoad(option) {
			this.deviceId = option.id;
			this.deviceNumber = option.deviceNumber;
			this.getVideo();
		},
		mounted() {},
		methods: {
			goBack() {
				uni.navigateBack();
			},
			//获取视频地址
			getVideo() {
				queryById({
					id: this.deviceId,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds
				}).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						console.log(res.data)
						this.videoSrc = res.data.result.addressMapExt.hlsHd;
						this.channelNo = res.data.result.addressMapExt.channelNo;
						this.serialCode = res.data.result.addressMapExt.deviceSerial;
						console.log('视频资源', this.videoSrc)
					}
				});
			},
			//开始云台控制
			turnOn(event, type) {
				// this.startControl = true;
				// this.controlText = '关闭';
				let params = {
					channelNo: this.channelNo,
					deviceSerial: this.serialCode,
					direction: type,
					speed: 1
				}
				ptzStart(params).then(res => {
					console.log('结果', res)
				});
			},
			//结束云台控制
			// turnOff() {
			// 	// this.startControl = false;
			// 	this.controlText = '关闭';
			// 	ptzStop({
			// 		channelNo: this.channelNo,
			// 		deviceSerial: this.serialCode,
			// 		direction: 0
			// 	}).then(res => {
			// 		console.log(res)
			// 	});
			// },
			videoErrorCallback(e) {},
			chooseNav(index) {
				this.selectIndex = index;
				if (index == 0) {
					this.getVideo()
					this.handleReset()
				}
			},
			startTimeChange(time) {
				this.start = time;
				// console.log(this.start);
			},
			endTimeChange(time) {
				this.end = time;
			},
			// moment,
			range(start, end) {
				const result = [];
				for (let i = start; i < end; i++) {
					result.push(i);
				}
				return result;
			},
			range2(start, end) {
				const result = [];
				for (let i = start + 1; i < end; i++) {
					result.push(i);
				}
				return result;
			},
			// antd-vue 日历组件
			disabledDateStart(current) {
				// Can not select days before today and today
				var date = new Date(this.timevalueStart)
				var fullYear = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var newdate = new Date(fullYear + '-' + month + '-' + day + ' 00:00:00');
				return current && current < newdate;
			},
			disabledDateTimeStart(type) {
				let disabledDay = new Date(this.timevalueStart).getDate();
				let disabledHour = new Date(this.timevalueStart).getHours();
				// console.log(disabledHour);
				let disabledMinute = new Date(this.timevalueStart).getMinutes();
				let disabledSecond = new Date(this.timevalueStart).getSeconds();
				// console.log(type._d.getHours());
				let disabledTime;
				if (type._d.getDate() != disabledDay) {
					disabledTime = {
						disabledHours: () => [],
						disabledMinutes: () => [],
						disabledSeconds: () => [],
					};
				} else {
					if (type._d.getHours() > disabledHour) {
						disabledTime = {
							disabledHours: () => this.range(0, disabledHour),
							disabledMinutes: () => [],
							disabledSeconds: () => [],
						};
					} else {
						disabledTime = {
							disabledHours: () => this.range(0, disabledHour),
							disabledMinutes: () => this.range(0, disabledMinute),
							disabledSeconds: () => this.range(0, disabledSecond),
						};
						if (type._d.getMinutes() > disabledMinute) {
							disabledTime = {
								disabledHours: () => this.range(0, disabledHour),
								disabledMinutes: () => this.range(0, disabledMinute),
								disabledSeconds: () => [],
							};
						} else {
							disabledTime = {
								disabledHours: () => this.range(0, disabledHour),
								disabledMinutes: () => this.range(0, disabledMinute),
								disabledSeconds: () => this.range(0, disabledSecond),
							};
						}
					}
				}
				return disabledTime;
			},
			disabledDateEnd(current) {
				// Can not select days before today and today
				var date = new Date(this.timevalueEnd)
				var fullYear = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var newdate = new Date(fullYear + '-' + month + '-' + day + ' 23:59:59');
				return current && current > newdate;
			},
			disabledDateTimeEnd(type) {
				let disabledDay = new Date(this.timevalueEnd).getDate();
				let disabledHour = new Date(this.timevalueEnd).getHours();
				// console.log(disabledHour);
				let disabledMinute = new Date(this.timevalueEnd).getMinutes();
				// console.log(disabledMinute)
				let disabledSecond = new Date(this.timevalueEnd).getSeconds();
				// console.log(disabledHour,type._d.getDate());
				let disabledTime;
				if (type._d.getDate() != disabledDay) {
					disabledTime = {
						disabledHours: () => [],
						disabledMinutes: () => [],
						disabledSeconds: () => [],
					};
				} else {
					if (type._d.getHours() < disabledHour) {
						disabledTime = {
							disabledHours: () => this.range2(disabledHour, 24),
							disabledMinutes: () => [],
							disabledSeconds: () => [],
						};
					} else {
						disabledTime = {
							disabledHours: () => this.range2(disabledHour, 24),
							disabledMinutes: () => this.range2(disabledMinute, 60),
							disabledSeconds: () => this.range2(disabledSecond, 60),
						};
						if (type._d.getMinutes() < disabledMinute) {
							disabledTime = {
								disabledHours: () => this.range2(disabledHour, 24),
								disabledMinutes: () => this.range2(disabledMinute, 60),
								disabledSeconds: () => [],
							};
						} else {
							disabledTime = {
								disabledHours: () => this.range2(disabledHour, 24),
								disabledMinutes: () => this.range2(disabledMinute, 60),
								disabledSeconds: () => this.range2(disabledSecond, 60),
							};
						}
					}
				}
				return disabledTime;
			},

			handleTimeChangeOne(value) {

			},
			handleTimeChangeTwo(value) {

			},
			handleSearch() {
				if (this.start == '') {
					uni.showToast({
						title: '请选择开始时间',
						icon: 'none',
						duration: 1000
					});
				} else {
					if (this.end == '') {
						uni.showToast({
							title: '请选择结束时间',
							icon: 'none',
							duration: 1000
						});
					} else {
						let params = {
							channelNo: this.channelNo,
							deviceSerial: this.serialCode,
							protocol: 3,
							quality: 1,
							startTime: this.start,
							stopTime: this.end,
							type: 2
						}
						videoBack(params).then(res => {
							console.log('结果', res)
							if (!res.data.result.success) {
								uni.showToast({
									title: res.data.result.msg,
									icon: 'none',
									duration: 1000
								});
							} else {
								this.videoSrc = res.data.result.url;
							}
						});
					}
				}
			},
			onShowDatePicker(type) { //显示
				this.showPicker = true;
				this.value = this[type];
			},
			onSelectedb(e) {
				this.datepent = 2
				this.showPicker = false;
				this.datetime = e.value;
			},
			// handleClear(){
			// 	this.start = '';
			// 	this.end = '';
			// 	this.$emit('clear',this.start,this.end)
			// },
			handleReset() {
				// console.log("点击了重置")
				// this.timevalueStart = ''
				// this.timevalueEnd = ''
				this.$refs.starttime.clear();
				this.$refs.endtime.clear();
			},

			// rulerNum(value){
			// 	this.NumValue = value
			// 	console.log(this.NumValue)
			// },
			printScreen() {
				setTimeout(() => {
					html2Canvas(document.querySelector('#canvas'), {
						useCORS: true, // 跨域
						scale: 1,
						scrollY: 0,
						scrollX: 0,
					}).then(canvas => {
						let img = canvas.toDataURL('image/png', .5);
						console.log('html2canvas', img)
						this.imgSrc = img
					});
				}, 300)

			}
		},
	};
</script>

<style lang="less" scoped>
	// @import 'ant-design-vue/dist/antd.css';
	.page_cont {
		width: 100%;
		height: 100%;

		.video_cont {
			position: relative;

			.back {
				color: white;
				width: 100%;
				position: absolute;
				top: 10rpx;
				z-index: 222;
				display: flex;
				justify-content: space-between;

				.back_icon {
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
					opacity: 0.6;
					background: #000;
					margin-left: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 48%;
						height: 68%;
					}
				}

				text {
					padding-right: 10rpx;
				}

			}

			.video {
				video {
					width: 100%;
					height: 476rpx;
				}
			}

			.scale-view {
				width: 300px;
				height: 200rpx;
				flex: 1;
			}
		}

		.control_cont {
			color: white;
			height: 110rpx;
			padding: 0 35rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #000;
			margin-top: -8rpx;
		}

		.cloud_cont {
			margin-top: 100rpx;

			.monitor-nav {
				display: flex;
				justify-content: center;

				.title {
					text-align: center;
					font-size: 35rpx;
					color: #666;
					margin-right: 60rpx;
					position: relative;
					font-weight: bold;

					.spoticon {
						width: 55rpx;
						height: 10rpx;
						position: absolute;
						border-radius: 4rpx;
						background: #208FE7;
						bottom: -14rpx;
						left: 50%;
						margin-left: -28rpx;
						display: none;
					}
				}

				.title.active {
					color: #333;

					.spoticon {
						display: block;
					}
				}

				.title:last-child {
					margin-right: 0;
				}
			}

			.cloud {
				margin-top: 80rpx;
				padding: 0 70rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.add,
				.minus {
					font-size: 72rpx;
					color: #ccc;
				}

				.direction {
					position: relative;
					width: 390rpx;
					height: 390rpx;
					background: rgba(192, 181, 181, 0.2);
					border: 1px solid #ccc;
					border-radius: 50%;

					.close_cloud {
						position: absolute;
						width: 116rpx;
						height: 116rpx;
						line-height: 116rpx;
						text-align: center;
						border-radius: 50%;
						top: 132rpx;
						left: 132rpx;
						font-size: 35rpx;
						border: 1px solid #666;
					}

					.dire_top {
						position: absolute;
						top: 40rpx;
						left: 180rpx;
					}

					.dire_bottom {
						position: absolute;
						bottom: 40rpx;
						left: 180rpx;
					}

					.dire_left {
						position: absolute;
						top: 174rpx;
						left: 40rpx;
					}

					.dire_right {
						position: absolute;
						top: 174rpx;
						right: 40rpx;
					}
				}
			}

			.time-picker {
				margin-top: 150rpx;

				.time-picker-box {
					padding-left: 62rpx;
					padding-right: 73rpx;

					.time-picker-block {
						margin-bottom: 42rpx;

						.time-picker-text {
							float: left;
							font-size: 28rpx;
							color: #666;
							margin-right: 20rpx;
							height: 83rpx;
							line-height: 83rpx;
							width: 120rpx;
						}

						.time-picker-cont {
							height: 83rpx;
							float: left;
							width: calc(100% - 140rpx - 2px);
							position: relative;
							border: 1px solid #ccc;
							border-radius: 7rpx;

							// .ant-calendar-picker{
							// 	width: 100%;
							// 	/deep/.ant-calendar-picker-input{
							// 		height: 41px !important;
							// 	}
							// 	/deep/.ant-calendar-picker-icon{
							// 		display: none !important;
							// 	}
							// }
							/deep/.uni-date-editor--logo {
								display: none !important;
							}

							/deep/.uni-input-input {
								color: #333;
								font-weight: bold;
								font-size: 28rpx;
							}

							.timepholder {
								color: rgba(0, 0, 0, 0.65);
								height: 83rpx;
								line-height: 83rpx;
								padding-left: 20rpx;
								width: 100%;
							}

							.timevalue {
								color: #333;
								font-size: 28rpx;
								font-weight: bold;
							}

							.timeicon {
								width: 32rpx;
								height: 32rpx;
								position: absolute;
								top: 27rpx;
								right: 31rpx;
							}
						}
					}

					.time-picker-btngroup {
						margin-top: 84rpx;
						display: flex;
						justify-content: center;

						button {
							margin-right: 69rpx;
							margin-left: 0;
							width: 167rpx;
							height: 69rpx;
							line-height: 69rpx;
							font-size: 35rpx;
						}

						button:last-child {
							margin-right: 0;
						}
					}
				}
			}
		}

		.clearfix:after {
			content: '';
			display: block;
			height: 0;
			clear: both;
			visibility: hidden;
		}

		.clearfix {
			zoom: 1;
		}
	}
</style>
