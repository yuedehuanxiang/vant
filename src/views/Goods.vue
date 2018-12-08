<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" alt>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：¥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">评论制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { LOCALURL } from "../serviceAPI.config.js";
import { toMoney } from "../filter/moneyFilter.js";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    this.getInfo();
  },
  methods: {
    addGoodsToCart() {
      // 取出本地购物车中的商品
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId);
      console.log(isHaveGoods);
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        this.$toast.success("添加成功");
      } else {
        this.$toast.success("已有此商品");
      }
      this.$router.push({ name: "Cart" });
    },
    getInfo() {
      this.$axios({
        url: LOCALURL + "/goods/getDetailGoodsInfo",
        method: "post",
        data: { goodsId: this.goodsId }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.goodsInfo = res.data.message;
          } else {
            this.$toast("服务器错误，数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.goods-name,
.goods-price {
  background-color: #ffffff;
}
.detail {
  font-size: 0;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>
