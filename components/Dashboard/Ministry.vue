<template>
    <div>
   
      <div class="my-5"></div>
      <table scrolling="0" width="100%" class="bordered-table py-16">
        <thead>
          <tr>
            <th>ລ/ດ</th>
            <th class="wider">ຊື່ສໍານັກງານອົງການ</th>
            <th class="rotate">
              <div>ຈໍານວນກົມ</div>
            </th>
          
            <th class="rotate">
              <div>ຈໍານວນພະແນກ</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listing" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td style="text-align: center">{{ item.children.pdoCount }}</td>
            <td style="text-align: center">{{ item.children.departmentCounting }}</td>
          </tr>
          <tr>
            <td></td>
            <td style="text-align: center">ລວມ</td>
            <td style="text-align: center">
              {{ listing.reduce((sum, e) => sum + e.children.pdoCount, 0) }}
            </td>
            <td style="text-align: center">
              {{
                listing.reduce((sum, e) => sum + e.children.departmentCounting, 0)
              }}
            </td>
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
        allMinistry: [],
        allDepartment: [],
        allEmployee: [],
        allDepartmentOga: [],
      };
    },
    mounted() {
      this.getMinistry();
      this.$store.dispatch("user/getAdmin");
    },
    computed: {
      listing() {
        const allMinistry = this.allMinistry.map((el) => {
          
          const pdoCount = this.allDepartmentOga.filter(
            (e) => e.ministry_id === el.id
          );
  
       
          const departmentCounting = this.allDepartment.filter((e) => {
            if (
              pdoCount.some((pdoEl) => pdoEl.id === e.department_organization_id)
            ) {
              return true;
            }
            return false;
          });
    
  
          const returnObj = {
            name: el.ministry_title,
            id: el.id,
            children: {
              pdoCount: pdoCount.length,
              departmentCounting: departmentCounting.length,

            },
          };
          return returnObj;
        });
        return allMinistry;
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
      getMinistry() {
        this.$axios.get("/ministry").then((res) => {
          this.allMinistry = res.data;
        });
        this.$axios.get("/department").then((res) => {
          this.allDepartment = res.data;
        });
        this.$axios.get("/employee-report").then((res) => {
          this.allEmployee = res.data;
        });
        this.$axios.get("/departmentOga").then((res) => {
          this.allDepartmentOga = res.data;
        });
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
              ຊື່ສໍານັກງານອົງການ: el.name,
              ຈໍານວນກົມ: el.children.pdoCount,
              ຈໍານວນຫົວໜ້າກົມ: el.children.headPdoCount,
              ຈໍານວນຄະນະກົມ: el.children.subHeadPdoCount,
              ຈໍານວນພະແນກ: el.children.departmentCounting,
              ຈໍານວນຫົວໜ້າພະແນກ: el.children.headDepartmentCounting,
              ຈໍານວນຄະນະພະແນກ: el.children.subHeadDepartmentCounting,
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
  