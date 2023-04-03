<template>
  <view class="page">
    <!-- #ifndef MP-WEIXIN -->
    <uni-nav-hfbar fixed status-bar left-icon="back" title="订单投诉"></uni-nav-hfbar>
    <!-- #endif -->
    <view class="topNav bg_white uni-flex border_bottom_1">
      <span
        class="toggle uni-flex-1"
        :class="navActive == false ? 'font_color_common' : ''"
        @click="toggleNav(false)"
        >我要投诉</span
      >
      <span
        class="toggle uni-flex-1"
        :class="navActive == true ? 'font_color_common' : ''"
        @click="toggleNav(true)"
        >投诉历史</span
      >
    </view>
    <!-- 我要投诉区域 -->
    <view style="padding: 92rpx 0 0;" v-if="navActive == false">
      <view class="order bg_white uni-flex border_bottom_1">
        <span class="order_num">订单编号</span>
        <input
          class="uni-flex-1 chooseNum font_color_999"
          @click="chooseNum"
          :value="orderNo"
          placeholder="您要投诉的订单编号"
          style="font-size: 28rpx"
          disabled
        />
        <span class="iconfont icon-right right_icon"></span>
      </view>
      <view class="order bg_white uni-flex border_bottom_1">
        <span class="order_num">联系电话</span>
        <input
          class="uni-flex-1 chooseNum"
          placeholder="请留下您的联系方式"
          style="font-size: 28rpx"
          v-model="phone"
        />
      </view>
      <view class="title">投诉详情</view>
      <view class="detail bg_white">
        <view class="tag uni-flex">
          <view
            class="tag_item"
            :class="isActive == index ? 'active_tag' : ''"
            v-for="(item, index) in tagName"
            :key="index"
            @click="chooseTag(item, index)"
          >
            {{ item }}
          </view>
        </view>
        <view class="txtWrap bg_white">
          <textarea
            class="userTxt bg-white"
            placeholder="请输入您投诉的具体问题~(300字以内)"
            v-model="content"
            maxlength="300"
          ></textarea>
          <button
            class="submitBtn bg_common font_color_white"
            @click="subSuggest"
          >
            提交
          </button>
        </view>
      </view>
    </view>
    <!-- 投诉历史区域 -->
    <view class="history" v-if="navActive == true">
      <uni-pulldown-refresh
        ref="uniPulldownRefresh"
        id="pullContent"
        :top="88"
        :absolute="88"
        @refresh="onPulldownReresh"
      >
        <view>
          <view
            class="history_item"
            v-for="(item, index) in historyList"
            :key="index"
            @click="goUrl('complainDetail', 'mine', 'complainId=' + item.complainId)"
          >
            <view class="history_num uni-flex">
              <span class="uni-flex-1">订单编号：{{ item.orderNo }}</span>
              <span class="history_time font_color_999">{{
                item.complainDate.substring(0, item.complainDate.indexOf(" "))
              }}</span>
            </view>
            <view class="history_sort">投诉类型：{{ item.title }}</view>
            <view class="usertxt_wrap">
              投诉描述:
              <textarea
                class="history_txt"
                disabled
                :placeholder="item.content"
              ></textarea>
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
  data() {
    return {
      navActive: false,
      tagName: ["服务态度", "商品质量", "配送超时", "错发/漏发", "其他"],
      isActive: null, // 标签
      isInit: false,
      //   投诉内容
      title: "",
      content: "",
      phone: "",
      orderNo: "",
      consignorId: '',
      // 投诉历史
      pageNo: 1,
      pageSize: 15,
      bottom: false,
      historyList: [],
      reload: false,
      statusColor: "#ccc",
      status: "more",
      contentText: {
        contentdown: "上拉加载更多",
        contentrefresh: "正在加载...",
        contentnomore: "—— 我也是有底线的 ——",
      },
    };
  },
  onLoad(options) {},
  onReachBottom() {
    if (this.status != "noMore" && this.status != "loading") {
      //上滑加载
      this.getHistoryComplain("add");
    }
  },
  methods: {
    showToast(title) {
      uni.showToast({
        title,
        icon: "none",
        duration: 1000,
      });
    },
    toggleNav(boolean) {
      this.navActive = boolean;
      if (boolean && !this.isInit) {
        this.isInit = true;
        this.getHistoryComplain("add");
      }
    },
    chooseNum() {
      uni.navigateTo({
        url: "/mine/pages/orderComplain/choiceOrder",
      });
    },
    chooseTag(name, index) {
      this.isActive = index;
      this.title = name;
    },
    // 投诉提交
    subSuggest() {
      const phoneReg = /^1[0-9]{10}$/;
      if (this.orderNo == "" || this.orderNo == null) {
        this.showToast("订单编号不能为空!");
        return;
      }
      if (this.phone == "" || this.phone == null) {
        this.showToast("联系人手机号码不能为空!");
        return;
      }
      if (!phoneReg.test(this.phone)) {
        this.showToast("联系人手机号码格式错误！");
        return;
      }
      if (this.title == "" || this.title == null) {
        this.showToast("订单投诉类型未选择！");
        return;
      }
      if (this.content == "" || this.content == null) {
        this.showToast("订单投诉内容不能为空！");
        return;
      }
      let params = {
        consignorId: this.consignorId,
        orderNo: this.orderNo,
        mobile: this.phone,
        title: this.title,
        content: this.content,
      };
      this.doRequest("/usercenter/complain/submit", params, true).then((res) => {
        this.navActive = true;
        this.title = "";
        this.content = "";
        this.phone = "";
        this.orderNo = "";
        this.isActive = null;
        this.getHistoryComplain("refresh");
      });
    },
    // 获取投诉历史
    getHistoryComplain(type) {
      if (this.reload) {
        return;
      }
      this.status = "loading";
      if (type === "refresh") {
        this.pageNo = 1;
        this.reload = true;
      }
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      this.doRequest("/usercenter/complain/list", params, true)
        .then((res) => {
          if (type == "refresh") {
            this.historyList = [];
          }
          if (res.length < this.pageSize) {
            this.status = "noMore";
          } else {
            this.status = "more";
          }
          this.historyList = [...this.historyList, ...res];
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
            this.historyList = [];
            this.$refs.uniPulldownRefresh &&
              this.$refs.uniPulldownRefresh.endPulldownRefresh();
          }
          if (this.pageNo == 1) {
            this.status = "noMore";
            this.historyList = [];
          } else {
            this.status = "more";
            this.pageNo = this.pageNo - 1;
          }
        });
    },
    // 等待加载
    loadMore() {
      this.status = "more";
      this.getHistoryComplain("add");
    },
    // 下拉刷新
    onPulldownReresh() {
      this.getHistoryComplain("refresh");
    },
  },
};
</script>

