<template>
  <div class="dashboard-editor-container">
    <panel-group />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      chartSetOption: []
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: #f9faff;
  position: relative;

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
