<template>
    <div>
      <!-- <v-card class="d-flex justify-center"> -->
      <div class="d-flex justify-center mb-10">
        <img
          style="height: 100px; width: 100px; object-fit: cover"
          src="data:image/png;base64,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"
          alt="logo"
        />
      </div>
      <v-row>
        <v-col cols="3">
          <p class="font-weight-bold">ກະຊວງພາຍໃນ</p>
          <p class="font-weight-bold">ກົມພັດທະນາບໍລິຫານ</p>
        </v-col>
        <v-col cols="6">
          <div class="text-center">
            <p class="font-weight-bold">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</p>
            <p class="font-weight-bold">
              ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ
            </p>
          </div>
        </v-col>
        <v-col cols="3">
          <p class="font-weight-bold">ເລກທີ:............</p>
          <p class="font-weight-bold">
            ວັນທີ: {{ $moment(Date()).format("DD/MM/YYYY") }}
          </p>
        </v-col>
        <v-col cols="12">
          <div class="text-center">
            <span class="px-10 font-weight-bold">ສະຖິຕິກົງຈັກຕັ້ງຂ້ັນທ້ອງຖີ່ນ ຂະແໜງ</span>
            <span class="font-weight-bold"
              >ປີ: {{ $moment(Date()).format("YYYY") }}</span
            >
          </div>
        </v-col>
      </v-row>
      <!-- {{ listing }} -->
      <div class="my-5"></div>
      <!-- <template> -->
      <table width="100%" scrolling="0" class="bordered-table py-16">
        <!-- <template> -->
        <thead>
          <tr>
            <th>ລ/ດ</th>
            <th class="wider">ຊື່ຂະແໜງ</th>
            <th class="rotate">
              <div>ຈໍານວນຫົວໜ້າຂະແໜງ</div>
            </th>
            <th class="rotate">
              <div>ຈໍານວນຄະນະຂະແໜງ</div>
            </th>
          </tr>
        </thead>
        <tbody style="text-align: center">
          <tr v-for="(item, index) in listing" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.boss }}</td>
                <td>{{ item.subBoss }}</td>
              </tr>
          <tr>
            <td>ລວມ</td>
            <td> {{ allSector.length }} ຂະແໜງ </td>
                <td>{{ listing.reduce((sum, e) => sum + e.boss, 0) }} ຫົວໜ້າ</td>
                <td>{{ listing.reduce((sum, e) => sum + e.subBoss, 0) }} ຄະນະ</td>
          </tr>
        </tbody>
      </table>
  
      <v-row class="mt-16">
      <v-col cols="6"> </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn color="red" outlined @click="$router.back()" class="mx-2">ຍົກເລິກ</v-btn>
          <v-btn color="primary" @click="printData">ດາວໂຫຼດ</v-btn>
      </v-col>
    </v-row>
    </div>
  </template>
  <script>
  export default {
    layout:'Black',
    data() {
      return {
        pid: this.$cookies.get("pid"),
        id: this.$cookies.get("userId"),
        allSector: [],
        allEmployee: [],
      };
    },
    computed: {
      listing() {
        const list = this.allSector.map((el) => {
          const filteredSectors = this.allSector.filter((sector) => {
            return sector.id === el.id
          });
          // console.log("==============:", filteredSectors);
          const filterHeadFromAllEmployee = this.allEmployee.filter((e) => {
            if (e.position === "ຫົວໜ້າ") {
              if (filteredSectors.some((sid) => sid.id == e.from_db_id)) {
                return true;
              }
              return false;
            }
            return false;
          });
          const subHeadFromAllEmployee = this.allEmployee.filter((e) => {
            if (e.position === "ຄະນະ") {
              if (filteredSectors.some((sid) => sid.id == e.from_db_id)) {
                return true;
              }
              return false;
            }
            return false;
          });
          return {
            title: el.sector_title,
            boss: filterHeadFromAllEmployee.length,
            subBoss: subHeadFromAllEmployee.length,
          };
        });
        return list;
      },
    },
    mounted() {
      this.getData();
    },
    methods: {
        printData() {
      window.print();
    },
      getData() {
        this.$axios.get(`/sectorAllById/${this.id}`).then((res) => {
          // console.log(res.data);
          this.allSector = res?.data;
        });
  
        this.$axios.get(`/get-employee-userId/${this.id}`).then((res) => {
          // console.log(res.data);
          this.allEmployee = res?.data;
        });
      },
    },
  };
  </script>
  <style scoped>
  .bordered-table {
    border-collapse: collapse;
    border: 1px solid #ccc;
  }
  
  .bordered-table th,
  td {
    border: 1px solid #ccc;
  }
  
  .rotate {
    height: 200px;
    /* padding-block: 100px; */
    transform: rotate(-90deg);
    /* border: none; */
  }
  </style>
  