<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="logo2.png" width="60px" />
          <br />欢迎使用Annaer后台系统
        </h3>
      </div>
      <el-form-item prop="user">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="user"
          v-model="loginForm.user"
          placeholder="请输入账号"
          name="user"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="captcha">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input
          v-model="loginForm.captcha"
          placeholder="验证码"
          prefix-icon="lj-icon-yanzhengma"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          maxlength="4"
          style=" width: 320px;"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd">
          <div class="captcha_code">
            <img :src="captchaimg" @click="changeCode" />
          </div>
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { login, captcha } from "@/api/user";
export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      logoUrl: "http://localhost:8084/logo2.png",
      loginForm: {
        password: "",
        user: "",
        captcha: "",
        type: 2
      },
      loginRules: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
            validator: validatePassword
          }
        ],
        captcha: [{ required: true, trigger: "blur", message: "请输入验证码" }]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      captchaimg: null
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    this.getcaptcha();
    this.saasToken = this.$route.query.token;
    if (this.saasToken) {
      this.loginTokenHandle();
    } else {
      this.isHidden = false;
    }
  },

  mounted() {
    if (this.loginForm.user === "") {
      this.$refs.user.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    loginTokenHandle() {
      const loading = this.$loading({
        lock: true,
        text: "请稍后，正在登录代理系统！",
        background: "rgb(218, 218, 218)"
      });
      const postData = { token: this.saasToken };
      this.$store
        .dispatch("user/loginToken", postData)
        .then(() => {
          setTimeout(() => {
            loading.close();
            this.$router.push({ path: "/" });
          }, 2000);
        })
        .catch(() => {
          // this.loading = false
        });
    },
    getcaptcha() {
      this.captchaimg =
        process.env.VUE_APP_BASE_API + "/captcha?" + Math.random();
    },
    changeCode() {
      this.getcaptcha();
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= "a" && key <= "z") ||
          (!shiftKey && key >= "A" && key <= "Z")
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(response => {
              console.log(response);
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    goSaasLogin() {
      window.location.href = "http://www.apiyz.com:2222/login?logout=1";
    }
  }
};
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
