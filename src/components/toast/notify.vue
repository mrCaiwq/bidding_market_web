<template>
  <div class="notify-box">
    <transition name="fade">
      <div class="msg-box" v-if="isShow" v-html="alertMsg"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isShow: false,
      alertMsg: ""
    };
  },
  props: ["message"],
  methods: {},
  computed: {},
  watch: {
    message(val) {
      if (val) {
        this.isShow = true;
        this.alertMsg = val;
        clearTimeout(param);
        let param = setTimeout(() => {
          this.$emit("cleanMessage", "");
          this.isShow = false;
        }, 2000);
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/notify.scss";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
