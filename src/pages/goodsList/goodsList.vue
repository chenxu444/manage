<template>
    <view class="goods_sort">
        <contact></contact>
        <view style="position: relative; z-index: 9; height: 100%;">
            <view class="pageStore bg_common font_color_white uni-flex">
                <view class="uni-flex-1">
                    <i class="iconfont icon-shop"></i>{{ storeName }}
                </view>
            </view>
            <!-- 搜索 -->
            <view class="search-wrap bg_white uni-flex">
                <view class="s-input uni-flex-1" @click="goUrl('searchPage', '')">
                    <input type="text" placeholder="搜索关键字" v-model="queryWord" disabled />
                    <icon class="searchIcon" type="search" size="18" />
                </view>
                <view class="goodsCart" @click="goUrl('cart', '')">
                    <i class="iconfont icon-cart "></i>
                    <span class="gCartNum font_color_white bg_red" v-if="cartQty > 0">{{
                cartQty
              }}</span>
                </view>
            </view>
            <!-- 轮播 -- start -->
            <view class="swiper" :class="hideTop ? 'hideTop' : ''" v-if="swiper.length > 0">
                <swiper class="swiperCont" @change="swiperChange($event, 'banner')" autoplay circular>
                    <swiper-item v-for="(item,index) in swiper" :key="index">
                        <image :src="item.imgUrl" :lazy-load="true" class="swiper_img" @click="onClickBanner(item)" />
                    </swiper-item>
                </swiper>
                <view class="swiperDots">
                    <view class="sDotItem" :class="index == bannerCurrent ? 'active' : ''" v-for="(item, index) in swiper"></view>
                </view>
            </view>
            <!-- 轮播 -- end -->
            <!-- 内容区域 -->
            <view class="content uni-flex" :style="swiper.length == 0 ? 'height: calc(100% - 190rpx);' : ''">
                <!-- 左侧导航 -->
                <scroll-view class="left" scroll-y>
                    <view v-if="leftNav">
                        <view class="left_item" :class="
                    isActive == item.goodsTypeId
                      ? 'active_item border_common_left'
                      : ''
                  " v-for="item in leftNav" :key="item.goodsTypeId" @click="toggleNav(item.goodsTypeId, item.goodsTypeNo)">
                            {{ item.goodsTypeName }}
                        </view>
                    </view>
                </scroll-view>
                <!-- 右侧内容 -->
                <scroll-view class="uni-flex-1 bg_white" scroll-y :scroll-top="scrollTop" @scrolltolower="scrollBottom" @scroll="scroll">
                    <view class="right">
                        <view class="goodsList" v-if="goodsList.length > 0">
                            <view class="goodsItem" v-for="gl in goodsList">
                                <view class="goodsItemCont uni-flex" @click="
                        goUrl(
                          'detail',
                          '',
                          'skuSalNo=' +
                            gl.skuSalNo +
                            '&storeId=' +
                            gl.storeDTO.storeId +
                            '&consignorId=' +
                            gl.consignorId
                        )
                      ">
                                    <image class="goodsImg" lazy-load="true" mode="aspectFit" :src="
                          gl.imagePath != null
                            ? gl.imagePath +
                              '?x-oss-process=image/resize,m_mfit,h_180,w_180'
                            : '../../static/image/default/no_img.jpg'
                        " />
                                    <view class="goodsDetail">
                                        <view class="goodsName wrap-2">
                                            <image :src="gl.recipeFlag | showrecipeflag" v-if="
                              gl.recipeFlag != '' &&
                              gl.recipeFlag != null &&
                              gl.recipeFlag != undefined &&
                              gl.recipeFlag != 3
                            " />{{ gl.brandName + " " + gl.goodsName + " " + gl.specification }}
                                        </view>
                                        <view class="goodsKey wrap font_color_999" v-show="gl.goodsKey != null">{{ gl.goodsKey }}</view>
                                        <view class="goodsPrice font_color_common clearfix" v-if="
                            gl.sellPrice != undefined &&
                            gl.sellPrice != null &&
                            gl.sellPrice != ''
                          ">
                                            <b style="display: inline-block">￥</b
                          ><span style="display: inline-block">{{
                            gl.sellPrice.promoPrice
                              ? gl.sellPrice.promoPrice
                              : gl.sellPrice.sellPrice
                          }}</span>
                          <i
                            class="font_color_999"
                            style="display: inline-block"
                            v-if="
                              gl.sellPrice.promoPrice ||
                              gl.sellPrice.sellPrice * 1 <
                                gl.sellPrice.marketPrice * 1
                            "
                            >￥{{
                              gl.sellPrice.promoPrice
                                ? gl.sellPrice.sellPrice
                                : gl.sellPrice.marketPrice
                            }}</i
                          >
                          <!-- <p v-if="gl.commission * 1 > 0"><strong
    													class="commission bg_common_light">预估收益 <b
    														class="font_color_common">￥{{gl.commission.toFixed(2)}}</b></strong>
                                            </p> -->
                                        </view>
                                        <view class="goodsPrice" v-else>暂无报价</view>
                                        <view class="goodsActType" v-if="gl.promotionsArr.length > 0">
                                            <i class="font_color_white bg_common" v-for="promotion in gl.promotionsArr" v-if="promotion.flag != 3">
                            {{
                              promotion.flag == 1
                                ? "券"
                                : promotion.flag == 2
                                ? "满额"
                                : promotion.flag == 3
                                ? "特价"
                                : promotion.flag == 4
                                ? "套装"
                                : promotion.flag == 5
                                ? "赚"
                                : promotion.flag == 6
                                ? "整单"
                                : ""
                            }}
                          </i>
                                            <i class="font_color_white bg_common" v-if="gl.isCrowdfundFlag">筹</i
                          >
                        </view>
                      </view>
                    </view>
                    <view
                      class="goodsAddC bg_common"
                      v-if="gl.status == 1 && gl.marketFlag != 0"
                      @click="addCartFunc($event, gl)"
                    >
                      <i class="iconfont icon-add font_color_white"></i>
                                        </view>
                                    </view>
                                </view>
                                <uni-load-more :status="status" :content-text="contentText" />
                            </view>
                </scroll-view>
                </view>
                <view id="addCartNav" style="position: fixed; bottom: 50px; right: 35%; z-index: 99999"></view>
                </view>
            </view>
