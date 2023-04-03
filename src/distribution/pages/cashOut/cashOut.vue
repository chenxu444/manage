<template>
    <view id="page" style="width: 100%;height: 100%;">
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="佣金提现"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="main-wrap">
            <!-- header -- start -->
            <view class="cash-header bg_common font_color_white tc">
                <view class="tit">可提现佣金(元)</view>
                <view class="con">{{ nowMoney }}</view>
            </view>
            <!-- header -- end -->
            <!-- btn -- start -->
            <view class="btn-wrap">
                <view class="btn-cash tc bg_common font_color_white" @click="cashMoney">提现</view>
            </view>
            <!-- btn -- end -->
            <!-- content -- start -->
            <view class="content-wrap">
                <view class="main-wrap">
                    <view class="tit-time bg_white uni-flex">
                        <view class="tit uni-flex-1">提现记录</view>
                        <picker @change="timePickerChange" :value="(timeIndex)" :range="timeTo">
                            <view class="time-change bg_common_light font_color_common border_common">
                                {{ timeTo[timeIndex] }}
                                <span class="iconfont icon-bottom font_color_common"></span>
                            </view>
                        </picker>
                    </view>
                    <view class="cash-list" v-if="cashList.length > 0">
                        <scroll-view scroll-y="true" show-scrollbar="false" style="width: 100%;height: 100%;" @scrolltolower="scrollBottom">
                            <view class="cash-item bg_white" v-for="(cash,index) in cashList" :key="index">
                                <view class="mod-1 uni-flex">
                                    <view class="mod-1-tit uni-flex-1">佣金提现</view>
                                    <view class="mod-1-con tr uni-flex-1 font_color_999">{{ cash.withdrawDate }}</view>
                                </view>
                                <view class="mod-2 uni-flex">
                                    <view class="mod-2-tit uni-flex-1 font_color_999">{{cash.withdrawStatus==1?'佣金提现中':cash.withdrawStatus==2 ? '佣金提现至账户余额' : cash.reason}}</view>
                                    <view class="mod-2-con tr uni-flex-1" v-if="cash.withdrawStatus==3">审批未通过</view>
                                    <view class="mod-2-con tr uni-flex-1" v-else>- ￥{{ cash.withDrawMoney }}</view>
                                </view>
                            </view>
                            <!-- <view class="cash-item bg_white">
                                <view class="mod-1 uni-flex">
                                    <view class="mod-1-tit uni-flex-1">佣金提现</view>
                                    <view class="mod-1-con tr uni-flex-1 font_color_999">2020-11-11</view>
                                </view>
                                <view class="mod-2 uni-flex">
                                    <view class="mod-2-tit uni-flex-1 font_color_999">佣金提现至账户余额</view>
                                    <view class="mod-2-con tr uni-flex-1">- ￥100.00</view>
                                </view>
                            </view> -->
                        </scroll-view>
                    </view>
                    <view class="no-more" v-else>暂无提现记录~</view>
                </view>
            </view>
            <!-- content -- end -->
        </view>
        <!-- 输入邀请码弹窗 -- start -->
        <uni-popup ref="popup" :animation="true">
            <view class="dia-wrap bg_white">
                <view class="dia-input">
                    <input class="input" type="text" v-model="bankMan" placeholder="请输入开户人名称">
                </view>
                <view class="dia-input">
                    <input class="input" type="text" v-model="bankCartNo" @change="cartNoChange" placeholder="请输入银行卡号">
                </view>
                <view class="dia-input">
                    <input class="input" type="text" v-model="bankName" placeholder="请输入银行卡机构">
                </view>
                <view class="btn-sure tc bg_common font_color_white" @click="cashSure">确定提现</view>
            </view>
        </uni-popup>
        <!-- 输入邀请码弹窗 -- end -->
    </view>
</template>

