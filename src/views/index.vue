<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="80%" height="90%" class="location-icon" alt>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
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
      <div class="recommend-body"></div>
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
      locationIcon: require("../assets/images/location.png"),
      bannerPicArray: [
        {
          imageUrl:
            "https://www.chenshuai2018.com/wp-content/uploads/2018/10/15404529511.png"
        },
        {
          imageUrl:
            "https://www.chenshuai2018.com/wp-content/uploads/2018/10/15404529511.png"
        },
        {
          imageUrl:
            "https://www.chenshuai2018.com/wp-content/uploads/2018/10/15404529511.png"
        }
      ],
      category: [],
      adBanner: ""
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: `/index`
    }).then(res => {
      console.log(res);
      this.category = res.data.data.category;
      this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
      this.bannerPicArray = res.data.data.slides;
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
</style>
