<template>
  <div class="category">
    <div class="category-list-box">
      <div
        class="category-box"
        v-for="(category,index) in categoryList"
        @click="search(index)"
        :key="index"
      >
        <p>{{category.name}}</p>
      </div>
    </div>
    <div class="product-list-box">
      <div class="category-bar">{{currentCategory}}</div>
      <div class="product-list">
        <div
          class="product"
          v-for="(product,index) in productList"
          :key="index"
          @click="detail(product)"
        >
          <div class="img-box">
            <img
              :src="product.banner_url != null ? 'http://monkeytech.tech:8082'+product.banner_url[0] : ''"
              class="product-img"
            >
          </div>
          <div class="product-msg">
            <p class="product-name" v-html="product.name"></p>
            <span class="money">
              <span class="symbol">￥</span>
              {{product.curr_price == "" ? product.curr_price : product.start_price}}
              {{product.state == 'ready' ? '(准备开始)' : '(正在拍卖)'}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "category",
  data() {
    return {
      categoryList: [],
      currentCategory: "",
      productList: []
    };
  },
  methods: {
    ...mapActions(["getCategory", "getCategoryProduct"]),
    search(index) {
      this.productList = [];
      let category = this.categoryList[index];
      this.currentCategory = category.name;
      this.getCategoryProduct(category.id)
        .then(data => {
          const products = data.data;
          products.forEach(v => {
            if (v.banner_url != "" && v.banner_url != null) {
              v.banner_url = v.banner_url.split(",");
            }
            if (v.state == "ready" || v.state == "bidding") {
              v.state = "(正在拍卖)";
            } else {
              v.state = "(流拍)";
            }
          });
          products.forEach((v, index) => {
            if (v.is_active !== false) {
              this.productList.push(v);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
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
          this.categoryList = category;
        })
        .catch(err => {
          console.log(err);
        });
    },
    indexSearch(id) {
      this.getCategoryProduct(id)
        .then(data => {
          const products = data.data;
          products.forEach(v => {
            if (v.banner_url != "" && v.banner_url != null) {
              v.banner_url = v.banner_url.split(",");
            }
            if (v.state == "ready") {
              v.state = "(准备拍卖)";
            } else if (v.state == "bidding") {
              v.state = "(正在拍卖)";
            } else {
              v.state = "(流拍)";
            }
          });
          products.forEach((v, index) => {
            if (v.is_active !== false) {
              this.productList.push(v);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {},
  watch: {},
  mounted() {
    if (this.$route.query.name) {
      const categroy = this.$route.query;
      this.currentCategory = categroy.name;
      this.indexSearch(categroy.id);
    }
    this.category();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/category.scss";
</style>
