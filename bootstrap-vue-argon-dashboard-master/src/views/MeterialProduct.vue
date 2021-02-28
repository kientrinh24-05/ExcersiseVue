<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <div class="items-click-add">
            <h3>Danh sách nguyên liệu</h3>
            <div>
              <b-button v-b-modal.modal-1>Tạo nguyên liệu</b-button>

              <b-modal id="modal-1" title="">
                <p class="my-4">Thêm nguyên liệu</p>
                <div>
                  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group
                      id="input-group-1"
                      label="Tên nguyên liệu"
                      label-for="input-1"
                      description="We'll never share your email with anyone else."
                    >
                      <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        placeholder="Nhập tên nguyên liệu"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      id="input-group-2"
                      label="Nhà Phân Phối"
                      label-for="input-2"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="form.name"
                        placeholder="Nhập nhà phân phối"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      id="input-group-3"
                      label="Số Lượng"
                      label-for="input-3"
                    >
                      <b-form-input
                        id="input-3"
                        v-model="form.name"
                        placeholder="Nhập số lượng"
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
                        />
                      </div>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                  </b-form>
                </div>
              </b-modal>
            </div>
          </div>
         
          <!-- Table -->
          <div>
             <div class="content_search">
            <b-form-input
              id="input-1"
              type="email"
              placeholder="Nhập mã nguyên liệu"
              required
            ></b-form-input>
            <b-dropdown
              text="Nhà Phân Phối"
              style="width: 90%"
              block
              split
              split-variant="outline-primary"
              variant="primary"
              class="m-2"
            >
              <b-dropdown-item href="#">DNTN Hoàng</b-dropdown-item>
              <b-dropdown-item href="#">Công ty TNHH Sáng</b-dropdown-item>
            </b-dropdown>

            <b-button variant="outline-primary"
              ><i class="fa fa-search" aria-hidden="true"></i
            ></b-button>
          </div>
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
                      <b-button type="submit" variant="primary"
                        >Xác Nhận</b-button
                      >
                      <b-button type="reset" variant="danger">Reset</b-button>
                    </div>
                  </b-form>
                </div>
              </div>
            </b-modal>
          </div>
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>
  </div>
</template>
<script>
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
} from "element-ui";
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
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      show: true,
      fields: [
        {
          key: "mã_nguyên_liệu",
          sortable: true,
        },
        {
          key: "tên_nguyên_liệu",
          sortable: false,
        },
        {
          key: "nhà_phân_phối",

          sortable: true,
          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "số_lượng",

          sortable: true,
          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "ngày_nhập",

          sortable: true,
          // Variant applies to the whole column, including the header and footer
        },

        { key: "actions", label: "Hành động" },
      ],
      items: [
        {
          isActive: true,
          mã_nguyên_liệu: 1,
          tên_nguyên_liệu: "Gạo Tẻ",
          nhà_phân_phối: "Gạo",
          số_lượng: "200000",
          ngày_nhập: "Còn",
        },
        {
          isActive: true,
          mã_nguyên_liệu: 2,
          tên_nguyên_liệu: "Nước Suối",
          nhà_phân_phối: "Nước",
          số_lượng: "100000",
          ngày_nhập: "Hết",
        },
        {
          isActive: true,
          mã_nguyên_liệu: 3,
          tên_nguyên_liệu: "Cam Sành",
          nhà_phân_phối: "Trái Cây",
          số_lượng: "1122",
          ngày_nhập: "Còn",
        },
      ],
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
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
.content_search {
  width: 60%;
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around
}
</style>
