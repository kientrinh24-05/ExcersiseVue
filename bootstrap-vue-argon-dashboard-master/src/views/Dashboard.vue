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

    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="8" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
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
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </b-col>

        <b-col xl="4" class="mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-uppercase text-muted ls-1 mb-1">Thống Kê</h6>
                <h5 class="h3 mb-0">Số Sản Phẩm</h5>
              </b-col>
            </b-row>

            <bar-chart :height="350" ref="barChart" :chart-data="redBarChart.chartData">
            </bar-chart>
            <div>{{ message }}</div>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->

      <!--Tables-->

      <!--End tables-->
    </b-container>
  </div>
</template>
<script>
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
  },
  data() {
    let bigLineChartData = [12011, 223, 110, 40000, 55000, 2410, 20, 360, 160];
    return {
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
      redBarChart: {
        chartData: {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec1"],
          datasets: [
            {
              label: "Sales",
              data: [25, 20, 6, 22, 17, 29],
            },
          ],
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
    getDataGreneral() {
      axios
        .get("http://127.0.0.1:8000/comsum/general/")
        .then((response) => (this.info = response.data.data));
    },
    getListMonthChart(data) {
      console.log(data);
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

      console.log(this.labels, "labels");
      this.message = "bien message sau khi call api lay so lieu render lai";
    },

    GetMonthLineChart() {
      axios
        .get("http://127.0.0.1:8000/comsum/statis_month/")
        .then((response) => {
          this.getListMonthChart(response.data.data);
          console.log(response);
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
