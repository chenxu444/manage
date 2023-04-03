<template>
	<view style="position: relative; z-index: 999;">
		<view class="mask" :class="{'maskShow' : showPicker}" @click="hide(true)" @click.stop.prevent @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="cpicker-content" :class="{'cpickerShow' : showPicker}">
			<!-- 优惠券页面，仿mt -->
			<view class="city-head" @click.stop.prevent @touchmove.stop.prevent catchtouchmove="true">
				<view class="city-head-title">请选择所在地区</view>
				<icon type="clear" v-if="rightIcon" class="rightIcon" size="20" color="#cccccc" @click="hide(true)"></icon>
			</view>
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft" >
				<view
					v-for="(item,index) in showTabs" :key="item.value"
					class="nav-item"
					:id="'tab'+index"
					@click="changeTab(index)"
				><text class="nav-bar-title" :class="{'current': index === tabCurrentIndex}">{{item.text}}</text></view>
			</scroll-view>
			<view class="city_content"> 
				<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" :scroll-top="scrollTop" :scroll-with-animation="true" @scroll="scrollFunc">
					<block v-for="(item,index) in showData" :key="index">
						<view class="flex-row-c-c" @click="changCity(tabCurrentIndex,item)">
							<block v-if="item.value==showTabs[tabCurrentIndex].value">
								<icon type="success_no_circle" :id="'show'+tabCurrentIndex" class="ischeck" size="14" color="#00B1B7" ></icon>
							</block>
							<text class="city-text">{{item.text}}</text>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	let scrollTimer = false;
	export default {
		name: 'UniCityNvue',
		props: {
			defaultVal: {
				type:Array,
				default: []
			},
		},
		data() {
			return {
				/* 2020-03-05 */
				isFirst: true,
				enableScroll: true,
				showPicker: false,
				defaultArea: [],              // 默认省市区id
				provinceList: '',             // 省
				oldProvinceList: '',          // （旧）省
				cityList: '',                 // 市
				oldCityList: '',              // （旧）市
				districtList: '',             // 区、县
				oldDistrictList: '',          // （旧）区、县
				areaType: 'province',         // 当前省市区类型"province","city","district";
				oldAreaType: 'province',      //
				showData: [],                 // 当前显示的省市区类型
				defaultShowTab: {             // tabs选项卡显示数据数组
					'value': '-1',
					'text': '请选择'
				},
				showTabs: [],
				tabCurrentIndex: 0,           // 当前tabs选项卡索引
				scrollLeft: 0,                // 顶部tabs选项卡左滑距离
				scrollTop: 0,                 // scrollView滚动距离
				oldScrollTop: 0,              //
				rightIcon: true,              // 是否显示右上角关闭按钮
				defaultTabs: '',
			}
		},
		mounted(){
			if(this.defaultVal.length > 0){
				this.showTabs = this.defaultVal;
				this.tabCurrentIndex = this.defaultVal.length;
			}else{
				this.showTabs.push(this.defaultShowTab);
			}
			this.defaultVal.length == 3 ? this.tabCurrentIndex = 2 : (this.defaultVal.length == 2 ? this.tabCurrentIndex = 1 : this.tabCurrentIndex = 0);
			this.defaultVal.length == 3 ? this.areaType = 'province' : (this.defaultVal.length == 2 ? this.areaType = 'city' : this.areaType = 'district');
			this.oldAreaType = JSON.parse(JSON.stringify(this.areaType));
			this.defaultTabs = JSON.parse(JSON.stringify(this.showTabs));
			this.changeAreaDate();
		},
		methods: {
			scrollFunc(e){
				this.oldScrollTop = e.detail.scrollTop
			},
			show(){
				this.showPicker = true;
			},
			hide(type){
				if(type){
					this.provinceList = JSON.parse(JSON.stringify(this.oldProvinceList));
					this.cityList = JSON.parse(JSON.stringify(this.oldCityList));
					this.districtList = JSON.parse(JSON.stringify(this.oldDistrictList));
					this.areaType = JSON.parse(JSON.stringify(this.oldAreaType));
					this.tabCurrentIndex = this.defaultTabs.length - 1;
					this.showTabs = JSON.parse(JSON.stringify(this.defaultTabs));
					if(this.showTabs.length == 3){
						this.showData = this.districtList;
					}else if(this.showTabs.length == 2){
						this.showData = this.cityList;
					}else{
						this.showData = this.provinceList;
					}
				}else{
					this.defaultTabs = JSON.parse(JSON.stringify(this.showTabs));
					this.oldCityList = JSON.parse(JSON.stringify(this.cityList));
					this.oldDistrictList = JSON.parse(JSON.stringify(this.districtList));
					this.oldAreaType = JSON.parse(JSON.stringify(this.areaType));
					this.$emit('confirmVal',this.showTabs);
					this.isFirst = false;
				}
				this.$emit('hidePicker');
				this.showPicker = false;
			},
			initAreaFunc(areaid){      // 调取接口获取省市区数据
				this.doRequest("/usercenter/area/list", {'pareaId': areaid}, true).then(res => {
					if(res.length > 0){
						let areaArr = [];
						res.map((item, index) => {
							areaArr.push({
								value: item.areaId,
								text: item.areaName
							})
						})
						if(this.areaType == 'province'){
							this.provinceList = areaArr;
							this.oldProvinceList = JSON.parse(JSON.stringify(this.provinceList));
						}else if(this.areaType == 'city'){
							this.cityList = areaArr;
						}else{
							this.districtList = areaArr;
							if(this.showTabs[2].value != '-1'){
								this.oldDistrictList = JSON.parse(JSON.stringify(this.districtList));
							}
						}
						console.log(this)
						if(this.provinceList && this.cityList && this.districtList){
							this.isFirst = false;
						}
						this.showAreaFunc(true);
					}else{
						this.hide();
					}
				})
			},
			showAreaFunc(type){                  // 赋值滚动区域显示数据
				if(this.areaType == 'province'){
					this.showData = this.provinceList;
				}else if(this.areaType == 'city'){
					this.showData = this.cityList;
				}else{
					this.showData = this.districtList;
				}
				this.$nextTick(function() {
					this.getScroll("show"+this.tabCurrentIndex);
				});
			},
			changCity: function (index,item) {         // 点击选中省市区跳转下一步
				this.tabCurrentIndex = index == 2 ? this.tabCurrentIndex : index * 1 + 1;
				if(index == 0){
					this.areaType = 'city';
					if(this.showTabs[0].value == item.value){
						this.showAreaFunc();
					}else{
						if(this.showTabs.length != 1){
							this.showTabs = [];
							this.showTabs.push(this.defaultShowTab);
						}
						this.showTabs.unshift(item);
						this.initAreaFunc(item.value);
					}
				}else if(index == 1){
					this.areaType = 'district';
					if(this.showTabs[1].value == item.value){
						this.showAreaFunc();
					}else{
						if(this.showTabs.length == 3){
							this.showTabs.splice(1, 1, item);
							this.showTabs.splice(2, 1, this.defaultShowTab);
						}else{
							this.showTabs.splice(1, 0, item);
						}
						this.initAreaFunc(item.value);
					}
				}else{
					this.showTabs.splice(2, 1);
					this.showTabs.push(item);
					this.hide();
				}
			},
			changeAreaDate(){            // 点击tab时修改scrollview区域显示内容
				if(this.tabCurrentIndex == 0){
					this.areaType = 'province';
					if(this.provinceList){
						this.showData = this.provinceList;
					}else{
						this.initAreaFunc('1');
					}
				}else if(this.tabCurrentIndex == 1){
					this.areaType = 'city';
					if(this.cityList){
						this.showData = this.cityList;
					}else{
						this.initAreaFunc(this.showTabs[0].value)
					}
				}else{
					this.areaType = 'district';
					if(this.districtList){
						this.showData = this.districtList;
					}else{
						this.initAreaFunc(this.showTabs[1].value)
					}
				}
			},
			async changeTab(index){           //tab切换
				if(scrollTimer){
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let width = 0; 
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if(i === index){
						nowWidth = result.width;
					}
				}
				if(typeof e === 'number'){
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index; 
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				this.tabCurrentIndex = index; 
				this.changeAreaDate();
				setTimeout(() => {
					this.getScroll("show"+this.tabCurrentIndex);
				}, 10)
			},
			// 点击tab时定位到选中的项
			getScroll(id) {
				uni.createSelectorQuery().in(this).select('.panel-scroll-box').boundingClientRect((data)=>{
					uni.createSelectorQuery().in(this).select('#' + id).boundingClientRect((res)=>{
						if(res != undefined && res != null && res != ''){
							this.scrollTop=res.top-data.top;
						}else{
							this.scrollTop = JSON.parse(JSON.stringify(this.oldScrollTop));
							this.$nextTick(function() {
								this.scrollTop = 0
							});
						}
					}).exec()
				}).exec();
			},
			//获得元素的size
			getElSize(id) { 
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().in(this).select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
		},
		watch: {
			showPicker(){
				
			}
		}
	}
</script>

<style lang="scss">
/* 优惠券面板 */
.mask {
    visibility: hidden;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, .6);
    opacity: 0;
    transition: all .3s ease;
}
.maskShow {
    visibility: visible;
    opacity: 1;
}
.cpicker-content {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #FFFFFF;
    transition: all .3s ease;
    transform: translateY(100%);
    z-index: 3000;
}
.cpickerShow {
    transform: translateY(0);
}
.city-head {
    width: 750rpx;
    height: 88rpx;
    flex-direction: column;
    border-bottom-width: 1px;
    border-bottom-color: #F4F4F4;
    border-bottom-style: solid;
}
.city-head-title {
    font-size: 15px;
    line-height: 88rpx;
    align-items: center;
    /* #ifndef APP-NVUE */
    text-align: center;
    /* #endif */
}
.rightIcon {
    position: absolute;
    right: 15px;
    top: 12px;
    font-size: 10px;
    color: #BEBEBE;
}
.nav-bar {
    position: relative;
    z-index: 10;
    height: 80upx;
    padding-left: 5px;
    width: 750rpx;
    flex-direction: row;
    background-color: #FFFFFF;
}

.nav-item {
    /* #ifndef APP-NVUE */
    display: inline-flex!important;
    /* #endif */
    /* #ifdef APP-NVUE */
    flex-direction: row!important;
    /* #endif */
    width: 170rpx;
    padding: 7px 0px;
    line-height: 26px;
    align-items: center;
    justify-content: center;
    color: #303133;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
}
.nav-bar-title {
    font-size: 12px;
}
.current {
    color: #00B1B7;
    border-color: #00B1B7;
    border-bottom-width: 4rpx;
    border-bottom-style: solid;
}
.current:after {
    width: 50%;
}
.nav-item:after {
    width: 0;
    height: 0;
    border-color: #00B1B7;
    border-bottom-width: 4rpx;
    border-bottom-style: solid;
    position: absolute;
    left: 50%;
    bottom: 0;
    transition-property: transform;
    transition-duration: .3s;
    transition-timing-function: ease;
} 
.panel-scroll-box {
    height: 516rpx;
    margin-top: 8px;
}
.flex-row-c-c {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    /* #ifdef APP-NVUE */
    flex-direction: row;
    /* #endif */
    padding-left: 25px;
}
.city-text {
    /* #ifdef APP-NVUE */
    flex-direction: row;
    /* #endif */
    height: 35px;
    line-height: 35px;
    font-size: 13px;
}
.hide {
    opacity: 0;
}
.ischeck {
    /* #ifndef APP-NVUE */
    display: inline-flex!important;
    /* #endif */
    /* #ifdef APP-NVUE */
    flex-direction: column;
    /* #endif */
    margin-right: 5px;
    vertical-align: middle;
}

</style>