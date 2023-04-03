<template>
  <view class="uni-navbar" :class="noshow ? 'no-show' : ''">
    <view
      :class="{
        'uni-navbar--fixed': fixed,
        'uni-navbar--shadow': border,
        'uni-navbar--border': border,
        'no-show': noshow,
      }"
      :style="{ 'background-color': backgroundColor }"
      class="uni-navbar__content bg_common"
    >
      <uni-status-bar v-if="statusBar" />
      <view
        :style="{ color: color }"
        class="uni-navbar__header uni-navbar__content_view font_color_white"
      >
        <view
          class="uni-navbar__header-btns uni-navbar__content_view"
          @tap="onClickLeft"
          v-if="leftIcon.length || leftText.length"
        >
          <view v-if="leftIcon.length" class="uni-navbar__content_view">
            <uni-icons :type="leftIcon" :color="color" size="24" />
          </view>
          <view
            v-if="leftText.length"
            :class="{ 'uni-navbar-btn-icon-left': !leftIcon.length }"
            class="uni-navbar-btn-text uni-navbar__content_view"
            >{{ leftText }}</view
          >
          <slot name="left" />
        </view>
        <view class="uni-navbar__header-container uni-navbar__content_view">
          <view
            v-if="title.length"
            class="uni-navbar__header-container-inner uni-navbar__content_view"
            >{{ title }}
          </view>
          <!-- 标题插槽 -->
          <slot />
        </view>
        <view
          :class="title.length ? 'uni-navbar__header-btns-right' : ''"
          class="uni-navbar__header-btns uni-navbar__content_view"
          @tap="onClickRight"
          v-if="rightIcon.length || rightText.length"
        >
          <view v-if="rightIcon.length" class="uni-navbar__content_view">
            <uni-icons :type="rightIcon" :color="color" size="24" />
          </view>
          <!-- 优先显示图标 -->
          <view
            v-if="rightText.length && !rightIcon.length"
            class="uni-navbar-btn-text uni-navbar__content_view"
          >
            {{ rightText }}</view
          >
          <slot name="right" />
        </view>
      </view>
    </view>
    <view v-if="fixed" class="uni-navbar__placeholder">
      <uni-status-bar v-if="statusBar" />
      <view class="uni-navbar__placeholder-view" />
    </view>
    <view class="moreBg" @click="showMore = false;" v-if="showMore"></view>
    <view
      class="morePop"
      :style="moreOP ? 'opacity:' + moreOP : ''"
      v-if="showMore"
    >
      <view
        class="triangleUp"
        :style="moreBg ? 'border-bottom-color:' + moreBg : ''"
      ></view>
      <view class="moreCont" :style="moreBg ? 'background:' + moreBg : ''">
        <view
          class="moreItem elli"
          :style="moreFontC ? 'color:' + moreFontC : ''"
          @click="moreTap(mc)"
          v-for="mc in moreCont"
          v-if="moreCont"
          >{{ mc.name }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import uniStatusBar from "../uni-status-bar/uni-status-bar.vue";
import uniIcons from "../uni-icons/uni-icons.vue";
import jbridge from "../../static/js/jbridge.js";

export default {
  name: "UniNavBar",
  components: {
    uniStatusBar,
    uniIcons,
  },
  props: {
    noshow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    leftText: {
      type: String,
      default: "",
    },
    rightText: {
      type: String,
      default: "",
    },
    leftIcon: {
      type: String,
      default: "",
    },
    rightIcon: {
      type: String,
      default: "",
    },
    isMore: {
      type: Boolean,
      default: false,
    },
    moreOP: {
      type: Number,
      default: 1,
    },
    moreBg: {
      type: String,
      default: "",
    },
    moreFontC: {
      type: String,
      default: "",
    },
    moreCont: {
      type: Array,
      default: null,
    },
    fixed: {
      type: [Boolean, String],
      default: false,
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF",
    },
    statusBar: {
      type: [Boolean, String],
      default: false,
    },
    shadow: {
      type: [String, Boolean],
      default: true,
    },
    border: {
      type: [String, Boolean],
      default: true,
    },
  },
  data() {
    return {
      pages: "",
      showMore: false,
    };
  },
  updated() {
    console.log("2");
  },
  beforeUpdate() {
    console.log("1");
  },
  mounted() {
    this.pages = getCurrentPages();
    this.backUrl();
  },
  methods: {
    onClickLeft() {
      if (this.pages.length > 1) {
        uni.navigateBack({
          delta: 1,
        });
      } else {
        history.go(-1);
      }
      this.$emit("click-left");
    },
    onClickRight() {
      if (this.isMore) {
        this.showMore = true;
      } else {
        this.$emit("click-right");
      }
    },
    moreTap(item) {
      this.showMore = false;
      this.$emit("click-right", item);
    },
    doWebViewJavascriptBridge() {
      let page = this.pages[this.pages.length - 1].route;
      window.WebViewJavascriptBridge.registerHandler(
        "isFirstLevel",
        (data, responseCallback) => {
          if (
            page.includes("myCenter") ||
            page.includes("goodsReturn") ||
            page.includes("orderList") ||
            page.includes("login")
          ) {
            responseCallback("true");
          } else {
            if (this.pages.length > 1) {
              uni.navigateBack({
                delta: 1,
              });
              responseCallback("false");
            } else {
              history.go(-1);
              responseCallback("true");
            }
          }
        }
      );
    },
    connectWebViewJavascriptBridge() {
      var _this = this;
      if (window.WebViewJavascriptBridge) {
        _this.doWebViewJavascriptBridge();
      } else {
        document.addEventListener(
          "WebViewJavascriptBridgeReady",
          function () {
            _this.doWebViewJavascriptBridge();
          },
          false
        );
      }
    },
    // 判断是否是一级页面 不是的话则返回上一页 是的话退出APP应用
    backUrl() {
      //注册事件监听
      //注册回调函数，第一次连接时调用 初始化函数
      this.connectWebViewJavascriptBridge();
    },
  },
};
</script>

<style lang="scss">
$nav-height: 44px;

.no-show {
    height: 0 !important;
}

.uni-navbar {
    &__content {
        display: block;
        position: relative;
        width: 100%;
        background-color: $uni-bg-color;
        overflow: hidden;
    }

    &__header {
        position: relative;
        width: 100%;
        height: $nav-height;
        line-height: $nav-height;
        font-size: 16px;

        &-btns {
            position: absolute;
            top: 0;
            left: 20upx;
            z-index: 99;

            &:first-child {
                padding-left: 0;
            }

            &:last-child {
                right: 20upx;
                left: auto;
            }

            &-right:last-child {
                text-align: right;
                flex-direction: row-reverse;
            }
        }

        &-container {
            margin: 0 10upx;

            &-inner {
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }
    }

    &__placeholder {
        &-view {
            height: $nav-height;
        }
    }

    &--fixed {
        position: fixed;
        z-index: 998;
    }

    &--shadow {
        box-shadow: 0 1px 6px #CCCCCC;
    }

    &--border:after {
        position: absolute;
        z-index: 3;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: $uni-border-color;
    }
}

.moreBg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999998;
}
.morePop {
    position: fixed;
    top: 32px;
    right: 6px;
    z-index: 999999;
    .triangleUp {
        position: absolute;
        right: 8px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid red;
    }
    .moreCont {
        margin-top: 8px;
        border-radius: 5px;

        .moreItem {
            padding: 5px 16px;
            max-width: 120px;
            line-height: 26px;
            border-bottom: 1px solid #EEEEEE;
        }
    }
}

</style>