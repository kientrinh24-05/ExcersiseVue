<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <div class="items-click-add">
              <h2>Báo Cáo</h2>
              <div>
                <div class="pseudo-search">
                  <input type="text" placeholder="Tìm kiếm..." autofocus required />
                  <button class="fa fa-search" type="submit"></button>
                </div>
                <b-button variant="primary"><i class="fas fa-sync-alt"></i></b-button>
                <b-button v-b-modal.modal-2 variant="info"
                  ><i class="fas fa-filter"></i>
                </b-button>
                <b-modal id="modal-2">
                  <b-form-group id="input-group-1" label="Thời gian.">
                    <b-row>
                      <b-col lg="6">
                        <b-form-input
                          class="input-date"
                          v-model="fillter.fromdate"
                          value="01/02/2021"
                          type="date"
                        ></b-form-input>
                      </b-col>
                      <b-col lg="6">
                        <b-form-input
                          class="input-date"
                          value="05/04/2021"
                          v-model="fillter.todate"
                          type="date"
                        ></b-form-input>
                      </b-col>
                    </b-row>
                  </b-form-group>
                  <b-button variant="success" @click="onSeach">Lọc</b-button>
                </b-modal>
              </div>

              <!-- Table  -->
            </div>
            <div>
              <b-row class="mt-7">
                <b-col xl="12" class="mb-5 mb-xl-0">
                  <b-table :items="items2" :fields="fields2" caption-top> </b-table>
                </b-col>
                <hr />
                <div>
                  <b-modal id="modalPopover" title="Modal with Popover" ok-only>
                    <b-row>
                      <b-col lg="7">
                        <b-form-group
                          id="input-group-3"
                          label="Tên nguyên liệu"
                          label-for="input-3"
                        >
                          <select class="custom-select" v-model="form.material">
                            <option
                              v-for="meterial in meterials"
                              :key="meterial.id"
                              :value="meterial.id"
                            >
                              {{ meterial.material_name }}
                            </option>
                          </select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group
                          id="input-group-3"
                          label="Số lượng"
                          label-for="input-3"
                        >
                          <b-input type="text" v-model="form.material_reality"></b-input>
                        </b-form-group>
                      </b-col>
                    </b-row>

                    <div>
                      <b-table
                        :items="items1"
                        :fields="fields1"
                        stacked="md"
                        show-empty
                        small
                      >
                      </b-table>
                    </div>

                    <b-button
                      class="mt-3"
                      variant="outline-danger"
                      @click="onSubmitMeterial"
                      >Thêm</b-button
                    >
                  </b-modal>
                </div>
                <b-col xl="12" class="mb-5 mb-xl-0 mt-6">
                  <div class="d-flex">
                    <b>Bạn đã cập nhập nguyên liệu thực gần nhất vào {{ date.date }}</b>
                    <div>
                      <b-button
                        v-b-modal.modalPopover
                        variant="primary"
                        id="toggle-btn"
                        style="margin: 1rem"
                        >Kiểm Kho</b-button
                      >

                      <b-button
                        variant="success"
                        style="margin: 1rem; float: right"
                        @click="Consumption"
                        v-b-modal.modal-sales
                        >Chốt Sales</b-button
                      >

                      <b-modal id="modal-sales">
                        <p class="my-4">Nguyên liệu tiêu thụ hôm nay !</p>
                        <hr />

                        <b-table :items="items3" :fields="fields3" caption-top> </b-table>
                      </b-modal>
                    </div>
                  </div>

                  <b-table :items="items" :fields="fields" caption-top> </b-table>
                </b-col>
              </b-row>
            </div>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import PageVisitsTable from "./Dashboard/PageVisitsTable";
import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from "element-ui";
import projects from "./Tables/projects";
import users from "./Tables/users";
import LightTable from "./Tables/RegularTables/LightTable";
import axios from "axios";

