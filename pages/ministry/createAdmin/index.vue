<template>
  <div>
    <v-form onsubmit="member">
      <v-card max-width="500px" class="mx-auto mt-16" elevation="0">
        <v-card-title>
          <v-avatar class="mr-3 pa-1" size="40" color="teal">
            <v-icon class="white">mdi-account</v-icon>
          </v-avatar>
          ເພີ່ມ admin</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="user.username"
                label="ຊື່"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="user.password"
                label="ລະຫັດຜ່ານ"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="$router.back()"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="member()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
export default {
  layout: "Black",
  data() {
    return {
      user: {},
      loading: false,
      admin_id: this.$cookies.get("userId"),
      title: this.$cookies.get("title"),
      role: this.$cookies.get("role"),
      profile : this.$cookies.get("profile")
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    async member() {
      try {
        if (!this.user.username || !this.user.password) {
          return this.$toast.error("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ");
        }
        const data = {
          username: this.user.username,
            password: this.user.password,
            role: this.role,
            title: this.title,
            admin_id: this.admin_id,
            profile:this.profile,
          
          };
        console.log(data);
        await this.$axios.post("/create-admin", data).then((res) => {
          this.$toast.success("ສຳເລັດ");
          this.$router.back();
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
