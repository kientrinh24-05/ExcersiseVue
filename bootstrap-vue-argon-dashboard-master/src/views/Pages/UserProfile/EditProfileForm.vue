<template>
  <card>
    <b-row align-v="center" slot="header">
      <b-col cols="8">
        <h3 class="mb-0">Thông tin</h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <a href="#!" class="btn btn-sm btn-primary">Cài đặt</a>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">Thông tin người dùng</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
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
            <base-input type="text" label="Họ" placeholder="Họ" v-model="user.firstName">
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input type="text" label="Tên" placeholder="Tên" v-model="user.lastName">
            </base-input>
          </b-col>
        </b-row>
      </div>
      <hr class="my-4" />

      <!-- Address -->
      <h6 class="heading-small text-muted mb-4">Thông tin liên lạc</h6>

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
          </b-col>
        </b-row>
      </div>

      <hr class="my-4" />
      <!-- Description -->
    </b-form>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        company: "Creative Code Inc.",
        username: "michael23",
        email: "",
        firstName: "Mike",
        lastName: "Andrew",
        address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
        city: "New York",
        country: "USA",
        postalCode: "",
        aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`,
      },
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    },
  },
};
</script>
<style></style>
