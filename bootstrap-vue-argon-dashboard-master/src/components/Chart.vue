<template>
  <div class="chartElem">
    <div class="row">
      <highcharts
        class="chart"
        :options="chartOptions"
        :updateArgs="updateArgs"
      ></highcharts>
    </div>
    <div class="row">
      <div id="chartType">
        <h3>Select chart type:</h3>
        <select v-model="chartType">
          <option>Spline</option>
          <option>AreaSpline</option>
          <option>Line</option>
          <option>Scatter</option>
          <option>Column</option>
          <option>Area</option>
        </select>
      </div>
      <div id="animationDuration">
        <h3>Select update animation duration:</h3>
        <select v-model="animationDuration" type="number">
          <option>0</option>
          <option>500</option>
          <option>1000</option>
          <option>2000</option>
        </select>
      </div>
      <!-- <div id="seriesColor">
        <h3>Select color of the series:</h3>
        <div class="row">
          <input
            id="colorPicker"
            v-if="colorInputIsSupported"
            type="color"
            value="#6fcd98"
            v-model="seriesColor"
          />
          <select v-else v-model="seriesColor">
            <option>Red</option>
            <option>Green</option>
            <option>Blue</option>
            <option>Pink</option>
            <option>Orange</option>
            <option>Brown</option>
            <option>Black</option>
            <option>Purple</option>
          </select>
        </div>
        <p>Current color: {{ seriesColor }}</p>
      </div>-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      title: "",
      lable: [],

      datas: [501, 110, 1228, 1442, 261, 411],
      datas: [],
      points: [101, 0, 8, 2, 6, 4],
      chartType: "Column",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      animationDuration: 1000,
      updateArgs: [true, true, { duration: 1000 }],
      chartOptions: {
        chart: {
          type: "column",
        },
        title: {
          text: "Doanh Thu 6 Tháng Gần Đây",
        },

        series: [
          {
            data: [501, 110, 1228, 1442, 261, 411],
            color: "#6fcd98",
          },
        ],
        xAxis: {
          categories: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
          // categories:[],
        },
      },
    };
  },
  // computed: {
  //   data: this.datas,
  // },
  created() {
    let i = document.createElement("input");
    i.setAttribute("type", "color");
    i.type === "color"
      ? (this.colorInputIsSupported = true)
      : (this.colorInputIsSupported = false);

    this.GetMonthLineChart();
  },
  methods: {
    getListMonthChart(data) {
      const TOTAL_MONTH_STATISTIC = 6;

      const now = moment();

      const startMonth = moment(now)
        .subtract(TOTAL_MONTH_STATISTIC, "months")
        .format("M/YYYY");

      var listMonth = [];

      let i = 1;

      while (i <= TOTAL_MONTH_STATISTIC) {
        listMonth.push(
          moment(now)
            .subtract(TOTAL_MONTH_STATISTIC - i, "months")
            .format("M/YYYY")
        );
        i++;
      }
      this.datas = listMonth;

      console.log(this.datas, "datas");
      // console.log(, "data");
    },

    GetMonthLineChart() {
      axios
        .get("http://127.0.0.1:8000/comsum/statis_month/")
        .then((response) => {
          this.getListMonthChart(response.data.data);
          // console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    title(newValue) {
      this.chartOptions.title.text = newValue;
    },
    points(newValue) {
      this.chartOptions.series[0].data = newValue;
    },
    chartType(newValue) {
      this.chartOptions.chart.type = newValue.toLowerCase();
    },
    seriesColor(newValue) {
      this.chartOptions.series[0].color = newValue.toLowerCase();
    },
    animationDuration(newValue) {
      this.updateArgs[2].duration = Number(newValue);
    },
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
#colorPicker {
  border: 0;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 30px;
}
.numberInput {
  width: 30px;
}
</style>
