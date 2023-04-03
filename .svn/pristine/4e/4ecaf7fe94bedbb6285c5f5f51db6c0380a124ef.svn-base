<template>
    <view class="promotionDetail">
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="收益明细"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="nav uni-flex bg_white">
            <view class="uni-flex-1" :class="activeNav==0 ? 'activeNav font_color_common border_common_bottom' : ''" @click="toggleNav(0)">全部</view>
            <view class="uni-flex-1" :class="activeNav==1 ? 'activeNav font_color_common border_common_bottom' : ''" @click="toggleNav(1)">收入</view>
            <view class="uni-flex-1" :class="activeNav==2 ? 'activeNav font_color_common border_common_bottom' : ''" @click="toggleNav(2)">支出</view>
        </view>
        <view class="poContItem uni-flex bg_white">
                <view class="poCont-wrap uni-flex border_common">
                    <picker class="item-input uni-flex-1" @change="chioceDate" :value="selectIndex" :range="selectDate">
                        <view class="font_color_common">{{ selectDate[selectIndex] }}</view>
                    </picker>
                    <view class="iconfont icon-bottom selectIcon font_color_common"></view>
                </view>
        </view>
        <view>
            <uni-pulldown-refresh
                ref="uniPulldownRefresh"
                id="pullContent"
                :top="170"
                :absolute="170"
                @refresh="onPulldownReresh"
            >
                <view class="promotionItem bg_white uni-flex" v-for="(item,index) in DtlList" :key="index">
                    <view class="uni-flex-1">
                        <view class="title uni-flex">
                            <span class="uni-flex-1">{{item.commissionType==2 ? '佣金提现' : '顾客：'}}<span class="font_org" v-show="item.commissionType==1">{{item.customName}}</span></span>
                            <span class="font_color_999">{{item.inputDate}}</span>
                        </view>
                        <view class="uni-flex">
                            <span class="uni-flex-1 font_color_999">{{item.commissionType==1 ? '订单通过售后维权期，获得佣金' : item.withdrawStatus==3?item.reason:'佣金提现至账户余额'}}</span>
                            <span v-if="item.withdrawStatus==3" :class="item.commissionType==2 ? 'font_gree' : 'font_red'">审批不通过</span>
                            <span v-else :class="item.commissionType==2 ? 'font_gree' : 'font_red'">{{item.commissionType==2 ? '-' : '+'}}￥{{parseFloat(item.commission)}}</span>
                        </view>
                    </view>
                </view>
                <uni-load-more :status="status" :content-text="contentText" />
            </uni-pulldown-refresh>
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return{
            activeNav: 0,
            selectDate: ['全部日期','今天','近三天','近七天'],
            selectIndex: 0,
            DtlList:[],

            startDate: '',
            endDate: '',

            pageNo: 1,
            pageSize: 10,

            reload: false,
            statusColor: "#ccc",
            status: "more",
            contentText: {
                contentdown: "上拉加载更多",
                contentrefresh: "正在加载...",
                contentnomore: "—— 我也是有底线的 ——"
            },
        }
    },
    onReachBottom() {
        if(this.status != 'noMore' && this.status != 'loading'){
            //上滑加载
            this.getDtlList("add");
        }
    },
    methods:{
        toggleNav(index){ //状态切换
            this.activeNav = index;
            this.selectIndex = 0
            this.startDate = ''
            this.endDate = ''
            this.getDtlList('refresh')
        },
        chioceDate(e){ //时间切换
            this.selectIndex = e.detail.value
            if(e.detail.value == 0){
                this.startDate = ''
                this.endDate = ''
            }
            if(e.detail.value == 1){
                this.startDate = this.getDay(0) + ' 00:00:00'
                this.endDate = this.getDay(0) + ' 23:59:59'
            }
            if(e.detail.value == 2){
                this.endDate = this.getDay(0)  + ' 23:59:59'
                this.startDate = this.getDay(-2) + ' 00:00:00'
            }
            if(e.detail.value == 3){
                this.endDate = this.getDay(0) + ' 23:59:59'
                this.startDate = this.getDay(-6) + ' 00:00:00'
            }
            this.getDtlList('refresh')
        },
        getDtlList: function(type) { //获取佣金明细列表数据
            if(this.reload){
                return;
            }
            this.status = "loading";
            if (type === "refresh") {
                this.pageNo = 1;
                this.reload = true;
            }
            let obj = {};
            obj.status = this.activeNav; //1：全部 2：收入 3：支出
            obj.startTime = this.startDate;
            obj.endTime = this.endDate;
            obj.pageNo = this.pageNo;
            obj.pageSize = this.pageSize;
            this.ebigRequest("/distributor/getMyCommissionLists", obj, true).then((res) => {
                if(type == 'refresh'){
                    uni.pageScrollTo({
                        scrollTop: 0,
                        duration: 100
                    });
                    this.DtlList = [];
                }
                
                if(res.length < this.pageSize){
                    this.status = "noMore";
                }else{
                    this.status = "more";
                }
                this.DtlList = [...this.DtlList,...res]
                if (type === "refresh") {
                    this.reload = false;
                    this.$refs.uniPulldownRefresh &&
                    this.$refs.uniPulldownRefresh.endPulldownRefresh();
                }
                this.pageNo = this.pageNo + 1;
            }).catch(err => {
                if (type === "refresh") {
                    this.reload = false;
                    this.DtlList = [];
                    this.$refs.uniPulldownRefresh &&
                    this.$refs.uniPulldownRefresh.endPulldownRefresh();
                }
                if(this.pageNo == 1){
                    this.status = "noMore";
                    this.DtlList = [];
                }else{
                    this.status = "more";
                    this.pageNo = this.pageNo - 1;
                }
            })
        },
        // 等待加载
        loadMore() {
            this.status = "more";
            this.getDtlList("add");
        },
        //下拉刷新
        onPulldownReresh() {
            this.getDtlList("refresh");
        },
        // 日期转换
        getDay(day){ 
            var today = new Date();  
            var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
            today.setTime(targetday_milliseconds); //注意，这行是关键代码
            var tYear = today.getFullYear();  
            var tMonth = today.getMonth();  
            var tDate = today.getDate();  
            tMonth = this.doHandleMonth(tMonth + 1);  
            tDate = this.doHandleMonth(tDate);  
            return tYear+"-"+tMonth+"-"+tDate
        },
        doHandleMonth(month){  
            var m = month;  
            if(month.toString().length == 1){  
                m = "0" + month;  
            }  
            return m;  
        },
    },
    filters:{
        toFixed: (data) => {
            return data.toFixed(2);
        },
    },
    onLoad(){
        this.getDtlList('add')
    }
}
</script>

