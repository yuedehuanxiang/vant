const Router = require("koa-router");
const mongoose = require("mongoose");

let router = new Router();

router.get("/", async ctx => {
  ctx.body = "这是用户首页1";
});

router.post("/register", async ctx => {
  const User = mongoose.model("User");
  let newUser = new User(ctx.request.body);
  await newUser
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: "注册成功"
      };
    })
    .catch(error => {
      ctx.body = {
        code: 500,
        message: error
      };
    });
});

router.post("/login", async ctx => {
  let loginUser = ctx.request.body;
  console.log(loginUser);
  let userName = loginUser.userName;
  let password = loginUser.password;

  //引入User中的model
  const User = mongoose.model("User");
  await User.findOne({ userName })
    .then(async result => {
      console.log(result);
      if (result) {
        let newUser = new User();
        await newUser
          .comparePassword(password, result.password)
          .then(isMatch => {
            ctx.body = { code: 200, message: isMatch };
          })
          .catch(err => {
            console.log(err);
            ctx.body = { code: 500, message: err };
          });
      } else {
        ctx.body = { code: 200, message: "用户名不存在" };
      }
    })
    .catch(err => {
      console.log(err);
      ctx.body = {
        code: 500,
        message: err
      };
    });
});

module.exports = router;
