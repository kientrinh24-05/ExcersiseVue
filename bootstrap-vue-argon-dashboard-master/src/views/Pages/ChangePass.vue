<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5"> </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4"></div>
              <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(update)">
                  <base-input
                    ase-input
                    alternative
                    class="mb-3"
                    type="password"
                    name="password_old"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="fa fa-user"
                    placeholder="Mật Khẩu Cũ"
                    v-model="user.password_old"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Mật Khẩu Mới"
                    v-model="user.password"
                  >
                  </base-input>
                  <base-input
                    alternative
                    class="mb-3"
                    name="confirm_password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Nhập lại mật khẩu  "
                    v-model="user.confirm_password"
                  >
                  </base-input>

                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4"
                      >Xác Nhận</base-button
                    >
                    <base-button type="primary" class="my-4">Hủy Bỏ</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"
                ><small>Trang Chủ</small></router-link
              >
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"
                ><small>Đăng ký tài khoản</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
var isUser = localStorage.getItem("username");
export default {
  data() {
    return {
      user: {
        username: isUser,
        password: "",
        password_old: "",
        confirm_password: "",
      },
    };
  },
  created() {
    // var isUser = localStorage.getItem("username");
    // console.log(isUser);
    // if (isUser) {
    //   this.update();
    // }
  },
  methods: {
    // ShowPasss() {
    //   axios
    //     .get(`http://127.0.0.1:8000/auth/change_pass/`)
    //     .then((res) => res.data)
    //     .then((response) => {
    //       const { data } = response;

    //       this.user.username = data.username;
    //       this.user.password_old = data.password_old;
    //       this.user.password = data.password;
    //       this.user.confirm_password = data.confirm_password;

    //       console.log(response);
    //     });
    // },
    update() {
      var thisUser = localStorage.getItem("username");

      axios.put(`http://127.0.0.1:8000/auth/change_pass/`, this.user, {}).then((res) => {
        // Errrr
        console.log(res, "res");
        if (res.data.status_code[0] == 200) {
          this.$toaster.success("Đổi mật khẩu thành công");
          this.$router.push("/dashboard");
          return;
        }
        if (res.data.status_code[0] == 400) {
          this.$toaster.success("Đổi mật khẩu fail");
          return;
        }

        // console.log(this.user.password_old);
        // console.log(this.user.password);
        // console.log(this.user.confirm_password);
        // console.log(res.data);
        // console.log(res.data.message);

        // console.log(res.data.message);

        // if(res.status_code === 400) {
        //   return

        // }
        ///tod show loi
      });
      // .catch((err) => {
      //   // this.$refs.editSupModal.hide();
      //   // this.ShowProfile(thisUser);
      //   this.$toaster.error("Đổi mật khẩu thất bại");
      //   console.log(err, "res");
      // });
    },
    onSubmit() {
      // this will be called only after form is valid. You can do api call here to login
    },
  },
};
</script>
