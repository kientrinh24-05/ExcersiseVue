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
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    autofocus
                    required
                  />
                  <button class="fa fa-search" type="submit"></button>
                </div>
                <b-button variant="primary"
                  ><i class="fas fa-sync-alt"></i
                ></b-button>
                <b-button v-b-modal.modal-1 variant="success"
                  >Thêm mới</b-button
                >

                <b-modal
                  id="modal-1"
                  title="Thêm món ăn"
                  size="lg"
                  ref="modal-1"
                >
                  <div>
                    <b-row>
                      <b-col lg="6" md="12">
                        <b-form
                          @submit="onSubmitProduct"
                          @reset="onReset"
                          v-if="show"
                        >
                          <b-form-group
                            id="input-group-2"
                            label="Tên món ăn"
                            label-for="input-2"
                          >
                            <b-form-input
                              id="input-2"
                              placeholder="Nhập tên món ăn"
                              required
                              v-model="form.food_name"
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-group-3"
                            label="Phân Loại"
                            label-for="input-3"
                          >
                            <select
                              class="custom-select"
                              v-model="form.category_name"
                            >
                              <option v-for="food in foods" :key="food.id" :value="food.id">
                                {{ food.category_name }}
                              </option>
                            </select>
                          </b-form-group>
                          <b-form-group
                            id="input-group-2"
                            label="Giá"
                            label-for="input-2"
                          >
                            <b-form-input
                              id="input-2"
                              placeholder="Nhập giá món ăn"
                              required
                              v-model="form.food_price"
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group id="input-group-2" label="Hình Ảnh">
                            <b-form-file
                              placeholder="Chọn địa chỉ hình ảnh..."
                              drop-placeholder="Drop file here..."
                              v-model="form.food_image"
                              @change="onFileChange"
                            ></b-form-file>
                          </b-form-group>

                          <div class="btn_click">
                            <b-button type="submit" variant="primary"
                              >Thêm Món</b-button
                            >
                            <b-button type="reset" variant="danger"
                              >Hủy Bỏ</b-button
                            >
                          </div>
                        </b-form>
                      </b-col>
                      <b-col lg="6">
                        <dark-table />
                      </b-col>
                    </b-row>
                  </div>
                </b-modal>
              </div>
            </div>
          </card>
          <div class="content_Table">
            <div>
              <b-card no-body>
                <div>
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
                  <b-modal :id="infoModal.id" title="Thông tin món ăn" ok-only>
                    <pre></pre>
                    <div>
                      <h2 style="text-align: center">Sửa Món Ăn</h2>
                      <div>
                        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                          <b-form-group
                            id="input-group-1"
                            label="Tên Sản Phẩm"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              v-model="form.email"
                              type="text"
                              placeholder="Tên Sản Phẩm"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group
                            id="input-group-2"
                            label="Giá Sản Phẩm:"
                            label-for="input-2"
                          >
                            <b-form-input
                              id="input-2"
                              v-model="form.name"
                              placeholder="Giá Sản Phẩm"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group id="input-group-2" label="Hình Ảnh">
                            <b-form-file
                              placeholder="Chọn địa chỉ hình ảnh..."
                              drop-placeholder="Drop file here..."
                              @change="onChangeFileUpload()"
                            ></b-form-file>
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

                          <!-- Button Click Submit -->
                          <div class="link-btn">
                            <b-button type="submit" variant="primary"
                              >Xác Nhận</b-button
                            >
                            <b-button type="reset" variant="danger"
                              >Làm Mới</b-button
                            >
                          </div>
                        </b-form>
                      </div>
                    </div>
                  </b-modal>
                </div>

                <b-card-footer class="py-4 d-flex justify-content-end">
                  <base-pagination
                    v-model="currentPage"
                    :per-page="10"
                    :total="40"
                  ></base-pagination>
                </b-card-footer>
              </b-card>
              <!-- End -->
            </div>
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
import DarkTable from "./Tables/RegularTables/DarkTable.vue";
import axios from "axios";

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
      currentPage: 1,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      foods: [{ text: "", value: null }, "Tất cả", "Gạo", "Ăn Nhanh"],
      fields: [
        {
          key: "mã_món_ăn",
        },
        {
          key: "tên_món_ăn",
        },
        {
          key: "phân_loại",

          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "giá_sản_phẩm",

          // Variant applies to the whole column, including the header and footer
        },

        { key: "actions", label: "Hành động" },
      ],
      items: [],

      form: {
        food_name: "",
        category_name: "",
        food_price: "",
        food_image: "",
      },
      show: true,
    };
  },

  created() {
    this.getTable();
    this.Getproduct();
  },
  methods: {
    onChangeFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    //Get All Category
    getTable() {
      axios
        .get(`http://127.0.0.1:8000/food_tabel/list_category/`)
        .then((response) => {
          this.foods = response.data.data;
          console.log(this.foods);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Get All Food
    Getproduct() {
      fetch("http://127.0.0.1:8000/food_tabel/list_food/")
        .then((response) => response.json())
        .then(
          (json) =>
            (this.items = json.data.map((product) => {
              return {
                mã_món_ăn: product.id,
                tên_món_ăn: product.food_name,
                phân_loại: product.category_name,
                giá_sản_phẩm: product.food_price,
              };
            }))
        );
    },
    //add Food
    addProduct(payload) {
      const path = "http://127.0.0.1:8000/food_tabel/create_food/";
      axios
        .post(path, payload)
        .then(() => {
          this.Getproduct();
        })
        .catch((error) => {
          this.Getproduct();
          console.log(error);
        });
    },
    onSubmitProduct(event) {

      let formData = new FormData();
      formData.append('food_name', this.form.food_name);
      formData.append('category', this.form.category_name);
      formData.append('food_price', this.form.food_price);
      formData.append('food_image', this.form.food_image);

      event.preventDefault();

      // const payload = {
      //   food_name: this.form.food_name,
      //   category_name: this.form.category_name,
      //   food_price: this.form.food_price,
      //   food_image: this.form.food_image,
      // };

      const payload = formData;
      console.log(payload);

      this.addProduct(payload);
    },
    // Upload IMG
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    // UpLoadIMG
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
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form));
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
