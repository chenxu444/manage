<template>
  <div class="wait_detail">
    <!-- #ifndef MP-WEIXIN -->
    <uni-nav-hfbar
      fixed
      status-bar
      left-icon="back"
      title="订单详情"
    ></uni-nav-hfbar>
    <!-- #endif -->
    <!-- 待付款，待审核 -->
    <div class="status uni-flex bg_white" v-if="orderDetail.orderStatus == '1' && (orderDetail.preSalStatus == 1 || (orderDetail.reviewFlag == 1 && orderDetail.reviewStatus == 1) || orderDetail.reviewFlag == -1)">
      <img src="../../static/image/orderDetail/wait.png" class="icon_img">
      <div class="uni-flex-1">
        <span class="font_color_666">{{orderDetail.preSalStatus == 1 ? '等待确认' : orderDetail.reviewFlag == -1 ? '等待开方' : '等待审核'}}</span>
        <div class="ties font_color_666">{{orderDetail.preSalStatus == 1 ? '预售单已提交，等待药店确认' : orderDetail.reviewFlag == -1 ? '订单已提交，等待医生开方' : '已上传处方，等待药师审核'}}</div>
      </div>
      <div class="btns uni-flex" v-if="memberId == ''">
          <button class="pay" @click="topBtns(orderDetail,'pay')" v-if="((orderDetail.reviewFlag == 1 && orderDetail.reviewStatus == 1) || orderDetail.reviewFlag == -1) && orderDetail.payStatus == 1">去支付</button>
          <button class="cancel" @click="topBtns(orderDetail,'cancel')" style="display: inline-block;">取消订单</button>
      </div>
    </div>
    <!-- 待付款，待审核 -->
    <!-- 待付款--药师已审批 -->
    <div class="status uni-flex bg_white" v-if="orderDetail.orderStatus == '1' && ((orderDetail.orderType == 1 && ( orderDetail.reviewFlag == 0 || (orderDetail.reviewFlag == 1 && orderDetail.reviewStatus == 2))) || (orderDetail.orderType == 3 && (orderDetail.preSalStatus == 2 || orderDetail.preSalStatus == 3)) || (orderDetail.orderType == 4 && orderDetail.payStatus == 1))">
      <img src="../../static/image/orderDetail/waitPay.png" class="icon_img">
      <div class="uni-flex-1">
        <span class="font_color_666">{{orderDetail.payStatus == 7 ? '支付失败' : (orderDetail.payStatus == 8 ? '支付结算中' : (orderDetail.payStatus == 3 ? (orderDetail.payStatus == 3 ? (orderDetail.orderType == 3 ? (orderDetail.preSalStatus == 2?'已支付首款':'待支付尾款') :'部分支付') : '待付款') : '待付款')) }}</span>
        <div class="ties font_color_666">{{orderDetail.reviewFlag == 1 && orderDetail.reviewStatus == 2 ? '药师已审批，待支付完成后安排发货' : orderDetail.orderType == 3 && orderDetail.payStatus == 1 ? '预售单已确认，待支付完成后安排发货' : (orderDetail.orderType == 3 && orderDetail.payStatus == 3 ? (orderDetail.preSalStatus == 2?'请等待药品到货，支付尾款后安排发货' :'药品已到货，支付尾款后安排发货' ) : orderDetail.orderType == 1 && orderDetail.payStatus == 3 ? '订单已付首款，支付尾款后安排发货' : orderDetail.orderType == 4 && orderDetail.payStatus == 1 ? '预约单已确认，待支付完成后安排发货' : '待支付完成后安排发货')}}</div>
      </div>
      <div class="uni-flex btns" v-if="memberId == ''">
        <button class="pay" @click="topBtns(orderDetail,'pay')" v-if="orderDetail.orderStatus == '1' && orderDetail.payStatus != 8 && ((orderDetail.orderType == 3 && ((orderDetail.preSalStatus == 2 && orderDetail.payStatus == 1) || (orderDetail.preSalStatus == 3 && (orderDetail.payStatus == 3 || orderDetail.payStatus == 1)))) || (orderDetail.orderType != 3 && ( orderDetail.reviewFlag == 0 || (orderDetail.reviewFlag == 1 && orderDetail.reviewStatus == 2))))">去支付</button>
        <button class="cancel" @click="topBtns(orderDetail,'cancel')">取消订单</button>
      </div>
    </div>
    <!-- 待付款--药师已审批 -->
    <!-- 待发货 -->
    <div class="status uni-flex bg_white" v-if="orderDetail.orderStatus == '2'">
      <img src="../../static/image/orderDetail/send.png" class="icon_img">
      <div class="uni-flex-1">
        <span class="font_color_666">待发货{{ orderDetail.reviewFlag == 1 ? (orderDetail.reviewStatus == 1 ? '(等待药师审批)' : (orderDetail.reviewStatus == 2 ? '(药师已审批)' : '')) : '' }}</span>
        <div class="ties font_color_666">订单支付成功，请等待物流揽收</div>
      </div>
      <div class="uni-flex btns" v-if="memberId == ''">
        <button class="cancel" @click="topBtns(orderDetail,'cancel')" v-if="orderDetail.orderType != 2">取消订单</button>
      </div>
    </div>
    <!-- 待发货 -->
    <!-- 待收货 -->
    <div class="status uni-flex bg_white" v-if="orderDetail.orderStatus == '3'">
      <img src="../../static/image/orderDetail/get.png" class="icon_img">
      <div class="uni-flex-1">
        <span class="font_color_666">已发货</span>
        <div class="ties font_color_666">{{orderPackages && orderPackages[0].orderDeliveryDTOS != null && orderPackages[0].orderDeliveryDTOS.memo != null ? orderPackages[0].orderDeliveryDTOS.memo : '商品已发出，请等待收货'}}</div>
      </div>
      <div class="uni-flex btns" v-if="memberId == ''">
        <button class="cancel" @click="topBtns(orderDetail,'sure')">确认收货</button>
      </div>
    </div>
    <!-- 待收货 -->
    <!-- 已完成 -->
    <div class="status uni-flex bg_white" v-if="orderDetail.orderStatus == '4'">
      <img src="../../static/image/orderDetail/succ.png" class="icon_img">
      <div class="uni-flex-1">
        <span class="font_color_666">订单已完成</span>
        <div class="ties font_color_666">商品已签收</div>
      </div>
      <!-- <div class="uni-flex btns">
        <button v-if=" getAllRefundFlag(orderDetail.orderPackages) && !hgStatus(goodsList)" class="cancel" @click="topBtns(orderDetail,'returnGoods')">退货</button>
      </div> -->
    </div>
    <!-- 已完成 -->
    <!-- 已取消 -->
    <div class="status uni-flex bg_white" v-if="orderDetail.orderStatus == '5'">
      <img src="../../static/image/orderDetail/cancel.png" class="icon_img">
      <div class="uni-flex-1">
        <span class="font_color_666">订单已取消</span>
        <div class="ties font_color_red" style="font-weight: 700;">{{ orderDetail.cancelReason ? '取消原因：' + orderDetail.cancelReason : '订单商品已取消' }}</div>
      </div>
      <!-- <div class="uni-flex uni-flex-1 btns">
        <button class="cancel">退货</button>
      </div> -->
    </div>
    <!-- 已取消 -->

    <div class="uni-flex bg_white" style="padding: 20rpx; line-height: 60rpx; border-top: 1px solid #EEEEEE" v-if="memberId == '' && orderDetail.reviewFlag == 1 && orderDetail.recipeUrls && orderDetail.recipeUrls.length > 0 && orderDetail.recipeUrls[0] != ''">
      <div class="uni-flex-1">处方图片 x{{orderDetail.recipeUrls.length}}</div>
      <div class="btns">
        <button class="pay" style="margin-left: 10px;" v-if="orderDetail.reviewFlag == 1 && orderDetail.recipeUrls && orderDetail.recipeUrls.length > 0 && orderDetail.recipeUrls[0] != ''" @click="topBtns(orderDetail,'recipe')">电子处方</button>
      </div>
    </div>

    <!-- 收货人 -->
    <div class="rePerson uni-flex margin_8 bg_white" style="margin-top: 16rpx;" v-if="orderDetail.deliveryType != '2'">
      <span class="iconfont icon-address1 address_icon"></span>
      <div>
        <div class="perspn_info uni-flex">
          <span class="name">{{ orderAddress != '' ? orderAddress.linkManName : '暂无收货人信息' }}</span>
          <span class="phone">{{ orderAddress.mobile ? orderAddress.mobile : '暂无联系信息' }}</span>
        </div>
        <div class="font_color_666">
          地址：{{ orderAddress != '' ? orderAddress.provinceName + orderAddress.cityName + orderAddress.disrictName + orderAddress.address : '暂无地址信息' }}
        </div>
      </div>
    </div>
    <div class="rePerson uni-flex margin_8 bg_white"  v-else>
      <span class="iconfont icon-address1 address_icon"></span>
      <div>
        <div class="perspn_info uni-flex">
          <span class="name">{{ storeDTO != '' ? storeDTO.storeName : '暂无门店信息' }}</span>
          <span class="phone">{{ storeDTO != '' ? storeDTO.customTel : '暂无联系信息' }}</span>
        </div>
        <div class="font_color_666">
          门店地址：{{ storeDTO != '' ? storeDTO.address : '暂无地址信息' }}
        </div>
      </div>
    </div>
    <!-- 收货人 -->
    <!-- 运输中 -->
    <div class="bg_white" v-for="(opg,index) in orderPackages" :key="index" @click="goUrl('Logistics', 'order', 'deliveryid='+ opg.orderDeliveryDTOS[0].deliveryId + '&storeId='+orderDetail.storeId + '&orderStatus='+orderDetail.orderStatus)">
        <div class="rePerson uni-flex margin_8" v-if="orderPackages != null && orderPackages != '' && opg.orderDeliveryDTOS != null" >
          <span class="iconfont icon-waittake address_icon"></span>
          <div class="uni-flex-1">
              <div class="perspn_info uni-flex ">
                <span class="name">{{opg.orderDeliveryDTOS[0].orderDeliveryLogisticsDTOList != null ? opg.orderDeliveryDTOS[0].orderDeliveryLogisticsDTOList[0].title : orderDetail.orderStatus == '3' ? '运输中' : orderDetail.orderStatus == '4' ? '已送达' : '暂无'}}</span>
              </div>
              <div class="font_color_999 num_size">
              {{opg.orderDeliveryDTOS[0].orderDeliveryLogisticsDTOList != null ? opg.orderDeliveryDTOS[0].orderDeliveryLogisticsDTOList[0].remark : orderDetail.orderStatus == '3' ? '您的订单已交付' + opg.orderDeliveryDTOS[0].logisTicsCompany + '快递公司，运单号为' + opg.orderDeliveryDTOS[0].deliveryNo : orderDetail.orderStatus == '4' ? '您的订单已送达，祝您生活愉快!' : '暂无'}}
              </div>
          </div>
          <span class="toDetail font_color_999">></span>
        </div>
    </div>
    <!-- 运输中 -->
    <div class="orderCode bg_white" v-if="orderDetail.deliveryType == '2' && (orderDetail.orderStatus == '2' || orderDetail.orderStatus == '3')">
      <div class="oc-title">
        取药码
      </div>
      <div class="oc-cont">
        <uni-barcode
          ref="barcode"
          :unit="'px'"
          :show="true"
          :format="'code128'"
          :onval="true"
          :cid="'user'"
          :loadMake="true"
          :opations="opations"
          :val="barcodeVal"
          v-if="showType != 'pay'"
        />
      </div>
    </div>
    <div class="store_address border_bottom_1 bg_white">{{ orderDetail.storeName }}</div>
    <!-- 商品信息 -->
    <div class="goods_info uni-flex border_bottom_1 bg_white" v-for="(goodsItem,index) in goodsList" :key="index" @tap="openDetails(goodsItem,orderDetail.storeId)">
      <img :src="goodsItem.defaultPic ? goodsItem.defaultPic : '../../../static/image/default/no_img.jpg'" class="goods_img" />
      <div class="uni-flex-1">
          <span v-if="goodsItem.itemType == 0 || goodsItem.itemType == '0'">(赠品)</span>
          {{ goodsItem.goodsName + ' ' + goodsItem.specification }}
      </div>
      <div>
        <div class="price font_color_red">{{ orderDetail.orderType == 2 ? goodsItem.sellPrice.redeemPoint + '积分' + (goodsItem.sellPrice.sellPrice ? '+ ￥' + goodsItem.sellPrice.sellPrice : '') : '￥' + priceFixed(goodsItem.sellPrice, goodsItem.sellPrice.promoPrice ? 'promoPrice' : 'sellPrice') }}</div>
        <div class="price font_color_red" v-if="goodsItem.sellPrice.orgPrice != null && goodsItem.sellPrice.sellPrice != goodsItem.sellPrice.orgPrice">￥{{ priceFixed(goodsItem.sellPrice, 'orgPrice') }}</div>
        <div class="count font_color_999">共{{ parseInt(goodsItem.quantity) }}件</div>
      </div>
    </div>
    <!-- 价格列表 -->
    <div class="price_detail margin_8 bg_white">
      <div class="uni-flex font_color_red">
        <span class="left">应付金额</span>
        <span class="right uni-flex-1 price">￥{{ orderDetail.orderType == 2 ? (orderDetail.totalPointsAmount + '积分' + (orderDetail.totalPayAmount ? ' + ￥' + orderDetail.totalPayAmount : '')) : '￥' + Math.round((orderDetail.totalPayAmount ? orderDetail.totalPayAmount : 0)*100)/100 }}</span>
      </div>
      <div class="uni-flex font_color_999">
        <span class="left">商品总价</span>
        <span class="right uni-flex-1">￥
          {{ orderDetail.orderType == 2 ? (orderDetail.totalPointsAmount + '积分' + (orderDetail.productMoneyAmount ? ' + ￥' + orderDetail.productMoneyAmount : '')) : '￥' + parseFloat(orderDetail.productMoneyAmount ? orderDetail.productMoneyAmount : 0) }}
        </span>
      </div>
      <div class="uni-flex font_color_999">
        <span class="left">配送费</span>
        <span class="right uni-flex-1">+ ￥{{ (Math.round((orderDetail.deliveryFeeAmount ? orderDetail.deliveryFeeAmount : 0)*100)/100) | toFixed }}</span>
      </div>
      <div class="uni-flex font_color_999" v-if="orderDetail.recipeAmount * 1 > 0">
        <span class="left">开方费</span>
        <span class="right uni-flex-1">+ ￥{{parseFloat(orderDetail.recipeAmount ? orderDetail.recipeAmount : 0) | toFixed }}</span>
      </div>
      <div class="uni-flex font_color_999" v-if="orderDetail.promoDeliveryFeeAmount * 1 > 0">
        <span class="left">配送费立减</span>
        <span class="right uni-flex-1">- ￥{{ parseFloat(orderDetail.promoDeliveryFeeAmount ? orderDetail.promoDeliveryFeeAmount : 0) | toFixed }}</span>
      </div>
      <div class="uni-flex font_color_999" v-if="orderDetail && actReduceFilter(orderDetail.discountAmount,orderDetail.promoReduceAmount) > 0">
        <span class="left">活动立减</span>
        <span class="right uni-flex-1"> - ￥{{ orderDetail ? actReduceFilter(orderDetail.discountAmount,orderDetail.promoReduceAmount) : '0.00' }}</span>
      </div>
      <div class="uni-flex font_color_999" v-if="orderDetail.couponReduceAmount * 1 > 0">
        <span class="left">优惠券</span>
        <span class="right uni-flex-1">- ￥{{ parseFloat(orderDetail.couponReduceAmount ? orderDetail.couponReduceAmount : 0) | toFixed  }}</span>
      </div>
      <div class="uni-flex font_color_999" v-if="Math.round((orderDetail.pointsPayMoney ? orderDetail.pointsPayMoney : 0)*100)/100 > 0">
        <span class="left">积分支付</span>
        <span class="right uni-flex-1">- ￥{{ (Math.round((orderDetail.pointsPayMoney ? orderDetail.pointsPayMoney : 0)*100)/100) | toFixed }}</span>
      </div>
      <!-- <button class="buy_again">再次购买</button> -->
    </div>
    <!-- 订单信息 -->
    <div class="order_info bg_white" v-if="orderDetail">
      <div @click="copyNo(orderDetail.orderNo)">
        订单编号：{{ orderDetail.orderNo }}
        <span class="copy">复制</span>  
      </div>
      <div>下单时间：{{ orderDetail.inputDate }}</div>
      <div>配送方式：{{ orderDetail.deliveryType == '1' ? '就近急送' : orderDetail.deliveryType ==  '2' ? '门店自提' : '快递配送' }}</div>
    </div>
    <!-- 猜你喜欢 -- start -->
      <view class="youLike" v-if="youLikeList.length > 0">
          <view class="tit bg_white font_color_333">猜你喜欢</view>
          <view class="yl-list clearfix">
              <view class="yl-item fl bg_white" v-for="(youLike,index) in youLikeList"  @click="replaceUrl('detail', '', 'skuSalNo=' + youLike.skuSalNo + '&storeId=' + youLike.storeDTO.storeId + '&consignorId=' + youLike.consignorId)" :key="index">
                  <view class="yl-img">
                      <image class="img" mode="aspectFit" :lazy-load="true" :src="youLike.imagePath ? youLike.imagePath : 'img/common/no_img.jpg'"></image>
                  </view>
                  <view class="yl-info">
                      <view class="yl-name">{{ youLike.brandName + ' ' + youLike.goodsName }}</view>
                      <view class="yl-spc font_color_999">{{ youLike.specification }}</view>
                      <view class="yl-fac font_color_666">{{ youLike.storeDTO.storeName }}</view>
                      <b class="yl-price">
                          ￥{{ (youLike.sellPrice ? priceFixed(youLike.sellPrice, 'sellPrice') : '0.00') }}
                      </b>
                  </view>
              </view>
          </view>
      </view>
      <!-- 猜你喜欢 -- end -->
    <!-- 取消订单弹窗 -->
    <uni-popup ref="popup">
      <div class="dialog">
        <div class="dialogTitle">取消订单</div>
        <div class="dialogTxt">亲~确定要取消订单吗？</div>
        <input type="text" class="cancelIpt" v-model="userReason" />
        <div class="uni-flex">
          <button class="uni-flex-1 dialogBtn" @click="dialogButton(true)">
            确定
          </button>
          <button class="uni-flex-1 dialogBtn" @click="dialogButton(false)">
            取消
          </button>
        </div>
      </div>
    </uni-popup>
    <uni-previewImage ref="previewImage" :opacity="1" :circular="true" :reduction="true" :imgs="orderDetail.recipeUrls"></uni-previewImage>
  </div>
