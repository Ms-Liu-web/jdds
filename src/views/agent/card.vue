<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.card_user"
        placeholder="请输入使用者账号"
        style="width: 200px;"
        class="filter-item"
      />

      <el-select
        v-model="listQuery.cardtype"
        style="width: 140px"
        class="filter-item"
      >
        <el-option
          v-for="item in cardTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <el-select
        v-model="listQuery.cardstatus"
        style="width: 140px"
        class="filter-item"
      >
        <el-option
          v-for="item in cardStatus"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >生成卡</el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="back"
      >刷新</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="卡密"
        sortable="custom"
        align="center"
        width="300"
      >
        <template slot-scope="{ row }">
          <span>{{ row.cardnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" sortable="custom" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable="custom" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.created_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="过期时间" sortable="custom" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.expire_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="卡类型" sortable="custom" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.cardtypename }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否封停" sortable="custom" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.cardfreeze === 1">封停</span>
          <span v-if="row.cardfreeze === 0">正常</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" sortable="custom" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.status === 1">已使用</span>
          <span v-if="row.status === 0">未使用</span>
          <span v-if="row.status === 2">已删除</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        sortable="custom"
        width="220"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <div v-if="row.status === 0">
            <el-button
              v-if="row.cardfreeze === 1"
              type="primary"
              size="mini"
              @click="handleModifyStatus(row, 'unfreeze')"
            >解冻</el-button>
            <el-button
              v-else
              type="success"
              size="mini"
              @click="handleModifyStatus(row, 'freeze')"
            >冻结</el-button>
            <el-button
              type="primary"
              size="mini"
              style="margin:5px 0 0 0"
              @click="showCardInfo(row)"
            >详情</el-button>

            <el-button
              v-if="row.status !== 2"
              type="danger"
              size="mini"
              style="margin:5px 0 0 0"
              @click="deleteCard(row)"
            >删除</el-button>
          </div>
          <div v-else>
            <el-button
              type="primary"
              size="mini"
              style="margin:5px 0 0 0"
              @click="showCardInfo(row)"
            >详情</el-button>
            <el-button
              v-if="row.status !== 2"
              type="danger"
              style="margin:5px 0 0 0"
              size="mini"
              @click="deleteCard(row)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 20"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog title="生成卡" width="550px" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm3"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="卡数量" prop="user">
          <el-input v-model="temp.count" placeholder="请输入生成卡数量" />
        </el-form-item>

        <el-form-item label="卡密类型" prop="qq">
          <el-select v-model="temp.cardtypeid" placeholder="请选择">
            <el-option
              v-for="item in cardTypeList.slice(1)"
              :key="item.id"
              :label="item.name + item.price + '元'"
              :value="item.id"
            />
            <!-- v-if="item.id != -1" -->
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="discount">
          <el-input
            v-model="temp.mark"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addCard">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="查看详情"
      width="550px"
      :visible.sync="dialogShowCardVisible"
    >
      <el-form
        :model="cardInfo"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="购买者" prop="user">
          <div v-if="cardInfo.user == null">尚未售出</div>
          <div v-if="cardInfo.user !== null">{{ cardInfo.user }}</div>
        </el-form-item>

        <el-form-item label="卡密" prop="user">
          <div>{{ cardInfo.cardnumber }}</div>
        </el-form-item>

        <el-form-item label="备注" prop="user">
          <div>{{ cardInfo.remarks }}</div>
        </el-form-item>

        <el-form-item label="类型" prop="user">
          <div>{{ cardInfo.cardtypename }}</div>
        </el-form-item>

        <el-form-item label="是否冻结" prop="user">
          <div v-if="cardInfo.cardfreeze === 0">否</div>
          <div v-if="cardInfo.cardfreeze === 1">是</div>
        </el-form-item>

        <el-form-item label="卡状态" prop="user">
          <div v-if="cardInfo.status === 0">未使用</div>
          <div v-if="cardInfo.status === 1">已使用</div>
          <div v-if="cardInfo.status === 2">已删除</div>
        </el-form-item>

        <el-form-item label="过期时间" prop="user">
          <div>{{ cardInfo.expire_time }}</div>
        </el-form-item>

        <el-form-item label="创建时间" prop="user">
          <div>{{ cardInfo.created_time }}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowCardVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCardList,
  getCardType,
  createCard,
  freezeCard,
  thawCard,
  showCardInfo,
  deleteCard
} from '@/api/agentcard'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CardList',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      // return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        pagesize: 20,
        cardtype: -1,
        cardstatus: -1,
        card_user: 0,
        start: null,
        end: null
      },
      showReviewer: false,
      temp: {
        count: '',
        cardtypeid: '',
        mark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogShowCardVisible: false,
      cardInfo: {},
      rules: {
        count: [{ required: true, message: '数量必填', trigger: 'blur' }],
        cardtypeid: [
          { required: true, message: '选择分类必填', trigger: 'blur' }
        ],
        mark: [{ required: true, message: '填写备注', trigger: 'blur' }]
      },
      downloadLoading: false,
      cardTypeList: [{ id: -1, name: '全部' }],
      cardStatus: [
        { id: -1, name: '全部' },
        { id: '0', name: '未使用' },
        { id: '1', name: '已使用' },
        { id: '2', name: '已删除' }
      ]
    }
  },
  activated() {
    console.log(234)
  },
  created() {
    this.listQuery.card_user = this.$route.query.carduser
    this.getList()
    this.getCardTypeList()
  },
  methods: {
    getList() {
      this.listQuery.start = this.getStartTime()
      this.listQuery.end = this.getEndTime()
      this.listLoading = true
      getCardList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.count
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getCardTypeList() {
      getCardType().then(response => {
        response.data.forEach(element => {
          this.cardTypeList.push(element)
        })

        console.log(this.cardTypeList)
      })
    },
    addCard() {
      this.$refs['dataForm3'].validate(valid => {
        if (valid) {
          createCard(this.temp).then(response => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: 'Success',
              message: '生成成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    /*
      冻结与解冻
    */
    handleModifyStatus(row, status) {
      if (status === 'unfreeze') {
        const postData = { card: row.cardnumber }
        thawCard(postData).then(response => {
          this.$confirm('你确定要解冻？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            row.cardfreeze = 0
          })
        })
      } else if (status === 'freeze') {
        this.$prompt('请输入冻结原因', '冻结', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const postData = { card: row.cardnumber, msg: value }
          freezeCard(postData).then(response => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            row.cardfreeze = 1
          })
        })
      }
    },
    deleteCard(row) {
      this.$confirm('你确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const delete1 = { card: row.cardnumber }
        deleteCard(delete1).then(response => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          row.status = 2
        })
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        discount: '',
        qq: '',
        user: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm3'].clearValidate()
      })
    },

    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    getStartTime() {
      const date = new Date()
      date.setMonth(date.getMonth() - 1)
      const dateString =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        '  ' +
        '8:00:00'
      return Date.parse(dateString) / 1000
    },
    getEndTime() {
      const date = new Date()
      return Date.parse(date) / 1000
    },
    /*
      显示详情
    */
    showCardInfo(row) {
      this.cardInfo = {}
      this.dialogShowCardVisible = true
      const postData = { card: row.cardnumber }
      showCardInfo(postData).then(response => {
        this.cardInfo = response.data
      })
    },
    back() {
      history.go(0)
    }
  }
}
</script>
