<template>
	<view style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;background-color: #FFFFFF;">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">巡检计划</view>
			<view @click="scanQR" v-if="this.resRepairData.length != 0">
				<image style="width: 40rpx;height: 40rpx;margin-left: 50rpx;top: 10rpx;"
					src="../../static/reservoirSum/scan.png"></image>
			</view>
		</view>

		<!-- 筛选项 -->
		<view style="position: relative;" v-if="this.resRepairData.length != 0">
			<scroll-view style="display: flex;flex-direction: row;white-space: nowrap;flex-wrap: nowrap;
			overflow: hidden;margin-top: 29rpx;margin-bottom: 21rpx;width: 75%;margin-left: 28rpx;border-right:1rpx solid #fff;"
			:scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto" :scroll-with-animation="true">
				<view v-for="(tab,index) in tabBars" :key="tab.id" class="scroll-bar-finditem" :id="tab.id"
					:data-current="tab.current" :class="{'scroll-bar-finditemsh':indexList.indexOf(index)>-1}"
					@tap="fntabClick(tab,index)">
					{{tab}}
				</view>
			</scroll-view>
			<view class="morescreen" @click="searcgvaky('pollingout')">更多筛选</view>
		</view>

		<!-- 巡检工作 -->
		<view style="background-color: #E8E8E8;">
			<!-- <mescroll-uni @down="downCallback" @up="upCallback" :down="down" :up="up" :top="330" @init="mescrollInit"> -->
			<view v-for="(item,index) in resRepairData" :key="index">
				<view class="beamList" style="padding-bottom: 2rpx;">
					<!-- 计划时间 -->
					<view class="nameplan" style="width: 615rpx;margin-left: -8rpx;">
						<view class="startend">
							<text style="display:inline-block;" v-if="item.planStartTime !=item.planEndTime">
								计划时间:{{item.planStartTime}}至{{item.planEndTime}}
							</text>
							<text style="display:inline-block;" v-else>
								计划时间:{{item.planStartTime}}
							</text>
						</view>
						<view class="plantime">{{plantime[item.planType]}}</view>
					</view>
					<view class="plancontent">
						<view v-for="child in item.planSubList" class="planchildlist">
							<view class="planterm">
								<text class="goplan"
									v-if="child.inspectionStatus==0">{{inspectionStatusList[child.inspectionStatus]}}</text>
								<text class="goplan" v-if="child.inspectionStatus==1"
									style="background: #B0B0B0;">{{inspectionStatusList[child.inspectionStatus]}}</text>
								<image v-if="item.orderType_dictText == '评分计划' "
									src='../../static/reservoirSum/score.png'
									style="width: 30rpx;height: 35rpx;margin-left: 10rpx;top: 10rpx;"></image>
								<text class="godetails">{{child.checkContent}}</text>

							</view>
							<view class="nearmiss" v-if="child.inspectionResult==1">
								<text @tap="hiddendetails(child.id)">隐患整改详情></text>
							</view>
							<view class="contengbox">
								<view class="botmeg">
									<image class="ren" src="../../static/dingwei2.png"></image>
									<text
										style="display: inline-block;margin-right: 35rpx;">{{child.inspector_dictText}}</text>
									<image class="locations" src="../../static/dingwei1.png"></image>
									<text>{{child.checkPoint_dictText}}</text>
								</view>
								<view class="routresult" v-if="child.inspectionStatus==1&&child.inspectionResult==0">
									<image src="../../static/dagou.png"></image>
									<text>检查正常</text>
								</view>
								<view class="routresult" v-if="child.inspectionStatus==1&&child.inspectionResult==1">
									<image src="../../static/gantanhao.png"></image>
									<text style="color:#E7541E">检查异常</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- </mescroll-uni> -->
		</view>
	</view>
