import request from '@/api/request.js';


// 今日磅单查询1
export async function getWordList(params) {
  return await request('/materials/weighbridgeBill/queryAppList', 'get', params)
}

//磅单偏差统计
export async function getWordInfo(params) {
  return await request('/materials/weighbridgeBill/countWeighbridgeBill','post',params)
}

// 历史磅单数据
export async function getWordContentHTML(params) {
  return await request('/materials/weighbridgeBill/queryAppList','get',params)
}

// 磅单材料名称
export async function mongLists(params) {
  return await request('/materials/classify/listAll','get',params)
}

