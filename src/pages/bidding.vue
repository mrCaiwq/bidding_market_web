<template>
  <div class="bidding">
    <div class="topBar">我参与的拍卖</div>
    <div class="my-bidding-box">
      <div
        class="bidding-product"
        v-for="(product,index) in productList"
        :key="index"
        @click="detail(product.Product.id)"
      >
        <img :src="'http://monkeytech.tech:8082'+product.banner_url" class="product-img">
        <div class="product-msg">
          <p class="product-name" v-html="product.Product.name"></p>
          <span class="money">
            <span class="symbol">￥</span>
            {{product.price}}
            {{product.state == 'ready' ? '(准备开始)' : '(正在拍卖)'}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "bidding",
  data() {
    return {
      productList: []
    };
  },
  methods: {
    ...mapActions(["getMyBidding"]),
    getBidding() {
      this.getMyBidding()
        .then(data => {
          const myBidding = data.data;
          myBidding.forEach(v => {
            if (v.state == "ready" || v.state == "bidding") {
              v.state = "(正在拍卖)";
            } else {
              v.state = "(流拍)";
            }
          });
          this.productList = myBidding;
        })
        .catch(err => {});
    },
    detail(id) {
      this.$router.push({
        path: "/detail",
        query: { id: id }
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.getBidding();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bidding.scss";
</style>
