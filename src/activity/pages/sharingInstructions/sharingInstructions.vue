<template>
    <view class="page">
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="分享有礼"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="banner_wrap">
            <image class="banner_bg" :src="basePath + 'img/miniProgram/share_banner.png'" />
            <view class="act_des">好友登录浏览后即可获得如下奖励</view>
            <view class="act_time">
                <span>{{ shareAct.startTime }}</span>
                至
                <span>{{ shareAct.endTime }}</span>
            </view>
        </view>
        <view class="act_con_wrap">
            <view class="act_con bg_white">
                <view class="mod_type uni-flex" v-for="act in shareAct.contentDTOS">
                    <view class="type_img" v-html="shareActCon(act)"></view>
                    <view class="type_con uni-flex-1">
                        <view v-if="act.contentType == '8' || act.contentType == 8">{{ typeFilter(act.couponCfgDTO) }}</view>
                        <view v-else>积分</view>
                        <view v-html="shareActDtl(act)"></view>
                        <view v-if="act.contentType == '8' || act.contentType == 8">有效期：{{ act.couponCfgDTO.startDate }}~{{ act.couponCfgDTO.endDate }}</view>
                    </view>
                </view>
                <view class="mod_to_share">点击右上角分享按钮去分享商品</view>
            </view>
            <view class="get_act_wrap bg_white">
                <view class="tit uni-flex">
                    <view class="tit_text uni-flex-1">我获得的奖励</view>
                    <view class="get_act_num uni-flex-1"><span style="display: inline;">共</span><span style="display: inline;">{{shareAct.recordDTOS && shareAct.recordDTOS.length ? shareAct.recordDTOS.length : '0'}}</span><span style="display: inline;">次</span></view>
                </view>
                <ul class="get_act_list" v-for="record in shareAct.recordDTOS">
                    <li class="get_act_time" style="font-size: 26rpx;">获得时间：{{ record.clickTime }}</li>
                    <li class="get_act_item uni-flex" v-for="act in record.contentDTO">
                        <view class="item_img" v-html="shareActCon(act)"></view>
                        <view class="item_con uni-flex-1">
                            <view v-if="act.contentType == '8' || act.contentType == 8">{{ typeFilter(act.couponCfgDTO) }}</view>
                            <view v-else>积分</view>
                            <view v-html="shareActDtl(act)"></view>
                            <view v-if="act.contentType == '8' || act.contentType == 8">有效期：{{ act.couponCfgDTO.startDate }}~{{ act.couponCfgDTO.endDate }}</view>
                            <!-- <view>获得时间：{{ record.clickTime }}</view> -->
                        </view>
                    </li>
                </ul>
                <view class="no_reword" v-if="shareAct.recordDTOS.length == 0">暂无奖励~</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            isiphoneBt: false,
            consignorId: '',
            storeId: '',
            skuSalNo: '',
            promotionId: '',

            memberInfo: '',
            goodMes: '',
            goodsimgs: [],
            shareAct: '',
            basePath: '',
            shareUrl: '',
        };
    },
    onLoad(options) {
        this.basePath = this.baseUrl;
        this.consignorId = options.consignorId;
        this.storeId = options.storeId;
        this.skuSalNo = options.skuSalNo;
        this.promotionId = options.promotionId;
        this.shareUrl = this.getStor('_shareUrl_');
        this.removeStor('_shareUrl_');
        this.getShareActDtl();
        this.getGoodsDetl();
    },
    onShareAppMessage() { //分享到微信好友
        return {
            title: this.goodMes.goodsName,
            content: '好药房 开启健康新生活',
            imageUrl: this.goodsimgs[0],
            path: this.shareUrl,
            succsee: ((data) => {
                this.closePop();
                uni.showToast({
                    title: "分享成功!",
                    icon: "none",
                });
            }),
            fail: ((err) => {
                this.closePop();
                uni.showToast({
                    title: "分享失败!",
                    icon: "none",
                });
            })
        }
    },
    onShareTimeline() { //分享到微信朋友圈
        return {
            title: this.goodMes.goodsName,
            content: '好药房 开启健康新生活',
            imageUrl: this.goodsimgs[0],
            path: this.shareUrl,
            succsee: ((data) => {
                this.closePop();
                uni.showToast({
                    title: "分享成功!",
                    icon: "none",
                });
            }),
            fail: ((err) => {
                this.closePop();
                uni.showToast({
                    title: "分享失败!",
                    icon: "none",
                });
            })
        }
    },
    methods: {
        getGoodsDetl: function() { //获取商品详情
            var params = {};
			params.skusalno = this.skuSalNo;
			params.storeId = this.storeId;
			this.ebigRequest('/product/details', params, true).then((data) => {
                this.goodMes = data;
                var images = [];
                if (this.goodMes.imagePath != '' && this.goodMes.imagePath != null && this.goodMes.imagePath != undefined) { // 判断是否存在货品默认图片
                    images.push(this.goodMes.imagePath);
                }
                if (this.goodMes.goodsImgs != '' && this.goodMes.goodsImgs != null && this.goodMes.goodsImgs != undefined) {
                    for (var k = 0; k < this.goodMes.goodsImgs.length; k++) {
                        if (this.goodMes.goodsImgs[k] != this.goodMes.imagePath) {
                            images.push(this.goodMes.goodsImgs[k]);
                        }
                    };
                }
                if (images.length == 0) {
                    images.push('img/common/no_img.jpg')
                }
                this.goodsimgs = images;
            });
        },
        getShareActDtl: function() { //获取分享活动详情
			var params = {};
            params.promotionId = this.promotionId;
            this.ebigRequest('/share/getSharePromotioinById', params, true).then((data) => {
                this.shareAct = data;
			});
        },
        getShareMan: function() { //获取登录人信息
			var obj = {};
            obj.consignorId = Common.get('_shopConsignorId_');
            Common.postSrv1(_base + '/member-center/index', obj, data => {
				// console.log(data.data)
				if(data.success){
					this.memberInfo = data.data;
				}
			},true);
        },
        shareActCon(item){ //分享活动主内容
            var html = '';
            if(item.contentType == 5 || item.contentType == '5'){
                html += '<i style="font-size: 24px; font-style: normal; font-weight: 700;">' + item.content + '</i>积分';
            }else if(item.contentType == 8 || item.contentType == '8'){
                var coupon = item.couponCfgDTO;
                if (coupon.couponContentType == 1 || coupon.couponContentType == 7) {
                    html += '￥<i style="font-size: 24px; font-style: normal; font-weight: 700;">' + coupon.couponContent + '</i>';
                } else if (coupon.couponContentType == 2) {
                    html += '<i style="font-size: 24px; font-style: normal; font-weight: 700;">' + Math.round(coupon.couponContent * 100) / 10  + '</i>';
                }else if(coupon.couponContentType == 3){
                    html += '包邮';
                } else if (coupon.couponContentType == 4 || coupon.couponContentType == 5) {
                    html += '<i style="font-size: 24px; font-style: normal; font-weight: 700;">' + coupon.couponContent  + '</i>';
                } else if (coupon.couponContentType == 6) {
                    html += '兑换';
                }
                if (coupon.couponContentType == 2) {
                    html += '折';
                } else if (coupon.couponContentType == 4) {
                    html += '倍';
                } else if (coupon.couponContentType == 5) {
                    html += '积分';
                };
            }
            return html;
        },
        shareActDtl(item){ //分享活动主详情
            var html = '获得';
            if(item.contentType == 5 || item.contentType == '5'){
                html += '<b style="font-size: 18px; font-weight: 700; color: #dd393d;">' + item.content + '</b>积分';
            }else if(item.contentType == 8 || item.contentType == '8'){
                var coupon = item.couponCfgDTO;
                if (coupon.couponContentType == 1 || coupon.couponContentType == 7) {
                    html += '￥<b style="font-size: 18px; font-weight: 700; color: #dd393d;">' + coupon.couponContent + '</b>';
                } else if (coupon.couponContentType == 2) {
                    html += '<b style="font-size: 18px; font-weight: 700; color: #dd393d;">' + Math.round(coupon.couponContent * 100) / 10  + '</b>';
                }else if(coupon.couponContentType == 3){
                    html += coupon.couponContent + '张';
                    html += '包邮券';
                } else if (coupon.couponContentType == 4 || coupon.couponContentType == 5) {
                    html += '<b style="font-size: 18px; font-weight: 700; color: #dd393d;">' + coupon.couponContent  + '</b>';
                } else if (coupon.couponContentType == 6) {
                    html += coupon.couponContent + '张';
                    html += '兑换券';
                }
                if (coupon.couponContentType == 2) {
                    html += '折';
                } else if (coupon.couponContentType == 4) {
                    html += '倍';
                } else if (coupon.couponContentType == 5) {
                    html += '积分';
                };
            }
            return html;
        },
        typeFilter: function(obj) {
            let couponContentType = obj ? obj.couponContentType : '';
            if (couponContentType == 1 || couponContentType == 7) {
                return '代金券';
            } else if (couponContentType == 2) {
                return '折扣券';
            } else if (couponContentType == 3) {
                return '包邮券';
            } else if (couponContentType == 4 || couponContentType == 5) {
                return '积分券';
            } else if (couponContentType == 6) {
                return '兑换券';
            };
        }
    },
};
</script>

