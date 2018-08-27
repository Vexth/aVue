export const urlList = {
  // // GET /api/v1/shop/product/category
  category: 'api/v1/shop/product/category',
  // // GET /api/v1/shop/product/group/tree
  tree: 'api/v1/shop/product/group/tree',
  // GET /api/v1/shop/product/group/children 商家获取商品子分组接口 通过父级ID 获取 二级分类
  groupchildren: `api/v1/shop/product/group/children`,
  // GET /api/v1/shop/product/getSkuAttrOption
  getSkuAttrOption: 'api/v1/shop/product/getSkuAttrOption',
  // POST /api/v1/shop/product/productSkuAttrCreate
  productSkuAttrCreate: 'api/v1/shop/product/productSkuAttrCreate',
  // POST /api/v1/shop/product/productCreate
  productCreate: 'api/v1/shop/product/productCreate',
  // GET /api/v1/shop/reservation/list 动态查询订单
  reservationList: 'api/v1/shop/reservation/list',
  // POST api/v1/shop/product/productList
  shopProductList: `api/v1/shop/product/productList`,
  // GET /api/v1/shop/product/productLoad
  shopProductLoad: `api/v1/shop/product/productLoad`,
  // POST /api/v1/shop/product/productModifySku
  shopProductModifySku: 'api/v1/shop/product/productModifySku',
  // POST /api/v1/shop/product/productModifyBasic
  shopProductModifyBasic: 'api/v1/shop/product/productModifyBasic',

  // POST /api/v1/shop/reservation/item/decrease 服务项目次数: 减少1次
  itemDecrease: `api/v1/shop/reservation/item/decrease`,
  // POST /api/v1/shop/reservation/item/delete 删除项目, 次数为0!
  itemDelete: `api/v1/shop/reservation/item/delete`,
  // POST /api/v1/shop/reservation/item/increase 服务项目次数: 增加1次
  itemIncrease: `api/v1/shop/reservation/item/increase`,

  // POST /api/v1/shop/reservation/modify/remark 修改备注和时间
  modifyRemark: 'api/v1/shop/reservation/modify/remark',
  // POST /api/v1/shop/reservation/modify/status 修改状态
  modifyStatus: 'api/v1/shop/reservation/modify/status',

  // 后台查看咨询列表
  // GET /api/v1/admin/advisory/find 后台查看咨询列表
  advisoryFind: 'api/v1/admin/advisory/find',
  // POST /api/v1/admin/advisory/remark 商家设置备注
  advisoryRemark: `api/v1/admin/advisory/remark`,

  // 活动栏设置
  // GET /api/v1/shop/page/main/config/list 微信主页配置 列表
  shopConfigList: `api/v1/shop/page/main/config/list`,
  // api/v1/shop/page/main/config/visable?cellId=xxx
  shopConfigVisable: `api/v1/shop/page/main/config/visable`,
  // POST api/v1/shop/page/main/config/group/name
  shopConfigGroupName: `api/v1/shop/page/main/config/group/name`,
  // POST /api/v1/shop/page/main/config/save 微信主页配置 保存单元格
  shopConfigSave: `api/v1/shop/page/main/config/save`,
  // GET /api/v1/shop/page/main/config/delete 删除配置  /api/v1/shop/page/main/config/delete
  shopConfigDelete: `api/v1/shop/page/main/config/delete`,
  // GET /api/v1/shop/page/main/config/navigate/tree 微信主页配置 跳转路径树
  shopConfigNavigateTree: `api/v1/shop/page/main/config/navigate/tree`,
  // api/v1/shop/image/list
  shopImageList: `api/v1/shop/image/list`,

  // GET /api/v1/shop/page/main/config/product/brief 微信主页配置 获取商品简要信息
  shopProductBrief: `api/v1/shop/page/main/config/product/brief`,

  // // GET /api/v1/shop/kindsList 获取商户分类
  shopKindsList: `api/v1/shop/kindsList`,
  // // GET /api/v1/shop/kindsimage/list 查看分类图库列表
  shopKindsImageList: `api/v1/shop/kindsimage/list`,
  // // POST /api/v1/shop/addKinds 添加分类
  shopAddKinds: `api/v1/shop/addKinds`,
  // // POST /api/v1/shop/updateKinds 修改分类
  shopUpdateKinds: `api/v1/shop/updateKinds`,
  // POST /api/v1/shop/deleteKinds 删除分类
  shopDeleteKinds: `api/v1/shop/deleteKinds`,

  // // POST /api/v1/shop/product/group/add 商家添加商品分组
  shopProductGropAdd: `api/v1/shop/product/group/add`,
  // DELETE /api/v1/shop/product/group/delete 商家删除商品分组
  shopProductGropDelete: `api/v1/shop/product/group/delete`,
  // POST /api/v1/shop/product/group/modify 商家修改商品分组
  shopProductGropModify: `api/v1/shop/product/group/modify`,

  // // post /api/v1/shop/order/list 查询订单列表
  shopOrderList: `api/v1/shop/order/list`,
  // // POST /api/v1/shop/order/modify/star 设置订单加星状态
  shopOrderModifyStar: `api/v1/shop/order/modify/star`,
  // // DELETE /api/v1/shop/order/close 关闭订单
  shopOrderClose: `api/v1/shop/order/close`,
  // GET /api/v1/shop/order/detail 获取订单详情
  shopOrderDetail: `api/v1/shop/order/detail`,
  // // POST /api/v1/shop/order/modify/remark 更新商家备注信息
  shopOrderModifyRemark: `api/v1/shop/order/modify/remark`,
  // // POST /api/v1/shop/order/modify/price 修改订单价格
  shopOrderModifyPrice: `api/v1/shop/order/modify/price`,
  // // POST /api/v1/shop/order/send/goods 设置发货状态
  shopOrderSendGoods: `api/v1/shop/order/send/goods`,
  // // POST /api/v1/shop/order/modify/refund 更新售后状态  orderId refundStatus
  shopOrderModifyRefund: `api/v1/shop/order/modify/refund`,

  // POST api/v1/shop/user/package/list
  shopUserPackageList: `api/v1/shop/user/package/list`,
  // POST api/v1/shop/user/package/detail 查询修改和服务记录
  shopUserPackageDetail: `api/v1/shop/user/package/detail`,
  // POST /api/v1/shop/user/package/modify 商户修改项目服务
  shopUserPackageModify: `api/v1/shop/user/package/modify`,

  // GET api/v1/shop/video/list 获取商户视频列表
  getVideoList: `api/v1/shop/video/list`,

  // GET api/v1/shop/video/list 获取商户视频列表
  getVideoUrl: `api/v1/wechat/video/geturl`,
  addVideo: `api/v1/shop/video/add`,
  modifyVideo: `api/v1/shop/video/update`,
  deleteVideo: `api/v1/shop/video/delete`,

  // 优惠券
  // GET /api/v1/shop/coupon/select/parmas 商户查询优惠券
  couponSelectParmas: `api/v1/shop/coupon/select/parmas`,
  // GET /api/v1/shop/coupon/edit/response 编辑
  couponEditResponse: `api/v1/shop/coupon/edit/response`,
  // POST /api/v1/shop/coupon/edit/request 修改存入数据库
  couponEditRequest: `api/v1/shop/coupon/edit/request`,
  // POST /api/v1/shop/coupon/create 创建优惠券
  couponCreate: `api/v1/shop/coupon/create`,
  // POST /api/v1/shop/coupon/stop/send 停止发放
  couponStopSend: `api/v1/shop/coupon/stop/send`,

  // 指标数据
  // GET /api/v1//shop/main/indicators 主页指标
  mainIndicators: `api/v1/shop/main/indicators`,
  // GET /api/v1//shop/main/topIndicators 主页排名指标
  mainTopIndicators: `api/v1/shop/main/topIndicators`
}

