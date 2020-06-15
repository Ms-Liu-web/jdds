<template>
  <div class="app-container">
    <div class="title">
      <img src="../../assets/icon/icon12.png">
      <span>选择返利模板</span>
    </div>
    <template>
      <!-- 淘宝 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="淘宝" name="tb_rebate">
          <!-- 佣金比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="1">佣金比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <!--  -->
            <template v-if="chooseNum == 1">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  validate-event
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 佣金固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="2">佣金固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 2">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 订单比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="3">订单比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 3">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 订单固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="4">订单固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 4">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 会员比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="5">会员比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 5">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 会员固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="6">会员固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 6">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 推广比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="7">推广比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 7">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 推广固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="8">推广固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 8">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
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
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="1">佣金比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <!--  -->
            <template v-if="chooseNum == 1">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 佣金固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="2">佣金固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 2">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 订单比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="3">订单比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 3">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 订单固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="4">订单固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 4">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 会员比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="5">会员比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 5">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 会员固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="6">会员固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 6">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 推广比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="7">推广比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 7">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 推广固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="8">推广固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 8">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
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
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="1">佣金比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <!--  -->
            <template v-if="chooseNum == 1">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 佣金固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="2">佣金固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 2">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 订单比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="3">订单比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 3">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 订单固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="4">订单固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 4">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 会员比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="5">会员比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 5">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 会员固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="6">会员固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 6">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>

          <!-- 推广比例 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="7">推广比例模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 7">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
                  width="50px"
                />
                %给客户
              </div>
            </template>
          </div>
          <!-- 推广固定 -->
          <el-radio-group
            v-model="chooseNum"
            class="radio_g"
            @change="radioChoose"
          >
            <el-radio :label="8">推广固定模式</el-radio>
          </el-radio-group>
          <div class="pattern">
            <template v-if="chooseNum == 8">
              <div
                v-for="(value, key, d) in rebate_t"
                :key="d"
                class="custom_inputWidth"
              >
                {{ d + 1 }}，当返利佣金 ≤
                <el-input
                  v-model.number="rebate_t[key]"
                  width="50px"
                />元，分出联盟总佣金的<el-input
                  v-model.number="rebate_j[key.replace(/t/, 'j')]"
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
  </div>
</template>

<script>
import { configEdit } from '@/api/agent'
export default {
  data() {
    return {
      activeName: 'tb_rebate',
      chooseNum: '',
      rebate_t: {
        t_1: '',
        t_2: '',
        t_3: '',
        t_4: '',
        t_5: '',
        t_6: '',
        t_7: '',
        t_8: ''
      },
      rebate_j: {
        j_1: '',
        j_2: '',
        j_3: '',
        j_4: '',
        j_5: '',
        j_6: '',
        j_7: '',
        j_8: ''
      },
      activeContent: null
    }
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    radioChoose(value) {
      this.chooseNum = value
    },
    // 点击保存设置按钮
    async saveHandleClick() {
      this.activeContent = Object.assign(this.rebate_t, this.rebate_j, {
        mode: this.chooseNum
      })
      if (this.activeName === 'tb_rebate') {
        const res = await configEdit({ tb_rebate: this.activeContent })
        console.log(res)
      } else if (this.activeName === 'pdd_rebate') {
        const res = await configEdit({ pdd_rebate: this.activeContent })
        console.log(res)
      } else {
        const res = await configEdit({ jd_rebate: this.activeContent })
        console.log(res)
      }
    }
    // 发送配置请求
    // async configEditApi(v) {
    //   console.log(v)
    //   // const res = await configEdit({ newObj })
    //   // console.log(res)
    // }
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
