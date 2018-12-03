const mongoose = require("mongoose");
const db = "mongodb://localhost/myDB";

exports.connect = () => {
  let maxConnectTimes = 0;
  // 连接数据库
  mongoose.connect(db);
  return new Promise((resolve, reject) => {
    // 增加数据库监听事件
    mongoose.connection.on("disconnected", () => {
      console.log("**********数据库断开*************");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error("数据库连接出现问题，多次重连无效，请人为修理。。。");
      }
    });

    mongoose.connection.on("error", () => {
      console.log("**********数据库错误**************");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error("数据库连接出现问题，多次重连无效，请人为修理。。。");
      }
    });

    // 链接成功时
    mongoose.connection.once("open", () => {
      console.log("Mongodb connected successfully");
      resolve();
    });
  });
};
