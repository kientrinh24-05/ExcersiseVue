<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row v-for="grenal in info" :key="grenal.id">
        <b-col xl="6" md="6">
          <stats-card
            title="Số Sản Phẩm"
            type="gradient-red"
            :sub-title="grenal.amount"
            icon="ni ni-active-40"
            class="mb-2"
          >
            <template slot="footer">
              <span class="text-success mr-2">3.481%</span>
              <span class="text-nowrap">Kể từ tháng trước</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="6" md="6">
          <stats-card
            title="Doanh Thu"
            type="gradient-orange"
            :sub-title="grenal.revenue"
            icon="ni ni-chart-pie-35"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Kể từ tháng trước</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
    <base-header class="pb-6 pb-8 bg-gradient-success">
      <b-container fluid class="mt--7">
        <b-row>
          <b-col lg="12">
            <chart />
          </b-col>
        </b-row>
      </b-container>
    </base-header>

    <!--Charts-->
  </div>
</template>
<script>
//Chart

import Chart from "@/components/Chart.vue";

// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";

// Components
import BaseProgress from "@/components/BaseProgress";
import StatsCard from "@/components/Cards/StatsCard";

// Tables
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import PageVisitsTable from "./Dashboard/PageVisitsTable";

import axios from "axios";
import moment from "moment";
import { Header } from "element-ui";
export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    StatsCard,
    PageVisitsTable,
    SocialTrafficTable,
    //Char
    chart: Chart,
  },
  data() {
    let bigLineChartData = [12011, 223, 110, 40000, 55000, 2410, 20, 360, 160];
    return {
      selected: "chart",
      currentView: "chart",
      message: "gia tri khoi tao cua message",
      //Check lại change data khi call a
      labels: [],

      bigLineChart: {
        // allData: [
        //   [0, 203, 10, 30, 215, 240, 20, 360, 160],
        //   [0, 20, 5, 25, 10, 30, 15, 40, 40],
        // ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "Doanh Thu",
              data: bigLineChartData,
            },
          ],
          // labels: ["11/2020", "12/2020", "1/2021", "2/2021", "3/2021", "4/2021"],
          labels: this.labels,
        },
        extraOptions: chartConfigs.blueChartOptions,
      },

      info: null,
    };
  },
  created() {
    this.getDataGreneral();
  },
  mounted() {
    this.GetMonthLineChart();
  },
  methods: {
    //Chart

    getDataGreneral() {
      axios
        .get("http://127.0.0.1:8000/comsum/general/")
        .then((response) => (this.info = response.data.data));
    },
    getListMonthChart(data) {
      // console.log(data);
      const TOTAL_MONTH_STATISTIC = 6;

      const now = moment();

      const startMonth = moment(now)
        .subtract(TOTAL_MONTH_STATISTIC, "months")
        .format("M/YYYY");

      // var listMonth = [];

      let i = 1;
      while (i <= TOTAL_MONTH_STATISTIC) {
        this.labels.push(
          moment(now)
            .subtract(TOTAL_MONTH_STATISTIC - i, "months")
            .format("M/YYYY")
        );
        i++;
      }
      // this.labels = listMonth;

      // console.log(this.labels, "labels");
      // this.message = "bien message sau khi call api lay so lieu render lai";
    },

    GetMonthLineChart() {
      axios
        .get("http://127.0.0.1:8000/comsum/statis_month/")
        .then((response) => {
          this.getListMonthChart(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // initBigChart(index) {
    //   let chartData = {
    //     datasets: [
    //       {
    //         label: "Performance",
    //         data: this.bigLineChart.allData[index],
    //       },
    //     ],
    //     labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //   };
    //   this.bigLineChart.chartData = chartData;
    //   this.bigLineChart.activeIndex = index;
    // },
  },
};
</script>
<style>
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
