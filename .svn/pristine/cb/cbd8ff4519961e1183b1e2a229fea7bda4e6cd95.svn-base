<template>
    <view class="bargainSeckill" :style="isiphoneBt ? 'padding-bottom: 40rpx' : ''">
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="限时抢购"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="limitPageTime uni-flex">
            <view class="item uni-flex-1 pic">
                <image src="../../static/image/com/bk.png" />
            </view>
            <view class="item uni-flex-1" :class="currTab == index ? 'now' : ''"
                @tap="changeTime(index, lt, (index + 1 > limitTime.length ? limitTime[index + 1] : lt == 22 ?  0 : lt + 2), (limitTime[0] <= 14 ? 0 : lt >= 0 && lt < 6 ? 1 : 0))"
                v-for="(lt, index) in limitTime" v-cloak>
                <p class="first">{{(lt > 9 ? lt : '0' + lt) + ':00'}}</p>
                <p class="statu">
                    {{index == 0 ? '抢购中' : limitTime[0] <= 14 ? '即将开始' : lt>= 0 && lt < 8 ? '明日开始' : '即将开始'
                            }}</p>
            </view>
        </view>
        <view class="good">
            <scroll-view class="goodsList" scroll-y="true">
                <view class="goodsItem uni-flex" @click="goUrl('detail', '', 'skuSalNo=' + lg.skuSalNo + '&storeId=' + (lg.storeDTO ? lg.storeDTO.storeId : '') + '&consignorId=' + lg.consignorId)" v-for="lg in limitGoods" v-if="limitGoods.length > 0">
                    <view class="img-box">
                        <image :src="lg.imagePath + '?x-oss-process=image/resize,m_mfit,h_180,w_180'" />
                    </view>
                    <view class="mes uni-flex-1">
                        <p class="wrap-2 font_color_333 goodsName">
                            {{lg.brandName + ' ' + lg.goodsName + ' ' + lg.specification}}</p>
                        <view class="uni-flex uni-flex-c uni-flex-j">
                            <view class="price uni-flex-1">
                                <p>￥{{lg.sellPrice && lg.sellPrice.promoPrice ? lg.sellPrice.promoPrice : '0.00'}}<s>￥{{lg.sellPrice.sellPrice}}</s></p>
                            </view>
                            <view :class="currTab == 0 ? 'buy' : 'ready'">
                                <p>{{currTab == 0 ? '立即抢购' : '即将开抢'}}</p>
                                <view class="progress uni-flex" v-if="currTab == 0">
                                    <view class="line uni-flex-1">
                                        <view class="cur"
                                            :style="'width:' + getBuyPercent(lg) + '%'">
                                        </view>
                                    </view>
                                    <view class="progressNum">
                                        {{ getBuyPercent(lg) }}%
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="endPage" v-if="limitGoods.length > 0" v-cloak>—— 已经到底了哦 ——</view>
                <view class="endPage" v-if="limitGoods.length == 0 && !isLoading" v-cloak>该时段暂无秒杀商品</view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            isiphoneBt: false,
            storeId: '',
            consignorId: '',
            
            limitTime: [],
            currTab: 0,
            pageNo: 1,
            pageSize: 999,
            limitGoods: [],
            isLoading: false,
        };
    },
    onLoad(option){
        this.consignorId = this.getStor('_defaultConsignorId_');
        this.storeId = this.getStor('_storeId_');
        let nowDate = new Date();
        this.initLimitTime(nowDate);
    },
    mounted() {
        let _model_ = this.getStor('_model_');
        if(_model_.indexOf('iPhone X') != -1 || _model_.indexOf('iPhone XR') != -1 || _model_.indexOf('iPhone XS') != -1 || _model_.indexOf('iPhone XS Max') != -1 || _model_.indexOf('iPhone 11') != -1 || _model_.indexOf('iPhone 11 Pro') != -1 || _model_.indexOf('iPhone 11 Pro Max') != -1){
            this.isiphoneBt = true;
        }
    },
    methods: {
        initLimitTime(nowDate) {
            let timeArr = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 0, 2, 4, 6]
            let nowHours = nowDate.getHours();
            let i = 0;
            timeArr.map((item, index) => {
                if (item == nowHours || (item < nowHours && timeArr[index + 1] > nowHours) || (i > 0 && i < 5)) {
                    this.limitTime.push(item);
                    i++;
                }
            })
            this.$nextTick(() => {
                this.initList(this.limitTime[this.currTab], this.limitTime[this.currTab] >= 22 ? 0 : this.limitTime[this.currTab + 1], 0);
            })
        },
        initList(sTime, eTime, datType) {
            this.isLoading = true;
            this.limitGoods = [];
            let obj = {};
            obj.storeId = this.storeId;
            obj.pageNo = this.pageNo;
            obj.pageSize = this.pageSize;
            obj.specialStartTime = (sTime > 9 ? sTime : '0' + sTime) + ':00';
            obj.specialEndTime = (eTime > 9 ? (eTime * 1 - 1) : '0' + (eTime * 1 - 1)) + ':59';
            obj.datType = datType;
            obj.strategyType = 'index';
            this.ebigRequest("/promotion/productsBySpecial", obj, true).then((res) => {
                this.limitGoods = res ? [...this.limitGoods, ...res] : [];
                this.$nextTick(() => {
                    this.isLoading = false;
                })
            })
        },
        changeTime(index, sTime, eTime, datType) {
            this.currTab = index;
            this.initList(sTime, eTime, datType)
        },
        getBuyPercent(lg){
            return lg.specialPromotionDTO != undefined && lg.specialPromotionDTO != null ? parseInt(((lg.specialPromotionDTO.totalQty - lg.specialPromotionDTO.lessCount) / lg.specialPromotionDTO.totalQty) * 100) : 0;
        }
    },
};
</script>

