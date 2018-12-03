<template>
  <div>
    <van-nav-bar title="用户登陆" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
        required
        :error-message="usernameErrorMsg"
      ></van-field>
      <van-field
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        :error-message="passwordErrorMsg"
        required
      ></van-field>
      <div class="register-button">
        <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登陆</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { LOCALURL } from "../serviceAPI.config.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, // 是否开启注册按钮的loading状态(为了做放重复提交)
      usernameErrorMsg: "", // 当用户名出错时的提示信息
      passwordErrorMsg: "" // 当密码出错时的提示信息
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      // if (this.checkForm()) {
      //   this.axiosRegisterUser();
      // }
      this.checkForm() && this.axiosLoginUser();
    },
    axiosLoginUser() {
      this.openLoading = true;
      this.$axios({
        url: LOCALURL + "/user/login",
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          this.openLoading = false;
        })
        .catch(() => {
          this.openLoading = false;
        });
    },
    checkForm() {
      // 表单验证方法
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
}
.register-button {
  padding-top: 10px;
}
</style>
