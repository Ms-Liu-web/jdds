<template>
  <div class="dashboard-editor-container">
    <panel-group />

    <el-row :gutter="40" class="canves_box">
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <line-chart :child-data="chartData2" :child-moutn="mounth" />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <line-chart2 :child-data="chartData2" :child-moutn="mounth" />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <line-chart3 :child-data="chartData2" :child-moutn="mounth" />
      </el-col>
    </el-row>
    <Notice />
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import LineChart2 from "./components/LineChart2";
import LineChart3 from "./components/LineChart3";
import Notice from "./components/Notice";
import { getReportForm } from "@/api/agent";
export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
    LineChart2,
    LineChart3,
    Notice
  },
  data() {
    return {
      chartSetOption: [],
      chartData2: [],
      mounth: ""
    };
  },
  created() {
    getReportForm().then(response => {
      console.log(response);
      this.chartData2 = response.data.list;
      this.mounth = response.data.month;
      console.log(this.chartData2);
    });
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: #fff;
  position: relative;
  padding: 25px 28px;
  .canves_box {
    background: #fff;
    margin-left: 0 !important;
    margin-right: 0 !important;
    box-shadow: 0px 0px 6px 0px rgba(186, 186, 186, 0.1);
    border-radius: 8px;
    padding: 28px 0;
    margin-bottom: 30px;
  }
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
