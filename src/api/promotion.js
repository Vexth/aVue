import { get, post, del } from '@/api/base'

// 促销活动
export const promotionList = data => get(`api/v1/shop/promotion/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}`, data)

export const promotionProductList = data => post(`api/v1/shop/promotion/product/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}`, data)
// export const promotionProductBrief = data => get(`api/v1/shop/promotion/product/brief/${data.ruleType}/${data.productId}`)

export const promotionCreate = data => post(`api/v1/shop/promotion/create`, data)

export const promotionModify = data => post(`api/v1/shop/promotion/modify`, data)

export const promotionStatus = data => post(`api/v1/shop/promotion/status`, data)

export const promotionDelete = data => del(`api/v1/shop/promotion/delete/${data.vendorId}/${data.promotionId}`, data)
