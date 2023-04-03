<template>
    <view class="customerDetails">
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="会员详情"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="pageHead bg_white" id="pageHead">
            <view class="uni-flex">
                <view class="customerImg"><image src="" /></view>
                <view class="customerInfo uni-flex-1">
                <view class="customerName font_color_000"
                    >{{ customer.customerName }}<i class="iconfont icon-dianhua"></i
                ></view>
                <view class="customerJoinTime"
                    >加入时间：{{ customer.joinTime }}</view
                >
                <view class="customerPoint"
                    >会员积分：{{ customer.point
                    }}<b class="font_color_common">查看明细</b></view
                >
                </view>
                <view class="customerLevel bg_common font_color_white">黄金会员</view>
            </view>
            <view class="customerConsume uni-flex">
                <view class="uni-flex-1">
                <view class="ccInfo">400</view>
                <view class="ccName font_color_999">商城消费(元)</view>
                </view>
                <view class="uni-flex-1">
                <view class="ccInfo">4</view>
                <view class="ccName font_color_999">消费次数(次)</view>
                </view>
                <view class="uni-flex-1">
                <view class="ccInfo">100</view>
                <view class="ccName font_color_999">次均消费(元)</view>
                </view>
            </view>
        </view>
        <view class="customerMemo bg_white" id="customerMemo">
            <view class="cmTitle uni-flex">
                <view class="uni-flex-1">客户资料和备注</view>
                <view class="checkInfo font_color_999"
                >查看资料<i class="iconfont icon-right"></i
                ></view>
            </view>
            <view class="cmCont">
                <view class="customerLabel">
                    <view class="clItem">多次消费</view>
                    <view class="clItem">有宝宝</view>
                    <view class="clItem">女生</view>
                    <view class="clItem">注重性价比</view>
                    <view class="clItem">高尿酸</view>
                    <view class="clItem">90后</view>
                </view>
                <view class="addLabel font_color_common border_common">打标签</view>
            </view>
        </view>

        <view class="customerService bg_white">
            <view class="csTitle uni-flex bg_white" :class="isFixed ? 'isFixed' : ''">
                <view class="csTitleName">服务顾问</view>
                <view class="uni-flex-1"
                >查看资料<i class="iconfont icon-right"></i
                ></view>
            </view>
            <view class="csCont">
                <view class="csTabs uni-flex bg_white" :class="isFixed ? 'isFixed' : ''">
                    <view class="csTabsItem uni-flex-1" :class="currTabs == 0 ? 'active' : ''" @click="changeTabs(0)">购买记录<view class="bLine" :class="currTabs == 0 ? 'bg_common' : ''"></view></view>
                    <view class="csTabsItem uni-flex-1" :class="currTabs == 1 ? 'active' : ''" @click="changeTabs(1)">TA的券<view class="bLine" :class="currTabs == 1 ? 'bg_common' : ''"></view></view>
                    <view class="csTabsItem uni-flex-1" :class="currTabs == 2 ? 'active' : ''" @click="changeTabs(2)">商品浏览TOP10<view class="bLine" :class="currTabs == 2 ? 'bg_common' : ''"></view></view>
                </view>
                <view class="csTabsCont">
                    <view class="cstCont" v-show="currTabs == 0">
                        <view>
                            <view class="cstcItem uni-flex" v-for="(gd, index) in buyGoods">
                                <image class="cstcItemImg" />
                                <view class="cstcItemCont uni-flex-1">
                                    <view class="cstcItemName wrap-2">{{gd.goodsName + index}}</view>
                                    <view class="Times uni-flex">
                                        <view class="buyTimes uni-flex-1">浏览次数：<span>{{gd.readTimes}}</span>次</view>
                                        <view class="readTimes uni-flex-1">购买次数：<span>{{gd.buyTimes}}</span>次</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <uni-load-more ref="buyLoad" :status="buyStatus" :content-text="buyContentText" />
                    </view>
                    <view class="cstCont" v-show="currTabs == 1" style="padding-bottom: 10px;">
                        <view>
                            <view class="cstCouponItem" v-for="(cp, index) in couponList">
                                <div class="cstiCont uni-flex">
                                    <view class="couponMain bg_common font_color_white">
                                        <i v-if="cp.couponType == 0">￥</i><span :class="cp.couponName.length > 3 ? 'smallFont' : ''" v-if="cp.couponType != 2">{{cp.couponCont}}</span><i v-if="cp.couponType == 1">折</i>
                                        <strong v-if="cp.couponType == 2">包邮</strong>
                                    </view>
                                    <view class="couponInfo uni-flex-1 border_common">
                                        <view class="ciTop">
                                            <view class="couponName wrap-2">
                                                <b class="bg_common">{{cp.couponType == 0 ? '代金券' : cp.couponType == 1 ? '折扣券' : '包邮券'}}</b>{{cp.couponName + index}}
                                            </view>
                                            <view class="couponUseTime border_common_bottom">{{cp.couponDate}}</view>
                                        </view>
                                        <view class="ciBottom uni-flex" @click="openCouponDetails(index)">
                                            <span class="uni-flex-1">已领取{{cp.couponNum}}张</span>
                                            <span class="moreDetails uni-flex-1">详细信息<i class="iconfont icon-morearrow font_color_common" :class="openCouponMore === index ? 'showMore' : ''"></i></span>
                                        </view>
                                    </view>
                                    <view class="couponIcon border_common"></view>
                                    <view class="couponIcon bt border_common"></view>
                                </div>
                                <view class="couponDetails" :class="openCouponMore === index ? 'showMore' : ''">
                                    <view class="cdCont">
                                        <view class="cdContList">
                                            <view class="cdContItem">规则说明：{{cp.couponRule}}</view>
                                            <view class="cdContItem">详细信息：{{cp.couponDetails}}</view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <uni-load-more ref="couponLoad" :status="couponStatus" :content-text="couponContentText" />
                    </view>
                    <view class="cstCont" v-show="currTabs == 2">
                        <view class="cstcItem uni-flex" v-for="(gd, index) in goods">
                            <image class="cstcItemImg" />
                            <view class="cstcItemCont uni-flex-1">
                                <view class="cstcItemName wrap-2">{{gd.goodsName}}</view>
                                <view class="Times uni-flex">
                                    <view class="buyTimes uni-flex-1">浏览次数：<span>{{gd.readTimes}}</span>次</view>
                                    <view class="readTimes uni-flex-1">购买次数：<span>{{gd.buyTimes}}</span>次</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            isFixed: false,
            fixedHeight: 0,
            buyHeight: 0,
            couponHeight: 0,
            readHeight: 0,
            customer: {
                customerName: "放飞自我",
                joinTime: "2020-06-06 12:12:12",
                point: 20000000,
            },
            buyGoods: [{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            }],
            couponList: [{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            },{
                couponCont: '100',
                couponType: 1,
                couponName: '0.5元叠加优惠券',
                couponDate: '2020-09-20~2021-06-10',
                couponNum: 10,
                couponRule: '商品数量满100件可用',
                couponDetails: '订单满100元可用。',
            }],
            goods: [{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            },{
                goodsName: '肥胖基因检测',
                readTimes: 2,
                buyTimes: 0,
            }],
            currTabs: 0,
            openCouponMore: 'false',
            buyPageNo: 0,
            buyStatus: "more",
            buyContentText: {
                contentdown: "上拉加载更多",
                contentrefresh: "正在加载...",
                contentnomore: "—— 我也是有底线的 ——"
            },
            couponPageNo: 0,
            couponStatus: "more",
            couponContentText: {
                contentdown: "上拉加载更多",
                contentrefresh: "正在加载...",
                contentnomore: "—— 我也是有底线的 ——"
            },
        };
    },
    onLoad(options) {
    },
    mounted(){
        // #ifdef H5
        this.fixedHeight = document.getElementById('pageHead').clientHeight + document.getElementById('customerMemo').clientHeight + 20;
        // #endif
    },
    onPageScroll(e){
        if(e.scrollTop >= this.fixedHeight + 87){
            this.isFixed = true;
            if(this.currTabs == 0){
                this.buyHeight = e.scrollTop;
            }else if(this.currTabs == 1){
                this.couponHeight = e.scrollTop;
            }else if(this.currTabs == 2){
                this.readHeight = e.scrollTop;
            }
        }else{
            this.isFixed = false;
        }
    },
    onReachBottom(){
        if(this.currTabs == 0){
            if(this.buyStatus != 'noMore' && this.buyStatus != 'loading'){
                this.initBuyGoods('add');
            }
        }else if(this.currTabs == 1){
            if(this.couponStatus != 'noMore' && this.couponStatus != 'loading'){
                this.initCoupons('add');
            }
        }
    },
    methods: {
        initBuyGoods(type){ // 初始化购买记录
            this.buyStatus = 'loading';
            if(this.buyPageNo < 3){
                var buyList = JSON.parse(JSON.stringify(this.goods));
                this.buyGoods.push.apply(this.buyGoods, buyList);
                this.buyPageNo++;
                console.log(this.buyPageNo)
                this.$nextTick(() => {
                    this.buyStatus = 'more';
                })
            }else{
                this.buyStatus = 'noMore';
            }
        },
        initCoupons(type){ // 初始化优惠券
            this.couponStatus = 'loading';
            if(this.couponPageNo < 5){
                var couponList = JSON.parse(JSON.stringify(this.couponList));
                this.couponList.push.apply(this.couponList, couponList);
                this.couponPageNo++;
                this.$nextTick(() => {
                    this.couponStatus = 'more';
                })
            }else{
                this.couponStatus = 'noMore';
            }
        },
        changeTabs(item) { // 修改服务顾问内容tabs
            this.currTabs = item;
            uni.pageScrollTo({
                scrollTop: item == 0 ? this.buyHeight : item == 1 ? this.couponHeight == 0 ? this.fixedHeight : this.couponHeight : item == 2 ? this.readHeight == 0 ? this.fixedHeight : this.readHeight : this.fixedHeight,
                duration: 100
            });
        },
        openCouponDetails(index){
            if(this.openCouponMore == index){
                this.openCouponMore = 'false';
            }else{
                this.openCouponMore = index;
            }
        },
    },
};
</script>

