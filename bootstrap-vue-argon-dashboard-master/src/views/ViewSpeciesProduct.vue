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
              <h3>Danh sách thể loại</h3>
              <div>
                <div class="pseudo-search">
                  <input
                    v-model="searchit_form.category_name"
                    @keyup="onSeach()"
                    type="text"
                    placeholder="Tìm kiếm..."
                    autofocus
                    required
                  />
                  <button class="fa fa-search" type="submit"></button>
                </div>
                <b-button variant="primary"><i class="fas fa-sync-alt"></i></b-button>
                <b-button v-b-modal.modal-1 variant="success"> Thêm mới</b-button>

                <b-modal id="modal-1" ok-only ref="addCategoryModal">
                  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group
                      id="input-group-2"
                      label="Tên thể loại:"
                      label-for="input-2"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="form.category_name"
                        placeholder="Tên thể loại"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <!-- Show Modal Nguyên Liệu -->

                    <!-- Button Click Submit -->

                    <b-button type="submit" variant="danger">Add</b-button>
                  </b-form>
                </b-modal>
              </div>
            </div>
            <!-- Table -->
            <div>
              <b-card no-body>
                <div>
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
                        v-b-modal.myModal
                        @click="edit(row.item.Mã_thể_loại)"
                        class="fas fa-pencil-alt"
                      ></i>
                    </template>
                  </b-table>

                  <!-- Modal  -->
                  <b-modal id="myModal" ok-only ref="editCategoryModal">
                    <pre></pre>
                    <div>
                      <h2 style="text-align: center">Sửa Thể Loại</h2>
                      <div>
                        <b-form @submit="update" @reset="onReset" v-if="show">
                          <b-form-group
                            id="input-group-2"
                            label="Tên thể loại:"
                            label-for="input-2"
                          >
                            <b-form-input
                              id="input-2"
                              v-model="formedit.category_name"
                              placeholder="Tên thể loại"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <!-- Show Modal Nguyên Liệu -->

                          <!-- Button Click Submit -->
                          <div class="link-btn">
                            <b-button type="submit" variant="primary">Xác Nhận</b-button>
                          </div>
                        </b-form>
                      </div>
                    </div>
                  </b-modal>
                </div>

                <b-card-footer class="py-4 d-flex justify-content-start">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    first-number
                    last-number
                  ></b-pagination>
                </b-card-footer>
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
import axios from "axios";
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
      perPage: 6,
      currentPage: 1,
      titlesearch: "",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
        {
          key: "Mã_thể_loại",
          label: "#",
          sortable: true,
        },
        {
          key: "tên_thể_loại",
          sortable: true,
        },
        { key: "actions", label: "Hành động" },
      ],
      items: [],
      form: {
        category_name: "",
      },
      formedit: {
        category_name: "",
      },
      searchit_form: {
        category_name: "",
      },
      show: true,
    };
  },
  created() {
    this.getCategory();
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
    rows() {
      return this.items.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    searchItem(payload) {
      const path = "http://127.0.0.1:8000/food_tabel/search_category/";
      axios
        .post(path, payload)
        .then((res) => {
          this.items = res.data.data.map((category) => {
            return {
              Mã_thể_loại: category.id,
              tên_thể_loại: category.category_name,
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
        category_name: this.searchit_form.category_name,
      };

      this.searchItem(payload);
    },
    //Get All
    getCategory() {
      axios
        .get(`http://127.0.0.1:8000/food_tabel/list_category/`)
        .then((response) => response.data)
        .then((res) => {
          this.items = res.data.map((category) => {
            return {
              Mã_thể_loại: category.id,
              tên_thể_loại: category.category_name,
            };
          });
        });
    },
    // Add Category
    addMeterial(payload) {
      const path = "http://127.0.0.1:8000/food_tabel/create_category/";
      axios
        .post(path, payload)
        .then(() => {
          this.getCategory();
        })
        .catch((error) => {
          this.getCategory();
          console.log(error);
        });
    },
    onSubmit(event) {
      event.preventDefault();
      this.$refs.addCategoryModal.hide();
      const payload = {
        category_name: this.form.category_name,
      };
      this.addMeterial(payload);
      this.$toaster.success("Thêm thể loại thành công");
      this.onReset();
    },
    //Update
    edit(id) {
      this.isEdit = id;
      axios
        .get(`http://127.0.0.1:8000/food_tabel/detail_category/` + id)
        .then((res) => res.data)
        .then((response) => {
          const { data } = response;

          this.formedit.category_name = data.category_name;
        });
    },
    update() {
      axios
        .put(
          `http://127.0.0.1:8000/food_tabel/detail_category/` + this.isEdit,
          this.formedit,
          {}
        )
        .then((res) => {
          this.getCategory();
          this.$refs.editCategoryModal.hide();
          this.$toaster.success("Sửa thể loại thành công");
        })
        .catch((err) => {
          this.$refs.editCategoryModal.hide();
          this.$toaster.error("Sửa thể loại thất bại");
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

    onReset() {
      // Reset our form values
      this.form.category_name = "";
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
.item-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content_search {
  margin: 1rem 0;
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
