<template>
  <!-- <div class="chartElem">
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
       <div id="seriesColor">
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
      <div>
         <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Thống kê</h6>
                <h5 class="h3 text-white mb-0">Doanh thu 6 tháng gần đây</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                    class="mr-2 mr-md-0"
                    :active="bigLineChart.activeIndex === 0"
                    link-classes="py-2 px-3"
                    @click.prevent="initBigChart(0)"
                  >
                    <span class="d-none d-md-block">Tháng</span>
                    <span class="d-md-none">M</span>
                  </b-nav-item>
                
                </b-nav>
              </b-col>
            </b-row>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
      </div>
     
  
</template>

<script>
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import { Bar } from "vue-chartjs";
import axios from "axios";
import moment from "moment";
export default {
  components:{
      LineChart,
  },
   extends: Bar,
  data() {
    return {
        chartData:null,
       bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
        // chartData: {
        //   datasets: [
        //     {
        //       label: "Performance",
        //       data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
        //     },
        //   ],
        //   labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        // },
        extraOptions: chartConfigs.blueChartOptions,
      },
      title: "",
      lable: [],

      datas: [501, 110, 1228, 1442, 261, 411],
  
      points: [101, 0, 8, 2, 6, 4],
      
     
    };
  },
  
  computed: {
     chartData: {
          datasets: [
            {
              label: "Performance",
              data: [501, 110, 1228, 1442, 261, 411],
            },
          ],
          labels:[101, 0, 8, 2, 6, 4],
        },
  },
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
      this.lable = listMonth;

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
