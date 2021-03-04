<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <div class="content_title">
              <b-col lg="3" md="6">
                <b-form-select v-model="selected" :options="options"></b-form-select>
              </b-col>
              <b-col lg="4" md="6">
                <input
                  class="form-control"
                  type="datetime-local"
                  value="2011-08-19T13:45:00"
                  id="example-datetime-local-input"
                />
              </b-col>
              <b-col lg="2" md="6">
                <b-button variant="outline-primary" class="btn-search"
                  ><i class="fas fa-search"></i
                ></b-button>
              </b-col>

              <!-- Table  -->
            </div>
            <div>
              <b-row class="mt-7">
                <b-col xl="12" class="mb-5 mb-xl-0">
                  <page-visits-table></page-visits-table>
                </b-col>
                <hr />
                <b-col xl="12" class="mb-5 mb-xl-0 mt-6">
                  <social-traffic-table></social-traffic-table>
                </b-col>
              </b-row>
            </div>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import PageVisitsTable from "./Dashboard/PageVisitsTable";
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
    PageVisitsTable,
    SocialTrafficTable,
  },
  data() {
    return {
      projects,
      users,
      selected: null,
      options: [
        { value: null, text: "Chọn mục" },
        { value: "week", text: "Theo Tuần" },
        { value: "month", text: "Theo Tháng" },
        { value: "day", text: "Theo Ngày" },
      ],
      items: [
        { Mã_Sản_Phẩm: 40, Tên_Sản_Phẩm: "Dickerson", Số_lượng: "122" },
        { Mã_Sản_Phẩm: 41, Tên_Sản_Phẩm: "Dicn", Số_lượng: "1222" },
        { Mã_Sản_Phẩm: 42, Tên_Sản_Phẩm: "Kerson", Số_lượng: "1212" },
        { Mã_Sản_Phẩm: 43, Tên_Sản_Phẩm: "Kerson", Số_lượng: "1212" },
        { Mã_Sản_Phẩm: 44, Tên_Sản_Phẩm: "Rson", Số_lượng: "12233" },
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
.content_title {
  display: flex;
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
