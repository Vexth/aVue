import request from '@/utils/request'

const get = (url, data) => request.get(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

const post = (url, data) => request.post(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

const del = (url, data) => request.delete(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

// 菜单管理
export const menuList = data => get('api/v1/admin/manager/vendor/role/menu/list', data)

export const menuAdd = data => post('api/v1/admin/manager/vendor/role/menu/add', data)

export const menuModify = data => post('api/v1/admin/manager/vendor/role/menu/modify', data)

export const menuDelete = data => post(`api/v1/admin/manager/vendor/role/menu/delete?id=${data.id}`, data)

// 角色管理
export const roleList = data => get('api/v1/admin/manager/vendor/role/list', data)

export const roleAdd = data => post('api/v1/admin/manager/vendor/role/add', data)

export const roleDelete = data => del(`api/v1/admin/manager/vendor/role/delete?roleId=${data.roleId}`, data)

export const roleModify = data => post('api/v1/admin/manager/vendor/role/modify', data)

// 商户管理
export const vendorList = data => get('api/v1/admin/manager/vendor/user/list', data)
export const vendorAdd = data => post('api/v1/admin/manager/vendor/user/add', data)
export const vendorDelete = data => del(`api/v1/admin/manager/vendor/user/delete?vendorId=${data.vendorId}`, data)
export const vendorModify = data => post('api/v1/admin/manager/vendor/user/modify', data)
