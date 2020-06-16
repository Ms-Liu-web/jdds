<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.el-message-box {
  width: 400px;
  padding-bottom: 25px;
  /* height: 339px; */
}
.el-message-box__message p {
  margin: 0;
  line-height: 24px;
  width: 290px;
  margin: auto;
  text-align: center;
  /* margin-top: 35px; */
}
.el-message-box__btns button:nth-child(2) {
  margin-left: 23px;
}
.el-message-box__header {
  text-align: center !important;
}
.el-message-box__title {
  color: #2d6afa;
}
/* .el-button--primary {
  color: #fff;
  background-color: #2d6afa !important;
  border-color: #2d6afa !important;
} */
.el-input--medium .el-input__inner {
  height: 40px;
  line-height: 40px;
  width: 290px;
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 4px;
}
.el-input--medium {
  text-align: center;
}
.el-message-box__btns {
  text-align: center;
}
.el-button--small {
  padding: 0;
  font-size: 12px;
  border-radius: 3px;
  width: 100px;
  height: 40px;
}
.el-dialog__header {
  text-align: center;
}
.el-form-item__label {
  font-weight: 400;
}
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-message-box__errormsg {
  width: 290px;
  margin: auto;
}
.el-table:before {
  height: 0 !important;
}
.el-table__empty-block {
  min-height: 110px !important;
}
</style>

