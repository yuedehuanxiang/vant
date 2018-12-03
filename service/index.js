const Koa = require("koa");
const app = new Koa();
const { connect } = require("./database/init");

(async () => {
  await connect();
})();

app.use(async ctx => {
  ctx.body = "<h1>hello koa2</h1>";
});

app.listen(3000, () => {
  console.log("server start at port 3000");
});
