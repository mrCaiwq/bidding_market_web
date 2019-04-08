<template>
  <div class="biddingButton" @click="bidding()">立即竞价</div>
</template>

<script>
export default {
  name: "biddingButton",
  data() {
    return {};
  },
  methods: {
    bidding() {
      this.$router.push({
        path: "/inputPrice",
        query: { val: this.$route.query }
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/css/biddingButton.scss";
</style>
