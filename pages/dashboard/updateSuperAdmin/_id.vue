<template>
  <div>
    <v-card max-width="800" elevation="0" class="mx-auto">
      <v-card-title elevation="3" class=""> ສ້າງສະມາຊິກ </v-card-title>
      <v-divider></v-divider>
      <v-card-title class="d-flex justify-center">
        <v-card-text class="d-none">
          <v-file-input
            id="picture"
            v-model="user.images"
            @change="uploadImage"
          ></v-file-input>
        </v-card-text>
        <v-avatar size="150" v-if="image">
          <v-img v-if="loading" src="/loading.gif" alt="profile"></v-img>
          <v-img v-else :src="image" alt="profile"></v-img>
        </v-avatar>
        <v-avatar size="150" color="primary" @click="getImage" v-else>
            <v-img :src="user.profile" alt="profile"></v-img>
        </v-avatar>
      </v-card-title>
      <v-card-text class="pt-2">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.name"
              placeholder="ຊື່"
              outlined
              hide-details="auto"
              :rules="[(v) => !!v || '']"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.last_name"
              placeholder="ນາມສະກຸນ"
              outlined
              hide-details="auto"
              :rules="[(v) => !!v || '']"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.phone"
              placeholder="ເບີ"
              outlined
              hide-details="auto"
              :rules="[(v) => !!v || '']"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.email"
              placeholder="ອີເມວ"
              outlined
              hide-details="auto"
              :rules="[(v) => !!v || '']"
              dense
            ></v-text-field>
          </v-col>
        
          <v-col cols="12" md="6">
            <v-select
              :items="items"
              v-model="user.role"
              :rules="[(v) => !!v || '']"
              outlined
              dense
              hide-details="auto"
              label="ສິບ"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.position"
              :rules="[(v) => !!v || '']"
              hide-details="auto"
              placeholder="ຕຳແໜ່ງ"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              placeholder="ລະຫັດຜ່ານ"
              outlined
              hide-details="auto"
              dense
              :rules="[(v) => !!v || '']"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" outlined @click="$router.back()">ຍົກເລິກ</v-btn>
        <v-btn color="primary white--text" @click="updateAdmin()">ບັນທຶກ</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "Black",
  data() {
    return {
      image: "",
      userId: "",
      images: "",
      loading: false,
      imageUrl: "",
        user: {},
      password:'',
      items: [
        { id: 1, text: "super_admin" },
        { id: 1, text: "ministry_admin" },
        { id: 1, text: "rural_admin" },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.$axios.get(`/user/${this.id}`).then((res) => {
    //   console.log(res.data);
      this.user = res?.data;
    });
  },
  methods: {
    async uploadImage(e) {
      this.loading = true;
      this.url = URL.createObjectURL(e);
      this.image = this.url;
      const formData = new FormData();
      formData.append("file", this.images);
      await this.$axios.post("upload", formData).then((res) => {
        this.loading = false;
        this.imageUrl = res.data.url;
      });
    },
    getImage() {
      document.getElementById("picture").click();
      },
      updateAdmin() {
        try {
            const data = {
                profile: this.imageUrl == '' ? this.user.profile : this.imageUrl,
                name: this.user.name,
                last_name: this.user.last_name,
                phone: this.user.phone,
                email: this.user.email,
                role: this.user.role,
                password: this.password
            }
            // console.log(data);
            this.$axios.put(`/user/${this.id}`, data)
                .then((res) => {
                    console.log(res?.data);
                    this.$router.back();
                    this.$toast.success('ສຳເລັດ')
            })
        } catch (error) {
            console.log(error);
        }
      }
  },
};
</script>
