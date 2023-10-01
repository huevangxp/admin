<template>
    <div>
  <div class="my-5"></div>
      <!-- <template> -->
        <table width="100%" scrolling="0" class="bordered-table py-16">
          <!-- <template> -->
            <thead style="text-align: center">
              <tr>
                <th>ລ/ດ</th>
                <th class="wider">ຊື່ແຂວງ, ນະຄອນຫຼວງ</th>
                <th class="rotate">
                  <div>ຈໍານວນພະແນກ</div>
                </th>
          
                <th class="rotate">
                  <div>ຈໍານວນຂະແໜງ</div>
                </th>
               
        
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listing" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.province }}</td>
                <td  style="text-align: center">{{ item.children.ptCount }}</td>
                <!-- <td>{{ item.children.headPdoCount }}</td> -->
                <!-- <td>{{ item.children.subHeadPdoCount }}</td> -->
                <td  style="text-align: center">{{ item.children.departmentCounting }}</td>
                <!-- <td  style="text-align: center">{{ item.children.headDepartmentCounting }}</td> -->
                <!-- <td  style="text-align: center">{{ item.children.subHeadDepartmentCounting }}</td> -->
                <!-- <td></td>
                <td></td> -->
              </tr>
              <tr>
                <td></td>
                <td>ລວມ</td>
                <td  style="text-align: center"> {{ listing.reduce((sum, e) => sum + e.children.ptCount, 0) }} </td>
                <!-- <td>{{ listing.reduce((sum, e) => sum + e.children.headPdoCount, 0) }}</td> -->
                <!-- <td>{{ listing.reduce((sum, e) => sum + e.children.subHeadPdoCount, 0) }}</td> -->
                <td  style="text-align: center">{{ listing.reduce((sum, e) => sum + e.children.departmentCounting, 0) }}</td>
                <!-- <td  style="text-align: center">{{ listing.reduce((sum, e) => sum + e.children.headDepartmentCounting, 0) }}</td> -->
                <!-- <td  style="text-align: center">{{ listing.reduce((sum, e) => sum + e.children.subHeadDepartmentCounting, 0) }}</td> -->
              </tr>
            </tbody>
        </table>
     
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        search: "",
        e_headers: "ລາຍງານ",
        dialog: false,
        boss: 100,
        // listing:[],
        // ruralData:
  
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
        allEmployee: [],
        allProvince: [],
        allPtm: [],
        allSector:[]
      };
    },
    mounted() {
      this.$store.dispatch("user/getAdmin");
      this.getData()
    },
    computed: {
      listing() {
        const province = this.allProvince.map((el) => {
          const ptCount = this.allPtm.filter(
            (e) => e.province_id == el.id
          );
  
          const filterHeadFromAllEmployee = this.allEmployee.filter((e) => {
            if (e.position === "ຫົວໜ້າ") {
              if (ptCount.some((pdoEl) => pdoEl.id === e.from_db_id)) {
                return true;
              }
              return false;
            }
            return false;
          });
  
          const filterSubHeadFromAllEmployee = this.allEmployee.filter((e) => {
            if (e.position === "ຄະນະ") {
              if (ptCount.some((pdoEl) => pdoEl.id === e.from_db_id)) {
                return true;
              }
              return false;
            }
            return false;
          });
  
          const departmentCounting = this.allSector.filter((e) => {
            if (ptCount.some((pdoEl) => pdoEl.id === e.rarul_department_id)) {
              return true;
            }
            return false;
          });
  
          const headDepartmentCounting = this.allEmployee.filter((e) => {
            if (e.position === "ຫົວໜ້າ") {
              if (departmentCounting.some((dEl) => dEl.id === e.from_db_id)) {
                return true;
              }
              return false;
            }
          });
          const subHeadDepartmentCounting = this.allEmployee.filter((e) => {
            if (e.position === "ຄະນະ") {
              if (departmentCounting.some((dEl) => dEl.id === e.from_db_id)) {
                return true;
              }
              return false;
            }
          });
  
          const returnObj = {
            province: el.province_title,
            id: el.id,
            children: {
              ptCount: ptCount.length,
              headPdoCount: filterHeadFromAllEmployee.length,
              subHeadPdoCount: filterSubHeadFromAllEmployee.length,
              departmentCounting: departmentCounting.length,
              headDepartmentCounting: headDepartmentCounting.length,
              subHeadDepartmentCounting: subHeadDepartmentCounting.length
            },
          };
          return returnObj;
        })
  
        return province;
        
      },
      admin() {
        return this.$store.state.user.admin;
      },
    },
    methods: {
   
      getData() {
        this.$axios.get('/reports-sector').then((res) => {
          this.allSector = res.data
        })
        this.$axios.get('/reports-provinces').then((res) => {
          this.allProvince = res.data
        })
        this.$axios.get('/reports-provinces-department').then((res) => {
          this.allPtm = res.data
        })
        this.$axios.get('/employee-report').then((res) => {
          this.allEmployee = res.data;
        })
      },
      printData() {
        window.print();
      },
      async download() {
       try {
          var list = [],
            index = 0;
          for (let i = 0; i < this.listing.length; i++) {
            var el =  this.listing[i];
            index = parseInt(i) + 1;
            var obj = {
              ລຳດັບ: index,
              ຊື່ແຂວງແລະນະຄອນຫຼວງ: el.province,
              ຈໍານວນພະແນກ: el.children.ptCount,
              ຈໍານວນຂະແໜງ: el.children.departmentCounting,
              ຈໍານວນຫົວໜ້າຂະແໜງ: el.children.headDepartmentCounting,
              ຈໍານວນຄະນະຂະແໜງ: el.children.subHeadDepartmentCounting,
              // ວັນທີ່: this.$moment(Date()).format("DD/MM/YYYY"),
            };
         
            list.push(obj);
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
  
  .bordered-table th, td {
    border: 1px solid #ccc;
  
  }
  
  .rotate {
    height: 100px;

    /* transform: rotate(-90deg); */
    /* border: none; */
  }
  </style>
  
  