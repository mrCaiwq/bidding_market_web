<template>
  <div class="login">
    <div class="topBar">登录</div>
    <div class="login-box">
      <div class="outer-box">
        <div class="student-id">学号</div>
        <input
          type="text"
          @focus="isFocus()"
          @blur="isBlur()"
          class="form-input"
          v-model="loginMsg.schood_num"
          placeholder="请输入您的学号"
        >
      </div>
      <div class="outer-box">
        <div class="password">密码</div>
        <input
          type="password"
          @focus="isFocus()"
          @blur="isBlur()"
          class="form-input"
          v-model="loginMsg.password"
          placeholder="请输入您的密码"
        >
      </div>
      <div class="login-button" @click="login">登录</div>
      <div class="register" @click="register">还没有账号?赶紧注册</div>
    </div>
    <notify v-show="msg != ''" :message="msg" v-on:cleanMessage="cleanMsg"></notify>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      loginMsg: {
        schood_num: "",
        password: ""
      },
      msg: ""
    };
  },
  methods: {
    ...mapActions(["userLogin", "change"]),
    login() {
      if (!this.loginMsg.schood_num) {
        this.msg = "请输入正确的学号";
        return;
      } else if (!this.loginMsg.password) {
        this.msg = "请输入密码";
        return;
      }
      this.cleanMsg("");
      this.userLogin(this.loginMsg)
        .then(data => {
          const user = data.data;
          this.msg = "登录成功";
          localStorage.setItem("token", user.token);
          setTimeout(() => {
            this.$router.push({
              path: "/"
            });
          }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cleanMsg(val) {
      this.msg = val;
    },
    register() {
      this.$router.push({
        path: "/register"
      });
    },
    isFocus() {
      this.change(false).then();
    },
    isBlur() {
      this.change(true).then();
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>
