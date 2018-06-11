<template>
  <div class="app-container">
    <p class="warn-content">
      {{$t('guide.description')}}
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.
      </a>
    </p>
    <el-button icon='el-icon-question' type="primary" @click.prevent.stop="guide">{{$t('guide.button')}}</el-button>

  <!-- <form class="zent-form zent-form--horizontal">
   <div class="goods-edit__region">
    <div class="goods-edit__region--inner">
     <div class="goods-edit__region-title">
      <div class="goods-edit__region-title--inner">商品类型</div>
     </div>
     <div class="goods-edit__region-content">
      <div class="goods-edit__region-content--inner">
       <div class="zent-form__control-group shipment-field no-control-label">
        <label class="zent-form__control-label"></label>
        <div class="zent-form__controls">
         <div class="zent-radio-group">
          <label class="zent-radio-wrap zent-radio-checked"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span class="shipment-field__name">实物商品</span><span class="shipment-field__desc">（物流发货）</span></span></label>
          <label class="zent-radio-wrap"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span class="shipment-field__name">虚拟商品</span><span class="shipment-field__desc">（无需物流）</span></span></label>
          <label class="zent-radio-wrap"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span class="shipment-field__name">电子卡券</span><span class="shipment-field__desc">（无需物流）</span></span></label>
          <label class="zent-radio-wrap"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span class="shipment-field__name">酒店商品</span><span class="shipment-field__desc">（无需物流）</span></span></label>
          <label class="zent-radio-wrap"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span class="shipment-field__name">蛋糕烘焙</span><span class="shipment-field__desc">（同城送或自提）</span></span></label>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group no-control-label">
        <label class="zent-form__control-label"></label>
        <div class="zent-form__controls">
         <div class="fold-field">
          <i class="zenticon zenticon-caret-down fold-field__icon"></i>
          <a class="fold-field__txt" href="javascript:;">折叠更多设置</a>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group no-control-label shop-method-field">
        <label class="zent-form__control-label"></label>
        <div class="zent-form__controls">
         <div>
          <label class="zent-form__checkbox zent-checkbox-wrap"><span class="zent-checkbox"><span class="zent-checkbox-inner"></span><input type="checkbox" value="on" /></span><span>跳转到其他网站购买</span></label>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group link-field hide">
        <label class="zent-form__control-label"><em class="zent-form__required">*</em>外部购买地址：</label>
        <div class="zent-form__controls">
         <div class="zent-input-wrapper">
          <input type="text" class="zent-input" name="buy_url" value="http://" />
         </div>
        </div>
       </div>
       <div class="zent-form__control-group buyway-desc-field">
        <p class="help-block help-block--checkbox"><span class="c-gray">因特殊流程（如电影选座等）需要，可以从有赞商品详情跳转到外部购买，最多支持50个外部购买商品</span></p>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div class="goods-edit__region">
    <div class="goods-edit__region--inner">
     <div class="goods-edit__region-title">
      <div class="goods-edit__region-title--inner">基本信息</div>
     </div>
     <div class="goods-edit__region-content">
      <div class="goods-edit__region-content--inner">
       <div class="zent-form__control-group has-error ">
        <label class="zent-form__control-label"><em class="zent-form__required">*</em>商品名：</label>
        <div class="zent-form__controls">
         <span>
          <div class="zent-input-wrapper input-xxlarge">
           <input type="text" class="zent-input" value="" />
          </div></span>
         <p class="zent-form__error-desc">商品名称必须填写，最多100个字</p>
        </div>
       </div>
       <div class="zent-form__control-group ">
        <label class="zent-form__control-label">分享描述：</label>
        <div class="zent-form__controls">
         <span>
          <div class="zent-input-wrapper input-xxlarge">
           <input type="text" class="zent-input" value="" />
          </div><p class="help-block">微信分享给好友时会显示，建议36个字以内<a href="javascript:;" rel="noopener noreferrer" style="margin-left: 5px;">查看示例</a></p></span>
        </div>
       </div>
       <div class="zent-form__control-group has-error upload-field">
        <label class="zent-form__control-label"><em class="zent-form__required">*</em>商品图：</label>
        <div class="zent-form__controls">
         <div>
          <ul class="app-image-list clearfix">
           <li class="">
            <div class="rc-upload">
             <div class="">
              <a class="add-goods" href="javascript:;">+ 添加图片</a>
             </div>
             <p class="rc-upload-tips"></p>
            </div></li>
          </ul>
          <p class="help-block">建议尺寸：800*800像素，你可以拖拽图片调整顺序，最多上传15张</p>
         </div>
         <p class="zent-form__error-desc">最少需要添加一张商品图</p>
        </div>
       </div>
       <div class="zent-form__control-group no-control-label">
        <label class="zent-form__control-label"></label>
        <div class="zent-form__controls">
         <div class="fold-field">
          <i class="zenticon zenticon-caret-down fold-field__icon"></i>
          <a class="fold-field__txt" href="javascript:;">折叠更多设置</a>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group ">
        <label class="zent-form__control-label">商品类目：</label>
        <div class="zent-form__controls">
         <div>
          <div class="zent-popover-wrapper zent-select select-large " style="display: inline-block;">
           <div class="zent-select-text">
            选择所属行业类目
           </div>
          </div>
          <p class="help-block">商品类目及类目细项，<a href="http://kdt.im/RL72Svr1m" target="_blank" rel="noopener noreferrer">点此查看</a></p>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group ">
        <label class="zent-form__control-label">商品分组：</label>
        <div class="zent-form__controls">
         <div>
          <div class="zent-popover-wrapper zent-select select-large " style="display: inline-block;">
           <div class="zent-select-tags tags__empty">
            选择商品分组
           </div>
          </div>
          <p class="help-inline"><a href="javascript:;">刷新</a><span> | </span><a target="_blank" rel="noopener noreferrer" href="//www.youzan.com/v2/showcase/tag#create">新建分组</a><span> | </span><a target="_blank" rel="noopener noreferrer" href="https://bbs.youzan.com/forum.php?mod=viewthread&amp;tid=15">如何创建商品分组？</a></p>
          <p class="help-block hide">使用“列表中隐藏”分组，商品将不出现在商品列表中</p>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group ">
        <label class="zent-form__control-label">商品卖点：</label>
        <div class="zent-form__controls">
         <span>
          <div class="zent-input-wrapper input-xxlarge">
           <input type="text" class="zent-input" value="" />
          </div><p class="help-block">在商品详情页标题下面展示卖点信息，建议60字以内<a href="javascript:;" rel="noopener noreferrer" style="margin-left: 5px;">查看示例</a></p></span>
        </div>
       </div>
       <div class="zent-form__control-group upload-field">
        <label class="zent-form__control-label">主图视频：</label>
        <div class="zent-form__controls">
         <div class="video-edit-wrap">
          <div>
           <a href="javascript:;" class="add-video">+ 添加视频</a>
           <p class="help-block">目前仅支持在微信中播放，建议时长9-30秒，建议视频宽高比16:9</p>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div class="goods-edit__region">
    <div class="goods-edit__region--inner">
     <div class="goods-edit__region-title">
      <div class="goods-edit__region-title--inner">
       价格库存
      </div>
     </div>
     <div class="goods-edit__region-content">
      <div class="goods-edit__region-content--inner">
       <div class="zent-form__control-group sku-field">
        <label class="zent-form__control-label">商品规格：</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="zent-select-popup" tabindex="0"><span value="1" class="zent-select-option  ">颜色</span><span value="2" class="zent-select-option  ">尺寸</span><span value="542" class="zent-select-option  ">房型</span><span value="12" class="zent-select-option  ">尺码</span><span value="14" class="zent-select-option  ">规格</span><span value="33" class="zent-select-option  ">款式</span><span value="497" class="zent-select-option  current">净含量</span><span value="499" class="zent-select-option  ">种类</span><span value="502" class="zent-select-option  ">内存</span><span value="503" class="zent-select-option  ">版本</span><span value="505" class="zent-select-option  ">金重</span><span value="506" class="zent-select-option  ">套餐</span><span value="531" class="zent-select-option  ">容量</span><span value="532" class="zent-select-option  ">上市时间</span><span value="533" class="zent-select-option  ">系列</span><span value="534" class="zent-select-option  ">机芯</span><span value="535" class="zent-select-option  ">适用</span><span value="536" class="zent-select-option  ">包装</span><span value="537" class="zent-select-option  ">口味</span><span value="538" class="zent-select-option  ">产地</span><span value="539" class="zent-select-option  ">出行日期</span><span value="540" class="zent-select-option  ">出行人群</span><span value="541" class="zent-select-option  ">入住时段</span><span value="543" class="zent-select-option  ">介质</span><span value="544" class="zent-select-option  ">开本</span><span value="545" class="zent-select-option  ">类型（例如实体票,电子票）</span><span value="546" class="zent-select-option  ">有效期</span></div>
        <div class="zent-form__controls">
         <div>
          <div class="rc-sku">
           <div>
            <div class="rc-sku-group">
             <h3 class="group-title"><button type="button" class="zent-btn"><span>添加规格项目</span></button></h3>
            </div>
           </div>
          </div>
          <p class="help-block">如有颜色、尺码等多种规格，请添加商品规格</p>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group stock-field hide">
        <label class="zent-form__control-label">规格明细：</label>
        <div class="zent-form__controls">
         <div class="table-sku-wrap"></div>
        </div>
       </div>
       <div class="zent-form__control-group has-error ">
        <label class="zent-form__control-label"><em class="zent-form__required">*</em>价格：</label>
        <div class="zent-form__controls">
         <div>
          <span class="input-small">
           <div class="zent-number-input-wrapper">
            <div class="zent-input-wrapper zent-input-addons">
             <span class="zent-input-addon-before">&yen;</span>
             <input type="text" class="zent-input" value="" />
            </div>
           </div></span>
         </div>
         <p class="zent-form__error-desc">请输入价格</p>
        </div>
       </div>
       <div class="zent-form__control-group ">
        <label class="zent-form__control-label">划线价：</label>
        <div class="zent-form__controls">
         <div>
          <span class="input-small" style="margin-left: 0px;">
           <div class="zent-input-wrapper">
            <input type="text" class="zent-input" value="" />
           </div></span>
          <div class="help-block">商品没有优惠的情况下，划线价在商品详情会以划线形式显示。
           <div class="zent-popover-wrapper zent-pop-wrapper" style="display: inline-block;">
            <a href="javascript:;">示例</a>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group has-error total-stock-field">
        <label class="zent-form__control-label"><em class="zent-form__required">*</em>库存：</label>
        <div class="zent-form__controls">
         <div>
          <span class="input-small">
           <div class="zent-number-input-wrapper">
            <div class="zent-input-wrapper">
             <input type="text" class="zent-input" name="total_stock" value="" />
            </div>
           </div></span>
          <div>
           <label class="show-stock-checkbox zent-checkbox-wrap"><span class="zent-checkbox"><span class="zent-checkbox-inner"></span><input type="checkbox" name="hide_stock" value="on" /></span><span>商品详情不显示剩余件数</span></label>
          </div>
          <p class="help-block">库存为 0 时，会放到『已售罄』的商品列表里，保存后买家看到的商品可售库存同步更新</p>
         </div>
         <p class="zent-form__error-desc">请输入库存</p>
        </div>
       </div>
       <div class="zent-form__control-group member-discount-field">
        <label class="zent-form__control-label">会员折扣：</label>
        <div class="zent-form__controls">
         <div>
          <label class="zent-form__checkbox zent-checkbox-wrap zent-checkbox-checked"><span class="zent-checkbox"><span class="zent-checkbox-inner"></span><input type="checkbox" value="on" /></span><span>参加会员折扣</span></label>
          <a class="member-discount-field__link" target="_blank" rel="noopener noreferrer" href="//www.youzan.com/scrm">管理会员卡</a>
          <p class="help-block"><span class="c-gray">是否勾选不影响自定义会员价生效。</span><a target="_blank" rel="noopener noreferrer" href="https://help.youzan.com/qa#/menu/2111/detail/1092">什么是自定义会员价？</a></p>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group no-control-label">
        <label class="zent-form__control-label"></label>
        <div class="zent-form__controls">
         <div class="fold-field">
          <i class="zenticon zenticon-caret-down fold-field__icon"></i>
          <a class="fold-field__txt" href="javascript:;">折叠更多设置</a>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group small-field">
        <label class="zent-form__control-label">商品编码：</label>
        <div class="zent-form__controls">
         <div class="zent-input-wrapper">
          <input type="text" class="zent-input" name="goods_no" value="" />
         </div>
        </div>
       </div>
       <div class="zent-form__control-group small-field hide">
        <label class="zent-form__control-label">拼团编码：</label>
        <div class="zent-form__controls">
         <div class="zent-input-wrapper">
          <input type="text" class="zent-input" name="group_buy_code" value="" />
         </div>
        </div>
       </div>
       <div class="zent-form__control-group ">
        <label class="zent-form__control-label">成本价：</label>
        <div class="zent-form__controls">
         <div>
          <span class="input-small" style="margin-left: 0px;">
           <div class="zent-number-input-wrapper">
            <div class="zent-input-wrapper zent-input-addons">
             <span class="zent-input-addon-before">&yen;</span>
             <input type="text" class="zent-input" value="" />
            </div>
           </div></span>
          <p class="help-block">成本价未来会用于营销建议，利润分析等</p>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div class="goods-edit__region">
    <div class="goods-edit__region--inner">
     <div class="goods-edit__region-title">
      <div class="goods-edit__region-title--inner">
       其他信息
      </div>
     </div>
     <div class="goods-edit__region-content">
      <div class="goods-edit__region-content--inner">
       <div class="zent-form__control-group has-error delivery-field">
        <label class="zent-form__control-label"><em class="zent-form__required">*</em>快递运费：</label>
        <div class="zent-form__controls">
         <div>
          <div>
           <div class="zent-radio-group">
            <label class="zent-radio-wrap zent-radio-checked"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span>统一邮费</span><span class="input-small">
               <div class="zent-number-input-wrapper">
                <div class="zent-input-wrapper zent-input-addons">
                 <span class="zent-input-addon-before">&yen;</span>
                 <input type="text" class="zent-input" value="" />
                </div>
               </div></span></span></label>
            <label class="zent-radio-wrap" style="margin-bottom: 0px;"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span>运费模版</span>
              <div class="zent-popover-wrapper zent-select no-error " style="display: inline-block;">
               <div class="zent-select-text">
                请选择运费模版
               </div>
              </div>
              <div class="help-inline">
               <a href="javascript:;">刷新</a>
               <span class="c-gray"> | </span>
               <a href="//www.youzan.com/v2/trade/delivery#add" rel="noopener noreferrer" target="_blank">新建</a>
               <span class="c-gray"> | </span>
               <a href="//help.youzan.com/qa#/menu/2119/detail/994?_k=h6uj8k" rel="noopener noreferrer" target="_blank">如何设置合适的运费模版？</a>
              </div></span></label>
           </div>
          </div>
          <p class="help-block">运费模版支持按地区设置运费，按购买件数计算运费，按重量计算运费等</p>
         </div>
         <p class="zent-form__error-desc">请输入运费</p>
        </div>
       </div>
       <div class="zent-form__control-group weight-field hide">
        <label class="zent-form__control-label"><em class="zent-form__required">*</em>物流重量：</label>
        <div class="zent-form__controls">
         <div>
          <span class="input-small">
           <div class="zent-form__control-group stock-item-small-field">
            <label class="zent-form__control-label"></label>
            <div class="zent-form__controls">
             <div class="zent-number-input-wrapper">
              <div class="zent-input-wrapper zent-input-addons">
               <span class="zent-input-addon-before">Kg</span>
               <input type="text" class="zent-input" name="_ignore_item_weight" value="" />
              </div>
             </div>
            </div>
           </div></span>
          <p class="help-block">当前运费模版，按物流重量（含包装）计费，需要输入重量</p>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group delivery-type-field hide">
        <label class="zent-form__control-label"><em class="zent-form__required">*</em>配送方式：</label>
        <div class="zent-form__controls">
         <div>
          <label class="zent-form__checkbox zent-checkbox-wrap"><span class="zent-checkbox"><span class="zent-checkbox-inner"></span><input type="checkbox" value="on" /></span><span>同城配送</span></label>
          <label class="zent-form__checkbox zent-checkbox-wrap"><span class="zent-checkbox"><span class="zent-checkbox-inner"></span><input type="checkbox" value="on" /></span><span>到店自提</span></label>
          <p class="help-block"><span class="c-gray">蛋糕烘焙类类型只支持同城配送和到店自提</span></p>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group prepare-time-field hide">
        <label class="zent-form__control-label">备货时间：</label>
        <div class="zent-form__controls">
        </div>
       </div>
       <div class="zent-form__control-group sold-time-field">
        <label class="zent-form__control-label">上架时间：</label>
        <div class="zent-form__controls">
         <div class="zent-radio-group radio-group--single-line">
          <div>
           <label class="zent-radio-wrap zent-radio-checked"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span>立即上架售卖</span></span></label>
          </div>
          <div>
           <label class="zent-radio-wrap"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span>
             <div class="inline">
              <span>自定义上架时间</span>
              <div class="zent-datetime-picker">
               <div class="zent-popover-wrapper" style="display: block;">
                <div class="picker-input">
                 <div class="zent-input-wrapper">
                  <input type="text" class="zent-input" value="请选择上架售卖时间" />
                 </div>
                 <span class="zenticon zenticon-calendar-o"></span>
                 <span class="zenticon zenticon-close-circle"></span>
                </div>
               </div>
              </div>
             </div></span></label>
          </div>
          <div>
           <label class="zent-radio-wrap"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span>暂不售卖，放入仓库</span></span></label>
          </div>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group no-control-label">
        <label class="zent-form__control-label"></label>
        <div class="zent-form__controls">
         <div class="fold-field">
          <i class="zenticon zenticon-caret-down fold-field__icon"></i>
          <a class="fold-field__txt" href="javascript:;">折叠更多设置</a>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group pre-sale-field checkbox-field">
        <label class="zent-form__control-label">预售：</label>
        <div class="zent-form__controls">
         <div>
          <div>
           <label class="zent-checkbox-wrap"><span class="zent-checkbox"><span class="zent-checkbox-inner"></span><input type="checkbox" value="on" /></span><span>无现货，下单后需过段时间才能发货</span></label>
          </div>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group send-time-field hide">
        <label class="zent-form__control-label"></label>
        <div class="zent-form__controls">
         <div>
          <div>
           <div class="zent-radio-group">
            <label class="zent-radio-wrap zent-radio-checked"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span>
              <div class="zent-datetime-picker no-error">
               <div class="zent-popover-wrapper" style="display: block;">
                <div class="picker-input">
                 <div class="zent-input-wrapper">
                  <input type="text" class="zent-input" value="请选择发货日期" />
                 </div>
                 <span class="zenticon zenticon-calendar-o"></span>
                 <span class="zenticon zenticon-close-circle"></span>
                </div>
               </div>
              </div><span style="margin-left: 5px;">开始发货</span></span></label>
            <label class="zent-radio-wrap"><span class="zent-radio"><span class="zent-radio-inner"></span><input type="radio" value="on" /></span><span><span>付款成功</span><span class="input-small--num">
               <div class="zent-number-input-wrapper no-error">
                <div class="zent-input-wrapper no-error">
                 <input type="text" class="zent-input" value="" />
                </div>
               </div></span><span>天后发货</span></span></label>
           </div>
          </div>
          <p class="help-block">只允许设置90天内的发货时间 ，请务必按照约定时间发货以免引起客户投诉。<a href="https://bbs.youzan.com/forum.php?mod=viewthread&amp;tid=593751" target="_blank" rel="noopener noreferrer">什么是预售？</a></p>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group checkbox-field quota-field">
        <label class="zent-form__control-label">限购：</label>
        <div class="zent-form__controls">
         <div>
          <div>
           <label class="zent-checkbox-wrap"><span class="zent-checkbox"><span class="zent-checkbox-inner"></span><input type="checkbox" value="on" /></span><span>限制每人可购买数量</span></label>
           <div class="quota-field__inner hide">
            <span>每个买家帐号累计限购 </span>
            <span class="input-mini">
             <div class="zent-number-input-wrapper">
              <div class="zent-input-wrapper">
               <input type="text" class="zent-input" value="" />
              </div>
             </div></span>
            <span> 件</span>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group purchase-right-field">
        <label class="zent-form__control-label"></label>
        <div class="zent-form__controls">
         <div>
          <label class="zent-checkbox-wrap"><span class="zent-checkbox"><span class="zent-checkbox-inner"></span><input type="checkbox" value="on" /></span><span>只允许特定用户购买</span></label>
          <div class="purchase-right__inner">
           <div class="purchase-right-tags hide">
            <p class="purchase-right__label">请选择拥有哪些会员卡的用户可以购买该商品</p>
            <span>
             <div class="zent-popover-wrapper zent-select  " style="display: inline-block;">
              <div class="zent-select-tags tags__empty">
               选择会员卡
              </div>
             </div></span>
           </div>
           <div class="purchase-right-tags hide">
            <p class="purchase-right__label">请选择可购买该商品的用户标签</p>
            <span>
             <div class="zent-popover-wrapper zent-select  " style="display: inline-block;">
              <div class="zent-select-tags tags__empty">
               选择用户标签
              </div>
             </div></span>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group messages-field">
        <label class="zent-form__control-label">留言：</label>
        <div class="zent-form__controls">
         <div>
          <div style="margin-top: 6px;">
           <div class="message-container"></div>
           <div class="message-add">
            <a href="javascript:;" class="control-action">﹢添加字段</a>
           </div>
          </div>
          <p class="help-block">购买商品时让买家输入留言，最多可设置 10 条留言</p>
         </div>
        </div>
       </div>
       <div class="zent-form__control-group hide">
        <label class="zent-form__control-label">身份证信息：</label>
        <div class="zent-form__controls">
         <div>
          <div class="static-value">你已经关闭了此功能，无法收集买家身份证信息 
           <a href="//www.youzan.com/v2/setting/team" rel="noopener noreferrer" target="_blank">去开启</a>
          </div>
         </div>
        </div>
       </div>
       <div class="goods-protocol-field">
        <p class="help-block">相关发布规范：您需遵守<a href="http://kdt.im/unxC7r" target="_blank" rel="noopener noreferrer">《有赞低价活动发布规范》</a></p>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div class="app-design">
    <div class="app-actions">
     <div class="form-actions text-center">
      <button type="button" class="zent-btn"><span>保存并查看</span></button>
      <button type="button" class="zent-btn-primary zent-btn"><span>下一步</span></button>
     </div>
    </div>
   </div>
  </form> -->

  </div>
</template>

<script>
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './defineSteps'

export default {
  name: 'guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
