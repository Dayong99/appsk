<template>
	<view class="clone-all">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">云巡检记录</view>
		</view>
		<view class="pa-all">
			<view class="clone-tiem">
				<view class="title-to">
					<picker mode = date :value="date" @change="bindDateChange">巡检日期：{{date}}<image class="img-sle" src="../../static/jkpe.png"></image></picker>
				</view>
				<view class="title-to">
					<picker @change="bindPickerChange" :value="index" :range="lists" range-key="reservoirName">
							  <view class="uni-input">水库名称：{{lists[index].reservoirName}}<image class="img-sle" src="../../static/jkpe.png"></image></view>
					</picker>
				</view>
			</view>
			<mescroll-uni ref="ani" @up="upCallback" :fixed="true" @down="downCallback" :down="down" auto
				:up="up" :top="240"  @init="mescrollInit">
				<view class="h-table">
					<view class="h-tr h-tr-3 h-thead">
						<view class="h-td">点位</view>
						<view class="h-td">巡检日期</view>
						<view class="h-td">巡检人</view>
						<view class="h-td">状态</view>
					</view>
					<view class="h-tr h-tr-3 State-reservoir" v-for="(item,index) in CloudInspection" :key="index" @tap="Cloud(item)">
						<view class="h-td">{{item.checkPoint_dictText | checkPoint_dictTextFil}}</view>
						<view class="h-td">{{item.inspectionTime}}</view>
						<view class="h-td">{{item.inspector_dictText}}</view>
						<view class="h-td Changes-reservoir" :class="{ChangesTwo:item.inspectionResult === 1 }">{{item.inspectionResult_dictText}}</view>
					</view>
				</view>
			</mescroll-uni>
			
			
		</view>
	</view>
	
</template>