<style lang="scss">
page, .page {
    position: relative;
    width: 100%;
    height: 100%;

    .banner_wrap {
        width: 100%;
        height: 560rpx;
        position: relative;

        .banner_bg {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 560rpx;
        }
        .act_des {
            width: 100%;
            position: absolute;
            bottom: 90rpx;
            text-align: center;
            font-size: 32rpx;
            color: #EEC2AB;
        }
        .act_time {
            width: 100%;
            position: absolute;
            bottom: 48rpx;
            text-align: center;
            font-size: 24rpx;
            color: #EEC2AB;
        }
    }
    .act_con_wrap {
        padding: 20rpx;
        box-sizing: border-box;
        overflow: hidden;

        .act_con {
            border-radius: 20rpx;
            padding: 40rpx;
            box-sizing: border-box;

            .mod_type {
                padding: 20rpx;
                box-sizing: border-box;
                border-radius: 10rpx;
                background-color: #FFF5F2;

                .type_img {
                    min-width: 120rpx;
                    height: 120rpx;
                    line-height: 120rpx;
                    text-align: center;
                    font-size: 26rpx;
                    border-radius: 10rpx;
                    border: 1px solid #DD393D;
                    color: #FFFFFF;
                    background: #DD393D;

                    i {
                        font-size: 48rpx;
                        font-weight: 700;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                        display: block;
                        border-radius: 10rpx;
                    }
                }
                .type_con {
                    line-height: 40rpx;
                    font-size: 24rpx;
                    padding-left: 20rpx;
                    box-sizing: border-box;
                    color: #E88D89;

                    b {
                        font-size: 36rpx;
                        font-weight: 700;
                        color: #DD393D;
                    }
                }
            }
            .mod_to_share {
                margin-top: 40rpx;
                padding: 20rpx;
                box-sizing: border-box;
                border-radius: 50rpx;
                text-align: center;
                color: #E4B59D;
                background-color: #DE373E;
            }
        }
        .get_act_wrap {
            margin-top: 40rpx;
            border-radius: 20rpx;
            padding: 40rpx;
            box-sizing: border-box;

            .tit {
                height: 80rpx;
                font-weight: 700;

                .get_act_num {
                    font-size: 26rpx;
                    text-align: right;

                    span {
                        color: #DE373E;
                    }
                }
            }
            .get_act_list {
                margin-bottom: 40rpx;

                .get_act_item {
                    margin-top: 20rpx;
                    padding: 20rpx;
                    box-sizing: border-box;
                    border-radius: 10rpx;
                    background-color: #FFF5F2;

                    .item_img {
                        min-width: 120rpx;
                        height: 120rpx;
                        line-height: 120rpx;
                        text-align: center;
                        font-size: 26rpx;
                        border-radius: 10rpx;
                        border: 1px solid #DD393D;
                        color: #FFFFFF;
                        background: #DD393D;

                        i {
                            font-size: 48rpx;
                            font-weight: 700;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                            display: block;
                            border-radius: 5px;
                        }
                    }
                    .item_con {
                        line-height: 40rpx;
                        font-size: 24rpx;
                        padding-left: 20rpx;
                        box-sizing: border-box;
                        color: #E88D89;

                        b {
                            font-size: 36rpx;
                            font-weight: 700;
                            color: #DD393D;
                        }
                    }
                }
                .get_act_item:first-child {
                    margin-top: 0;
                }
            }
        }
    }
    .no_reword {
        text-align: center;
        line-height: 120rpx;
        font-size: 28rpx;
    }
}

</style>