</template>

<script>
    export default {
        data() {
            return {
                consignorId: "",
                storeId: "",
                storeName: "",
                allObj: {},
                swiper: [], //轮播数据
                leftNav: [],
                goodsList: [],
                isActive: "",
                goodsTypeNo: "",
                reload: false,
                statusColor: "#ccc",
                status: "more",
                contentText: {
                    contentdown: "上拉加载更多",
                    contentrefresh: "正在加载...",
                    contentnomore: "—— 我也是有底线的 ——",
                },
                pageSize: 20,
                pageNo: 1,
                cartQty: 0,
                scrollTop: 0,
                old: {
                    scrollTop: 0,
                },
                bannerCurrent: 0,
            };
        },
        mounted() {},
        onLoad(options) {
            this.storeId = options.storeId || this.getStor('_storeId_');
            this.ebigRequest("/store/details", {
                storeId: this.storeId
            }, false).then(
                (res) => {
                    this.consignorId = res.consignorId;
                    this.storeName = res.storeName;
                    this.getBannerData();
                }
            );
            this.getCategory();
        },
        onReachBottom() {
            if (this.status != "noMore" && this.status != "loading") {
                //上滑加载
                this.initList("add");
            }
        },
        onShareAppMessage() {
            //分享到微信好友
            this.shareLogo = uni.getStorageSync("_shareLogo_");
            this.shareTitle = uni.getStorageSync("_shareTitle_");
            return {
                title: this.shareTitle,
                content: this.shareContent,
                imageUrl: this.shareLogo,
                path: this.shareUrl,
                succsee: (data) => {
                    this.closePop();
                    uni.showToast({
                        title: "分享成功!",
                        icon: "none",
                    });
                },
                fail: (err) => {
                    this.closePop();
                    uni.showToast({
                        title: "分享失败!",
                        icon: "none",
                    });
                },
            };
        },
        onShareTimeline() {
            //分享到微信朋友圈
            this.shareLogo = uni.getStorageSync("_shareLogo_");
            this.shareTitle = uni.getStorageSync("_shareTitle_");
            return {
                title: this.shareTitle,
                content: this.shareContent,
                imageUrl: this.shareLogo,
                path: this.shareUrl,
                succsee: (data) => {
                    this.closePop();
                    uni.showToast({
                        title: "分享成功!",
                        icon: "none",
                    });
                },
                fail: (err) => {
                    this.closePop();
                    uni.showToast({
                        title: "分享失败!",
                        icon: "none",
                    });
                },
            };
        },
        onShow() {
            this.initCartFunc();
        },
        methods: {
            swiperChange(e) {
                this.bannerCurrent = e.detail.current;
            },
            onClickBanner(res) {
                if (res.url.indexOf("appid=") != -1) {
                    let path = res.url.substring(0, res.url.indexOf("?"));
                    let appid = "";
                    let params = res.url.substring(
                        res.url.indexOf("?") + 1,
                        res.url.length
                    );
                    if (params.length > 0) {
                        for (var i = 0; i < params.length; i++) {
                            if (params[i].indexOf("appid=") != -1) {
                                appid = params[i].substring(
                                    params[i].indexOf("appid=") + 6,
                                    params[i].length
                                );
                            } else {
                                if (!hasParams) {
                                    path = path + "?" + params[i];
                                } else {
                                    path = path + "&" + params[i];
                                }
                            }
                        }
                    }
                    this.gotoOtherMini(path, appid, res);
                } else {
                    uni.navigateTo({
                        url: res.url,
                    });
                }
            },
            initCartFunc() {
                this.ebigRequest(
                    "/shopping-cart/getCartItemCount", {},
                    false,
                    "post",
                    "",
                    true
                ).then((res) => {
                    this.cartQty = res ? res : 0;
                });
            },
            getBannerData() {
                // 获取轮播
                let params = {
                    consignorId: this.consignorId,
                    storeId: this.storeId,
                    showType: 2,
                    pageSize: 20,
                };
                this.ebigRequest(
                    "/store/findBannerImage",
                    params,
                    false,
                    "",
                    "",
                    true
                ).then((res) => {
                    if (res) {
                        this.swiper = res;
                    }
                });
            },
            toggleNav(goodsTypeId, goodsTypeNo) {
                this.isActive = goodsTypeId;
                this.goodsTypeNo = goodsTypeNo;
                this.initList("refresh");
            },
            // 获取左侧导航
            getCategory() {
                let params = {
                    storeId: this.storeId,
                    parentId: -1,
                };
                this.ebigRequest("/store/getGoodstypes", params, true).then((res) => {
                    if (res.length) {
                        this.leftNav = res;
                        this.isActive = res[0].goodsTypeId;
                        this.goodsTypeNo = res[0].goodsTypeNo;
                        this.initList("add");
                    } else {
                        uni.showToast({
                            title: "暂无更多分类",
                            icon: "none",
                        });
                    }
                });
            },
            // 获取右侧内容
            initList(type) {
                if (this.reload) {
                    return;
                }
                this.status = "loading";
                if (type === "refresh") {
                    this.pageNo = 1;
                    this.reload = true;
                    this.scrollTop = this.old.scrollTop;
                    this.$nextTick(function() {
                        this.scrollTop = 0;
                    });
                }
                var params = {
                    storeId: this.storeId,
                    goodsTypeNo: this.goodsTypeNo,
                    pageSize: this.pageSize,
                    pageNo: this.pageNo,
                    strategyType: "index",
                };
                this.ebigRequest("/promotion/products", params, true)
                    .then((res) => {
                        if (type == "refresh") {
                            this.goodsList = [];
                        }
                        if (res.length < this.pageSize) {
                            this.status = "noMore";
                        } else {
                            this.status = "more";
                        }
                        res.map((item1) => {
                            let isTjFlag = false;
                            let promotionsArr = [];
                            let promotions = item1.promotions;
                            for (let key in promotions) {
                                if (key == 3 || key == "3") {
                                    isTjFlag = true;
                                }
                                promotionsArr.push({
                                    flag: key,
                                    des: promotions[key],
                                });
                            }
                            this.$set(item1, "isTjFlag", isTjFlag);
                            this.$set(item1, "promotionsArr", promotionsArr);
                        });
                        this.goodsList = [...this.goodsList, ...res];
                        if (type === "refresh") {
                            this.reload = false;
                            this.$refs.uniPulldownRefresh &&
                                this.$refs.uniPulldownRefresh.endPulldownRefresh();
                        }
                        this.pageNo = this.pageNo + 1;
                    })
                    .catch((err) => {
                        if (type === "refresh") {
                            this.reload = false;
                            this.goodsList = [];
                            this.$refs.uniPulldownRefresh &&
                                this.$refs.uniPulldownRefresh.endPulldownRefresh();
                        }
                        if (this.pageNo == 1) {
                            this.status = "noMore";
                            this.goodsList = [];
                        } else {
                            this.status = "more";
                            this.pageNo = this.pageNo - 1;
                        }
                    });
            },
            scroll: function(e) {
                this.old.scrollTop = e.detail.scrollTop;
            },
            scrollBottom() {
                if (this.status != "noMore") {
                    this.loadMore();
                }
            },
            // 等待加载
            loadMore() {
                this.status = "more";
                this.initList("add");
            },
            bigPrice(value, activityItems, type) {
                // 价格大字体
                let price = 0;
                if (type) {
                    price = value.promoPrice;
                } else {
                    price = value ? value.sellPrice : 0;
                }
                if (price || activityItems) {
                    if (activityItems) {
                        for (i = 0; i < activityItems.length; i++) {
                            if (activityItems[i].activitytype == 3) {
                                price = activityItems[i].activityspecialgood.promoprice;
                                break;
                            }
                        }
                    }
                    price = price + "";
                    if (price.indexOf(".") > -1) {
                        return price.substring(0, price.indexOf("."));
                    } else {
                        return price;
                    }
                } else {
                    return "0";
                }
            },
            smallPrice(value, activityItems, type) {
                // 价格小字体
                let price = 0;
                if (type) {
                    price = value.promoPrice;
                } else {
                    price = value ? value.sellPrice : 0;
                }
                if (price || activityItems) {
                    if (activityItems) {
                        for (i = 0; i < activityItems.length; i++) {
                            if (activityItems[i].activitytype == 3) {
                                price = activityItems[i].activityspecialgood.promoprice;
                                break;
                            }
                        }
                    }
                    price = price + "";
                    if (price.indexOf(".") > -1) {
                        return price.substring(price.indexOf("."), price.length);
                    } else {
                        return ".00";
                    }
                } else {
                    return ".00";
                }
            },
            addCartFunc(e, item) {
                // 加入购物车
                if (
                    item.sellPrice != undefined &&
                    item.sellPrice != null &&
                    item.sellPrice != ""
                ) {
                    var obj = {};
                    obj.storeId = item.storeDTO.storeId;
                    obj.skuId = item.skuId;
                    if (item.isTjFlag) {
                        //判断是否是特价商品
                        obj.quantity = item.specialPromotionDTO.leastCount ?
                            item.specialPromotionDTO.leastCount * 1 :
                            1;
                        obj.itemType = 5;
                        obj.itemSource = item.specItemSource;
                    } else {
                        obj.quantity = item.minSupplyQty ? item.minSupplyQty : 1;
                        obj.itemType = 1;
                        obj.itemSource = 0;
                    }
                    this.ebigRequest("/shopping-cart/add", obj, true).then((res) => {
                        this.cartQty = res.totalItemCount;
                        this.addGoodsImg = item.imagePath;
                        uni.showToast({
                            title: "已加入清单",
                            icon: "none",
                        });
                    });
                }
            },
        },
        filters: {
            showrecipeflag(value) {
                // 商品是否为处方药
                if (value == 1) {
                    return "../../static/image/com/otcj.png";
                } else if (value == 2) {
                    return "../../static/image/com/rx.png";
                } else if (value == 3) {
                    return "";
                } else if (value == 4) {
                    return "../../static/image/com/otcy.png";
                }
            },
        },
    };
