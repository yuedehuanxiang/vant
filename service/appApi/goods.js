const Router = require("koa-router");
const mongoose = require("mongoose");
const fs = require("fs");

let router = new Router();
router.get("/insertAllGoodsInfo", async ctx => {
  fs.readFile("./newGoods.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Goods = mongoose.model("Goods");
    data.map(value => {
      // console.log(value);
      let newGoods = new Goods(value);
      newGoods
        .save()
        .then(() => {
          saveCount++;
          console.log("成功" + saveCount);
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  ctx.body = "开始导入数据";
});

router.get("/insertAllCategory", async ctx => {
  fs.readFile("./data_json/category.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Category = mongoose.model("Category");
    data.RECORDS.map(value => {
      let newCategory = new Category(value);
      newCategory
        .save()
        .then(() => {
          saveCount++;
          console.log("插入成功" + saveCount);
        })
        .catch(err => {
          console.log("插入失败" + err);
        });
    });
  });
  ctx.body = "开始导入数据";
});

router.get("/insertAllCategorySub", async ctx => {
  fs.readFile("./data_json/category_sub.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const CategorySub = mongoose.model("CategorySub");
    data.RECORDS.map(value => {
      console.log(value);
      let newCategorySub = new CategorySub(value);
      newCategorySub
        .save()
        .then(() => {
          saveCount++;
          console.log("成功插入" + saveCount);
        })
        .catch(error => {
          console.log("插入失败:" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});

// 获取商品详情信息的接口
// router.get("/getDetailGoodsInfo")

module.exports = router;
