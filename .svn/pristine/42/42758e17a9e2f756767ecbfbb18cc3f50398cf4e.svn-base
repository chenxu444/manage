<template>
	<view 
		:class="pullRefreshClass"
		:style="{
				transform: 'translateY('+ pageDeviation +'px)',
				transition: pageTransition + 's',
				height: 'calc(100% - ' + pageTop + 'px)',
				maxHeight: 'calc(100% - ' + pageTop + 'px)',
				position:positionTop,
				top:positionPxTop+'rpx',
				width:'100%'
			}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
		<!-- 下拉刷新 -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="uni-loading-wrapper">
			<image 
				class="uni-loading-icon" 
				:class="{active: refreshing, ready: refreshReady}" 
				src="../../static/image/default/refresh.png">
			</image>
		</view>
		<!-- #endif -->
		<slot></slot>
	</view>
</template>

<script>
	let startY, moveY, windowHeight = 500, platform;
	let timeDiff = 0;
	let touchending;
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
	export default {
		
		props: {
			top: {
				//距离顶部距离，单位upx
				type: Number,
				default: 0
			},
			absolute: {
				//距离顶部距离，单位upx
				type: Number,
				default: 0
			},
			isRefresh: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				pageDeviation: 0, //下偏移量
				pageTransition: 0, //回弹过渡时间
				refreshReady: false, //进入刷新准备状态
				refreshing: false, // 进入刷新状态
				pullRefreshClass: 'uni-refresh-content',
			};
		},
		computed: {
			pageTop(){
				return uni.upx2px(this.top);
			},
			positionTop(){
				if(this.absolute>0){
					return	"absolute";
				}else{
					return "relative";
				}
			},
			positionPxTop(){
				if(this.absolute>0){
					return this.absolute+7;
				}else{
					return 0;
				}
			}
		},
		created(){
			uni.getSystemInfo({
				success: function(e) {
					platform = e.platform;
					windowHeight = e.windowHeight;
				}
			})
		},
		methods: {
			pageTouchstart(e){
				touchending = false;
				this.pageTransition = 0;
				startY = e.touches[0].pageY;
			},
			pageTouchmove(e){
				if(this.isRefresh){
					if(touchending){
						return;
					}
					moveY = (e.touches[0].pageY - startY) * 0.4;
					if(moveY >= 0){
						this.pageDeviation = moveY;
						
						this.$emit('setEnableScroll', false);
					}
					if(moveY >= 50 && this.refreshReady === false){
						this.refreshReady = true;
					}else if(moveY < 50 && this.refreshReady === true){
						this.refreshReady = false;
					}
					if(platform === 'ios' && e.touches[0].pageY > windowHeight + 10){
						this.pageTouchend();
					}
				}
			},
			pageTouchend(){
				touchending = true;
				if(moveY === 0){
					return;
				}
				this.pageTransition = 0.3;
				if(moveY >= 50){
					this.startPulldownRefresh();
				}else{
					this.pageDeviation = 0;
				}
				
				if(this.refreshReady === true){
					this.refreshReady = false;
				}
				//修复下拉一点回弹后页面无法滚动的bug
				this.$emit('setEnableScroll', true);
				startY = moveY = 0;
			},
			//开启下拉刷新
			startPulldownRefresh(){
				if(+new Date() - timeDiff < 100){
					return;
				}
				timeDiff = +new Date();
				this.refreshing = true;
				this.pageDeviation = uni.upx2px(90);
				this.$emit('refresh');
			},
			//结束下拉刷新
			endPulldownRefresh(){
				this.refreshing = false;
				this.pageDeviation = uni.upx2px(0);
				//this.$emit('setEnableScroll', true);
			},
		}
	}
</script>

<style>
.uni-refresh-content {
    display: flex;
    flex-direction: column;
    position: relative;
}
/* 下拉刷新部分 */
.uni-loading-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-100%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.uni-loading-icon {
    width: 70upx;
    height: 70upx;
    transition: .3s;
}
.uni-loading-icon.ready {
    transform: scaleX(1.3);
}
.uni-loading-icon.active {
    animation: loading .5s ease-in infinite both alternate;
}

@keyframes loading {
    0% {
        transform: translateY(-20upx) scaleX(1);
    }
    100% {
        transform: translateY(4upx)  scaleX(1.3);
    }
}
</style>
