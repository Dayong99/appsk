<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
		<!-- 滚动内容区 -->
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">隐私政策</view>
		</view>
		<view class="fcenter f34r mt28r mb28r">
			西峡县智慧水利隐私政策
		</view>
		<view style="margin-left: 40rpx;">开发者名称:杭州埃欧哲建设工程咨询有限公司</view>
		<view style="margin-left: 40rpx;margin-bottom: 20rpx;">应用名称:西峡县智慧水利</view>
		<view class="editpent">

			<view>本应用非常重视用户隐私政策并严格遵守相关的法律规定。请您仔细阅读《隐私政策》后再继续使用。如果您继续使用本应用，表示您已经充分阅读和理解我们协议的全部内容。

				本app尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更优质的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。
				您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。
			</view>
			<view class="titls">
				1. 适用范围
			</view>
			<view>
				本应用严禁用户发布不良信息，如裸露、色情和亵渎内容，发布的内容我们会进行审核，一经发现不良信息，会禁用该用户的所有权限，予以封号处理。
			</view>
			<view class="titls">
				2. 信息使用
			</view>
			<view>
				(a)本应用不会向任何无关第三方提供、出售、出租、分享或交易项目信息。
			</view>
			<view>
				(b)本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播相关项目信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。
			</view>
			<view class="titls">
				3. 信息存储和交换
			</view>
			<view>
				本应用收集的有关项目信息和资料将保存在建设单位的服务器上。
			</view>
			<view class="titls">
				4.本隐私政策的更改
			</view>
			<view style="padding-bottom:60rpx;">
				如果决定更改隐私政策，我们会在本政策中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集项目信息。

				请您妥善保护自己的账号信息，如您发现自己的账号信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用管理员，以便本应用采取相应措施。

				感谢您花时间了解我们的隐私政策！我们将尽全力保护您的个人信息和合法权益，再次感谢您的信任！</view>
		</view>
	</view>
</template>
<script>
	export default {
		computed: {},

		methods: {
			goback() {
				uni.navigateBack()
			}
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

	/* 样式 */
	.editpent {
		background: #fff;
		width: 100%;
	}

	.editpent {
		width: 90%;
		margin: 0 auto
	}

	.editpent view {
		font-size: 30rpx;
	}

	.titls {
		font-size: 32rpx;
		margin: 15rpx auto;
	}
</style>
