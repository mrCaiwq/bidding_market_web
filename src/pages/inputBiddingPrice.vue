<template>
  <div class="inputBiddingPrice">
    <div class="input-box">
      <input
        type="number"
        v-model="msg.price"
        class="price"
        :placeholder="'竞拍价格需高于('+current_price+'元)'"
      >
      <div class="button-box">
        <div class="back" @click="back()">返回</div>
        <div class="bidding" @click="bidding()">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "inputBiddingPrice",
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
      this.$router.back(-1);
    },
    bidding() {
      this.postBidding(this.msg)
        .then(data => {
          alert("竞价成功");
          this.$router.push({
            path: "/bidding"
          });
        })
        .catch(err => {
          if (err.code == 412) {
            this.$router.back(-1);
          }
        });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.msg.product_id = this.$route.query.val.id;
    this.current_price = this.$route.query.val.curr_price;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/inputBiddingPrice.scss";
</style>
