<template>
  <div
    class="saas-menu menu_style"
    id="saasMenu"
    :class="[ishover == '1'?'hoverMenu':'hiddenMenu']"
  >
    <div class="saas_logo">SAAS管理系统</div>
    <ul>
      <li
        v-for="(list , index ) in menu"
        :key="index"
        @mouseenter.native="changeImageSrc"
        @mouseleave.native="changeImageSrc"
      >
        <a :href="list.href">
          <svg-icon :icon-class="list.icon" />
          {{list.name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from "../components/bus";
import { saasurl } from "@/utils/saas-link";
export default {
  props: ["ishover"],
  data() {
    return {
      menu: [
        {
          icon: "sy",
          name: "首页",
          href: saasurl
        },
        { icon: "cp", name: "产品中心", href: saasurl + "product" },
        { icon: "buy", name: "我的产品", href: saasurl + "mybuy" },
        { icon: "order", name: "我的订单", href: saasurl + "order" },
        { icon: "mx", name: "交易明细", href: saasurl + "transaction" },
        { icon: "msg", name: "消息通知", href: saasurl + "news" }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.hoverMenu {
  display: block !important;

  animation: hideIndex 0.3s;
  -moz-animation: hideIndex 0.3s; /* Firefox */
  -webkit-animation: hideIndex 0.3s; /* Safari and Chrome */
  -o-animation: hideIndex 0.3s; /* Opera */
}
@keyframes hideIndex {
  0% {
    opacity: 0;
    transform: translate(-212px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

.hiddenMenu {
  display: none !important;
}
.saas-menu {
  position: absolute;
  z-index: 9;
  left: 0;
  top: 64px;
}
.menu_style {
  width: 180px;
  background-color: #fff;
  height: 100%;
  display: none;
  transition: all 0.25s ease-in-out 0s;
  ul li {
    height: 70px;
    line-height: 70px;
    padding-left: 45px;
    list-style: none;
    img {
      position: relative;
      top: 3px;
      margin-right: 8px;
    }
    a {
      color: #666;
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }
  }
  ul li:hover {
    background: #f4f7fe;
    a {
      color: #3564c0;
    }
  }
  .saas_logo {
    height: 73px;
    line-height: 73px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #666;
    border-bottom: 1px #eef0f4 solid;
  }
}
</style>



