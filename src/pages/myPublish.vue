<template>
  <div class="myPublish">
    <div class="topBar">我的拍卖物品</div>
    <div class="my-bidding-box">
      <div
        class="bidding-product"
        v-for="(product,index) in productList"
        :key="index"
        @click="detail(product.id)"
      >
        <img :src="'http://monkeytech.tech:8082'+product.banner_url[0]" class="product-img">
        <div class="product-msg">
          <p class="product-name" v-html="product.name"></p>
          <span class="money">
            <span class="symbol">￥</span>
            {{product.curr_price}}
            {{product.state}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "myPublish",
  data() {
    return {
      productList: []
    };
  },
  methods: {
    ...mapActions(["getMyPublish"]),
    detail(id) {
      this.$router.push({
        path: "/detail",
        query: { id: id }
      });
    },
    getProduct() {
      this.getMyPublish()
        .then(data => {
          let product = data.data;
          product.forEach(v => {
            v.banner_url = v.banner_url.split(",");
            if (v.is_active === true) {
              if (v.state == "ready" || v.state == "bidding") {
                v.state = "(正在拍卖)";
              } else {
                v.state = "(流拍)";
              }
            } else {
              v.state = "(等待审核)";
            }
          });
          this.productList = product;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.getProduct();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/myPublish.scss";
</style>
