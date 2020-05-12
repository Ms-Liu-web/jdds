<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { getReportForm } from "@/api/agent";
import { array } from "jszip/lib/support";
export default {
  mixins: [resize],
  props: {
    childData: {},
    childMoutn: {
      type: String
    },
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
  watch: {
    childData() {
      this.initChart();
      this.getData();
    }
  },
  mounted() {},
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
          axisLabel: {
            interval: 0,
            rotate: 20
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#EAEAEA"
            }
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
          name: "单位: 数量",
          left: 10
        },
        title: {
          left: "center",
          text: this.mounth + "月生成卡趋势图",
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
            name: "生成卡数量",
            itemStyle: {
              normal: {
                color: "#3990EF",
                lineStyle: {
                  color: "#3990EF",
                  width: 2
                }
              }
            },
            lineStyle: {
              width: 3,
              shadowColor: "rgba(0,0,0,0.4)",
              shadowBlur: 10,
              shadowOffsetY: 10
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
      let reData = this.childData;
      this.mounth = this.childMoutn;
      for (var i = 0; i < reData.length; i++) {
        this.expectedData.push(reData[i].create_count);
        this.xAxis.push(reData[i].time);
      }
      this.setOptions();
    }
  }
};
</script>
