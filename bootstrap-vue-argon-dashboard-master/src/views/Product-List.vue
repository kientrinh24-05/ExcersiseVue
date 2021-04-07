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
                      <b-button variant="success" @click="ShowTable(selected)"
                        >Xác nhận</b-button
                      >
                      <b-button variant="secondary" @click="hideModal">Hủy Bỏ</b-button>
                    </div>
                  </b-form>
                </b-modal>
              </div>
            </div>
            <b-row class="icon-examples">
              <b-col
                @click="getOrderFood(table.id)"
                lg="3"
                md="6"
                class="table"
                v-for="table in tables"
                :key="table.id"
              >
                <b-button :class="getTableColor(table.status)" class="btn-icon-clipboard">
                  {{ table.name }}
                </b-button>
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
                    <b-tab title="Tất Cả">
                      <b-card-text>
                        <b-row>
                          <b-col
                            lg="4"
                            md="6"
                            mb="6"
                            class="product-content"
                            v-for="product in products"
                            :key="product.id"
                          >
                            <img
                              class="img_food"
                              :src="'http://127.0.0.1:8000' + product.food_image"
                            />
                            <strong>{{ product.food_price }}.VND</strong>
                            <p>{{ product.food_name }}</p>

                            <b-badge pill class="add" variant="primary">ADD</b-badge>
                          </b-col>
                        </b-row></b-card-text
                      >
                    </b-tab>
                    <b-tab
                      style="margin: 0.5rem 0"
                      v-for="category in categorys"
                      :key="category.id"
                      :title="category.category_name"
                      v-model="category_name"
                      @click="showNameCategory(category.category_name)"
                    >
                      <b-card-text>
                        <b-row>
                          <b-col
                            lg="6"
                            md="6"
                            mb="6"
                            class="product-content"
                            v-for="food in foods"
                            :key="food.id"
                          >
                            <img
                              class="img_food"
                              :src="'http://127.0.0.1:8000' + food.food_image"
                            />
                            <strong>{{ food.food_price }}.VND</strong>

                            <p>{{ food.food_name }}</p>

                            <b-badge
                              @click="setProduct(food.id)"
                              class="add"
                              pill
                              variant="primary"
                              >ADD</b-badge
                            >
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-tab>
                  </b-tabs>
                </b-col>
                <b-col lg="6" md="12">
                  <div class="content_view">
                    <h2>Order Món Ăn</h2>
                    <!-- <div>
                    <b-table striped hover :items="items"></b-table>
                  </div> -->
                    <b-table
                      :items="orderFood"
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
                          :value="row.item.count"
                          @click="info(row.index)"
                        />
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
import axios from "axios";
import { mapActions } from "vuex";

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
      tables: [],
      projects,
      users,
      foods: [],
      categorys: [],
      products: null,
      selected: "Trống",
      options: [
        { item: "Có người", name: "Có người" },
        { item: "Trống", name: "Trống" },
        { item: "Bàn đã đặt", name: "Bàn đã đặt" },
        { item: "Tạm ngưng hoạt động", name: "Tạm ngưng hoạt động " },
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

      items: [{}],
      fields: [
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
      ],
    };
  },
  created() {
    this.getAllCategory();
    this.getAllProducts();

    console.log(this.products, "products");
    this.ShowTableActive("Trống");
  },
  mounted() {
    console.log(this.products, "products");
  },
  computed: {
    //   ...mapState(["orderFood"]),
    orderFood() {
      return this.$store.state.orderFood;
    },
    foodItems() {
      return this.$store.state.foodItems;
    },
  },
  methods: {
    ...mapActions(["setfoodItems", "setfoodItemsById"]),
    // setfoodItemsAll() {
    //   this.setfoodItems(this.foods);
    // },
    setProduct(id) {
      this.setfoodItemsById(this.foodItems, id);
    },
    getOrderFood(idTable) {
      axios
        .get(`http://127.0.0.1:8000/order/get_food_ordered/` + idTable)
        .then((response) => response.data)
        .then((res) => {
          this.items = res.data.map((supplier) => {
            return {
              nameproduct: supplier.food_name,
              count: supplier.amount,
              price: supplier.food_price,
            };
          });
        });
    },
    // Mapper
    getTableColor(value) {
      switch (value) {
        case "Bàn đã đặt":
          return "change";
        case "Có người":
          return "sucses";
        case "Tạm ngưng hoạt động":
          return "no-sucses";
        default:
          return "no-change";
      }
    },

    getTable() {
      axios
        .get(`http://127.0.0.1:8000/food_tabel/list_table/`)
        .then((response) => {
          this.tables = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ShowTableActive(name) {
      console.log(name);
      axios
        .get(`http://127.0.0.1:8000/food_tabel/search_table/` + name)

        .then((response) => {
          this.tables = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ShowTable(name) {
      console.log(name);
      axios
        .get(`http://127.0.0.1:8000/food_tabel/search_table/` + name)

        .then((response) => {
          this.tables = response.data.data;
          console.log(this.foods);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hideModal() {
      this.$refs["modal-2"].hide();
    },
    getAllCategory() {
      axios
        .get(`http://127.0.0.1:8000/food_tabel/list_category/`)
        .then((response) => {
          this.categorys = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllProducts() {
      axios
        .get(`http://127.0.0.1:8000/food_tabel/list_food/`)
        .then((response) => {
          console.log(response, "response");
          this.products = response.data.data;

          console.log(response.data.data, "response");
          this.setfoodItems(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    showNameCategory(name) {
      console.log(name);
      axios
        .get(`http://127.0.0.1:8000/food_tabel/list_category_food/` + name)

        .then((response) => {
          this.foods = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.add {
  cursor: pointer;
  font-size: 1rem;
}
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

.no-change {
  background-color: white;
}
.sucses {
  background: red;
}
.no-sucses {
  background: green;
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
.product-content {
  margin: 1rem 0;
}
</style>
