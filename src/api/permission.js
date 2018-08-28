import { get, post, del } from '@/api/base'

// 菜单管理
export const menuList = data => get('api/v1/admin/manager/admin/role/menu/list', data)

export const menuAdd = data => post('api/v1/admin/manager/admin/role/menu/add', data)

export const menuModify = data => post('api/v1/admin/manager/admin/role/menu/modify', data)

export const menuDelete = data => post(`api/v1/admin/manager/admin/role/menu/delete?menuId=${data.id}`, data)

// 角色管理
export const roleList = data => get('api/v1/admin/manager/admin/role/list', data)

export const roleAdd = data => post('api/v1/admin/manager/admin/role/add', data)

export const roleDelete = data => del(`api/v1/admin/manager/admin/role/delete?roleId=${data.roleId}`, data)

export const roleModify = data => post('api/v1/admin/manager/admin/role/modify', data)

// 商户管理
export const vendorList = data => get('api/v1/admin/manager/admin/user/list', data)
export const vendorAdd = data => post('api/v1/admin/manager/admin/user/add', data)
export const vendorDelete = data => del(`api/v1/admin/manager/admin/user/delete?vendorId=${data.vendorId}`, data)
export const vendorModify = data => post('api/v1/admin/manager/admin/user/modify', data)