</template>

<script>
let pages = '';//当前页
let beforePage = '';//上个页面
export default {
  data() {
    return {
      isIphone: false,
      orderNo: "",
      orderDetail:'', // 详情所有数据
      orderAddress:'',
      storeDTO:'',
      orderPackages:'',
      goodsList:[], // 商品列表
      youLikeList:[], // 猜你喜欢
      userReason:'',// 取消理由
      pageNo: 1,
      pageSize: 8,
      opations: {
        width: 2,//设置条之间的宽度
        height: 80,//高度
        fontSize: 16,
				displayValue: false,//是否在条形码下方显示文字
				textAlign: "center",//设置文本的水平对齐方式
				textPosition: "bottom",//设置文本的垂直位置
				textMargin: 0,//设置条形码和文本之间的间距
				background: "#FFFFFF",//设置条形码的背景色
        margin: 0,//设置条形码周围的空白边距
      },
      barcodeVal: '',
      memberId: ''
    };
  },
  onLoad(options) {
    let _model_ = this.getStor('_model_');
    if(_model_.indexOf('iPhone X') != -1 || _model_.indexOf('iPhone XR') != -1 || _model_.indexOf('iPhone XS') != -1 || _model_.indexOf('iPhone XS Max') != -1 || _model_.indexOf('iPhone 11') != -1 || _model_.indexOf('iPhone 11 Pro') != -1 || _model_.indexOf('iPhone 11 Pro Max') != -1){
        this.isIphone = true;
    }
    this.orderNo = options.orderNo;
    this.memberId = options.memberId ? options.memberId : '';
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      var url = '/order/detail';
      var params = {
        orderNo: this.orderNo,
      };
      this.barcodeVal = this.orderNo;
      if(this.memberId != ''){
        url = '/order/detailByGuest';
        params.buyMemberId = this.memberId;
      }
      this.ebigRequest(url, params, true).then((res) => {
          console.log(res);
          this.orderDetail = res
          console.log(this.orderDetail.productMoneyAmount);
          this.orderAddress = res.orderAddress
          this.orderPackages = res.orderPackages
          this.goodsList = res.orderDtls
          this.getYouList(res);
          if(res.store != null && res.store != ''){
            this.storeDTO = res.store 
          }
          // 存储物流信息
          this.setStor('orderLogDeliveryDate', this.orderDetail.deliveryDate)
          this.setStor('orderLogInputDate', this.orderDetail.inputDate)
          this.setStor('orderLogPayDate', this.orderDetail.payDate)
      });
    },
    // 顶部按钮事件
    topBtns(item,type){
      console.log(type);
      if (type == "pay") {
        this.goUrl('orderPay', 'order', 'orderNos=' + this.orderNo)
      }
      if (type == "cancel") {
        this.$refs.popup.open();
        this.orderNo = item.orderNo;
      }
      if (type == "sure") {
        uni.showModal({
          title: '温馨提示',
          content: '是否确认收货',
          success: res1 => {
            if (res1.confirm) {
              this.ebigRequest(
                "/order/updateReceived",
                { orderNo: item.orderNo },
                true,
              ).then((res) => {
                uni.showToast({
                  title: "收货成功！",
                  icon: "none",
                  duration: 2000,
                });
                this.getOrderDetail();
                if (beforePage.route == 'order/pages/orderList/orderList') {
                    beforePage.$vm.getOrder('refresh');
                }
              });
            } else if (res1.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }
      if (type == "returnGoods") {
        this.goUrl('returnGoods', 'order','orderNo='+item.orderNo)
      }
      if(type == 'recipe'){
        this.$nextTick(() => {
            if(this.isIphone){
                uni.previewImage({
                  urls: item.recipeUrls,
                  indicator: "number",
                });
            }else{
                this.$refs.previewImage.open(item.recipeUrls); // 传入当前选中的图片地址或序号
            }
        })
      }
    },
    // 模态框按钮事件
    dialogButton(boolean) {
      if (boolean) {
        let params = {
          orderNo: this.orderNo,
          reason: this.userReason,
        };
        this.ebigRequest("/aftersale/cancelOrder", params, true).then((res) => {
          this.$refs.popup.close();
          uni.showModal({
            title: "提示",
            showCancel: false,
            content: "取消成功，若已支付，退款将在一到两个工作日内到账",
            success:res=>{
              if(res.confirm)
              this.replaceUrl('orderList', 'order')
            }
          });
        });
      } else {
        this.$refs.popup.close();
      }
    },
    // 复制单号
    copyNo(orderNo){
      uni.setClipboardData({
          data: orderNo,
          success:()=>{
            uni.showToast({
              title:'复制成功',
              icon:'none',
              duration:1000
            })
          }
        });
    },
    // 跳转商品详情
    openDetails(goods,storeId){
      this.goUrl('detail', '', 'skuSalNo='+goods.skuSalNo+'&consignorId='+this.orderDetail.consignorId+'&storeId='+storeId)
    },
    // 猜你喜欢
    getYouList: function(data){ 
      var list = []
      data.orderDtls.forEach(item => {
        list.push(item.skuId)
      });
      let obj = {};
			obj.pageNo = this.pageNo;
			obj.pageSize = this.pageSize;
			obj.storeSkuIds = [{
				storeId: data.storeId,
				skuIds: list
			}];
      this.ebigRequest("/product/recommendList", obj, false, 'json').then((data) => {
          console.log(data)
          if(data){
              this.youLikeList = data;
          }
      })
    },
    // 猜你喜欢end
    //活动立减过滤
    actReduceFilter(discountAmount,promoReduceAmount){ 
        discountAmount = discountAmount ? discountAmount.toFixed(2) : 0.00;
        promoReduceAmount = promoReduceAmount ? promoReduceAmount.toFixed(2) : 0.00;
        return parseFloat(discountAmount * 1 + promoReduceAmount * 1).toFixed(2);
    },
    getAllRefundFlag(orderPackages) { //检查订单中正常商品是否全部已退货
            var flag = false;
            if (orderPackages) {
                orderPackages.map((item) => {
                    for (var i = 0; i < item.orderPackageDtls.length; i++) {
                        var item1 = item.orderPackageDtls[i];
                        if (item1.refundQty < item1.goodsQty) {
                            flag = true;
                            return;
                        }
                    }
                })
            }
            return flag;
        },
        hgStatus(goodsList) {
            var result = false;
            for (var i = 0; i < goodsList.length; i++) {
                var orderDtl = goodsList[i];
                if (orderDtl.itemType == '3') {
                    result = true;
                }
            }
            return;
        },
        priceFixed(sellPrice, name){
          let price = 0;
          if(sellPrice[name]){
            if(name == 'promoPrice'){
              price = parseFloat(sellPrice[name] ? sellPrice[name] : sellPrice['sellPirce']);
            }else{
              price = parseFloat(sellPrice[name]);
            }
          }
          return price.toFixed(2);
        },
  },
  filters:{
      toFixed: function(data) {
        return data.toFixed(2);
      },
  },
}
</script>

<style lang="scss">
page {
    background-color: #EFEFF4;
}
/* 代付款 */
.status {
    box-sizing: border-box;
    padding: 46rpx 20rpx;
    background-color: #FFFFFF;
    border-radius: 0 0 10rpx 10rpx;
}
.icon_img {
    width: 76rpx;
    height: 76rpx;
    margin-right: 10rpx;
}
.ties {
    font-size: 28rpx;
}
.btns {
    justify-content: flex-end;
    align-items: center;
}
.pay {
    background-color: #1296DB;
    color: #FFFFFF;
    line-height: 60rpx;
    padding: 0 16rpx;
    border-radius: 60rpx;
    font-size: 24rpx;
    width: 140rpx;
}
.cancel {
    border: 2rpx solid #666666;
    line-height: 58rpx;
    color: #666666;
    width: 140rpx;
    padding: 0 16rpx;
    border-radius: 60rpx;
    margin-left: 20rpx;
    font-size: 24rpx;
    box-sizing: border-box;
}
/* 收货人 */
.rePerson {
    margin: 0 10rpx;
    padding: 30rpx 20rpx;
    align-items: center;
    border-radius: 10rpx;
}
.address_icon {
    color: #D7D7D7;
    padding: 0 20rpx;
    text-align: center;
}
.perspn_info {
    font-weight: 700;
    padding-bottom: 10rpx;
}
.name {
    display: inline-block;
    width: 240rpx;
}
.phone {
    text-align: right;
}
.store_address {
    margin: 0 10rpx;
    padding: 25rpx;
    line-height: 40rpx;
    border-radius: 10rpx 10rpx 0 0;
}
/* 商品信息 */
.goods_info {
    margin: 0 10rpx 16rpx;
    padding: 16rpx;
    position: relative;
    box-sizing: border-box;
    border-radius: 0 0 10rpx 10rpx;
}
.goods_img {
    height: 150rpx;
    width: 150rpx;
    margin-right: 16rpx;
}
.count {
    text-align: center;
    font-size: 24rpx;
}
.price {
    font-weight: 700;
}
/* 价格列表 */
.price_detail {
    margin: 0 10rpx 16rpx;
    padding: 20rpx;
    line-height: 60rpx;
    border-radius: 10rpx;
}
.left {
    width: 200rpx;
}
.right {
    text-align: right;
}
.buy_again {
    margin-left: auto;
    width: 160rpx;
    line-height: 40rpx;
    color: #999999;
    border-radius: 60rpx;
    border: 1px solid #999999;
}
/* 订单信息 */
.order_info {
    margin: 0 10rpx 16rpx;
    padding: 20rpx;
    font-size: 28rpx;
    line-height: 56rpx;
    border-radius: 10rpx;
}
.copy {
    width: 80rpx;
    height: 40rpx;
    line-height: 40rpx;
    color: #FFFFFF;
    font-size: 20rpx;
    background-color: #1296DB;
    display: inline-block;
    text-align: center;
    border-radius: 20rpx;
    margin-left: 20rpx;
}
.toDetail {
    font-size: 40rpx;
    font-weight: 700;
}
/* 弹出框 */
.dialog {
    width: 560rpx;
    background-color: #FFFFFF;
    border-radius: 20rpx;
}
.cancelIpt {
    border: 1px solid #666666;
    width: 80%;
    margin: 30rpx auto;
}
.dialogBtn {
    border-radius: unset !important;
    color: #007AFF;
}
.dialogTitle {
    font-weight: 700;
    padding: 20rpx 0;
    font-size: 36rpx;
    text-align: center;
}
.dialogTxt {
    text-align: center;
}
// 猜你喜欢
.youLike {
    padding: 20rpx;
    box-sizing: border-box;
    background: #EFF3F6;
    .tit {
        height: 80rpx;
        line-height: 80rpx;
        padding: 0 20rpx;
        border-radius: 16rpx 16rpx 0 0;
        box-sizing: border-box;
        font-size: 36rpx;
        font-weight: 700;
        text-align: center;
    }
    .yl-list {
        .yl-item {
            &:nth-child(2n) {
                margin-right: 0;
            }
            width: 49%;
            margin-right: 2%;
            margin-top: 10rpx;
            border-radius: 10rpx;
            .yl-img {
                width: 100%;
                height: 360rpx;
                padding: 20rpx 0;
                box-sizing: border-box;
                .img {
                    width: 100%;
                    height: 100%;
                }
            }
            .yl-info {
                line-height: 40rpx;
                padding: 10rpx 20rpx;
                box-sizing: border-box;
                font-size: 28rpx;
                .yl-name, .yl-fac {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .yl-spe, .yl-fac {
                    font-size: 26rpx;
                }
                .yl-price {
                    line-height: 56rpx;
                    font-size: 24rpx;
                    font-weight: 700;
                    color: #E35C5C;
                    i {
                        font-size: 32rpx;
                    }
                }
            }
        }
    }
}
.orderCode{
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 700;

    .oc-title{
      padding: 5px 0;
    }
    .oc-cont{
      margin: 0 auto;
      width: 75%;
    }
}
.margin_8 {
    margin-bottom: 16rpx;
}
.border_bottom_1 {
    border-bottom: 1px solid #EFEFF4;
}
</style>