export default {
  components: {
    LightTable,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    PageVisitsTable,
    SocialTrafficTable,
  },
  data() {
    return {
      projects,
      users,
      selected: null,
      fields: [
        { key: "nameproduct", label: "Tên Nguyên Liệu" },
        { key: "countreal", label: "Số lượng còn thực" },
        { key: "countdigital", label: "Số lượng còn ảo" },
      ],
      fields1: [
        {
          key: "namemiterial",
          label: "Tên Nguyên Liệu",
        },
        { key: "count", label: "Số Lượng" },
      ],
      fields2: [
        {
          key: "nameproduct",
          label: "Tên Sản Phẩm",
        },
        { key: "price", label: "Giá Sản Phẩm" },
      ],
      fields3: [
        {
          key: "id",
          label: "#",
        },
        { key: "meterial_name", label: "Tên Nguyên Liệu" },
        { key: "amount_consumption", label: "Số lượng tiêu thụ" },
        { key: "time_consumption", label: "Ngày tiêu thụ" },
      ],
      fillter: {
        fromdate: "",
        todate: "",
      },
      form: {
        material: "",
        material_reality: "",
      },
      date: null,
      meterials: [],
      items: [],
      items1: [],
      items2: [],
      items3: [],
    };
  },
  created() {
    this.getStatisMeterial();
    this.getMeterial();
    this.getRealMaterial();
    this.getDateStais();
  },
  methods: {
    // SEARCH PRODUCT
    searchItem(payload) {
      const path = "http://127.0.0.1:8000/comsum/consum_food/";
      axios
        .post(path, payload)
        .then((res) => {
          this.items2 = res.data.data.map((material) => {
            return {
              nameproduct: material.food_name,
              price: material.food_price,
            };
          });
        })

        .catch((error) => {
          // this.getSuplier();
          console.log(error);
        });
    },

    onSeach() {
      const payload = {
        fromdate: this.fillter.fromdate,
        todate: this.fillter.todate,
      };

      this.searchItem(payload);
    },
    // UPDATE STATIS
    Consumption() {
      const path = "http://127.0.0.1:8000/comsum/consumption/";
      axios
        .post(path)
        .then((res) => {
          console.log(res);
          this.getStatisMeterial();
          this.getConsumption();
        })
        .catch((error) => {
          console.log(error);
          this.getStatisMeterial();
          this.getConsumption();
        });
    },

    AddRealMaterial(payload) {
      const path = "http://127.0.0.1:8000/comsum/check_ware/";
      axios
        .post(path, payload)
        .then(() => {
          this.getRealMaterial();
          this.getStatisMeterial();
          this.getDateStais();
        })
        .catch((error) => {
          this.getRealMaterial();
          this.getStatisMeterial();
          this.getDateStais();
          console.log(error);
        });
    },
    onSubmitMeterial(event) {
      event.preventDefault();
      const payload = {
        material: this.form.material,
        material_reality: this.form.material_reality,
      };

      this.AddRealMaterial(payload);
    },

    getConsumption() {
      axios
        .get(`http://127.0.0.1:8000/comsum/consumption/`)
        .then((response) => response.data)
        .then((res) => {
          this.items3 = res.data.map((consumption) => {
            return {
              id: consumption.id,
              meterial_name: consumption.material_name,
              amount_consumption: consumption.amount_consumption,
              time_consumption: consumption.time_consumption,
            };
          });
        });
    },
    getRealMaterial() {
      axios
        .get(`http://127.0.0.1:8000/comsum/check_ware/`)
        .then((response) => response.data)
        .then((res) => {
          this.items1 = res.data.map((supplier) => {
            return {
              namemiterial: supplier.material_name,
              count: supplier.material_reality,
            };
          });
        });
    },
    getStatisMeterial() {
      axios
        .get(`http://127.0.0.1:8000/comsum/statis/`)
        .then((response) => response.data)
        .then((res) => {
          this.items = res.data.map((meterial) => {
            return {
              nameproduct: meterial.material_name,
              countreal: meterial.material_reality,
              countdigital: meterial.material_digital,
            };
          });
        });
    },
    getMeterial() {
      axios
        .get(`http://127.0.0.1:8000/material/list_material/`)
        .then((response) => {
          this.meterials = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDateStais() {
      axios
        .get(`http://127.0.0.1:8000/comsum/load_date_ware/`)
        .then((response) => {
          this.date = response.data.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // showModal() {
    //   this.$refs["my-modal"].show();
    // },
    // hideModal() {
    //   this.$refs["my-modal"].hide();
    // },
    // toggleModal() {
    //   // We pass the ID of the button that we want to return focus to
    //   // when the modal has hidden
    //   this.$refs["my-modal"].toggle("#toggle-btn");
    // },
  },
};
</script>
<style>
.d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
.items-click-add {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content_title {
  display: flex;
}
.btn-search {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
.pseudo-search {
  display: inline;
  border: 2px solid #ccc;
  border-radius: 100px;
  padding: 10px 15px;
  transition: background-color 0.5 ease-in-out;
  margin-right: 0.5rem;
}
.pseudo-search input {
  border: 0;
  background-color: transparent;
  width: 200px;
}
.pseudo-search button,
i {
  border: none;
  background: none;
  cursor: pointer;
}

.pseudo-search select {
  border: none;
}
</style>