<script>
import BIN from "bankcardinfo"
export default {
    components:{
        
    },
    data() {
        return {
            nowMoney: '0.00', //可提现金额

            timeIndex: 0,
            timeTo:['全部日期','今日','近三日','近七日'],
            startDate: '',
            endDate: '',

            pageNo: 1,
            pageSize: 10,
            cashList: [],
            noMoreFlag: false, //是否还有更多数据

            bankMan: '', //开户人
            bankCartNo: '', //银行卡号
            bankName: '', //银行卡机构
            bankNameLoading: false
        }
    },
    onLoad(option) {
        this.nowMoney = option.nowMoney ? option.nowMoney : '0.00';
        console.log(this.nowMoney);
    },
    onShow() {
        this.getCashList(true);
        this.bankMan = this.getStor('_bankMan_');
        this.bankCartNo = this.getStor('_bankCartNo_');
        this.bankName = this.getStor('_bankName_');
        this.$forceUpdate();
    },
    methods: { 
        getCashList: function(first) { //获取提现历史列表
            let obj = {};
            obj.startTime = this.startDate + (this.startDate ? ' 00:00:00' : '');
            obj.endTime = this.endDate + (this.endDate ? ' 23:59:59' : '');
            obj.pageNo = this.pageNo;
            obj.pageSize = this.pageSize;
            this.ebigRequest("/distributor/getMyWithdrawList", obj, true).then((data) => {
                // console.log(data)
                if(data){
                    if(data.length == this.pageSize){
                        this.pageNo++;
                    }else{
                        this.noMoreFlag = true;
                    }
                    if(first){
                        this.cashList = data;
                    }else{
                        this.cashList = [...this.cashList,...data];
                    }
                }
            }).catch(err => {

            })
        },
        scrollBottom: function() { //加载
            if(!this.noMoreFlag){
                this.getCashList();
            }
        },
        cashMoney: function() { //提现按钮点击
            this.$refs.popup.open();
        },
        cartNoChange: function() { //银行卡号输入
            if(!this.bankNameLoading){
                this.getBankName(this.bankCartNo.replace(/\s/g,""));
            }
        },
        getBankName: function(bankNo) { //获取银行机构
            this.bankNameLoading = true;
            BIN.getBankBin(bankNo).then((data) => {
                this.bankNameLoading = false;
                this.bankName = data.bankName;
            }).catch(err => {
                this.bankNameLoading = false;
            })
        },
        cashSure: function() { //确定提现
            let validateBankCard = /^([1-9]{1})(\d{15}|\d{18})$/;
            if(!this.bankMan){
                uni.showToast({
                    title:'请输入开户人',
                    icon:'none'
                })
                return
            }
            if(!this.bankCartNo || !validateBankCard.test(this.bankCartNo.replace(/\s/g,""))){
                uni.showToast({
                    title:'请输入正确的银行卡号',
                    icon:'none'
                })
                return
            }
            if(!this.bankName){
                uni.showToast({
                    title:'请输入银行机构',
                    icon:'none'
                })
                return
            }
            let obj = {};
            obj.bankAccountName = this.bankMan; //开户人名称
            obj.bankCardNo = this.bankCartNo.trim(); //银联卡号
            obj.insititution = this.bankName; //银行卡机构
            this.ebigRequest("/distributor/doWithdraw", obj, true,"","",true,true).then((data) => {
                // console.log(data)
                if(data.code == 0){
                    this.setStor('_bankMan_', this.bankMan);
                    this.setStor('_bankCartNo_', this.bankCartNo);
                    this.setStor('_bankName_', this.bankName);
                    uni.showModal({
                        title:'温馨提示',
                        content:'提现成功,等待处理',
                        showCancel:false,
                        complete:res=>{
                            this.$refs.popup.close();
                            this.nowMoney = '0.00';
                            this.cashList = [];
                            this.pageNo = 1;
                            this.getCashList(true);
                        }
                    })
                }else{
                    uni.showModal({
                        title:'温馨提示',
                        content:data.errorMsg,
                        showCancel:false,
                        complete:res=>{
                        }
                    })
                }
            }).catch(err => {

            })
        },
        timePickerChange: function(e) { //时间区间选择
            this.timeIndex = e.detail.value;

            var now = new Date(); //当天
            var endD = now.getFullYear() + '-' + ((now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)) + '-' + now.getDate(); //当天日期
            var endT = now.getTime(); //当天时间戳
            if(e.detail.value == 0){ //全部日期
                this.startDate = '';
                this.endDate = '';
                this.cashList = [];
                this.pageNo = 1;
                this.getCashList(true);
                return;
            }else if(e.detail.value == 1){ //今日
                this.startDate = endD;
                this.endDate = endD;
                this.cashList = [];
                this.pageNo = 1;
                this.getCashList(true);
                return;
            }else if(e.detail.value == 2){ //近三日
                var staT = endT + 1000 * 60 * 60 * 24 * (-3);
            }else if(e.detail.value == 3){ //近七日
                var staT = endT + 1000 * 60 * 60 * 24 * (-7);
            }
            var date = new Date();
            date.setTime(staT);
            var staD = date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + date.getDate();
            this.startDate = staD;
            this.endDate = endD;

            this.cashList = [];
            this.pageNo = 1;
            this.getCashList(true);
        }
    }
}
</script>

