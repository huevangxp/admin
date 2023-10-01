<template>
    <div>
      
    
      <div class="my-5"></div>
      <table scrolling="0" width="100%" class="bordered-table py-16">
        <thead style="text-align: start">
          <tr>
            <th>ລ/ດ</th>
            <th class="wider"></th>
            <th class="wider">ເມືອງ</th>
            <th class="rotate">
              <div>ຈໍານວນຫ້ອງການເມືອງ</div>
            </th>
          
            <th class="rotate">
              <div>ຈໍານວນຂະໜ່ວຍງານ</div>
            </th>
           
      
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listing" :key="index">
            <td>{{ index + 1 }}</td>
            <td style="text-align: center">{{ item.province }}</td>
            <td>
              <div v-for="(data, index) in item.district" :key="index">
                <td style="width: 260px">{{ data.city_title }}</td>
              </div>
            </td>
            <td style="text-align: center">
              <div v-for="(data, index) in item.district" :key="index">
                <td style="width: 260px">{{ data.office }}</td>
              </div>
            </td>
      
            <td style="text-align: center">
              <div v-for="(data, index) in item.district" :key="index">
                <td style="width: 260px">{{ data.unit }}</td>
              </div>
            </td>
           
   
          </tr>
          <tr>
            <td></td>
            <td style="text-align: center">ລວມ</td>
            <td>{{ allCity.length }} ເມືອງ</td>
            <td style="text-align: center">
              {{ allOffices?.length }}
            </td>
            <td style="text-align: center">{{  deEm.reduce((sum , e)=> e.unit + sum, 0) }}</td>
          </tr>
        </tbody>
        <!-- </template> -->
      </table>
      <!-- </template> -->
  
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        search: "",
        e_headers: "ລາຍງານ",
        dialog: false,
        title:
          "ລາຍງານ" +
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10) +
          ".xls",
        json_meta: [
          [
            {
              key: "charset",
              value: "utf-8",
            },
          ],
        ],
        allCity: [],
        allProvince: [],
        allOffices: [],
        allUnits: [],
        allEmployee: [],
      };
    },
    mounted() {
      this.$store.dispatch("user/getAdmin");
      this.getData();
    },
    computed: {
      listing() {
        const list = this.allProvince.map((el) => {
          const filterDistict = this.allCity.filter(
            (e) => e.province_id == el.id
          );
          const district = filterDistict.map((item) => {
            const offices = this.allOffices.filter((e) => e.city_id == item.id);
            const filterHeadFromAllEmployee = this.allEmployee.filter((e) => {
              if (e.position === "ຫົວໜ້າ") {
                if (offices.some((pdoEl) => pdoEl.id === e.from_db_id)) {
                  return true;
                }
                return false;
              }
              return false;
            });
            const HeadFromAllEmployee = this.allEmployee.filter((e) => {
              if (e.position === "ຄະນະ") {
                if (offices.some((pdoEl) => pdoEl.id === e.from_db_id)) {
                  return true;
                }
                return false;
              }
              return false;
            });
  
            const unit = this.allUnits.filter((e) => {
              if (offices.some((pdoEl) => pdoEl.id === e.office_id)) {
                return true;
              }
              return false;
            });
  
            const headDepartmentCounting = this.allEmployee.filter((e) => {
              if (e.position === "ຫົວໜ້າ") {
                if (unit.some((dEl) => dEl.id === e.from_db_id)) {
                  return true;
                }
                return false;
              }
            });
            const subHeadDepartmentCounting = this.allEmployee.filter((e) => {
              if (e.position === "ຄະນະ") {
                if (unit.some((dEl) => dEl.id === e.from_db_id)) {
                  return true;
                }
                return false;
              }
            });
  
            return {
              city_title: item.title,
              office: offices.length,
              boss: filterHeadFromAllEmployee.length,
              subBoss: HeadFromAllEmployee.length,
              unit: unit.length,
              unitBoss: headDepartmentCounting.length,
              unitSubboss: subHeadDepartmentCounting.length,
            };
          });
  
          return {
            province: el.province_title,
            district: district,
            allOffice: district.reduce((sum, e) => e.office + sum, 0),
            boss: district.reduce((sum, e) => e.boss + sum, 0),
            subBoss: district.reduce((sum, e) => e.subBoss + sum, 0),
            unit: district.reduce((sum, e) => e.unit + sum, 0),
            unitBoss: district.reduce((sum, e) => e.unitBoss + sum, 0),
            unitSubBoss: district.reduce((sum, e) => e.unitSubboss + sum, 0),
  
          };
        });
  
        return list;
      },
      deEm() {
        const list = this.allOffices.map((el) => {
          const data = this.allOffices.filter((e) => e.id == el.id);
  
          const filterHeadFromAllEmployee = this.allEmployee.filter((e) => {
            if (e.position === "ຫົວໜ້າ") {
              if (data.some((pdoEl) => pdoEl.id === e.from_db_id)) {
                return true;
              }
              return false;
            }
            return false;
          });
          const filterSubHeadFromAllEmployee = this.allEmployee.filter((e) => {
            if (e.position === "ຄະນະ") {
              if (data.some((pdoEl) => pdoEl.id === e.from_db_id)) {
                return true;
              }
              return false;
            }
            return false;
          });
          const unit = this.allUnits.filter((e) => {
              if (data.some((pdoEl) => pdoEl.id === e.office_id)) {
                return true
            }
            return false;
          });
          return {
            name: el.title,
            boss: filterHeadFromAllEmployee.length,
            subBoss: filterSubHeadFromAllEmployee.length,
            unit: unit.length
          };
        });
        return list;
      },
      unitEm() {
        const list = this.allUnits.map((el) => {
          const data = this.allUnits.filter((e) => e.id == el.id);
  
          const filterHeadFromAllEmployee = this.allEmployee.filter((e) => {
            if (e.position === "ຫົວໜ້າ") {
              if (data.some((pdoEl) => pdoEl.id === e.from_db_id)) {
                return true;
              }
              return false;
            }
            return false;
          });
          const filterSubHeadFromAllEmployee = this.allEmployee.filter((e) => {
            if (e.position === "ຄະນະ") {
              if (data.some((pdoEl) => pdoEl.id === e.from_db_id)) {
                return true;
              }
              return false;
            }
            return false;
          });
          return {
            name: el.title,
            boss: filterHeadFromAllEmployee.length,
            subBoss: filterSubHeadFromAllEmployee.length
          };
        });
        return list;
      },
  
      admin() {
        return this.$store.state.user.admin;
      },
    },
    methods: {
      printData() {
        window.print();
      },
      opendownload() {
        this.dialog = true;
      },
      getData() {
        this.$axios.get("/reports-provinces").then((res) => {
          this.allProvince = res.data;
        });
        this.$axios.get("/reports-city").then((res) => {
          this.allCity = res.data;
        });
        this.$axios.get("/reports-offices").then((res) => {
          this.allOffices = res.data;
        });
        this.$axios.get("/reports-units").then((res) => {
          this.allUnits = res.data;
        });
        this.$axios.get("/employee-report").then((res) => {
          this.allEmployee = res.data;
        });
      },
      async download() {
        try {
          var list = [],
            index = 0;
          for (let i = 0; i < this.listing.length; i++) {
            var el = this.listing[i];
            index = parseInt(i) + 1;
            var obj = {
              ລຳດັບ: index,
              ຊື່ສໍານັກງານອົງການ: el.province,
            };
  
            for (let i = 0; i < el.district.length; i++) {
              var item = el.district[i];
              var data = {
                ເມືອງ: item.city_title,
                ຈໍານວນຫ້ອງການເມືອງ: item.office,
                ານວນຫົວໜ້າຫ້ອງການເມືອງ: item.boss,
                ຈໍານວນຄະນະຫ້ອງການເມືອງ: item.subBoss,
                ຈໍານວນຂະໜ່ວຍງານ: item.unit,
                ຈໍານວນຫົວໜ້າໜ່ວຍງານ: item.unitBoss,
                ຈໍານວນຄະນະຂະໜ່ວຍງານ: item.unitSubboss,
              };
              list.push({ ...obj, ...data });
            }
  
          }
          return list;
        } catch (error) {
          console.log(error);
        }
      },
      finishDownload() {
        this.$toast.success("ດາວໂຫຼດຂໍ້ມູນເຂົ້າ excel ສຳເລັດແລ້ວ...");
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
    height: 100px;
    /* padding-block: 100px; */
    /* transform: rotate(-90deg); */
    /* border: none; */
  }
  </style>
  