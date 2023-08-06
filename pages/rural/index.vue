<template>
  <v-container fluid>
    <h1 class="my-10">ຂໍ້ມູນຂອງແຂວງ</h1>
    <v-row>
      <v-col v-for="data in province.rows" :key="data.id" cols="6" md="3">
        <v-card max-width="400px" @click="moveDepartment(data.id)">
          <v-img src="/card.png" alt="alt">
          <v-card-title>

            <v-avatar size="150" color="white" class="ml-8">
              <v-img
              class="z-index:999999999999999999999"
                :src="data.profile"
                alt="ministry-image"
                lazy-src="/loading.gif"
                style="object-fit: fill;"
              ></v-img>
            </v-avatar>
          </v-card-title>
          </v-img>
          <!-- <v-card-text > </v-card-text> -->
          <v-card-text
            class="black--text d-flex justify-center py-5"
            style="font-weight: bold; font-size: 16px"
          >
            {{ data.province_title }}
          </v-card-text>
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
      images: "",
      image: "",
      province_title: "",
      role:this.$cookies.get("role"),
      expanded: [],
      singleExpand: false,
      dialog: false,
    };
  },
  mounted() {
    this.$store.dispatch("province/getProvince");
    this.$store.dispatch("province/getAllProvince");
  },
  computed: {
    province() {
      return this.$store.state.province.province;
    },
    chooseProvince() {
      return this.$store.state.province.address;
    },
    loading() {
      return this.$store.state.province.loading;
    },
  },
  methods: {
    async createProvince() {
      const object = {
        profile: this.images,
        province: this.province_title,
      };
      // console.log(object);
      await this.$store.dispatch("province/createProvince", { ...object });
      this.$store.dispatch("province/getProvince");
      this.dialog = false;
    },
    moveDepartment(id) {
      this.$router.push(`/rural/department/${id}`);
      // console.log("id--->", id);
    },
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

<style>
.fixed-avatar {
  z-index: 999999999999;
}
</style>
