<template>
  <div>
    <contentTop />
    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png" />
        <span>下级代理</span>
      </div>
      <div class="filter-container">
        <div class="s_left">
          <el-button class="filter-item addBtn" type="primary" @click="handleCreate">
            <img src="../../assets/icon/x1.png" />添加下级
          </el-button>
          <el-button v-waves class="filter-item sx" type="primary" @click="back">
            <img src="../../assets/icon/k4.png" />刷新
          </el-button>
        </div>
        <div class="search">
          <el-input
            v-model="listQuery.qq"
            placeholder="输入qq号"
            style="width: 200px;"
            class="filter-item filter_input"
            @keyup.enter.native="handleFilter"
          />
          <el-button
            v-waves
            class="filter-item filter_btn"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
        </div>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        fit
        highlight-current-row
        style="width: 100%;"
        class="custom_table"
        @sort-change="sortChange"
      >
        <el-table-column
          label="用户"
          prop="id"
          align="center"
          width="80"
          :class-name="getSortClass('id')"
        >
          <template slot-scope="{ row }">
            <span>{{ row.user }}</span>
          </template>
        </el-table-column>

        <el-table-column label="qq号" align="center" :class-name="getSortClass('id')">
          <template slot-scope="{ row }">
            <span>{{ row.qq }}</span>
          </template>
        </el-table-column>
        <el-table-column label="代理折扣" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.discount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拿卡数量" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.cardcount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="余额" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.cardcount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户状态" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.accountType === 1">冻结</span>
            <span v-if="row.accountType === 0">正常</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          width="280"
        >
          <template slot-scope="{ row }">
            <el-button type="primary" class="cz" @click="addMoney(row,'addMoney')">
              <img src="../../assets/icon/dl.png" />充值
            </el-button>
            <el-button
              v-if="row.accountType === 1"
              type="primary"
              class="jc"
              @click="handleModifyStatus(row, 'unfreeze')"
            >
              <img src="../../assets/icon/jc.png" />解除冻结
            </el-button>
            <el-button
              v-else
              type="success"
              class="djUser"
              @click="handleModifyStatus(row, 'freeze')"
            >
              <img src="../../assets/icon/dj.png" />冻结用户
            </el-button>
            <el-button
              type="primary"
              class="modify"
              style="margin:5px 0 0 0"
              @click="handleUpdate(row)"
            >
              <img src="../../assets/icon/xg.png" />修改折扣
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 20"
        class="pagestyle"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />

      <el-dialog title="添加下级" width="500px" :visible.sync="dialogFormVisible">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          label-position="left"
          label-width="70px"
          style="width: 400px; margin-left:30px;"
        >
          <el-form-item label="账号" prop="user">
            <el-input v-model="temp.user" placeholder="请输入用户账号" />
          </el-form-item>

          <el-form-item label="QQ号" prop="qq">
            <el-input v-model="temp.qq" placeholder="请输入用户qq" />
          </el-form-item>

          <el-form-item label="折扣" prop="discount">
            <el-input v-model="temp.discount" placeholder="请输入下级折扣" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addSuperior">保存</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改折扣" width="500px" :visible.sync="updateSuperiorVisible">
        <el-form
          ref="updateSuperiorFrom"
          :rules="rules"
          :model="temp"
          label-position="left"
          label-width="70px"
          style="width: 400px; margin-left:50px;"
        >
          <el-form-item label="账号" prop="user">
            <el-input v-model="temp.user" hidden value placeholder="请输入用户账号" />
          </el-form-item>

          <el-form-item label="QQ号" prop="qq">
            <el-input v-model="temp.qq" hidden placeholder="请输入用户qq" />
          </el-form-item>

          <el-form-item label="折扣" prop="discount">
            <el-input v-model="temp.discount" placeholder="请输入下级折扣" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateSuperiorVisible = false">取消</el-button>
          <el-button type="primary" @click="updateSuperior">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getSuperior,
  freezeAgent,
  unFreezeAgent,
  bindSuperior,
  updateSuperior,
  addMoney
} from "@/api/agent";
import waves from "@/directive/waves"; // waves directive
import contentTop from "@/components/contentTop/index";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "AgentManage",
  components: { Pagination, contentTop },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
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
      listLoading: true,
      user: "",
      listQuery: {
        page: 1,
        limit: 20,
        pagesize: 20,
        qq: undefined
      },
      showReviewer: false,
      temp: {
        discount: "",
        qq: "",
        user: ""
      },
      dialogFormVisible: false,
      rules: {
        user: [{ required: true, message: "用户必填", trigger: "blur" }],
        discount: [{ required: true, message: "折扣必填", trigger: "blur" }],
        qq: [{ required: true, message: "qq必填", trigger: "blur" }]
      },
      updateSuperiorVisible: false,
      rules: {
        discount: [{ required: true, message: "折扣必填", trigger: "blur" }]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getSuperior(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    getInfo() {
      getInfo().then(response => {
        this.user = response.data;
      });
    },
    /*
      冻结与解冻
    */
    handleModifyStatus(row, status) {
      if (status === "unfreeze") {
        const postData = { user: row.user };
        unFreezeAgent(postData).then(response => {
          this.$confirm("你确定要解冻？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }).then(() => {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            row.account_type = 0;
          });
        });
      } else if (status === "freeze") {
        this.$prompt("请输入冻结原因", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({ value }) => {
          const postData = { user: row.user, msg: value };
          freezeAgent(postData).then(response => {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            row.account_type = 1;
          });
        });
      }
    },
    addMoney(row) {
      this.$prompt("请输入正确金额（例：100）", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
        inputErrorMessage: "请输入正确金额"
      }).then(({ value }) => {
        console.log(row);
        console.log(value);
        const postData = { qq: row.qq, user: row.user, money: value };
        addMoney(postData).then(response => {
          this.$message({
            type: "success",
            message: "恭喜你，充值成功"
          });
        });
      });
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        discount: "",
        qq: "",
        user: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleUpdate(row) {
      this.temp.user = row.user;
      this.temp.qq = row.qq;
      this.updateSuperiorVisible = true;
      this.$nextTick(() => {
        this.$refs["updateSuperiorFrom"].clearValidate();
      });
    },
    /*
      绑定下级
    */
    addSuperior() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          bindSuperior(this.temp).then(() => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "Success",
              message: "绑定成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    /*
      修改下级折扣
     */
    updateSuperior() {
      this.$refs["updateSuperiorFrom"].validate(valid => {
        console.log(this.temp);
        if (valid) {
          updateSuperior(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "Success",
              message: "修改成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleDelete(row) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}`
        ? "ascending"
        : sort === `-${key}`
        ? "descending"
        : "";
    },
    back() {
      this.listQuery.page = 1;
      this.listQuery.qq = "";
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
.app-nav {
  width: 100%;
  height: 78px;
  background-color: #fff;
  margin-bottom: 18px;
  padding: 0 23px;
  .lie {
    padding-top: 15px;
    margin-right: 120px;
    float: left;
    span {
      float: left;
      display: inline-block;
      width: 48px;
      height: 48px;
      margin-right: 10px;
    }
    .text_p {
      float: left;
      .p1 {
        font-size: 14px;
        color: #999;
        line-height: 23px;
      }
      .p2 {
        font-size: 22px;
        color: #3564c0;
      }
    }
  }
}
.app-container {
  background-color: #fff;
  border-radius: 6px;
  .pagestyle {
    /deep/.el-input--medium .el-input__inner {
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 4px;
      width: 50px;
    }
  }
  .title {
    height: 36px;
    line-height: 25px;
    border-bottom: 1px #a4bffe dashed;
    margin-bottom: 13px;
    color: #3c70d5;
    img {
      position: relative;
      top: 2px;
    }
  }
  .filter-container {
    .s_left {
      float: left;
    }
    .search {
      float: right;
      width: 280px;
      height: 38px;
      .filter_input {
        float: left;
        /deep/.el-input__inner {
          height: 38px;
          line-height: 38px;
          border-radius: 6px 0 0 6px;
          width: 200px;
        }
      }
      .filter_btn {
        float: left;
        padding: 0;
        width: 69px;
        height: 38px;
        border-radius: 0 6px 6px 0;
      }
    }
    .addBtn {
      width: 97px;
      height: 38px;
      border: 1px solid rgba(45, 135, 253, 1);
      border-radius: 4px;
      background-color: transparent !important;
      color: #2d87fd;
      padding: 0;
      img {
        position: relative;
        margin-right: 5px;
        top: 2px;
      }
    }
    .sx {
      width: 74px;
      height: 38px;
      border: 1px solid #9e77f1 !important;
      border-radius: 4px;
      background-color: transparent !important;
      color: #9e77f1;
      padding: 0;
      img {
        position: relative;
        margin-right: 5px;
        top: 2px;
      }
    }
    .cz {
      width: 74px;
      height: 38px;
      border-radius: 4px;
      background-color: #2d87fd;
      color: #fff;
      padding: 0;
      img {
        position: relative;
        margin-right: 5px;
        top: 2px;
      }
    }
  }
  .custom_table {
    /deep/ thead {
      color: #4296fb;
      font-weight: 500;
    }
    /deep/ th {
      background-color: #f4f7fe;
      border-bottom: none;
      font-weight: 500;
    }
    /deep/td {
      border-bottom: 1px solid #f2f3f5;
      color: #333;
    }
    .djUser {
      width: 80px;
      height: 30px;
      border: 1px solid rgba(45, 135, 253, 1) !important;
      border-radius: 4px;
      background-color: transparent !important;
      color: rgba(45, 135, 253, 1);
      padding: 0;
      img {
        position: relative;
        margin-right: 3px;
      }
    }
    .modify {
      width: 80px;
      height: 30px;
      border: 1px solid #b37bec !important;
      border-radius: 4px;
      background-color: transparent !important;
      color: #b37bec;
      padding: 0;
      margin-left: 10px !important;
      img {
        position: relative;
        margin-right: 3px;
        top: 1px;
      }
    }
    .jc {
      width: 80px;
      height: 30px;
      border: 1px solid #0dc504 !important;
      border-radius: 4px;
      background-color: transparent !important;
      color: #0dc504;
      padding: 0;
      img {
        position: relative;
        margin-right: 3px;
        top: 1px;
      }
    }
    .cz {
      width: 64px;
      height: 30px;
      border: 1px solid #fc8403 !important;
      border-radius: 4px;
      background-color: transparent !important;
      color: #fc8403;
      padding: 0;
      img {
        position: relative;
        margin-right: 3px;
        top: 1px;
      }
    }
  }
}
</style>