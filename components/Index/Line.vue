<template>
  <v-container fluid>
    <h1 class="pb-10">ຈັດການຂໍ້ມູນພື້ນຖານ</h1>
    <v-row>
      <v-col v-for="(item, index) in Lists" :key="index" cols="12" sm="4" md="4">
        <v-card :to="item?.to" shaped height="130">
          <v-card-text>
            <div
              class="font-weight-bold d-flex align-center"
              style="font-size: 20px"
            >
              <v-icon color="primary" size="30" style="opacity: 1" class="mr-4"
                >{{ item?.icon }}</v-icon
              >
              <span
                class="d-flex justify-center text-h6 font-weight-bold black--text"
              >
                <span class="ml-2">{{ item?.title }}</span>
              </span>
            </div>
            <div class="grey--text text--lighten-1 ml-10 my-4">
              ເຂົ້າເບີ່ງລາຍລະອຽດ
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      interval: {},
      value: 10,
      Lists: [
        {
          icon: "mdi-bank",
          title: "ຈັດການຂໍ້ມູນກະຊວງ ແລະ ອົງການທຽບເທົ່າ",
          to: "/dashboard/dataMinistry",
        },
        {
          icon: "mdi-home-city-outline",
          title: "ຈັດການຂໍ້ມູນແຂວງ ແລະ ພະແນກ",
          to: "/dashboard/dataRarul",
         
        },
        {
          icon: "mdi-account-multiple-plus",
          title: "ຈັດການຂໍ້ມູນພະນັກງານທີ່ປະກອບກົງຈັກ",
          to: "/dashboard/member",
         
        },
        {
          icon: "mdi-account",
          title: "ຈັດການຂໍ້ມູນສິດທິການໃຊ້ລະບົບ",
          to: "/dashboard/role",
        },
      ]
    };
  },
  computed: {
    province() {
      return this.$store.state.province.province;
    },
    ministry() {
      return this.$store.state.ministry.ministry;
    },
    admin() {
      return this.$store.state.user.admin;
    },
  },
  mounted() {
    this.$store.dispatch("ministry/getMinistry");
    this.$store.dispatch("province/getProvince");
    this.$store.dispatch("user/getAdmin");
  },
};
</script>
