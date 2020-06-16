<template>
  <div>
    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png">
        <span>基础设置</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="base_box"
        label-width="160px"
      >
        <el-form-item label="商品名称:" prop="wap_title">
          <el-input v-model="form.wap_title" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品域名:" prop="wap_domain">
          <el-input v-model="form.wap_domain" placeholder="请输入商品域名" />
        </el-form-item>
        <div class="fg_line">
          pid设置
          <span />
        </div>
        <el-form-item label="淘宝pid:" prop="i">
          <el-input v-model="form.tb_pid" placeholder="请输入淘宝pid" />
        </el-form-item>
        <el-form-item label="京东pid:" prop="">
          <el-input v-model="form.jd_pid" placeholder="请输入京东pid" />
        </el-form-item>
        <el-form-item label="拼多多pid:" prop="">
          <el-input v-model="form.pdd_pid" placeholder="请输入平多多pid" />
        </el-form-item>
        <div class="fg_line" style="margin-left: 68px;">
          token设置
          <span />
        </div>
        <el-form-item label="淘宝token:" prop="">
          <el-input v-model="form.tb_token" placeholder="请输入淘宝token" />
        </el-form-item>
        <el-form-item label="京东token:" prop="">
          <el-input v-model="form.jd_token" placeholder="请输入京东token" />
        </el-form-item>
        <el-form-item label="拼多多token:" prop="">
          <el-input v-model="form.pdd_token" placeholder="请输入拼多多token" />
        </el-form-item>
        <el-form-item label="公告设置:" prop="">
          <el-input
            v-model="form.wap_notice"
            placeholder="请输入"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="代码统计:" prop="">
          <div class="manage-codeInfo">
            <el-input
              v-model="form.wap_tj_code"
              type="textarea"
              placeholder="请输入"
            />
          </div>
        </el-form-item>
        <el-form-item class="btn_center">
          <el-button
type="primary"
@click="onSubmit('form')"
>确认保存</el-button>
        </el-form-item>
      </el-form>
      <!-- dialog弹框 -->
      <m-dialog width="400px" height="288px" :visible.sync="visible">
        <template v-slot:title>
          <img
            class="imgSize"
            src="../../assets/success-images/tc1.png"
            alt=""
          >
        </template>
        <template v-slot:content>
          <p class="dialogContent">恭喜你,保存成功!</p>
        </template>
        <template v-slot:footer>
          <div class="dialogFooterBtn">
            <el-button
type="primary"
plain
@click="handleClick"
>我知道了</el-button>
          </div>
        </template>
      </m-dialog>
    </div>
  </div>
</template>

<script>
// 设置基础信息
import { configEdit, getUserConfig } from '@/api/agent'
import waves from '@/directive/waves' // waves directive
var validateIp = (rule, value, callback) => {
  var reg1 = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
  if (value && !reg1.test(value)) {
    callback(new Error('请输入正确的ip，以http或https开头'))
  }
  callback()
}

export default {
  name: 'Seting',
  directives: { waves },
  data() {
    return {
      visible: false,
      form: {
        wap_title: '',
        wap_domain: '',
        tb_pid: '',
        jd_pid: '',
        pdd_pid: '',
        tb_token: '',
        jd_token: '',
        pdd_token: '',
        wap_notice: '',
        wap_tj_code: ''
      },
      rules: {
        wap_domain: [
          { validator: validateIp, trigger: 'blur' },
          {
            min: 3,
            message: '请输入正确的ip，以http或https开头',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getConfigInfo()
  },
  methods: {
    // 获取基本参数
    async getConfigInfo() {
      const res = await getUserConfig()
      const data = res.data
      if (res.code === 200) {
        this.form.wap_title = data.wap_title
        this.form.wap_domain = data.ip
        this.form.tb_pid = data.tb_pid
        this.form.jd_pid = data.jd_pid
        this.form.pdd_pid = data.pdd_pid
        this.form.tb_token = data.tb_token
        this.form.jd_token = data.jd_token
        this.form.pdd_token = data.pdd_token
        this.form.wap_notice = data.wap_notice
        this.form.wap_tj_code = data.wap_tj_code
      } else {
        this.$message({
          type: 'error',
          message: '获取信息失败'
        })
      }
    },
    // 修改基础设置
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { code } = await configEdit(this.form)
          if (code !== 200) {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          }
          this.visible = true
        } else {
          this.$message({
            type: 'error',
            message: '您输入的值不符合规则'
          })
        }
      })
    },
    handleClick() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .base_box {
    .el-form-item {
      margin-bottom: 13px !important;
    }
  }
}

.app-container {
  background-color: #fff;
  border-radius: 6px;
  min-height: calc(100vh - 250px);
  .fg_line {
    font-size: 18px;
    color: #3c70d5;
    margin-left: 84px;
    margin-top: 30px;
    margin-bottom: 19px;
    span {
      display: inline-block;
      width: 354px;
      height: 1px;
      border: 1px #dce7ff dashed;
      line-height: 25px;
      position: relative;
      top: -5px;
      margin-left: 13px;
    }
  }
  .title {
    height: 36px;
    line-height: 25px;
    border-bottom: 1px #dce7ff dashed;
    margin-bottom: 13px;
    color: #3c70d5;
    img {
      position: relative;
      top: 2px;
    }
  }
  .el-input--medium {
    text-align: left !important;
  }
  .base_box {
    width: 600px;
    margin-top: 36px;
    /deep/.el-form-item {
      margin-bottom: 10px;
    }
  }
  /deep/.el-form-item__label {
    font-size: 16px;
    color: #333;
    font-weight: 400;
  }
  /deep/.el-input__inner {
    width: 354px;
    height: 40px;
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 4px;
  }
  .btn_center {
    /deep/.el-form-item__content {
      text-align: center;
      margin-left: 0 !important;
      margin-top: 22px;
      width: 100%;
    }
  }
  /deep/.el-textarea__inner {
    width: 354px;
    height: 109px;
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 4px;
    resize: none；;
    padding: 0;
    margin: 0;
  }
  .manage-codeInfo {
    /deep/.el-textarea__inner {
      width: 354px;
      height: 99px;
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 4px;
    }
  }
  /deep/.el-button--primary {
    width: 110px;
    height: 40px;
    margin-left: 787px;
  }
  .dialogFooterBtn {
    /deep/.el-button--primary {
      margin-top: -10px;
      margin-left: 0px;
    }
  }
}
/deep/.el-message-box__headerbtn {
  display: none;
}
.imgSize {
  width: 60px;
  height: 60px;
  margin: 27px auto;
}
</style>
