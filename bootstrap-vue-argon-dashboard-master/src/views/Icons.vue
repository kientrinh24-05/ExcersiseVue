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
                <b-button v-b-modal.modal-2 variant="info"
                  ><i class="fas fa-filter"></i>
                </b-button>
                <b-button v-b-modal.modal-1 variant="success">Thêm mới </b-button>
              </div>
            </div>
            <b-modal id="modal-2" ref="modal-2" title="Lọc">
              <b-form>
                <b-form-group id="input-group-1" label="Trạng thái">
                  <b-form-select v-model="selected" :options="options"></b-form-select>
                </b-form-group>
                <div>
                  <b-button variant="success" @click="hideModal1">Xác nhận</b-button>
                  <b-button variant="secondary" @click="hideModal1">Hủy Bỏ</b-button>
                </div>
              </b-form>
            </b-modal>
            <b-modal id="modal-1" ref="modal-1" title="Thêm mới bàn">
              <b-form>
                <b-form-group id="input-group-1" label="Trạng thái">
                  <b-form-select v-model="selected" :options="options"></b-form-select>
                </b-form-group>
                <b-form-group id="input-group-1" label="Số lượng">
                  <b-form-input
                    id="input-1"
                    placeholder="Số lượng người"
                    required
                  ></b-form-input>
                </b-form-group>
                <div>
                  <b-button variant="success" @click="hideModal">Xác nhận</b-button>
                  <b-button variant="secondary" @click="hideModal">Hủy Bỏ</b-button>
                </div>
              </b-form>
            </b-modal>

            <b-row class="icon-examples">
              <b-col lg="3" md="6" v-for="table in tables" :key="table.id">
                <b-button v-b-modal.modal-3 class="btn-icon-clipboard">
                  {{ table.id }}
                  <div>
                    <!-- <b-modal id="modal-3" size="lg" title="Thông tin bàn  ">
                      <b-row>
                        <b-col lg="6" md="6">
                          <h3>Thông tin bàn</h3>
                          <b-form-group>
                            <b-form-input
                              id="input-1"
                              type="text"
                              placeholder="Mã bàn"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group>
                            <b-form-input
                              id="input-2"
                              placeholder="Tình trạng bàn"
                              required
                            ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col lg="6" md="6">
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
                    </b-modal> -->
                  </div>
                </b-button>
              </b-col>
            </b-row>
          </card>
        </b-col>
        <div class="action-f">
          <ul>
            <li>
              <div class="bg-span sucses"></div>
              Đã có người
            </li>
            <li>
              <div class="bg-span no-sucses"></div>
              Bàn Trống
            </li>
            <li>
              <div class="bg-span change"></div>
              Tạm ngưng hoạt động
            </li>
          </ul>
        </div>
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
      selected: null,
      options: [
        { value: "a", text: "Đã có người" },
        { value: "b", text: "Trống" },
        { value: "c", text: "Đang sữa chửa" },
      ],
      items: [
        { Mã_món: "M101", Tên_món: "Đậu hũ ba sa", Số_lượng: "1" },
        { Mã_món: "M102", Tên_món: "Cá kho tộ", Số_lượng: "21" },
        { Mã_món: "M103", Tên_món: "Cá lóc canh chua", Số_lượng: "344" },
        { Mã_món: "M104", Tên_món: "Đậu hũ ba sa", Số_lượng: "5" },
        { Mã_món: "M105", Tên_món: "Đậu  hũ ba sa", Số_lượng: "12312" },
      ],
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
