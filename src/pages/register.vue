<template>
  <div class="register">
    <div class="topBar">注册</div>
    <div class="register-box">
      <div class="outer-box">
        <div class="student">姓名</div>
        <input
          type="text"
          @focus="isFocus()"
          @blur="isBlur()"
          class="form-input"
          v-model="registerMsg.name"
          placeholder="请输入您的姓名"
        >
      </div>
      <div class="outer-box">
        <div class="student-id">学号</div>
        <input
          type="text"
          class="form-input"
          v-model="registerMsg.schood_num"
          placeholder="请输入您的10位学号"
          @focus="isFocus()"
          @blur="isBlur()"
        >
      </div>
      <div class="outer-box">
        <div class="password">密码</div>
        <input
          type="password"
          class="form-input"
          v-model="registerMsg.password"
          placeholder="请输入您的密码"
          @focus="isFocus()"
          @blur="isBlur()"
        >
      </div>
      <div class="outer-box">
        <div class="acadamy">学院</div>
        <input
          type="text"
          @focus="isFocus()"
          @blur="isBlur()"
          class="form-input"
          v-model="registerMsg.acadamy"
          placeholder="请输入您所在的学院"
        >
      </div>
      <div class="outer-box">
        <div class="dept">系</div>
        <input
          type="text"
          @focus="isFocus()"
          @blur="isBlur()"
          class="form-input"
          v-model="registerMsg.dept"
          placeholder="请输入您所在的系"
        >
      </div>
      <div class="outer-box">
        <div class="cellphone">手机</div>
        <input
          type="text"
          @focus="isFocus()"
          @blur="isBlur()"
          class="form-input"
          v-model="registerMsg.cellphone"
          maxlength="11"
          placeholder="请输入您的手机号码"
        >
      </div>
      <div class="outer-box">
        <div>入学时间</div>
        <div class="select-box">年:</div>
        <select @change="selectY($event)">
          <option v-for="i in year" :value="i.y" v-html="i.y" :key="i.y"></option>
        </select>
        <!-- <div class="select-box">月:</div>
        <select @change="selectM($event)">
          <option v-for="i in month" :value="i.m" v-html="i.m" :key="i.m"></option>
        </select>
        <div class="select-box">日:</div>
        <select @change="selectD($event)">
          <option v-for="i in day" :value="i.d" v-html="i.d" :key="i.d"></option>
        </select>-->
      </div>
      <div class="register-button" @click="register">注册</div>
      <div class="login" @click="login">已有账号?马上登录</div>
    </div>
    <notify :message="msg" v-on:cleanMessage="cleanMsg" v-show="msg != ''"></notify>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "register",
  data() {
    return {
      year: [],
      month: [],
      day: [],
      enterYear: {
        year: "1949"
      },
      registerMsg: {
        name: "",
        schood_num: "",
        password: "",
        enter_year: "",
        acadamy: "",
        dept: "",
        cellphone: ""
      },
      msg: ""
    };
  },
  methods: {
    ...mapActions(["userRegister", "change"]),
    register() {
      for (const key in this.registerMsg) {
        let enterYear = this.enterYear;
        this.registerMsg.enter_year = enterYear.year;
        if (!this.registerMsg[key]) {
          this.msg = "请完善信息后注册";
          return;
        }
      }
      if (this.registerMsg.schood_num.length < 10) {
        this.msg = "请输入10位学号";
        return;
      }
      this.userRegister(this.registerMsg)
        .then(data => {
          this.msg = "注册成功";
          setTimeout(() => {
            this.$router.push({
              path: "/login"
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
    login() {
      this.$router.push({
        path: "/login"
      });
    },
    createYear() {
      let date = new Date();
      for (let i = 1949; i <= date.getFullYear(); i++) {
        this.year.push({ y: i });
      }
      // for (let i = 1; i <= 12; i++) {
      //   this.month.push({ m: i });
      // }
      // for (let i = 1; i <= 31; i++) {
      //   this.day.push({ d: i });
      // }
    },
    selectY(val) {
      this.enterYear.year = val.target.value;
    },
    // selectM(val) {
    //   this.enterYear.month = val.target.value;
    // },
    // selectD(val) {
    //   this.enterYear.day = val.target.value;
    // },
    isFocus() {
      this.change(false).then();
    },
    isBlur() {
      this.change(true).then();
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.createYear();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/register.scss";
</style>
