import request from '@/utils/request'

const get = (url, data) => request.get(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

const post = (url, data) => request.post(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

const del = (url, data) => request.delete(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

// 菜单管理
export const menuList = data => get('api/v1/admin/manager/role/menu/list', data)

export const menuAdd = data => post('api/v1/admin/manager/role/menu/add', data)

export const menuModify = data => post('api/v1/admin/manager/role/menu/modify', data)

export const menuDelete = data => post(`api/v1/admin/manager/role/menu/delete?id=${data.id}`, data)

// 角色管理
export const roleList = data => get('api/v1/admin/manager/role/list', data)
export const roleAdd = data => post('api/v1/admin/manager/role/add', data)
export const roleDelete = data => del(`api/v1/admin/manager/role/delete?roleId=${data.roleId}`, data)
export const roleModify = data => post('api/v1/admin/manager/role/modify', data)
