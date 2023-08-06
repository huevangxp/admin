<template>
  <div>
    <div class="font-weight-bold mb-3" style="font-size: 30px">ການລາຍງານ</div>
    <v-row dense>
      <v-col v-for="item in lists" :key="item.title" cols="12" md="4">
        <v-card
          hover
          shaped
          raised
          class="white"
          @click="$router.push(item.to)"
          height="150px"
        >
          <v-card-text>
            <div
              class="font-weight-bold d-flex align-center"
              style="font-size: 20px"
            >
              <v-btn color="#02735E" fab small elevation="0">
                <v-icon v-if="item.icon" color="white">
                  {{ item.icon }}
                </v-icon>
              </v-btn>

              <span class="#034159--text text-center mx-4" style="opacity: 0.9">
                {{ item.title }}</span
              >
            </div>
            <div class="grey--text text-center text--lighten-1 ml-10 my-4">
              ເຂົ້າເບີ່ງລາຍລະອຽດ
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "ReportsRuralMinstryPage",
  data() {
    return {
      lists: [
        {
          title: "ຂໍ້ມູນຂອງຂະແໜງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-file-import",
          to: "/reports/rural/sector",
        },
        {
          title: "ຂໍ້ມູນພະນັກງານຂອງຂະແໜງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-file-import",
          to: "/reports/rural/sectorEm",
        },
        // {
        //   title: "ຂໍ້ມູນເມືອງ",
        //   src: "https://picsum.photos/400/400",
        //   icon: "mdi-file-export",
        //   to: "/reports/rural/city",
        // },
        {
          title: "ຂໍ້ມູນຫ້ອງການເມືອງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-file-export",
          to: "/reports/rural/office",
        },
        {
          title: "ຂໍ້ມູນພະນັກງານຂອງຫ້ອງການເມືອງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-file-export",
          to: "/reports/rural/officeEm",
        },
        {
          title: "ຂໍ້ມູນໜ່ວຍງານ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-file-export",
          to: "/reports/rural/unit",
        },
        {
          title: "ຂໍ້ມູນພະນັກງານຂອງໜ່ວຍງານ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-file-export",
          to: "/reports/rural/unitEm",
        },
      ],
    };
  },
};
</script>
