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

module.exports = router;
