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
              <h2>Báo Cáo</h2>
              <div>
                <div class="pseudo-search">
                  <input type="text" placeholder="Tìm kiếm..." autofocus required />
                  <button class="fa fa-search" type="submit"></button>
                </div>
                <b-button variant="primary"><i class="fas fa-sync-alt"></i></b-button>
                <b-button v-b-modal.modal-2 variant="info"
                  ><i class="fas fa-filter"></i>
                </b-button>
                <b-modal id="modal-2">
                  <b-form>
                    <b-form-group id="input-group-1" label="Thời gian.">
                      <div class="fillter_date">
                        <b-form-input class="input-date" type="date"></b-form-input>
                        <span>__</span>
                        <b-form-input class="input-date" type="date"></b-form-input>
                      </div>
                    </b-form-group>
                  </b-form>
                </b-modal>
              </div>

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
