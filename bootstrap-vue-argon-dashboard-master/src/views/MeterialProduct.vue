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
                  <input
                    v-model="searchit_form1.material_name"
                    type="text"
                    placeholder="Tìm kiếm..."
                    autofocus
                    required
                  />
                  <button class="fa fa-search" type="submit"></button>
                </div>
                <b-button variant="primary"><i class="fas fa-sync-alt"></i></b-button>
                <b-button v-b-modal.modal-2 variant="info"
                  ><i class="fas fa-filter"></i>
                </b-button>

                <b-button v-b-modal.modal-1 variant="success">Thêm mới</b-button>

                <b-modal id="modal-2" title="Lọc" ref="modalLoc">
                  <b-form @submit="onSeach" @reset="onReset">
                    <b-form-group id="input-group-1" label="Thời gian">
                      <div class="fillter_date">
                        <b-form-input
                          v-model="searchit_form.from_date"
                          type="datetime-local"
                          value="2011-08-19T13:45:00"
                          id="example-datetime-local-input"
                        ></b-form-input>
                        <span>__</span>
                        <b-form-input
                          v-model="searchit_form.to_date"
                          type="datetime-local"
                          value="2011-08-19T13:45:00"
                          id="example-datetime-local-input"
                        ></b-form-input>
                      </div>
                    </b-form-group>
                    <b-button variant="success" type="submit">Xác Nhận</b-button>
                  </b-form>
                </b-modal>
                <b-modal id="modal-1" title="Thêm nguyên liệu">
                  <b-form @submit="onSubmit" @reset="onReset">
                    <div
                      v-for="(apartment, index) in apartments"
                      :key="`apartment - ${index}`"
                    >
                      <div class="">
                        <div class="col-xs-2">
                          <button
                            type="button"
                            v-on:click="removeApartment(index)"
                            class="btn btn-danger"
                            style="margin: 10px 0"
                          >
                            Xóa
                          </button>
                        </div>

                        <div>
                          <b-form-group
                            id="input-group-3"
                            label="Tên nguyên liệu"
                            label-for="input-3"
                          >
                            <select
                              class="custom-select"
                              v-model="apartment.material_id"
                              :name="`apartments[${index}][material_id]`"
                            >
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
                            <select
                              class="custom-select"
                              v-model="apartment.supplier_id"
                              :name="`apartments[${index}][supplier_id]`"
                            >
                              <option
                                v-for="supplier in supplierls"
                                :key="supplier.id"
                                :value="supplier.id"
                              >
                                {{ supplier.supplier_name }}
                              </option>
                            </select>
                          </b-form-group>

                          <b-form-group
                            id="input-group-3"
                            label="Số Lượng"
                            label-for="input-3"
                          >
                            <b-form-input
                              :name="`apartments[${index}][amount]`"
                              id="input-3"
                              v-model="apartment.amount"
                              placeholder="Nhập số lượng"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-group-3"
                            label="Giá"
                            label-for="input-3"
                          >
                            <b-form-input
                              :name="`apartments[${index}][price]`"
                              id="input-3"
                              v-model="apartment.price"
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
                                :name="`apartments[${index}][import_date]`"
                                class="form-control"
                                type="datetime-local"
                                value="2011-08-19T13:45:00"
                                id="example-datetime-local-input"
                                v-model="apartment.import_date"
                              />
                            </div>
                          </b-form-group>
                        </div>
                      </div>
                    </div>

                    <b-button
                      type="button"
                      v-on:click="addNewApartment"
                      class="btn btn-success"
                    >
                      Thêm
                    </b-button>
                    <br />
                    <div class="link-btn" style="margin: 1rem 0">
                      <b-button @click="onSubmit" variant="success">Xác Nhận</b-button>
                      <b-button type="reset" variant="light">Đóng</b-button>
                    </div>
                  </b-form>
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
                      <label class="label-cout">{{ sumprice }}vnđ</label>
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
      payload: [],
      apartment: {
        supplier_id: "",
        material_id: "",
        amount: "",
        price: "",
        import_date: "",
      },
      searchit_form: {
        fromdate: "",
        todate: "",
      },
      searchit_form1: {
        material_name: "",
      },

      meterials: [{ text: "", value: null }],
      supplierls: [{ text: "", value: null }],
      apartments: [
        {
          supplier_id: "",
          material_id: "",
          amount: "",
          price: "",
          import_date: "",
        },
      ],
      projects,
      users,
      currentPage: 1,

      form: [
        // {
        //   supplier_id: "",
        //   material_id: "",
        //   amount: "",
        //   price: "",
        //   import_date: "",
        // },
        // {
        //   supplier_id1: "",
        //   material_id1: "",
        //   amount1: "",
        //   price1: "",
        //   import_date1: "",
        // },
      ],

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
      sumprice: "",
    };
  },
  created() {
    this.getImportMeterial();
    this.getMeterial();
    this.getSupplier();
    this.Sumprice();
    setInterval(() => {
      this.onSeachName();
    }, 500);
  },
  methods: {
    searchItem(payload) {
      const path = "http://127.0.0.1:8000/material/search_date_importmaterial/";
      axios
        .post(path, payload)
        .then((res) => {
          this.items = res.data.data.map((meterial) => {
            return {
              tên_nguyên_liệu: meterial.material_name,
              nhà_phân_phối: meterial.supplier_name,
              số_lượng: meterial.amount,
              giá: meterial.price,
              ngày_nhập: meterial.import_date,
            };
          });
        })

        .catch((error) => {
          // this.getSuplier();
          console.log(error);
        });
    },
    searchItemName(payload) {
      const path = "http://127.0.0.1:8000/material/search_name_importmaterial/";
      axios
        .post(path, payload)
        .then((res) => {
          this.items = res.data.data.map((meterial) => {
            return {
              tên_nguyên_liệu: meterial.material_name,
              nhà_phân_phối: meterial.supplier_name,
              số_lượng: meterial.amount,
              giá: meterial.price,
              ngày_nhập: meterial.import_date,
            };
          });
        })

        .catch((error) => {
          // this.getSuplier();
          console.log(error);
        });
    },
    onSeachName() {
      const payload = {
        material_name: this.searchit_form1.material_name,
      };

      this.searchItemName(payload);
    },
    hideModal() {
      this.$refs["modalLoc"].hide();
    },
    onSeach() {
      const payload = {
        from_date: this.searchit_form.from_date,
        to_date: this.searchit_form.to_date,
      };

      this.searchItem(payload);
      this.hideModal();
    },
    Sumprice() {
      axios
        .get("http://127.0.0.1:8000/material/sum_price/")
        .then((response) => (this.sumprice = response.data.price));
    },
    addNewApartment() {
      // this.apartments.push(Vue.util.extend({}, this.apartment));
      this.apartments.push({
        supplier_id: "",
        material_id: "",
        amount: "",
        price: "",
        import_date: "",
      });
    },
    removeApartment(index) {
      Vue.delete(this.apartments, index);
    },

    //Get Meterial
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
    //Get Supplier
    getSupplier() {
      axios
        .get(`http://127.0.0.1:8000/supplier/list_supplier/`)
        .then((response) => {
          this.supplierls = response.data.data;
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
          this.getImportMeterial();
        })
        .catch((error) => {
          this.getImportMeterial();
          console.error(error);
        });
    },
    onSubmit(event) {
      event.preventDefault();
      console.log("apartment", this.apartments);
      const payload = this.apartments;

      this.addMeterial({
        data: payload,
      });
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
