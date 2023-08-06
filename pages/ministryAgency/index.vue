<template>
  <v-container fluid>
    <h1 class="mb-10">ຂໍ້ມູນອົງການທຽບເທົ່າກະຊວງ</h1>

    <v-row>
      <v-col v-for="data in ministry" :key="data.id" cols="6" md="3">
        <v-card max-width="400px" @click="moveDepartment(data.id)">
          <v-img src="/card.png" alt="alt">
         <v-card-text>
              <v-avatar size="150" color="white" class="ml-6" >
              <v-img
                :src="data.profile"
                alt="ministry-image"
                lazy-src="/loading.gif"
                style="object-fit: fill;"
              ></v-img>
            </v-avatar>
         </v-card-text>
          </v-img>
          <v-card-text style="height: 5px"> </v-card-text>
          <v-card-text
            class="black--text d-flex justify-center mb-5"
            style="font-weight: bold; font-size: 16px"
          >
            {{ data.ministry_title }}
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="primary white--text"> ສ້າງກະຊວງ </v-card-title>
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
          <v-text-field
            v-model="ministry_title"
            class="mt-10"
            placeholder="ຊື່ກະຊວງ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="dialog = false"> ຍົກເລີກ </v-btn>
          <v-btn color="primary" dark @click="createMinistries()">
            ບັກທືນ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "InspirePage",
  data() {
    return {
      search: "",
      dialog: false,
      image: "",
      images: "",
      ministry: [],
    };
  },
  mounted() {
    this.getData()
  },
   
    methods: {
      moveDepartment(id) {
      this.$router.push(`/ministry/department/${id}`);
    },
    getData(){
       this.$axios.get('/ministryData')
            .then((res) => {
              const data = res?.data.rows
          
         const filterData = data.filter(
  (data) =>
    data.ministry_title === "ທະນາຄານແຫ່ງສປປລາວ" ||
    data.ministry_title === "ອົງການກວດກາລັດຖະບານ" ||
    data.ministry_title === "ຫ້ອງວ່າການລັດຖະບານ"
);
          console.log(filterData);
          this.ministry = filterData
        })
  },
  },
  };
  
</script>

<style>
.fixed-avatar {
  position: fixed;
  z-index: 888;
}
</style>
