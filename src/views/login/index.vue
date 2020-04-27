<template>
  <div class="login-container">

    <el-row class="login-loading">

      <el-col :span="24"><div class="login-loading-icon"><i class="el-icon-warning"></i></div></el-col>
      <el-col :span="24"><div class="login-loading-text">亲！登录出错了啦，请返回重新登录。</div></el-col>
      <el-col :span="24"><div class="login-loading-span">返回saas平台&nbsp;&nbsp;|&nbsp;&nbsp;联系我们</div></el-col>
    </el-row>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { login, captcha, loginToken } from '@/api/user'
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      logoUrl: 'http://localhost:8084/logo2.png',
      loginForm: {
        password: '',
        user: '',
        captcha: '',
        type: 2,
      },
      loginRules: {
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码', validator: validatePassword }],
        captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      captchaimg: null,
      saasToken: '',
    }
  },
  created() {
    this.saasToken = this.$route.query.token
    if (this.saasToken) {
      this.loginTokenHandle()
    }
  },
  mounted() {},
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    loginTokenHandle() {
      const loading = this.$loading({
        lock: true,
        text: '请稍后，正在登录代理系统！',
        background: 'rgb(218, 218, 218)',
      })
      const postData = { token: this.saasToken }
      this.$store
        .dispatch('user/loginToken', postData)
        .then(() => {
          setTimeout(() => {
            loading.close()
            this.$router.push({ path: '/' })
          }, 2000)
        })
        .catch(() => {
          // this.loading = false
        })
    },
    getcaptcha() {
      this.captchaimg = process.env.VUE_APP_BASE_API + '/captcha?' + Math.random()
    },
    changeCode() {
      this.getcaptcha()
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if ((shiftKey && (key >= 'a' && key <= 'z')) || (!shiftKey && (key >= 'A' && key <= 'Z'))) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

.el-loading-spinner .el-loading-text {
  color: #2d6afa;
  margin: 3px 0;
  font-size: 25px;
}
.login-loading {
  margin-top: 300px;
  line-height: 40px;
  text-align: center;
}
.login-loading-text {
  color: #fff;
  font-size: 24px;
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
