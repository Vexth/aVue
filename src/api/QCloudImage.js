import request from '@/utils/request'

const get = (url, data) => request.get(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

const post = (url, data) => request.post(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

export var Bucket = 'business-1253650513'
export var Region = 'ap-guangzhou'

export const getAuth = options => get(`api/v1/shop/image/qcloud/auth?method=${options.Method}&key=/${options.Key}`)

export const uploadImageUrl = data => post(`api/v1/shop/image/qcloud/upload/url`, data)
