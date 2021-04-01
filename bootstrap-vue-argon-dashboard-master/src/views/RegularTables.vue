<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col lg="12">
          <b-alert :show="dismissCountDown" dismissible fade variant="warning">
            Đã thêm thành công trong {{ dismissCountDown }} seconds...
          </b-alert>

          <card header-classes="bg-transparent">
            <div class="items-click-add">
              <h3>Danh sách nhà cung cấp</h3>
              <div>
                <div class="pseudo-search">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    autofocus
                    required
                    @keyup.enter="onSeach()"
                    v-model="searchit_form.supplier_name"
                  />
                  <button class="fa fa-search" type="submit"></button>
                </div>
                <b-button variant="primary"><i class="fas fa-sync-alt"></i></b-button>
                <b-button v-b-modal.modal-1 variant="success">Thêm mới</b-button>

                <!-- Modal Tạo nhà cc -->
                <b-modal id="modal-1" title="Thêm nhà cung cấp" ref="addBookModal">
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

                        <b-button type="submit" variant="primary">Submit</b-button>
                      </b-form-group>

                      <!-- <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button> -->
                    </b-form>
                  </div>
                </b-modal>
              </div>
            </div>

            <!-- Table  -->
            <div>
              <b-card no-body>
                <div class="content_table">
                  <b-table
                    class="table-sc"
                    hover
                    id="my-table"
                    :items="items"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :fields="fields"
                  >
                    <template #cell(actions)="row">
                      <i
                        v-b-modal.my-modal
                        @click="edit(row.item.mã_nhà_cung_cấp)"
                        class="fas fa-pencil-alt"
                      ></i>
                    </template>
                  </b-table>
                  <b-card-footer class="py-4 d-flex justify-content-start">
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                      first-number
                      last-number
                    ></b-pagination>
                  </b-card-footer>

                  <!-- Modal  -->

                  <!-- --- Modal-- -->
                  <b-modal id="my-modal" ref="editSupModal">
                    <div>
                      <h2 style="text-align: center">Sửa Nhà Cung Cấp</h2>
                      <div>
                        <div>
                          <b-form @submit.prevent="update" @reset="onReset" v-if="show">
                            <b-form-group
                              id="input-group-2"
                              label="Tên nhà cung cấp"
                              label-for="input-2"
                            >
                              <b-form-input
                                id="input-2"
                                v-model="editform.supplier_name"
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
                                v-model="editform.supplier_address"
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
                                v-model="editform.supplier_phone"
                                type="text"
                                placeholder="Số Điện Thoại"
                                required
                              ></b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Update</b-button>
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
      isEdit: null,
      dismissSecs: 20,
      dismissCountDown: 0,
      showDismissibleAlert: false,

      projects,
      users,
      perPage: 5,
      currentPage: 1,
      search: "",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      items: [],
      fields: [
        {
          key: "mã_nhà_cung_cấp",
          sortable: true,
          label: "#",
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
      sumprice: "",
      editform: {
        id: "",
        supplier_name: "",
        supplier_address: "",
        supplier_phone: "",
      },
      form: {
        supplier_name: "",
        supplier_address: "",
        supplier_phone: "",
      },
      searchit_form: {
        supplier_name: "",
      },

      show: true,
    };
  },
  created() {
    this.getSuplier();
    // this.Sumprice();
  },
  watch: {},
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    // Get All
    getSuplier() {
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
    searchItem(payload) {
      const path = "http://127.0.0.1:8000/supplier/search_supplier/";
      axios
        .post(path, payload)
        .then((res) => {
          this.items = res.data.data.map((supplier) => {
            return {
              mã_nhà_cung_cấp: supplier.id,
              tên_nhà_cung_cấp: supplier.supplier_name,
              địa_chỉ: supplier.supplier_address,
              số_điện_thoại: supplier.supplier_phone,
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
        supplier_name: this.searchit_form.supplier_name,
      };
      console.log(payload);
      this.searchItem(payload);
    },
    // Add Suplier
    addSuplier(payload) {
      const path = "http://127.0.0.1:8000/supplier/list_supplier/";
      axios
        .post(path, payload)
        .then(() => {
          this.getSuplier();
        })
        .catch((error) => {
          this.getSuplier();
          console.log(error);
        });
    },
    onSubmit(event) {
      event.preventDefault();

      this.$refs.addBookModal.hide();
      const payload = {
        supplier_name: this.form.supplier_name,
        supplier_address: this.form.supplier_address,
        supplier_phone: this.form.supplier_phone,
      };
      this.showAlert();
      this.addSuplier(payload);
    },
    //Update
    edit(id) {
      this.isEdit = id;
      axios
        .get(`http://127.0.0.1:8000/supplier/detail_supplier/` + id)
        .then((res) => res.data)
        .then((response) => {
          const { data } = response;

          this.editform.supplier_name = data.supplier_name;
          this.editform.supplier_address = data.supplier_address;
          this.editform.supplier_phone = data.supplier_phone;
        });
    },
    update() {
      axios
        .put(
          `http://127.0.0.1:8000/supplier/detail_supplier/` + this.isEdit,
          this.editform,
          {}
        )
        .then((res) => {
          console.log(res.data);
          this.getSuplier();
          this.$refs.editSupModal.hide();
        })
        .catch((err) => {
          this.$refs.editSupModal.hide();
        });
    },
    // Search

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
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
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
