<template>
  <div class="content">
    <!-- #ifndef MP-WEIXIN -->
    <uni-nav-hfbar fixed status-bar left-icon="back" title="会员推荐"></uni-nav-hfbar>
    <!-- #endif -->
      <div style="height:100px;background-color:red">
      </div>
      <div class="toggle_nav uni-flex">
          <div class="nav_item " @click="tabNav=0" :class="tabNav==0?'active_item':''">商品推荐</div>
          <div class="nav_item " @click="tabNav=1" :class="tabNav==1?'active_item':''">精准送劵</div>
          <div class="nav_item " @click="tabNav=2" :class="tabNav==2?'active_item':''">推荐套餐</div>
      </div>
      <div class="content_list">
          <!-- 商品推荐 -->
          <div class="goods_recommend" v-if="tabNav==0">
              <div class="goods_item uni-flex">
                  <div class="img_wrap">
                      <image mode="aspectFit" src="../../static/image/com/goods.jpg" class="goods_img"></image>
                  </div>
                  <div class="uni-flex-1">
                      <div class="goods_name">爱康国宾全面体检【规格】</div>
                      <div class="goods_ties">核磁共振，深度体检套餐</div>
                      <div class="goods_ties">万慧演示门店，请勿下单</div>
                      <div>
                          <span class="discount_ties font_color_common">111</span>
                          <span class="discount_ties font_color_common">222</span>
                      </div>
                      <div>
                          <span class=" font_color_common price_wrap">零售价:￥</span>
                          <span class="sale_price font_color_common">0.01</span>
                          <span class=" font_color_999 old_price">￥0.11</span>
                      </div>
                      <div>
                            <span class=" font_color_999">佣金：</span>
                            <span >￥</span> 
                            <span>0.00</span>
                      </div>
                      <div class=" iconfont icon-collect uni-flex-1 icon_collect font_color_999"></div>
                  </div>
              </div>
          </div>
          
          <!-- 领劵中心 -->
          <div class="coupon" v-if="tabNav==1">
              <view class="coupon-item bg_white first" >
                <view class="coupon-con-wrap uni-flex">
                    <view class="couponCon-info uni-flex-1">
                        <image class="img" mode="aspectFit" :lazy-load="true" src="../../static/image/com/qiang.png"></image>
                        <view class="info-head font_color_666">
                            <span class="coupon-type font_color_white bg_common">{{ '3元代金券' }}</span>
                            {{ '2元代金券' }}
                        </view>
                        <view class="info-time">活动截止日期：{{ 2021-11-11 }}</view>
                        <view class="info-other uni-flex">
                            <view class="couponCon-main uni-flex-1" >
                                <span class="main-type" >￥</span>
                                <span class="main-con">{{ 1.11 }}</span>
                            </view>
                            <view class="other-more tr" >
                                详细信息
                                <span class="iconfont icon-right" ></span>
                            </view>
                        </view>
                    </view>
                    <view class="couponCon-get-wrap" >
                        <view class="info-get">
                            <!-- <view class="iconfont icon-received font_color_common" ></view> -->
                            <uni-circle :size="50" :percent="10"></uni-circle>
                        </view>
                        <view class="info-btn bg_common font_color_white">{{ '立即领取' }}</view>
                    </view>
                </view>
                <view class="coupon-des-wrap" >
                    <view class="couponDes-rule">规则说明：{{ '满2件可用' }}</view>
                    <view class="couponDes-dtl" >详细信息：{{ '满2件可叠加使用' }}</view>
                </view>
            </view>
          </div>
          <!-- 套餐组合 -->
          <div class="combo" v-if="tabNav==2">
              <div class="combo_group_item">
                  <div class="combo_name">组合套餐名称</div>
                    <scroll-view scroll-x="true" class="uni-flex" style="border-bottom:4rpx solid #efe9e9">
                        <div class="uni-flex">
                            <div class="combo_group uni-flex">
                                <div>
                                    <div style="width:220rpx">
                                        <img src="../../static/image/com/goods.jpg" alt="" class="combo_img">
                                    </div>
                                    <div class="combo_gname font_color_999">深度体检退套餐</div>
                                    <div class="combo_gname font_color_999">￥1.11</div>
                                </div>
                                <div class=" iconfont icon-add add_icon font_color_999"></div>
                            </div>
                            <div class="combo_group uni-flex">
                                <div>
                                    <div style="width:220rpx">
                                        <img src="../../static/image/com/goods.jpg" alt="" class="combo_img">
                                    </div>
                                    <div class="combo_gname font_color_999">深度体检退套餐</div>
                                    <div class="combo_gname font_color_999">￥1.11</div>
                                </div>
                                <div class=" iconfont icon-add add_icon font_color_999"></div>
                            </div>
                            <div class="combo_group uni-flex">
                                <div>
                                    <div style="width:220rpx">
                                        <img src="../../static/image/com/goods.jpg" alt="" class="combo_img">
                                    </div>
                                    <div class="combo_gname font_color_999">深度体检退套餐</div>
                                    <div class="combo_gname font_color_999">￥1.11</div>
                                </div>
                                <div class=" iconfont icon-add add_icon font_color_999"></div>
                            </div>
                        </div>
                    </scroll-view>
                    <div class="uni-flex total_wrap">
                        <div class="uni-flex-1">
                            <div>合计：<span class=" font_color_common">￥12.12</span></div>
                            <div>立省：￥22.22元，原价<span style="text-decoration: line-through;">￥22.11元</span></div>
                        </div>
                        <div class="addcar bg_common">加入清单</div>
                    </div>
              </div>
              <div class="combo_group_item">
                  <div class="combo_name">组合套餐名称</div>
                    <scroll-view scroll-x="true" class="uni-flex" style="border-bottom:4rpx solid #efe9e9">
                        <div class="uni-flex">
                            <div class="combo_group uni-flex">
                                <div>
                                    <div style="width:220rpx">
                                        <img src="../../static/image/com/goods.jpg" alt="" class="combo_img">
                                    </div>
                                    <div class="combo_gname font_color_999">深度体检退套餐</div>
                                    <div class="combo_gname font_color_999">￥1.11</div>
                                </div>
                                <div class=" iconfont icon-add add_icon font_color_999"></div>
                            </div>
                        </div>
                    </scroll-view>
                    <div class="uni-flex total_wrap">
                        <div class="uni-flex-1">
                            <div>合计：<span class=" font_color_common">￥12.12</span></div>
                            <div>立省：￥22.22元，原价<span style="text-decoration: line-through;">￥22.11元</span></div>
                        </div>
                        <div class="addcar bg_common">加入清单</div>
                    </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import uniCircle from '@/components/uni-circle/uni-circle.vue';
    