</template>
<script>
	import {
		hiddendanger,
		safepolling,
		resRepair //水库保养问题页面列表查询
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				reservoirId: '', //从水库保养地图页过来时传过来的水库id
				planId: '', // 需要传到隐患整改详情里的计划id
				goData: '',
				scanResult: '',
				pageNo: 1,
				pageSize: 1000,
				orderType: '',
				planType: '',
				isTimeout: '',
				inspectionStatus: '',
				inspectionResult: '',
				resRepairData: [],

				up: {
					auto: false //默认开始不执行上拉
				},
				down: {
					auto: false //默认开始不执行下拉
				},

				inspectionStatusList: ['未检查', '已检查'],
				scrollInto: "recommend",
				currenttab: 0,
				tabBars: ['评分计划', '养护计划'],
				indexList: [],
				indexListval: '',
				sercode: {},
				plantime: ['日计划', '周计划', '月计划'],
				mescroll: [null, null],
				freealrent: false,
				isShowEmpty: false,
				pngList: [],
				orderList: ['待整改', '待验收', '已验收'],
				searchIdString: '',
				repairIsOutTime: '',

			}
		},
		computed: {
			schemeing() {
				return this.$store.getters['album/schemeing']
			},
			dangeimg() {
				return this.$store.getters['album/dangeimg']
			},
		},
		onLoad(options) {
			// 当从巡检计划隐患整改详情页面进行整改成功后返回时
			// uni.$on('refreshDetailData',()=> {
				
			// 	this.getData()
			// })
			
			if (options && options.data) {
				this.orderType = (JSON.parse(options.data)).orderType
				this.inspectionStatus = (JSON.parse(options.data)).inspectionStatus
				this.planType = (JSON.parse(options.data)).planType
				this.inspectionResult = (JSON.parse(options.data)).inspectionResult
				this.isTimeout = (JSON.parse(options.data)).isTimeout
				this.reservoirId = (JSON.parse(options.data)).reservoirId
				this.personPhone = (JSON.parse(options.data)).personPhone
			} else {
				console.log('巡检计划页获得了水库数据', options)
				this.reservoirId = options.reservoirId
				console.log('巡检计划页获得了水库id', this.reservoirId)
			}
			this.getData()
		},
		onShow() {},
		methods: {
			// 查询所有类型的结果
			getData() {
				let params = {
					reservoirId: this.reservoirId, //从水库保养地图页过来时传过来的水库id，需要传到更多筛选页，且要传回来
					personPhone: this.$store.getters['user/getAccountInfoData'].phone, //巡检人手机号，需要传到更多筛选页，且要传回来

					orderType: this.orderType, //计划类型：0、评分计划，1、养护计划,多个用逗号隔开，默认为空
					planType: this.planType, //计划类型：0、日计划，1、周计划，2、月计划,多个用逗号隔开，默认为空
					isTimeout: this.isTimeout, //是否超时：0 否、1 是，多个用逗号隔开，默认为空
					inspectionStatus: this.inspectionStatus, //巡检状态：0 未巡检、1 已巡检，多个用逗号隔开，默认为空
					inspectionResult: this.inspectionResult, //巡检结果：0 正常、1 异常，多个用逗号隔开，默认为空

					pageNo: this.pageNo, //第几页，默认第一页
					pageSize: this.pageSize, //每页能显示多少条数据，默认10条
				}
				// 水库保养问题页面列表查询
				resRepair(params).then(res => {
					console.log("水库保养问题页面列表查询params", params)
					if (res.data.result.records.length == 0) {
						uni.showToast({
							title: "暂无内容！",
							icon: 'none',
							duration:850,
						})
						
					} else {
						this.resRepairData = res.data.result.records
						console.log("resRepairData", this.resRepairData)
					}
				})
			},
			// 扫描二维码，并将必要的数据在跳转的同时传到‘扫码结果’页，
			// 使得扫码结果页能够渲染，并且利用获得的数据跳转到‘扫码结果’页
			scanQR() {
				let that = this
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						let result = res.result;
						that.scanResult = result;
						console.log('this.scanResult', that.scanResult)
						let data = {
							checkPoint: that.scanResult, //点位id，实际来自于扫码
							// personPhone: this.$store.getters['user/getAccountInfoData'].phone, //实际来自于注册用户，
							// 由于有为null的情况（用户为管理员时），虽能json（路由传参），但不能解析，所以虽然扫码结果页需要在此处不传
							inspectionStatus: 0, //巡检状态，0-未巡检，只传未巡检的
							reservoirId: that.reservoirId, //从水库保养地图页过来时传过来的水库id
						}
						console.log('跳转到扫码结果页时传的数据', data)
						uni.redirectTo({
							url: `/pages/workbench/inspectionCompleted?data=${encodeURIComponent(JSON.stringify(data))}`
						})
					}
				});
			},
			// 去隐患整改详情页面并传过去巡检计划id，用以获得子表id，从而获得子表中的‘整改时间’、‘整改描述’、‘整改图片’等数据
			hiddendetails(id) {
				this.planId = id
				console.log('需要传到隐患整改详情页面的巡检计划id', this.planId)
				uni.navigateTo({
					url: `/pages/gorectifydetail/gorectifydetail?planId=${this.planId}`
				})
			},
			// 跳转到更多筛选页
			searcgvaky(val, item) {
				console.log(val, item)
				if (val) {
					if (val == 'pollingout') {
						let data = {
							checkPoint: this.scanResult, //点位id，实际来自于扫码
							reservoirId: this.reservoirId, //从水库保养地图页过来时传过来的水库id，需要传到更多筛选页，且要传回来
							personPhone: this.$store.getters['user/getAccountInfoData'].phone, //巡检人手机号，需要传到更多筛选页，且要传回来
						}
						uni.navigateTo({
							url: `/pages/pollingout/pollingout?data=${encodeURIComponent(JSON.stringify(data))}`
						})
					} else {

					}
				}
			},
			goback() {
				uni.navigateBack()
			},
			fntabClick(tab, index) {
				this.$nextTick(function(){
					// 1.1这里用来处理按钮被点击时的样式：因为初始indexList为空，
					// 所以不能从indexList中找到index出现在第几位，所以arrIndex = -1
					let arrIndex = this.indexList.indexOf(index);
					let indexListpre = []//将被选项的内容（‘评分计划’、‘养护计划’）放入该数组
					if (arrIndex > -1) {
						this.indexList.splice(arrIndex, 1)
					} else {
						// 1.2将“评分计划”“养护计划”等传入indexListpre
						indexListpre.push(tab)
						// 1.3将index值传入indexList
						this.indexList.push(index)
						console.log("this.indexList", this.indexList)
					}
					// 1.4判断传入indexList的是哪些值，然后为orderType（评分计划、养护计划）赋值
					if (this.indexList.includes(0) && this.indexList.includes(1)) {
						this.orderType = '0,1'
					} else if (this.indexList.includes(0) && !this.indexList.includes(1)) {
						this.orderType = '0'
					} else if (this.indexList.includes(1) && !this.indexList.includes(0)) {
						this.orderType = '1'
					} else {
						this.orderType = ''
					}
					console.log("orderType", this.orderType)
					this.getData()
				})
				// resetUpScroll会将page.num=1
				// this.mescroll.resetUpScroll(true)
			},
			unique(arr) {
				const res = new Map();
				return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
			},
			updateprocess(val) {
				uni.navigateTo({
					url: '../updateprogress/updateprogress?val=' + JSON.stringify(val)
				})
			},
			fnRefreshData() {
				setTimeout(() => {
					this.mescroll.resetUpScroll(true)
				}, 500)
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll
				this.getData()
			},
			/// 下拉刷新的回调
			downCallback(mescroll) {
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				// this.mescroll.resetUpScroll()
				this.getData()
				console.log('repairDetail页面执行了downCallback方法')
			},
			/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				console.log('repairDetail页面执行了upCallback方法')
			}
		}
	}
