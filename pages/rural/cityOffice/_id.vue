<template>
  <v-container fluid>
    <h1 class="my-10">ຈັດການຂໍ້ມູນຂອງຫ້ອງການ</h1>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="search"
          name="search"
          label="search"
          id="id"
          dense
          outlined
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="4"> </v-col>
      <v-col cols="4" class="d-flex justify-content-end">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()">ຍົກເລິກ</v-btn>
        <v-btn
          v-if="role === 'rural_admin'"
          outlined
          color="primary"
          @click="dialog = true"
          >ສ້າງຫ້ອງເມືອງ</v-btn
        >
      </v-col>
    </v-row>
    <v-card elevation="0">
      <v-card-text v-if="office?.length <= 0">
        <v-card elevation="0">
          <v-card-text>
            <v-data-table
              :search="search"
              sort-by="index"
              class="elevation-0"
              hide-default-footer
              no-data-text=""
              :header-props="{ sortIcon: null }"
            ></v-data-table>
            <v-row class="justify-center mx-4 mt-4">
              <v-card
                flat
                class=""
                style="font-size: 20px; color: grey; margin-top: 40px"
              >
                <span class="red--text">ຍັງບໍ່ມີຂໍ້ມູນ</span>
              </v-card>
            </v-row>
            <v-skeleton-loader style="margin-top: -125px" class="" type="image">
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-text v-else>
        <!-- :items="office" -->
        <v-data-table
          :headers="dessertHeaders"
          :items="office"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="name"
          class="elevation-1"
          @click:row="moveToCityOffice"
        >
          <template #[`item.idx`]="{ index }">
            <div>
              {{ index + 1 }}
            </div>
          </template>
          <template #[`item.actions`]="{ item }">
            <div v-if="role === 'rural_admin'" class="d-flex">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    color="red"
                    dark
                    v-on="on"
                    @click.stop="openDelete(item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>ລຶບ</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    color="primary"
                    dark
                    v-on="on"
                    @click.stop="openUpdate(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>ແກ້ໄຂຂໍ້ມູນ</span>
              </v-tooltip>
            </div>
          </template>

          <template v-slot:item.employee="{ item }">
            <div class="d-flex">
              <div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      small
                      color="success"
                      dark
                      v-on="on"
                      @click.stop="openEmployee(item)"
                    >
                      <v-icon>mdi-account-group</v-icon>
                    </v-btn>
                  </template>
                  <span>ເບີ່ງພະນັກງານ</span>
                </v-tooltip>
                <v-tooltip bottom v-if="role === 'rural_admin'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      small
                      color="green"
                      dark
                      v-on="on"
                      @click.stop="openCreateEmployee(item.id)"
                    >
                      <v-icon>mdi-account-multiple-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>ສ້າງພະນັກງານ</span>
                </v-tooltip>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="primary white--text">ສ້າງຫ້ອງເມືອງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <v-text-field  class="pt-10" hide-details="auto" v-model="title" dense outlined label="ປ້ອນຊື່ຫ້ອງການ"></v-text-field>
          <v-select
           hide-details="auto"
           class="pt-4"
            v-model="office_title"
            label="ເລືອກຊື່ເມືອງ"
            :items="city"
            item-text="dn"
            item-value="dn"
            outlined
            dense
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createOffice()"
            >ສ້າງຫ້ອງການ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUdate"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ຫ້ອງການ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <v-text-field class="pt-10" label="ຊື່ຫ້ອງການ" dense outlined v-model="officeData.title" :rules="[(v) => !!v || '']"></v-text-field>
          <v-text-field label="ເມືອງ" dense outlined v-model="officeData.office_title" :rules="[(v) => !!v || '']"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark outlined @click="dialogUdate = false">ຍົກເລິກ</v-btn>
          <v-btn color="primary"  dark @click="updateOffice()"
            >ບັນທືກ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- show employee -->
    <v-dialog
      v-model="dialogEmployee"
      max-width="500px"
      fullscreen
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar elevation="1">
          <v-avatar class="mx-2" size="40" color="primary" dark>
            <v-icon color="white">mdi-account</v-icon>
          </v-avatar>
          <v-toolbar-title
            >ພະນັກງານຂອງ{{ officeData.office_title }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <div>
            <v-btn fab elevation="0" @click="dialogEmployee = false">
              <v-icon color="primary">mdi-power</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
        <div v-if="officeGetData?.rows?.length <= 0">
          <v-card elevation="0">
            <v-card-text>
              <v-data-table
                :headers="headers"
                :search="search"
                sort-by="index"
                class="elevation-0"
                hide-default-footer
                no-data-text=""
                :header-props="{ sortIcon: null }"
              ></v-data-table>
              <v-row class="justify-center mx-4 mt-4">
                <v-card
                  flat
                  class=""
                  style="font-size: 20px; color: grey; margin-top: 40px"
                >
                  <span class="red--text">ຍັງບໍ່ມີຂໍ້ມູນ</span>
                </v-card>
              </v-row>
              <v-skeleton-loader
                style="margin-top: -125px"
                class=""
                type="image"
              >
              </v-skeleton-loader>
            </v-card-text>
          </v-card>
        </div>
        <div v-else class="mt-5 mx-5">
          <v-row>
            <v-col
              v-for="(item, index) in officeGetData?.rows"
              :key="index"
              cols="12"
            >
              <v-row>
                <v-col cols="2">
                  <v-img
                    lazy-src="/loading.gif"
                    :src="item.profile"
                    style="width: 100%; height: 200px; object-fit: contain"
                  ></v-img>
                </v-col>
                <v-col cols="10">
                  <div>
                    <div class="d-flex justify-space-between">
                      <h2>
                        ທ່ານ {{ item.name }} {{ item.last_name }} (
                        {{ item.position }} )
                      </h2>
                      <v-speed-dial
                        :direction="direction"
                        :open-on-hover="hover"
                        :transition="transition"
                      >
                        <template v-slot:activator v-if="role === 'rural_admin'">
                          <v-btn color="blue darken-2" icon dark>
                            <v-icon v-if="fab == true"> mdi-close </v-icon>
                            <v-icon v-else> mdi-dots-vertical </v-icon>
                          </v-btn>
                        </template>
                        <v-btn
                          icon
                          dark
                          small
                          color="red"
                          @click.stop="deleteEm(item.id)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          dark
                          small
                          color="primary"
                          @click.stop="updateEm(item.id)"
                        >
                          <v-icon>mdi-account-edit</v-icon>
                        </v-btn>
                      </v-speed-dial>
                    </div>

                    <div class="mt-2">
                      <p class="black--text">ເບີໂທ: {{ item.phone }}</p>
                      <p class="black--text">ທີ່ຢູ່: {{ item.address }}</p>
                    </div>
                    <p class="black--text">
                      ປະຫັວດ:
                      {{ item.details }}
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-divider class="mt-2"></v-divider>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <!-- delete office -->
    <v-dialog
      v-model="openDeleteData"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ລຶບຂໍ້ມູນ </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລຶບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="openDeleteData = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " @click="deleteData">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete office employee -->
    <v-dialog
      v-model="openDeleteEmData"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ລຶບຂໍ້ມູນ </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລຶບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="openDeleteEmData = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " @click="deleteEmData">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "CityPage",
  data() {
    return {
      expanded: [],
      openDeleteData: false,
      openDeleteEmData: false,
      title: "",
      office_title:"",
      singleExpand: false,
      dialogUdate: false,
      dialogEmployee: false,
      officeData: {},
      officeGetData: {},
      dialog: false,
      direction: "left",
      fab: false,
      fling: false,
      hover: false,
      ofId: "",
      tabs: null,
      city: [],
      office:[],
      transition: "slide-y-reverse-transition",
      search: "",
      role: this.$cookies.get("role"),
      userId: this.$cookies.get("userId"),
      dessertHeaders: [
        {
          text: "ລະຫັດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ຫ້ອງການ", value: "title" },
        { text: "ເມືອງ", value: "office_title" },
        { text: "ຈັດການ", value: "actions" },
        { text: "", value: "data-table-expand" },
        { text: "", value: "employee" },
      ],
    };
  },
  mounted() {
    this.seleteData();
    this.getCity()
  },
  methods: {
   
    updateEm(id) {
      this.$router.push(`/rural/cityOffice/update/${id}`);
    },
    openEmployee(item) {
      this.officeData = item;
      console.log(item.id);
      this.dialogEmployee = true;
      this.$axios.get(`/get-office-all-byId/${item.id}`).then((res) => {
        this.officeGetData = res?.data;
      });
    },
    deleteEm(id) {
      this.ofId = id;
      this.openDeleteEmData = true;
    },

    async deleteEmData() {
      await this.$axios
        .delete(`/delete-office-member/${this.ofId}`)
        .then((res) => {
          console.log(res.data);
          this.$toast.success("ສຳເລັດ");
          this.openDeleteEmData = false;
        });
      this.$axios
        .get(`/get-office-all-byId/${this.officeData.id}`)
        .then((res) => {
          this.officeGetData = res?.data;
        });
    },

    openUpdate(item) {
      this.officeData = item;
      this.dialogUdate = true;
    },
    openDelete(item) {
      console.log(item.id);
      this.officeData = item;
      this.openDeleteData = true;
    },
    async updateOffice() {
      const data = {
        title: this.officeData.title,
        office_title:this.officeData.office_title
      };
      await this.$axios
        .put(`/office/${this.officeData.id}`, data)
        .then((res) => {
          // console.log(res.data);
          this.$toast.success("ສຳເລັດ");
          this.dialogUdate = false;
        });
      this.seleteData();
    },
    openCreateEmployee(id) {
      this.$router.push(`/rural/cityOffice/member/${id}`);
    },
    seleteData() {
      try {
        this.$axios.get(`/office/${this.id}`).then((res) => {
          console.log(res.data);
          this.office = res?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData() {
      try {
        await this.$axios
          .delete(`/office/${this.officeData.id}`)
          .then((data) => {
            this.$toast.success("ລຶບຂໍ້ມູນສຳເລັດ");
            this.openDeleteData = false;
          });
        this.seleteData();
      } catch (error) {
        console.log(error);
      }
    },
    async createOffice() {
      if (!this.title || !this.office_title) {
        return this.$toast.error('ປ້ອນຂໍ້ມູນໃຫ້ຄົບ')
      }
      const data = {
        province_department_id: this.id,
        title: this.title,
        office_title: this.office_title,
        // user_id: userId

      };
      // console.log(data);
      await this.$axios.post("/office", data).then((res) => {
        console.log(res.data);
        this.$toast.success("ສ້າງສຳເລັດ");
        this.dialog = false;
      });

      this.seleteData();
    },
    moveToCityOffice(item) {
      this.$router.push(`/rural/cityUnit/${item.id}`);
    },
    async getCity() {
      let id = this.pid;
      await this.$axios.get(`/address/city/${id}`).then((res) => {
        this.city = res?.data;
      });
    },
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    pid() {
        return this.$route.query.pid
       }
  },
};
</script>
