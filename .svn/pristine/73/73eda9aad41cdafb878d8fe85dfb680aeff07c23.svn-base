<template>
  <div class="follow">
    <!-- #ifndef MP-WEIXIN -->
    <uni-nav-hfbar
      fixed
      status-bar
      left-icon="back"
      title="物流跟踪"
    ></uni-nav-hfbar>
    <!-- #endif -->
    <div class="follow_info">
      <div>
        运单号：{{
          logisticsObj != "" &&
          logisticsObj.orderDeliveryLogisticsDTOList != null
            ? logisticsObj.orderDeliveryLogisticsDTOList[0].logisticsNo
            : logisticsObj.deliveryNo != null
            ? logisticsObj.deliveryNo
            : "暂无信息"
        }}
        <span
          class="copy"
          v-if="logisticsObj != '' && logisticsObj != null"
          @click="copyNo(logisticsObj.deliveryNo)"
          >复制</span
        >
      </div>
      <div>
        承运商：{{
          logisticsObj.logisTicsCompany ? logisticsObj.logisTicsCompany : "--"
        }}
      </div>
    </div>
    <div class="follow_deatail">
      <div
        class="send_info"
        v-for="(lo, index) in orderDeliveryLogisticsDTOList"
        :key="lo.id"
        :class="index == orderDeliveryLogisticsDTOList.length - 1 ? 'last' : ''"
      >
        <div
          class="point bg_white"
          :class="index == 0 ? 'point_active' : ''"
        ></div>
        <div class="status">{{ lo.title }}</div>
        <div class="company">
          {{ lo.remark }}
        </div>
        <div class="font_color_666 time">{{ lo.optTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deliveryid: "",
      orderStatus: "",
      logisticsObj: {},
      orderDeliveryLogisticsDTOList: [],
    };
  },
  methods: {
    // 获取快递信息
    getLogistics() {
      let params = {
        deliveryid: this.deliveryid,
      };
      this.ebigRequest("/order/getDelivery", params, true).then((res) => {
        var deliveryDate = this.getStor("orderLogDeliveryDate");
        var inputDate = this.getStor("orderLogInputDate");
        var payDate = this.getStor("orderLogPayDate");
        if (res.orderDeliveryLogisticsDTOList != null) {
          this.orderDeliveryLogisticsDTOList =
            res.orderDeliveryLogisticsDTOList;
        }
        this.orderDeliveryLogisticsDTOList.push(
          {
            title: "已支付",
            remark: "您的订单已经支付成功，等待门店打包发货",
            optTime: payDate,
          },
          {
            title: "已下单",
            remark: "您提交了订单，在支付成功后门店将在打包好后及时发货",
            optTime: inputDate,
          }
        );
        if (
          (this.orderStatus == "3" || this.orderStatus == "4") &&
          this.orderDeliveryLogisticsDTOList.length == 2
        ) {
          this.orderDeliveryLogisticsDTOList.unshift(
            {
              title: "运输中",
              remark: "您的订单正在运输中",
              optTime: deliveryDate,
            },
            {
              title: "已发货",
              remark:
                "您的订单已交付" +
                res.logisTicsCompany +
                "快递公司，运单号为" +
                res.deliveryNo,
              optTime: deliveryDate,
            }
          );
        }
        if (
          this.orderStatus == "4" &&
          this.orderDeliveryLogisticsDTOList.length == 4
        ) {
          this.orderDeliveryLogisticsDTOList.unshift({
            title: "已送达",
            remark: "您的订单已完成，祝您生活愉快!",
            optTime: "暂无时间信息",
          });
        }
        this.logisticsObj = res;
      });
    },
    // 复制单号
    copyNo(orderNo) {
      uni.setClipboardData({
        data: orderNo,
        success: () => {
          uni.showToast({
            title: "复制成功",
            icon: "none",
            duration: 1000,
          });
        },
      });
    },
  },
  onLoad(options) {
    console.log();
    this.deliveryid = options.deliveryid;
    this.orderStatus = options.orderStatus;
    console.log(options.deliveryid);
    this.getLogistics();
  },
};
</script>

<style>
page {
  height: 100%;
  background-color: #efeff4;
}
.follow_info {
  background-color: #ffffff;
  padding: 30rpx 40rpx;
  font-size: 28rpx;
  font-weight: 700;
}
.company {
  padding: 10rpx 0;
  color: #000000;
}
.copy {
  width: 80rpx;
  height: 40rpx;
  line-height: 40rpx;
  color: #ffffff;
  font-size: 24rpx;
  background-color: #1296db;
  display: inline-block;
  text-align: center;
  border-radius: 20rpx;
  margin-left: 40rpx;
}
.follow_deatail {
  background-color: #ffffff;
  padding: 40rpx 60rpx 10rpx;
  margin-top: 40rpx;
  font-size: 24rpx;
}
.point {
  width: 20rpx;
  height: 20rpx;
  border: 10rpx solid #e4e4e4;
  border-radius: 20rpx;
  margin-right: 20rpx;
  margin-top: 6rpx;
  position: absolute;
  left: -20rpx;
  top: -6rpx;
}
.last {
  border-left: none !important;
}
.send_info {
  position: relative;
  border-left: 1px dashed #e4e4e4;
  padding: 0 40rpx 20rpx 60rpx;
}
.point_active {
  border: 10rpx solid #007bc8;
}
.time {
  margin-top: 10rpx;
}
.status {
  font-size: 32rpx;
  font-weight: 700;
}
</style>