<template>
  <div class="myCenter">
    <div class="topBar">我的信息</div>
    <div class="name-box" @click="login()">
      <img src="@/assets/avatar.png" class="avatar">
      <p class="name" v-html="token ? name : '登录/注册'"></p>
    </div>
    <div class="message-box" v-if="token">
      <div class="message" v-for="msg in messageList" :key="msg.index">
        <img :src="msg.img" class="message-img">
        <p class="message-text" v-html="msg.text"></p>
      </div>
    </div>
    <div class="bidding-box" v-if="token">
      <div class="myBidding">
        <p class="message-text" @click="myPublish()">我的拍卖</p>
      </div>
      <div class="bidding">
        <p class="message-text" @click="createBidding()">创建拍卖</p>
      </div>
    </div>
    <div class="sign-out" @click="signOut" v-if="token">退出登录</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "myCenter",
  data() {
    return {
      name: "李大毛",
      messageList: [
        {
          img: require("@/assets/my1.png"),
          text: 18
        },
        {
          img: require("@/assets/enterTime.png"),
          text: "2019-03-19"
        },
        {
          img: require("@/assets/acadamy.png"),
          text: "华南农业大学"
        },
        {
          img: require("@/assets/dept.png"),
          text: "农业系"
        }
      ],
      token: ""
    };
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    signOut() {
      localStorage.removeItem("token");
      this.$router.push({
        path: "/login"
      });
    },
    login() {
      if (this.token == null) {
        this.$router.push({
          path: "/login"
        });
      }
    },
    getInfo() {
      this.getUserInfo()
        .then(data => {
          const user = data.data;
          const schood_num = user.schood_num.split("");
          for (let i = 4; i < 10; i++) {
            schood_num.splice(i, 1, "*");
          }
          this.name = schood_num.join("");
          this.messageList[0].text = user.name;
          this.messageList[1].text = user.enter_year;
          this.messageList[2].text = user.acadamy;
          this.messageList[3].text = user.dept;
        })
        .catch(err => {
          console.log(err);
        });
    },
    myPublish() {
      this.$router.push({
        path: "/myPublish"
      });
    },
    createBidding() {
      this.$router.push({
        path: "/createBidding"
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.token = localStorage.getItem("token");
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/center.scss";
</style>
