<template>
    <view id="page" style="width: 100%;">
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="我的导购员"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="main-wrap">
            <!-- search -- start -->
            <view class="search-wrap bg_white">
                <view class="mod-input border_common">
                    <input class="input" v-model="keyWord" type="text" placeholder="请输入导购员信息等关键字" @confirm="searchData">
                    <span class="iconfont icon-search" @click="searchData"></span>
                </view>
            </view>
            <!-- search -- end -->
            <!-- manNum -- start -->
            <view class="has-man font_color_666 tc">成员<span class="num">({{ manList.length }})</span></view>
            <!-- manNum -- end -->
            <!-- content -- start -->
            <view class="content-wrap">
                <uni-pulldown-refresh
                    ref="uniPulldownRefresh"
                    id="pullContent"
                    :top="170"
                    :absolute="170"
                    @refresh="onPulldownReresh"
                >
                    <view class="man-list" v-if="manList.length > 0">
                        <view class="man-item bg_white uni-flex" v-for="man in manList" :key="man.distributorId" @click="toDetail(man)">
                            <view class="man-img">
                                <image class="img" lazy-load="true" mode="aspectFit" :src="man.headImgUrl ? man.headImgUrl : '../../static/image/user/user_noimg.jpg'"></image>
                            </view>
                            <view class="man-info uni-flex-1">
                                <view class="man-name wrap-2 font_color_333">{{ man.distributorName }}</view>
                                <view class="man-price-num uni-flex">
                                    <view class="man-price-wrap uni-flex-1">
                                        <span class="man-price font_color_999">帮赚积分：<span class="price">{{ man.helpGetCommission }}</span></span>
                                    </view>
                                    <view class="man-num-wrap tr uni-flex-1">
                                        <span class="man-num font_color_999">导购员：<span class="num">{{ man.subDistributorNum != '' ? man.subDistributorNum : 0 }}</span>个</span>
                                    </view>
                                </view>
                                <view class="man-rank wrap font_color_999">{{ man.distributorLevelName }}</view>
                                <view class="man-time wrap font_color_999">邀请时间：{{ man.joinDate }}</view>
                            </view>
                        </view>
                    </view>
                    <uni-load-more :status="status" :content-text="contentText" />
                </uni-pulldown-refresh>
            </view>
            <!-- content -- end -->
        </view>
    </view>
</template>

<script>
export default {
    components:{
        
    },
    data() {
        return {
            keyWord: '', //搜索关键字
            pageNo: 1,
            pageSize: 6,
            manList: [],
            reload: false,
            statusColor: "#ccc",
            status: "more",
            today:'',
            contentText: {
                contentdown: "上拉加载更多",
                contentrefresh: "正在加载...",
                contentnomore: "—— 我也是有底线的 ——"
            },
        }
    },
    onLoad(options) {
        if(options.today){
            this.today = options.today
            uni.setNavigationBarTitle({
                title:'今日新增导购员'
            })
        }
        this.getManList('add');
    },
    onShow() {
    },
    onReachBottom() {
        if(this.status != 'noMore' && this.status != 'loading'){
            //上滑加载
            this.getManList("add");
        }
    },
    methods: { 
        searchData: function() { //搜索
			this.getManList('refresh');
        },
        toDetail(item){
            this.toPage('guideManDetail','distributorId=' + item.distributorId)
            this.setStor('guideManDetail',item)
        },
        getManList: function(type) { //获取我的导购员列表数据
            if(this.reload){
                return;
            }
            this.status = "loading";
            if (type === "refresh") {
                this.pageNo = 1;
                this.reload = true;
            }
            let obj = {};
            obj.pageNo = this.pageNo;
            obj.keyword = this.keyWord;
            obj.pageSize = this.pageSize;
            obj.distributorId = this.getStor("isDistributorId");
            if(this.today){
                obj.startTime = this.getDay(0) +' 00:00:00' 
                obj.endTime = this.getDay(0) +  ' 23:59:59'
            }
            this.doRequest("/distributorcenter/distributor/getsublist", obj, true, 'get').then((res) => {
                if(type == 'refresh'){
                    uni.pageScrollTo({
                        scrollTop: 0,
                        duration: 100
                    });
                    this.manList = [];
                }
                
                // if(res.length < this.pageSize){
                //     this.status = "noMore";
                // }else{
                //     this.status = "more";
                // }
                this.manList = [...this.manList,...res];
                this.status = "noMore";
                if (type === "refresh") {
                    this.reload = false;
                    this.$refs.uniPulldownRefresh &&
                    this.$refs.uniPulldownRefresh.endPulldownRefresh();
                }
                this.pageNo = this.pageNo + 1;
            }).catch(err => {
                if (type === "refresh") {
                    this.reload = false;
                    this.manList = [];
                    this.$refs.uniPulldownRefresh &&
                    this.$refs.uniPulldownRefresh.endPulldownRefresh();
                }
                if(this.pageNo == 1){
                    this.status = "noMore";
                    this.manList = [];
                }else{
                    this.status = "more";
                    this.pageNo = this.pageNo - 1;
                }
            })
        },
        getDay(day){ 
            var today = new Date();  
            var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
            today.setTime(targetday_milliseconds); //注意，这行是关键代码
            var tYear = today.getFullYear();  
            var tMonth = today.getMonth();  
            var tDate = today.getDate();  
            tMonth = this.doHandleMonth(tMonth + 1);  
            tDate = this.doHandleMonth(tDate);  
            return tYear+"-"+tMonth+"-"+tDate;
        },
        doHandleMonth(month){  
            var m = month;  
            if(month.toString().length == 1){  
                m = "0" + month;  
            }  
            return m;  
        },
        // 等待加载
        loadMore() {
            this.status = "more";
            this.getManList("add");
        },
        //下拉刷新
        onPulldownReresh() {
            this.getManList("refresh");
        },
        toPage: function(url, item) { //跳转分销内页面
            this.goUrl(url, 'distribution', item);
        }
    }
}
</script>

