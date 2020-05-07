<template>
  <div class="navbar">
    <el-header class="navbar2">
      <div class="navbar_left">
        <span class="toggle-button">
          <img src="../../assets/icon/i.png" />
        </span>
        <span class="time_s">
          <img src="../../assets/icon/icon3.png" />
          上次登陆时间：
        </span>
      </div>
      <div class="navbar_right">
        <span style="cursor:pointer">
          <img src="../../assets/icon/retrunindex.png" />
          首页
        </span>
        <span>
          <img src="../../assets/icon/icon9.png" />
          帮助中心
        </span>
        <span>
          <img src="../../assets/icon/kf.png" />
          联系客服
        </span>
        <span class="user_title">
          <img src="../../assets/icon/usert.png" class="user-avatar" />

          <span class="name">
            <img src="../../assets/icon/icon24.png" />
          </span>
          <div style="clear:both"></div>
          <div class="name_hover">
            <ul>
              <li>
                <router-link to="/infoModify" tag="div">
                  <img src="../../assets/icon/jichuxinxi.png" />基础信息修改
                </router-link>
              </li>
              <li>
                <router-link to="/passwordModify" tag="div">
                  <img src="../../assets/icon/mimaxiugai.png" />登陆密码修改
                </router-link>
              </li>
              <li>
                <router-link to="/payment" tag="div">
                  <img src="../../assets/icon/zhifumima.png" />设置支付密码
                </router-link>
              </li>
              <li>
                <router-link to="/paymentModify" tag="div">
                  <img src="../../assets/icon/genggai.png" />更改支付密码
                </router-link>
              </li>
              <li>
                <router-link to="/proposal" tag="div">
                  <img src="../../assets/icon/tijiaojianyi.png" />提交建议
                </router-link>
              </li>
              <li>
                <img src="../../assets/icon/tuichi.png" />退出登陆
              </li>
            </ul>
          </div>
        </span>
      </div>
    </el-header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background: #fff;
  /deep/.el-header {
    padding: 0;
  }
  .navbar2 {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    height: 64px !important;
    background-color: #fff;
    line-height: 64px;
    color: #838892;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
    min-width: 1300px;
    .navbar_left {
      float: left;
      .toggle-button {
        width: 64px;
        height: 64px;
        display: inline-block;
        background-color: #6ebaff;
        float: left;
        margin-right: 16px;
        .rotate {
          transition: all 1s;
          transform: rotateZ(180deg);
        }
        img {
          position: relative;
          top: 4px;
          width: 23px;
          left: 17px;
        }
        img:hover {
          cursor: pointer;
        }
      }
      .time_s {
        img {
          position: relative;
          top: 1px;
          margin-right: 5px;
          width: 14px;
        }
      }
    }
    .navbar_right {
      float: right;
      margin-right: 43px;
      span {
        margin-left: 60px;
        vertical-align: middle;
        cursor: pointer;
        img {
          margin-right: 5px;
          width: 16px;
          position: relative;
          top: 3px;
        }
      }
    }
  }
  .user_title {
    position: relative;
    height: 64px;
    float: right;
    .name {
      line-height: 40px;
      margin-left: 0 !important;
      img {
        width: 12px;
        height: 7px;
        top: 0 !important;
      }
    }
    .name_hover {
      position: absolute;
      background-color: #fff;
      width: 163px;
      height: 225px;
      box-shadow: 0px 0px 8px 0px rgba(95, 97, 103, 0.1);
      border-radius: 4px;
      z-index: 99;
      right: -3px;
      display: none;
      ul li {
        height: 44px;
        font-size: 14px;
        color: #444;
        line-height: 44px;
        cursor: pointer;
        list-style: none;
        img {
          position: relative;
          top: 2px;
          margin-left: 20px;
        }
      }
      ul li:hover {
        background-color: #f2f6fe;
        color: #3c70d5;
      }
    }
  }
  .user_title:hover {
    .name_hover {
      display: block;
    }
  }
  .user_title img.user-avatar {
    cursor: pointer;
    width: 40px !important;
    height: 40px;
    border-radius: 10px;
    margin-top: 5px;
    float: left;
    top: 7px !important;
  }
}
</style>
