/**
 * ==========
 * 摄影状态数据
 * ==========
 */
const album = {
  namespaced: true,

  state: {
    // 摄影列表数据 this.$store.state.album.albumList
    albumList: [],
    // 摄影项信息数据
    albumInfo: {},
    // 摄影榜封面数据
    rankFace: {},
    // 摄影周榜列表数据
    rankWeekList: {},
    // 摄影月榜列表数据
    rankMonthList: {},
	beamfield:[],
	pedestal:[],
	already:[],
	clockpend:[],
	manufacturList:[],
	scheme:[],
	dange:[],
	inspecttask:[],
	upkeep:[],
	service:[],
	maintain:[],
	inspectplan:[],
	stand:[],
	mainrecords:[],
	commondata:[]
    //
  },
  getters: {
    // 摄影列表数据条数  this.$store.getters['album/getAlbumListCount']
    getAlbumListCount: state => state.albumList.length,
    // 摄影列表数组对象  this.$store.getters['album/getAlbumListData']
    getAlbumListData: state => state.albumList,
    // 摄影项数据对象
    getAlbumInfoData: state => state.albumInfo,
    // 摄影榜封面对象
    getRankFaceData: state => state.rankFace,
    // 摄影周榜列表对象
    getRankWeekListData: state => state.rankWeekList,
    // 摄影月榜列表对象 this.$store.getters['album/getRankMonthListData']
    getRankMonthListData: state => state.rankMonthList,
    //
	// 桥梁
	beamfieldList:state=>state.beamfield,
	
	pedestalList:state=>state.pedestal,
	
	// 已制作
	already:state=>state.already,
	clockListtime:state=>state.clockpend,
	manufacturListimg:state=>state.manufacturList,
	// 巡检计划
	schemeing:state=>state.scheme,
	dangeimg:state=>state.dange,
	getinspecttask:state=>state.inspecttask,
	getupkeep:state=>state.upkeep,
	getservice:state=>state.service,
	// 保养计划
	getmaintain:state=>state.maintain,
	// 检查计划
	getinspectplan:state=>state.inspectplan,
	// 台账
	getstand:state=>state.stand,
	mainrecord:state=>state.mainrecords,
	getcommon:state=>state.commondata
  },
  mutations: {
    // 修改摄影列表数组对象 this.$store.commit('album/setAlbumListData', [...])
    setAlbumListData(state, data) {
      state.albumList = data
    },
    // 11存储首页文章视频的数量
    setAlbumInfoData(state, data) {
	  console.log(JSON.parse(data))
      state.albumInfo = data
    },
    // 修改摄影榜封面对象 this.$store.commit('album/setRankFaceData', {...})
    setRankFaceData(state, data) {
      state.rankFace = data
    },
    // 修改摄影周榜列表对象 this.$store.commit('album/setRankWeekListData', {...})
    setRankWeekListData(state, data) {
      state.rankWeekList = data
    },
    // 修改摄影月榜列表对象 this.$store.commit('album/setRankMonthListData', {...})
    setRankMonthListData(state, data) {
      state.rankMonthList = data
    },
	// 桥梁
	beamfieldList(state,data){
		state.beamfield=data
	},
	// 已制作
	beamfieldListready(state,data){
		state.already=data
	},
	pedestalListpent(state,data){
		state.pedestal=data
	},
    //
	// 生产记录
	clockList(state,data){
		state.clockpend=data
	},
	// 制作中
	manufacturing(state,data){
		state.manufacturList=data
	},
	schemeList(state,data){
		state.scheme=data
	},
	// 隐患整改
	dangerList(state,data){
		state.dange=data
	},
	// 检查任务
	taskList(state,data){
		state.inspecttask=data
	},
	upkeepList(state,data){
		state.upkeep=data
	},
	serviceList(state,data){
		state.service=data;
	},
	// 保养计划
	maintainList(state,data){
		state.maintain=data
	},
	inspectplanList(state,data){
		state.inspectplan=data
	},
	standList(state,data){
		state.stand=data;
	},
	mainrecordList(state,data){
		state.mainrecords=data
	},
	commonList(state,data){
		state.commondata=data
	}
  }
}

export default album
