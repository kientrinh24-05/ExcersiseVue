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
              <span class="text-nowrap">Kể từ tháng trước</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
    <base-header class="pb-6 pb-8">
      <b-container fluid class="mt--5">
        <b-row>
          <b-col xl="12" class="mb-5 mb-xl-0">
            <card type="default">
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
                :chart-data="chartData"
                :extra-options="bigLineChart.extraOptions"
              >
              </line-chart>
            </card>
          </b-col>
        </b-row>
        <!-- End charts-->

        <!--Tables-->

        <!--End tables-->
      </b-container>
    </base-header>

    <!--Charts-->
  </div>
</template>
<script>
//Chart


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
   
  },
  data() {
   
    return {

      datas: [0, 20, 10, 30, 15, 40, 20, 60, 60],
      labels1: [],


      bigLineChart: {
        activeIndex: 0,
  
        extraOptions: chartConfigs.blueChartOptions,
      },

      chartData: {
          datasets: [
            {
              label: "Performance",
              data:[10, 20, 10, 30, 15, 40, 20, 60, 60],
            },
          ],
          labels:['1','2','3','3'],
        },

      info: null,
    };
  },
  computed: {
     
  },
  // mounted() {
  //   this.renderChart(this.chartData, this.options);
  // },
  created() {
    this.getDataGreneral();
    console.log(this.datas);
    console.log(this.labels1);
  },
  mounted() {
    this.GetMonthLineChart();
    this.render;
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
        this.labels1.push(
          moment(now)
            .subtract(TOTAL_MONTH_STATISTIC - i, "months")
            .format("M/YYYY")
        );
        i++;
      }
      // this.labels = listMonth;

       console.log(this.labels1, "labels");
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
