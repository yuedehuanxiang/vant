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
              <div>¥{{item.price | moneyFilter}}（¥{{item.mallPrice | moneyFilter}}）</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info-component
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price"
                :goodsId="item.goodsId"
              ></goods-info-component>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import floorComponent from "../components/floorComponent";
import goodsInfoComponent from "../components/goodsInfoComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import { getIndexInfo } from "../serviceAPI.config.js";
export default {
  name: "index",
  components: { floorComponent, goodsInfoComponent },
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
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    this.$axios({
      method: "get",
      url: getIndexInfo
    }).then(res => {
      console.log(res);
      let data = res.data.data;
      this.category = data.category;
      this.adBanner = data.advertesPicture.PICTURE_ADDRESS;
      this.bannerPicArray = data.slides;
      this.recommendGoods = data.recommend;
      this.floor1 = data.floor1;
      this.floor2 = data.floor2;
      this.floor3 = data.floor3;
      this.floorName = data.floorName;
      this.hotGoods = data.hotGoods;
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
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>
