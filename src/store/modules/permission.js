import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function childrenHasPermissionOfPathList(pathList, route) {
  // if (route && route.children) {
  //   for (var i in pathList) {
  //     console.log('xxx = ' + pathList[i])
  //     for (var j in route.children)
  //   }
  //   return true
  // } else {
  //   return false
  // }
}

function filterChildren(children, pathList) {
  const accessChildren = children.filter(child => {
    const r = pathList.filter(path => {
      return path === child.path
    })
    // console.log(r)
    if (r.length !== 0) {
      return true
    } else {
      return false
    }
  })
  return accessChildren
}

function filterAsyncRouterWithPathTree(asyncRouterMap, pathList) {
  const accessedRouters = asyncRouterMap.filter(route => {
    // 只过滤子节点 只有两级节点
    // 如果子节点不为空 就表示该节点可用
    // if (childrenHasPermissionOfPathList(pathList, route)) {
    if (route.children && route.children.length) {
      route.children = filterChildren(route.children, pathList)
      if (route.children.length !== 0) {
        return true
      }
    }
    // }
    return false
  })

  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // const { roles } = data
        let accessedRouters
        // console.log(data)
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // console.log(data)
        // console.log(data.accountInfo)
        if (data.accountInfo.accountId === 0 ||
          data.accountInfo.accountId === 1 ||
          data.accountInfo.accountId === 2 ||
          data.accountInfo.accountId === 3 ||
          data.accountInfo.accountId === 4
        ) {
          accessedRouters = asyncRouterMap
        } else {
          const pathList = data.roleMenuList.map(e => {
            return e.path
          })
          // console.log(pathList)
          // console.log(asyncRouterMap)
          accessedRouters = filterAsyncRouterWithPathTree(asyncRouterMap, pathList)
        }
        // console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
