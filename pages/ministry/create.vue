<template>
  <v-container fluid>
    <v-card max-width="500px" class="mx-auto" elevation="10">
      <v-card-title class="primary white--text">
        ສ້າງພະນັກງານຂອງກະຊວງ
      </v-card-title>
      <v-card-title class="d-flex justify-center">
        <v-card-text class="d-none">
          <v-file-input
            id="picture"
            v-model="images"
            @change="uploadImage"
          ></v-file-input>
        </v-card-text>
        <v-avatar size="150" v-if="image">
          <v-img :src="image" alt="profile"></v-img>
        </v-avatar>
        <v-avatar size="150" color="primary" @click="getImage" v-else>
          <v-icon size="70" color="white">mdi-file-image-plus-outline</v-icon>
        </v-avatar>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              hide-details="auto"
              v-model="user.username"
              placeholder="ຊື່ຂອງພະນັກງານ"
              dense
              outlined
              :rules="[
                (v) => !!v || 'ກະລຸນາປ້ອນຊື່ຂອງພະນັກງານ',
                // (v) => v && v.length >= 3 || 'ຊື່ຂອງພະນັກງານຕ້ອງຢ່າງໜ້ອຍ 3 ຕົວອັກສອນຂຶ້ນ'
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              hide-details="auto"
              v-model="user.position"
              placeholder="ຕຳແໜ່ງ"
              dense
              outlined
              :rules="[
                (v) => !!v || 'ກະລຸນາປ້ອນຕຳແໜ່ງ'
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              hide-details="auto"
              v-model="user.workYears"
              placeholder="ສະໄໝ"
              dense
              outlined
              :rules="[
                (v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນສະໄໝ'
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <DataPicker v-model="user.startYear"/>
          </v-col>
          <v-col cols="12" md="6">
            <DataPicker v-model="user.endYear"/>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions color="primary">
        <v-spacer></v-spacer>
        <v-btn color="red" outlined @click="$router.back()">ຍົກເລິກ</v-btn>
        <v-btn color="primary">ບັກທືນ</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      images: "",
      image: "",
      user: {
        username: "",
      },
    };
  },

  methods: {
    uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
    },
    getImage() {
      document.getElementById("picture").click();
    },
  },
};
</script>
