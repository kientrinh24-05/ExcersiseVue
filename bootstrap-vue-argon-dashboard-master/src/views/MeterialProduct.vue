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
              <h3>Danh sách nguyên liệu</h3>
              <div>
                <div class="pseudo-search">
                  <input type="text" placeholder="Tìm kiếm..." autofocus required />
                  <button class="fa fa-search" type="submit"></button>
                </div>
                <b-button variant="primary"><i class="fas fa-sync-alt"></i></b-button>
                <b-button v-b-modal.modal-2 variant="info"
                  ><i class="fas fa-filter"></i>
                </b-button>

                <b-button v-b-modal.modal-1 variant="success">Thêm mới</b-button>

                <b-modal id="modal-2" title="Filler">
                  <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group id="input-group-1" label="Thời gian">
                      <div class="fillter_date">
                        <b-form-input class="input-date" type="date"></b-form-input>
                        <span>__</span>
                        <b-form-input class="input-date" type="date"></b-form-input>
                      </div>
                    </b-form-group>
                  </b-form>
                </b-modal>
                <b-modal id="modal-1" title="Thêm nguyên liệu">
                  <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group
                      id="input-group-3"
                      label="Tên nguyên liệu"
                      label-for="input-3"
                    >
                      <select class="custom-select" v-model="form.material_id">
                        <option
                          v-for="meterial in meterials"
                          :key="meterial.id"
                          :value="meterial.id"
                        >
                          {{ meterial.material_name }}
                        </option>
                      </select>
                    </b-form-group>

                    <b-form-group
                      id="input-group-3"
                      label="Nhà cung cáp"
                      label-for="input-3"
                    >
                      <select class="custom-select" v-model="form.supplier_id">
                        <option
                          v-for="supplier in supplierls"
                          :key="supplier.id"
                          :value="supplier.id"
                        >
                          {{ supplier.supplier_name }}
                        </option>
                      </select>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Số Lượng" label-for="input-3">
                      <b-form-input
                        id="input-3"
                        v-model="form.amount"
                        placeholder="Nhập số lượng"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-3" label="Giá" label-for="input-3">
                      <b-form-input
                        id="input-3"
                        v-model="form.price"
                        placeholder="Nhập Giá Cả"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-2"
                      label="Ngày nhập"
                      label-for="input-2"
                    >
                      <div class="">
                        <input
                          class="form-control"
                          type="datetime-local"
                          value="2011-08-19T13:45:00"
                          id="example-datetime-local-input"
                          v-model="form.import_date"
                        />
                      </div>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                    <b-button
                      type="button"
                      v-on:click="addNewApartment"
                      class="btn btn-success"
                    >
                      Add +
                    </b-button>
                  </b-form>

                  <main class="container">
                    <form id="app" data-apartments="[]">
                      <hr />
                      <div class="row">
                        <div class="col-xs-2"></div>
                      </div>
                      <div
                        v-for="(apartment, index) in apartments"
                        :key="apartment.index"
                      >
                        <div class="">
                          <div class="col-xs-2">
                            <button
                              type="button"
                              v-on:click="removeApartment(index)"
                              class="btn btn-danger"
                              style="margin: 10px 0"
                            >
                              Rem -
                            </button>
                          </div>

                          <div>
                            <div class="form-group">
                              <b-form-input
                                id="input-1"
                                placeholder="Nhập tên nguyên liệu"
                                name="meterials[][tennl]"
                                required
                              ></b-form-input>
                            </div>
                            <div class="form-group col-xs-5">
                              <b-form-input
                                type="text"
                                name="meterials[][nhacc]"
                                class="form-control"
                                placeholder="Nhập nhà phân phối"
                              ></b-form-input>
                            </div>
                            <div class="form-group col-xs-5">
                              <b-form-input
                                type="text"
                                name="meterials[][soluong]"
                                class="form-control"
                                placeholder="Nhập số lượng"
                              ></b-form-input>
                            </div>
                            <div class="form-group col-xs-5">
                              <b-form-input
                                type="text"
                                name="meterials[][gia]"
                                class="form-control"
                                placeholder="Nhập giá cả"
                              ></b-form-input>
                            </div>
                            <div class="form-group col-xs-5">
                              <input
                                class="form-control"
                                type="datetime-local"
                                value="2011-08-19T13:45:00"
                                name="meterials[][ngaynhap]"
                                id="example-datetime-local-input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </main>
                </b-modal>
              </div>
            </div>

            <!-- Table -->
            <b-row>
              <b-col lg="12">
                <div>
                  <div class="content-table">
                    <b-table
                      class="table-sc"
                      striped
                      hover
                      :items="items"
                      :fields="fields"
                    >
                      <template #cell(actions)="row">
                        <i
                          @click="info(row.item, row.index, $event.target)"
                          class="fas fa-pencil-alt"
                        ></i>
                      </template>
                    </b-table>
                  </div>
                  <div class="count_price">
                    <b-col lg="4">
                      <span>Tổng tiền</span>
                      <label class="label-cout">6.200.456 đ</label>
                    </b-col>
                  </div>

                  <b-card-footer class="py-4 d-flex justify-content-end">
                    <base-pagination
                      v-model="currentPage"
                      :per-page="10"
                      :total="40"
                    ></base-pagination>
                  </b-card-footer>

                  <!-- Modal  -->
                </div>
              </b-col>
            </b-row>
          </card>
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>
  </div>
