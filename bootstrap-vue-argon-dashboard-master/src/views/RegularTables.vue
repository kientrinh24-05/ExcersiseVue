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
              <h3>Danh sách nhà cung cấp</h3>
              <div>
                <b-button v-b-modal.modal-1 variant="success">Tạo nhà cung cấp</b-button>

                <!-- Modal Tạo nhà cc -->
                <b-modal id="modal-1" title="Thêm nhà cung cấp">
                  <div>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                      <h2 style="text-align: center">Thêm nhà cung cấp</h2>

                      <b-form-group
                        id="input-group-2"
                        label="Tên nhà cung cấp"
                        label-for="input-2"
                      >
                        <b-form-input
                          id="input-2"
                          v-model="form.supplier_name"
                          placeholder="Tên nhà cung cấp"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-3"
                        label="Địa chỉ"
                        label-for="input-3"
                      >
                        <b-form-input
                          id="input-3"
                          v-model="form.supplier_address"
                          type="text"
                          placeholder="Địa chỉ"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-4"
                        label="Số Điện Thoại"
                        label-for="input-4"
                      >
                        <b-form-input
                          id="input-4"
                          type="text"
                          v-model="form.supplier_phone"
                          placeholder="Số Điện Thoại"
                          required
                        ></b-form-input>
                        <b-button @click="addSuplier()"> Click Add</b-button>
                      </b-form-group>

                      <!-- <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button> -->
                    </b-form>
                  </div>
                </b-modal>
              </div>
            </div>

            <div class="content_search">
              <b-form-input
                class="input-ncc"
                type="text"
                placeholder="Nhập tên nhà cung cấp"
                required
              ></b-form-input>

              <b-button class="btn-search" variant="outline-primary"
                ><i class="fa fa-search" aria-hidden="true"></i
              ></b-button>
            </div>
            <!-- Table  -->
            <div>
              <b-card no-body>
                <div class="content_table">
                  <b-table class="table-sc" striped hover :items="items" :fields="fields">
                    <template #cell(actions)="row">
                      <i
                        @click="info(row.item, row.index, $event.target)"
                        class="fas fa-pencil-alt"
                      ></i>
                    </template>
                  </b-table>

                  <!-- Modal  -->
                  <b-modal :id="infoModal.id" title="Thông tin nhà cung cấp" ok-only>
                    <pre></pre>
                    <div>
                      <h2 style="text-align: center">Sửa Nhà Cung Cấp</h2>
                      <div>
                        <div>
                          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                            <b-form-group
                              id="input-group-1"
                              label="Mã nhà cung cấp"
                              label-for="input-1"
                            >
                              <b-form-input
                                id="input-1"
                                type="email"
                                placeholder="Mã nhà cung cấp"
                                required
                              ></b-form-input>
                            </b-form-group>

                            <b-form-group
                              id="input-group-2"
                              label="Tên nhà cung cấp"
                              label-for="input-2"
                            >
                              <b-form-input
                                id="input-2"
                                v-model="form.name"
                                placeholder="Tên nhà cung cấp"
                                required
                              ></b-form-input>
                            </b-form-group>
                            <b-form-group
                              id="input-group-3"
                              label="Địa chỉ"
                              label-for="input-3"
                            >
                              <b-form-input
                                id="input-3"
                                type="text"
                                placeholder="Địa chỉ"
                                required
                              ></b-form-input>
                            </b-form-group>
                            <b-form-group
                              id="input-group-4"
                              label="Số Điện Thoại"
                              label-for="input-4"
                            >
                              <b-form-input
                                id="input-4"
                                type="text"
                                placeholder="Số Điện Thoại"
                                required
                              ></b-form-input>
                            </b-form-group>

                            <!-- <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button> -->
                          </b-form>
                        </div>
                      </div>
                    </div>
                  </b-modal>
                </div>
              </b-card>
              <!-- End -->
            </div>
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
import users from "./Tables/users";
import LightTable from "./Tables/RegularTables/LightTable";
import DarkTable from "./Tables/RegularTables/DarkTable";
import axios from "axios";
import { json } from "d3";

export default {
  components: {
    LightTable,
    DarkTable,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      projects,
      users,
      currentPage: 1,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      items: [],
      fields: [
        {
          key: "mã_nhà_cung_cấp",
         
        },
        {
          key: "tên_nhà_cung_cấp",
         
        },
        {
          key: "địa_chỉ",
         
        },
        {
          key: "số_điện_thoại",
     
        },
        { key: "actions", label: "Hành Động" },
      ],

      form: {
        supplier_name: "",
        supplier_address: "",
        supplier_phone: "",
        food: null,
        checked: [],
      },
      show: true,
    };
  },
  created() {
    // axios
    //   .get("http://127.0.0.1:8000/supplier/list_supplier/")
    //   .then((response) => {
    //     this.items = response.data;
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    fetch("http://127.0.0.1:8000/supplier/list_supplier/")
      .then((response) => response.json())
      .then(
        (json) =>
          (this.items = json.data.map((supplier) => {
            return {
              mã_nhà_cung_cấp: supplier.id,
              tên_nhà_cung_cấp: supplier.supplier_name,
              địa_chỉ: supplier.supplier_address,
              số_điện_thoại: supplier.supplier_phone,
            };
          }))
      );
  },
  methods: {
    addSuplier() {
      axios
        .post("http://127.0.0.1:8000/supplier/list_supplier/", {
          name: this.addSuplier,
        })
        .then((response) => {
          const data = response.data;
          this.supplier_name.push(response.data);
          this.supplier_address.push(response.data);
          this.supplier_phone.push(response.data);
          this.addSuplier = "";
          console.log(response);
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
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
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
  justify-content: space-between;
  align-items: center;
}
.content_search {
  margin: 1rem 0;
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-ncc {
  max-width: 80%;
}
.content_table {
  overflow-x: auto;
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
</style>
