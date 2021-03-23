<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <div class="items-click-add">
              <h2>Danh sách bàn ăn</h2>
              <div>
                <div class="pseudo-search">
                  <input type="text" placeholder="Tìm kiếm..." autofocus required />
                  <button class="fa fa-search" type="submit"></button>
                </div>
                <b-button variant="primary"><i class="fas fa-sync-alt"></i></b-button>
                <b-button v-b-modal.modal-2 variant="info"
                  ><i class="fas fa-filter"></i>
                </b-button>
                <b-modal id="modal-2" ref="modal-2">
                  <b-form>
                    <b-form-group id="input-group-1" label="Trạng thái">
                      <b-form-select
                        v-model="selected"
                        :options="options"
                        class="mb-3"
                        value-field="item"
                        text-field="name"
                        disabled-field="notEnabled"
                      ></b-form-select>
                    </b-form-group>
                    <div>
                      <b-button variant="success" @click="hideModal">Xác nhận</b-button>
                      <b-button variant="secondary" @click="hideModal">Hủy Bỏ</b-button>
                    </div>
                  </b-form>
                </b-modal>
              </div>
            </div>
            <b-row class="icon-examples">
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard">101 </b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard">102 </b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard"> 103 </b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard">104</b-button>
              </b-col>
            </b-row>
          </card>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <b-card body>
              <b-row>
                <b-col lg="6 " md="12">
                  <b-tabs pills card>
                    <b-tab title="Tất cả" active
                      ><b-card-text>
                        <div>
                          <b-card-group deck>
                            <b-row class="icon-examples">
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                            </b-row>
                          </b-card-group>
                        </div> </b-card-text
                    ></b-tab>
                    <b-tab title="Gạo" active
                      ><b-card-text>
                        <div>
                          <b-card-group deck>
                            <b-row class="icon-examples">
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                            </b-row>
                          </b-card-group>
                        </div> </b-card-text
                    ></b-tab>
                    <b-tab title="Trái Cây" active
                      ><b-card-text>
                        <div>
                          <b-card-group deck>
                            <b-row class="icon-examples">
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                            </b-row>
                          </b-card-group>
                        </div> </b-card-text
                    ></b-tab>
                    <b-tab title="Ăn Nhanh" active
                      ><b-card-text>
                        <div>
                          <b-card-group deck>
                            <b-row class="icon-examples">
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                              <b-col lg="6" md="6">
                                <b-card
                                  img-src="https://picsum.photos/600/300/?image=25"
                                  img-alt="Image"
                                  img-top
                                  tag="article"
                                  class="mb-2"
                                >
                                  <div class="content-produc">
                                    <b>Trà Tắc Xí Muội</b>
                                    <p class="price">2.000.000đ</p>
                                    <div class="link-add">
                                      <b-button variant="success" class="btn-add"
                                        ><i class="fas fa-plus"></i
                                      ></b-button>
                                    </div>
                                  </div>
                                </b-card>
                              </b-col>
                            </b-row>
                          </b-card-group>
                        </div> </b-card-text
                    ></b-tab>
                  </b-tabs>
                </b-col>
                <b-col lg="6" md="12">
                  <div class="content_view">
                    <h2>Order Món Ăn</h2>
                    <!-- <div>
                    <b-table striped hover :items="items"></b-table>
                  </div> -->
                    <b-table
                      :items="items"
                      :fields="fields"
                      stacked="md"
                      show-empty
                      small
                    >
                      <template #cell(name)="row">
                        {{ row.value.first }} {{ row.value.last }}
                      </template>
                      <template #cell(count)="row">
                        <input
                          type="number"
                          style="width: 50px"
                          @click="info(row.index)"
                        />
                      </template>
                      <template #cell(actions)="row">
                        <b-button
                          size="sm"
                          @click="info(row.item, row.index, $event.target)"
                          class="mr-1"
                        >
                          X
                        </b-button>
                      </template>
                    </b-table>
                  </div>
                  <div class="footer_view">
                    <div class="btn-view">
                      <b-button variant="danger"> Thanh Toán</b-button>
                      <b-button variant="success"> Lưu</b-button>
                    </div>

                    <div class="title-view">
                      <b-form-group
                        id="input-group-1"
                        label="Tổng tiền"
                        label-for="input-1"
                      >
                        <label class="label-cout">6.223.334đ</label>
                      </b-form-group>
                    </div>
                  </div>
                </b-col>
                <b-col lg="6" md="12">
                  <div class="view_table">
                    <h2>Thông tin bàn</h2>
                    <b-form v-if="show">
                      <b-form-group
                        id="input-group-1"
                        label="Mã bàn:"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          type="text"
                          placeholder="Mã Bàn"
                          disabled
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                        id="input-group-2"
                        label="Trạng thái:"
                        label-for="input-2"
                      >
                        <b-form-input id="input-2" placeholder="" required></b-form-input>
                      </b-form-group>
                    </b-form>
                    <hr />
                    <span>Chọn bàn</span>
                    <b-form-select id="ratio"></b-form-select>
                    <b-button class="btn_table" variant="primary">Chuyển bàn</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-card>
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
      selected: "A",
      options: [
        { item: "A", name: "Đã có người" },
        { item: "B", name: "Còn trống" },
        { item: "D", name: "Tạm ngưng hoạt động " },
      ],
      rows: 100,
      currentPage: 1,
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      show: true,
      aspects: [
        { text: "101", value: "6:3" },
        { text: "102", value: "1:1" },
        { text: "103", value: "16:9" },
      ],
      items: [
        {
          nameproduct: "Xoài Lắc",
          price: 20100,
        },

        {
          nameproduct: "Dâu Tây",
          price: 21000,
        },
        { nameproduct: "Dâu Lắc", price: 2000 },
        {
          nameproduct: "Bánh Tráng",
          price: 203300,
        },
      ],
      fields: [
        {},
        {
          key: "nameproduct",
          label: "Tên Sản Phẩm",

          class: "text-center",
        },
        { key: "count", label: "Số Lượng" },
        {
          key: "price",
          label: "Giá",
        },
        {},
        { key: "actions", label: "Hành Động" },
      ],
    };
  },
  methods: {
    info(item, index, button) {},
    hideModal() {
      this.$refs["modal-2"].hide();
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
.panigation_tab {
  margin: 0 au;
}
.content_view {
  overflow-x: auto;
  padding: 1rem;
}
.card .footer_view {
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.view_table {
  padding: 1.25rem 1.5rem;
}
.btn_table {
  margin: 1rem 0;
}
.content-product {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.link-add {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
.label-cout {
  font-weight: bold;
  margin-left: 20px;
  font-size: 20px;
}
.bg-span {
  width: 14px;
  height: 15px;
  background: red;
}
.btn-icon-clipboard {
  height: 5rem;
  text-align: center;
  font-weight: bold;
}

.change {
  background: yellow;
}
.items-click-add {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
