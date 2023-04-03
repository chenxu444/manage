<template>
    <view class="information">
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="健康资讯"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="informationList">
            <uni-pulldown-refresh
                ref="uniPulldownRefresh"
                id="pullContent"
                :top="0"
                :absolute="0"
                @refresh="onPulldownReresh"
            >
                <view class="informationItem uni-flex bg_white" :key="index" v-for="(il, index) in informationList" @click="goDetails(il)">
                    <view class="informationCont uni-flex-1">
                        <view class="informationName wrap-2">{{il.newsTitle ? il.newsTitle : ''}}</view>
                        <view class="informationInfo wrap-2">地址：{{il.newsContent ? il.newsContent : ''}}</view>
                    </view>
                    <image :src="il.newsImg ? il.newsImg : '../../static/image/default/no_img.jpg'" :lazy-load="true" mode="widthFix" class="informationImg" />
                </view>
                <uni-load-more :status="status" :content-text="contentText" />
            </uni-pulldown-refresh>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            informationList: [],
			pageSize: 15,
			pageNo: 1,
            consignorId: '',
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
    onLoad(option) {
        this.consignorId = option.consignorId;
        this.initList("add");
    },
    onReachBottom() {
        if(this.status != 'noMore' && this.status != 'loading'){
            //上滑加载
            this.initList("add");
        }
    },
    methods: {
        initList(type){
            if(this.reload){
                return;
            }
            this.status = "loading";
            if (type === "refresh") {
                this.pageNo = 1;
                this.reload = true;
            }
            let obj = {};
            obj.pageSize = this.pageSize;
            obj.pageNo = this.pageNo;
            obj.consignorId = this.consignorId;
            this.ebigRequest("/news/list", obj, true, '', true, true).then((res) => {
                if(type == 'refresh'){
                    this.storesList = [];
                }
               
                if(res.length < this.pageSize){
                    this.status = "noMore";
                }else{
                    this.status = "more";
                }
                this.informationList = [...this.informationList, ...res];
                if (type === "refresh") {
                    this.reload = false;
                    this.$refs.uniPulldownRefresh &&
                    this.$refs.uniPulldownRefresh.endPulldownRefresh();
                }
                this.pageNo = this.pageNo + 1;
            }).catch(err => {
                if (type === "refresh") {
                    this.reload = false;
                    this.informationList = [];
                    this.$refs.uniPulldownRefresh &&
                    this.$refs.uniPulldownRefresh.endPulldownRefresh();
                }
                if(this.pageNo == 1){
                    this.status = "noMore";
                    this.informationList = [];
                }else{
                    this.status = "more";
                    this.pageNo = this.pageNo - 1;
                }
            });
        },
        // 等待加载
        loadMore() {
            this.status = "more";
            this.initList("add");
        },
        //下拉刷新
        onPulldownReresh() {
            this.initList("refresh");
        },
        // 跳转首页
        goDetails(item){
            this.goUrl('informationDetail', 'mine', 'newsId=' + item.newsId);
        }
    }
}
</script>

<style lang="scss">
page, .information {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #EFEFF4;

    /* 列表 start */
    .informationList {
        /* #ifdef MP-WEIXIN */
        padding: 0;
        /* #endif */
        /* #ifdef H5 */
        padding: 88rpx;
        /* #endif */

        .informationItem {
            padding: 30rpx;
            border-bottom: 1px solid #EEEEEE;

            .informationCont {
                .informationName {
                    max-height: 68rpx;
                    font-size: 30rpx;
                    font-weight: 700;
                    line-height: 34rpx;
                    color: #333333;
                }
                .informationInfo {
                    font-size: 26rpx;
                    line-height: 40rpx;
                    color: #888888;
                }
            }
            .informationImg {
                display: block;
                margin-left: 30rpx;
                width: 200rpx;
            }
        }
    }
    /* 门店列表 end */
}

</style>