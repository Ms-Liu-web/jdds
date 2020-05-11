<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { getReportForm } from "@/api/agent";
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      expectedData: [],
      xAxis: [],
      mounth: ""
    };
  },
  mounted() {
    this.initChart();
    this.getData();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        xAxis: {
          data: this.xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#EAEAEA"
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#EAEAEA"
            }
          },
          name: "单位: 数量"
        },
        title: {
          left: "center",
          text: this.mounth + "月销售数量趋势图",
          textStyle: {
            fontSize: 14,
            color: "#3564C0"
          }
        },
        textStyle: {
          fontSize: 14,
          color: "#656565"
        },
        series: [
          {
            name: "总销售数量",
            itemStyle: {
              normal: {
                color: "#5C60FA",
                lineStyle: {
                  color: "#5C60FA",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            data: this.expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          }
        ]
      });
    },
    getData() {
      getReportForm().then(response => {
        let reData = response.data.list;
        this.mounth = response.data.month;
        for (var i = 0; i < reData.length; i++) {
          this.expectedData.push(reData[i].sell_count);
          this.xAxis.push(reData[i].time);
        }
        this.setOptions();
      });
    }
  }
};
</script>
