<template>
  <div>
    <!-- <contentTop /> -->

    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png">
        <span>商品筛选</span>
      </div>
      <div class="shop_msg">
        <p><span />淘宝商品来源筛选</p>
        <el-radio-group v-model="form.goods_sx_tb_source">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="2">天猫</el-radio>
          <el-radio :label="1">集市</el-radio>
        </el-radio-group>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="base_box"
        :hide-required-asterisk="true"
      >
        <div class="shop_msg">
          <p><span />销量筛选</p>
          <el-form-item
            label="大于值:"
            prop="goods_sx_sale_num"
            label-width="65px"
          >
            <el-input
              v-model.number="form.goods_sx_sale_num"
              placeholder="请输入1-100的整数"
            />
          </el-form-item>
        </div>
        <div class="shop_msg">
          <p><span />佣金筛选</p>
          <el-form-item
            label="佣金比例高于值:"
            prop="goods_sx_commission"
            label-width="130px"
          >
            <el-input
              v-model.number="form.goods_sx_commission"
              placeholder="请输入1-100的整数"
            />
          </el-form-item>
        </div>
        <div class="shop_msg">
          <p><span />优惠面额</p>
          <el-form-item
            label="优惠面额高于值:"
            prop="goods_sx_coupon_amount"
            label-width="130px"
          >
            <el-input
              v-model.number="form.goods_sx_coupon_amount"
              placeholder="请输入5或5以上的整数"
            />
          </el-form-item>
        </div>
        <div class="shop_msg">
          <p><span />商品价格</p>
          <el-form-item
            label="商品价格高于值:"
            prop="goods_sx_price"
            label-width="130px"
          >
            <el-input
              v-model.number="form.goods_sx_price"
              placeholder="请输入5或5以上的整数"
            />
          </el-form-item>
        </div>
      </el-form>
      <div class="shure_btn">
        <el-button type="primary" @click="onSubmit('form')">确认保存</el-button>
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
import waves from '@/directive/waves' // waves directive
import { configEdit, getUserConfig } from '@/api/agent'
var checkAge = (rule, value, callback) => {
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (value > 100 || value < 0) {
        callback(new Error('必须为1-100以内整数'))
      } else {
        callback()
      }
    }
  }, 1000)
}
var couponAmount = (rule, value, callback) => {
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (value < 5) {
        callback(new Error('必须为5或5以内整数'))
      } else {
        callback()
      }
    }
  }, 1000)
}

export default {
  name: 'Seting',
  // components: { contentTop },
  directives: { waves },
  data() {
    return {
      visible: false,
      form: {
        goods_sx_tb_source: 0,
        goods_sx_sale_num: '',
        goods_sx_commission: '',
        goods_sx_coupon_amount: '',
        goods_sx_price: ''
      },
      rules: {
        goods_sx_sale_num: [{ validator: checkAge, trigger: 'blur' }],
        goods_sx_commission: [{ validator: checkAge, trigger: 'blur' }],
        goods_sx_coupon_amount: [{ validator: couponAmount, trigger: 'blur' }],
        goods_sx_price: [{ validator: couponAmount, trigger: 'blur' }]
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
        this.form.goods_sx_tb_source = data.goods_sx_tb_source
        this.form.goods_sx_sale_num = data.goods_sx_sale_num
        this.form.goods_sx_commission = data.goods_sx_commission
        this.form.goods_sx_price = data.goods_sx_price
        console.log(11111)
      } else {
        this.$message({
          type: 'error',
          message: '获取信息失败'
        })
      }
    },
    // 提交
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await configEdit(this.form)
          if (res.code === 200) {
            this.visible = true
          }
        } else {
          this.$message({
            type: 'error',
            message: '您输入的值不符合规则'
          })
        }
      })
    },
    handleClick() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/custom.scss";
</style>
