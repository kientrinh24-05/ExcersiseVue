<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container fluid class="mt--7 container-fluid">
      <b-row>
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <div class="items-click-add">
              <h3>Danh sách món ăn</h3>
              <div>
                <b-button v-b-modal.modal-1>Tạo món ăn</b-button>

                <b-modal id="modal-1" title="BootstrapVue">
                  <div>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                      <b-form-group
                        id="input-group-1"
                        label="Mã món ăn"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="idproduct"
                          type="text"
                          placeholder="Nhập mã món ăn"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                        id="input-group-2"
                        label="Tên món ăn"
                        label-for="input-2"
                      >
                        <b-form-input
                          id="input-2"
                          placeholder="Nhập tên món ăn"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-3"
                        label="Phân Loại"
                        label-for="input-3"
                      >
                        <b-form-select
                          id="input-3"
                          :options="foods"
                          required
                        ></b-form-select>
                      </b-form-group>
                      <b-form-group id="input-group-2" label="Giá" label-for="input-2">
                        <b-form-input
                          id="input-2"
                          placeholder="Nhập giá món ăn"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-2"
                        label="Trạng thái"
                        label-for="input-2"
                      >
                        <b-form-input
                          id="input-2"
                          placeholder="Trạng thái"
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

            <div class="content_search">
              <b-form-input
                id="input-1"
                type="email"
                placeholder="Nhập mã món ăn"
                required
              ></b-form-input>
              <b-dropdown
                text="Trạng thái"
                style="width: 90%"
                block
                split
                split-variant="outline-primary"
                variant="primary"
                class="m-2"
              >
                <b-dropdown-item href="#">Còn</b-dropdown-item>
                <b-dropdown-item href="#">Hết</b-dropdown-item>
              </b-dropdown>

              <b-button variant="outline-primary"
                ><i class="fa fa-search" aria-hidden="true"></i
              ></b-button>
            </div>
          </card>
          <light-table />
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
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      foods: [{ text: "", value: null }, "Tất cả", "Gạo", "Ăn Nhanh"],
      show: true,
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

  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
