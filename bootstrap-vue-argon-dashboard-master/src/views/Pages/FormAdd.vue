<template>
          <div class="">
                          <div class="col-xs-2">
                            <button
                              type="button"
                              v-on:click="removeApartment(index)"
                              class="btn btn-danger"
                              style="margin: 10px 0"
                            >
                              Rem -
                            </button>
                          </div>
                          
                          <div class="form-group">
                            <b-form-input
                              id="input-1"
                              v-model="meterial.tennl"
                              placeholder="Nhập tên nguyên liệu"
                              name="meterials[][tennl]"
                              required
                            ></b-form-input>
                          </div>
                          <div class="form-group col-xs-5">
                            <b-form-input
                              v-model="meterial.nhacc"
                              type="text"
                              name="meterials[][nhacc]"
                              class="form-control"
                              placeholder="Nhập nhà phân phối"
                            ></b-form-input>
                          </div>
                          <div class="form-group col-xs-5">
                            <b-form-input
                              v-model="meterial.soluong"
                              type="text"
                              name="meterials[][soluong]"
                              class="form-control"
                              placeholder="Nhập số lượng"
                            ></b-form-input>
                          </div>
                          <div class="form-group col-xs-5">
                            <input
                              class="form-control"
                              type="datetime-local"
                              value="2011-08-19T13:45:00"
                              name="meterials[][ngaynhap]"
                              id="example-datetime-local-input"
                              v-model="meterial.ngaynhap"
                            />
                          </div>
                        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>