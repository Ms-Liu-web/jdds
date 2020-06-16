<template>
  <div>
    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png">
        <span>商品列表</span>
      </div>
      <div class="box">
        <span>请输入自定义前端代码：</span>
        <!-- <textarea v-model="middle_page_code" class="custom" /> -->
        <el-input
          v-model="form.middle_page_code"
          class="custom"
          type="textarea"
        />
      </div>
      <div class="coustompageFooter">
        <el-button type="primary" @click="AhandleClick">确认保存</el-button>
      </div>
    </div>
    <!-- 保存成功提示框 -->
    <m-dialog width="400px" height="288px" :visible.sync="visible">
      <template v-slot:title>
        <img class="imgSize" src="../../assets/success-images/tc1.png" alt="">
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
</template>

<script>
import { configEdit, getUserConfig } from '@/api/agent'
export default {
  data() {
    return {
      visible: false,
      form: {
        middle_page_code: ''
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
        this.form.middle_page_code = data.middle_page_code
        console.log(11111)
      } else {
        this.$message({
          type: 'error',
          message: '获取信息失败'
        })
      }
    },
    // 提交
    async AhandleClick() {
      const res = await configEdit(this.form)
      if (res.code !== 200) {
        this.$message({
          type: 'error',
          message: '设置失败'
        })
      } else {
        this.visible = true
      }
    },
    handleClick() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #fff;
  border-radius: 6px;
  min-height: calc(100vh - 250px);
  .box {
    height: 592px;
    span {
      font-size: 14px;
      float: left;
      color: #333;
    }
    .custom {
      width: 80%;
      height: 592px;
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 4px;
      float: left;
    }
    /deep/.el-textarea__inner {
      height: 592px;
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
  .coustompageFooter {
    margin-top: 100px;
    text-align: center;
  }
}
</style>
