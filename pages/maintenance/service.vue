<template>
  <view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
    <!-- 滚动内容区 -->
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">申报维修</view>
			<view>
				<text v-if="false">下一题</text>
			</view>
		</view>
		<view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>申报时间</view>
				<view class="listrig" @click="onShowDatePicker('datetime')">
					<view style="color: #E3E3E3;" v-if="datepent==1">请选择申报时间</view>
					<view v-if="datepent==2">{{datetime}}</view>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" @confirm="onSelectedb" @cancel="onSelected" />
				<image src="../../static/rili.png" class="rili"></image>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>申报人</view>
				<!-- <view class="listrig">
					<input class="uni-input" v-model="updatepeoples" style="" type="text" placeholder="请选择申报人">
				</view> -->
				<view class="listrig">
					<picker @change="changePeople" :value="personIndex" :range="personList" :range-key="'personName'">
						<view class="uni-input" v-if="personIndex!==''">{{personList[personIndex].personName}}</view>
						<view class="uni-input" style="color: #E3E3E3;" v-else>请选择整改人</view>
					</picker>
				</view>
				<image src="../../static/jkpe.png" class="poarrow"></image>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>维修人</view>
				<!-- <view class="listrig">
					<picker mode="multiSelector" @change="bindMultiPickerColumnChange" @columnchange="columnchange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}-{{multiArray[1][multiIndex[1]]}}</view>
					</picker> 
				</view> -->
				<view class="listrig">
					<picker @change="changeRepair" :value="repairIndex" :range="repairList" :range-key="'personName'">
						<view class="uni-input" v-if="repairIndex!==''">{{repairList[repairIndex].personName}}</view>
						<view class="uni-input" style="color: #E3E3E3;" v-else>请选择维修人</view>
					</picker>
				</view>
				<image src="../../static/jkpe.png" class="poarrow"></image>
			</view>

			<block v-if="chosePage==1">
				<view class="processlist">
					<view class="listleft"><text class="start">*</text>设备类型</view>
					<view class="listrig">
						<picker @change="changeDeviceType" :value="index3" :range="typeList" :range-key="'deviceTypeName'">
							<view class="uni-input" v-if="index3 !== ''">{{typeList[index3].deviceTypeName}}</view>
							<view class="uni-input" style="color: #E3E3E3;" v-else>请选择设备类型</view>
						</picker> 
					</view>
					<image src="../../static/jkpe.png" class="poarrow"></image>
				</view>
				<view class="processlist">
					<view class="listleft"><text class="start">*</text>设备名称</view>
					<view class="listrig">
						<picker @change="changeDevice" :value="index2" :range="deviceList" :range-key="'deviceName'">
							<view class="uni-input" v-if="index2 !== ''">{{deviceList.length > 0 ? deviceList[index2].deviceName: ''}}</view>
							<view class="uni-input" style="color: #E3E3E3;" v-else>请选择设备</view>
						</picker> 
					</view>
					<image src="../../static/jkpe.png" class="poarrow"></image>
				</view>
				
			</block>
			
			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>问题描述</view>
				<view class="listrig">
					<textarea placeholder="请输入详情描述" v-model="updatedetails">
						
					</textarea>
				</view>
			</view>
			<view class="photolist">
				<view class="listleft">图片附件</view>
				<view>
					<view v-for="item in updateimg">
						<view class="model">
							<image :src=item style="width: 100%;height: 100%;"></image>
						</view> 
					</view>
					<view class="model" @tap="cI" v-if="updateimg.length<3">
						<image src="../../static/jiahao.png" class="adds"></image>
						<view>添加附件</view>
					</view>
				</view>
			</view>
		</view>
		<view class="buttonyes" @tap="yesword">提交</view>
		<!-- <view class="buttoncancel" @tap="goback">取消</view> -->
	</view>
  </view>
