const Koa = require("koa");
const app = new Koa();
const { connect, initSchemas } = require("./database/init");
const mongoose = require("mongoose");

(async () => {
  await connect();
  initSchemas();
  const User = mongoose.model("User");
  let oneUser = new User({
    userName: "cs3",
    password: "123456"
  });
  oneUser.save().then(() => {
    console.log("插入成功");
  });

  let user = await User.findOne({ userName: "cs" });
  console.log(user);
})();

app.use(async ctx => {
  ctx.body = "<h1>hello koa2</h1>";
});

app.listen(3000, () => {
  console.log("server start at port 3000");
});
