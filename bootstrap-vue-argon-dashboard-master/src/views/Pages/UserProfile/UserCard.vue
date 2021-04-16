<template>
  <b-row class="justify-content-center">
    <b-col lg="3" class="order-lg-2">
      <div class="card-profile-image">
        <a href="#">
          <b-img :src="'http://127.0.0.1:8000' + image" rounded="circle" />
        </a>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      image: null,
    };
  },
  created() {
    var isUser = JSON.parse(localStorage.getItem("auth"));

    if (isUser) {
      this.ShowProfile(isUser.username);
    }
  },
  methods: {
    ShowProfile(name) {
      axios
        .get(`http://127.0.0.1:8000/auth/change_profile/` + name)
        .then((res) => res.data)
        .then((response) => {
          const { data } = response;

          this.image = data.avatar;
        });
    },
  },
};
</script>
<style></style>
