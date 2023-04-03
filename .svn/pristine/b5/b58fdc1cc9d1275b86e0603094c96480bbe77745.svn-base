<template>
    <view>
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="每日特惠"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="dailyBargain">
        <view class="good_item bg_white uni-flex" v-for="(item,index) in goodsList" :key="index" @click="goUrl('detail','','skuSalNo='+item.skuSalNo + '&storeId=' + item.storeDTO.storeId + '&consignorId=' + item.consignorId)">
            <image class="good_img" :src="item.imagePath ? item.imagePath : '../../../static/image/default/no_img.jpg'" mode="aspectFit" :lazy-load="true"></image>
            <view class="uni-flex-1">
                <view class="good_name">{{item.brandName + ' ' + item.goodsName + ' ' + item.specification}}</view>
                <view class="price_wrap uni-flex">
                    <view class="yellow">超级速抢</view>
                    <view class="redclass uni-flex-1">
                        <span>￥{{item.sellPrice.promoPrice||'0.00'}}</span>
                        <span class="old_price">￥{{item.sellPrice.sellPrice}}</span>
                    </view>
                </view>
            </view>
        </view>
        <view class="font_color_999" style="text-align: center; line-height: 80rpx;" v-if="goodsList.length == 0">—— 暂无更多内容 ——</view>
    </view>
    </view>
</template>

<script>
export default {
    onLoad(){
        this.getGoods()
    },
    data(){
        return{
            goodsList:[],
        }
    },
    methods:{
        getGoods(){
            let obj = {}
            obj.storeId = this.getStor('_storeId_')
            obj.pageNo = '1'
            obj.pageSize = '999'
            obj.strategyType = 'index'
            this.ebigRequest("/promotion/productsBySpecial", obj).then((data) => {
                this.goodsList = data ? data : [];
            })
        },
    }
}
</script>

<style>
page{
    background-color: #efeff4;
}
.dailyBargain{
    padding: 10rpx 16rpx;
}
.good_item{
    padding: 20rpx;
    margin-bottom: 10rpx;
}
.good_img{
    width: 200rpx;
    height: 200rpx;
    margin-right: 20rpx;
}
.good_name{
    height: 88rpx;
    font-size: 32rpx;
    font-weight: 700;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
}
.price_wrap{
    overflow: hidden;
    position: relative;
    margin-top: 32rpx;
    height: 64rpx;
    font-size: 28rpx;
    line-height: 64rpx;
    background: #FBFF89;
    border-radius: 10rpx;
}
.yellow{
    width: 184rpx;
    text-indent: 16rpx;
    font-weight: 700;
    color: #AB8900;
}
.redclass{
    position: relative;
    z-index: 9;
    text-indent: 4rpx;
    font-size: 32rpx;
    font-weight: 700;
    text-align: center;
    color: #FFFFFF;
    background: #EE231E;
    border-radius: 0 10rpx 10rpx 0;
}
.redclass::before{
    content: '';
    position: absolute;
    top: -8rpx;
    left: -34rpx;
    z-index: 8;
    width: 90rpx;
    height: 84rpx;
    background: linear-gradient(45deg, transparent 52%, #EE231E 0%);
    border-top-right-radius: 12rpx;
    transform: rotate(-135deg);
}
.redclass::after{
    content: '';
    position: absolute;
    top: 26rpx;
    left: -20rpx;
    z-index: 9;
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background: #FFFFFF;
}
.old_price{
    padding-left: 8rpx;
    font-size: 24rpx;
    font-weight: 400;
    text-decoration: line-through;
    color: #FFB3B1;
}
</style>