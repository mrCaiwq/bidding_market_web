<template>
  <div class="pay">
    <div class="topBar">
      <div class="back-button">
        <img src="@/assets/back.png" @click="back()">
      </div>支付
    </div>
    <div class="money-box">
      <p class="money-title">需支付金额</p>
      <span class="money">￥{{msg.price}}</span>
    </div>
    <div class="product-name-box">
      <p class="name">士大夫立刻就是独立访客的实力开发建设独立开发绝对是李开复离开对方就离开对方卢卡斯的积分扣篮大赛分类联发科昆仑山搭街坊拉开圣诞节法兰克斯的法兰克斯</p>
    </div>
    <div class="pay-button" @click="pay()">确认支付</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "pay",
  data() {
    return {
      current_price: 0,
      msg: {
        product_id: "",
        price: ""
      }
    };
  },
  methods: {
    ...mapActions(["postBidding"]),
    back() {
      this.$router.push({
        path: "/detail",
        query: { id: this.msg.product_id }
      });
    },
    pay() {
      this.postBidding(this.msg)
        .then(data => {
          alert("竞价成功,已支付");
          this.isShow = false;
          this.back();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.msg.product_id = this.$route.query.product_id;
    this.msg.price = this.$route.query.price;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/inputBiddingPrice.scss";
</style>