export default {
    components:{
        uniCircle
    },
    data(){
        return{
            tabNav:0,
        }
    }
}
</script>

<style lang="scss">

page{
    background-color: #fff;
}
// 组合套餐
.combo_group_item{
    margin-bottom: 30rpx;
}
.combo_group_item:last-of-type .total_wrap{
    border-bottom: none;
}
.combo_group:last-of-type .add_icon{
    display: none;
}
.combo_name{
    height: 60rpx;
    line-height: 60rpx;
    font-size: 32rpx;
    padding: 0 20rpx;
}
.add_icon{
    font-size: 54rpx;
    width: 80rpx;
    font-weight: bold;
    text-align: center;
}
.combo_group{
    align-items: center;
}
.total_wrap{
    padding: 10rpx 20rpx;
    border-bottom: 4rpx solid #efe9e9;
    align-items: center;
}
.combo_gname{
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 24rpx;
}
.combo_img{
    width: 220rpx;
    height: 240rpx;
}
.addcar{
    height: 60rpx;
    line-height: 60rpx;
    color: #fff;
    padding: 0 20rpx;
}
// 组合套餐

.toggle_nav{
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    padding: 0 40rpx;
    font-size: 34rpx;
    color: #968989;
    justify-content: space-between;
    border-top: 2rpx solid #e5e5e5;
    border-bottom: 2rpx solid #e5e5e5;
}
.active_item{
    border-bottom: 4rpx solid #EE231E;
}
.img_wrap{
    margin: auto 0;
}
.goods_item{
    position: relative;
    padding: 20rpx 0;
    border-bottom: 2rpx solid #e5e5e5;
}
.goods_img{
    width: 200rpx;
    height: 200rpx;
    margin-right: 20rpx;
}
.discount_ties{
    border: 2rpx solid #EE231E ;
    border-radius: 10rpx;
    padding: 2rpx 6rpx;
    font-size: 24rpx;
    margin-right: 10rpx;
}
.goods_name{
    font-size: 32rpx;
    font-weight: 600;
}
.goods_ties{
    color: #848383;
    font-size: 26rpx;
    padding: 4rpx 0;
}
.price_wrap{
    font-size: 30rpx;
}
.sale_price{
    font-size: 34rpx;
    font-weight: 700;
}
.old_price{
    text-decoration: line-through;
    margin-left: 10rpx;
}
.icon_collect{
    position: absolute;
    font-size: 54rpx;
    right: 80rpx;
    bottom: 8rpx;
    font-size: 27px;
}

/* 领劵中心 */

            .coupon-item{
                margin-top: 10px;
                position: relative;
                overflow: hidden;
                .coupon-con-wrap{
                    padding: 8px 10px;
                    box-sizing: border-box;
                    .couponCon-info{
                        padding-right: 10px;
                        border-right: 1px dashed #CDCDCD;
                        box-sizing: border-box;
                        position: relative;
                        .img{
                            width: 32px;
                            height: 32px;
                            position: absolute;
                            right: 0;
                            top: 0;
                        }
                        .info-head{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            .coupon-type{
                                margin-right: 5px;
                                padding: 4px 8px;
                                box-sizing: border-box;
                                font-size: 10px;
                                border-radius: 5px;
                                line-height: 22px;
                            }
                        }
                        .info-time{
                            line-height: 28px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 14px;
                            color: #8f8f94;
                        }
                        .info-other{
                            height: 36px;
                            line-height: 36px;
                            .couponCon-main{
                                font-weight: 700;
                                color: #F2292E;
                                .main-type,.main-unit{
                                    font-size: 14px;
                                }
                                .main-con{
                                    font-size: 24px;
                                }
                            }
                            .other-more{
                                font-size: 13px;
                                color: #999999;
                            }
                        }
                    }
                    .couponCon-get-wrap{
                        padding: 0 15px 0 25px;
                        box-sizing: border-box;
                        .info-get{
                            padding-bottom: 10px;
                            box-sizing: border-box;
                            .icon-received{
                                width: 50px;
                                height: 50px;
                                font-size: 50px;
                                line-height: 1;
                                margin: 0 auto;
                            }
                        }
                        .info-btn{
                            padding: 2px 8px;
                            border-radius: 5px;
                            box-sizing: border-box;
                            font-size: 12px;
                            text-align: center;
                        }
                    }
                }
                .coupon-des-wrap{
                    line-height: 20px;
                    padding: 10px;
                    border-top: 1px solid #F2F2F2;
                    box-sizing: border-box;
                    font-size: 12px;
                }
            }
        .noCoupon-list{
            line-height: 1.2;
            padding-top: 50px;
            box-sizing: border-box;
        }
</style>