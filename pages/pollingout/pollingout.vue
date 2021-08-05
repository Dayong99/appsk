<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
		<view class="head flex mauto cwhite sw">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/guanaa.png" class="werrors"></image>
			</view>
			<view class="safe fcenter">更多筛选</view>
		</view>
		<view class="keyword" style="margin-top:80rpx;">计划类型</view>
		<view class="boxmoreVal">
			<view class="boxmore" @tap="limited(0)" :class="{'currentcolor':limit0}">不限</view>
			<view class="boxmore" :class="{'currentcolor':bridgeList0.indexOf(index)>-1}"
				v-for="(item,index) in tabBars0" :key="item.id" @tap="planchoseStatus(item,index,0)">
				{{item}}
			</view>
		</view>
		<view class="keyword" style="margin-top:80rpx;">计划周期</view>
		<view class="boxmoreVal">
			<view class="boxmore" @tap="limited(1)" :class="{'currentcolor':limit1}">不限</view>
			<view class="boxmore" :class="{'currentcolor':bridgeList1.indexOf(index)>-1}"
				v-for="(item,index) in tabBars" :key="item.id" @tap="planchoseStatus(item,index,1)">
				{{item}}
			</view>
		</view>
		<view class="keyword">巡检状态</view>
		<view class="boxmoreVal">
			<view class="boxmore" @tap="limited(2)" :class="{'currentcolor':limit2}">不限</view>
			<view class="boxmore" :class="{'currentcolor':bridgeList2.indexOf(index)>-1}"
				v-for="(item,index) in tabBars1" :key="item.id" @tap="planchoseStatus(item,index,2)">
				{{item}}
			</view>
		</view>
		<view class="keyword">巡检结果</view>
		<view class="boxmoreVal">
			<view class="boxmore" @tap="limited(3)" :class="{'currentcolor':limit3}">不限</view>
			<view class="boxmore" :class="{'currentcolor':bridgeList3.indexOf(index)>-1}"
				v-for="(item,index) in tabBars2" :key="item.id" @tap="planchoseStatus(item,index,3)">
				{{item}}
			</view>
		</view>
		<view class="keyword">巡检超时</view>
		<view class="boxmoreVal">
			<view class="boxmore" @tap="limited(4)" :class="{'currentcolor':limit4}">不限</view>
			<view class="boxmore" :class="{'currentcolor':bridgeList4.indexOf(index)>-1}"
				v-for="(item,index) in tabBars3" :key="item.id" @tap="planchoseStatus(item,index,4)">
				{{item}}
			</view>
		</view>
		<view class="buttonyes" @tap="yesword">查询</view>
		<view class="buttoncancel" @tap="resetVal">重置</view>
	</view>