<style lang="scss">
page {
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
}
.main-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    // header
    .cash-header {
        width: 100%;
        height: 210rpx;
        padding: 20rpx 0 10rpx;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        margin: auto;
        .tit {
            line-height: 60rpx;
        }
        .con {
            line-height: 120rpx;
            font-size: 80rpx;
        }
    }
    // btn
    .btn-wrap {
        width: 100%;
        height: 140rpx;
        padding: 30rpx;
        box-sizing: border-box;
        position: absolute;
        top: 210rpx;
        right: 0;
        left: 0;
        z-index: 1;
        margin: auto;
        .btn-cash {
            line-height: 80rpx;
            border-radius: 10rpx;
            font-size: 32rpx;
        }
    }
    // content
    .content-wrap {
        width: 100%;
        height: 100%;
        padding-top: 350rpx;
        box-sizing: border-box;
        .main-wrap {
            width: 100%;
            height: 100%;
            position: relative;
            .tit-time {
                width: 100%;
                height: 90rpx;
                line-height: 50rpx;
                padding: 20rpx 30rpx;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                z-index: 1;
                margin: auto;
                .time-change {
                    line-height: 46rpx;
                    padding: 0 16rpx;
                    box-sizing: border-box;
                    border-radius: 14rpx;
                    border: 2rpx solid;
                    font-size: 26rpx;
                }
            }
            .cash-list {
                width: 100%;
                height: 100%;
                padding-top: 90rpx;
                box-sizing: border-box;
                .cash-item {
                    line-height: 56rpx;
                    padding: 30rpx;
                    border-top: 2rpx solid #CCCCCC;
                    box-sizing: border-box;
                    font-size: 30rpx;
                    .mod-2 {
                        .mod-2-con {
                            color: #5FAC49;
                        }
                    }
                }
            }
            .no-more {
                width: 100%;
                height: 100%;
                padding-top: 200rpx;
                box-sizing: border-box;
                text-align: center;
                color: #999999;
            }
        }
    }
}
.dia-wrap {
    width: 560rpx;
    padding: 20rpx 40rpx;
    box-sizing: border-box;
    .tit {
        line-height: 64rpx;
    }
    .dia-input {
        margin-top: 10rpx;
        height: 72rpx;
        border: 2rpx solid #CCCCCC;
        box-sizing: border-box;
        .input {
            width: 100%;
            height: 100%;
            padding: 0 20rpx;
            box-sizing: border-box;
        }
    }
    .btn-sure {
        line-height: 64rpx;
        margin-top: 30rpx;
    }
}

</style>