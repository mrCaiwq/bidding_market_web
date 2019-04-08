<template>
  <div class="createBidding">
    <div class="topBar">创建拍卖</div>
    <div class="register-box">
      <div class="outer-box">
        <div class="product-name">商品名</div>
        <input
          type="text"
          @focus="isFocus()"
          @blur="isBlur()"
          class="form-input"
          v-model="biddingMsg.name"
          placeholder="请输入商品名"
        >
      </div>
      <div class="outer-box">
        <div class="product-start-price">起拍价</div>
        <input
          type="number"
          class="form-input"
          v-model="biddingMsg.start_price"
          placeholder="请输入起拍价"
          @focus="isFocus()"
          @blur="isBlur()"
        >
      </div>
      <div class="outer-box">
        <div class="product-start-price">时间</div>
        <input
          type="number"
          class="form-input"
          v-model="biddingMsg.duration"
          placeholder="请输入拍卖持续时间(小时)"
          @focus="isFocus()"
          @blur="isBlur()"
        >
      </div>
      <div class="outer-box">
        <div class="product-category">分类</div>
        <select class="select-box" @change="selectCategory($event)">
          <option v-for="(i,index) in categoryList" :value="i.id" v-html="i.name" :key="index"></option>
        </select>
      </div>
      <div class="outer-box">
        <div class="product-start-price">图片</div>
        <input
          type="file"
          multiple="multiple"
          id="selectImg"
          class="form-file"
          @change="fileImage($event)"
          placeholder="商品图片"
          v-show="false"
        >
        <label for="selectImg" class="select-button">上传图片</label>
        点击图片可删除
      </div>
      <div class="img-show-box">
        <img :src="i" v-for="(i,index) in images" @click="deleteImg(index)" :key="index">
      </div>
      <div class="outer-box">
        <div class="description">描述</div>
        <textarea
          cols="15"
          rows="6"
          class="description-input"
          v-model="biddingMsg.description"
          placeholder="请输入商品描述"
          @focus="isFocus()"
          @blur="isBlur()"
        ></textarea>
      </div>
      <div class="register-button" @click="create()">创建</div>
    </div>
    <notify :message="msg" v-on:cleanMessage="cleanMsg" v-show="msg != ''"></notify>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "createBidding",
  data() {
    return {
      biddingMsg: {
        name: "",
        description: "",
        start_price: "",
        duration: "",
        category_id: "",
        file: []
      },
      images: [],
      categoryList: [],
      msg: ""
    };
  },
  methods: {
    ...mapActions(["createPublish", "change", "getCategory"]),
    cleanMsg(val) {
      this.msg = val;
    },
    fileImage(val) {
      for (let i = 0; i < val.target.files.length; i++) {
        let file = val.target.files[i];
        var reader = new FileReader();
        var windowURL = window.URL || window.webkitURL;
        var dataURL = windowURL.createObjectURL(file);
        this.images.push(dataURL);
        this.biddingMsg.file.push(val.target.files[i]);
      }
    },
    create() {
      this.biddingMsg.duration = parseInt(this.biddingMsg.duration);
      this.biddingMsg.start_price = parseInt(this.biddingMsg.start_price);
      let param = new FormData();
      param.append("name", this.biddingMsg.name);
      param.append("description", this.biddingMsg.description);
      param.append("duration", this.biddingMsg.duration);
      param.append("start_price", this.biddingMsg.start_price);
      param.append("category_id", this.biddingMsg.category_id);
      this.biddingMsg.file.forEach(v => {
        param.append("file", v);
      });
      this.createPublish(param)
        .then(data => {
          this.msg = "创建成功";
          setTimeout(() => {
            this.$router.push({
              path: "/myPublish"
            });
          }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    category() {
      this.getCategory()
        .then(data => {
          const category = data.data;
          this.categoryList = category;
          this.biddingMsg.category_id = category[0].id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteImg(val) {
      this.images.splice(val, 1);
      this.biddingMsg.file.splice(val, 1);
    },
    selectCategory(val) {
      this.biddingMsg.category_id = val.target.value;
    },
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
    this.category();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/createBidding.scss";
</style>
