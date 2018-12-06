<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item, index) in category"
                @click="clickCategory(index, item.ID)"
                :class="{categoryActive:categoryIndex==index}"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-list v-model="loading" :finished="finished" @load="onload">
              <div class="list-item" v-for="item in list" :key="item">{{item}}</div>
            </van-list>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { LOCALURL } from "../serviceAPI.config.js";
export default {
  data() {
    return {
      category: [],
      categorySub: [], // 小类类别
      categoryIndex: 0,
      active: 0, // 激活标签的值
      loading: false,
      finished: false, // 上拉加载是否有数据
      list: [] // 商品数据
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 + "px";
  },
  methods: {
    // 上拉加载方法
    onload() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.getCategorySubByCategoryId(categoryId);
    },
    // 根据大类ID读取小类类别列表
    getCategorySubByCategoryId(categoryId) {
      this.$axios({
        url: LOCALURL + "/goods/getCategorySubList",
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            console.log(this.categorySub);
            this.active = 0;
          } else {
            this.$toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCategory() {
      this.$axios({
        url: LOCALURL + "/goods/getCategoryList",
        method: "get"
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.category = res.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            this.$toast("服务器错误，数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
</style>
