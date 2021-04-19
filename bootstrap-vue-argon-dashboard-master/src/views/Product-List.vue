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
                v-for="table in tables"
                :key="table.id"
                :class="{ selected: current === table.id }"
              >
                <!--    {'btn-danger': lights, 'btn-success': !lights} -->
                <b-button
                  :class="getTableColor(table.status)"
                  class="btn-icon-clipboard table_btn"
                >
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
                <b-col lg="10" md="12">
                  <div class="content_view">
                    <h2>Order Món Ăn</h2>
                    <!-- <div>
                    <b-table striped hover :items="items"></b-table>
                  </div> -->
                    <!--  <b-table
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
                        <button @click="increaseQ(row)" class="btn btn-info btn-sm">
                          -
                        </button>
                        {{ row.item.count }}
                        <button
                          @click="increaseQ(product)"
                          class="btn btn-info btn-sm"
                          size="sm"
                        >
                          +
                        </button>
                      </template>
                    </b-table> -->

                    <table class="table text-center">
                      <thead>
                        <tr>
                          <th scope="col">Tên Sản Phẩm</th>
                          <th scope="col">Số Lượng</th>
                          <th scope="col">Giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="product in cart" :key="product.id">
                          <td>{{ product.food_name }}</td>
                          <td>
                            <button
                              @click="decreaseQ(product)"
                              class="btn btn-info btn-sm"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              v-model="product.amount"
                              style="width: 40px"
                              min="1"
                            />

                            <button
                              @click="increaseQ(product)"
                              class="btn btn-info btn-sm"
                            >
                              +
                            </button>
                          </td>
                          <td>{{ product.food_price }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="footer_view">
                    <div class="btn-view">
                      <b-button variant="danger" v-b-modal.modal-1 @click="printBill">
                        Thanh Toán</b-button
                      >

                      <b-modal id="modal-1" title="Phiếu thanh toán">
                        <h3 style="text-align: center">PHIẾU TÍNH TIỀN</h3>
                        <ul style="display: block; list-style-type: square">
                          <li>Mã hóa đơn : {{ print.bill_id }}</li>
                          <li>Ngày lập : {{ print.time_created }}</li>
                          <li>Bàn : {{ print.table_name }}</li>
                        </ul>
                        <hr />

                        <table class="table text-center">
                          <thead>
                            <tr>
                              <th scope="col">Tên Sản Phẩm</th>
                              <th scope="col">Số Lượng</th>
                              <th scope="col">Giá</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="Food in listFood" :key="Food.id">
                              <td>{{ Food.food_name }}</td>
                              <td>{{ Food.amount }}</td>
                              <td>{{ Food.price }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <p>
                          Tổng thành tiền : {{ formatPrice(print.total_price) + "VNĐ" }}
                        </p>

                        <b-button @click="LocalBill()"> In Bill </b-button>
                      </b-modal>
                      <b-button variant="success" @click="onsubmitSaveBill()">
                        Lưu</b-button
                      >
                    </div>

                    <div class="title-view">
                      <b-form-group
                        id="input-group-1"
                        label="Tổng tiền"
                        label-for="input-1"
                      >
                        <label class="label-cout">{{
                          formatPrice(calcSum) + "VNĐ"
                        }}</label>
                      </b-form-group>
                    </div>
                  </div>
                </b-col>
                <b-col lg="12" md="12">
                  <b-tabs pills card>
                    <b-tab title="Tất Cả">
                      <b-card-text>
                        <b-row>
                          <b-col
                            lg="4"
                            md="4"
                            sm="4"
                            mb="6"
                            class="product-content"
                            v-for="product in products"
                            :key="product.id"
                          >
                            <img
                              class="img_food"
                              :src="'http://127.0.0.1:8000' + product.food_image"
                            />
                            <div class="rows_content">
                              <div>
                                <b>{{ product.food_price }}.VND</b>
                                <p>{{ product.food_name }}</p>
                              </div>
                              <div></div>
                              <button
                                :disabled="product.cart"
                                @click="addProduct(product)"
                                href="#"
                                class="add_btn"
                                :class="{
                                  'btn-primary': !product.cart,
                                  'btn-success': product.cart,
                                }"
                              >
                                {{ !product.cart ? "+" : "Added" }}
                              </button>
                            </div>
                          </b-col>
                        </b-row></b-card-text
                      >
                    </b-tab>
                    <b-tab
                      style="margin: 0.5rem 0"
                      v-for="category in categorys"
                      :key="category.id"
                      :title="category.category_name"
                      @click="showNameCategory(category.category_name)"
                    >
                      <b-card-text>
                        <b-row>
                          <b-col
                            lg="4"
                            md="4"
                            mb="6"
                            class="product-content"
                            v-for="food in foods"
                            :key="food.id"
                          >
                            <img
                              class="img_food"
                              :src="'http://127.0.0.1:8000' + food.food_image"
                            />
                            <div class="rows_content">
                              <div>
                                <b>{{ food.food_price }}.VND</b>
                                <p>{{ food.food_name }}</p>
                              </div>
                              <div>
                                <button
                                  :disabled="food.cart"
                                  @click="addProduct(food)"
                                  href="#"
                                  class="add_btn"
                                  :class="{
                                    'btn-primary': !food.cart,
                                    'btn-success': food.cart,
                                  }"
                                >
                                  {{ !food.cart ? "+" : "Added" }}
                                </button>
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-tab>
                  </b-tabs>
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
import moment from "moment";
import { mapActions, mapState } from "vuex";

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
      current: null,
      total: 0,
      idTables: null,
      tables: [],
      cart: [],
      projects,
      users,
      product: {
        food_name: "",
        amount: 1,
        food_price: "",
      },
      foods: [],
      categorys: [],
      products: [],
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
      orderfood: [],
      items: [],

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
      print: {
        bill_id: "",
        time_created: "",
        total_price: "",
        table_name: "",
      },
      listFood: [],
    };
  },
  created() {
    this.getAllCategory();
    this.getAllProducts();

    (this.print.time_created = moment(print.time_created).format("DD/MM/YYYY hh:mm:ss")),
      this.ShowTableActive("Trống");
  },
  mounted() {
    // console.log(this.products, "products");
  },
  computed: {
    // ...mapState(["foodItems"]),
    // orderFood() {
    //   return this.$store.state.orderFood;
    // },
    // foodItems() {
    //   return this.$store.state.foodItems;
    // },

    //SUM PRICE IN FILLTER
    calcSum() {
      let total = 0;
      this.cart.forEach((item, i) => {
        total += item.food_price * item.amount;
      });
      return total;
    },
  },
  methods: {
    //Format Price
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    // Xuat bill
    LocalBill() {
      const path = `http://127.0.0.1:8000/order/pay_bill/` + this.idTables;
      axios
        .post(path)
        .then((res) => {
          this.$toaster.success("Thanh toán thành công cho bàn " + this.idTables);
        })
        .catch((error) => {
          console.log(error);
          // this.$toaster.error("Thất bại");
        });
    },
    // Print Bill
    printBill() {
      // let id = localStorage.getItem("idtalbe");

      axios
        .get(`http://127.0.0.1:8000/order/print_bill/` + this.idTables)
        .then((res) => res.data)
        .then((response) => {
          if (response.message == "Not found bill") {
            this.$toaster.error("Bàn không có hóa đơn để thanh toán");
          }

          const { data } = response;
          (this.print.bill_id = response.bill_id),
            (this.print.time_created = response.time_created),
            (this.print.total_price = response.total_price),
            (this.print.table_name = response.table_name),
            (this.listFood = response.data);
        });
    },

    saveBill(payload) {
      const path = "http://127.0.0.1:8000/order/order_food/";
      axios
        .post(path, payload)
        .then(() => {})
        .catch((error) => {
          console.log(error);
          // this.$toaster.error("Thất bại");
        });
    },
    // EROOO
    onsubmitSaveBill() {
      let idtable = localStorage.getItem("idtalbe");

      let payload1 = [];

      this.cart.forEach((item, i) => {
        payload1.push(this.cart[i]);
      });

      const payload = {
        table_id: idtable,
        list_food: payload1,
      };
      // console.log(payload.list_food, "payload");

      this.saveBill(payload);

      this.$toaster.success("Đã gọi món cho bàn " + idtable);
    },

    // ADD PRODUCT CATEGORY
    addProduct1(cartItem) {
      var idTable = localStorage.getItem("idtalbe");
      if (idTable == null) {
        return this.$toaster.success("Bạn Vui Lòng Chọn Bàn Trước Khi Order");
      }

      let flag = true;

      this.cart.map((item) => {
        if (item.id === cartItem.id) {
          (item.amount += 1), (flag = false);
        }
      });
      if (flag) {
        cartItem.amount = 1;
        this.cart.push(cartItem);
      }
    },
    // ADD PRODUCT ALL
    addProduct(cartItem) {
      var idTable = localStorage.getItem("idtalbe");
      if (idTable == null) {
        return this.$toaster.success("Bạn Vui Lòng Chọn Bàn Trước Khi Order");
      }
      var a = 0;
      let flag = true;

      this.cart.map((item) => {
        if (item.id === cartItem.id) {
          (item.amount += 1), (flag = false);
        }
      });
      if (flag) {
        cartItem.amount = 1;
        this.cart.push(cartItem);
      }

      // this.products.map((p) => {
      //   console.log("log 1");
      //   if (product.id == p.id) {
      //     p.cart = !p.cart;
      //     p.amount = 1;

      //     // console.log(p.food_name, "foodname p");
      //   }
      //   // this.cart.forEach((item, i) => {
      //   //   console.log(p.food_name, "prodcut_name");
      //   //   console.log(this.cart[i].food_name, "card_name");
      //   //   if (this.products.food_name == this.cart[i].food_name) {
      //   //     // this.products.cart = !this.products.cart;
      //   //     // this.products.amount = 1;
      //   //     // return this.cart.amount++, console.log(this.cart);
      //   //   } else {
      //   //     // console.log(this.product.food_name, "prodcut_name");
      //   //     // console.log(this.cart[i].food_name, "card_name");
      //   //     this.cart.push(product);
      //   //   }
      //   // });
      // });
    },
    // PLUS PRODUCT
    increaseQ(cartItem) {
      this.cart.map((p) => {
        if (cartItem.id == p.id) {
          p.amount += 1;
        }
      });
    },
    // MINUS PRODUCT
    decreaseQ(cartItem) {
      this.cart.map((p) => {
        if (cartItem.id == p.id && p.amount > 1) {
          p.amount -= 1;
        }
      });
    },
    // GET ORDER TABLE ORDER IN ID TABLE
    getOrderFood(idTable) {
      this.idTables = idTable;
      this.current = idTable;
      // this.foods.cart = true;
      // this.products.cart = true;
      localStorage.setItem("idtalbe", idTable),
        axios
          .get(`http://127.0.0.1:8000/order/food_ordered/` + idTable)
          .then((response) => {
            this.cart = response.data.data;
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
    // GET ALL TABLE
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
    // FILLTER TABLE NAME
    ShowTableActive(name) {
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
      axios
        .get(`http://127.0.0.1:8000/food_tabel/search_table/` + name)

        .then((response) => {
          this.tables = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
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
          this.products = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    showNameCategory(name) {
      axios
        .get(`http://127.0.0.1:8000/food_tabel/list_category_food/` + name)

        .then((response) => {
          this.foods = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hideModal() {
      this.$refs["modal-2"].hide();
    },
  },
};
</script>
<style>
.table_btn {
}
.add_btn {
  background-color: #2dce89;
  width: 40px;
  height: 40px;
  margin-right: 34px;
  border-radius: 50%;
  border: none;
}
.rows_content {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.selected {
  border: 2px solid red;
  margin: 0;
  padding: 0;
}

.no-change {
  background-color: #ecf0f1;
}
.sucses {
  background: #3498db;
}
.no-sucses {
  background: #7f8c8d;
}
.change {
  background: #27ae60;
}
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
