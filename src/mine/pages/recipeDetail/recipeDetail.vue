<template>
  <div class="recipeDetail">
      <!-- #ifndef MP-WEIXIN -->
        <uni-nav-hfbar fixed status-bar left-icon="back" title="处方详情"></uni-nav-hfbar>
        <!-- #endif -->
      <image :src="recipeUrl" class="detail_img" @click="perImg" />
      <button class="bottom_btn bg_common" @click="recipelApply(recipeId)">申请续方</button>
      <uni-previewImage ref="previewImage" :opacity="1" :circular="true" :reduction="true" :imgs="recipeUrlArr"></uni-previewImage>
  </div>
</template>

<script>
export default {
    data(){
        return{
            recipeUrl:'',
            recipeUrlArr: [],
            recipeId:'',
            isIphone: false,
        }
    },
    methods:{
        perImg(e){
            if(this.isIphone){
                uni.previewImage({
                    urls: [this.recipeUrl],
                    success: res => {
                        console.log('+'+JSON.stringify(res));
                    },
                    faile: err => {
                        console.log('fail');
                    }
                })
            }else{
                var param = e.currentTarget.dataset.src;
			    this.$refs.previewImage.open(param); // 传入当前选中的图片地址或序号
            }
        },
        recipelApply(recipeId){ //申请续方
			let obj = {};
            obj.recipeId = recipeId;
            this.ebigRequest("/recipe/createOrder", obj, true).then(res=>{
                if (res) {
                    this.goUrl('orderConfirm', 'order', 'orderNo='+res)
				} 
            })
        },
        //长按事件
		longPress(data) {
			console.log(data);
		}
    },
    onLoad(options){
        this.recipeUrl = this.getStor('_recipeUrlDetailPage_');
        this.recipeUrlArr.push(this.recipeUrl);
        this.recipeId = options.recipeId;
        let _model_ = this.getStor('_model_');
        if(_model_.indexOf('iPhone') != -1){
            this.isIphone = true;
        }
    }
}
</script>

<style>
page {
    height: 100%;
}
.recipeDetail {
    height: 100%;
}
.detail_img {
    height: calc(100% - 40px);
    width: 100%;
}
.bottom_btn {
    color: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: unset;
    height: 90rpx;
    line-height: 90rpx;
}


</style>