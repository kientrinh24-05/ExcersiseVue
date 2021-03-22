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
                <div class="pseudo-search">
                  <input type="text" placeholder="Tìm kiếm..." autofocus required />
                  <button class="fa fa-search" type="submit"></button>
                </div>
                <b-button variant="primary"><i class="fas fa-sync-alt"></i></b-button>
                <b-button v-b-modal.modal-1 variant="success">Thêm mới</b-button>

                <b-modal id="modal-1" title="Thêm món ăn" size="lg" ref="modal-1">
                  <div>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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

                      <b-form-group id="input-group-2" label="Hình Ảnh">
                        <b-form-file
                          v-model="file"
                          :state="Boolean(file)"
                          placeholder="Chọn địa chỉ hình ảnh..."
                          drop-placeholder="Drop file here..."
                        ></b-form-file>
                      </b-form-group>

                      <b-form-group>
                        <b-button variant="primary" class="mb-2"> Thêm Ng.Liệu </b-button>

                        <dark-table />
                      </b-form-group>

                      <div class="btn_click">
                        <b-button type="submit" variant="primary" @click="hideModal"
                          >Xác Nhận</b-button
                        >
                        <b-button type="reset" variant="danger">Làm Mới</b-button>
                      </div>
                    </b-form>
                  </div>
                </b-modal>
              </div>
            </div>
          </card>
          <div class="content_Table">
            <light-table />
          </div>
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
import DarkTable from "./Tables/RegularTables/DarkTable.vue";

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
    hideModal() {
      this.$refs["modal-1"].hide();
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
.content_Table {
  overflow-x: auto;
}
.btn_click {
  text-align: center;
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
