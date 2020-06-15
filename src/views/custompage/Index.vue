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
        <el-input v-model="middle_page_code" class="custom" type="textarea" />
      </div>
      <div class="coustompageFooter">
        <el-button type="primary" @click="handleClick">确认保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      middle_page_code: ''
    }
  },
  methods: {
    handleClick() {
      console.log(this.middle_page_code)
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
