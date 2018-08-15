import request from '@/utils/request'

// 封装 get 请求
const get = (url, data) => request.get(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

// 封装 post 请求
const post = (url, data) => request.post(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

// 封装 delete 请求
const dele = (url, data) => request.delete(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

// // GET /api/v1/shop/product/category
export const category = data => get('api/v1/shop/product/category', data)
// // GET /api/v1/shop/product/group/tree
export const tree = data => get('api/v1/shop/product/group/tree', data)
// GET /api/v1/shop/product/group/children 商家获取商品子分组接口 通过父级ID 获取 二级分类
export const groupchildren = data => get(`api/v1/shop/product/group/children`, { params: data })
// GET /api/v1/shop/product/getSkuAttrOption
export const getSkuAttrOption = data => get('api/v1/shop/product/getSkuAttrOption', data)
// POST /api/v1/shop/product/productSkuAttrCreate
export const productSkuAttrCreate = data => post('api/v1/shop/product/productSkuAttrCreate', data)
// POST /api/v1/shop/product/productCreate
export const productCreate = data => post('api/v1/shop/product/productCreate', data)
// GET /api/v1/shop/reservation/list 动态查询订单
export const reservationList = data => get('api/v1/shop/reservation/list', data)
// POST api/v1/shop/product/productList
export const shopProductList = data => post('api/v1/shop/product/productList', data)
// GET /api/v1/shop/product/productLoad
export const shopProductLoad = data => get(`api/v1/shop/product/productLoad?productId=${data}`)
// POST /api/v1/shop/product/productModifySku
export const shopProductModifySku = data => post('api/v1/shop/product/productModifySku', data)
// POST /api/v1/shop/product/productModifyBasic
export const shopProductModifyBasic = data => post('api/v1/shop/product/productModifyBasic', data)

// POST /api/v1/shop/reservation/item/decrease 服务项目次数: 减少1次
export const itemDecrease = data => post(`api/v1/shop/reservation/item/decrease`, data)
// POST /api/v1/shop/reservation/item/delete 删除项目, 次数为0!
export const itemDelete = data => post(`api/v1/shop/reservation/item/delete`, data)
// POST /api/v1/shop/reservation/item/increase 服务项目次数: 增加1次
export const itemIncrease = data => post(`api/v1/shop/reservation/item/increase`, data)

// POST /api/v1/shop/reservation/modify/remark 修改备注和时间
export const modifyRemark = data => post('api/v1/shop/reservation/modify/remark', data)
// POST /api/v1/shop/reservation/modify/status 修改状态
export const modifyStatus = data => post('api/v1/shop/reservation/modify/status', data)

// 后台查看咨询列表
// GET /api/v1/vendor/advisory/find 后台查看咨询列表
export const advisoryFind = data => get('api/v1/vendor/advisory/find', data)
// POST /api/v1/vendor/advisory/remark 商家设置备注
export const advisoryRemark = data => post(`api/v1/vendor/advisory/remark?advisoryId=${data.advisoryId}&remark=${data.remark}`)

// 活动栏设置
// GET /api/v1/shop/page/main/config/list 微信主页配置 列表
export const shopConfigList = data => get(`api/v1/shop/page/main/config/list?cellType=${data}`)
// api/v1/shop/page/main/config/visable?cellId=xxx
export const shopConfigVisable = data => get(`api/v1/shop/page/main/config/visable?cellId=${data}`)
// POST api/v1/shop/page/main/config/group/name
export const shopConfigGroupName = data => post(`api/v1/shop/page/main/config/group/name`, data)
// POST /api/v1/shop/page/main/config/save 微信主页配置 保存单元格
export const shopConfigSave = data => post(`api/v1/shop/page/main/config/save`, data)
// GET /api/v1/shop/page/main/config/delete 删除配置
export const shopConfigDelete = data => get(`api/v1/shop/page/main/config/delete?cellId=${data}`)
// GET /api/v1/shop/page/main/config/navigate/tree 微信主页配置 跳转路径树
export const shopConfigNavigateTree = data => get(`api/v1/shop/page/main/config/navigate/tree`, data)
// api/v1/shop/image/list
export const shopImageList = data => get(`api/v1/shop/image/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)

// POST /api/v1/shop/image/upload
export const shopImageUpload = data => post(`api/v1/shop/image/upload`, data)
// GET /api/v1/shop/page/main/config/product/brief 微信主页配置 获取商品简要信息
export const shopProductBrief = data => get(`api/v1/shop/page/main/config/product/brief?productId=${data}`)

// // GET /api/v1/shop/kindsList 获取商户分类
export const shopKindsList = data => get(`api/v1/shop/kindsList?parentId=${data.parentId}&&gradeId=${data.gradeId}`)
// // GET /api/v1/shop/kindsimage/list 查看分类图库列表
export const shopKindsImageList = data => get(`api/v1/shop/kindsimage/list?gradeId=${data}`)
// // POST /api/v1/shop/addKinds 添加分类
export const shopAddKinds = data => post(`api/v1/shop/addKinds`, data)
// // POST /api/v1/shop/updateKinds 修改分类
export const shopUpdateKinds = (id, data) => post(`api/v1/shop/updateKinds?kindsId=${id}`, data)
// POST /api/v1/shop/deleteKinds 删除分类
export const shopDeleteKinds = data => post(`api/v1/shop/deleteKinds?kindinfo=${data}`)

// // POST /api/v1/shop/product/group/add 商家添加商品分组
export const shopProductGropAdd = data => post(`api/v1/shop/product/group/add`, data)
// DELETE /api/v1/shop/product/group/delete 商家删除商品分组
export const shopProductGropDelete = data => dele(`api/v1/shop/product/group/delete?groupId=${data}`)
// POST /api/v1/shop/product/group/modify 商家修改商品分组
export const shopProductGropModify = data => post(`api/v1/shop/product/group/modify`, data)

// // post /api/v1/shop/order/list 查询订单列表
export const shopOrderList = data => post(`api/v1/shop/order/list`, data)
// // POST /api/v1/shop/order/modify/star 设置订单加星状态
export const shopOrderModifyStar = data => post(`api/v1/shop/order/modify/star`, data)
// // DELETE /api/v1/shop/order/close 关闭订单
export const shopOrderClose = data => dele(`api/v1/shop/order/close`, data)
// GET /api/v1/shop/order/detail 获取订单详情
export const shopOrderDetail = data => get(`api/v1/shop/order/detail?orderId=${data}`)
// // POST /api/v1/shop/order/modify/remark 更新商家备注信息
export const shopOrderModifyRemark = data => post(`api/v1/shop/order/modify/remark`, data)
// // POST /api/v1/shop/order/modify/price 修改订单价格
export const shopOrderModifyPrice = data => post(`api/v1/shop/order/modify/price`, data)
// // POST /api/v1/shop/order/send/goods 设置发货状态
export const shopOrderSendGoods = data => post(`api/v1/shop/order/send/goods`, data)
// // POST /api/v1/shop/order/modify/refund 更新售后状态  orderId refundStatus
export const shopOrderModifyRefund = data => post(`api/v1/shop/order/modify/refund`, data)

// POST api/v1/shop/user/package/list
export const shopUserPackageList = data => post(`api/v1/shop/user/package/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}`, data.formInline)
// POST api/v1/shop/user/package/detail 查询修改和服务记录
export const shopUserPackageDetail = data => post(`api/v1/shop/user/package/detail`, data)
// POST /api/v1/shop/user/package/modify 商户修改项目服务
export const shopUserPackageModify = data => post(`api/v1/shop/user/package/modify`, data)

// GET api/v1/shop/video/list 获取商户视频列表
export const getVideoList = data => get(`api/v1/shop/video/list`, data)

// GET api/v1/shop/video/list 获取商户视频列表
export const getVideoUrl = data => get(`api/v1/wechat/video/geturl?videoVid=${data}`)
export const addVideo = data => post(`api/v1/shop/video/add`, data)
export const modifyVideo = data => post(`api/v1/shop/video/update`, data)
export const deleteVideo = data => dele(`api/v1/shop/video/delete?videoId=${data}`)