</template>
<script>
import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from "element-ui";
import projects from "./Tables/projects";
import FormAdd from "./Pages/FormAdd.vue";
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
    FormAdd,
  },
  data() {
    return {
      apartment: {
        price: "",
        rooms: "",
      },
      meterials: [{ text: "", value: null }],
      supplierls: [{ text: "", value: null }],
      apartments: [],
      projects,
      users,
      currentPage: 1,

      form: {
        supplier_id: "",
        material_id: "",
        amount: "",
        price: "",
        import_date: "",
      },

      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      // show: true,
      fields: [
        {
          key: "tên_nguyên_liệu",
        },
        {
          key: "nhà_phân_phối",

          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "số_lượng",

          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "giá",
        },
        {
          key: "ngày_nhập",

          // Variant applies to the whole column, including the header and footer
        },

        // { key: "actions", label: "Hành động" },
      ],
      items: [],
    };
  },
  created() {
    this.getImportMeterial();
    this.getMeterial();
    this.getSupplier();
  },
  methods: {
    addNewApartment() {
      this.apartments.push(Vue.util.extend({}, this.apartment));
    },
    removeApartment(index) {
      Vue.delete(this.apartments, index);
    },
    sumbitForm() {
      console.log("Kane");
    },
    //Get Meterial
    getMeterial() {
      axios
        .get(`http://127.0.0.1:8000/material/list_material/`)
        .then((response) => {
          this.meterials = response.data.data;
          console.log(this.meterials);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Get Supplier
    getSupplier() {
      axios
        .get(`http://127.0.0.1:8000/supplier/list_supplier/`)
        .then((response) => {
          this.supplierls = response.data.data;
          console.log(this.supplierls);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //Get iimportMeterial
    getImportMeterial() {
      fetch("http://127.0.0.1:8000/material/get_importmaterial/")
        .then((response) => response.json())
        .then(
          (json) =>
            (this.items = json.data.map((meterial) => {
              return {
                tên_nguyên_liệu: meterial.material_name,
                nhà_phân_phối: meterial.supplier_name,
                số_lượng: meterial.amount,
                giá: meterial.price,
                ngày_nhập: meterial.import_date,
              };
            }))
        );
    },
    addMeterial(payload) {
      const path = "http://127.0.0.1:8000/material/list_importmaterial/";
      axios
        .post(path, payload)
        .then(() => {
          this.getMeterial();
        })
        .catch((error) => {
          this.getMeterial();
          console.error(error);
        });
    },
    onSubmit(event) {
      event.preventDefault();
      const payload = {
        supplier_id: this.form.supplier_id,
        material_id: this.form.material_id,
        amount: this.form.amount,
        price: this.form.price,
        import_date: this.form.import_date,
      };
      console.log(payload);
      this.addMeterial(payload);
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.tennl = "";
      this.form.nhacc = "";
      this.form.soluong = "";
      this.form.ngaynhap = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
};
</script>
<style>
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
.content_search1 {
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content_search1 #input-id-meterial {
  max-width: 80% !important;
}
.content-table {
  overflow-x: auto;
}
.input-date {
}
.fillter_date {
  max-width: 50%;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.count_price {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0;
}
.label-cout {
  font-weight: bold;
  margin-left: 20px;
  font-size: 20px;
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
