<template>
  <div>
    <v-form onsubmit="member">
      <v-card max-width="800px" class="mx-auto" elevation="0">
        <v-card-title>
          <v-avatar class="mr-3 pa-1" size="40" color="teal">
            <v-icon class="white">mdi-account-edit</v-icon>
          </v-avatar>
          ສ້າງພະນັກງານ</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="d-none">
          <v-file-input
            id="picture"
            v-model="images"
            @change="uploadImage"
          ></v-file-input>
        </v-card-text>
        <div class="d-flex justify-center my-5">
          <v-avatar size="150" v-if="image" @click="getImage">
            <v-img :src="image" alt="profile"></v-img>
          </v-avatar>
          <v-avatar size="150" color="primary" @click="getImage" v-else>
            <v-img :src="user.profile" alt="profile"></v-img>
            <!-- <v-icon size="70" color="white">mdi-file-image-plus-outline</v-icon> -->
          </v-avatar>
        </div>
        <v-card-text class="mt-3">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.name"
                label="ຊື່"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.last_name"
                label="ນາມສະກຸ່ມ"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.phone"
                label="ເບີໂທ"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.position"
                label="ຕຳແໜງ"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="user.address"
                label="ທີ່ຢູ່"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="user.details"
                counter="50"
                label="ປະຫັວດຫຍໍ້"
                outlined
                dense
                hide-details="auto"
                :rules="[(v) => !!v || 'ຈຳເປັນ']"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="$router.back()"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updateData()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
export default {
  layout:'Black',
  data() {
    return {
      user: {},
      images: "",
      image: "",
      imageUrl: "",
      loading: false,
    };
  },
  mounted() {
    this.$axios.get(`/get-unit-one/${this.id}`).then((res) => {
      this.user = res?.data[0];
    });
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    async uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
      const formData = new FormData();
      formData.append("file", this.images);
      await this.$axios.post("upload", formData).then((res) => {
        console.log(res.data.url);
        this.imageUrl = res.data.url;
      });
    },
    getImage() {
      document.getElementById("picture").click();
    },
    async updateData() {
      try {
        const data = {
          profile: this.imageUrl == '' ? this.user.profile : this.imageUrl,
          name: this.user.name,
          last_name: this.user.last_name,
          phone: this.user.phone,
          position: this.user.position,
          address: this.user.address,
          details: this.user.details,
        };
        console.log(data);
        await this.$axios
          .put(`/update-unit-member/${this.id}`, data)
          .then((res) => {
            this.$toast.success("ສຳເລັດ");
            this.$router.back();
            this.loading = false;
          });
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
};
</script>
