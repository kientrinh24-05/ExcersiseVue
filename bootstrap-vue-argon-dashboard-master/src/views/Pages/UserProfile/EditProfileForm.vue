<template>
  <card>
    <b-row align-v="center" slot="header">
      <b-col cols="8">
        <h3 class="mb-0">Thông tin</h3>
      </b-col>
    </b-row>

    <b-form @submit.prevent="update">
      <h6 class="heading-small text-muted mb-4">Thông tin người dùng</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              disabled
              label="Tên đăng nhập"
              placeholder="Tên đăng nhập"
              v-model="user.username"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="email"
              label="Địa chỉ email"
              placeholder="mike@email.com"
              v-model="user.email"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <base-input type="text" label="Họ" placeholder="Họ" v-model="user.first_name">
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Tên"
              placeholder="Tên"
              v-model="user.last_name"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>

      <!-- Address -->

      <div class="pl-lg-4">
        <b-row>
          <b-col md="12">
            <base-input
              type="text"
              label="Địa chỉ"
              placeholder="Địa chỉ"
              v-model="user.address"
            >
            </base-input>

            <b-form-group id="input-group-2" label="Hình Ảnh">
              <b-form-file
                placeholder="Chọn địa chỉ hình ảnh..."
                drop-placeholder="Drop file here..."
                v-model="user.avt"
                type="file"
                accept=".jpg, .png, .gif"
              ></b-form-file>
            </b-form-group>

            <!-- <base-input type="file" label="Avatar" v-model="user.avt"> </base-input> -->
          </b-col>
          <b-button type="submit" variant="success">Cập Nhật</b-button>
          <b-button variant="primary">Hủy Bỏ</b-button>
        </b-row>
      </div>

      <hr class="my-4" />

      <!-- Description -->
    </b-form>
  </card>
</template>
<script>
import axios from "axios";
var thisUser;
export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        address: "",
        avt: null,
      },
      image: null,
      // isUser = localStorage.getItem("username"),
    };
  },
  created() {
    var isUser = JSON.parse(localStorage.getItem("auth"));

    if (isUser) {
      this.ShowProfile(isUser.username);
    }
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    },
    ShowProfile(name) {
      axios
        .get(`http://127.0.0.1:8000/auth/change_profile/` + name)
        .then((res) => res.data)
        .then((response) => {
          const { data } = response;

          this.user.username = data.username;
          this.user.email = data.email;
          this.user.first_name = data.first_name;
          this.user.last_name = data.last_name;
          this.user.address = data.address;
          this.image = data.avatar;
          // this.user.avt = "http://127.0.0.1:8000" + data.avatar;
        });
    },

    update() {
      thisUser = JSON.parse(localStorage.getItem("auth"));

      let formData = new FormData();

      formData.append("username", this.user.username);
      formData.append("email", this.user.email);
      formData.append("first_name", this.user.first_name);
      formData.append("last_name", this.user.last_name);
      formData.append("address", this.user.address);
      if (this.user.avt != null) {
        formData.append("avatar", this.user.avt);
      }
      axios
        .put(
          `http://127.0.0.1:8000/auth/change_profile/` + thisUser.username,
          formData,
          {}
        )
        .then((res) => {
          if (res.data.status_code == 400 || res.data.status_code == 404) {
            this.$toaster.error("Cập nhật không thành công");
          } else {
            this.$toaster.success("Cập nhật thông tin thành công");
          }
        })
        .catch((err) => {
          // this.$refs.editSupModal.hide();
          // this.ShowProfile(thisUser);
          this.$toaster.error("Cập nhật thông tin thất bại");
        });
    },
  },
};
</script>
<style></style>
