import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }/*,
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: () => import('@/views/documentation/index'),
      name: 'documentation',
      meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [{
      path: 'index',
      component: () => import('@/views/guide/index'),
      name: 'guide',
      meta: { title: 'guide', icon: 'guide', noCache: true }
    }]
  }
  */
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /*
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'pagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'directivePermission',
      meta: {
        title: 'directivePermission'
        // if do not set roles, means: this page does not require permission
      }
    }]
  },

  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: () => import('@/views/components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: () => import('@/views/components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: () => import('@/views/components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'splitpane', component: () => import('@/views/components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: () => import('@/views/components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: () => import('@/views/components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: () => import('@/views/components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: () => import('@/views/components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: () => import('@/views/components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: () => import('@/views/components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }},
      { path: 'drag-dialog', component: () => import('@/views/components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: 'dragDialog' }},
      { path: 'dnd-list', component: () => import('@/views/components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'drag-kanban', component: () => import('@/views/components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: 'dragKanban' }}
    ]
  },

  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: () => import('@/views/charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
      { path: 'line', component: () => import('@/views/charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: () => import('@/views/charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/tab/index'),
      name: 'tab',
      meta: { title: 'tab', icon: 'tab' }
    }]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'table',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [
      { path: 'dynamic-table', component: () => import('@/views/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
      { path: 'drag-table', component: () => import('@/views/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
      { path: 'inline-edit-table', component: () => import('@/views/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
      { path: 'tree-table', component: () => import('@/views/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
      { path: 'custom-tree-table', component: () => import('@/views/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
      { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      { path: 'create', component: () => import('@/views/example/create'), name: 'createArticle', meta: { title: 'createArticle', icon: 'edit' }},
      { path: 'edit/:id(\\d+)', component: () => import('@/views/example/edit'), name: 'editArticle', meta: { title: 'editArticle', noCache: true }, hidden: true },
      { path: 'list', component: () => import('@/views/example/list'), name: 'articleList', meta: { title: 'articleList', icon: 'list' }}
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'log', component: () => import('@/views/errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: () => import('@/views/excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'export-selected-excel', component: () => import('@/views/excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'upload-excel', component: () => import('@/views/excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [{ path: 'download', component: () => import('@/views/zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: () => import('@/views/theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: () => import('@/views/clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  },

*/
  {
    path: '/permissionConfig',
    meta: {
      title: 'permissionConfig',
      icon: 'table'
    },
    component: Layout,
    children: [
      { path: 'menuConfig', component: () => import('@/views/admin/menuConfig'), name: 'menuConfig', meta: { title: 'menuConfig', noCache: true }},
      { path: 'roleConfig', component: () => import('@/views/admin/roleConfig'), name: 'roleConfig', meta: { title: 'roleConfig', noCache: true }},
      { path: 'userConfig', component: () => import('@/views/admin/userConfig'), name: 'userConfig', meta: { title: 'userConfig', noCache: true }}
    ]
  },
  {
    path: '/homepage',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: 'homepage1',
      icon: 'table'
    },
    children: [
      { path: 'banner', component: () => import('@/views/shop/homepage/banner'), name: 'banner', meta: { title: 'banner', noCache: true }},
      { path: 'activity1', component: () => import('@/views/shop/homepage/activity'), name: 'activity1', meta: { title: 'activity1', noCache: true }},
      { path: 'activity2', component: () => import('@/views/shop/homepage/activity'), name: 'activity2', meta: { title: 'activity2', noCache: true }},
      { path: 'homeimg', component: () => import('@/views/shop/homepage/homeimg'), name: 'homeimg', meta: { title: 'homeimg', noCache: true }},
      { path: 'specialSubject', component: () => import('@/views/shop/homepage/specialSubject'), name: 'specialSubject', meta: { title: 'specialSubject', noCache: true }},
      { path: 'endorsement', component: () => import('@/views/shop/homepage/endorsement'), name: 'endorsement', meta: { title: 'endorsement', noCache: true }},
      { path: 'notify', component: () => import('@/views/shop/homepage/notify'), name: 'notify', meta: { title: 'notify', noCache: true }},
      { path: 'bindvideo', component: () => import('@/views/shop/homepage/bindvideo'), name: 'bindvideo', meta: { title: 'bindvideo', noCache: true }}
    ]
  },
  {
    path: '/showcase',
    component: Layout,
    redirect: 'noredirect',
    name: 'showcase',
    meta: {
      title: 'showcase',
      icon: 'chart'
    },
    children: [
      { path: 'goodslist', component: () => import('@/views/shop/showcase/goodslist'), name: 'goodslist', meta: { title: 'goodslist', noCache: true }},
      { path: 'member', component: () => import('@/views/shop/showcase/member'), name: 'member', meta: { title: 'member', noCache: true }},
      { path: 'hyk_manage', component: () => import('@/views/shop/showcase/hyk_manage'), name: 'hyk_manage', meta: { title: 'hyk_manage', noCache: true }},
      { path: 'addlist', component: () => import('@/views/shop/showcase/addlist'), name: 'addlist', meta: { title: 'addlist', noCache: true }, hidden: true },
      { path: 'addgoods', component: () => import('@/views/shop/showcase/addgoods'), name: 'addgoods', meta: { title: 'addgoods', noCache: true }, hidden: true },
      { path: 'modifygoods', component: () => import('@/views/shop/showcase/modifygoods'), name: 'modifygoods', meta: { title: 'modifygoods', noCache: true }, hidden: true }
    ]
  },

  {
    path: '/trade',
    component: Layout,
    redirect: 'noredirect',
    name: 'trade',
    meta: {
      title: 'trade',
      icon: 'list'
    },
    children: [
      { path: 'orderlist', component: () => import('@/views/shop/trade/orderlist'), name: 'orderlist', meta: { title: 'orderlist', noCache: true }},
      { path: 'orderOverview', component: () => import('@/views/shop/trade/orderOverview'), name: 'orderOverview', meta: { title: 'orderOverview', noCache: true }}
      // { path: 'modifygoods', component: () => import('@/views/trade/modifygoods'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }, hidden: true}
    ]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: 'noredirect',
    name: 'customer',
    meta: {
      title: 'customer',
      icon: 'user'
    },
    children: [
      { path: 'customerlist', component: () => import('@/views/shop/customer/customerlist'), name: 'customerlist', meta: { icon: 'user', title: 'customerlist', noCache: true }}
      // { path: 'goodslist', component: () => import('@/views/trade/goodslist'), name: '商品列表', meta: { title: '商品列表', noCache: true }},
      // { path: 'modifygoods', component: () => import('@/views/trade/modifygoods'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }, hidden: true}
    ]
  },

  {
    path: '/ump',
    component: Layout,
    redirect: 'noredirect',
    name: 'ump',
    meta: {
      title: 'ump',
      icon: 'international'
    },
    children: [
      { path: 'ump1', component: () => import('@/views/shop/ump/ump'), name: 'ump1', meta: { icon: 'international', title: 'ump', noCache: true }},
      { path: 'activity', component: () => import('@/views/shop/ump/activity'), name: 'activity', meta: { title: 'activity', noCache: true }, hidden: true },
      { path: 'coupon', component: () => import('@/views/shop/ump/coupon'), name: 'coupon', meta: { title: 'coupon', noCache: true }, hidden: true }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: 'system',
    meta: {
      title: 'system',
      icon: 'component'
    },
    children: [
      { path: 'navsys', component: () => import('@/views/shop/system/navsys'), name: 'navsys', meta: { icon: 'component', title: 'navsys', noCache: true }}
      // { path: 'activity', component: () => import('@/views/shop/ump/activity'), name: 'activity', meta: { title: 'activity', noCache: true }, hidden: true }
    ]
  },

  {
    path: '/grouping',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: 'system',
      icon: 'excel'
    },
    children: [{ path: 'grouping', component: () => import('@/views/shop/grouping/grouping'), name: 'grouping', meta: { title: 'grouping', icon: 'excel', noCache: true }}]
  },

  // {
  //   path: '/cropper',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: {
  //     title: 'system',
  //     icon: 'excel'
  //   },
  //   children: [{ path: 'cropper', component: () => import('@/views/shop/img-cropper/cropper'), name: 'cropper', meta: { title: 'cropper', icon: 'excel', noCache: true }}]
  // },

  {
    path: '/cooperation',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: 'system',
      icon: 'user'
    },
    children: [{ path: 'cooperation', component: () => import('@/views/shop/cooperation/cooperation'), name: 'cooperation', meta: { title: 'cooperation', icon: 'user', noCache: true }}]
  },

  {
    path: '/video',
    component: Layout,
    redirect: 'noredirect',
    name: 'video',
    meta: {
      title: 'video',
      icon: 'user'
    },
    children: [
      { path: 'index', component: () => import('@/views/shop/video/video'), name: 'videoIndex', meta: { icon: 'user', title: 'video', noCache: true }}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
