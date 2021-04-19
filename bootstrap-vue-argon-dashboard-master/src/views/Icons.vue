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
                <b-button v-b-modal.modal-2 variant="primary"
                  ><i class="fas fa-sync-alt"></i>
                </b-button>

                <b-button v-b-modal.modal-1 variant="success">Thêm mới </b-button>
              </div>
            </div>

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
            <b-modal id="modal-2" ref="modalMove" title="Chuyển bàn">
              <b-form @submit="SubmitMove">
                <b-row>
                  <b-col lg="5">
                    <b-form-group
                      id="input-group-3"
                      label="Chuyển từ"
                      label-for="input-3"
                    >
                      <select class="custom-select" v-model="moveTable.tablebeforemove">
                        <option
                          v-for="tablemove in tablemoves"
                          :key="tablemove.id"
                          :value="tablemove.id"
                        >
                          {{ tablemove.name }}
                        </option>
                      </select>
                    </b-form-group>
                  </b-col>

                  <b> - </b>

                  <b-col lg="5">
                    <b-form-group
                      id="input-group-3"
                      label="Chuyển đến"
                      label-for="input-3"
                    >
                      <select class="custom-select" v-model="moveTable.tableaftermove">
                        <option
                          v-for="tableaftermove in tableaftermoves"
                          :key="tableaftermove.id"
                          :value="tableaftermove.id"
                        >
                          {{ tableaftermove.name }}
                        </option>
                      </select>
                    </b-form-group>
                  </b-col>
                </b-row>

                <div>
                  <b-button variant="success" type="submit">Chuyển</b-button>
                  <b-button variant="secondary" @click="hideModal">Hủy Bỏ</b-button>
                </div>
              </b-form>
            </b-modal>

            <b-row class="icon-examples">
              <b-col
                @click="BookTable(table.id, table.status)"
                lg="3"
                md="6"
                v-for="table in tables"
                :key="table.id"
              >
                <b-button
                  v-b-modal.modal-10
                  :class="getTableColor(table.status)"
                  @click="BookTable(table.id, table.status)"
                  class="btn-icon-clipboard table"
                >
                  {{ table.name }}
                </b-button>
              </b-col>
            </b-row>
            <b-modal id="modal-10" ref="ModalBook" title="Thông tin bàn  ">
              <b-row>
                <b-col lg="12" md="6">
                  <h3>Thông tin đặt bàn</h3>
                  <b-form @submit="onSubmitBookTables">
                    <b-form-group>
                      <b-form-input
                        id="input-1"
                        type="text"
                        placeholder="Tên Người Đặt"
                        v-model="booktables.namebook"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group>
                      <b-form-input
                        id="input-2"
                        v-model="booktables.phonebook"
                        placeholder="Số ĐT"
                        required
                        type="number"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        id="input-2"
                        v-model="booktables.countbook"
                        placeholder="Số Lượng"
                        required
                        min="0"
                        type="number"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        type="datetime-local"
                        value="2017-06-01T08:30"
                        id="example-datetime-local-input"
                        v-model="booktables.datebook"
                      >
                      </b-form-input>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        id="input-2"
                        v-model="booktables.moneybook"
                        placeholder="Tiền Đặt"
                        type="number"
                        required
                        min="0"
                      ></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="success">Đặt Bàn</b-button>

                    <b-button v-if="show2" @click="removeTable" variant="danger"
                      >Xóa Bàn</b-button
                    >
                    <b-button v-if="show1" @click="canCelTable" variant="danger"
                      >Hủy Bàn</b-button
                    >
                  </b-form>
                </b-col>
                <hr />
              </b-row>
            </b-modal>
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
      show1: false,
      show2: false,
      tableID: null,
      tables: [],
      tableaftermoves: [],
      tablemoves: [],
      moveTable: {
        tablebeforemove: "",
        tableaftermove: "",
      },
      booktables: {
        id: "",
        namebook: "",
        phonebook: "",
        countbook: "",
        moneybook: " ",
        datebook: "",
      },
      // AddBookTable: {
      //   id: "",
      //   namebook: "",
      //   phonebook: "",
      //   countbook: "",
      //   moneybook: "",
      //   datebook: "",
      // },
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
    this.GetTalbeMove();
    this.GetTalbeOnMove();
  },
  methods: {
    //RemoveTalve
    removeTable() {
      axios
        .put(`http://127.0.0.1:8000/food_tabel/detail_table/` + this.tableID)
        .then(() => {
          this.$refs["ModalBook"].hide();
          this.$toaster.success("Xóa bàn thành công");

          this.getTable();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Move Table
    MoveTable(payload) {
      const path = "http://127.0.0.1:8000/order/switch_table/";
      axios.post(path, payload).then((res) => {
        this.getTable();
      });
    },
    SubmitMove(event) {
      event.preventDefault();
      const payload = {
        table_one: this.moveTable.tablebeforemove,
        table_two: this.moveTable.tableaftermove,
      };

      this.MoveTable(payload);
      this.$toaster.success(
        `Đã chuyển bàn ` +
          this.moveTable.tablebeforemove +
          `  Sang Bàn  ` +
          this.moveTable.tableaftermove
      );
      this.$refs["modalMove"].hide();
    },
    GetTalbeMove() {
      axios
        .get(`http://127.0.0.1:8000/food_tabel/search_table/Có người`)

        .then((response) => {
          this.tablemoves = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    GetTalbeOnMove() {
      axios
        .get(`http://127.0.0.1:8000/food_tabel/search_table/Trống`)

        .then((response) => {
          this.tableaftermoves = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Mapper
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
    canCelTable() {
      const path = `http://127.0.0.1:8000/food_tabel/cancel_book_table/` + this.tableID;
      axios.post(path).then((res) => {
        this.$toaster.success(`Đã hủy bàn số  ` + this.tableID);
        this.getTable();
        this.$refs["ModalBook"].hide();
      });
    },
    // BOOK TABLE DATA
    BookTable(id, status) {
      this.tableID = id;
      if (status == "Trống") {
        this.show2 = true;
      }
      if (status == "Bàn đã đặt") {
        axios
          .get(`http://127.0.0.1:8000/food_tabel/update_book_table/` + id)
          .then((res) => res.data)
          .then((response) => {
            this.show1 = true;
            this.show2 = false;
            if (response.status == 404) {
              this.$toaster.success(response.message);
            } else {
              const { data } = response;

              this.booktables.id = data.id;
              this.booktables.namebook = data.name_book;
              this.booktables.phonebook = data.phone_book;
              this.booktables.countbook = data.number_of_people;
              this.booktables.moneybook = data.money_book;
              this.booktables.datebook = data.time_book;
            }

            return;
          });
      } else {
        this.show1 = false;
        this.booktables.namebook = "";
        this.booktables.phonebook = "";

        this.booktables.countbook = "";
        this.booktables.moneybook = "";
        this.booktables.datebook = "";
      }
    },
    // BOOK TABLE
    booktTables(payload) {
      const path = "http://127.0.0.1:8000/food_tabel/book_table/";
      axios
        .post(path, payload)
        .then((res) => {
          if (res.data.status_code == 400) {
            this.$toaster.error(res.data.message);
          } else {
            this.getTable();
            this.$toaster.success("Đặt bàn thành công");
          }
        })
        .catch((error) => {
          this.getTable();
          console.log(error);
        });
    },
    // BOOK TABLE
    onSubmitBookTables(event) {
      event.preventDefault();

      // this.$refs.modalAddTable.hide();
      const payload = {
        table: (this.booktables.id = this.tableID),
        name_book: this.booktables.namebook,
        phone_book: this.booktables.phonebook,
        number_of_people: this.booktables.countbook,
        money_book: this.booktables.moneybook,
        time_book: this.booktables.datebook,
      };

      this.booktTables(payload);

      this.$refs["ModalBook"].hide();
    },

    // GET ALL TABLE
    getTable() {
      // this.tableStatus = status;
      axios
        .get(`http://127.0.0.1:8000/food_tabel/list_table/`)
        .then((response) => {
          this.tables = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //ADD TABLE
    addTable(payload) {
      const path = "http://127.0.0.1:8000/food_tabel/create_table/";
      axios
        .post(path, payload)
        .then((res) => {
          if (res.data.status_code == 400) {
            this.$toaster.error(res.data.message);
          } else {
            this.onReset();
            this.getTable();
            this.$toaster.success("Thêm  bàn thành công");
          }
        })
        .catch((error) => {
          this.getTable();
          console.log(error);
        });
    },
    onSubmit(event) {
      event.preventDefault();

      const payload = {
        name: this.FormAdd.name,
      };

      this.addTable(payload);
      this.$refs.modalAddTable.hide();
    },
    onReset() {
      this.FormAdd.name = "";
    },
    /////////

    onCopy() {
      this.$notify({
        type: "info",
        message: "Copied to clipboard",
      });
    },
    hideModal() {
      this.$refs["modalAddTable"].hide();
    },
    hideModal1() {
      this.$refs["modal-2"].hide();
    },
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
