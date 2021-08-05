import request from '@/api/request.js';
// export async function getAlbumList(params = {
//   page: 1,
//   count: 20
// }) {
//   return await request('/album/GetAlbumListForGood', 'get', params)
// }
//首页新闻
export async function firstNews(params) {
	return await request('/sys/recentNews/list', 'get', params)
}
//首页、我的工作台banner图管理-无分页列表查询
export async function banner(params) {
	return await request('/sys/banner/noPageList', 'get', params)
}

//巡检人列表查询、人员目录树、人数较多，上报问题页用到
export async function personTree(params) {
	return await request('/person/person/queryPersonTree', 'get', params)
}

//隐患类型-分页列表查询，不是固定的，需要传点位id（checkPointId）和计划id（从巡检页过来时没有，但无所谓），上报问题页用到
export async function hazardType(params) {
	return await request('/sys/reservoirPoint/safetyTypeByCheckPointId', 'get', params)
}

//上报问题接口
export async function reportProblem(params) {
	return await request('/sys/qualitySafety/add', 'post', params)
}

//点位巡检正常接口
export async function reservoirPointOK(params) {
	return await request('/sys/reservoirPoint/cloudInspect', 'post', params)
}

// 隐患整改单-隐患详情&巡检计划-隐患整改详情主表数据
export async function hiddendanger(params) {
	return await request('/sys/qualitySafety/list', 'get', params)
}

//水库点位接口，根据水库id查询，从巡检地图页跳到点位巡检页用到
export async function reservoirPoint(params) {
	return await request('/sys/reservoirPoint/list', 'get', params)
}

//AI监测统计
export async function vcsEventMonitorResult(params) {
	return await request('/vcs/vcsEventMonitorResult/vcsCount', 'get', params)
}

//AI事件任务结果-分页列表查询
export async function getMonitorResult(params) {
	return await request('/vcs/vcsEventMonitorResult/list', 'get', params)
}

//上传检查结果0-正常，1-异常
export async function putInspectionResult(params) {
	return await request('/sys/planMain/inspects', 'get', params)
}

//视频回放
export async function videoBack(params) {
	return await request('/deviceManage/videoSurveillance/addressGet', 'get', params)
}

//水库汇总列表
export async function getReservoir(params) {
	return await request('/sys/reservoir/list', 'get', params)
}

// 获取水库保养问题列表
export async function resRepair(params) {
	return await request('/sys/planMain/queryPlanSubListApp', 'get', params)
}

// 获取目录树借口
export async function documentlist(params) {
	return await request('/sys/archivesTree/queryTreeList', 'get', params)
}
// 获取目录树借口详情
export async function documentlistdetail(params) {
	return await request('/sys/archives/list', 'get', params)
}
// 获取智慧梁场列表
export async function beamfield(params = {
	pageNo: 1,
	pageSize: 10
}) {
	return await request('/beamyard/structLedger/list', 'get', params)
}
// 获取智慧梁场列表状态
export async function beamfieldstatus(params = {
	pageNo: 1,
	pageSize: 10
}) {
	return await request('/beamyard/structStatus/list', 'get', params)
}

// 获取台座状态
export async function dado(params = {
	pageNo: 1,
	pageSize: 10
}) {
	return await request('/beamyard/pedestalLedger/list', 'get', params)
}
// 上传图片
export async function uploadimg(params) {
	return await request('/sys/common/upload', 'post', params)
}
// 构建生产记录添加
export async function updaterecords(params) {
	return await request('/beamyard/structRecord/add', 'post', params)
}
// guanlian
export async function correlation(params) {
	return await request('/beamyard/structLedger/pedRelationStruct', 'get', params)
}
// 解除关联
export async function errorelation(params) {
	return await request('/beamyard/structLedger/pedRemoveStructs', 'get', params)
}
// 视图统计
export async function echartstable(params) {
	return await request('/beamyard/structLedger/progressView', 'get', params)
}

// 生产记录查询
export async function clocktime(params) {
	return await request('/beamyard/structRecord/list', 'get', params)
}

// 资料管理查询接口
export async function doucmentLists(params) {
	return await request('/sys/archives/list', 'get', params)
}

// 巡检计划
// export async function pollingplan(params){
// 	return await request('/sys/planMain/list','get',params)
// }


// 整改
export async function hiddendangeredit(params) {
	return await request('/sys/qualitySafety/edit', 'put', params)
}
// 安全巡检计划
export async function safepolling(params) {
	return await request('/sys/planMain/queryPlanSubListApp', 'get', params)
}
// 子表修改
export async function safechildpolling(params) {
	return await request('/sys/planMain/editSub', 'put', params)
}
// 隐患类型
export async function hiddentype(params) {
	return await request('/sys/reservoirPoint/safetyTypeByCheckPointId', 'get', params)
}
// 隐患事件
export async function hiddenlibrary(params) {
	return await request('/sys/hazardLibrary/list', 'get', params)
}
// 质量安全添加
export async function qualityadd(params) {
	return await request('/sys/qualitySafety/add', 'post', params)
}
// 通过ID去查询整改详情
export async function qualityidadd(params) {
	return await request('/sys/qualitySafety/queryById', 'get', params)
}

//人员查询
export async function personList(params) {
	return await request('/person/person/list', 'get', params)
}