<style>
page {
    padding-top: 80rpx;
}
.nav {
    height: 80rpx;
    text-align: center;
    position: fixed;
    top: 0;
    /* #ifdef H5 */
    top: 88rpx;
    /* #endif */
    left: 0;
    right: 0;
    z-index: 99;
    line-height: 80rpx;
}
.activeNav {
    color: #EE231E;
    border-bottom: 4rpx solid;
}
.poContItem {
    position: fixed;
    top: 80rpx;
    /* #ifdef H5 */
    top: 168rpx;
    /* #endif */
    right: 0;
    left: 0;
    z-index: 99;
    padding: 20rpx 30rpx;
}
.poCont-wrap {
    height: 50rpx;
    line-height: 50rpx;
    border: 2rpx solid;
    width: 180rpx;
    border-radius: 6rpx;
    padding: 0 10rpx;
    text-align: center;
}
.selectIcon {
    font-size: 30rpx;
}
.promotionItem {
    border-bottom: 2rpx solid #E4E4E4;
    padding: 20px 20rpx;
    align-items: center;
}
.goIcon {
    width: 60rpx;
    text-align: right;
    transform: scaleY(2);
    font-size: 36rpx;
}
.title {
    margin-bottom: 20rpx;
}
.font_gree {
    color: #5FAC49;
}
.font_red {
    color: #FF4B4C;
}
.font_org {
    color: #F7931D;
}
.noMore {
    text-align: center;
    font-size: 30rpx;
    color: #777777;
    font-weight: 600;
    padding: 20rpx;
}













</style>