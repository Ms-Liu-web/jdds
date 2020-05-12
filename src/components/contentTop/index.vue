<template>
  <div>
    <div class="app-nav">
      <div class="lie">
        <span>
          <img src="../../assets/icon/xj1.png" />
        </span>
        <div class="text_p">
          <p class="p1">代理级别</p>
          <p class="p2">{{ user.level }}</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="lie">
        <span>
          <img src="../../assets/icon/xj2.png" />
        </span>
        <div class="text_p">
          <p class="p1">拿卡折扣</p>
          <p class="p2">{{ user.discount }}%</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="lie">
        <span>
          <img src="../../assets/icon/xj3.png" />
        </span>
        <div class="text_p">
          <p class="p1">余额</p>
          <p class="p2">{{ user.balance }}</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.userInfo;
      // return JSON.parse(localStorage.getItem("user"));
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-nav {
  width: 100%;
  height: 78px;
  background-color: #fff;
  margin-bottom: 18px;
  padding: 0 23px;
  .lie {
    padding-top: 15px;
    margin-right: 120px;
    float: left;
    span {
      float: left;
      display: inline-block;
      width: 48px;
      height: 48px;
      margin-right: 10px;
    }
    .text_p {
      float: left;
      .p1 {
        font-size: 14px;
        color: #999;
        line-height: 23px;
      }
      .p2 {
        font-size: 22px;
        color: #3564c0;
      }
    }
  }
}
</style>
