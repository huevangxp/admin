<template>
  <div>
    <h1 class="my-10">ຈັດການຂໍ້ມູນຂອງຂະແໜງ</h1>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="search"
          name="ຄົ້ນຫາ"
          label="ຄົ້ນຫາ"
          dense
          outlined
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="4"> </v-col>
      <v-col cols="4">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()">ຍົກເລິກ</v-btn>
        <v-btn
          v-if="role === 'rural_admin'"
          outlined
          color="primary"
          @click="dialog = true"
          >ສ້າງຂະແໜງ</v-btn
        >
      </v-col>
    </v-row>
    <v-card elevation="0">
      <v-card-text flat v-if="sectorData.length <= 0">
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
        <v-skeleton-loader style="margin-top: -125px" class="" type="image">
        </v-skeleton-loader>
      </v-card-text>
      <v-card-text v-else>
        <v-data-table
          :headers="headers"
          :items="sectorData"
          :search="search"
          :loading="loading"
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
                    @click="openDeleteSector(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>ລືບ</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    color="primary"
                    dark
                    v-on="on"
                    @click="showUpdate(item)"
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
                      @click.stop="openEmployee(item.id)"
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
    <!-- create sector -->
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="primary white--text">ສ້າງຂະແໜງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <v-text-field
            v-model="sector_title"
            class="pt-10"
            label="ປ້ອນຊື່ຂະແໜງ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createSector()">ບັນທຶກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- update sector -->
    <v-dialog
      v-model="dialogUpdate"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ອັບເດດຂະແໜງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <!-- <p class="black--text">ຊື່ນະແໜງ</p> -->
          <v-text-field
            class="pt-10"
            v-model="dataUpdate.sector_title"
            label="ຊື່ຂະແໜງ"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogUpdate = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updateSector()">ບັນທຶກ</v-btn>
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
          <v-toolbar-title>ພະນັກງານນອງກົມ</v-toolbar-title>
          <v-spacer></v-spacer>
          <div>
            <v-btn fab elevation="0" @click="dialogEmployee = false">
              <v-icon color="primary">mdi-power</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
        <div v-if="sectorEmployee?.rows?.length <= 0">
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
              v-for="(item, index) in sectorEmployee.rows"
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
                        <template v-slot:activator>
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
                          @click.stop="openDeleteEm(item.id)"
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
    <!-- delete data sector -->
    <v-dialog
      v-model="deleteDialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ລຶບຂະແໜງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark outlined @click="deleteDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" @click="deleteData">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete data sector Employee -->
    <v-dialog
      v-model="deleteEmDialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"
          >ລຶບພະນັກງານຂອງຂະແໜງ</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark outlined @click="deleteEmDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" @click="deleteEm">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: this.$cookies.get("role"),
      sector_title: "",
      deleteEmDialog: false,
      dialog: false,
      dialogUpdate: false,
      dataUpdate: {},
      loading: false,
      sectorData: [],
      dataPrepare:[],
      search: "",
      dialogEmployee: false,
      direction: "left",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      transition: "slide-y-reverse-transition",
      sectorEmployee: {},
      deleteDialog: false,
      sid: "",
      headers: [
        {
          text: "ລ/ດ",
          align: "left",
          sortable: false,

          value: "idx",
        },
        {
          text: "ຊື້",
          value: "sector_title",
          align: "left",
          sortable: false,
        },
        {
          text: "",
          align: "left",
          sortable: false,

          value: "actions",
        },
        {
          text: "",
          align: "left",
          sortable: false,

          value: "employee",
        },
      ],
    };
  },
  mounted() {
    this.getDataAll();
    this.getData();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    getDataAll() {
      this.$axios.get(`/get-all-department-prepare?status=sector`).then((res) => {
            // console.log('---------->', res.data);
          this.dataPrepare = res?.data;
        });
      },
    openDeleteEm(id) {
      this.sid = id;
      this.deleteEmDialog = true;
    },
    async deleteEm() {
      await this.$axios
        .delete(`/delete-sector-member/${this.sid}`)
        .then((res) => {
          this.$toast.success("ສຳເລັດ");
          this.deleteEmDialog = false;
        });
      this.$axios.get(`/get-all-byId/${this.sid}`).then((res) => {
        this.sectorEmployee = res?.data;
      });
    },
    updateEm(id) {
      this.$router.push(`/rural/sector/update/${id}`);
    },
    openDeleteSector(id) {
      this.sid = id;
      this.deleteDialog = true;
    },
    async openEmployee(id) {
      this.sid = id;
      console.log(id);
      await this.$axios.get(`/get-all-byId/${id}`).then((res) => {
        this.sectorEmployee = res?.data;
      });
      this.dialogEmployee = true;
    },
    openCreateEmployee(id) {
      this.$router.push(`/rural/sector/member/${id}`);
    },
    showUpdate(data) {
      console.log(data);
      this.dataUpdate = data;
      this.dialogUpdate = true;
    },
    updateSector() {
      const data = {
        sector_title: this.dataUpdate.sector_title,
      };

      this.$axios
        .put(`/sector/${this.dataUpdate.id}`, data)
        .then((res) => {
          // this.dataUpdate = false
          this.dialogUpdate = false;
          console.log(res.data);
        })
        .catch((err) => {
          this.$toast.error("ບໍ່ສຳເລັດ");
        });
    },
    getData() {
      this.loading = true;
      this.$axios
        .get(`/sectorAllById/${this.id}`)
        .then((res) => {
          this.sectorData = res?.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    async deleteData() {
      try {
        await this.$axios.delete(`/sector/${this.sid}`).then((data) => {
          // console.log(data);
          this.deleteDialog = false;
          this.$toast.success("ສຳເລັດ");
        });
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
    async createSector() {
      if (!this.sector_title) {
        return this.$toast.error('ປ້ອນຂໍ້ມູນໃຫ້ຄົບ')
      } 
      const data = {
        sector_title: this.sector_title,
        rarul_department_id: this.id,
      };
      await this.$axios.post("/sector", data).then((res) => {
        this.$toast.success("ສຳເລັດ");
        this.dialog = false;
        this.sector_title = "";
      });
      this.getData();
    },
  },
};
</script>
