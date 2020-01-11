<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input v-model="listQuery.search_user" placeholder="请输入用户账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="back">
        刷新
      </el-button>
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

      <el-table-column label="用户名" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.user }}</span>
        </template>
      </el-table-column>

      <el-table-column label="账号状态" align="center" width="100">
        <template slot-scope="{row}">
          <span v-if="row.account_type ===0">正常</span>
          <span v-if="row.account_type ===1">封停</span>
        </template>
      </el-table-column>

      <el-table-column label="拿卡总金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.card_total_price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="拿卡总数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.card_total_num }}</span>
        </template>
      </el-table-column>

      <el-table-column label="已使用数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.already_used_num }}</span>
        </template>
      </el-table-column>

      <el-table-column label="未使用数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.card_total_num - row.already_used_num }}</span>
        </template>
      </el-table-column>

      <el-table-column label="账号过期时间" align="center" width="250">
        <template slot-scope="{row}">
          <span>{{ row.expirytime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">

          <div>
            <el-button type="primary" size="mini" @click="showCardInfo(row)">
              卡详情
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { getCardUserList } from '@/api/agentcard'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
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
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        pagesize: 20,
        search_user: ''
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
      cardInfo: {
      },
      rules: {
        count: [{ required: true, message: '数量必填', trigger: 'blur' }],
        cardtypeid: [{ required: true, message: '选择分类必填', trigger: 'blur' }],
        mark: [{ required: true, message: '填写备注', trigger: 'blur' }]
      },
      downloadLoading: false,
      cardTypeList: [
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getCardUserList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.count
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    /*
      显示详情
    */
    showCardInfo(row) {
      this.$router.push({ path: '/agent/card?carduser=' + row.user })
    },
    back() {
      history.go(0)
    }
  }
}
</script>
