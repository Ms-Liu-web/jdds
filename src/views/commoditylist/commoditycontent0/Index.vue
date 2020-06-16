<template>
  <div>
    <div class="goodsListContent">
      <el-table :data="goodsList">
        <el-table-column
          label="商品id"
          style="textalin:center"
          prop="goods_id"
        />
        <el-table-column
          label="商品名称"
          width="250"
          prop="title"
        />
        <el-table-column label="商品照片">
          <template slot-scope="{ row }">
            <img class="goodsListPhoto" :src="row.small_images" alt="">
          </template>
        </el-table-column>
        <el-table-column label="品台" prop="type">
          <template slot-scope="{ row }">
            <span v-if="row.type === 1">淘宝</span>
            <span v-else-if="row.type === 3">平多多</span>
            <span v-else-if="row.type === 2">京东</span>
          </template>
        </el-table-column>
        <el-table-column label="佣金">
          <template slot-scope="{ row }">
            {{ `${row.commission_rate}%` }}
          </template>
        </el-table-column>
        <!-- 要改 -->
        <el-table-column label="价格" prop="goods_id" />
        <!-- 要改 -->
        <el-table-column label="30天销量" prop="goods_id" />
        <el-table-column label="优惠券" prop="coupon_amount" />
        <el-table-column label="展示位置" prop="coupon_amount">
          <template slot-scope="{ row }">
            <span v-if="row.display_type === 1">精选</span>
            <span v-else-if="row.display_type === 3">热门搜索</span>
            <span v-else-if="row.display_type === 2">详情页推荐</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="order_num" />
        <el-table-column width="250" label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="success"
              size="mini"
              icon="el-icon-edit-outline"
              plain
              @click="editClick(row.goods_id)"
              >编辑</el-button>
            <el-button
              v-if="row.status === 0"
              type="primary"
              size="mini"
              icon="el-icon-edit-outline"
              plain
              @click="editClick(row.goods_id)"
              >启用</el-button>
            <el-button
              v-else-if="row.status === 1"
              type="primary"
              size="mini"
              icon="el-icon-edit-outline"
              plain
              @click="editClick(row.goods_id)"
              >停用</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              plain
              @click="editClick(row.goods_id)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
var data = {
  count: 1,
  list: [
    {
      id: 1,
      user_id: 10, // 用户id
      user: 122, // 用户账号
      goods_id: 9360, // 商品id
      display_type: 1, // 显示位置1精选 2热门搜索 3详情页推荐
      type: 3, // 平台  1淘宝 2京东 3 拼多多
      order_num: 23, // 排序 从大到小
      status: 0, // 0启用 1停用
      created_at: '2020-05-25 13:34:08',
      updated_at: '2020-05-25 15:19:34',
      title: '儿童内裤女童纯棉平角裤可爱卡通内裤男童婴小中大童女孩四角短裤', // 商品名称
      commission_rate: 20, // 佣金比率 1% 100
      small_images:
        ' https://t00img.yangkeduo.com/goods/images/2020-04-06/aa0ed6ad5db6d652041f10ec8e3d94bb.jpeg',
      coupon_amount: null,
      category_id: 2,
      category_name: null
    },
    {
      id: 1,
      user_id: 10, // 用户id
      user: 122, // 用户账号
      goods_id: 9360, // 商品id
      display_type: 1, // 显示位置1精选 2热门搜索 3详情页推荐
      type: 3, // 平台  1淘宝 2京东 3 拼多多
      order_num: 23, // 排序 从大到小
      status: 1, // 0启用 1停用
      created_at: '2020-05-25 13:34:08',
      updated_at: '2020-05-25 15:19:34',
      title: '儿童内裤女童纯棉平角裤可爱卡通内裤男童婴小中大童女孩四角短裤', // 商品名称
      commission_rate: 20, // 佣金比率 1% 100
      small_images:
        ' https://t00img.yangkeduo.com/goods/images/2020-04-06/aa0ed6ad5db6d652041f10ec8e3d94bb.jpeg',
      coupon_amount: null,
      category_id: 2,
      category_name: null
    }
  ],
  page: 1,
  perPage: 10,
  pageCount: 1
}
export default {
  data() {
    return {
      userInfo: {
        page: 1,
        pageSize: 10
      },
      goodsList: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      this.goodsList = data.list
      // this.userInfp.page=data.page
      console.log(this.goodsList)
    },
    editClick(goodsId) {
      console.log(goodsId)
    }
  }
}
</script>

<style lang="less" scoped>
.goodsListContent {
  width: 1500px;
  height: 500px;
  text-align: center;
}
.goodsListPhoto {
  width: 40px;
  height: 40px;
}
</style>