<style lang="scss">
page {
    height: 100%;

    .bargainSeckill {
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        .limitPageTime {
            padding: 20rpx 0;
            background: #F2F2F2;

            .item {
                margin-top: 10rpx;
                text-align: center;

                .statu {
                    width: 100%;
                    margin: 0 auto 0;
                    border-radius: 20rpx;
                    font-size: 22rpx;
                }
                &.now {
                    .first {
                        color: #EE231E !important;
                    }
                    .line {
                        display: none !important;
                    }
                    .buy {
                        display: none !important;
                    }
                    .statu {
                        background: linear-gradient(to right, #FB5C3A, #F93752);
                        background: -webkit-linear-gradient(to right, #FB5C3A, #F93752);
                        color: #FFFFFF;
                    }
                }
            }
            .first {
                color: #000000;
                font-weight: bold;
                font-size: 36rpx;
            }
            .pic {
                margin-top: 0;

                image {
                    width: 100rpx;
                    height: 100rpx;
                }
            }
        }

        .good {
            height: calc(100% - 152rpx);

            .goodsList {
                height: 100%;

                .goodsItem {
                    padding: 20rpx;
                    margin: 10rpx;
                    background: #FFFFFF;
                    border-radius: 20rpx;

                    image {
                        margin-right: 20rpx;
                        width: 200rpx;
                        height: 200rpx;
                    }
                    .goodsName {
                        height: 88rpx;
                        font-size: 32rpx;
                        font-weight: 700;
                        line-height: 44rpx;
                    }
                    .benefit {
                        margin-top: 8rpx;
                    }
                    .price {
                        margin: 10rpx 0;

                        p {
                            margin-top: 48rpx;
                            font-size: 40rpx;
                            color: #EE231E;
                            font-weight: bold;
                        }
                        s {
                            display: inline-block;
                            margin-left: 10rpx;
                            color: #8F8F94;
                            font-weight: normal;
                            font-size: 26rpx;
                            text-decoration: line-through;
                        }
                        .storeName {
                            font-size: 28rpx;
                        }
                    }
                    .buy, .ready {
                        padding: 10rpx;
                        margin-top: 10rpx;
                        width: 180rpx;
                        text-align: center;
                        background: #EE231E;
                        border-radius: 10rpx;
                        font-size: 28rpx;

                        p {
                            color: #FFFFFF;
                        }
                    }
                    .ready {
                        margin-top: 48rpx;
                        background: green;
                    }
                    .line {
                        position: relative;
                        width: 160rpx;
                        height: 10rpx;
                        margin-top: 14rpx;
                        margin-left: 4rpx;
                        border-radius: 10rpx;
                        background: pink;

                        .cur {
                            position: absolute;
                            width: 0%;
                            top: 0;
                            bottom: 0;
                            background: #FFFFFF;
                            border-radius: 10rpx;
                        }
                    }
                    .progressNum {
                        width: 68rpx;
                        text-align: center;
                        font-size: 22rpx;
                        color: #FFFFFF;
                    }
                }
                .endPage {
                    padding: 20rpx 0;
                    text-align: center;
                    font-size: 28rpx;
                    line-height: 40rpx;
                    color: #999999;
                }
            }
        }
    }
}

</style>