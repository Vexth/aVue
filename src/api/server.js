import request from '@/utils/request'

export function ProductCategoryOption(query) {
  return request({
    url: 'shop/ProductCategoryOption',
    method: 'get',
    params: query
  })
}
