
<template>
    <view>
		<view class="headghg">
			<view class="flexr-jsb haedboxs">
				<view class="boximge mt8r" @tap="gobackto">
					<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
				</view>
				<view v-if="showcongint">
					<input type="text"
						   placeholder="请输入搜索"
							v-model="value"
						   />
				</view>
				<view class="cwhite f34r sw">
					{{congint}}
				</view>
				<view class="hw33 mt8r"
					  @click="rightClick">
					<image src="../../static/fangdajing.png" class="hw100v"></image>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
    export default {
        name: "AlbumCard",
        props: [
            'leftWords',
            'input',
            'rightIcon',
            'rightWords',
			'congint',
			'abt'
        ],
        data () {
            return {
                value: '',
				showcongint:false,
				crux:true,
				valuekiss:''
            }
        },
        methods: {
			cuents(){
				this.crux=true
			},
            rightClick: function () {
				console.log(this.abt)
				uni.navigateTo({
					url:'/pages/searchValue/searchValue?abt='+this.abt
				})
            },
			gobackto(){
				uni.navigateBack()
			},
			serchValue(){
				this.$emit("change",this.valuekiss)	
			}
        }
    }
</script>
 
<style scoped>
	.headghg{
		width: 694rpx;
		height: 153rpx;
		background-color: #208FE7;
		/* background: linear-gradient(0deg, #235FED, #235FED); */
		position: absolute;
		font-size: 16rpx;
		z-index: 100;
		color: #FF0000;
		padding-left: 28rpx;
		padding-right: 28rpx;
	}
	.boximge{
		width: 21rpx;
		height: 38rpx;
		z-index: 100;
	}
	.haedboxs{
		margin-top:85rpx;
	}
	
</style>