import request from '@/utils/request'

const get = (url, data) => request.get(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

const post = (url, data) => request.post(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))


export const permissionList = data => get('api/v1/admin/manager/role/menu/list', data)

export const permissionAdd = data => post('api/v1/admin/manager/role/menu/add', data)

export const permissionModify = data => post('api/v1/admin/manager/role/menu/modify', data)

export const permissionDelete = data => post(`api/v1/admin/manager/role/menu/delete?id=${data.id}`, data)

