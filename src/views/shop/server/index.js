import request from '@/utils/request'

// 封装 get 请求
const get = (url, data) => request.get(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

// 封装 post 请求
const post = (url, data) => request.post(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

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
// POST /api/v1/shop/vendor/package/create 创建服务项目
export const packageCreate = data => post('api/v1/shop/vendor/package/create', data)