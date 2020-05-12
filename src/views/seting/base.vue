<template>
  <div>
    <contentTop />

    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png" />
        <span>用户管理</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" class="base_box" label-width="160px">
        <!-- <el-form-item label="当前软件ip:">
          <span>{{rIP}}</span>
        </el-form-item>-->
        <el-form-item label="设置软件ip：" prop="ip">
          <el-input v-model="form.ip" placeholder="请设置当前软件唯一绑定ip"></el-input>
        </el-form-item>
        <!-- <el-form-item label="当前软件名称:" style="margin-top:44px;">
          <span>{{rName}}</span>
        </el-form-item>-->
        <el-form-item label="设置软件名称：" prop="appname">
          <el-input v-model="form.appname" placeholder="请设置当前软件名称"></el-input>
        </el-form-item>

        <el-form-item class="btn_center" style="margin-left:0">
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getInfo2 } from "@/api/user";
import contentTop from "@/components/contentTop/index";
import waves from "@/directive/waves"; // waves directive
import { setingUpdate, getInfo } from "@/api/user";
var validateIp = (rule, value, callback) => {
  console.log(value);
  var reg1 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if (value && !reg1.test(value)) {
    callback(new Error("请输入正确的ip，ip地址格式错误"));
  }
  callback();
};

export default {
  name: "seting",
  components: { contentTop },
  directives: { waves },
  data() {
    return {
      user: "",
      rIP: "",
      rName: "",
      form: {
        ip: "",
        appname: ""
      },
      rules: {
        ip: [{ required: true, validator: validateIp, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getUser();
  },
  mounted() {
    this.rIP = localStorage.getItem("key");
    this.rName = localStorage.getItem("rName");
  },
  methods: {
    getUser() {
      getInfo().then(response => {
        this.form.ip = response.data.lockIp;
        this.form.appname = response.data.customTitle;

        this.rIP = response.data.lockIp;
        this.rName = response.data.customTitle;
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setingUpdate(this.form).then(response => {
            this.$message({
              type: "success",
              message: "操作成功"
            });
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  .base_box {
    .el-form-item {
      margin-bottom: 27px !important;
    }
  }
}
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
.app-container {
  background-color: #fff;
  border-radius: 6px;
  min-height: calc(100vh - 250px);
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
    margin: auto;
    margin-top: 64px;
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
    width: 405px;
    height: 40px;
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 4px;
  }
  .btn_center {
    /deep/.el-form-item__content {
      text-align: center;
      margin-left: 0 !important;
      margin-top: 60px;
    }
  }
}
</style>
