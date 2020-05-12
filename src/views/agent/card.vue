<template>
  <div>
    <div class="app-nav">
      <div class="lie">
        <span>
          <img src="../../assets/icon/xj1.png" />
        </span>
        <div class="text_p">
          <p class="p1">代理级别</p>
          <p class="p2">{{ user.level }}</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="lie">
        <span>
          <img src="../../assets/icon/xj2.png" />
        </span>
        <div class="text_p">
          <p class="p1">拿卡折扣</p>
          <p class="p2">{{ user.discount }}%</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="lie">
        <span>
          <img src="../../assets/icon/xj3.png" />
        </span>
        <div class="text_p">
          <p class="p1">余额</p>
          <p class="p2">{{ user.balance }}</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png" />
        <span>卡密管理</span>
      </div>
      <div class="filter-container">
        <div class="s_left">
          <el-button class="filter-item s_card" type="primary" @click="handleCreate">
            <img src="../../assets/icon/k3.png" />生成卡
          </el-button>

          <el-button v-waves class="filter-item sx" type="primary" @click="back">
            <img src="../../assets/icon/k4.png" />刷新
          </el-button>
        </div>
        <div class="search">
          <div class="type_select">
            <span>类型：</span>
            <el-select
              v-model="listQuery.cardtype"
              style="width: 140px"
              class="filter-item"
              @change="selectActive"
            >
              <el-option
                v-for="item in cardTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="type_select">
            <span>状态：</span>
            <el-select
              v-model="listQuery.cardstatus"
              style="width: 140px"
              class="filter-item"
              @change="selectStatus"
            >
              <el-option
                v-for="item in cardStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="s_box">
            <el-input
              v-model="listQuery.card_user"
              placeholder="请输入使用者账号"
              style="width: 200px;"
              class="filter-item filter_input"
            />
            <el-button
              v-waves
              class="filter-item filter_btn"
              type="primary"
              icon="el-icon-search"
              @click="handleFilter"
            >搜索</el-button>
            <div style="clear:both"></div>
          </div>
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
        <!-- <el-table-column
        label="ID"
        prop="id"

        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
        </el-table-column>-->

        <el-table-column label="卡密" align="center" width="300">
          <template slot-scope="{ row }">
            <span>{{ row.cardnumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.created_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="过期时间" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.expire_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="卡类型" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.cardtypename }}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否封停" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.cardfreeze === 1">封停</span>
            <span v-if="row.cardfreeze === 0">正常</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.status === 1">已使用</span>
            <span v-if="row.status === 0">未使用</span>
            <span v-if="row.status === 2">已删除</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
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
                class="djUser"
                @click="handleModifyStatus(row, 'freeze')"
              >
                <img src="../../assets/icon/dj.png" />冻结
              </el-button>
              <el-button
                type="primary"
                size="mini"
                class="modify"
                style="margin:5px 0 0 0"
                @click="showCardInfo(row)"
              >
                <img src="../../assets/icon/k6.png" />详情
              </el-button>

              <el-button
                v-if="row.status !== 2"
                type="danger"
                size="mini"
                class="detale"
                style="margin:5px 0 0 0"
                @click="deleteCard(row)"
              >
                <img src="../../assets/icon/k2.png" />删除
              </el-button>
            </div>
            <div v-else>
              <el-button
                type="primary"
                size="mini"
                class="modify"
                style="margin:5px 0 0 0"
                @click="showCardInfo(row)"
              >详情</el-button>
              <el-button
                v-if="row.status !== 2"
                type="danger"
                style="margin:5px 0 0 0"
                size="mini"
                class="detale"
                @click="deleteCard(row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total >20"
        class="pagestyle"
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
            <el-input v-model="temp.mark" type="textarea" style="width:290px" placeholder="请输入备注" />
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
        class="cardDetails"
        :visible.sync="dialogShowCardVisible"
      >
        <table :model="cardInfo" class="buyTable" cellpadding="0" cellspacing="0">
          <tr>
            <td class="t1">购买者</td>
            <td class="t2">
              <div v-if="cardInfo.user == null">尚未售出</div>
              <div v-if="cardInfo.user !== null">{{ cardInfo.user }}</div>
            </td>
          </tr>
          <tr>
            <td class="t1">卡密</td>
            <td class="t2">
              <div>{{ cardInfo.cardnumber }}</div>
            </td>
          </tr>
          <tr>
            <td class="t1">备注</td>
            <td class="t2">
              <div>{{ cardInfo.remarks }}</div>
            </td>
          </tr>
          <tr>
            <td class="t1">类型</td>
            <td class="t2">
              <div>{{ cardInfo.cardtypename }}</div>
            </td>
          </tr>
          <tr>
            <td class="t1">是否冻结</td>
            <td class="t2">
              <div v-if="cardInfo.cardfreeze === 0">否</div>
              <div v-if="cardInfo.cardfreeze === 1">是</div>
            </td>
          </tr>
          <tr>
            <td class="t1">卡状态</td>
            <td class="t2">
              <div v-if="cardInfo.status === 0">未使用</div>
              <div v-if="cardInfo.status === 1">已使用</div>
              <div v-if="cardInfo.status === 2">已删除</div>
            </td>
          </tr>
          <tr>
            <td class="t1">过期时间</td>
            <td class="t2">
              <div>{{ cardInfo.expire_time }}</div>
            </td>
          </tr>
          <tr>
            <td class="t1">创建时间</td>
            <td class="t2">
              <div>{{ cardInfo.created_time }}</div>
            </td>
          </tr>
        </table>
        <div slot="footer" class="dialog-footer card_btn">
          <el-button @click="dialogShowCardVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
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
} from "@/api/agentcard";
import { getInfo } from "@/api/user";
import waves from "@/directive/waves"; // waves directive
// import { parseTime } from '@/utils'
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "CardList",
  components: { Pagination },
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
      cardTypeList: [{ id: -1, name: "全部" }],
      cardStatus: [
        { id: -1, name: "全部" },
        { id: "0", name: "未使用" },
        { id: "1", name: "已使用" },
        { id: "2", name: "已删除" }
      ]
    };
  },
  activated() {},
  created() {
    this.listQuery.card_user = this.$route.query.carduser;
    this.getList();
    this.getCardTypeList();
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getList() {
      this.listQuery.start = this.getStartTime();
      this.listQuery.end = this.getEndTime();
      this.listLoading = true;
      getCardList(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    selectActive() {
      this.listQuery.page = 1;
      this.getList();
    },
    selectStatus() {
      this.listQuery.page = 1;
      this.getList();
    },
    getInfo() {
      getInfo().then(response => {
        this.user = response.data;
      });
    },
    getCardTypeList() {
      getCardType().then(response => {
        response.data.forEach(element => {
          this.cardTypeList.push(element);
        });
      });
    },
    addCard() {
      this.$refs["dataForm3"].validate(valid => {
        if (valid) {
          createCard(this.temp).then(response => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "Success",
              message: "生成成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    /*
      冻结与解冻
    */
    handleModifyStatus(row, status) {
      if (status === "unfreeze") {
        const postData = { card: row.cardnumber };
        thawCard(postData).then(response => {
          this.$confirm("你确定要解冻？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            row.cardfreeze = 0;
          });
        });
      } else if (status === "freeze") {
        this.$prompt("请输入冻结原因", "冻结", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({ value }) => {
          const postData = { card: row.cardnumber, msg: value };
          freezeCard(postData).then(response => {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            row.cardfreeze = 1;
          });
        });
      }
    },
    deleteCard(row) {
      this.$confirm("你确定要删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        const delete1 = { card: row.cardnumber };
        deleteCard(delete1).then(response => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          row.status = 2;
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
        this.$refs["dataForm3"].clearValidate();
      });
    },

    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}`
        ? "ascending"
        : sort === `-${key}`
        ? "descending"
        : "";
    },
    getStartTime() {
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      const dateString =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        "  " +
        "8:00:00";
      return Date.parse(dateString) / 1000;
    },
    getEndTime() {
      const date = new Date();
      return Date.parse(date) / 1000;
    },
    /*
      显示详情
    */
    showCardInfo(row) {
      this.cardInfo = {};
      this.dialogShowCardVisible = true;
      const postData = { card: row.cardnumber };
      showCardInfo(postData).then(response => {
        this.cardInfo = response.data;
      });
    },
    back() {
      this.listQuery.page = 1;
      this.listQuery.card_user = "";
      this.listQuery.cardtype = -1;
      this.listQuery.cardstatus = -1;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-input--medium {
  text-align: left !important;
}
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
  .cardDetails {
    /deep/.el-dialog__title {
      color: #2d6afa;
      margin-right: 20px;
    }
    /deep/.el-form-item {
      margin-bottom: 0;
      height: 41px;
    }
    /deep/.el-form-item__label {
      color: #2d6afa;
      margin-right: 20px;
    }
  }
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
      // width: 280px;
      // height: 38px;
      .type_select {
        float: left;
        line-height: 38px;
        height: 38px;
        margin-right: 119px;
        span {
          display: inline-block;
          position: relative;
          top: -9px;
          color: #808080;
        }
        /deep/.el-input__inner {
          width: 120px;
          height: 38px;
        }
        /deep/.el-input__suffix {
          right: 27px;
        }
      }
      .s_box {
        float: left;
      }
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
    .s_card {
      width: 92px;
      height: 38px;
      border-radius: 4px;
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
      width: 64px;
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
      width: 64px;
      height: 30px;
      border: 1px solid #b37bec !important;
      border-radius: 4px;
      background-color: transparent !important;
      color: #b37bec;
      padding: 0;
      img {
        position: relative;
        margin-right: 3px;
        top: 1px;
      }
    }
    .detale {
      width: 64px;
      height: 30px;
      border: 1px solid #fd0012 !important;
      border-radius: 4px;
      background-color: transparent !important;
      color: #fd0012;
      padding: 0;
      img {
        position: relative;
        margin-right: 3px;
        top: 1px;
      }
    }
  }
  .buyTable {
    width: 420px;
    margin: auto;
    border: 1px solid #e6e6e6;
    border-collapse: collapse;
    tr td {
      border: 1px #e6e6e6 solid;
      height: 40px;
      line-height: 40px;
    }
    tr td.t1 {
      width: 101px;
      text-align: center;
      color: #2d6afa;
    }
    tr td.t2 {
      width: 318px;
      padding-left: 23px;
      color: #333;
    }
  }
  .card_btn {
    text-align: center;
    /deep/.el-button {
      border: 1px solid rgba(53, 100, 192, 1);
      border-radius: 4px;
      color: #2d6afa;
    }
  }
}
</style>
