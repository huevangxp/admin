<template>
  <div>
    <h1 class="my-10">ຈັດການພະແນກຂອງກົມ</h1>
    <v-row>
      <v-col cols="6">
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
      <v-col cols="6" class="d-flex justify-end">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()">ຍົກເລິກ</v-btn>
        <v-btn
          v-if="role === 'ministry_admin'"
          color="primary"
          outlined
          dark
          @click="dialogDepartment = true"
          >ສ້າງພະແນກ</v-btn
        >
      </v-col>
    </v-row>
    <div>
      <div v-if="items?.length <=0">
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
      <div v-else>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-3"
        :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
        fixed-header
        :search="search"
      >
        <template #item.profile="{ item }">
          <div>
            <v-avatar size="70" color="red">
              <v-img :src="item?.profile" alt="profile"></v-img>
            </v-avatar>
          </div>
        </template>
        <template #item.idx="{ index }">
          <div>
            {{ index + 1 }}
          </div>
        </template>
        <template #item.created_at="{ item }">
          <div>
            {{ $moment(item.createdAt).format("DD/MM/YYYY") }}
          </div>
        </template>
        <template #item.actions="{ item }">
          <div v-if="role === 'ministry_admin'">
            <v-btn color="red" icon small @click="deleteUserDialog(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="primary" icon small @click="openUpdate(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
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
                    @click.stop="openShowUser(item)"
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
                    @click.stop="
                      $router.push(`/ministry/departData/member/${item.id}`)
                    "
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
      </div>
    </div>
   
    <v-dialog
      v-model="dialogDepartment"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ສ້າງພະແນກ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <!-- <p class="black--text">ຊື່ພະແນກ</p> -->
          <v-text-field
            v-model="title"
            class="pt-10"
            label="ຊື່ພະແນກ"
            outlined
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogDepartment = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createDepartment()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUpdate"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ອັບເດດພະແນກ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <!-- <p class="black--text">ຊື່ພະແນກ</p> -->
          <v-text-field
            v-model="updateData.department_title"
            class="pt-10"
            label="ເລືອກພະແນກ"
            outlined
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogUpdate = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updateDepartment()">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ລືມຂໍ້ມູນ </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="deleteDialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " @click="deleteUser()">ລືມຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="openDeleteData"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text"> ລືມຂໍ້ມູນ </v-card-title>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="openDeleteData = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary " @click="deleteEm">ລືມຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- open show employee -->
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
            >ພະນັກງານຂອງ {{ showData?.department_title }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <div>
            <v-btn fab elevation="0" @click="dialogEmployee = false">
              <v-icon color="primary">mdi-power</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
        <div v-if="dataView.length <= 0">
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
        </div>
        <div v-else class="mt-5 mx-5">
          <v-row>
            <v-col v-for="(item, index) in dataView" :key="index" cols="12">
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
                          @click="openDelete(item.id)"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      images: "",
      knowledge: 0,
      image: "",
      dialog: false,
      dataView: [],
      emId: "",
      singleExpand: false,
      deleteDialog: false,
      dialogUpdate: false,
      dialogEmployee: false,
      did: "",
      showData: {},
      openDeleteData: false,
      dialogCreateEmployee: false,
      updateData: {},
      search: "",
      userId: "",
      title: "",
      items: [],
      dataPrepare:[],
      direction: "left",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      imageUrl: "",
      transition: "slide-y-reverse-transition",
      eid: "",
      dialogDepartment: false,
      role: this.$cookies.get("role"),
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່", value: "department_title" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "", value: "actions" },
        { text: "", value: "employee" },
      ],
    };
  },
  mounted() {
    this.seleteDepartment();
    this.getData();
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    getData() {
          this.$axios.get(`/get-all-department-prepare?status=department`).then((res) => {
          this.dataPrepare = res?.data;
        });
      },
    openDelete(id) {
      this.emId = id;
      this.openDeleteData = true;
    },

    updateEm(id) {
      try {
        this.$router.push(`/ministry/departData/update/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteEm() {
      try {
        await this.$axios
          .delete(`/department-member/${this.emId}`)
          .then((res) => {
            this.$toast.success("ສຳເລັດ");
            this.openDeleteData = false;
          });

        await this.$axios
          .get(`/departmentMember_department/${this.showData.id}`)
          .then((res) => {
            this.dataView = res?.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    openShowUser(item) {
      this.showData = item;
      console.log(item.id);
      this.dialogEmployee = true;
      this.$axios.get(`/departmentMember_department/${item.id}`).then((res) => {
        this.dataView = res?.data;
      });
    },
    seleteDepartment() {
      try {
        this.$axios.get(`/select_all_department_id/${this.id}`).then((res) => {
          this.items = res?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    openUpdate(item) {
      this.updateData = item;
      // console.log(item);
      this.dialogUpdate = true;
    },
    updateDepartment() {
      const data = {
        department: this.updateData.department_title,
      };
      this.$axios
        .put(`/department/${this.updateData.id}`, data)
        .then((res) => {
          console.log(res.data);
          this.dialogUpdate = false;
          this.$toast.success("ສຳເລັດ");
        })
        .catch((err) => {
          this.$toast.error("ບໍສຳເລັດ");
        });
    },
    async createDepartment() {
      try {
        if (!this.title) {
          return this.$toast.error("ປ້ອນຂໍ້ມູນໃຫ້ຄົບ")
        }
        const data = {
          department_title: this.title,
          department_organization_id: this.id,
        };
        await this.$axios.post("/department", data).then((res) => {
          this.$toast.success("ສ້າງສຳເລັດ");
          this.dialogDepartment = false;
          this.title = '';
        });
        this.seleteDepartment();
      } catch (error) {
        console.log(error);
      }
    },
    openCreateEm(id) {
      this.did = id;
      this.dialogCreateEmployee = true;
    },
    async member() {
      try {
        // if (image) {
        const data = {
          department_id: this.did,
          profile: this.imageUrl,
          ...this.user,
        };
        await this.$axios.post("/department-menber", data).then((res) => {
          this.$toast.success("ສຳເລັດ");
          this.dialogCreateEmployee = false;
        });
        // }
        // console.log('=========>',data);
      } catch (error) {
        console.log(error);
      }
    },
    deleteUserDialog(id) {
      this.userId = id;
      this.deleteDialog = true;
    },
  async deleteUser() {
      try {
        await this.$axios.delete(`/department/${this.userId}`)
          .then((res) => {
            console.log(res.data);
            this.$toast.success('ສຳເລັດ')
            this.deleteDialog = false;
          }).catch((err) => {
        this.$toast.error('ບໍ່ສາມາດລຶບໄດ້')
          })
        this.seleteDepartment();
      } catch (error) {
        console.log(error);
      }
    },
    uploadImage(e) {
      this.url = URL.createObjectURL(e);
      this.image = this.url;
      const formData = new FormData();
      formData.append("file", this.images);
      this.$axios.post("upload", formData).then((res) => {
        this.imageUrl = res?.data?.url;
      });
    },
    getImage() {
      document.getElementById("picture").click();
    },
  },
};
</script>