</template>
<script>
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
import {
  serviceperson,
  servicepersontype,
  serviceList,
  serviceadd,
  devicestand,
  personList,
} from "@/api/AlbumServer.js";
export default {
  data() {
    return {
      multiArray: [[], []],
      multiIndex: [0, 0],
      array: [],
      oneId: 0,
      twoId: 0,
      array1: [],
      typeList: [{ deviceTypeName: "" }],
      index2: "",
      deviceList: [],
      index3: "",
      title: "请选择",
      datepent: 1,
      updatedetails: "",
      showPicker: false,
      date: "2019/01/01",
      time: "15:00:12",
      datetime: "",
      range: ["2019/01/01", "2019/01/06"],
      rangetime: ["2019/01/08 14:00", "2019/01/16 13:59"],
      value: "",
      type: "datetime",
      updatepeoples: "",
      updateresult: "",
      updatepeopleid: "",
      updateimg: [],
      parentVal: "",
      serios: {},
      repairman: "",
      chosePage: "",
      personList: [],
      personIndex: "",
      repairList: [],
      repairIndex: "",
      relTenantId: "",
    };
  },
  computed: {},
  components: {
    MxDatePicker,
  },
  onLoad(options) {
    this.relTenantId = this.$store.getters[
      "user/getAccountInfoData"
    ].relTenantIds;
    if (options.val) {
      this.parentVal = JSON.parse(options.val);
    } else {
      this.chosePage = 1;
    }
    this.init();
    this.getPersonList();
    this.getRepairList();
    //this.getDeviceType();
  },
  onShow() {
    this.updatepeoples = this.serios.title;
    this.updatepeopleid = this.serios.key;
  },
  methods: {
    changePeople(e) {
      this.personIndex = e.target.value;
    },
    //获取人员列表
    getPersonList() {
      let params = {
        relTenantIds: this.relTenantId,
        pageSize: 50,
      };
      personList(params).then((res) => {
        if (res.data.code == 200 && res.data.result.records.length > 0) {
          this.personList = res.data.result.records;
        }
      });
    },
    changeRepair(e) {
      this.repairIndex = e.target.value;
    },
    //获取维修人
    getRepairList() {
      let params = {
        relTenantIds: this.relTenantId,
        pageSize: 50,
        personType: 1,
      };
      serviceperson(params).then((res) => {
        if ((res.data.code == 200) & (res.data.result.records.length > 0)) {
          this.repairList = res.data.result.records;
        }
      });
    },
    changeDeviceType: function (e) {
      this.index3 = e.detail.value;
      serviceList({
        relTenantIds: this.relTenantId,
        deviceTypeId: this.typeList[this.index3].id,
      }).then((service) => {
        if (
          service.data.code == 200 &&
          service.data.result.records.length > 0
        ) {
          this.$nextTick(() => {
            this.deviceList = service.data.result.records;
          });
        }
      });
    },

    //获取设备类型
    getDeviceType() {
      let params = {
        relTenantIds: this.relTenantId
      };
      servicepersontype(params).then((res1) => {
        if (res1.data.code == 200 && res1.data.result.records.length > 0)
          this.typeList = res1.data.result.records;
      });
    },
    cI() {
      let that = this;
      uni.chooseImage({
        count: 1,
        sizeType: ["copressed"],
        success(res) {
          //因为有一张图片， 输出下标[0]， 直接输出地址
          var imgFiles = res.tempFilePaths[0];
          //console.log(imgFiles);
          // 上传图片
          // 做成一个上传对象
          var uper = uni.uploadFile({
            // 需要上传的地址
            url: that.$store.state.baseUrl + "/sys/common/upload",
            // filePath  需要上传的文件
            filePath: imgFiles,
            name: "file",
            header: { "X-Access-Token": uni.getStorageSync("TOKEN") || "" },
            success: (res) => {
              //console.log(res.data);
              if (res.statusCode == 200) {
                that.updateimg.push(JSON.parse(res.data).message);
              }
            },
          });
        },
      });
    },
    bindMultiPickerColumnChange: function (e) {
      if (!this.oneId || !this.twoId) {
        uni.showToast({
          title: "请选择设备类型",
          icon: "none",
        });
      }
    },
    changeDevice: function (e) {
      this.index2 = e.detail.value;
    },
    columnchange: function (e) {
      if (e.detail.column === 0) {
        this.multiIndex[0] = e.detail.value;
        this.multiIndex[1] = 0;
        this.$set(this.multiArray, 1, []);
        if (this.array[e.detail.value].children.length == 0) {
          this.twoId = "";
        } else {
          const arrtwo = this.array[e.detail.value].children.map(
            (item) => item.deviceTypeName
          );
          this.$set(this.multiArray, 1, arrtwo);
          this.twoId = this.array[e.detail.value].children[0].id;
        }
        this.oneId = this.array[e.detail.value].personPhone;
      } else if (e.detail.column === 1) {
        const arrtwo = this.array[this.multiIndex[0]].children.map(
          (item) => item.deviceTypeName
        );
        this.$set(this.multiArray, 1, arrtwo);
        this.multiIndex[1] = e.detail.value;
        this.twoId = this.array[this.multiIndex[0]].children[
          this.multiIndex[1]
        ].id;
      }
    },
    init() {
      let data = {
        pageNo: 1,
        pageSize: "",
        relTenantIds: this.relTenantId,
      };
      serviceperson(data).then((res) => {
        if (res.status == 200) {
          let itemList = res.data.result.records;
          itemList.forEach((a) => {
            servicepersontype({ id: a.deviceType }).then((res1) => {
              a.children = res1.data.result.records;
            });
          });
          this.array = itemList;
          const arrone = this.array.map((item) => item.personPhone_dictText);
          var arrtwo = [];
          if (this.array[0].children != undefined) {
            arrtwo = this.array[0].children.map(
              (child) => child.deviceTypeName
            );
            this.twoId = this.array[0].children[0].id;
          } else {
            arrtwo = [];
            this.twoId = "";
          }
          this.multiArray[1] = arrtwo;
          this.oneId = this.array[0].id;
          this.multiArray[0] = arrone;
        }
      });
      
      if (this.chosePage == 1) {
        servicepersontype(data).then((res1) => {
          if (res1.data.code == 200 && res1.data.result.records.length > 0)
            this.typeList = res1.data.result.records;
        });
      }
    },
    /// 跳转打开新窗口
    fnOpenWin(type) {
      uni.navigateTo({
        url: `/pages/news/${type}/${type}`,
      });
    },
    goback() {
      uni.navigateBack();
    },
    yesword() {
      if (
        !this.datetime.replace(/\//g, "-") ||
        !this.personList[this.personIndex].phone ||
        !this.repairList[this.repairIndex].personPhone ||
        !this.updatedetails
      ) {
        uni.showToast({
          title: "带*号的不能为空",
          icon: "none",
        });
        return;
      }
      let data = {
        operatorType: 1,
        filePath: this.updateimg.toString(),
        relTenantIds: this.relTenantId,
        describes: this.updatedetails,
        operatorTime: this.datetime.replace(/\//g, "-") + ":00",
        deviceId:
          this.chosePage == 1
            ? this.deviceList[this.index2].id
            : this.parentVal.id,
        repairman: this.repairList[this.repairIndex].personPhone,
        operator: this.personList[this.personIndex].phone,
        sysOrgCode: this.parentVal.sysOrgCode,
      };
      console.log(data);
      serviceadd(data).then((res) => {
        //console.log(res);
        if (res.status == 200) {
          if (res.data.result == "设备当前状态不可申报维修") {
            uni.showToast({
              title: res.data.result,
            });
          } else {
            uni.showToast({
              title: "申报维修成功",
            });
            setTimeout(() => {
              uni.redirectTo({
                url: "./standing",
              });
            }, 1000);
          }
        } else {
          uni.showToast({
            title: "申报维修失败",
          });
        }
      });
    },
    onShowDatePicker(type) {
      //显示
      this.showPicker = true;
      this.value = this[type];
    },
    onSelected() {
      //选择
      this.showPicker = false;
    },
    onSelectedb(e) {
      this.datepent = 2;
      this.showPicker = false;
      this.datetime = e.value;
    },
    previewImg(logourl) {
      let _this = this;
      let imgsArray = [];
      imgsArray[0] = logourl;
      uni.previewImage({
        current: 0,
        urls: imgsArray,
      });
    },
  },
};
</script>

<style>
page {
  background: #fff;
}
.head {
  width: 100%;
  height: 153rpx;
  line-height: 193rpx;
  background: linear-gradient(0deg, #235fed, #235fed);
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
.processlist {
  height: 80rpx;
  line-height: 80rpx;
  padding-top: 13rpx;
  padding-bottom: 13rpx;
  border-bottom: 1rpx solid #eae7e7;
  display: flex;
  position: relative;
}
.photolist .listleft {
  font-size: 30rpx;
  font-family: "PingFang SC";
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
  font-family: "PingFang SC";
  font-weight: bold;
  color: #555555;
  width: 150rpx;
  border-right: 1rpx solid #eae7e7;
  text-align: right;
  padding-right: 27rpx;
}
.listrig {
  width: 543rpx;
  padding-left: 18rpx;
  font-size: 30rpx;
  font-family: "PingFang SC";
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
  font-family: "PingFang SC";
  font-weight: bold;
  color: #ffffff;
  margin: 0 auto;
  line-height: 90rpx;
  text-align: center;
  color: #fff;
}
.buttonyes {
  background: #649aff;
  bottom: 79rpx;
  left: 63rpx;
  margin-top: 300rpx;
  margin-bottom: 50rpx;
}
.buttoncancel {
  border: 1px solid #bfbfbf;
  margin-top: 40rpx;
  position: fixed;
  bottom: 69rpx;
  left: 63rpx;
  color: #9c9c9c;
}
textarea {
  margin-top: 18rpx;
  width: 540rpx;
}
.model {
  width: 200rpx;
  height: 167rpx;
  background: #fbfbfb;
  border: 1rpx solid #eae7e7;
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
  font-family: "PingFang SC";
  font-weight: 500;
  color: #808184;
  text-align: center;
}
.uni-textarea-placeholder {
  color: #e3e3e3;
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
  color: #e3e3e3;
}
</style>
