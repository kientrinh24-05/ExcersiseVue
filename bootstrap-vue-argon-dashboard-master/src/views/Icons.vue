<template>
  <div>
    <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row> </b-row>
    </base-header>

    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <div class="items-click-add">
              <h3>Tất cả bàn ăn</h3>
              <div>
                <b-button variant="primary"><i class="fas fa-sync-alt"></i></b-button>

                <b-button v-b-modal.modal-1 variant="success">Thêm mới </b-button>
              </div>
            </div>
            <b-modal id="modal-2" ref="modal-2" title="Lọc">
              <b-form @submit="SubmitSearch">
                <b-form-group id="input-group-1" label="Trạng thái">
                  <b-form-select
                    v-model="FormSearch.status"
                    :options="options"
                  ></b-form-select>
                </b-form-group>
                <div>
                  <b-button type="submit" variant="success">Xác nhận</b-button>
                  <b-button variant="secondary" @click="hideModal1">Hủy Bỏ</b-button>
                </div>
              </b-form>
            </b-modal>
            <b-modal id="modal-1" ref="modalAddTable" title="Thêm mới bàn">
              <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Tên bàn">
                  <b-form-input
                    id="input-1"
                    v-model="FormAdd.name"
                    placeholder="Tên bàn"
                    required
                  ></b-form-input>
                </b-form-group>
                <div>
                  <b-button variant="success" type="submit">Xác nhận</b-button>
                  <b-button variant="secondary" @click="hideModal">Hủy Bỏ</b-button>
                </div>
              </b-form>
            </b-modal>

            <b-row class="icon-examples">
              <b-col lg="3" md="6" v-for="table in tables" :key="table.id">
                <b-button
                  @click="info(table.item, table.id, $event.target)"
                  class="btn-icon-clipboard"
                >
                  {{ table.name }}
                </b-button>

                <b-modal :id="infoModal.id" title="Thông tin bàn  ">
                  <b-row>
                    <b-col lg="12" md="6">
                      <h3>Thông tin đặt bàn</h3>
                      <b-form-group>
                        <b-form-input
                          id="input-1"
                          type="text"
                          placeholder="Tên Người Đặt"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group>
                        <b-form-input
                          id="input-2"
                          placeholder="Số ĐT"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group>
                        <b-form-input
                          id="input-2"
                          placeholder="Số Lượng"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group>
                        <b-form-input
                          id="input-2"
                          placeholder="Ngày Đặt"
                          required
                          type="date"
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group>
                        <b-form-input
                          id="input-2"
                          placeholder="Tiền Đặt"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-button variant="success">Đặt Bàn</b-button>
                    </b-col>
                    <hr />
                  </b-row>
                </b-modal>
              </b-col>
            </b-row>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import BaseHeader from "@/components/BaseHeader";
import LightTable from "./Tables/RegularTables/LightTable";
import axios from "axios";

Vue.use(VueClipboard);
export default {
  name: "icons",
  data() {
    return {
      tables: null,

      items: [],

      FormAdd: {
        name: null,
      },
      FormSearch: {
        status: null,
      },
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  components: {
    BaseHeader,
    LightTable,
  },
  created() {
    this.getTable();
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
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
    onSubmit(event) {
      event.preventDefault();

      this.$refs.modalAddTable.hide();
      const payload = {
        name: this.FormAdd.name,
      };
      console.log(payload);

      this.addTable(payload);
    },
    //ADD Table
    addTable(payload) {
      const path = "http://127.0.0.1:8000/food_tabel/create_table/";
      axios
        .post(path, payload)
        .then((res) => {
          this.getTable();
        })
        .catch((error) => {
          this.getTable();
          console.log(error);
        });
    },
    Search(payload) {
      const path = "http://127.0.0.1:8000/food_tabel/create_table/";
      axios
        .get(path, payload)
        .then((response) => {
          this.tables = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    SubmitSearch(event) {
      event.preventDefault();

      this.$refs.modalAddTable.hide();
      const payload = {
        status: this.FormSearch.status,
      };
      console.log(payload);

      this.Search(payload);
    },

    onCopy() {
      this.$notify({
        type: "info",
        message: "Copied to clipboard",
      });
    },
    hideModal() {
      this.$refs["modal-1"].hide();
    },
    hideModal1() {
      this.$refs["modal-2"].hide();
    },
    select(index) {},
  },
};
</script>
<style>
ul {
  list-style: none;
  display: flex;
}
ul li {
  margin-right: 0.5rem;
}
.bg-span {
  width: 14px;
  height: 15px;
  background: red;
}
.btn-icon-clipboard {
  height: 5rem;
  border: 1px solid gray;
  text-align: center;
  font-weight: bold;
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
.content_search {
  width: 60%;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.action-f {
  margin-top: 1rem;
}
.btn-plus {
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
}
.flex {
  display: flex;
  justify-content: space-between;
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
.items-click-add {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-footer {
  display: none;
}
</style>
