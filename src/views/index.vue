<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="70%" height="70%" class="location-icon" alt>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button class="search-btn" size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="8000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img :src="banner.image" width="100%" alt>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type-bar -->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img :src="cate.image" width="90%" alt>
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adbanner area -->
    <div>
      <img :src="adBanner" width="100%" alt>
    </div>
    <!-- Recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" alt>
              <div>{{item.goodsName}}</div>
              <div>¥{{item.price}}（¥{{item.mallPrice}}）</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- floor -->
    <div class="floor">
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floor1_0.image" width="100%" alt>
        </div>
        <div>
          <div class="floor-two">
            <img :src="floor1_1.image" width="100%" alt>
          </div>
          <div>
            <img :src="floor1_2.image" width="100%" alt>
          </div>
        </div>
      </div>
      <div class="floor-rule">
        <div v-for="(item, index) in floor1.slice(3)" :key="index">
          <img :src="item.image" width="100%" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "index",
  components: {},
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor1_0: {},
      floor1_1: {},
      floor1_2: {}
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: `/index`
    }).then(res => {
      console.log(res);
      let data = res.data.data;
      this.category = data.category;
      this.adBanner = data.advertesPicture.PICTURE_ADDRESS;
      this.bannerPicArray = data.slides;
      this.recommendGoods = data.recommend;
      this.floor1 = data.floor1;
      this.floor1_0 = this.floor1[0];
      this.floor1_1 = this.floor1[1];
      this.floor1_2 = this.floor1[2];
    });
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-btn {
  margin-left: 16px;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ffffff !important;
  border-left: 0;
  background-color: #e5017d;
  color: #ffffff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}
.type-bar {
  background-color: #ffffff;
  margin: 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #ffffff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eeeeee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eeeeee;
  font-size: 12px;
  text-align: center;
}
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-bottom: 1px solid #dddddd;
}
.floor-anomaly div {
  width: 10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-one {
  border-right: 1px solid #dddddd;
}
.floor-two {
  border-bottom: 1px solid #dddddd;
}
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
}
.floor-rule div {
  width: 10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
}
.floor-rule div:nth-child(odd) {
  border-right: 1px solid #dddddd;
}
</style>
