<template>
  <div>
    <!-- <contentTop /> -->

    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png" />
        <span>客服信息</span>
      </div>
      <div class="kf_msg">
        <span>是否显示已下信息</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="2">不显示</el-radio>
        </el-radio-group>
      </div>
      <el-form ref="form" :model="form" :rules="rules" class="base_box" label-width="160px">
        <el-form-item label="联系电话:" prop="ip">
          <el-input v-model="form.ip" placeholder="请设置当前软件唯一绑定ip"></el-input>
        </el-form-item>
        <el-form-item label="QQ号:" prop="appname">
          <el-input v-model="form.appname" placeholder="请设置当前软件名称"></el-input>
        </el-form-item>
        <el-form-item label="微信号:" prop="appname">
          <el-input v-model="form.appname" placeholder="请设置当前软件名称"></el-input>
        </el-form-item>
        <el-form-item label="微信二维码:" prop="appname">
          <div class>
            <p class="code"></p>
            <p class="code_btn">修改二维码</p>
          </div>
        </el-form-item>
      </el-form>
      <div class="shure_btn">
        <el-button type="primary" @click="onSubmit('form')">确认保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getInfo2 } from "@/api/user";
// import contentTop from "@/components/contentTop/index";
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
  // components: { contentTop },
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
        ip: [{ validator: validateIp, trigger: "blur" }]
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
@import "~@/styles/custom.scss";
</style>
