<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.qq" placeholder="输入qq号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加下级
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
      <el-table-column label="用户" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.user }}</span>
        </template>
      </el-table-column>

      <el-table-column label="qq号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.qq  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理折扣" align="center">
        <template slot-scope="{row}">
          <span>{{ row.discount  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="拿卡数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cardcount  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="余额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cardcount  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户状态" align="center">
        <template slot-scope="{row}">
          <span v-if="row.account_type === 1">冻结</span>
          <span v-if="row.account_type === 0">正常</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="{row}" >
          <el-button type="primary" v-if="row.account_type === 1"  @click="handleModifyStatus(row,'unfreeze')">
            解除冻结
          </el-button>
          <el-button   v-else  type="success" @click="handleModifyStatus(row,'freeze')">
            冻结用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="添加下级" width="500px" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        
        <el-form-item label="账号" prop="user">
          <el-input v-model="temp.user"  placeholder="请输入用户账号" />
        </el-form-item>
        
        <el-form-item label="QQ号" prop="qq">
          <el-input  v-model="temp.qq" placeholder="请输入用户qq" />
        </el-form-item>

        <el-form-item label="折扣" prop="discount">
          <el-input v-model="temp.discount" placeholder="请输入下级折扣" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addSuperior">
          保存
        </el-button>
      </div>
    </el-dialog>


 
  </div>
</template>

<script>
import { getSuperior,freezeAgent,unFreezeAgent,bindSuperior } from '@/api/agent'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination



export default {
  name: "agentManage",
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
        pagesize:20,
        qq:undefined,
      },
      showReviewer: false,
      temp: {
        discount: '',
        qq: '',
        user: '',
      },
      dialogFormVisible: false,
      rules: {
        user: [{ required: true, message: '用户必填', trigger: 'blur' }],
        discount: [{ required: true, message: '折扣必填', trigger: 'blur' }],
        qq: [{ required: true, message: 'qq必填', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true

      getSuperior(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    /*
      冻结与解冻
    */
    handleModifyStatus(row, status) {
      if (status ==='unfreeze') {
        const postData = {user:row.user}
        unFreezeAgent(postData).then(response => {
            this.$confirm('你确定要解冻？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              }); 
              row.account_type = 0
            })
        })
      } else if (status ==='freeze'){
        this.$prompt('请输入冻结原因', '冻结', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const postData = {user:row.user,msg:value}
          freezeAgent(postData).then(response => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            row.account_type = 1
          })
        })
      }
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
        user: '',
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /*
      绑定下级
    */
    addSuperior() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          bindSuperior(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: 'Success',
              message: '绑定成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    back(){
     history.go(0);
   }
  }
}
</script>
