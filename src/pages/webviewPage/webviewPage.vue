<template>
    <view>
        <view style="margin-top: 30px; font-size: 29px; font-weight: 700; text-align: center; color: #999;">
            <!-- <web-view :webview-styles="webviewStyles" @message="message" :src="pageUrl" v-if="pageUrl != ''" class="webViewCont"></web-view> -->
            页面正在维护中
        </view>
    </view>
</template>

<script>
import Vue from "vue";
export default {
    data() {
        return {
            webviewStyles: {
                progress: {
                    color: '#FF3333'
                }
            },
            pageUrl: '',
        }
    },
    onLoad(option) {
        this.pageUrl = option.url;
    },
    methods: {
        message(event){
            console.log(event.detail.data);
        }
    }
}
</script>