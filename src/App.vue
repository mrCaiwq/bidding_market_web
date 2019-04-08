<template>
  <div id="app">
    <router-view/>
    <bottomBanner
      v-if="this.$route.path !== '/detail' && this.$route.path !== '/inputPrice' && this.$store.state.bottomState.isShow"
    />
    <!-- <biddingButton v-if="this.$route.path ==='/detail'"/> -->
  </div>
</template>

<script>
import bottomBanner from "@/components/bottomBanner";
import biddingButton from "@/components/biddingButton";
export default {
  name: "App",
  components: { bottomBanner, biddingButton }
};
</script>

<style>
html,
body,
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  color: #666;
  background: #fafafa;
  height: 100%;
  position: relative;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: #fff;
}
</style>
