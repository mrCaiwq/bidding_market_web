<template>
  <div class="productDetail">
    <div class="topBar">
      <div class="back-button">
        <img src="@/assets/back.png" @click="back()">
      </div>商品详情
    </div>
    <div class="product-box">
      <div class="banner">
        <swiper :options="swiperOption" v-if="product.banner_url.length > 0">
          <swiper-slide v-for="(img,index) in product.banner_url" :name="index" :key="index">
            <img :src="'http://monkeytech.tech:8082'+img">
          </swiper-slide>
        </swiper>
      </div>
      <div class="product-detail">
        <p class="name" v-html="product.name"></p>
        <span class="money">
          <span class="symbol">￥</span>
          {{product.curr_price}}
        </span>
        <div class="time-box">
          <span v-html="'剩余时间: '+time"></span>
        </div>
      </div>
      <div class="current-price-box">
        <span class="start-price">
          <span>起拍价：</span>
          <span class="start-price-symbol">￥</span>
          {{product.start_price}}
        </span>
        <span class="current-price">
          <span>当前价：</span>
          <span class="symbol">￥</span>
          {{product.curr_price}}
        </span>
      </div>
      <div class="product-description">
        <div class="recommend-top-bar">商品介绍</div>
        <p v-html="product.description"></p>
      </div>
    </div>
    <div class="notify-box">
      <transition name="fade">
        <div class="msg-box" v-if="isShow">
          竞拍价:
          <input
            type="number"
            v-model="biddingMsg.price"
            placeholder="请输入你的拍卖价格"
            class="bidding-price"
          >
          <div class="button-box">
            <div class="close" @click="close()">关闭</div>
            <div class="bidding" @click="send()">竞价</div>
          </div>
        </div>
      </transition>
    </div>
    <div class="biddingButton" @click="bidding()">立即竞价</div>
  </div>
</template>

<script>
var clock;
import { mapActions } from "vuex";
export default {
  name: "productDetail",
  data() {
    return {
      product: {
        banner_url: [],
        name: "Ms西北2/3区追忆天4深渊恶魔超时空海伯伦12地狱武器鬼泣+牡丹1",
        curr_price: 3000,
        startTime: "2019-03-21 15:00:00",
        duration: 100,
        description:
          "可以利用独有的技能“死亡抗拒”在自己濒临死亡时为自己补血，而且有“血气唤醒”技能让他们在血越少的时刻能力越强。且精通二刀流（即技能“血之狂暴”，可在一次攻击中造成双重伤害，且容易获得高评分）。”暴走“技能大幅弥补了狂战士在速度上的不足，在使用巨型武器的同时使用此技能，灵活性将仅次于剑魂。其极高的物理伤害， 以及大范围杀伤技能，让面对他的每一个对手都不寒而栗。"
      },
      time: "",
      biddingMsg: {
        product_id: "",
        price: 0
      },
      isShow: false,
      swiperOption: {
        //swiper3
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        speed: 1000,
        loop: true
      }
    };
  },
  methods: {
    ...mapActions(["getDetail", "postBidding"]),
    getProduct(id) {
      console.log(id);
      this.getDetail(id)
        .then(data => {
          this.product = data.data;
          this.product.banner_url = data.data.banner_url.split(",");
          this.product.banner_url.splice(this.product.banner_url.length - 1, 1);
          this.biddingMsg.product_id = data.data.id;
          this.biddingMsg.price = data.data.curr_price;
        })
        .catch(err => {
          console.log(err);
        });
      this.countDown();
      clock = setInterval(() => {
        this.countDown();
      }, 1000);
    },
    back() {
      this.$router.back(-1);
    },
    countDown() {
      let start = new Date(this.product.createdAt).getTime();
      let enterTime = new Date().getTime();
      let duration = this.product.duration * 3600000;
      let current = start + duration - enterTime;
      if (current <= 0) {
        window.clearTimeout(clock);
      }
      let day = Math.floor(
        (start + duration - enterTime) / 1000 / 60 / 60 / 24
      );
      let hour = Math.floor(
        ((start + duration - enterTime) / 1000 / 60 / 60) % 24
      );
      let min = Math.floor(((start + duration - enterTime) / 1000 / 60) % 60);
      let second = Math.floor(((start + duration - enterTime) / 1000) % 60);
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (second < 10) {
        second = "0" + second;
      }
      this.time = day + "天" + " " + hour + ":" + min + ":" + second;
    },
    bidding() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    send() {
      this.postBidding(this.biddingMsg)
        .then(data => {
          alert("竞价成功");
          this.isShow = false;
          this.getProduct(this.$route.query.id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {},
  computed: {},
  destroyed() {
    window.clearTimeout(clock);
  },
  mounted() {
    this.getProduct(this.$route.query.id);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/productDetail.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
