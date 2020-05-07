<template>
  <div class="dashboard-container">
    <div class="notice">
      <span>
        <img src="../../assets/icon/icon7.png" />
        系统公告：
      </span>
      <div class="box">
        <div class="wrap" id="wrap">
          <div id="box">
            <div id="marquee" ref="marquee">sssssssssssss</div>
          </div>
        </div>
      </div>
    </div>
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "./admin";
import editorDashboard from "./editor";

export default {
  name: "Dashboard",
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: "adminDashboard"
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editorDashboard";
    }
  }
};
</script>
<style lang="scss" scoped>
.notice {
  width: 100%;
  height: 52px;
  line-height: 52px;
  box-shadow: 0px 0px 8px 0px rgba(81, 123, 253, 0.1);
  border-radius: 4px;
  padding: 0 50px;
  background-color: #fff;
  color: #4d4d4d;
  box-sizing: border-box;
  span {
    color: #3c70d5;
    font-weight: 500;
    font-size: 16px;
    float: left;
    img {
      position: relative;
      top: 2px;
    }
  }
  .box {
    overflow: hidden;
    .animate {
      padding-left: 55px;
      font-size: 14px;
      color: #4d4d4d;
      display: inline-block;
      white-space: nowrap;
      animation: 20s wordsLoop linear infinite normal;
    }

    @keyframes wordsLoop {
      0% {
        transform: translateX(200px);
        -webkit-transform: translateX(200px);
      }
      100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
      }
    }

    @-webkit-keyframes wordsLoop {
      0% {
        transform: translateX(200px);
        -webkit-transform: translateX(200px);
      }
      100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
      }
    }
  }
}
</style>
