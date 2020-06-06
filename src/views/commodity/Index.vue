<template>
  <div>
    <!-- <contentTop /> -->

    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png" />
        <span>商品筛选</span>
      </div>
      <div class="shop_msg">
        <p>
          <span></span>淘宝商品来源筛选
        </p>
        <el-radio-group v-model="radio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">天猫</el-radio>
          <el-radio :label="3">集市</el-radio>
        </el-radio-group>
      </div>
      <el-form ref="form" :model="form" :rules="rules" class="base_box">
        <div class="shop_msg">
          <p>
            <span></span>销量筛选
          </p>
          <el-form-item label="大于值:" prop="ip" label-width="65px">
            <el-input v-model="form.ip" placeholder="请设置当前软件唯一绑定ip"></el-input>
          </el-form-item>
        </div>
        <div class="shop_msg">
          <p>
            <span></span>佣金筛选
          </p>
          <el-form-item label="佣金比例高于值:" prop="ip" label-width="130px">
            <el-input v-model="form.ip" placeholder="请设置当前软件唯一绑定ip"></el-input>
          </el-form-item>
        </div>
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
