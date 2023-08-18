<template>
  <v-container fluid>
    <h1 class="mb-10">ຂໍ້ມູນຂອງກະຊວງ</h1>

    <v-row>
      <v-col v-for="data in ministry" :key="data.id" cols="6" md="3">
        <v-card @click="moveDepartment(data.id)">
          <v-img src="/card.png" alt="alt">
         <v-card-text>
              <v-avatar size="150" color="white" class="ml-4">
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
    <h1 class="my-10">ຂໍ້ມູນອົງການທຽບເທົ່າກະຊວງ</h1>

<v-row>
  <v-col v-for="data in ministry2" :key="data.id" cols="6" md="3">
    <v-card max-width="400px" @click="moveDepartment(data.id)">
      <v-img src="/card.png" alt="alt">
     <v-card-text>
          <v-avatar size="150" color="white" class="ml-4" >
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
      ministry2:[]
    };
  },
  mounted() {
    this.getData()
  },
  computed: {
   
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
    data.ministry_title !== "ທະນາຄານແຫ່ງສປປລາວ" &&
    data.ministry_title !== "ອົງການກວດກາລັດຖະບານ" &&
    data.ministry_title !== "ຫ້ອງວ່າການລັດຖະບານ"
);
          // console.log(filterData);
              this.ministry = filterData
              const filterData2 = data.filter(
  (data) =>
    data.ministry_title === "ທະນາຄານແຫ່ງສປປລາວ" ||
    data.ministry_title === "ອົງການກວດກາລັດຖະບານ" ||
    data.ministry_title === "ຫ້ອງວ່າການລັດຖະບານ"
);
          this.ministry2 = filterData2
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
