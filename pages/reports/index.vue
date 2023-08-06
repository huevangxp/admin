<template>
  <div>
    <div class="font-weight-bold my-10 ml-3" style="font-size: 30px"> <v-btn color="primary" small fab><v-icon size="20" color="white">mdi-account-multiple</v-icon></v-btn> ລາຍງານຂອງຜູ້ບໍລິຫານ</div>
    <v-row dense>
      <v-col v-for="item in lists" :key="item.title" cols="6" sm="4" md="4">
        <v-card
          hover
          shaped
          raised
          class="white ma-3"
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
    <div class="font-weight-bold  my-10 ml-3" style="font-size: 30px">
        <v-btn color="primary" small fab><v-icon size="20" color="white">mdi-align-horizontal-center</v-icon></v-btn>
        ລາຍງານຂັ້ນສູນກາງ</div>
    <v-row dense>
      <v-col v-for="item in ministryItems" :key="item.title" cols="6" sm="4" md="4">
        <v-card
          hover
          shaped
          raised
          class="white ma-3"
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
    <div class="font-weight-bold  my-10 ml-3" style="font-size: 30px">
        <v-btn color="primary" small fab><v-icon size="20" color="white" class="pa-2">mdi-home-city</v-icon></v-btn>

        ລາຍງານຂັ້ນທ້ອງຖີ່ນ</div>
    <v-row dense>
      <v-col v-for="item in ruralItems" :key="item.title" cols="6" sm="4" md="4">
        <v-card
          hover
          shaped
          raised
          class="white ma-3"
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
  name: "Reports",
  data() {
    return {
      lists: [
        {
          title: "ຂໍ້ມູນຜູ້ບໍລີຫານສູງສຸດຂອງລະບົບ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-account",
          to: "/reports/admin",
        },
        {
          title: "ຂໍ້ມູນຜູ້ບໍລິຫານສູນກາງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-account-multiple",
          to: "/reports/ministryData",
        },
        {
          title: "ຂໍ້ມູນຜູ້ບໍລິຫານທ້ອງຖີ່ນ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-account-multiple",
          to: "/reports/adminRural",
        },
      ],
      ministryItems: [
        {
          title: "ຂໍ້ມູນກະຊວງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-bank",
          to: "/reports/ministryOfData",
        },
        {
          title: "ຂໍ້ມູນກົມຈັດຕັ້ງຂອງກະຊວງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-file-import",
          to: "/reports/reportDO",
        },
        {
          title: "ຂໍ້ມູນພະນັກງານຂອງກົມ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-file-export",
          to: "/reports/reportDOEm",
        },
        {
          title: "ຂໍ້ມູນພະແນກ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-file-rotate-left-outline",
          to: "/reports/departmentData",
        },
        {
          title: "ຂໍ້ມູນພະນັກງານຂອງພະແນກ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-cash-multiple",
          to: "/reports/departmentEm",
        },
      ],
      ruralItems: [
        {
          title: "ຂໍ້ມູນຂັ້ນທ້ອງຖີ້ມ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-cash-minus",
          to: "/reports/ruralData",
        },
        {
          title: "ຂໍ້ມູນຂະແໜງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-alert",
          to: "/reports/sectorData",
        },
        {
          title: "ຂໍ້ມູນພະນັກງານຂະແໜງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-alert",
          to: "/reports/reportSectorEm",
        },
        {
          title: "ຂໍ້ມູນເມືອງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-alert",
          to: "/reports/reportCity",
        },
        {
          title: "ຂໍ້ມູນຫ້ອງການເມືອງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-alert",
          to: "/reports/reportOffice",
        },
        {
          title: "ຂໍ້ມູນພະນັກງານຫ້ອງການເມືອງ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-alert",
          to: "/reports/reportOfficeEm",
        },
        {
          title: "ຂໍ້ມູນໜ່ວຍງານ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-alert",
          to: "/reports/reportUnit",
        },
        {
          title: "ຂໍ້ມູນພະນັກງານໜ່ວຍງານ",
          src: "https://picsum.photos/400/400",
          icon: "mdi-alert",
          to: "/reports/reportUnitEm",
        },
      ],
    };
  },
};
</script>
