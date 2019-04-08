<template>
  <div class="bottomBanner">
    <div class="icon-box" v-for="barImg in imgList" @click="go(barImg.path)" :key="barImg.index">
      <img :src="barImg.active ? barImg.activeImg : barImg.img">
      <p v-html="barImg.name"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottomBanner",
  data() {
    return {
      imgList: [
        {
          name: "首页",
          activeImg: require("@/assets/index1.png"),
          img: require("@/assets/index0.png"),
          path: "/",
          active: true
        },
        {
          name: "分类",
          activeImg: require("@/assets/category1.png"),
          img: require("@/assets/category0.png"),
          path: "/category",
          active: false
        },
        {
          name: "拍卖",
          activeImg: require("@/assets/bidding1.png"),
          img: require("@/assets/bidding0.png"),
          path: "/bidding",
          active: false
        },
        {
          name: "我的",
          activeImg: require("@/assets/my1.png"),
          img: require("@/assets/my0.png"),
          path: "/myCenter",
          active: false
        }
      ]
    };
  },
  methods: {
    go(val) {
      if (this.$route.path == val) {
        return;
      }
      this.$router.push({
        path: val
      });
    }
  },
  watch: {
    "$route.path": function(val) {
      this.imgList.forEach(v => {
        if (v.path == val) {
          v.active = true;
        } else {
          v.active = false;
        }
      });
    }
  },
  computed: {},
  mounted() {
    this.imgList.forEach(v => {
      if (v.path == this.$route.path) {
        v.active = true;
      } else {
        v.active = false;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottomBanner.scss";
</style>
