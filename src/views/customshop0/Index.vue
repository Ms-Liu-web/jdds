<template>
  <div>
    <!-- <contentTop /> -->
    <div class="app-container">
      <!-- title -->
      <div class="title">
        <img src="../../assets/icon/icon12.png">
        <span>商品列表</span>
      </div>
      <!-- 添加商品按钮 -->
      <div>
        <el-button
type="primary"
plain
@click="handleAddGoods"
>添加商品</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { getGoodsList } from '@/api/agent'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'CardList',
  directives: { waves },
  data() {
    return {
      addGoodsDialogVisible: false,
      // 添加商品信息
      addGoodsForm: {
        goodsName: ''
      },
      addGoodsRules: {
        goodsName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        pageSize: 5
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    // 获取商品列表
    // async getList() {
    //   const res = await getGoodsList(this.listQuery)
    //   console.log(res)
    // },
    // 添加商品按钮
    handleAddGoods() {
      this.$router.replace('/commodity')
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-input--medium {
  text-align: left !important;
}
.app-container {
  background-color: #fff;
  border-radius: 6px;
  min-height: calc(100vh - 250px);
}
</style>
