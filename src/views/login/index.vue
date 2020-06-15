<template>
  <div class="login-container">
    <el-row class="login-loading" :hidden="isHidden">
      <el-col :span="24">
        <div class="login-loading-icon">
          <i class="el-icon-warning" />
        </div>
      </el-col>
      <el-col :span="24">
        <div class="login-loading-text">亲！该系统登录拥挤，请稍后再试！</div>
        <el-button type="danger" @click="goSaasLogin">点击返回</el-button>
      </el-col>
      <el-col :span="24">
        <div class="login-loading-span">联系我们</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
// import { login, captcha } from '@/api/user'
import { saasurl } from '@/utils/saas-link'
export default {
  name: 'Login',
  data() {
    return {
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      captchaimg: null,
      isHidden: true
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    this.saasToken = this.$route.query.token
    if (this.saasToken) {
      this.loginTokenHandle()
    } else {
      this.isHidden = false
    }
  },

  mounted() {},
  destroyed() {},
  methods: {
    loginTokenHandle() {
      // const loading = this.$loading({
      //   lock: true,
      //   text: '请稍后，正在登录代理系统！',
      //   background: 'rgb(218, 218, 218)'
      // })
      const postData = { token: this.saasToken }
      this.$store
        .dispatch('user/loginToken', postData)
        .then(() => {
          // setTimeout(() => {
          //   loading.close();
          //   this.$router.push({ path: "/" });
          // }, 2000);
          console.log('代理系统登录')
          // window.parent.postMessage(
          //   { type: 'loginToken', service: 'agent' },
          //   saasurl
          // )
          this.$router.push({ path: '/' })
        })
        .catch(() => {
          // this.loading = false
        })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    goSaasLogin() {
      window.location.href = saasurl + '/login?logout=1'
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.login-loading {
  margin-top: 300px;
  line-height: 40px;
  text-align: center;
}
.login-loading-text {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
}

.login-loading-span {
  color: #ccc;

  font-size: 14px;
}
.login-loading-icon {
  color: #ff4343;
  font-size: 57px;
  line-height: 90px;
}
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