</script>

<style scoped lang="less">
	// 向上移动wrapper
	::v-deep .mescroll-uni-fixed {
		height: auto;
		margin-top: -88rpx;
		background-color: #E8E8E8;
	}

	page {
		background: #E8E8E8;
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
		width: 67%;
		padding-left: 80rpx;
	}

	/* 样式 */
	.editpent {
		background: #fff;
		width: 100%;
	}

	.editpent .inputsq {
		border-bottom: 1px solid #E6E6E6;
		width: 573rpx;
		padding-bottom: 21rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #B6C2CE;
	}

	.itemedit {
		height: 124rpx;
		line-height: 146rpx;
		width: 100%;
	}

	.itemedit .a1 {
		width: 177rpx;
		padding-left: 32rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}

	.persons {
		margin-top: 10rpx;
		width: 83rpx;
		height: 83rpx;
		/* position: absolute;
		top:20rpx;
		left: 190rpx; */
	}

	.itemedit text {
		height: 1rpx;
		width: 573rpx;
		background: #D9E2E9;
		margin-top: 125rpx;
	}

	.beamList {
		width: 705rpx;
		/* height: 450rpx; */
		background: #FFFFFF;
		border-radius: 7rpx;
		margin: 19rpx auto;
	}

	.beamtotal {
		height: 93rpx;
		line-height: 93rpx;
		display: flex;
		background: #fff;
		position: relative;
	}

	.beamtotal view {
		width: 50%;
		text-align: center;
	}

	.beamtotal text {
		padding-bottom: 26rpx;
	}

	.nameplan {
		display: flex;
		height: 93rpx;
		border-bottom: 1px solid #eee;
		justify-content: space-between;
		padding-left: 34rpx;
		padding-right: 33rpx;
		margin: 0 auto;
	}


	.beamcurrent {
		color: #235FED;
		border-bottom: 4rpx solid #235FED;
	}



	/* 滑动scroll导航条项*/
	.scroll-bar-finditem {
		display: inline-block;
		line-height: 57rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		height: 57rpx;
		background: #F9F9F9;
		border-radius: 2rpx;
		text-align: center;
		font-size: 24rpx;
		color: #7A7C80;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}

	.scroll-bar-finditemsh {
		color: #313131;
		background: #E4ECFF;
		border: 1px solid #235FED;
	}

	.morescreen {
		position: absolute;
		right: 35rpx;
		top: 0rpx;
		line-height: 57rpx;
		width: 117rpx;
		height: 57rpx;
		font-size: 24rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #7A7C80;
		background: #F9F9F9;
		border-radius: 2rpx;
		text-align: center;
	}

	.searchvalu {
		margin-top: 29rpx;
		margin-bottom: 21rpx;
		margin-left: 38rpx;
		display: flex;
	}

	.serachinput {
		width: 557rpx;
		height: 57rpx;
		background: #F9F9F9;
		display: flex;
		border-radius: 2rpx;
		margin-left: 13rpx;
	}

	.uni-input-placeholder {
		font-size: 24rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #cecece;
		height: 57rpx;
		line-height: 65rpx;
	}

	.free {
		width: 110rpx;
		height: 57rpx;
		background: #F9F9F9;
		font-size: 24rpx;
		font-family: 'PingFang SC';
		line-height: 57rpx;
		text-align: center;
		font-weight: 500;
		color: #7A7C80;
		border-radius: 2rpx;
	}

	.leisure {
		width: 67rpx;
		height: 33rpx;
		background: #2EA62E;
		font-size: 24rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 3rpx;
		margin-top: 29rpx;
		text-align: center;
		margin-right: 7rpx;
		margin-left: 2rpx;
	}

	.fangdajing {
		width: 27rpx;
		height: 27rpx;
		margin-left: 20rpx;
		margin-top: 15rpx;
		margin-right: 13rpx;
	}

	.freetime {
		background: #E4ECFF;
		border: 1px solid #235FED;
	}

	.corre {
		margin-left: 38rpx;
		margin-top: 10rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #57585A;
	}

	.fenxi {
		width: 37rpx;
		height: 37rpx;
		margin-top: -12rpx;
		vertical-align: middle;
		display: inline-block;
	}

	/* 加 */
	.nameplan .plaint {
		width: 25rpx;
		height: 25rpx;
		margin-top: 2rpx;
		margin-right: 15rpx;
		display: inline-block;
		vertical-align: middle;
	}

	.nameplan text {
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #E7541E;
		line-height: 93rpx;
	}

	.nameplan .plan {
		width: 120rpx;
		height: 53rpx;
		line-height: 53rpx;
		text-align: center;
		background: linear-gradient(90deg, #649BFF, #477CF3);
		box-shadow: 0px 7rpx 33rpx 0px rgba(71, 124, 243, 0.8);
		border-radius: 27rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 20rpx;
	}

	.hiddendanger {
		width: 630rpx;
		margin: 24rpx auto;
	}

	.hiddendanger .step {
		width: 75rpx;
		height: 33rpx;
		background: #235FED;
		border-radius: 3rpx;
		font-size: 21rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		display: inline-block;
		margin-right: 12rpx;
		line-height: 34rpx;
	}

	.hiddendanger .step1 {
		background: #B0B0B0;
	}

	.hiddendanger text {
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
		line-height: 40rpx;
	}

	.hiddendanger .pngList {
		margin-top: 25rpx;
		display: flex;
		margin-bottom: 19rpx;
	}

	.pngList .pngClass:nth-of-type(even) {
		margin-right: 21rpx;
		margin-left: 21rpx;
	}

	.pngList .pngClass {
		width: 191rpx;
		height: 133rpx;
	}

	.pngList .pngClass image {
		width: 100%;
		height: 100%;
	}

	.inspection {
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #86878A;
		line-height: 40rpx;
	}

	.gobeamdetail {
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #235FED;
		float: right;
	}

	.check {
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FEFFFF;
		margin-right: 34rpx;
		line-height: 190rpx;
		z-index: 999;
	}

	/* 验收图片 */
	.accept text {}

	.accept image {
		width: 25rpx;
		height: 25rpx;
		vertical-align: middle;
		display: inline-block;
		z-index: 999;
		margin-right: 8rpx;
	}

	/* 巡检计划 */
	.nameplan .startend text {
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}

	.plantime {

		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #1e90e8;
		line-height: 93rpx;
	}

	.plancontent {
		margin: 0 auto;
	}

	.plancontent .planterm {
		margin-bottom: 30rpx;
		margin-top: 24rpx;
	}

	.plancontent .planterm .goplan {
		width: 75rpx;
		height: 33rpx;
		padding: 4rpx 0rpx 2rpx 12rpx;
		background: #208FE7;
		border-radius: 8rpx;
		font-size: 21rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		display: inline-block;
	}

	.plancontent .planterm .godetails {
		/* 	display: inline-block; */
		vertical-align: middle;
		margin-left: 8rpx;
		line-height: 50rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}

	.contengbox {
		display: flex;
		justify-content: space-between;
	}

	.contengbox .routing {
		width: 120rpx;
		height: 53rpx;
		background: linear-gradient(90deg, #649BFF, #477CF3);
		// box-shadow: 0px 7rpx 33rpx 0px rgba(71, 124, 243, 0.8);
		border-radius: 27rpx;
		font-size: 27rpx;
		text-align: center;
		line-height: 53rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		margin-top: -10rpx;
	}

	.botmeg {
		display: flex;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #86878A;
	}

	.botmeg .ren {
		width: 18rpx;
		height: 24rpx;
		margin-top: 6rpx;
		margin-right: 13rpx;
	}

	.botmeg .locations {
		width: 17rpx;
		height: 25rpx;
		margin-top: 6rpx;
		margin-right: 13rpx;
	}

	.planchildlist {
		padding-left: 33rpx;
		padding-right: 33rpx;
		margin: 0 auto;
		padding-bottom: 39rpx;
	}

	.routresult {
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #2EA62E;
	}

	.routresult image {
		width: 25rpx;
		height: 25rpx;
		vertical-align: middle;
		margin-top: -3rpx;
		margin-right: 4rpx;
	}

	.nearmiss text {
		display: block;
		width: 213rpx;
		height: 40rpx;
		background: #DBE6FF;
		border: 1rpx solid #8FADF2;
		border-radius: 3rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		line-height: 40rpx;
		font-weight: 500;
		padding-left: 15rpx;
		color: #235FED;
		margin-bottom: 20rpx;
	}
</style>
