<template>
  <div class="app-container">
    <div class="title">
      <img src="../../assets/icon/icon12.png">
      <span>选择返利模板</span>
    </div>
    <template>
      <el-tabs v-model="activeName">
        <!-- 淘宝 -->
        <el-tab-pane label="淘宝" name="tb_rebate">
          <!-- 佣金比例 -->
          <el-radio-group
            v-model="userConfig.tb_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="1">佣金比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <!--  -->
            <template v-if="userConfig.tb_rebate.mode == 1">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.tb_rebate[`t_${d + 1}`]"
                  validate-event
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.tb_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 佣金固定 -->
          <el-radio-group
            v-model="userConfig.tb_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="2">佣金固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.tb_rebate.mode == 2">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.tb_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，{{ d }}分出联盟总佣金的<el-input
                  v-model.number="userConfig.tb_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 订单比例 -->
          <el-radio-group
            v-model="userConfig.tb_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="3">订单比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.tb_rebate.mode == 3">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.tb_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.tb_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 订单固定 -->
          <el-radio-group
            v-model="userConfig.tb_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="4">订单固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.tb_rebate.mode == 4">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.tb_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.tb_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 会员比例 -->
          <el-radio-group
            v-model="userConfig.tb_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="5">会员比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.tb_rebate.mode == 5">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.tb_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.tb_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 会员固定 -->
          <el-radio-group
            v-model="userConfig.tb_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="6">会员固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.tb_rebate.mode == 6">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.tb_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.tb_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 推广比例 -->
          <el-radio-group
            v-model="userConfig.tb_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="7">推广比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.tb_rebate.mode == 7">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input width="50px" />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.tb_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 推广固定 -->
          <el-radio-group
            v-model="userConfig.tb_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="8">推广固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.tb_rebate.mode == 8">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.tb_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.tb_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
        </el-tab-pane>
        <!-- 京东 -->
        <el-tab-pane label="京东" name="jd_rebate">
          <!-- 佣金比例 -->
          <el-radio-group
            v-model="userConfig.jd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="1">佣金比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <!--  -->
            <template v-if="userConfig.jd_rebate.mode == 1">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.jd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.jd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 佣金固定 -->
          <el-radio-group
            v-model="userConfig.jd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="2">佣金固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.jd_rebate.mode == 2">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.jd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.jd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 订单比例 -->
          <el-radio-group
            v-model="userConfig.jd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="3">订单比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.jd_rebate.mode == 3">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.jd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.jd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 订单固定 -->
          <el-radio-group
            v-model="userConfig.jd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="4">订单固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.jd_rebate.mode == 4">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.jd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.jd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 会员比例 -->
          <el-radio-group
            v-model="userConfig.jd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="5">会员比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.jd_rebate.mode == 5">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.jd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.jd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 会员固定 -->
          <el-radio-group
            v-model="userConfig.jd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="6">会员固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.tb_rebate.mode == 6">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.jd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.jd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 推广比例 -->
          <el-radio-group
            v-model="userConfig.jd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="7">推广比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.jd_rebate.mode == 7">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.jd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.jd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 推广固定 -->
          <el-radio-group
            v-model="userConfig.jd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="8">推广固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.jd_rebate.mode == 8">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.jd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.jd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
        </el-tab-pane>
        <!-- 平多多 -->
        <el-tab-pane label="拼多多" name="pdd_rebate">
          <!-- 佣金比例 -->
          <el-radio-group
            v-model="userConfig.pdd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="1">佣金比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <!--  -->
            <template v-if="userConfig.pdd_rebate.mode == 1">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.pdd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.pdd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 佣金固定 -->
          <el-radio-group
            v-model="userConfig.pdd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="2">佣金固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.pdd_rebate.mode == 2">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.pdd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.pdd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 订单比例 -->
          <el-radio-group
            v-model="userConfig.pdd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="3">订单比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.pdd_rebate.mode == 3">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.pdd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.pdd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 订单固定 -->
          <el-radio-group
            v-model="userConfig.pdd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="4">订单固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.pdd_rebate.mode == 4">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.pdd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.pdd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 会员比例 -->
          <el-radio-group
            v-model="userConfig.pdd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="5">会员比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.pdd_rebate.mode == 5">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.pdd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.pdd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 会员固定 -->
          <el-radio-group
            v-model="userConfig.pdd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="6">会员固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.pdd_rebate.mode == 6">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.pdd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.pdd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 推广比例 -->
          <el-radio-group
            v-model="userConfig.pdd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="7">推广比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.pdd_rebate.mode == 7">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.pdd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.pdd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 推广固定 -->
          <el-radio-group
            v-model="userConfig.pdd_rebate.mode"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="8">推广固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="userConfig.pdd_rebate.mode == 8">
              <div
                v-for="d in Array.from({ length: 8 }, (_, index) => index)"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="userConfig.pdd_rebate[`t_${d + 1}`]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="userConfig.pdd_rebate[`j_${d + 1}`]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
    <div class="save">
      <el-button type="primary" @click="saveHandleClick">确认保存</el-button>
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
      activeName: 'tb_rebate',
      userConfig: null,
      activeContent: null
    }
  },
  created() {
    this.UserConfig()
  },
  methods: {
    async UserConfig() {
      const res = await getUserConfig()
      this.userConfig = res.data
      // console.log(this.userConfig)
    },
    radioChoose(value) {
      // this.userConfig.tb_rebate.mode = value
    },
    // 点击保存设置按钮
    async saveHandleClick() {
      console.log(this.userConfig)
      const res = await configEdit(this.userConfig)
      if (res.code === 200) {
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
/deep/.el-button--primary {
  margin-bottom: 40px;
}
.save {
  margin-bottom: 20px;
  width: 100%;
  margin-top: 60px;
  text-align: center;
}
</style>
