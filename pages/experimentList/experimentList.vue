<template>
	<view>
		<app-head :title="title" @back="goBack"></app-head>
		<view class="page_cont">
			<!-- <view class="page_head">
				<view class="start">
					开始时间:
					<text class="mar_left_20">2021-2-5</text> 
				</view>
				<view class="end">
					结束时间:
					<text class="mar_left_20">2021-2-5</text> 
				</view>
			</view> -->
			<view class="item" v-for="(item,index) in recordListNew" :key="index">
				<view class="item_head">
					<view class="head_left">
						<text class="name">试件编号：{{item.wbbh}}</text>
						<text class="status"></text>
					</view>
					<view class="showAll" @click="showChild(index)">
						{{item.showTag == true? '收起':'展开'}}
						<image src="../../static/open.png" v-if="!item.showTag"></image>
						<image src="../../static/pack.png" v-else="item.showTag"></image>
					</view>
				</view>
				<view class="info_data">
					<view class="device_info">
						<view>
							试件块数:<text class="mar_left_20">{{item.pressureSubRecordList.length}}</text>
						</view>
						<!-- <view>
							设备编号: <text class="mar_left_20">{{item.deivceCode}}</text>
						</view> -->
						<view>
							强度等级:<text class="mar_left_20">{{item.strengthGrade}}</text>
						</view>
					</view>
					<view class="device_info">
						<!-- 试验员:
						<text class="mar_left_20">{{item.tester?item.tester: '-'}}</text> -->
						<view>
							试件龄期（天）:<text class="mar_left_20">{{item.lq}}</text>
						</view>
						<view>
							修正系数:<text class="mar_left_20">{{item.xs}}</text>
						</view>
					</view>
					<!-- <view class="result">
						<text>试验类型:{{item.testType}}</text>
						<text class="float_r">有效力值:{{item.yxlz}}</text>
					</view> -->
					<view class="">
						试件规格（mm）:<text class="mar_left_20">{{item.specification}}</text>
					</view>
					
					<view class="item_child" v-for="(child,index) in item.pressureSubRecordList" v-show="item.showTag">
						<view class="child_title"><image src="../../static/punch.png"></image><text class="mar_left_20">第{{index+1}}块</text></view>
						<!-- <view class="child_date">
							试验时间: {{child.startTime?child.startTime:'-'}}至 {{child.endTime?child.endTime:'-'}}
						</view> -->
						<view class="child_flex">
							<text>有效力值:<text class="mar_left_20">{{child.testLoad}}</text></text>
							<text class="float_r">有效强度: {{child.stress}}</text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import appHead from '@/components/appHead/appHead'
	import { queryRecord } from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				title: "实验列表",
				recordList: [],
				recordListNew: [],
				showTag: false,
				pageNo: 1,
				pageSize: 20
			}
		},
		onLoad() {
			this.getRecord();
		},
		onShow() {
			
		},
		components: {
			appHead
		},
		methods: {
			//获取记录
			getRecord() {
				let params = {
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					startTime: '',
					endTime: '',
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}
				queryRecord(params).then( res => {
					console.log(res);
					if(res.data.code == 200){
						this.recordList = res.data.result.records;
						this.recordList.map(((item,index)=> {
							this.recordListNew.push(Object.assign({},item,{showTag:false}))
						}))
						console.log('记录',this.recordListNew)
					}
				})
			},
			showChild(index) {
				this.recordListNew[index].showTag=!this.recordListNew[index].showTag;
				// console.log(this.recordListNew[index].showTag);
			},
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less" scoped>
	.page_cont{
		background: #E8E8E8;
		padding: 21upx 22upx 55upx;
		.page_head{
			display: flex;
			justify-content: space-between;
		}
		.item{
			background: #FFFFFE;
			padding: 14upx 0;
			border-radius: 6upx;
			margin-bottom: 21upx;
			.item_head{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 19upx;
				padding-bottom: 33upx;
				border-bottom: 1px solid #EEEEEE;
				.name{
					border-left: 4upx solid #235FED;
					padding-left: 30upx;
					color: #181616;
					font-size: 33upx;
					font-weight: bold;
				}
				.showAll{
					color: #235FED; 
					padding-right: 30upx;
					font-size: 28upx;
					image{
						width: 20upx;
						height: 12upx;
						margin-left: 6upx;
						margin-bottom: 8upx;
					}
				}
			}
			.info_data{
				color: #57585A;
				font-size: 28upx;
				padding: 27upx 34upx;
				.device_info{
					display: flex;
					justify-content: space-between;
					margin-bottom: 30upx;
				}
				.worker{margin-bottom: 30upx;}
				.result{
					margin-bottom: 30upx;
					.label{
						float: left;
					}
					
				}
			}
			.item_child{
				margin-top: 40upx;
				.child_title{
					color: #181616; 
					font-size: 28upx; 
					font-weight: bold; 
					margin-bottom: 30upx;
					image{
						width: 26upx;
						height: 27upx;
						vertical-align: middle;
					}
				}
				.child_date,.child_flex{color: #57585A; margin-bottom: 26upx;}
				
			}
		}
		.mar_left_20{
			margin-left: 20upx;
		}
		.float_r{float: right;}
	}
</style>
