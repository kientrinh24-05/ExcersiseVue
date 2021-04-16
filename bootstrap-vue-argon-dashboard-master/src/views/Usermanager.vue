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
              <h3>Danh sách nhân viên</h3>
              <div>
                <b-button v-b-modal.modal-1 variant="success" to="/register"
                  >Thêm mới</b-button
                >
              </div>
            </div>

            <!-- Table -->
            <b-row>
              <b-col lg="12">
                <div>
                  <div class="content-table">
                    <b-table
                      class="table-sc"
                      hover
                      id="my-table"
                      :items="items"
                      :per-page="perPage"
                      :current-page="currentPage"
                      :fields="fields"
                    >
                      <template v-slot:cell(Admin)="row">
                        <input type="checkbox" v-model="row.item.Admin" />
                      </template>
                      <template v-slot:cell(Trạng_Thái)="row">
                        <b-badge v-if="row.item.Trạng_Thái" variant="success"
                          >Hoạt Động</b-badge
                        >
                        <b-badge v-else variant="warning">Không Hoạt Động</b-badge>
                      </template>
                      <template #cell(actions)="row">
                        <i
                          v-b-modal.my-modal1
                          @click="edit(row.item.Username)"
                          class="fas fa-pencil-alt"
                        ></i>
                      </template>
                    </b-table>
                    <b-card-footer class="py-4 d-flex justify-content-start">
                      <b-pagination
                        v-model="currentPage"
                        :per-page="perPage"
                        first-number
                        last-number
                      ></b-pagination>
                    </b-card-footer>
                  </div>

                  <!-- Modal  -->
                  <b-modal
                    id="my-modal1"
                    ref="Modal-Update"
                    title="Thông tin nhân viên"
                    ok-only
                  >
                    <pre></pre>
                    <div>
                      <h2 style="text-align: center">Sửa Nhân Viên</h2>
                      <div>
                        <b-form @submit="update" @reset="onReset" v-if="show">
                          <b-form-group
                            id="input-group-1"
                            label="Username"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              disabled
                              placeholder="Nhập username"
                              v-model="editform.username"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="Email"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              placeholder="clreax@gmail.com"
                              v-model="editform.email"
                              disabled
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-row>
                            <b-col lg="6">
                              <b-form-group
                                id="input-group-1"
                                label="Admin"
                                label-for="input-1"
                              >
                                <b-form-checkbox
                                  id="checkbox-1"
                                  v-model="editform.is_staff"
                                  name="checkbox-1"
                                >
                                </b-form-checkbox>
                              </b-form-group>
                            </b-col>
                            <b-col lg="6">
                              <b-form-group
                                id="input-group-1"
                                label="Trạng Thái"
                                label-for="input-1"
                              >
                                <b-form-checkbox
                                  id="checkbox-2"
                                  v-model="editform.is_active"
                                  name="checkbox-2"
                                >
                                </b-form-checkbox>
                              </b-form-group>
                            </b-col>
                          </b-row>

                          <!-- Show Modal Nguyên Liệu -->

                          <!-- Button Click Submit -->
                          <div class="link-btn">
                            <b-button type="submit" variant="success">Xác Nhận</b-button>
                            <b-button type="reset" variant="light">Đóng</b-button>
                          </div>
                        </b-form>
                      </div>
                    </div>
                  </b-modal>
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
import axios from "axios";
import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from "element-ui";
import projects from "./Tables/projects";
import users from "./Tables/users";
import LightTable from "./Tables/RegularTables/LightTable";

export default {
  components: {
    LightTable,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      isEdit: null,
      projects,
      users,

      form: {
        material_name: "",
      },
      editform: {
        username: "",
        email: "",
        is_staff: Boolean,
        is_active: Boolean,
      },
      perPage: 50,
      currentPage: 1,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      show: true,
      fields: [
        {
          key: "Username",
        },
        {
          key: "Email",
        },
        {
          key: "Admin",
        },
        {
          key: "Trạng_Thái",
          // formatter: (value, key, item) => {
          //   return value ? "Hoạt Động" : "Không Hoạt Động";
          // },
        },

        { key: "actions", label: "Hành động" },
      ],
      searchit_form: {
        material_name: "",
      },
      items: [],
    };
  },
  created() {
    this.getMeterial();

    let token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    getMeterial() {
      axios
        .get(`http://127.0.0.1:8000/auth/list_user/`)
        .then((response) => response.data)
        .then((res) => {
          this.items = res.data.map((meterial) => {
            return {
              Username: meterial.username,
              Admin: meterial.is_staff,
              Email: meterial.email,
              Trạng_Thái: meterial.is_active,
            };
          });
        });
    },
    edit(username) {
      this.isEdit = username;

      axios
        .get(`http://127.0.0.1:8000/auth/update_user/` + username)
        .then((res) => res.data)
        .then((response) => {
          const { data } = response;

          this.editform.username = data.username;
          this.editform.email = data.email;
          this.editform.is_staff = data.is_staff;
          this.editform.is_active = data.is_active;
        });
    },
    update(event) {
      event.preventDefault();
      axios
        .put(`http://127.0.0.1:8000/auth/update_user/` + this.isEdit, this.editform, {})
        .then((res) => {
          if (res.data.status_code == 400 || res.data.status_code == 400) {
            this.$toaster.error(res.data.message[0]);
          } else {
            this.getMeterial();
            //   this.$refs.editSupModal.hide();
            this.$toaster.success("Thành công");
            this.getMeterial();

            this.$refs["Modal-Update"].hide();
          }
        })
        .catch((err) => {
          //   this.$refs.editSupModal.hide();
          this.$toaster.error("Thất bại");
        });
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
.items-click-add {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fa-pencil-alt {
  font-size: 1rem;
  border: none;
  outline: none;
  color: red;
}
</style>
