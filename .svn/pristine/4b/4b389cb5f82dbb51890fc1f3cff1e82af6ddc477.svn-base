 <template>
    <view id="page" style="width: 100%;height: 100%;">
        <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="优惠券兑换"></uni-nav-hfbar>
        <!-- #endif -->
        <view class="wrap">
            <view class="coupon-input-wrap uni-flex bg_white">
                <view class="coupon-label">兑换码：</view>
                <input class="coupon-input uni-flex-1" type="text" v-model="code" placeholder="请输入兑换码">
            </view>
            <view class="exchange-btn bg_common font_color_white tc" @click="exchangeCoupon">立即兑换</view>
        </view>
    </view>
</template>

<script>
export default {
    components:{},
    data() {
        return {
            code: ''
        }
    },
    onLoad(option) {
        
    },
    onShow() {
        
    },
    methods: {
        exchangeCoupon: function() { //兑换优惠券
            if(this.code == ''){
                uni.showToast({
                    title: "抱歉，您输入的兑换码为空!",
                    icon: "none",
                });
				return;
			}
			var obj = {};
            obj.code = this.code;
            this.ebigRequest("/coupon/redeemCouponBycode", obj, true).then((data) => {
                // console.log(data)
                if(data && data != null){
                    this.replaceUrl('exchangeCouponSuccess', 'activity', 'couponNo='+data.couponNo)
                } else {
                    uni.showToast({
                        title: "您输入的兑换码有误，请核对后重新输入!",
                        icon: "none",
                    });
                }
            }).catch(err => {

            })
        }
    }
}
</script>

<style lang="scss">
page {
    width: 100%;
    height: 100%;
}
.wrap {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #EFEFEF;
    .coupon-input-wrap {
        width: 100%;
        margin: 40rpx 0;
        padding: 0 40rpx;
        box-sizing: border-box;
        .coupon-label, .coupon-input {
            height: 108rpx;
            line-height: 108rpx;
        }
        .coupon-label {
            width: 180rpx;
        }
    }
    .exchange-btn {
        width: 80%;
        height: 72rpx;
        line-height: 72rpx;
        margin: 0 auto;
        border-radius: 10rpx;
    }
}

</style>