const Router = require("koa-router");

let router = new Router();

router.get("/", async ctx => {
  ctx.body = "这是home";
});

module.exports = router;
