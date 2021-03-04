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
                <b-button v-b-modal.modal-1 variant="success"> Tạo thể loại</b-button>

                <b-modal id="modal-1" title="Thêm thể loại">
                  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group
                      id="input-group-1"
                      label="Mã thể loại"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="text"
                        placeholder="Mã thể loại"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      id="input-group-2"
                      label="Tên thể loại:"
                      label-for="input-2"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="form.name"
                        placeholder="Tên thể loại"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <!-- Show Modal Nguyên Liệu -->

                    <!-- Button Click Submit -->
                  </b-form>
                </b-modal>
              </div>
            </div>
            <!-- Table -->
            <div>
              <div class="content_search">
                <b-form-input
                  id="input-1"
                  type="email"
                  placeholder="Nhập mã thể loại"
                  required
                ></b-form-input>

                <b-button class="btn-search ml-3" variant="outline-primary"
                  ><i class="fa fa-search" aria-hidden="true"></i
                ></b-button>
              </div>
              <b-card no-body>
                <div>
                  <b-table class="table-sc" striped hover :items="items" :fields="fields">
                    <template #cell(actions)="row">
                      <i
                        @click="info(row.item, row.index, $event.target)"
                        class="fas fa-pencil-alt"
                      ></i>
                    </template>
                  </b-table>

                  <!-- Modal  -->
                  <b-modal :id="infoModal.id" ok-only>
                    <pre></pre>
                    <div>
                      <h2 style="text-align: center">Sửa Thể Loại</h2>
                      <div>
                        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                          <b-form-group
                            id="input-group-1"
                            label="Mã thể loại"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              v-model="form.email"
                              type="text"
                              placeholder="Mã thể loại"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group
                            id="input-group-2"
                            label="Tên thể loại:"
                            label-for="input-2"
                          >
                            <b-form-input
                              id="input-2"
                              v-model="form.name"
                              placeholder="Tên thể loại"
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

                <b-card-footer class="py-4 d-flex justify-content-end">
                  <base-pagination
                    v-model="currentPage"
                    :per-page="10"
                    :total="40"
                  ></base-pagination>
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
      projects,
      users,
      currentPage: 1,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
        {
          key: "Mã_thể_loại",
          sortable: true,
        },
        {
          key: "tên_thể_loại",
          sortable: false,
        },
        { key: "actions", label: "Hành động" },
      ],
      items: [
        {
          isActive: true,
          Mã_thể_loại: 1,
          tên_thể_loại: "Trái Cây",
        },
        {
          isActive: true,
          Mã_thể_loại: 2,
          tên_thể_loại: "Ăn Nhanh",
        },
        {
          isActive: true,
          Mã_thể_loại: 3,
          tên_thể_loại: "Gạo",
        },
      ],
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      show: true,
    };
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
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
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
</style>
