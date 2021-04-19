<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col lg="12">
          <div>
            <div>
              <b-card no-body>
                <b-tabs pills card>
                  <b-tab title="Tất Cả">
                    <b-card-text>
                      <b-row>
                        <b-col
                          lg="3"
                          md="4"
                          mb="6"
                          v-for="product in products"
                          :key="product.id"
                        >
                          <img
                            class="img_food"
                            :src="'http://127.0.0.1:8000' + product.food_image"
                          />

                          <p>{{ product.food_name }}</p>
                          <strong>{{ product.food_price }}.VND</strong>
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
                        <b-col lg="3" md="4" mb="6" v-for="food in foods" :key="food.id">
                          <img
                            class="img_food"
                            :src="'http://127.0.0.1:8000' + food.food_image"
                          />
                          <p>{{ food.food_name }}</p>
                          <strong>{{ food.food_price }}.VND</strong>
                        </b-col>
                      </b-row>
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </div>
        </b-col>

        <!-- <b-col>
          <h3>Danh sách món ăn</h3>
          <light-table />
        </b-col> -->
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

      rows: 100,
      currentPage: 1,
      foods: [],
      categorys: [],
      products: [],
      selectcategoryname: null,
      categoryitem: [],
      category_name: "12312",
    };
  },
  created() {
    this.getAllCategory();
    this.getAllProducts();
  },
  methods: {
    // GET ALL
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
    // SEARCH CATEGORY NAME
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
  },
};
</script>
<style>
.img_food {
  height: 200px;
  width: 200px;
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

.list_category {
  list-style: none;
  display: flex;
  align-items: center;

  flex-wrap: wrap;
}
.list_category li {
  margin: 0 0.5rem;
  background: cornflowerblue;
  padding: 0.2rem;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}
</style>