// 检查任务
export async function inspecttask(params) {
	return await request('/deviceMaintain/deviceInspectionPlanMain/recentAssignments', 'get', params)
}
// 保养任务
export async function upkeeptask(params) {
	return await request('/deviceMaintain/deviceMaintainPlanMain/recentAssignments', 'get', params)
}
// 维修任务
export async function servicetask(params) {
	return await request('/deviceMaintain/maintainRecord/recentAssignments', 'get', params)
}
// 保养计划
export async function upkeepplan(params) {
	return await request('/deviceMaintain/deviceMaintainPlanMain/queryPlanSubListApp', 'get', params)
}
// 检查计划
export async function inspectplan(params) {
	return await request('/deviceMaintain/deviceInspectionPlanMain/queryPlanSubListApp', 'get', params)
}
// 设备台账
export async function devicestand(params) {
	return await request('/deviceMaintain/maintainDevice/queryPageListApp', 'get', params)
}
// 设备维修添加
export async function serviceadd(params) {
	return await request('/deviceMaintain/maintainDevice/operation', 'put', params)
}
// 维修人
export async function serviceperson(params) {
	return await request('/deviceMaintain/deviceSpecialists/list', 'get', params)
}
// 设备类型
export async function servicepersontype(params) {
	return await request('/deviceMaintain/maintainDeviceType/list', 'get', params)
}
//设备列表
export async function serviceList(params) {
	return await request('/deviceMaintain/maintainDevice/list', 'get', params)
}

// 维保记录
export async function maintrecord(params) {
	return await request('/deviceMaintain/maintainRecord/list', 'get', params)
}
// 检查计划添加
export async function maintadd(params) {
	return await request('/deviceMaintain/deviceInspectionPlanMain/inspection', 'put', params)
}
// 消息
export async function megremind(params) {
	return await request('/sys/messageNoticeTemplate/list', 'get', params)
}
// 消息列表
export async function megremindList(params) {
	return await request('/sys/messageNotice/list', 'get', params)
}
// 项目信息
export async function projectList(params) {
	return await request('/sys/project/list', 'get', params)
}
// 消息推送
export async function msggo(params) {
	return await request('/sys/messageNotice/updMsgReadStatus', 'put', params)
}
// 工作台功能列表
export async function menuList(params) {
	return await request('/sys/permission/queryAppPermission', 'get', params)
}

//视屏监控设备列表
export async function deviceList(params) {
	return await request('/deviceManage/device/list', 'get', params)
}

//监控视频
export async function queryById(params) {
	return await request('/deviceManage/device/queryById', 'get', params)
}

//开始云台控制
export async function ptzStart(params) {
	return await request('/deviceManage/videoSurveillance/ptzStart', 'post', params)
}

//停止云台控制
export async function ptzStop(params) {
	return await request('/deviceManage/videoSurveillance/ptzStop', 'post', params)
}

//压力试验信息
export async function countEndFlag(params) {
	return await request('/mixingStation/pressureRecord/countEndFlag', 'get', params)
}

//压力试验记录
export async function queryRecord(params) {
	return await request('/mixingStation/pressureRecord/queryByAPP', 'get', params)
}




//AI事件任务结果-分页列表查询
export async function putMonitorResult(params) {
	return await request('/vcs/vcsEventMonitorResult/edit', 'put', params)
}
//质量安全-App端列表查询
export async function getQueryListApp(params) {
	return await request('/sys/qualitySafety/queryListApp', 'get', params)
}

//去验收-验收
export async function poAcceptance(params) {
	return await request('/sys/qualitySafety/acceptance', 'post', params)
}
//质量安全-整改
export async function poRectify(params) {
	return await request('/sys/qualitySafety/rectify', 'post', params)
}
//隐患整改单子表-通过主表ID查询
export async function querySafetySubByMainId(id) {
	return await request(`/sys/qualitySafety/querySafetySubByMainId?id=${id}`, 'get')
}
//调试党团活动-分页列表查询
export async function getVrActivity(params) {
	return await request('/sys/vrActivity/list', 'get', params)
}
// 党团文章-分页列表查询
export async function getVrArticle(params) {
	return await request('/sys/vrArticle/list', 'get', params)
}
// 水库风光-APP分页列表查询
export async function getReservoirScene(params) {
	return await request('/sys/reservoirScene/appList', 'get', params)
}
// 水库风光-详情
export async function getAppDetail(id) {
	return await request(`/sys/reservoirScene/appDetail?id=${id}`, 'get')
}
// 设备列表-无分页列表查询
export async function getNoPageList(params) {
	return await request('/deviceManage/device/noPageList', 'get', params)
}
// 云巡检记录表-分页列表查询
export async function getInspectionRecord(params) {
	return await request('/sys/inspectionRecord/list', 'get', params)
}
//质量安全-App端主子列表查询
export async function queryListAppMainSub(params) {
	return await request('/sys/qualitySafety/queryListAppMainSub', 'get', params)
}
// 党团文章-通过id查询
export async function getQueryById(id) {
	return await request(`/sys/vrArticle/queryById?id=${id}`, 'get')
}
// 党团活动-通过id查询
export async function VrActivity(id) {
	return await request(`/sys/vrActivity/queryById?id=${id}`, 'get')
}