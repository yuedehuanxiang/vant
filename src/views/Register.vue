<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
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
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
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
    registerAction() {
      // if (this.checkForm()) {
      //   this.axiosRegisterUser();
      // }
      this.checkForm() && this.axiosRegisterUser();
    },
    axiosRegisterUser() {
      this.openLoading = true;
      this.$axios({
        url: LOCALURL + "/user/register",
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$toast.success(res.data.message);
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          } else {
            this.openLoading = false;
            this.$toast.fail("注册失败");
          }
        })
        .catch(() => {
          this.$toast.fail("注册失败");
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
