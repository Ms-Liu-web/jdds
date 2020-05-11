<template>
  <div>
    <div class="app-nav">
      <div class="lie">
        <span>
          <img src="../../assets/icon/xj1.png" />
        </span>
        <div class="text_p">
          <p class="p1">代理级别</p>
          <p class="p2">{{ user.level }}</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="lie">
        <span>
          <img src="../../assets/icon/xj2.png" />
        </span>
        <div class="text_p">
          <p class="p1">拿卡折扣</p>
          <p class="p2">{{ user.discount }}%</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="lie">
        <span>
          <img src="../../assets/icon/xj3.png" />
        </span>
        <div class="text_p">
          <p class="p1">余额</p>
          <p class="p2">{{ user.balance }}</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png" />
        <span>用户管理</span>
      </div>
      <el-form ref="form" :model="form" class="base_box" label-width="120px">
        <el-form-item label="当前软件ip:">
          <span>{{rIP}}</span>
        </el-form-item>
        <el-form-item label="设置软件ip:">
          <el-input v-model="form.ip" placeholder="请设置当前软件唯一绑定ip"></el-input>
        </el-form-item>
        <el-form-item label="当前软件名称:" style="margin-top:44px;">
          <span>{{rName}}</span>
        </el-form-item>
        <el-form-item label="设置软件名称:">
          <el-input v-model="form.appname" placeholder="请设置当前软件名称"></el-input>
        </el-form-item>

        <el-form-item class="btn_center" style="margin-left:0">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getInfo2 } from "@/api/user";
import waves from "@/directive/waves"; // waves directive
import { setingUpdate, getInfo } from "@/api/user";

export default {
  name: "seting",
  directives: { waves },
  data() {
    return {
      user: "",
      rIP: "",
      rName: "",
      form: {
        ip: "",
        appname: ""
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
        console.log(response);
        this.user = response.data;
        this.form = {
          ip: response.data.ip,
          appname: response.data.custom_title
        };
      });
    },
    onSubmit() {
      setingUpdate(this.form).then(response => {
        this.$message({
          type: "success",
          message: "操作成功"
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
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
  .title {
    height: 36px;
    line-height: 25px;
    border-bottom: 1px #a4bffe dashed;
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
