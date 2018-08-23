import request from '@/utils/request'

import { urlList } from './url.js'

// 封装 get 请求
const get = (url, data) => request.get(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

// 封装 post 请求
const post = (url, data) => request.post(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

// 封装 delete 请求
const dele = (url, data) => request.delete(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

// // GET /api/v1/shop/product/category
export const category = data => get(urlList.category, data)
// // GET /api/v1/shop/product/group/tree
export const tree = data => get(urlList.tree, data)
// GET /api/v1/shop/product/group/children 商家获取商品子分组接口 通过父级ID 获取 二级分类
export const groupchildren = data => get(urlList.groupchildren, { params: data })
// GET /api/v1/shop/product/getSkuAttrOption
export const getSkuAttrOption = data => get(urlList.getSkuAttrOption, data)
// POST /api/v1/shop/product/productSkuAttrCreate
export const productSkuAttrCreate = data => post(urlList.productSkuAttrCreate, data)
// POST /api/v1/shop/product/productCreate
export const productCreate = data => post(urlList.productCreate, data)
// GET /api/v1/shop/reservation/list 动态查询订单
export const reservationList = data => get(urlList.reservationList, { params: data })
// POST api/v1/shop/product/productList
export const shopProductList = data => post(`${urlList.shopProductList}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`, data)
// GET /api/v1/shop/product/productLoad
export const shopProductLoad = data => get(`${urlList.shopProductLoad}?productId=${data}`)
// POST /api/v1/shop/product/productModifySku
export const shopProductModifySku = data => post(urlList.shopProductModifySku, data)
// POST /api/v1/shop/product/productModifyBasic
export const shopProductModifyBasic = data => post(urlList.shopProductModifyBasic, data)

// POST /api/v1/shop/reservation/item/decrease 服务项目次数: 减少1次
export const itemDecrease = data => post(urlList.itemDecrease, data)
// POST /api/v1/shop/reservation/item/delete 删除项目, 次数为0!
export const itemDelete = data => post(urlList.itemDelete, data)
// POST /api/v1/shop/reservation/item/increase 服务项目次数: 增加1次
export const itemIncrease = data => post(urlList.itemIncrease, data)

// POST /api/v1/shop/reservation/modify/remark 修改备注和时间
export const modifyRemark = data => post(urlList.modifyRemark, data)
// POST /api/v1/shop/reservation/modify/status 修改状态
export const modifyStatus = data => post(urlList.modifyStatus, data)

// 后台查看咨询列表
// GET /api/v1/vendor/advisory/find 后台查看咨询列表
export const advisoryFind = data => get(urlList.advisoryFind, data)
// POST /api/v1/vendor/advisory/remark 商家设置备注
export const advisoryRemark = data => post(`${urlList.advisoryRemark}?advisoryId=${data.advisoryId}&remark=${data.remark}`)

// 活动栏设置
// GET /api/v1/shop/page/main/config/list 微信主页配置 列表
export const shopConfigList = data => get(urlList.shopConfigList, { params: data })
// api/v1/shop/page/main/config/visable?cellId=xxx
export const shopConfigVisable = data => get(urlList.shopConfigVisable,  { params: data })
// POST api/v1/shop/page/main/config/group/name
export const shopConfigGroupName = data => post(urlList.shopConfigGroupName, data)
// POST /api/v1/shop/page/main/config/save 微信主页配置 保存单元格
export const shopConfigSave = data => post(urlList.shopConfigSave, data)
// GET /api/v1/shop/page/main/config/delete 删除配置
export const shopConfigDelete = data => get(urlList.shopConfigDelete, { params: data })
// GET /api/v1/shop/page/main/config/navigate/tree 微信主页配置 跳转路径树
export const shopConfigNavigateTree = data => get(urlList.shopConfigNavigateTree, data)
// api/v1/shop/image/list
export const shopImageList = data => get(urlList.shopImageList, { params: data })

// GET /api/v1/shop/page/main/config/product/brief 微信主页配置 获取商品简要信息
export const shopProductBrief = data => get(urlList.shopProductBrief, { params: data })

// // GET /api/v1/shop/kindsList 获取商户分类
export const shopKindsList = data => get(urlList.shopKindsList, { params: data })
// // GET /api/v1/shop/kindsimage/list 查看分类图库列表
export const shopKindsImageList = data => get(urlList.shopKindsImageList, { params: data })
// // POST /api/v1/shop/addKinds 添加分类
export const shopAddKinds = data => post(urlList.shopAddKinds, data)
// // POST /api/v1/shop/updateKinds 修改分类
export const shopUpdateKinds = (id, data) => post(`${urlList.shopUpdateKinds}?kindsId=${id}`, data)
// POST /api/v1/shop/deleteKinds 删除分类
export const shopDeleteKinds = data => post(`${urlList.shopDeleteKinds}?kindinfo=${data}`)

// // POST /api/v1/shop/product/group/add 商家添加商品分组
export const shopProductGropAdd = data => post(urlList.shopProductGropAdd, data)
// DELETE /api/v1/shop/product/group/delete 商家删除商品分组
export const shopProductGropDelete = data => dele(`${urlList.shopProductGropDelete}?groupId=${data}`)
// POST /api/v1/shop/product/group/modify 商家修改商品分组
export const shopProductGropModify = data => post(urlList.shopProductGropModify, data)

// // post /api/v1/shop/order/list 查询订单列表
export const shopOrderList = data => post(urlList.shopOrderList, data)
// // POST /api/v1/shop/order/modify/star 设置订单加星状态
export const shopOrderModifyStar = data => post(urlList.shopOrderModifyStar, data)
// // DELETE /api/v1/shop/order/close 关闭订单
export const shopOrderClose = data => dele(urlList.shopOrderClose, data)
// GET /api/v1/shop/order/detail 获取订单详情
export const shopOrderDetail = data => get(urlList.shopOrderDetail, { params: data })
// // POST /api/v1/shop/order/modify/remark 更新商家备注信息
export const shopOrderModifyRemark = data => post(urlList.shopOrderModifyRemark, data)
// // POST /api/v1/shop/order/modify/price 修改订单价格
export const shopOrderModifyPrice = data => post(urlList.shopOrderModifyPrice, data)
// // POST /api/v1/shop/order/send/goods 设置发货状态
export const shopOrderSendGoods = data => post(urlList.shopOrderSendGoods, data)
// // POST /api/v1/shop/order/modify/refund 更新售后状态  orderId refundStatus
export const shopOrderModifyRefund = data => post(urlList.shopOrderModifyRefund, data)

// POST api/v1/shop/user/package/list
export const shopUserPackageList = data => post(`${urlList.shopUserPackageList}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`, data.formInline)
// POST api/v1/shop/user/package/detail 查询修改和服务记录
export const shopUserPackageDetail = data => post(urlList.shopUserPackageDetail, data)
// POST /api/v1/shop/user/package/modify 商户修改项目服务
export const shopUserPackageModify = data => post(urlList.shopUserPackageModify, data)

// GET api/v1/shop/video/list 获取商户视频列表
export const getVideoList = data => get(urlList.getVideoList, data)

// GET api/v1/shop/video/list 获取商户视频列表
export const getVideoUrl = data => get(urlList.getVideoUrl, { params: data })
export const addVideo = data => post(urlList.addVideo, data)
export const modifyVideo = data => post(urlList.modifyVideo, data)
export const deleteVideo = data => dele(`${urlList.deleteVideo}?videoId=${data}`)

// 优惠券
// GET /api/v1/vendor/coupon/select/parmas 商户查询优惠券
export const couponSelectParmas = data => get(urlList.couponSelectParmas, { params: data })
// GET /api/v1/vendor/coupon/edit/response 编辑
export const couponEditResponse = data => get(urlList.couponEditResponse, { params: data })
// POST /api/v1/vendor/coupon/edit/request 修改存入数据库
export const couponEditRequest = data => post(urlList.couponEditRequest, data)
// POST /api/v1/vendor/coupon/create 创建优惠券
export const couponCreate = data => post(urlList.couponCreate, data)
export const couponStopSend = data => post(`${urlList.couponStopSend}?couponId=${data}`)