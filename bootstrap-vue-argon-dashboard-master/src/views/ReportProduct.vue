<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <h3>Sản phẩm được sử dụng nhiều nhất</h3>
        </b-col>
      </b-row>
      <div class="mt-7">
        <div class="items-click-add">
          <div>
            <b-form-radio-group
              v-model="selected"
              :options="options"
              class="mb-2"
              value-field="item"
              text-field="name"
            ></b-form-radio-group>
          </div>
          <div class="form-group row">
        
            <div class="">
              <input
                class="form-control"
                type="datetime-local"
                value="2011-08-19T13:45:00"
                id="example-datetime-local-input"
              />
            </div>
          </div>
        </div>
        <div>
    <b-table striped hover :items="items"></b-table>
  </div>
        <!-- Table  -->


      </div>
      
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
      selected: "A",
      options: [
        { item: "A", name: "Theo Tuần" },
        { item: "B", name: "Theo Tháng" },
        { item: "C", name: "Theo Ngày" },
      ],
      items: [
          { Mã_Sản_Phẩm: 40, Tên_Sản_Phẩm: 'Dickerson', Số_lượng: '122' },
          { Mã_Sản_Phẩm: 41, Tên_Sản_Phẩm: 'Dicn', Số_lượng: '1222' },
          { Mã_Sản_Phẩm: 42, Tên_Sản_Phẩm: 'Kerson', Số_lượng: '1212' },
          { Mã_Sản_Phẩm: 43, Tên_Sản_Phẩm: 'Rson', Số_lượng: '12233' },
       
        ],
    };
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
</style>
