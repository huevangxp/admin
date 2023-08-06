<template>
  <div id="backgrond-image">
    <v-card class="mx-auto my-5 mt-10" style="opacity: 0.9;" max-width="400" elevation="10">
      <template slot="progress"> 
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <div class="d-flex justify-center pt-3">
        <v-avatar size="100">
          <v-img src="https://wallpaperaccess.com/full/4593828.jpg"></v-img>
        </v-avatar>
      </div>

      <v-card-title class="d-flex justify-center"
        >ເຂົ້າສູ່ລະບົບ</v-card-title
      >
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            type="text"
            v-model="user.user_name"
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
            outlined
            dense
            label="ຊື່ຜູ້ໃຊ້"
          >
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-account-key</v-icon>
            </template>
          </v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
            outlined
            dense
            label="ລະຫັດຜ່ານ"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
          >
            <!-- :rules="[rules.required, rules.min] -->
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-key-plus </v-icon>
            </template>
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            block
            :loading="loading"
            @click="login()"
            class="mb-10"
          >
            ເຂົ້າສູ່ລະບົບ
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "Black",
  name: "LoginPage",
  middleware: "unAuth",
  data() {
    return {
      show: false,
      user: {
        user_name: "huevang",
        password: "huevang",
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.auth.loading;
    },
  },
  methods: {
    login() {
      this.$store.dispatch("auth/isLogin", { ...this.user });
    },
  },
};
</script>

<style scoped>
#backgrond-image {
  background: url("https://wallpaperaccess.com/full/1739043.jpg") no-repeat
    center center fixed !important;
  background-size: cover;
  width: 100%;
  height: 100vh;
}
</style>
