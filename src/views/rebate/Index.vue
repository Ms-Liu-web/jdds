<template>
  <div class="app-container">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="淘宝" name="first">
          <!-- 佣金比例 -->
          <el-radio-group v-model="radio" @change="radioChoose" class="radio_g">
            <el-radio :label="1">佣金比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 1">
              <div
                class="custom_inputWidth"
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
              >
                {{d+1}}，当返利佣金 ≤
                <el-input width="50px"></el-input>元，分出联盟总佣金的
                <el-input width="50px"></el-input>%给客户
              </div>
            </template>
          </div>
          <!-- 佣金固定 -->
          <el-radio-group v-model="radio" @change="radioChoose" class="radio_g">
            <el-radio :label="2">佣金固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 2">
              <div
                class="custom_inputWidth"
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
              >
                {{d+1}}，当返利佣金 ≤
                <el-input width="50px"></el-input>元，分出联盟总佣金的
                <el-input width="50px"></el-input>%给客户
              </div>
            </template>
          </div>

          <!-- 订单比例 -->
          <el-radio-group v-model="radio" @change="radioChoose" class="radio_g">
            <el-radio :label="3">订单比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 3">
              <div
                class="custom_inputWidth"
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
              >
                {{d+1}}，当返利佣金 ≤
                <el-input width="50px"></el-input>元，分出联盟总佣金的
                <el-input width="50px"></el-input>%给客户
              </div>
            </template>
          </div>
          <!-- 订单固定 -->
          <el-radio-group v-model="radio" @change="radioChoose" class="radio_g">
            <el-radio :label="4">订单固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 4">
              <div
                class="custom_inputWidth"
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
              >
                {{d+1}}，当返利佣金 ≤
                <el-input width="50px"></el-input>元，分出联盟总佣金的
                <el-input width="50px"></el-input>%给客户
              </div>
            </template>
          </div>

          <!-- 会员比例 -->
          <el-radio-group v-model="radio" @change="radioChoose" class="radio_g">
            <el-radio :label="5">会员比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 5">
              <div
                class="custom_inputWidth"
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
              >
                {{d+1}}，当返利佣金 ≤
                <el-input width="50px"></el-input>元，分出联盟总佣金的
                <el-input width="50px"></el-input>%给客户
              </div>
            </template>
          </div>
          <!-- 会员固定 -->
          <el-radio-group v-model="radio" @change="radioChoose" class="radio_g">
            <el-radio :label="6">会员固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 6">
              <div
                class="custom_inputWidth"
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
              >
                {{d+1}}，当返利佣金 ≤
                <el-input width="50px"></el-input>元，分出联盟总佣金的
                <el-input width="50px"></el-input>%给客户
              </div>
            </template>
          </div>

          <!-- 推广比例 -->
          <el-radio-group v-model="radio" @change="radioChoose" class="radio_g">
            <el-radio :label="7">推广比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 7">
              <div
                class="custom_inputWidth"
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
              >
                {{d+1}}，当返利佣金 ≤
                <el-input width="50px"></el-input>元，分出联盟总佣金的
                <el-input width="50px"></el-input>%给客户
              </div>
            </template>
          </div>
          <!-- 推广固定 -->
          <el-radio-group v-model="radio" @change="radioChoose" class="radio_g">
            <el-radio :label="8">推广固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 8">
              <div
                class="custom_inputWidth"
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
              >
                {{d+1}}，当返利佣金 ≤
                <el-input width="50px"></el-input>元，分出联盟总佣金的
                <el-input width="50px"></el-input>%给客户
              </div>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="京东" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="拼多多" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      radio: "",
      chooseNum: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    radioChoose(value) {
      this.chooseNum = value;
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-tabs__nav-wrap::after {
  content: "";
  height: 0 !important;
}
.app-container {
  background-color: #fff;
  border-radius: 6px;
  min-height: calc(100vh - 250px);
}
.radio_g {
  color: #333;
  margin-top: 40px;
}
.custom_inputWidth /deep/.el-input {
  width: 64px;
  height: 26px;
}
.custom_inputWidth /deep/.el-input__inner {
  width: 64px;
  height: 26px;
  line-height: 26px;
}
.custom_inputWidth {
  color: #4d4d4d;
  font-size: 14px;
  margin-top: 20px;
}
</style>