<script>
	import {getReservoir,getInspectionRecord} from '@/api/AlbumServer.js'
	export default {
		data(){
			  const currentDate = this.getDate({
			            format: true
			        })
			return {
				isShowToTop: true, //开启回到顶部按钮
				mescroll: {},
				up: {
					auto: false //默认开始不执行上拉
				},
				down: {
					auto: false //默认开始不执行下拉
				},
				lists:[{reservoirName:'全部',id:''}],
				arrayLists: [],
				CloudInspection: [],  //云巡检列表
				index: 0,
				time:'',
				date:currentDate,
				arrLists:{
					pageNo:1,
					pageSize:10,
					relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}
			}
		},
		onShow() {
			this.getReservoirList()
		},
		filters:{
			checkPoint_dictTextFil(data){
				if(data.length<4) return data
				let arr = data.slice(0,4)
				return arr + '...'
			}
		},
		methods:{
			// 获取水库汇总所有信息
			mescrollInit(mescroll) {
				this.mescroll = mescroll
				this.InspectionRecordList(this.arrLists)
			},
			/// 下拉刷新的回调，默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				this.arrLists.pageNo = mescroll.num
				getInspectionRecord(this.arrLists).then(res => {
					// console.log('获取水库汇总所有信息' + mescroll.num, res)
					if (res.data.code !== 200) {
						uni.showToast({
							title: '请重新请求',
							icon: 'none',
							duration: 1000
						});
					} else {
						if (mescroll.num == 1) this.reservoirSituation = []
						this.showTu= false
						mescroll.endSuccess()
						if (res.data.result.records.length !== 0) {
							mescroll.endSuccess()
							this.showTu= true
							this.reservoirSituation = this.reservoirSituation.concat(res.data.result.records)
							
						} else {
							mescroll.endErr()
						}
					}
			
				})
			},
			//获取书库
			getReservoirList(){
				let arr={
					pageNo: 1,
					pageSize: 100,
					relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}
				let _that = this
				getReservoir(arr).then(res =>{
					if(res.data.code === 200) {
						_that.arrayLists = res.data.result.records
						_that.arrayLists.forEach(item => {
							_that.lists.push({reservoirName:item.reservoirName,id:item.id})
						})
					}
				})
			},
			//获取云巡检记录
			InspectionRecordList(arr){
				let _that = this
				_that.CloudInspection = []
				getInspectionRecord(arr).then(res =>{
					if(res.data.code === 200) { 
						_that.CloudInspection = res.data.result.records
					}	
				})
			},
			//切换水库
			bindPickerChange(e){
				this.index  = e.target.value
				this.arrLists.reservoirId = this.lists[this.index].id
				this.InspectionRecordList(this.arrLists)
			},
			// 切换时间
			bindDateChange: function(e) {
				this.date = e.target.value
				this.arrLists.inspectionTime = this.date
				this.InspectionRecordList(this.arrLists)
			},
			// 获取时间
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			goback(){
				uni.navigateBack()
			},
			//云巡检
			Cloud(item){
				let arr = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:`/pages/cloud-services/cloudAmend?lists=`+arr
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.head{
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background-color: #208FE7;
	}
	.boximgs{
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}
	.safe{
		  width: 70%;
		  padding-left:80rpx;
	}
	
	.pa-all{
		padding: 0px 26rpx 0px 26rpx;
	}
	.clone-all {
		
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
	}
	.clone-tiem {
		display: flex;
		justify-content: space-between;
		color: #666666;
		font-size: 26rpx;
	}
	.title-to{
		height: 92rpx;
		line-height: 90rpx;
		image {
			width: 18rpx;
			height: 26rpx;
			margin: -4rpx 0 0rpx 14rpx;
			vertical-align: middle;
		}
		.img-sle {
			
			transform: rotate(90deg);
		}
	}
	.bu-top{
		display: flex;
		justify-content: space-around;
		height: 66rpx;
		line-height: 66rpx;
		color: #FFFFFF;
		background-color: #208FE7;
		border-radius: 12rpx 12rpx 0rpx 0rpx;
	}
	.State-reservoir{
		height: 86rpx;
		line-height: 86rpx;
		color: #333333;
		display: flex;
		justify-content: space-around;
		}
		.State-reservoir:nth-child(even) {
			background-color: #EEEEEE;
		}
	.Changes-reservoir{
		color: #1DBC60;
	}
	.ChangesTwo {
		color: #F18424;
	}
	
	.h-table{
		/* 行 */
		padding: 0rpx 28rpx;
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
		font-size: 28rpx;
		.h-tr{
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: stretch;
			align-content: center;
			
			// // border-color: #208FE7;
			// border-style: solid;
			// border-width: 0;
			// // border-top-width: 1px;
			// border-left-width: 1px;
			// border-bottom-width: 1px;
			// color: #333;
			
			/* 等比分列，1-6列 */
			@for $i from 1 through 6
			{
				&-#{$i}{
					>.h-td{
						width:(100% / $i);
					}
				}
			}
			
			+ .h-tr{
				border-top-style: none;
			}
		}
		/* 单元格 */
		.h-td{
			box-sizing: border-box;
			word-break:break-all;
			border-width: 0;
			border-right-width: 1px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			align-content: center;
			min-height: 64rpx;
			// overflow: hidden;/*超出部分隐藏*/
			white-space: nowrap;/*不换行*/
			text-overflow:ellipsis;/*超出部分文字以...显示*/
			/* 跨列 */
			&-colspan{
				flex-grow: 1;
				width:0;
			}
			
			/* 内容顶部对齐 */
			&-top{
				align-items: flex-start;
				align-content:flex-start;
			}
			/* 内容底部对齐 */
			&-bottom{
				align-items: flex-end;
				align-content:flex-end;
			}
			/* 内容左边对齐 */
			&-left{
				justify-content: flex-start;
			}
			/* 内容右边对齐 */
			&-right{
				justify-content: flex-end;
			}
		}
		/* 表头 */
		.h-thead{
			background-color: #208FE7;
			color: #FFFFFE;
			border-radius: 14rpx 14rpx 0rpx 0rpx;
		}
	}
</style>
