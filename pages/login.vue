<template>
  <!-- id="backgrond-image" -->
  <div >
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
          <v-img src="data:image/png;base64,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"></v-img>
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
      if (!this.user.user_name || !this.user.password) {
        return this.$toast.error('ປ້ອນຊື່ ແລະ ລະຫັດຜ່ານ')
      }
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