</template>
<script>
	import {
		beamfieldstatus
	} from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				reservoirId: '',
				personPhone: '',
				checkPoint: '', //点位id，实际来自于扫码

				tabBars0: ['评分计划', '养护计划'],
				tabBars: ['日计划', '周计划', '月计划'],
				tabBars1: ['未巡检', '已巡检'],
				tabBars2: ['巡检正常', '巡检异常'],
				tabBars3: ['未超时', '超时'],
				limit0: true,
				limit1: true,
				limit2: true,
				limit3: true,
				limit4: true,
				index: 5,
				bridgename: '',
				bridegnumber: '',
				abutment: '',
				girdernumber: '',
				bridgeList0: [],
				bridgeList1: [],
				bridgeList2: [],
				bridgeList3: [],
				bridgeList4: [],
			}
		},
		computed: {

		},
		onLoad(options) {
			this.reservoirId = (JSON.parse(options.data)).reservoirId
			this.personPhone = (JSON.parse(options.data)).personPhone
		},
		methods: {
			limited(val) {
				if (val == 0) {
					this.bridgeList0 = []
					this.limit0 = true;
				} else if (val == 1) {
					this.bridgeList1 = []
					this.limit1 = true;
				} else if (val == 2) {
					this.bridgeList2 = []
					this.limit2 = true;
				} else if (val == 3) {
					this.bridgeList3 = []
					this.limit3 = true;
				} else if (val == 4) {
					this.bridgeList4 = []
					this.limit4 = true;
				}
			},
			planchoseStatus(item, index, val) {
				if (val == 0) {
					this.limit0 = false;
					let choseNumber1 = this.bridgeList0.indexOf(index)
					if (choseNumber1 > -1) {
						this.bridgeList0.splice(choseNumber1, 1)
						if (this.bridgeList0.length == 0) {
							this.limit0 = true;
						}
					} else {
						this.bridgeList0.push(index)
						console.log("this.bridgeList0", this.bridgeList0)
					}
				} else if (val == 1) {
					this.limit1 = false;
					let choseNumber1 = this.bridgeList1.indexOf(index)
					if (choseNumber1 > -1) {
						this.bridgeList1.splice(choseNumber1, 1)
						if (this.bridgeList1.length == 0) {
							this.limit1 = true;
						}
					} else {
						this.bridgeList1.push(index)
						console.log("this.bridgeList1", this.bridgeList1)
					}
				} else if (val == 2) {
					this.limit2 = false;
					let choseNumber1 = this.bridgeList2.indexOf(index)
					if (choseNumber1 > -1) {
						this.bridgeList2.splice(choseNumber1, 1)
						if (this.bridgeList2.length == 0) {
							this.limit2 = true;
						}
					} else {
						this.bridgeList2.push(index)
					}
				} else if (val == 3) {
					this.limit3 = false;
					let choseNumber1 = this.bridgeList3.indexOf(index)
					if (choseNumber1 > -1) {
						this.bridgeList3.splice(choseNumber1, 1)
						if (this.bridgeList3.length == 0) {
							this.limit3 = true;
						}
					} else {
						this.bridgeList3.push(index)
					}
				} else if (val == 4) {
					this.limit4 = false;
					let choseNumber1 = this.bridgeList4.indexOf(index)
					if (choseNumber1 > -1) {
						this.bridgeList4.splice(choseNumber1, 1)
						if (this.bridgeList4.length == 0) {
							this.limit4 = true;
						}
					} else {
						this.bridgeList4.push(index)
					}
				}
			},
			// 查询
			yesword() {
				let data = {
					orderType: this.bridgeList0, //计划类型：0、评分计划，1、养护计划,多个用逗号隔开，默认为空
					planType: this.bridgeList1, //计划周期：0、日计划，1、周计划，2、月计划,多个用逗号隔开，默认为空
					inspectionStatus: this.bridgeList2, //巡检状态：0 未巡检、1 已巡检，多个用逗号隔开，默认为空
					inspectionResult: this.bridgeList3, //巡检结果：0 正常、1 异常，多个用逗号隔开，默认为空
					isTimeout: this.bridgeList4, //是否超时：0 否、1 是，多个用逗号隔开，默认为空
					reservoirId: this.reservoirId, //从水库保养地图页过来时传过来的水库id，需要传到更多筛选页，且要传回来
					personPhone: this.$store.getters['user/getAccountInfoData'].phone, //巡检人手机号，需要传到更多筛选页，且要传回来
				}
				uni.redirectTo({
					url: `/pages/workbench/repairDetail?data=${encodeURIComponent(JSON.stringify(data))}`
				})
			},
			stringVal(val) {
				if (val) return '*' + val + '*'
			},
			bindPickerChange(e) {
				this.index = e.target.value
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
			resetVal() {
				this.bridgename = ''
				this.bridegnumber = ''
				this.abutment = ''
				this.girdernumber = ''
				this.index = 5
				this.bridgeList = []
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
		height: 100rpx;
		line-height: 165rpx;

	}

	.boximgs {
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}

	.safe {
		width: 70%;
		padding-left: 80rpx;
		font-size: 33rpx;
		font-family: 'PingFang SC';
		font-weight: 800;
		color: #313131;
	}

	.keyword {
		font-size: 37rpx;
		font-family: 'PingFang SC';
		font-weight: 800;
		margin-left: 34rpx;
		margin-top: 38rpx;
		margin-bottom: 36rpx;
		color: #343434;
	}

	.keyname {
		width: 160rpx;
		height: 79rpx;
		border-right: 1rpx solid #EAE7E7;
		text-align: right;
		padding-right: 33rpx;
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #555555;
	}

	.keyinput {
		width: 526rpx;
		margin-left: 21rpx;
		height: 79rpx;
		line-height: 79rpx;
		margin-top: 20rpx;
	}

	.uni-input-placeholder {
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #E3E3E3;
	}

	.boxmore {
		width: 197rpx;
		height: 71rpx;
		background: #F6F6F6;
		border-radius: 5rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		line-height: 71rpx;
		text-align: center;
		font-weight: 500;
		color: #313131;
		display: inline-block;
		margin: 12rpx 0;
		margin-right: 23rpx;
	}

	.currentcolor {
		background: #E4ECFF;
		border: 1rpx solid #235FED;
	}

	.boxmoreVal {
		width: 666rpx;
		margin: 30rpx auto;
	}

	.planstatus {
		margin-top: 83rpx;
		margin-left: 42rpx;
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
		box-shadow: 0px 7rpx 35rpx 0px rgba(71, 124, 243, 0.8);
		/* 	position: fixed; */
		bottom: 199rpx;
		left: 63rpx;
	}

	.buttoncancel {
		border: 1px solid #BFBFBF;
		margin-top: 10rpx;
		bottom: 69rpx;
		left: 63rpx;
		color: #9C9C9C;
		margin-bottom: 49rpx;
	}

	.werrors {
		width: 29rpx;
		height: 29rpx;
		margin-left: 25rpx;
	}
</style>
