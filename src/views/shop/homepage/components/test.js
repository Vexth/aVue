const list1 = {
  title: '基础组件库',
  items: [
    {
      title: '轮播图',
      url: 'banner',
      src: '/static/img/轮播效果.png',
      imgurl: '/static/img/轮播图1.png',
      componentId: 1
    },
    {
      title: '公告',
      url: 'announcement',
      src: '/static/img/公告.png',
      imgurl: '/static/img/公告1.png',
      componentId: 0
    },
    {
      title: '视频',
      url: 'ivideo',
      src: '/static/img/视频.png',
      imgurl: '/static/img/视频1.png',
      componentId: 12
    },
    {
      title: '搜索',
      url: 'search',
      src: '/static/img/搜索.png',
      imgurl: '/static/img/搜索框.png',
      componentId: 2
    },
    {
      title: '标题',
      url: 'ititle',
      src: '/static/img/标题.png',
      imgurl: '/static/img/标题1.png',
      componentId: 4
    },
    {
      title: '地图导航',
      url: 'map',
      src: '/static/img/地图导航.png',
      imgurl: '/static/img/地图.png',
      componentId: 13
    },
    {
      title: '购物车',
      url: 'banner',
      src: '/static/img/购物车.png',
      imgurl: '',
      componentId: null
    },
    {
      title: '客服',
      url: 'banner',
      src: '/static/img/客服.png',
      imgurl: '',
      componentId: null
    },
    {
      title: '电话',
      url: 'banner',
      src: '/static/img/电话.png',
      imgurl: '',
      componentId: null
    },
    {
      title: '分类',
      url: 'category',
      src: '/static/img/分类.png',
      imgurl: '/static/img/分类1.png',
      componentId: 3
    },
    {
      title: 'tab切换',
      url: 'imgtab',
      src: '/static/img/tab切换.png',
      imgurl: '/static/img/tab.png',
      componentId: 11
    },
  ]
}

const list2 = {
  title: '图片',
  items: [
    {
      title: '大图',
      url: 'large-img',
      src: '/static/img/图片1.png',
      imgurl: '/static/img/大图.jpg',
      componentId: 7
    },
    {
      title: '二图',
      url: 'in-img',
      src: '/static/img/图片2.png',
      imgurl: '/static/img/二图.jpg',
      componentId: 6
    },
    {
      title: '小图',
      url: 'small-img',
      src: '/static/img/图片3.png',
      imgurl: '/static/img/小图.jpg',
      componentId: 5
    },
  ]
}

const list3 = {
  title: '商品',
  items: [
    {
      title: '商品一栏',
      url: 'large-commodity',
      src: '/static/img/商品管理.png',
      imgurl: '/static/img/商品一栏.png',
      componentId: 10
    },
    {
      title: '商品二栏',
      url: 'in-commodity',
      src: '/static/img/商品管理2.png',
      imgurl: '/static/img/商品二栏.jpg',
      componentId: 9
    },
    {
      title: '商品滚动',
      url: 'small-commodity',
      src: '/static/img/商品分类.png',
      imgurl: '/static/img/商品滚动1.png',
      componentId: 8
    },
  ]
}

export const list = [list1, list2, list3]

export const li = [
  {
    title: '常用功能',
    items: [
      {
        type: 'home',
        name: '主页'
      },
      {
        type: 'shop-cart',
        name: '购物车'
      },
      {
        type: 'user',
        name: '个人中心'
      },
      {
        type: 'addcar',
        name: '车型选择'
      },
      {
        type: 'address-add',
        name: '添加地址'
      },
      {
        type: 'select-address',
        name: '地址选择'
      },
      {
        type: 'bindcar',
        name: '绑定车型'
      },
      {
        type: 'card-detail',
        name: '会员卡详情'
      },
      {
        type: 'company-introduction',
        name: '闲约科技介绍'
      },
      {
        type: '',
        name: '置空'
      }
    ]
  },
  {
    title: '商品相关',
    items: [
      {
        type: 'detail',
        name: '商品详情'
      },
      {
        type: 'group',
        name: '产品分类'
      },
      {
        type: 'order',
        name: '我的订单'
      },
      {
        type: 'order-details',
        name: '订单详情'
      },
      {
        type: 'productlist',
        name: '产品列表'
      },
    ]
  },
  {
    title: '营销工具',
    items: [
      {
        type: 'shopRecord',
        name: '会员卡消费记录'
      },
      {
        type: 'to-pay-order',
        name: '订单支付页面'
      },
      {
        type: 'vipcard',
        name: '会员卡页面'
      },
    ]
  }
]

