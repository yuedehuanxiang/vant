<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="row" v-for="(item, index) in cartInfo" :key="index">
        <div class="img">
          <img :src="item.image" width="100%" alt>
        </div>
        <div class="text">
          <div class="goods-name">{{item.name}}</div>
          <div class="control">
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="goods-price">¥{{item.price | moneyFilter}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toMoney } from "../filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [], //购物车内的商品
      isEmpty: false //购物车是否为空，不为空则显示true，为空显示false
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    this.getCartInfo();
  },
  methods: {
    // 得到购物车数据的方法
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log("this.cartInfo:" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  }
};
</script>

<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.img {
  flex: 6;
}
.text {
  flex: 14;
  padding-left: 10px;
}
.control {
  padding-top: 10px;
}
.price {
  flex: 4;
}
</style>