<style>
page, .page {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #EFEFF4;
    box-sizing: border-box;
}
.border_bottom_1 {
    border-bottom: 1px solid #EEEEEE;
}
.topNav {
    position: fixed;
    height: 90rpx;
    top: 0;
    left: 0;
    right: 0;
    z-index: 111;
}
.toggle {
    width: 50%;
    text-align: center;
    line-height: 90rpx;
    text-align: center;
}
.order {
    height: 90rpx;
    line-height: 90rpx;
    padding: 0 20rpx;
    font-size: 24rpx;
    align-items: center;
}
.order_num {
    height: 90rpx;
    width: 120rpx;
    text-align: center;
    font-size: 28rpx;
}
.chooseNum {
    padding-left: 20rpx;
    height: 90rpx;
}
.right_icon {
    float: right;
    font-size: 40rpx;
    color: #CCCCCC;
}
.title {
    padding: 20rpx;
    font-size: 24rpx;
}
.tag {
    width: 100%;
    flex-wrap: wrap;
    padding-bottom: 20rpx;
    margin-bottom: 10rpx;
}
.tag_item {
    box-sizing: border-box;
    width: 30%;
    padding: 16rpx 10rpx;
    background-color: #F0EFF4;
    border-radius: 6rpx;
    text-align: center;
    margin: 20rpx 0 0 18rpx;
    font-size: 26rpx;
}
.active_tag {
    background: linear-gradient(
    0deg,
    rgba(0, 123, 200, 1) 0%,
    rgba(0, 123, 200, 1) 0%,
    rgba(25, 158, 216, 1) 100%,
    rgba(25, 158, 216, 1) 100%
    ) !important;
    color: #FFFFFF;
}
.txtWrap {
    padding: 0 20rpx;
}
.userTxt {
    padding: 10rpx;
    border: 1px solid #00000033;
    width: 100%;
    box-sizing: border-box;
}
.submitBtn {
    margin-top: 40rpx;
    line-height: 88rpx;
}
/* 投诉历史 */
.history {
    padding: 90rpx 0 0;
}
.history_item {
    border-radius: 10rpx;
    background-color: #FFFFFF;
    margin: 20rpx 20rpx 0;
}
.history_num {
    padding: 20rpx;
}
.history_sort {
    padding: 20rpx;
}
.history_time {
    width: 150rpx;
    text-align: right;
}
.usertxt_wrap {
    padding: 20rpx;
}
.history_txt {
    padding: 10rpx;
    width: 100%;
    border: 1px solid #EEEEEE;
    height: 120rpx;
    color: #CCCCCC;
    box-sizing: border-box;
}
.noMore {
    text-align: center;
    font-size: 30rpx;
    color: #666666;
    padding: 20rpx;
    font-weight: 700;
}

</style>