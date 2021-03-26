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
                <b-button v-b-modal.modal-1 variant="success">Thêm mới</b-button>

                <b-modal id="modal-1" title="Thêm nguyên liệu" ref="ModalAdd">
                  <div>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                      <b-form-group
                        id="input-group-1"
                        label="Tên nguyên liệu"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.material_name"
                          placeholder="Nhập tên nguyên liệu"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-button type="submit" variant="primary">Submit</b-button>
                      <b-button type="reset" variant="danger">Reset</b-button>
                    </b-form>
                  </div>
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
                          @click="edit(row.item.mã_nguyên_liệu)"
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
                  </div>

                  <!-- Modal  -->
                  <b-modal
                    id="my-modal"
                    ref="editSupModal"
                    title="Thông tin nguyên liệu"
                    ok-only
                  >
                    <pre></pre>
                    <div>
                      <h2 style="text-align: center">Sửa Thể Loại</h2>
                      <div>
                        <b-form @submit="update" @reset="onReset" v-if="show">
                          <b-form-group
                            id="input-group-1"
                            label="Tên nguyên liệu"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              placeholder="Nhập tên nguyên liệu"
                              v-model="editform.material_name"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <!-- Show Modal Nguyên Liệu -->

                          <!-- Button Click Submit -->
                          <div class="link-btn">
                            <b-button type="submit" variant="primary">Xác Nhận</b-button>
                            <b-button type="reset" variant="danger">Reset</b-button>
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
        id: "",
        material_name: "",
      },
      perPage: 10,
      currentPage: 1,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      show: true,
      fields: [
        {
          key: "mã_nguyên_liệu",
          label: "#",
        },
        {
          key: "tên_nguyên_liệu",
        },

        { key: "actions", label: "Hành động" },
      ],
      items: [],
    };
  },
  created() {
    this.getMeterial();
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    getMeterial() {
      fetch("http://127.0.0.1:8000/material/list_material/")
        .then((response) => response.json())
        .then(
          (json) =>
            (this.items = json.data.map((meterial) => {
              return {
                mã_nguyên_liệu: meterial.id,
                tên_nguyên_liệu: meterial.material_name,
              };
            }))
        );
    },
    addMeterial(payload) {
      const path = "http://127.0.0.1:8000/material/list_material/";
      axios
        .post(path, payload)
        .then(() => {
          this.getMeterial();
        })
        .catch((error) => {
          this.getMeterial();
          console.log(error);
        });
    },

    onSubmit(event) {
      event.preventDefault();
      this.$refs.ModalAdd.hide();
      const payload = {
        material_name: this.form.material_name,
      };
      this.addMeterial(payload);
    },
    edit(id) {
      this.isEdit = id;
      axios
        .get(`http://127.0.0.1:8000/material/detail_material/` + id)
        .then((res) => res.data)
        .then((response) => {
          const { data } = response;

          this.editform.material_name = data.material_name;
        });
    },
    update() {
      axios
        .put(
          `http://127.0.0.1:8000/material/detail_material/` + this.isEdit,
          this.editform,
          {}
        )
        .then((res) => {
          console.log(res.data);
          this.getMeterial();
          this.$refs.editSupModal.hide();
        })
        .catch((err) => {
          this.$refs.editSupModal.hide();
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