<style scoped lang="scss">
page {
    width: 100%;
    height: 100%;
    background: #EEEEEE;

    .pageHead {
        position: relative;
        margin-bottom: 10px;
        padding: 10px;

        .customerImg {
            margin-right: 10px;
            width: 80px;
            height: 80px;

            image {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .customerInfo {
            font-size: 12px;
            line-height: 14px;
            color: #999999;

            .customerName {
                padding-bottom: 10px;
                font-size: 16px;
                font-weight: 700;
                line-height: 20px;

                i {
                    padding-left: 10px;
                }
            }
            .customerJoinTime {
                padding-bottom: 10px;
            }
            .customerPoint {
                position: relative;

                b {
                    display: inline-block;
                    padding-left: 10px;
                    font-size: 13px;
                }
            }
        }
        .customerLevel {
            margin: 24px 0 24px 10px;
            width: 70px;
            height: 30px;
            font-size: 12px;
            text-align: center;
            line-height: 30px;
            border-radius: 30px;
        }
        .customerConsume {
            padding: 10px 0 0;
            font-size: 12px;
            text-align: center;
            border-top: 1px solid #EEEEEE;

            .ccInfo {
                font-size: 20px;
                font-weight: 700;
            }
        }
    }
    .customerMemo {
        margin-bottom: 10px;
        padding: 0 10px 15px;

        .cmTitle {
            font-size: 16px;
            font-weight: 700;
            line-height: 46px;
            border-bottom: 1px solid #EEEEEE;

            .checkInfo {
                font-size: 14px;
                font-weight: 400;

                i {
                    display: inline-block;
                    vertical-align: bottom;
                }
            }
        }

        .cmCont {
            .customerLabel {
                font-size: 0;

                .clItem {
                    display: inline-block;
                    margin: 10px 8px 0 0;
                    padding: 5px 15px;
                    font-size: 14px;
                    line-height: 20px;
                    background: #F7F7F7;
                    border-radius: 30px;
                }
            }
            .addLabel {
                display: inline-block;
                margin-top: 15px;
                padding: 5px 15px;
                line-height: 18px;
                border: 1px solid;
                border-radius: 30px;
            }
        }
    }
    .customerService {
        padding: 0 10px;

        .csTitle {
            text-align: right;
            line-height: 46px;
            border-bottom: 1px solid #EEEEEE;

            .csTitleName {
                width: 80px;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
            }
            &.isFixed {
                position: fixed;
                /* #ifdef H5 */
                top: 44px;
                /* #endif */
                right: 10px;
                left: 10px;
                z-index: 99;
            }
        }
        .csCont {
            .csTabs {
                border-bottom: 1px solid #EEEEEE;

                .csTabsItem {
                    position: relative;
                    line-height: 46px;
                    text-align: center;
                    color: #666666;

                    .bLine {
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        margin-left: -15px;
                        width: 30px;
                        height: 4px;
                        border-radius: 4px;
                    }
                    &.active {
                        font-weight: 700;
                        color: #000000;
                    }
                }
                &.isFixed {
                    position: fixed;
                    /* #ifdef H5 */
                    top: 92px;
                    /* #endif */
                    right: 10px;
                    left: 10px;
                    z-index: 99;
                }
            }
            .csTabsCont {
                .cstCont {
                    .cstcItem {
                        padding: 10px 0;
                        height: 90px;
                        border-bottom: 1px solid #EEEEEE;

                        .cstcItemImg {
                            display: block;
                            margin-right: 10px;
                            width: 70px;
                            height: 70px;
                        }
                        .cstcItemCont {
                            .cstcItemName {
                                margin-bottom: 10px;
                                height: 40px;
                                font-size: 15px;
                                line-height: 20px;
                            }
                            .Times {
                                font-size: 13px;
                                line-height: 20px;
                                color: #999999;

                                span {
                                    font-size: 16px;
                                    font-weight: 700;
                                    color: #000000;
                                }
                            }
                        }
                    }
                    .cstCouponItem {
                        position: relative;
                        margin-top: 10px;

                        .cstiCont{
                            overflow: hidden;
                            position: relative;
                            border-radius: 8px;

                            .couponMain {
                                width: 120px;
                                height: 110px;
                                line-height: 110px;
                                text-align: center;

                                span {
                                    font-size: 50px;

                                    &.smallFont {
                                        font-size: 38px;
                                    }
                                }
                                strong {
                                    font-size: 36px;
                                }
                            }
                            .couponInfo {
                                height: 110px;
                                border: 1px solid;
                                border-left: none;
                                border-radius: 0 8px 8px 0;

                                .ciTop{
                                    .couponName {
                                        padding: 6px 10px 0;
                                        height: 48px;
                                        line-height: 22px;
                                        color: #000000;

                                        b {
                                            display: inline-block;
                                            margin-right: 5px;
                                            padding: 2px 8px;
                                            height: 18px;
                                            font-size: 10px;
                                            font-weight: 400;
                                            line-height: 14px;
                                            vertical-align: middle;
                                            color: #FFFFFF;
                                            border-radius: 5px;
                                        }
                                    }
                                    .couponUseTime {
                                        padding: 3px 0;
                                        margin: 0 10px;
                                        font-size: 12px;
                                        color: #AAAAAA;
                                        line-height: 28px;
                                        border-bottom: 1px dashed;
                                    }
                                }
                                .ciBottom {
                                    padding: 0 10px;

                                    span {
                                        padding-top: 2px;
                                        font-size: 12px;
                                        font-weight: 700;
                                        line-height: 22px;
                                        color: #999999;

                                        &.moreDetails{
                                            font-weight: 400;
                                            text-align: right;

                                            i{
                                                display: inline-block;
                                                vertical-align: bottom;
                                                -ms-transform: rotate(-90deg);
                                                -moz-transform: rotate(-90deg);
                                                -webkit-transform: rotate(-90deg);
                                                -o-transform: rotate(-90deg);
                                                transform: rotate(-90deg);
                                                -moz-transition: transform 450ms;
                                                -webkit-transition: transform 450ms;
                                                -o-transition: transform 450ms;
                                                transition: transform 450ms;

                                                &.showMore{
                                                    -ms-transform: rotate(0deg);
                                                    -moz-transform: rotate(0deg);
                                                    -webkit-transform: rotate(0deg);
                                                    -o-transform: rotate(0deg);
                                                    transform: rotate(0deg);
                                                    -moz-transition: transform 450ms;
                                                    -webkit-transition: transform 450ms;
                                                    -o-transition: transform 450ms;
                                                    transition: transform 450ms;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        .couponDetails{
                            overflow: hidden;
                            height: 0;
                            
                            &.showMore{
                                overflow: hidden auto;
                                margin: 10px 0;
                                max-height: 60px;
                                transition: height .3s;
                                -moz-transition: height .3s; /* Firefox 4 */
                                -webkit-transition: height .3s; /* Safari 和 Chrome */
                                -o-transition: height .3s; /* Opera */
                            }
                            .cdCont{
                                position: relative;
                                margin: 0 12px;
                                width: auto;
                                font-size: 12px;

                                .cdContItem{
                                    line-height: 20px;
                                    color: #000000;
                                }
                            }
                        }
                        .couponIcon {
                            position: absolute;
                            top: -8px;
                            left: 112px;
                            width: 16px;
                            height: 16px;
                            z-index: 9;
                            background: #FFFFFF;
                            border: 1px solid;
                            border-radius: 50%;

                            &.bt {
                                top: 102px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>