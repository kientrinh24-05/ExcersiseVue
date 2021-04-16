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
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Username"
                    :rules="{ required: true }"
                    prepend-icon="fa fa-user"
                    placeholder="Tài đăng nhập"
                    v-model="model.username"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Mật Khẩu"
                    v-model="model.password"
                  >
                  </base-input>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4"
                      >Đăng nhập</base-button
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
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // this will be called only after form is valid. You can do api call here to login

      // const data = {
      //   username: this.model.username,
      //   password: this.model.password,
      // };
      // axios
      //   .post("http://127.0.0.1:8000/auth/login/", data)
      //   .then((response) => {
      //     console.log(response);
      //       localStorage.setItem('token',response.data.token),
      //          localStorage.setItem('username',response.data.username)
      //      this.$router.push('/dashboard')

      //  // axios.defaults.headers.common['Authorization'] = token

      //   })
      //   .catch((err) => {
      //     console.log(err);
      // window.alert("Nhập sai tk")
      //   });

      let username = this.model.username;
      let password = this.model.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/dashboard"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
