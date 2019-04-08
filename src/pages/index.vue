<template>
  <div class="index">
    <div class="topBar">
      首页
      <!-- <input type="text" v-model="searchText" class="search-text" placeholder="请输入要搜索的商品名"> -->
    </div>
    <div class="category-box">
      <div
        class="category"
        @click="searchCategory(category)"
        v-for="(category,index) in categoryList"
        :key="index"
      >
        <img
          :src="category.name ? require('@/assets/example.png') : require('@/assets/stay-tuned.png')"
          class="photo"
        >
        <p class="category-name" v-html="category.name"></p>
      </div>
      <div class="more-category">全部分类</div>
    </div>
    <div class="recommend-box">
      <div class="recommend-top-bar">首页推荐</div>
      <div class="replace" v-if="productList.length != 0">
        <p @click="replace">换一组</p>
        <img src="../assets/replace.png">
      </div>
      <div
        class="product-box"
        v-for="product in showList"
        :key="product.index"
        @click="detail(product)"
      >
        <img
          :src="product.banner_url != null ? 'http://monkeytech.tech:8082'+product.banner_url[0] : ''"
        >
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
  name: "index",
  data() {
    return {
      searchText: "",
      categoryList: [{}, {}, {}, {}, {}, {}, {}, {}],
      productList: [],
      showList: []
    };
  },
  methods: {
    ...mapActions(["getCategory", "getProduct"]),
    searchCategory(val) {
      this.$router.push({
        path: "/category",
        query: val
      });
    },
    replace() {
      let count = this.productList.length;
      let productList = this.productList.concat();
      this.showList = [];
      for (let i = 0; i <= 10; i++) {
        let index = parseInt(Math.random() * count) + i;
        this.showList.push(productList[index]);
        productList[index] = productList[i];
        count--;
      }
    },
    detail(val) {
      this.$router.push({
        path: "/detail",
        query: val
      });
    },
    category() {
      this.getCategory()
        .then(data => {
          const category = data.data;
          if (category.length > 0) {
            this.categoryList = [];
            for (let i = 0; i < 8; i++) {
              if (category[i]) {
                this.categoryList.push(category[i]);
              } else {
                this.categoryList.push({});
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    product() {
      this.getProduct()
        .then(data => {
          const product = data.data;
          product.forEach(v => {
            if (v.banner_url != "" && v.banner_url != null) {
              v.banner_url = v.banner_url.split(",");
            }
            if (v.state == "ready" || v.state == "bidding") {
              v.state = "(正在拍卖)";
            } else {
              v.state = "(流拍)";
            }
          });
          this.productList = product;
          this.showList = product.slice(0, 10);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.category();
    this.product();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/index.scss";
</style>
