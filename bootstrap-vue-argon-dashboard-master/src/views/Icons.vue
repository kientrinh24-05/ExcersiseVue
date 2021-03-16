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
            <!--  
              <h3 slot="header" class="mb-0">Tất cả bàn ăn</h3>
              <ul class="list_btn">
                <li class="btn_click">
                  <b-button v-b-modal="'my-modal'" variant="success"
                    ><i class="fas fa-plus"></i>Thêm bàn ăn</b-button
                  >
                  <b-modal id="my-modal">
                    <form action="">
                      <label class="" style="display: flex" for="">Mã bàn ăn</label>
                      <input
                        type="text"
                        placeholder="Nhập mã bàn ăn"
                        style="width: 100%"
                      />
                      <hr />
                      <div>
                        <b-dropdown
                          split
                          split-href="#foo/bar"
                          text="Trạng Thái"
                          class="m-2"
                        >
                          <b-dropdown-item href="#">Có người</b-dropdown-item>
                          <b-dropdown-item href="#">Trống</b-dropdown-item>
                          <b-dropdown-item href="#">Tạm ngưng hoạt động</b-dropdown-item>
                        </b-dropdown>
                      </div>
                    </form>
                  </b-modal>
                </li>
              </ul>
            </div> -->
            <div class="content_search">
              <b-form-input
                id="input-1"
                type="email"
                placeholder="Nhập mã bàn"
                required
              ></b-form-input>
              <b-dropdown
                text="Trạng thái"
                style="width: 90%"
                block
                split
                split-variant="outline-primary"
                variant="primary"
                class="m-2"
              >
                <b-dropdown-item href="#">Đã có người</b-dropdown-item>
                <b-dropdown-item href="#">Trống</b-dropdown-item>
                <b-dropdown-item href="#">Tạm ngưng hoạt động</b-dropdown-item>
              </b-dropdown>

              <b-button class="btn-search" variant="outline-primary"
                ><i class="fa fa-search" aria-hidden="true"></i
              ></b-button>
            </div>

            <b-row class="icon-examples">
              <b-col lg="3" md="6">
                <b-button v-b-modal.modal-1 class="btn-icon-clipboard sucses"
                  >101
                  <div>
                    <b-modal id="modal-1" size="lg" title="Thông tin bàn  ">
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
                    </b-modal>
                  </div>
                </b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard no-sucses">102 </b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard no-sucses"> 103 </b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard sucses">104</b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard sucses">105</b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard no-sucses">106</b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard no-sucses">107</b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard change">108</b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard change">109</b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard change">110</b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard change">111</b-button>
              </b-col>
              <b-col lg="3" md="6">
                <b-button class="btn-icon-clipboard change">112</b-button>
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

Vue.use(VueClipboard);
export default {
  name: "icons",
  data() {
    return {
      items: [
        { Mã_món: "M101", Tên_món: "Đậu hũ ba sa", Số_lượng: "1" },
        { Mã_món: "M102", Tên_món: "Cá kho tộ", Số_lượng: "2" },
        { Mã_món: "M103", Tên_món: "Cá lóc canh chua", Số_lượng: "344" },
        { Mã_món: "M104", Tên_món: "Đậu hũ ba sa", Số_lượng: "5" },
        { Mã_món: "M105", Tên_món: "Đậu hũ ba sa", Số_lượng: "12312" },
      ],
    };
  },
  components: {
    BaseHeader,
    LightTable,
  },
  methods: {
    onCopy() {
      this.$notify({
        type: "info",
        message: "Copied to clipboard",
      });
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
</style>
