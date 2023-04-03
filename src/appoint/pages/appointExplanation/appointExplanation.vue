<template>
    <view id="page" style="width: 100%;">
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="预约说明"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="wrap">
            <!-- content -- start -->
            <view class="content-wrap">
                <scroll-view scroll-y="true" show-scrollbar="false" style="height: 100%;">
                    <view class="con-tit">{{ explain.title }}</view>
                    <view class="con">
                        <view class="con-des">{{ explain.des }}</view>
                        <view class="rule-tit">{{ explain.ruleTit }}</view>
                        <view class="rule-list">
                            <view class="rule-item" v-for="item in explain.list">{{ item.txt }}</view>
                        </view>
                    </view>
                    <view class="con-supper">{{ explain.support }}</view>
                </scroll-view>
            </view>
            <!-- content -- end -->
            <!-- bottomTab -- start -->
            <view class="bTab-wrap bg_white font_color_666">
                <view class="agree-check" @click="confirmRead = !confirmRead;">
                    <icon class="check-icon" type="success" size="19" :color="confirmRead ? '#007BC8' : '#ccc'" />
                    <span>我已阅读以上说明并同意</span>
                </view>
                <view class="agree-btn tc bg_common font_color_white" @click="openAppoint" :style="confirmRead ? '' : 'opacity: 0.4;'">我要预约购买</view>
            </view>
            <!-- bottomTab -- start -->
        </view>
    </view>
</template>

<script>
export default {
    components:{},
    data() {
        return {
            consignorId: '',
            confirmRead: false,
            emctype: '',
            explain: {
                title: '关于疫情物资预约购买的说明',
                des: '为方便用户购买疫情物资，我司提供线上预约、摇号、抽签、配送服务或到店购买服务。平台每日投放量根据当天产量和库存情况调整。',
                ruleTit: '预约摇号购买规则如下：',
                list: [
                    {txt:'1、用户可凭身份证进行预约登记。'},
                    {txt:'2、预约分为“在线支付，送货上门”和“到店支付，到店自提”，预约时只能选择其中一种。如果选择“到店支付，到店自提”，须选择具体的自取门店。'},
                    {txt:'3、每人每次预约只能购买某种商品的某一类型，如购买口罩选择普通口罩或N95口罩；购买酒精选择100ml/瓶或500ml/瓶。'},
                    {txt:'4、预约登记后，预约期间无需重复提交预约。系统会根据一定规则进行摇号分配，预约结果将会以消息推送给您，请注意查收。'},
                    {txt:'5、如果成功中签“在线支付，送货上门”的，将会出现线上支付按钮，请按照提示完成付款。订单将通过快递进行配送。超时未支付的，订单将自动失效。如果成功中签“到店支付，到店自提”的，将出现预约时登记的门店名称、地址、预约号和购买有效期的界面。您可在有效期内，凭上述信息和预约登记时的有效证件到预约时选择的门店办理支付自取。'},
                    {txt:'6、如果未中签的，需要重新提交预约登记。'},
                    {txt:'7、由于疫情物资采购价格存在差异和市场波动，将选取一定时间内的采购平均价格合理加成后销售。'},
                    {txt:'8、对于任何违反规则、存在作弊行为的用户，将取消预约资格，情节严重的，将依法追究法律责任'}
                ],
                support: '疫情物资预约购买服务由以大云链提供技术支持'
            },
        }
    },
    onLoad(option) {
        this.emctype = option.emctype;
    },
    onShow() {
        this.consignorId = this.getStor('_defaultConsignorId_');
    },
    methods: {
        // 跳转预约
        openAppoint() {
            if(this.confirmRead){
                var obj = {};
                obj.consignorId = this.consignorId; //商户ID，必填
                obj.emctype = this.emctype; //必填，1口罩、2酒精、3温度计、4消毒液
                this.ebigRequest("/preorder/precheck", obj).then((data) => {
                    if (data) {
                        if(data.check){
                            uni.redirectTo({
                                url: '/pages/appointMake/appointMake?emctype' + this.emctype
                            });
                        }
                    }
                }).catch(err => {
                    
                })
            }
        },
    }
}
</script>

<style lang="scss">
page {
    width: 100%;
    height: 100%;
    background-color: #EFEFEF;
}
.wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .content-wrap {
        width: 100%;
        height: 100%;
        padding-bottom: 220rpx;
        box-sizing: border-box;
        .con-tit {
            line-height: 72rpx;
            padding-top: 20rpx;
            box-sizing: border-box;
            font-size: 32rpx;
            text-align: center;
            color: #000000;
        }
        .con {
            line-height: 40rpx;
            padding: 10rpx 30rpx 20rpx;
            box-sizing: border-box;
            white-space: pre-line;
            font-size: 28rpx;
            color: #8F8F94;
        }
        .con-supper {
            padding-bottom: 20rpx;
            box-sizing: border-box;
            text-align: center;
            color: #5F5555;
        }
    }
    .bTab-wrap {
        width: 100%;
        height: 220rpx;
        padding: 20rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        position: fixed;
        bottom: 0;
        z-index: 3;
        .agree-check {
            height: 90rpx;
            line-height: 70rpx;
            padding-bottom: 20rpx;
            box-sizing: border-box;
            .check-icon {
                margin-right: 16rpx;
                vertical-align: middle;
                line-height: 16rpx;
            }
        }
        .agree-btn {
            width: 100%;
            height: 90rpx;
            line-height: 90rpx;
            font-size: 32rpx;
            border-radius: 10rpx;
        }
    }
}

</style>