</script>

<style lang="scss">
    page {
        height: 100%;
        .goods_sort {
            height: 100%;
            box-sizing: border-box;
            .pageStore {
                padding: 20rpx 20rpx 0;
                height: 60rpx;
                font-size: 32rpx;
                line-height: 60rpx;
                i {
                    display: inline-block;
                    padding-right: 10rpx;
                    font-size: 44rpx;
                    vertical-align: bottom;
                }
            }
            /* 搜索 start */
            .search-wrap {
                padding: 20rpx 30rpx;
                width: 100%;
                border-bottom: 1rpx solid rgba(228, 228, 228, 1);
                box-sizing: border-box;
                .s-input {
                    position: relative;
                    padding-left: 68rpx;
                    width: 100%;
                    height: 68rpx;
                    background: #ececec;
                    border-radius: 80rpx;
                    box-sizing: border-box;
                    input {
                        width: 100%;
                        height: 100%;
                        line-height: 68rpx;
                        font-size: 30rpx;
                        color: #949494;
                    }
                    .searchIcon {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        width: 68rpx;
                        font-size: 36rpx;
                        text-align: center;
                        line-height: 80rpx;
                        color: #bbb2b2;
                    }
                }
                .goodsCart {
                    position: relative;
                    width: 90rpx;
                    height: 68rpx;
                    text-align: center;
                    line-height: 68rpx;
                    i {
                        font-size: 46rpx;
                    }
                    .gCartNum {
                        position: absolute;
                        top: 0;
                        right: 0;
                        display: inline-block;
                        padding: 2rpx 8rpx;
                        font-size: 24rpx;
                        line-height: 1;
                        border-radius: 200rpx;
                    }
                }
            }
            /* 搜索 end */
            /* 左侧导航 */
            .content {
                height: calc(100% - 490rpx);
                .left {
                    width: 25%;
                    height: 100%;
                    font-size: 30rpx;
                    box-sizing: content-box;
                    text-align: center;
                    .left_item {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        line-height: 88rpx;
                        border-left: 6rpx solid #f7f7f7;
                        border-bottom: 1rpx solid #ededed;
                        &.active_item {
                            background-color: #ffffff;
                            font-size: 26rpx;
                            color: #1e1e1e;
                            font-weight: 700;
                        }
                    }
                }
                /* 右侧内容 */
                .right {
                    position: relative;
                    padding-bottom: 50rpx;
                    .goodsList {
                        .goodsItem {
                            overflow: hidden;
                            position: relative;
                            padding: 20rpx 0;
                            margin: 0 10rpx;
                            border-bottom: 1rpx dashed #ededed;
                            .goodsItemCont {
                                position: relative;
                                .goodsImg {
                                    display: block;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    width: 160rpx;
                                    height: 160rpx;
                                }
                                .goodsDetail {
                                    padding-left: 170rpx;
                                    min-height: 160rpx;
                                    .goodsName {
                                        font-size: 30rpx;
                                        line-height: 40rpx;
                                        image {
                                            margin-right: 10rpx;
                                            width: 64rpx;
                                            height: 32rpx;
                                            vertical-align: text-bottom;
                                        }
                                    }
                                    .goodsKey {
                                        padding-top: 8rpx;
                                        font-size: 26rpx;
                                    }
                                    .goodsPrice {
                                        padding: 8rpx 100rpx 4rpx 0;
                                        font-size: 24rpx;
                                        span {
                                            font-size: 40rpx;
                                        }
                                        i {
                                            text-decoration: line-through;
                                        }
                                    }
                                    .goodsActType {
                                        padding-right: 100rpx;
                                        font-size: 0;
                                        line-height: 20rpx;
                                        i {
                                            display: inline-block;
                                            margin-right: 10rpx;
                                            padding: 4rpx 8rpx;
                                            height: 26rpx;
                                            font-size: 20rpx;
                                            line-height: 28rpx;
                                            vertical-align: sub;
                                            border-radius: 6rpx;
                                        }
                                    }
                                }
                            }
                            .goodsAddC {
                                position: absolute;
                                right: 8rpx;
                                bottom: 30rpx;
                                width: 60rpx;
                                height: 60rpx;
                                text-align: center;
                                line-height: 60rpx;
                                border-radius: 50%;
                                i {
                                    font-size: 36rpx;
                                    font-weight: 700;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .swiper {
        overflow: hidden;
        position: relative;
        z-index: 9;
        height: 300rpx;
        transition: height 0.2s;
    }
    .swiperCont {
        height: 300rpx;
    }
    .swiper_img {
        width: 750rpx;
        height: 295rpx;
    }
    .swiperDots {
        height: 20rpx;
        display: flex;
        flex-direction: row;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 6rpx;
        .sDotItem {
            width: 50rpx;
            height: 10rpx;
            border-radius: 14rpx;
            margin-right: 16rpx;
            background-color: #fbeae6;
        }
        .active {
            background-color: #ffb043;
        }
    }
</style>