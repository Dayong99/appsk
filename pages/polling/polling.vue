<template>
	<view class="" style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">安全巡检</view>
			<view class="check" @click="searcgvaky('gorectifyorder')">
				整改单
			</view>
		</view>
		<view class="beamtotal">
			<view>
				<text @click="fnbarClick(0)" :class='{beamcurrent:current==0}'>巡检计划</text>
			</view>
			<view>
				<text @click="fnbarClick(1)" :class='{beamcurrent:current==1}'>隐患整改</text>
			</view>
		</view>
		<view class="boxsrocll" v-if="current==0">
			<scroll-view class="scroll-bar-find" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto"
				style=" border-right:1rpx solid #fff;" :scroll-with-animation="true">
				<view v-for="(tab,index) in tabBars" :key="tab.id" class="scroll-bar-finditem" :id="tab.id"
					:data-current="tab.current" :class="{'scroll-bar-finditemsh':indexList.indexOf(index)>-1}"
					@tap="fntabClick(tab,index)">
					{{tab}}
				</view>
			</scroll-view>
			<view class="morescreen" @click="searcgvaky
			('pollingout')">更多筛选</view>
		</view>
		<view class="boxsrocll" v-if="current==1">
			<scroll-view class="scroll-bar-find" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto"
				:scroll-with-animation="true">
				<view v-for="(tab,index) in tabBars1" :key="tab.id" class="scroll-bar-finditem" :id="tab.id"
					:data-current="tab.current" :class="{'scroll-bar-finditemsh':indexList1.indexOf(index)>-1}"
					@tap="fntabClick1(tab,index)">
					{{tab}}
				</view>
			</scroll-view>
		</view>
		<view>
			<view>
				<mescroll-uni @down="downCallback" @up="upCallback" :top="330" @init="mescrollInit" v-if="current==0">
					<view v-for="(item,index) in schemeing" :key="index" class="beamListbox">
						<view class="beamList" style="padding-bottom: 2rpx;">
							<view class="nameplan" style="width: 615rpx;margin-left: -8rpx;">
								<view class="startend">
									<text style="display:inline-block;">
										计划时间:{{item.planStartTime}}至{{item.planEndTime}}
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
										<text class="godetails">{{child.inspectionContent}}</text>
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
											<text>{{child.inspectionAddr}}</text>
										</view>
										<view class="routresult"
											v-if="child.inspectionStatus==1&&child.inspectionResult==0">
											<image src="../../static/dagou.png"></image>
											<text>巡检正常</text>
										</view>
										<view class="routresult"
											v-if="child.inspectionStatus==1&&child.inspectionResult==1">
											<image src="../../static/gantanhao.png"></image>
											<text style="color:#E7541E">巡检异常</text>
										</view>
										<view class="routing" v-if="child.inspectionStatus==0"
											@click="searcgvaky('gorouteimg',child)">去巡检</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
			<view>
				<mescroll-uni @down="downCallback" @up="upCallback" :top="330" @init="mescrollInit" v-if="current==1">
					<view v-for="(item,index) in dangeimg" :key="index" class="beamListbox" v-if="current==1">
						<view class="beamList" style="padding-bottom:35rpx">
							<view class="nameplan">
								<view>
									<image class="plaint" src="../../static/gantanhao.png"></image>
									<text>巡检时间:{{item.inspectTime}}</text>
								</view>
								<view class="plan" style="" v-if="item.orderStatus==1||item.orderStatus==0"
									@click="releent(item,index)">{{orderList1[item.orderStatus]}}</view>
								<view class="accept" style="" v-if="item.orderStatus==2">
									<image :src="'../../static/'+(item.checkStatus==1?'dagou':'gantanhao')+'.png'">
									</image>
									<text v-if="item.checkStatus==1" style="color:#2EA62E">验收合格</text>
									<text v-if="item.checkStatus==0">验收不合格</text>
								</view>
							</view>
							<view class="hiddendanger">
								<view>
									<view class="step step1" v-if="item.orderStatus==2">{{orderList[item.orderStatus]}}
									</view>
									<view class="step" v-if="item.orderStatus==0||item.orderStatus==1">
										{{orderList[item.orderStatus]}}</view>
									<text>{{item.inspectContent}}</text>
								</view>
								<view class="pngList">
									<view class="pngClass" v-for="child in item.inspectPath">
										<image :src="child"></image>
									</view>
								</view>
								<view class="inspection">巡检人:{{item.inspector}}</view>
								<view class="inspection">整改期限:{{item.inspectTime}}</view>
								<view class="gobeamdetail" @click="searcgvaky('gorectifydetail',item)">
									详情>
								</view>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		hiddendanger,
		safepolling
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				scrollInto: "recommend",
				current: 0,
				currenttab: 0,
				inspectionStatusList: ['未巡检', '已巡检'],
				orderList1: ['去整改', '去验收', '验收'],
				tabBars1: ['待整改', '待验收', '已验收', '超时'],
				tabBars: ['未巡检', '已巡检', '日计划', '周计划', '月计划', '超时', '未超时', '巡检正常', '巡检异常'],
				indexList: [],
				indexList1: [],
				indexListval: '',
				sercode: {},
				plantime: ['日计划', '周计划', '月计划'],
				mescroll: [null, null],
				freealrent: false,
				isShowEmpty: false,
				pngList: [],
				orderList: ['待整改', '待验收', '已验收'],
				inspectionStatus: '',
				planType: '',
				inspectionResult: '',
				isTimeout: '',
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
			if (options && options.datas) {
				this.inspectionStatus = (JSON.parse(options.datas)).inspectionStatus
				this.planType = (JSON.parse(options.datas)).planType
				this.inspectionResult = (JSON.parse(options.datas)).inspectionResult
				this.isTimeout = (JSON.parse(options.datas)).isTimeout
			}
		},
		onShow() {
			this.mescroll[this.current].resetUpScroll(true)
		},
		methods: {
			releent(val) {
				if (val.orderStatus == 0) {
					uni.navigateTo({
						url: '../gorectify/gorectify?valent=' + JSON.stringify(val) + '&pollingType=1'
					})
				} else if (val.orderStatus == 1) {
					uni.navigateTo({
						url: '../gocheck/gocheck?valent=' + JSON.stringify(val) + '&pollingType=1'
					})
				} else if (val.orderStatus == 2) {
					uni.navigateTo({
						url: '../gorectify/gorectify?valent=' + JSON.stringify(val) + '&pollingType=1'
					})
				}
			},
			hiddendetails(val) {
				hiddendanger({
					planId: val.id,
					orderType: 1,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}).then(res => {
					console.log('隐患整顿详情',res)
					if (res.status == 200 && res.data.result.records.length) {
						let data = res.data.result.records[0]
						if (data.repairPath) {
							data.repairPath = data.repairPath.split(',')
						}
						if (data.inspectPath) {
							data.inspectPath = data.inspectPath.split(',')
						}
						uni.navigateTo({
							url: '../gorectifydetail/gorectifydetail?valent=' + JSON.stringify(data)
						})
					}
				})
			},
			searcgvaky(val, item) {
				if (item) {
					if (val == 'gorectifydetail') {
						console.log(item)
						if (item.repairPath) {
							item.repairPath = item.repairPath.split(',')
						}
					}
					let items = JSON.stringify(item)
					uni.navigateTo({
						url: `../${val}/${val}?valent=${items}&pollingType=1`
					})
				} else {
					uni.navigateTo({
						url: `../${val}/${val}?pollingType=1`
					})
				}
			},
			/// 跳转打开新窗口
			fnOpenWin(type) {
				uni.navigateTo({
					url: `/pages/news/${type}/${type}`
				})
			},
			godetail(val) {
				uni.navigateTo({
					url: '../beamfieldDetail/beamfieldDetail?val=' + JSON.stringify(val)
				})
			},
			godado(val) {
				uni.navigateTo({
					url: '../datodetail/datodetail'
				})
			},
			goback() {
				uni.navigateBack()
			},
			fnbarClick(val) {
				this.current = val
				this.inspectionStatus = ''
				this.planType = ''
				this.inspectionResult = ''
				this.isTimeout = ''
				this.searchIdString = ''
				this.repairIsOutTime = ''
				this.indexList = []
				this.indexList1 = []
				this.fnRefreshData();
			},
			fntabClick1(tab, index) {
				console.log(index)
				let arrIndex = this.indexList1.indexOf(index);
				console.log("数组索引", arrIndex)
				if (arrIndex > -1) {
					this.indexList1.splice(arrIndex, 1)
				} else {
					this.indexList1.push(index)
				}
				if (this.indexList1.includes(3)) {
					this.searchIdString = this.indexList1.toString()
					this.searchIdString = this.searchIdString.substring(0, this.searchIdString.length - 2)
					this.repairIsOutTime = 1
				} else {
					this.searchIdString = this.indexList1.toString()
					this.repairIsOutTime = 0
				}
				this.mescroll[this.current].resetUpScroll(true)
			},
			fntabClick(tab, index) {
				let arrIndex = this.indexList.indexOf(index);
				let indexListpre = []
				if (arrIndex > -1) {
					this.indexList.splice(arrIndex, 1)
				} else {
					indexListpre.push(tab)
					this.indexList.push(index)
				}
				console.log(this.indexList)
				if (this.indexList.includes(0) && this.indexList.includes(1)) {
					this.inspectionStatus = '0,1'
				} else if (this.indexList.includes(0) && !this.indexList.includes(1)) {
					this.inspectionStatus = '0'
				} else if (this.indexList.includes(1) && !this.indexList.includes(0)) {
					this.inspectionStatus = '1'
				} else {
					this.inspectionStatus = ''
				}
				if (this.indexList.includes(7) && this.indexList.includes(8)) {
					this.inspectionResult = '0,1'
				} else if (this.indexList.includes(7) && !this.indexList.includes(8)) {
					this.inspectionResult = '0'
				} else if (this.indexList.includes(8) && !this.indexList.includes(7)) {
					this.inspectionResult = '1'
				} else {
					this.inspectionResult = ''
				}

				if (this.indexList.includes(5) && this.indexList.includes(6)) {
					this.isTimeout = '0,1'
				} else if (this.indexList.includes(5) && !this.indexList.includes(6)) {
					this.isTimeout = '0'
				} else if (this.indexList.includes(6) && !this.indexList.includes(5)) {
					this.isTimeout = '1'
				} else {
					this.isTimeout = ''
				}

				if (this.indexList.includes(2) && this.indexList.includes(3) && this.indexList.includes(4)) {
					this.planType = '0,1,2'
				} else if (this.indexList.includes(2) && this.indexList.includes(3) && !this.indexList.includes(4)) {
					this.planType = '0,1'
				} else if (this.indexList.includes(2) && !this.indexList.includes(3) && this.indexList.includes(4)) {
					this.planType = '0,2'
				} else if (!this.indexList.includes(2) && this.indexList.includes(3) && this.indexList.includes(4)) {
					this.planType = '1,2'
				} else if (!this.indexList.includes(2) && !this.indexList.includes(3) && this.indexList.includes(4)) {
					this.planType = '2'
				} else if (this.indexList.includes(2) && !this.indexList.includes(3) && !this.indexList.includes(4)) {
					this.planType = '0'
				} else if (!this.indexList.includes(2) && this.indexList.includes(3) && !this.indexList.includes(4)) {
					this.planType = '1'
				} else if (!this.indexList.includes(2) && !this.indexList.includes(3) && !this.indexList.includes(4)) {
					this.planType = ''
				}
				this.mescroll[this.current].resetUpScroll(true)
			},
			unique(arr) {
				const res = new Map();
				return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
			},
			updateprocess(val) {
				console.log(val)
				uni.navigateTo({
					url: '../updateprogress/updateprogress?val=' + JSON.stringify(val)
				})
			},
			fnRefreshData() {
				// this.mescroll[this.current].scrollTo(0, 300);
				setTimeout(() => {
					this.mescroll[this.current].resetUpScroll(true)
				}, 500)
			},
			mescrollInit(mescroll) {
				this.mescroll[this.current] = mescroll;
			},
			/// 下拉刷新的回调
			downCallback(mescroll) {
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				this.mescroll[this.current].resetUpScroll()
			},
			/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				[safepolling, hiddendanger][this.current]({
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					orderStatusS: this.searchIdString,
					repairIsOutTime: this.repairIsOutTime,
					inspectionStatus: this.inspectionStatus,
					planType: this.planType,
					inspectionResult: this.inspectionResult,
					isTimeout: this.inspectionResult,
					orderType: 1
				}).then(violaRes => {
					if (this.current == 0) {
						if (mescroll.num == 1) {
							this.$store.commit('album/schemeList', violaRes.data.result.records)
						} else {
							this.$store.commit('album/schemeList', this.schemeing.concat(violaRes.data.result
								.records))
						}
					}
					if (this.current == 1) {
						violaRes.data.result.records.forEach(a => {
							if (a.inspectPath) a.inspectPath = a.inspectPath.split(',')
						})
						console.log(999)
						console.log(violaRes.data.result.records)
						if (mescroll.num == 1) {
							this.$store.commit('album/dangerList', violaRes.data.result.records)
						} else {
							this.$store.commit('album/dangerList', this.dangeimg.concat(violaRes.data.result
								.records))
						}
					}
					violaRes.data.result.records.length > 0 ? this.isShowEmpty = false : this.isShowEmpty = true;
					mescroll.endSuccess(violaRes.data.result.records.length, violaRes.data.result.records.length >=
						mescroll.size);
				}).catch(() => {
					mescroll.endErr();
				})
			}
		}
	}
</script>

<style>
	page {
		background: #E8E8E8;
	}

	.head {
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #235FED, #235FED);
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
		border: 1px solid #235FED;
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
		color: #86878A;
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
		background: #235FED;
		border-radius: 3rpx;
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
		box-shadow: 0px 7rpx 33rpx 0px rgba(71, 124, 243, 0.8);
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
		border-bottom: 1rpx solid #eee;
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
