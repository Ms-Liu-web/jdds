<template>
  <div>
    <!-- <contentTop /> -->

    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png">
        <span>商品列表</span>
      </div>
      <!-- 添加商品按钮 -->
      <div class="goodsAddBtn">
        <el-button
          icon="el-icon-plus"
          type="primary"
          plain
          @click="routerHander"
          >添加商品</el-button>
      </div>
      <!-- 商品表单 -->
      <div>
        <el-table :data="goodsList">
          <el-table-column
            label="商品id"
            style="textalin:center"
            prop="goods_id"
          />
          <el-table-column label="商品名称" width="250" prop="title" />
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
              {{ row.commission_rate }}
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="price" />
          <el-table-column label="优惠券" prop="coupon_amount" />
          <el-table-column label="展示位置" prop="coupon_amount">
            <template slot-scope="{ row }">
              <span v-if="row.display_type === 1">精选</span>
              <span v-else-if="row.display_type === 3">热门搜索</span>
              <span v-else-if="row.display_type === 2">详情页推荐</span>
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="order_num" />
          <el-table-column width="350" label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                size="mini"
                icon="el-icon-edit-outline"
                plain
                @click="editClick(row.id)"
                >编辑</el-button>
              <el-button
                v-if="row.status === 0"
                type="primary"
                size="mini"
                icon="el-icon-edit-outline"
                plain
                @click="statusClick(row.goods_id, row.status)"
                >启用</el-button>
              <el-button
                v-else-if="row.status === 1"
                type="info"
                size="mini"
                icon="el-icon-edit-outline"
                plain
                @click="statusClick(row.goods_id, row.status)"
                >停用</el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                plain
                @click="deleteClick(row.id)"
                >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页类别 -->
      <div class="commidityContentPage">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="userInfo.pageSize"
          :total="pageCount"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 状态确认弹框 -->
      <el-dialog title="提示" :visible.sync="editDialogVisible" width="30%">
        <span>确认要更改状态吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editStatusEscClick">取 消</el-button>
          <el-button type="primary" @click="editStatusClick">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除确认弹框 -->
      <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
        <span>确认要删除此条商品吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteEscClick">取 消</el-button>
          <el-button type="primary" @click="deleteDialogClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getGoodsList, getGoodsStatus, getDeleteStatus } from '@/api/agent'
export default {
  data() {
    return {
      deleteDialogVisible: false,
      editDialogVisible: false,
      pageCount: 0,
      currentPage: 1,
      userInfo: {
        page: 1,
        pageSize: 1
      },
      goodsList: [],
      statusInfo: {
        id: '',
        status: ''
      }
    }
  },
  created() {
    this.getGoodsListHandle(this.userInfo)
  },
  methods: {
    // 取消删除的Dialog
    deleteEscClick() {
      this.deleteDialogVisible = false
    },
    // 确认删除dialog
    async deleteDialogClick() {
      const res = await getDeleteStatus(this.statusInfo)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }
      this.deleteDialogVisible = false
      this.getGoodsListHandle(this.userInfo)
    },
    // 删除按钮
    deleteClick(id) {
      this.statusInfo.id = id
      this.deleteDialogVisible = true
    },
    // 取消修改状态的Dialog
    editStatusEscClick() {
      this.editDialogVisible = false
    },
    // 确认修改状态dialog
    async editStatusClick() {
      const res = await getGoodsStatus(this.statusInfo)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }
      this.editDialogVisible = false
      this.getGoodsListHandle(this.userInfo)
    },
    // 启用按钮
    statusClick(id, status) {
      this.statusInfo.id = id
      if (status === 0) {
        this.statusInfo.status = 1
      } else {
        this.statusInfo.status = 0
      }
      this.goodsId = id
      this.editDialogVisible = true
    },
    // 获取商品列表
    async getGoodsListHandle(info) {
      const res = await getGoodsList(info)
      if (res.code === 200) {
        this.goodsList = res.data.list
        this.pageCount = res.data.count
        this.currentPage = res.data.page
      }
    },
    // 编辑按钮
    async editClick(num) {
      // this.$router.push('/goodsedit')
      this.$router.push({ path: `/goodsedit:${num}` })
    },
    // 每页显示条数
    handleSizeChange(val) {
      this.userInfo.pageSize = val
      this.getGoodsListHandle(this.userInfo)
    },
    // 当前页
    handleCurrentChange(val) {
      this.userInfo.page = val
      this.getGoodsListHandle(this.userInfo)
    },
    // 添加商品按钮
    routerHander() {
      this.$router.push({ path: `/goodsedit:${''}` })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/commidityContent.scss";
</style>
