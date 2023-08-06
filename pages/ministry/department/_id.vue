<template>
  <div>
    <h1 class="my-10">
      ຈັດການຂໍ້ມູນກົມຂອງ
      <span class="primary--text" style="border-bottom: 1px solid #000">{{
        title
      }}</span>
    </h1>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="search"
          name="ຄົ້ນຫາ"
          label="ຄົ້ນຫາ"
          id="id"
          dense
          outlined
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="4"> </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <v-btn v-if="role === 'super_admin'" color="red" class="mx-3 white--text" @click="$router.back()">ຍົກເລິກ</v-btn>

        <v-btn
          outlined
          v-if="role === 'ministry_admin'"
          color="primary"
          @click="dialog = true"
          >ສ້າງກົມຈັດຕັ້ງ</v-btn
        >
      </v-col>
    </v-row>
    <v-card elevation="0">
      <v-card-text v-if="departmentDO?.rows?.length <= 0">
        <v-card elevation="0">
          <v-card-text>
            <v-data-table
              :headers="dessertHeaders"
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
        <v-data-table
          :headers="dessertHeaders"
          :items="departmentDO.rows"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="id"
          class="elevation-1"
          :search="search"
          @click:row="moveTocreate"
        >
          <template #item.idx="{ idx, index }">
            <div>
              <span>{{ index + 1 }}</span>
            </div>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex" v-if="role === 'ministry_admin'">
              <div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      small
                      color="red"
                      dark
                      v-on="on"
                      @click.stop="deleteData(item.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>ລືບຂໍ້ມູນ</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      small
                      color="green"
                      dark
                      v-on="on"
                      @click.stop="updateDO(item)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>ແກ້ໄຂຂໍ້ມູນ</span>
                </v-tooltip>
              </div>
            </div>
            <div v-else>
              <span class="red--text">ບໍ່ສາມາດແກ້ໄຂໄດ້</span>
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
                <v-tooltip bottom v-if="role === 'ministry_admin'">
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
    <!-- open employee -->
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
            >ພະນັກງານຂອງ{{
              departmentDOData?.department_organization_title
            }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <div>
            <v-btn fab elevation="0" @click="dialogEmployee = false">
              <v-icon color="primary">mdi-power</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
        <div v-if="employeeDepartmentDO?.rows?.length <= 0">
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
              v-for="(item, index) in employeeDepartmentDO?.rows"
              :key="index"
              cols="12"
            >
              <v-row>
                <v-col cols="2">
                  <v-img
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
                        <template v-slot:activator v-if="role === 'ministry_admin'">
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
                      <!-- <p class="black--text">ຕຳແໜງ: </p> -->
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
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="primary white--text">ສ້າງກົມ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <!-- <p class="black--text">ຊື່ກົມ</p> -->
          <v-text-field
            v-model="department_organization_title"
            class="pt-10"
            label="ເລືອກກົມ"
            outlined
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createDO()">ສ້າງກົມ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUpdateDO"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ອັບເດບກົມ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <!-- <p class="black--text">ຊື່ກົມ</p> -->
          <v-text-field
            v-model="mData.department_organization_title"
            class="pt-10"
            label="ຊື່ກົມ"
            outlined
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogUpdateDO = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updated()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete department do -->
    <v-dialog
      v-model="deleteDialog"
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
          <v-btn color="red" outlined @click="deleteDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " @click="deleteDO">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete department do employee-->
    <v-dialog
      v-model="deleteEmDialog"
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
          <v-btn color="red" outlined @click="deleteEmDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " @click="deleteDOEm">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      images: "",
      image: "",
      deleteDialog: false,
      deleteEmDialog: false,
      expanded: [],
      dataPrepare:[],
      singleExpand: false,
      dialog: false,
      dialogCreateEmployee: false,
      dialogUpdateDO: false,
      dialogEmployee: false,
      departmentDOData: {},
      direction: "left",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      transition: "slide-y-reverse-transition",
      eid: "",
      mData: {},
      role: this.$cookies.get("role"),
      title: this.$cookies.get("title"),
      doId: "",
      search: "",
      employeeDepartmentDO: {},
      departmentDO: {},
      department_organization_title: "",

      dessertHeaders: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ກົມ", value: "department_organization_title" },
        { text: "ຈັດການ", value: "actions" },
        { text: "ຈັດການພະນັກງານ", value: "employee" },
      ],
    };
  },
  mounted() {
    this.getDepartmentDO();
    this.getData();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    getData() {
          this.$axios.get(`/get-all-department-prepare?status=department_oganization`).then((res) => {
          this.dataPrepare = res?.data;
        });
      },
    deleteEm(id) {
      console.log(id);
      this.doId = id;
      this.deleteEmDialog = true;
    },
    async deleteDOEm() {
      try {
        await this.$axios
          .delete(`/department-organization-member/${this.doId}`)
          .then((res) => {
            console.log(res.data);
            this.deleteEmDialog = false;
            this.$toast.success("ສຳເລັດ");
          })
          .catch((err) => {
            this.$toast.error("ບໍ່ສຳມາດລຶບໄດ້");
          });
        await this.$axios
          .get(`/get-organization-member/${this.departmentDOData.id}`)
          .then((res) => {
            console.log(res.data);
            this.employeeDepartmentDO = res?.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDO() {
     try {
      await this.$axios
        .$delete(`/department-organization/${this.doId}`)
        .then((res) => {
          console.log(res.data);
          this.deleteDialog = false;
          this.$toast.success("ລືບຂໍ້ມູນສຳເລັດ");
        }).catch((error) => {
          this.$toast.error('ບໍ່ສຳມາດລຶບໄດ້')
        })
      this.getDepartmentDO();
     } catch (error) {
      console.log(error);
     }
    },

    updateEm(id) {
      this.$router.push(`/ministry/department/update/${id}`);
    },
    getDepartmentDO() {
      this.$axios.get(`/department-organizations/${this.id}`).then((res) => {
        this.departmentDO = res?.data;
      });
    },
    uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
    },
    getImage() {
      document.getElementById("picture").click();
    },
    openCreateEmployee(id) {
      this.$router.push(`/ministry/department/member/${id}`);
    },
    updateDO(item) {
      this.mData = item;
      this.dialogUpdateDO = true;
    },
    updated() {
      const data = {
        department_organization_title: this.mData.department_organization_title,
      };

      this.$axios
        .put(`/department-organization/${this.mData.id}`, data)
        .then((res) => {
          console.log(res.data);
          (this.dialogUpdateDO = false), this.$toast.success("ສຳເລັດ");
        })
        .catch((err) => {
          this.$toast.error("ອັບເດັບບໍສຳເລັດ");
        });
    },

    async openEmployee(item) {
      try {
        this.departmentDOData = item;
        console.log(item.id);
        await this.$axios
          .get(`/get-organization-member/${item.id}`)
          .then((res) => {
            // console.log(res.data);
            this.employeeDepartmentDO = res?.data;
          });
        this.dialogEmployee = true;
      } catch (error) {
        console.log(error);
      }
    },
    moveTocreate(item) {
      this.$router.push(`/ministry/departData/${item.id}`);
    },

    async deleteData(id) {
      // console.log(id);
      this.doId = id;
      this.deleteDialog = true;
    },
    async createDO() {
      try {
        if (this.department_organization_title === "") {
          return this.$toast.error("ກະລຸນາປ້ອນຂໍ້ມູນ");
        }
        const data = {
          department_organization_title: this.department_organization_title,
          ministry_id: this.id,
        };
        await this.$store.dispatch("department/createDepartmentDO", {
          ...data,
        });
        this.department_organization_title = '';
        this.getDepartmentDO();
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
