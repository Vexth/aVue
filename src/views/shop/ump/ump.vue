<template>
  <div class="app-container">
    <div class="application-list animation-order-1 app-recommend-list" style="display: block;">
      <p class="application-title">
        新手必备
        <a href="https://bbs.youzan.com/forum.php?mod=viewthread&amp;tid=571399" class="help-link" target="_blank">新商户如何做到月入3万＋！</a>
      </p>
      <ul>
        <li class="recomment-item" :style="{'background-color': item.color}" v-for="(item, i) in recommentItem" :key="i">
          <a href="javascript:;" target="_blank" @click="click(item.url, item.h4)">
            <h4>{{item.h4}}</h4>
            <p>{{item.p}}</p>
            <button class="detail-link" :style="{'color': item.color}">了解详情</button>
          </a>
        </li>
      </ul>
    </div>

    <div class="application-list" style="display: block;" v-for="(items, i) in applicationList" :key="i">
      <p class="application-title">
        <span>{{items.title}}</span>
        <span class="application-title-desc">{{items.desc}}</span>
      </p>
      <ul class="clearfix">
        <li class="application-item"  v-for="(item, i) in items.list" :key="i">
          <a href="javascript:;" @click="click(item.url, item.name)">
            <div class="application-logo">
              <img :src="item.img">
            </div>
            <div class="application-name">{{item.name}}</div>
            <div class="application-desc">{{item.desc}}</div>
          </a>
        </li>
      </ul>
    </div>

    <!-- <p class="application-third" style="display: block;">
      <img class="dash" src="../../../../static/img/af303cbfbc7fcac6bea50d75d0a55205.png">
      <span class="title">门店硬件、电商ERP、营销插件等更多应用，你还可以</span>
      <a href="//www.youzan.com/market" alt="有赞应用市场" target="_blank">查看“有赞应用市场”</a>
      <img class="dash" src="../../../../static/img/af303cbfbc7fcac6bea50d75d0a55205.png">
    </p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommentItem: [
        {
          color: '#ff9c45',
          url: 'appmarket/appdesc?id=706&amp;origin_url=/ump/packagebuy&amp;mark=xinshou&amp;',
          h4: '有效提升客单价',
          p: '优惠套餐，打包销售'
        },
        {
          color: '#3cd68a',
          url: 'appmarket/appdesc?id=706&amp;origin_url=/ump/packagebuy&amp;mark=xinshou&amp;',
          h4: '增粉推广神器',
          p: '多人拼团，裂变营销'
        },
        {
          color: '#b0a2f8',
          url: 'appmarket/appdesc?id=706&amp;origin_url=/ump/packagebuy&amp;mark=xinshou&amp;',
          h4: '让粉丝为你吆喝',
          p: '客户就是你的分销员'
        }
      ],
      applicationList: [
        {
          title: '销售渠道',
          desc: '多渠道售卖你的商品',
          list: [
            {
              url: '/ump/activity',
              img: '../../../../static/img/5cc3216b3e86fea96a4995f84428ce06.png',
              icon: '',
              name: '微信公众号',
              desc: '连接公众号，玩转微信生态'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/b3fe4629648a6a3fab43f6caa8be9b97.png',
              icon: '',
              name: '微信小程序',
              desc: '一键生成微信小程序'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/09503245b1132b81d5a40e016488bc5d.png',
              icon: '',
              name: '微博',
              desc: '连接微博帐号，打通微博渠道'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/80a7222515418a9da3e91a16f766b9dd.png',
              icon: '',
              name: '支付宝生活号',
              desc: '在支付宝中经营你的店铺'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/a38d08c4bd86adfd8dbe427a4f60dabe.png',
              icon: '',
              name: 'App大师',
              desc: '一键生成App'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/43dabee42eca12daa29c1b816a74278a.png',
              icon: '',
              name: 'App开店',
              desc: '让自有App快速获得电商能力'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/314ac4c5d2037ebf219fa110e970c0f4.png',
              icon: '',
              name: '供货商',
              desc: '铺货到分销市场，让自媒体大号分销'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/21497d3eaa1a7fef1625f46f04d6c3c4.png',
              icon: '',
              name: '分销员',
              desc: '客户带客户，销量涨涨涨'
            }
          ]
        },
        {
          title: '营销玩法',
          desc: '吸粉、老客带新客，提高下单转化率',
          list: [
            {
              url: '/ump/coupon',
              img: '../../../../static/img/3b35553de21da5277e5fb90fd787199d.png',
              name: '优惠券',
              desc: '向客户发放店铺优惠券'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/6f155d5bceafa57f59b399091d314acb.png',
              name: '优惠码',
              desc: '向客户发放店铺优惠码'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/c6b6a6140c3e323a05bc75a72152fe15.png',
              name: '团购返现',
              desc: '根据最终销量对买家进行返现'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/663b4dddde509b90c6200a123e505ed4.png',
              name: '订单返现',
              desc: '客户下单后获得返现奖励'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/35aadcb09089b8b1b6e45bf43a933a69.png',
              name: '限时折扣',
              desc: '设置商品限时打折促销'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/9c2f470596df3d59a64888eef3d7169a.png',
              name: '秒杀',
              desc: '快速抢购引导顾客更多消费'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/c0e9de6487d4f2cf63b8c64c31a8b146.png',
              name: '支付有礼',
              desc: '客户付款后引导参与营销互动'
            },
            {
              url: '/ump/gift',
              img: '../../../../static/img/fd5ba6b19e0724bee3c7b4e8c1b8629a.png',
              name: '赠品',
              desc: '设置赠品，回馈客户'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/fd8388a3bbe09c1282628ef9eb767c68.png',
              name: '满减/送',
              desc: '购满一定金额或件数享受优惠'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/aacca58ab07bb57a1d492142d739bdea.png',
              name: '优惠套餐',
              desc: '创建商品套餐让客户购买'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/01e22ad6a534dd083742698adca39ad0.png',
              name: '打包一口价',
              desc: '给我N元，这里的商品随便挑'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/3ebf966975334f9b06278e9d175d7c4a.png',
              name: '多人拼团',
              desc: '引导客户邀请朋友一起拼团购买'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/6f1407151a5a9467cd6cf4a21350dff8.png',
              name: '周期购',
              desc: '一次性卖掉一年的商品'
            },

            {
              url: '/ump/activity',
              img: '../../../../static/img/ed4690d346171f78a11c9261d4371386.png',
              name: '降价拍',
              desc: '价格随时间下降的促销活动'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/09287bf2547cc33b2e935a6a38fef727.png',
              name: '找人代付',
              desc: '让客户可以邀请朋友代付款'
            },

            {
              url: '/ump/activity',
              img: '../../../../static/img/dff8776e552d3408abd800e4a04944ed.png',
              name: '我要送礼',
              desc: '让客户可以购买商品送给朋友'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/6fde66ce312b402f6bb140826fbd67f2.png',
              name: '刮刮卡',
              desc: '通过刮开卡片进行抽奖的玩法'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/b1f911cb3e882b1396706e6bba4fcea4.png',
              name: '疯狂猜',
              desc: '回答问题，按答题情况给奖励'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/2f7466594dac012476c1b13f4f65a101.png',
              name: '生肖翻翻看',
              desc: '通过翻卡片进行抽奖的玩法'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/2af7e724a67c2b61db519d66e66b0c14.png',
              name: '分场次抽奖',
              desc: '多个场次，⽴即抽奖'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/f1be031b020e754b0d30877bad201fb6.png',
              name: '幸运砸金蛋',
              desc: '好运砸出来'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/400855584ccaf4896c8e387739d5f7d3.png',
              name: '幸运大抽奖',
              desc: '常见的转盘式抽奖玩法'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/8aaf304ab274a05f86b37a49004026ee.png',
              name: '摇一摇',
              desc: '让客户摇一摇，进行抽奖'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/8fd1d16d2d12a208bd1614d96ff9f69a.png',
              name: '水果机',
              desc: '水果方格转盘抽奖'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/49091d9dafeb404ded6eec270e7f2ab3.png',
              name: '好友瓜分券',
              desc: '邀请好友瓜分优惠券，带来更多流量'
            }
          ]
        },
        {
          title: '客群维护',
          desc: '让老客户更多重复购买，提高客单贡献',
          list: [
            {
              url: '/ump/activity',
              img: '../../../../static/img/e790e67d4fb0d272b1f78eef02f0587f.png',
              name: '签到',
              desc: '每日签到领取积分或奖励'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/ace4ce49d7e71fc20f13483c6ea2362a.png',
              name: '会员卡',
              desc: '设置并给客户发放会员卡'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/1ce51aacb68802468d90ea0c15cce689.png',
              name: '会员储值',
              desc: '开通会员储值功能'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/d63b9a1aa8e0b3a0ac77635866e4cb28.png',
              name: '礼品卡',
              desc: '获新客、促活跃、提复购'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/f5662bd03e6768ae8f4df3535c0596fd.png',
              name: '积分商城',
              desc: '让客户用积分兑换礼品'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/d3dec67706a710977b797488947b85af.png',
              name: '发券宝',
              desc: '优惠券定向群发神器'
            }
          ]
        },
        {
          title: '经营分析',
          desc: '掌握客户动向，实时分析经营数据，高效优化运营效果',
          list: [
            {
              url: '/ump/activity',
              img: '../../../../static/img/f0b11a97c81f9e2b646d1f2a62119e0c.png',
              name: '热力图',
              desc: '掌握页面点击热点'
            }
          ]
        },
        {
          title: '配套工具',
          desc: '扫码、核销、多网点、调研等',
          list: [
            {
              url: '/ump/activity',
              img: '../../../../static/img/2c8bf22e375d0aba3fd1144cb7ab8f25.png',
              name: '扫码收款',
              desc: '生成直接收款页面和收款码'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/bcea73fcdecdfb182dfc04f9ad8c9415.png',
              name: '验证工具',
              desc: '核销优惠券/码、电子卡券等'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/964c51bc2754946445f92aa13d06885a.png',
              name: '消息推送',
              desc: '向客户发送短信/微信消息通知'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/1f8e6844f9f540254fe4bd1dcd823dbf.png',
              name: '多网点',
              desc: '根据客户位置推荐附近门店'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/b57b6250c6c96095e2db3c52ef61ad15.png',
              name: '投票调查',
              desc: '创建在线投票调查页面'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/66e48c200753536dd9a277106f2fc53b.png',
              name: '模板市场',
              desc: '丰富的页面模版供你挑选'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/273dc78fed266637bfc8904c34f6870f.png',
              name: '退货运费补贴',
              desc: '买家退货可享受运费补贴'
            }
          ]
        },
        {
          title: '垂直行业',
          desc: '知识付费、酒店等垂直行业应用',
          list: [
            {
              url: '/ump/activity',
              img: '../../../../static/img/58aee5622ed7ab4eb2fdd93f15036403.png',
              name: '知识付费',
              desc: '图文、音频、视频等内容变现触手可及'
            },
            {
              url: '/ump/activity',
              img: '../../../../static/img/15b8c8b38992304da9fd09eb2a84fd1d.png',
              name: '酒店预订',
              desc: '便捷管理每日房价和库存'
            }
          ]
        }
      ]
    }
  },

  methods: {
    click(item, title) {
      this.$router.push({ path: item, query: { name: title }})
    }
  }
}
</script>

<style scoped>
@import url(./ump.css);
</style>
