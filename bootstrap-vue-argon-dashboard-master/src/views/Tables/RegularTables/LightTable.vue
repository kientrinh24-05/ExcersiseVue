<template>
  <div>
    <b-card no-body>
      <div>
        <b-table class="table-sc" striped hover :items="items" :fields="fields">
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
                <b-form-group id="input-group-1" label="Tên Sản Phẩm" label-for="input-1">
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
                    v-model="file"
                    :state="Boolean(file)"
                    placeholder="Chọn địa chỉ hình ảnh..."
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                </b-form-group>
                <b-form-group id="input-group-3" label="Phân Loại" label-for="input-3">
                  <b-form-select id="input-3" :options="foods" required></b-form-select>
                </b-form-group>

                <!-- Button Click Submit -->
                <div class="link-btn">
                  <b-button type="submit" variant="primary">Xác Nhận</b-button>
                  <b-button type="reset" variant="danger">Làm Mới</b-button>
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

  <!-- Info modal -->
</template>
<script>
import projects from "./../projects";
import { Table, TableColumn } from "element-ui";
import DarkTable from "./DarkTable.vue";
export default {
  name: "light-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    DarkTable,
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
      items: [
        {
          isActive: true,
          mã_món_ăn: 1,
          tên_món_ăn: "Gạo Tẻ",
          phân_loại: "Gạo",
          giá_sản_phẩm: "200000",
        },
        {
          isActive: true,
          mã_món_ăn: 2,
          tên_món_ăn: "Nước Suối",
          phân_loại: "Nước",
          giá_sản_phẩm: "100000",
        },
        {
          isActive: true,
          mã_món_ăn: 3,
          tên_món_ăn: "Cam Sành",
          phân_loại: "Trái Cây",
          giá_sản_phẩm: "1122",
        },
      ],
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      show: true,
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
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
<style scoped>
.table-sc {
  text-align: center;
}
.fa-pencil-alt {
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}
.item-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.link-btn {
  text-align: center;
}
.modal-content {
  width: 120% !important;
}
</style>
