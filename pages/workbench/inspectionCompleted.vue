<template>
	<view style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;background-color: #FFFFFF;">
		<view class="flex mauto cwhite sw f34r" style="width: 100%;height: 153rpx;line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7);">
			<view style="margin-left: 375rpx;transform: translate(-50%,0);">扫码结果</view>
		</view>

		<!-- 巡检工作 -->
		<view style="background-color: #E8E8E8;padding-top: 5rpx;">
			<!-- <mescroll-uni @down="downCallback" @up="upCallback" :down="down" :up="up" :top="330" @init="mescrollInit"> -->
			<view v-for="(item,index) in scanResRepairData" :key="index">
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
								<text @tap="hiddendetails(child)">隐患整改详情></text>
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
								<view class="routing"
									@click="searcgvaky('center',item.planSubList[0].id,child.checkPoint_dictText,child.checkContent)">
									去检查
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- </mescroll-uni> -->
		</view>

		<!-- 弹出层 -->
		<uni-popup ref="popup" :animation="false" v-show="uniPopup">
			<view style="margin-top: 120rpx;
		background-color: #fff;
		width: 500rpx;
		height: auto;
		border-radius: 10rpx;
		padding: 40rpx;">
				<!-- 文字提示部分 -->
				<view style="font-size: 50rpx;
		text-align: center;">
					{{this.checkPointText}}
				</view>
				<view style="padding: 30rpx;
		color: #666666">
					{{this.checkContent}}
				</view>
				<!-- 操作按钮部分-->
				<view style="margin-top: 70rpx;">
					<button style="border-radius: 50rpx;
		width: 340rpx;
		height: 90rpx;
		background: #1dbc60;
		color: #FFFFFF;" @click="dialogClose()">正常</button>
				</view>
				<view style="margin-top: 30rpx;">
					<button style="border-radius: 50rpx;
		width: 340rpx;
		height: 90rpx;
		background: #f18424;
		color: #FFFFFF;" @click="goProblem()">异常</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import {
		hiddendanger,
		safepolling,
		resRepair,
		putInspectionResult,
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				reservoirId: '', //从扫码结果页过来时传过来的水库id
				id: '', //计划id
				checkPoint: '',
				personPhone: '',
				inspectionStatus: '',

				pageNo: 1,
				pageSize: 10,
				orderType: '',
				planType: '',
				isTimeout: '',
				inspectionResult: '',
				scanResRepairData: [],

				uniPopup: '', //弹出层初始化
				checkPointText: '',
				checkContent: '',

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
				repairIsOutTime: ''
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
			if (options && options.data) {
				console.log("从巡检计划页面扫码过来的", options)
				this.checkPoint = (JSON.parse(options.data)).checkPoint //通过路由将点位id传至本页面
				this.inspectionStatus = (JSON.parse(options.data)).inspectionStatus
				this.reservoirId = (JSON.parse(options.data)).reservoirId
				this.personPhone = this.$store.getters['user/getAccountInfoData'].phone
				console.log('扫码结果页获得了水库id，手机号', this.reservoirId, this.personPhone)
			} else if (options && options.problemData) {
				console.log("从上报问题页过来的数据", options)
				this.checkPoint = (JSON.parse(options.problemData)).checkPoint //通过路由将点位id传至本页面
				this.inspectionStatus = 0
				this.reservoirId = (JSON.parse(options.problemData)).reservoirId
				this.personPhone = this.$store.getters['user/getAccountInfoData'].phone
			}
			this.getData()
		},
		onShow() {},
		methods: {
			// 打开基础内容
			searcgvaky(type, id, checkPointText, checkContent) {
				this.uniPopup = true
				this.type = type
				this.$refs.popup.open()
				this.id = id
				this.checkPointText = checkPointText
				this.checkContent = checkContent
				console.log('item.id', id)
				console.log('this.checkPointText', this.checkPointText)
				console.log('this.checkContent', this.checkContent)
			},
			// 对话框的‘正常’按钮，点击提交并关闭对话框
			dialogClose() {
				this.msgType = 'info'
				this.message = '点击了对话框的正常按钮'
				this.$refs.popup.close()
				this.status = 0
				let data = {
					planSubId: this.id, //计划id
					inspectionResult: 0, //必须传的，巡检结果，0-正常
				}
				putInspectionResult(data).then(res => { //调用接口，上传巡检结果0-正常
					console.log('this.id', this.id)
					if (res.status == 200) {
						uni.showToast({
							title: '提交成功!'
						})
						setTimeout(() => {
							this.getData()
						}, 500)
					} else {
						uni.showToast({
							title: '提交失败'
						})
					}
				})
			},

			// 对话框‘异常’、进入上报问题页按钮
			goProblem(reservoir) {
				this.status = 1
				this.uniPopup = false
				let data = {
					planSubId: this.id, //计划id,正常是最好不传的，传了也不要用，否则跳转至查询页时只有这巡检计划数据，而实际上是容许有其他计划数据的
					checkPoint: this.checkPoint, //点位id，实际来自于扫码
					reservoirId: this.reservoirId, //水库id
					inspectionResult: 1, //巡检结果，0-正常，1-异常，并根据计划id和点位id跳转到上报问题页
				}
				// // 也可以直接跳到上报问题页，并传递以上除了inspectionResult的数据，
				// // 只有在上报问题页提交时，才修改inspectionResult的状态为1
				// uni.redirectTo({
				// 	url: `/pages/gorectifyorder/gorectifyorder?data=${encodeURIComponent(JSON.stringify(data))}`
				// })
				putInspectionResult(data).then(res => { //调用接口，上传巡检结果0-正常
					console.log(res)
					if (res.status == 200) {
						uni.showToast({
							title: '提交成功!'
						})
						setTimeout(() => {
							// 提交成功后跳转到上报页，并传递参数，再在上报页利用这些数据修改问题单
							let data = {
								planSubId: this.id,//计划id,正常是最好不传的，传了也不要用，
								// 否则跳转至查询页时只有这巡检计划数据，而实际上是容许有其他计划数据的
								checkPoint: this.checkPoint, //点位id，实际来自于扫码
								personPhone: this.personPhone, //实际来自于注册用户
								inspectionResult: 1, //巡检结果，0-正常，1-异常，并根据计划id和点位id跳转到上报问题页
								reservoirId: this.reservoirId, // 为了在上报问题后能够跳转到一开始的水库巡检计划页，此时必须带水库id
								problemType:'completedProblem',
							}
							uni.redirectTo({
								url: `/pages/gorectifyorder/gorectifyorder?completedData=${encodeURIComponent(JSON.stringify(data))}`
							})
						}, 500)
					} else {
						uni.showToast({
							title: '提交失败'
						})
					}
				})
			},
			// 获取扫描结果
			getData() {
				let params = {
					checkPoint: this.checkPoint, //点位id
					personPhone: this.personPhone,
					inspectionStatus: this.inspectionStatus,

					pageNo: this.pageNo,
					pageSize: this.pageSize,
				}
				resRepair(params).then(res => {
					console.log(params, '获取扫描结果params')
					if (!res) {
						uni.showToast({
							title: "没有查询到!",
							icon: 'none'
						})
					} else {
						this.scanResRepairData = res.data.result.records
						console.log("scanResRepairData", this.scanResRepairData)
					}

				})
			},
			hiddendetails(val) {
				uni.navigateTo({
					url: '/pages/gorectifydetail/gorectifydetail'
				})
			},

			goback() {
				uni.redirectTo({
					url: "/pages/workbench/repairDetail"
				})
			},

			fntabClick(tab, index) {
				console.log("tab", tab, "index", index)
				// 1.1因为初始indexList为空，所以不能从indexList中找到index出现在第几位，所以arrIndex = -1
				let arrIndex = this.indexList.indexOf(index);
				console.log("arrIndex", arrIndex)
				let indexListpre = []
				if (arrIndex > -1) {
					this.indexList.splice(arrIndex, 1)
				} else {
					// 1.2将“未巡检”“已巡检”等传入indexListpre
					indexListpre.push(tab)
					// 1.3将index值传入indexList
					this.indexList.push(index)
					console.log("this.indexList", this.indexList)
				}
				// 1.4判断传入indexList的是哪些值，然后为orderType赋值
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
				// this.mescroll[this.current].scrollTo(0, 300);
				setTimeout(() => {
					this.mescroll.resetUpScroll(true)
				}, 500)
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll
				this.getData()
				// console.log('repairDetail页面执行了mescrollInit方法')
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
				// ({
				// 	pageNo: mescroll.num,
				// 	pageSize: mescroll.size,
				// 	relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				// 	orderStatusS: this.searchIdString,
				// 	repairIsOutTime: this.repairIsOutTime,
				// 	inspectionStatus: this.inspectionStatus,
				// 	planType: this.planType,
				// 	inspectionResult: this.inspectionResult,
				// 	isTimeout: this.inspectionResult,
				// 	orderType: 0
				// }).then(violaRes => {

				// 	if (mescroll.num == 1) {
				// 		this.$store.commit('album/schemeList', violaRes.data.result.records)
				// 	} else {
				// 		this.$store.commit('album/schemeList', this.schemeing.concat(violaRes.data.result
				// 			.records))
				// 	}
				// 	violaRes.data.result.records.length > 0 ? this.isShowEmpty = false : this.isShowEmpty = true;
				// 	mescroll.endSuccess(violaRes.data.result.records.length, violaRes.data.result.records.length >=
				// 		mescroll.size);
				// }).catch(() => {
				// 	mescroll.endErr();
				// })
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
		color: #208FE7;
		border-bottom: 4rpx solid #208FE7;
	}

	.scroll-bar-find {
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		flex-wrap: nowrap;
		overflow: hidden;
		margin-top: 29rpx;
		margin-bottom: 21rpx;
		width: 75%;
		margin-left: 28rpx;
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
		border: 1px solid #208FE7;
	}

	.boxsrocll {
		position: relative;
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
		border: 1px solid #208FE7;
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
		background: linear-gradient(90deg, #649BFF, #208FE7);
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
		background: #208FE7;
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
		// background: linear-gradient(90deg, #208FE7, #208FE7);
		background-color: #208FE7;
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