<style lang="scss">
page {
    width: 100%;
    background-color: #EFEFEF;
}
.main-wrap {
    width: 100%;
    position: relative;
    // search
    .search-wrap {
        width: 100%;
        height: 104rpx;
        padding: 20rpx 40rpx;
        box-sizing: border-box;
        position: fixed;
        /* #ifdef MP-WEIXIN */
        top: 0;
        /* #endif */
        /* #ifdef H5 */
        top: 44px;
        /* #endif */
        right: 0;
        left: 0;
        z-index: 3;
        margin: auto;
        .mod-input {
            width: 100%;
            height: 64rpx;
            line-height: 60rpx;
            border: 1rpx solid;
            border-radius: 20rpx;
            box-sizing: border-box;
            position: relative;
            .input {
                width: 100%;
                height: 100%;
                line-height: 60rpx;
                padding: 0 80rpx 0 16rpx;
                box-sizing: border-box;
                font-size: 26rpx;
            }
            .icon-search {
                width: 80rpx;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: 1;
                margin: auto;
                font-size: 18px;
                text-align: center;
            }
        }
    }
    // manNum
    .has-man {
        width: 100%;
        height: 72rpx;
        line-height: 72rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        background: #F2F2F2;
        position: fixed;
        /* #ifdef MP-WEIXIN */
        top: 104rpx;
        /* #endif */
        /* #ifdef H5 */
        top: 96px;
        /* #endif */
        right: 0;
        left: 0;
        z-index: 3;
        margin: auto;
        .num {
            color: #F7931D;
        }
    }
    // content
    .content-wrap {
        width: 100%;
        box-sizing: border-box;
        .man-list {
            padding: 0 20rpx;
            box-sizing: border-box;
            .man-item {
                margin-bottom: 20rpx;
                padding: 20rpx;
                border-radius: 10rpx;
                box-sizing: border-box;
                .man-img {
                    width: 200rpx;
                    // height: 200rpx;
                    padding: 10rpx;
                    border: 2rpx solid #F2F2F2;
                    box-sizing: border-box;
                    .img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .man-info {
                    padding: 0 0 0 20rpx;
                    box-sizing: border-box;
                    .man-name {
                        line-height: 48rpx;
                        font-size: 32rpx;
                    }
                    .man-price-num {
                        line-height: 48rpx;
                        .man-price-wrap {
                            .price {
                                color: #F7931D;
                            }
                        }
                        .man-num-wrap {
                            .num {
                                color: #F7931D;
                            }
                        }
                    }
                    .man-rank {
                        line-height: 48rpx;
                    }
                    .man-time {
                        line-height: 48rpx;
                    }
                }
            }
        }
        .no-more {
            width: 100%;
            height: 200rpx;
            line-height: 200rpx;
            box-sizing: border-box;
            text-align: center;
            color: #999999;
        }
    }
}

</style>