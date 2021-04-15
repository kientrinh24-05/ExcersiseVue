<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7"></div>
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
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8">
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <h2 class="title">ĐĂNG KÝ</h2>
              <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-hat-3"
                    placeholder="Tên đăng nhập"
                    name="Name"
                    :rules="{ required: true }"
                    v-model="model.username"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    name="Email"
                    :rules="{ required: true, email: true }"
                    v-model="model.email"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="Mật khẩu"
                    type="password"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    v-model="model.password"
                  >
                  </base-input>
                  <base-input
                    alternative
                    class="mb-4"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="  Nhập lại mật khẩu"
                    type="password"
                    name="ConformPassword"
                    :rules="{ required: true, min: 6 }"
                    v-model="model.confirm_password"
                  >
                  </base-input>

                  <b-row class="my-4">
                    <b-col cols="12">
                      <b-form-checkbox
                        v-model="model.is_staff"
                        name="check-button"
                        switch
                      >
                        Admin
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4"
                      >Đăng Ký</b-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      model: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        is_staff: false,
      },
    };
  },
  methods: {
    onSubmit() {
      // this will be called only after form is valid. You can do an api call here to register users
      const data = {
        username: this.model.username,
        email: this.model.email,
        password: this.model.password,
        confirm_password: this.model.confirm_password,
        is_staff: this.model.is_staff,
      };

      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/usermanger"))
        .catch((err) => console.log(err));
      //  axios.post(`http://127.0.0.1:8000/auth/register/`,data)
      //  .then(res =>{
      //     console.log(res);
      //      this.$router.push('/login')
      //  }).catch(err =>{
      //    console.log(err);
      //  })
    },
  },
};
</script>
<style>
.title {
  text-align: center;
  font-size: 1.5rem;
}
</style>
