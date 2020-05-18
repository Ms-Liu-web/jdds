<template>
  <div>
    <contentTop />
    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png" />
        <span>用户管理</span>
      </div>
      <div class="filter-container">
        <div class="s_left">
          <el-button v-waves class="filter-item sx" type="primary" @click="back">
            <img src="../../assets/icon/k4.png" />刷新
          </el-button>
        </div>
        <div class="search">
          <el-input
            v-model="listQuery.search_user"
            placeholder="请输入用户账号"
            style="width: 200px;"
            class="filter-item filter_input"
            @keyup.enter.native="handleFilter"
          />
          <el-button
            v-waves
            class="filter-item filter_btn"
            type="primary"
            icon="el-icon-search "
            @click="handleFilter"
          >搜索</el-button>
        </div>
      </div>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        class="custom_table"
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <el-table-column label="用户名" align="center" width="100">
          <template slot-scope="{ row }">
            <span>{{ row.user }}</span>
          </template>
        </el-table-column>

        <el-table-column label="账号状态" align="center" width="100">
          <template slot-scope="{ row }">
            <span v-if="row.account_type === 0">正常</span>
            <span v-if="row.account_type === 1">封停</span>
          </template>
        </el-table-column>

        <el-table-column label="拿卡总金额" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.card_total_price }}</span>
          </template>
        </el-table-column>

        <el-table-column label="拿卡总数量" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.card_total_num }}</span>
          </template>
        </el-table-column>

        <el-table-column label="已使用数量" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.already_used_num }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="未使用数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.card_total_num - row.already_used_num }}</span>
        </template>
        </el-table-column>-->

        <el-table-column label="账号过期时间" align="center" width="250">
          <template slot-scope="{ row }">
            <span>{{ row.expirytime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{ row }">
            <div>
              <el-button type="primary" class="djUser" size="mini" @click="showCardInfo(row)">
                <img src="../../assets/icon/kk.png" />卡详情
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 10"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import { getCardUserList } from "@/api/agentcard";
import contentTop from "@/components/contentTop/index";
import waves from "@/directive/waves"; // waves directive
// import { parseTime } from '@/utils'
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "CardList",
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
      user: "",
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        pagesize: 10,
        search_user: ""
      },
      showReviewer: false,
      temp: {
        count: "",
        cardtypeid: "",
        mark: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogShowCardVisible: false,
      cardInfo: {},
      rules: {
        count: [{ required: true, message: "数量必填", trigger: "blur" }],
        cardtypeid: [
          { required: true, message: "选择分类必填", trigger: "blur" }
        ],
        mark: [{ required: true, message: "填写备注", trigger: "blur" }]
      },
      downloadLoading: false,
      cardTypeList: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getCardUserList(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
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
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}`
        ? "ascending"
        : sort === `-${key}`
        ? "descending"
        : "";
    },
    /*
      显示详情
    */
    showCardInfo(row) {
      this.$router.push({ path: "/agent/card?carduser=" + row.user });
    },
    back() {
      this.listQuery.page = 1;
      this.listQuery.search_user = "";
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
        font-size: 18px;
        color: #3564c0;
      }
    }
  }
}
.app-container {
  background-color: #fff;
  border-radius: 6px;
  min-height: calc(100vh - 250px);
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
      border: 1px solid rgba(45, 135, 253, 1) !important;
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
    .cz:hover {
      background-color: rgba(232, 132, 3, 0.1) !important;
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
      width: 88px;
      height: 30px;
      border: 1px solid rgba(45, 135, 253, 1) !important;
      border-radius: 4px;
      background-color: transparent !important;
      color: rgba(45, 135, 253, 1);
      padding: 0;
      img {
        position: relative;
        margin-right: 3px;
        top: 2px;
      }
    }
    .djUser:hover {
      background-color: rgba(45, 135, 253, 0.1) !important;
    }
  }
}
</style>
