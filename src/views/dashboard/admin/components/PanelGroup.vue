<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card_u1" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="mingcheng" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户名</div>
          <div class="card-panel-num">{{ user.user }}</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card_u2" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="daili" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">代理等级</div>
          <div class="card-panel-num">{{ user.level }}</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card_u3" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="kami" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">卡密销售数量</div>
          <count-to
            :start-val="0"
            :end-val="total.cardsell_count"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card_u4" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="user" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户数量</div>
          <count-to
            :start-val="0"
            :end-val="total.user_count"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card_u2" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">下级代理数量</div>
          <count-to
            :start-val="0"
            :end-val="total.subordinate_count"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card_u3" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">销售卡的金额</div>
          <count-to
            :start-val="0"
            :end-val="total.sell_money"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card_u4" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="discount" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">拿卡折扣</div>
          <count-to
            :start-val="0"
            :end-val="user.discount"
            :duration="3600"
            class="card-panel-num"
          />
          <span style="font-size:30px;">%</span>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card_u1" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="yue" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">余额</div>
          <div class="card-panel-num">{{ user.balance }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import { agentSellInfo } from "@/api/agent";
import { getInfo } from "@/api/user";

export default {
  components: {
    CountTo
  },
  data() {
    return {
      total: {
        sell_money: 0,
        cardsell_count: 0,
        user_count: 0,
        subordinate_count: 0
      },
      user: {}
    };
  },
  created() {
    this.getData(), this.getInfo();
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
    getData() {
      agentSellInfo().then(response => {
        this.total = response.data;
      });
    },
    getInfo() {
      getInfo().then(response => {
        this.user = response.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card_u1 {
    background: url("../../../../assets/icon/card3.png") no-repeat;
  }
  .card_u2 {
    background: url("../../../../assets/icon/card1.png") no-repeat;
  }
  .card_u3 {
    background: url("../../../../assets/icon/card2.png") no-repeat;
  }
  .card_u4 {
    background: url("../../../../assets/icon/card4.png") no-repeat;
  }

  .card-panel {
    height: 140px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #fff;
    width: 100%;
    background-size: cover;
    box-shadow: 0px 0px 6px 0px rgba(186, 186, 186, 0.22);
    // &:hover {
    //   .card-panel-icon-wrapper {
    //     color: #fff;
    //   }

    //   .icon-people {
    //     background: #40c9c6;
    //   }

    //   .icon-message {
    //     background: #36a3f7;
    //   }

    //   .icon-money {
    //     background: #f4516c;
    //   }

    //   .icon-shopping {
    //     background: #34bfa3;
    //   }
    // }

    .icon-people {
      color: #fff;
    }

    .icon-message {
      color: #fff;
    }

    .icon-money {
      color: #fff;
    }

    .icon-shopping {
      color: #fff;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 38px 0 0 25px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 67px;
    }

    .card-panel-description {
      float: right;
      width: 120px;
      text-align: left;
      margin-right: 9px;

      .card-panel-text {
        line-height: 18px;
        color: #fff;
        font-size: 16px;
        margin-bottom: 19px;
        margin-top: 38px;
      }

      .card-panel-num {
        font-size: 30px;
        font-weight: 500;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
