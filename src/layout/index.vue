<template>
  <div :class="classObj" class="app-wrapper" id="appWrapper" ref="appWrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <div :class="{ 'fixed-header': fixedHeader }">
      <navbar @gethover="getmenuHover" />
      <!-- <tags-view v-if="needTagsView" /> -->
    </div>
    <saas-menu :ishover="hmenu" />
    <div class="main-container" :class="{'hiddenClass2':hiddenClass}">
      <div :class="[modalhover == '1' ? 'hover_saas' : '']" @click="hiddenModal"></div>
      <sidebar class="sidebar-container" :class="{'hiddenClass':hiddenClass}" />
      <div class="shou_img" @click="activeMenu" :class="{'hiddenimg':hiddenClass}">
        <img v-if="!hiddenClass" src="../assets/icon/shou.png" />
        <img v-if="hiddenClass" src="../assets/icon/shou2.png" />
      </div>
      <app-main />
      <footer class="footer">版权所有@四川聚达鼎盛科技有限公司</footer>
    </div>
  </div>
</template>

<script>
import bus from "./components/bus";
import { login } from "@/api/user";
import RightPanel from "@/components/RightPanel";
import { AppMain, Navbar, Sidebar, SaasMenu } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";

export default {
  name: "Layout",
  data() {
    return {
      modalhover: "",
      hmenu: "0",
      hiddenClass: false,
      hiddenClass2: false,
      hiddenimg: false
    };
  },
  components: {
    AppMain,
    Navbar,
    Sidebar,
    SaasMenu
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  mounted() {
    let _this = this;
    bus.$on("hoverSJ", function(msg) {
      this.$nextTick(() => {
        _this.hmenu = 1;
      });
    });

    bus.$on("clickSJ", function(msg) {
      this.$nextTick(() => {
        if (_this.hmenu == 1) {
          _this.hmenu = 0;
          _this.modalhover = "";
        } else {
          _this.hmenu = 1;
          _this.modalhover = "1";
        }
      });
    });
    // this.lock();
  },
  methods: {
    // lock() {
    //   login().then(response => {
    //     console.log(response);
    //   });
    // },
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    getmenuHover(msg) {
      this.modalhover = msg;
      this.$refs.appWrapper.style = "overflow-y:hidden";
    },
    hiddenModal() {
      this.modalhover = "0";
      this.hmenu = "0";
      this.$refs.appWrapper.style = "overflow-y:auto";
    },
    activeMenu(a) {
      this.hiddenClass = !this.hiddenClass;
      this.hiddenClass2 = !this.hiddenClass2;
      this.hiddenimg = !this.hiddenimg;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.shou_img {
  position: fixed;
  top: 45%;
  left: 180px;
  z-index: 9;
  cursor: pointer;
}
.hiddenClass {
  pointer-events: none;
  transition-duration: 0.3s;
  transform: translate3d(-210px, 0, 0);
}
.hiddenClass2 {
  margin-left: 0px !important;
}
.hiddenimg {
  left: 0px !important;
}
.footer {
  // position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 70px;
  line-height: 70px;
  color: #999;
}
.hover_saas {
  position: absolute;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  visibility: visible;
  left: 0;
  top: 0;
  opacity: 1;
  transition: opacity 0.25s ease-in-out 0s;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  // width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  // width: calc(100% - 54px);
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
