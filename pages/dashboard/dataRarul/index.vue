<template>
  <div>
    <!-- {{ ministry }} -->
    <h1 class="my-10">ຈັດການຂໍ້ມູນແຂວງ</h1>
    <v-row>
      <v-col md="6">
        <v-text-field
          v-model="search"
          outlined
          dense
          placeholder="ຄົ້ນຫາ admin ທ້ອງຖີ້ມ"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col md="6" class="d-flex justify-end">
        <v-btn color="red" class="mx-3 white--text" @click="$router.back()"
          >ຍົກເລິກ</v-btn
        >

        <v-btn outlined color="primary" dark @click="dialog = true"
          >ສ້າງແຂວງ</v-btn
        >
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="provinceData.rows"
      class="elevation-3"
      :footer-props="{ 'items-per-page-options': [10, 25, -1] }"
      fixed-header
      :search="search"
      @click:row="moveCreateDepartment"
    >
      <template #item.profile="{ item }">
        <div>
          <v-avatar size="70">
            <v-img
              lazy-src="/loading.gif"
              :src="item?.profile"
              alt="profile"
            ></v-img>
          </v-avatar>
        </div>
      </template>
      <template #item.idx="{ index }">
        <div>
          {{ index + 1 }}
        </div>
      </template>
      <template #item.createdAt="{ item }">
        <div>
          {{ $moment(item.createdAt).format("DD/MM/YYYY") }}
        </div>
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn color="red" icon small @click.stop="openDelete(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="primary" icon small @click.stop="openUdate(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="primary white--text">ສ້າງແຂວງ</v-card-title>
        <v-divider class="mb-5"></v-divider>
        <v-card-text class="d-none">
          <v-file-input
            id="picture"
            v-model="images"
            @change="uploadImage"
          ></v-file-input>
        </v-card-text>
        <div class="d-flex justify-center">
          <v-avatar size="150" v-if="image">
            <v-img v-if="loading" src="/loading.gif" alt="profile"></v-img>
            <v-img v-else :src="image" alt="profile"> </v-img>
            <!-- <v-img :src="image" alt="profile"></v-img> -->
          </v-avatar>
          <v-avatar size="150" color="primary" @click="getImage" v-else>
            <v-icon size="70" color="white">mdi-file-image-plus-outline</v-icon>
          </v-avatar>
        </div>
        <v-card-text>
          <!-- <v-text-field
            v-model="province"
            label="ປ້ອນຊື່ແຂວງ"
            outlined
            dense
            class="mt-10"
          ></v-text-field> -->
          <v-select
            v-model="province"
            label="ຊື່ແຂວງ"
            :items="chooseProvince"
            return-object
            item-text="pn"
            outlined
            dense
            class="mt-10"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="createProvince()">ສ້າງແຂວງ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUdate"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title color="red">ອັບເດດແຂວງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-none">
          <v-file-input
            id="picture"
            v-model="images"
            @change="uploadImage"
          ></v-file-input>
        </v-card-text>
        <div class="d-flex justify-center">
          <v-avatar size="150" v-if="image">
            <v-img v-if="loading" src="/loading.gif" alt="profile"></v-img>
            <v-img v-else :src="image" alt="profile"> </v-img>
          </v-avatar>
          <v-avatar size="150" color="primary" @click="getImage" v-else>
            <v-img
              lazy-src="/loading.gif"
              :src="dataUdate.profile"
              alt="profile"
            >
            </v-img>

            <!-- <v-icon size="70" color="white">mdi-file-image-plus-outline</v-icon> -->
          </v-avatar>
        </div>
        <v-card-text>
          <v-select
            :items="chooseProvince"
            v-model="dataUdate.province_title"
            item-value="pn"
            item-text="pn"
            label="ເລືອກແຂວງ"
            return-object
            outlined
            dense
            class="mt-10"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined dark @click="dialogUdate = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" dark @click="updateProvince()">ສ້າງກົມ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete data amdin ministry -->
    <v-dialog
      v-model="dialogDelete"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">ລຶບແຂວງ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-6 text-center black--text">
          ທ່ານຕ້ອງການລືບບັນຊີນີ້ບໍ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark outlined @click="dialogDelete = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="primary" @click="deleteData">ລຶບຂໍ້ມູນ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      province: "",
      image: "",
      search: "",
      provinceData: {},
      dialogDelete: false,
      dataUdate: {},
      imageUrl: "",
      loading: false,
      dialogUdate: false,
      images: "",
      headers: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຮູບພາບ", value: "profile" },
        { text: "ຊື່ກະຊວງ", value: "province_title" },
        { text: "ວັນທີສ້າງ", value: "createdAt" },
        { text: "", value: "actions" },
      ],
    };
  },

  computed: {
    chooseProvince() {
      return this.$store.state.province.address;
    },
    province() {
      return this.$store.state.province.province;
    },
  },
  mounted() {
    this.$store.dispatch("province/getAllProvince");
    this.$axios.get("/province").then((res) => {
      this.provinceData = res?.data;
    });
  },
  methods: {
    moveCreateDepartment(item) {
      this.$router.push(`/dashboard/department/${item.id}`);
    },
    openUdate(item) {
      this.dataUdate = item;
      this.dialogUdate = true;
    },
    openDelete(item) {
      this.dataUdate = item;
      this.dialogDelete = true;
    },
    async uploadImage(e) {
      this.loading = true;
      this.url = URL.createObjectURL(e);
      this.image = this.url;
      const formData = new FormData();
      formData.append("file", this.images);

      await this.$axios.post("upload", formData).then((res) => {
        this.imageUrl = res?.data?.url;
        this.loading = false;
      });
    },
    getImage() {
      document.getElementById("picture").click();
    },
    async updateProvince() {
      const data = {
        province_title: this.dataUdate.province_title.pn,
        pid: this.dataUdate.province_title.pid,
        profile: this.imageUrl == "" ? this.dataUdate.profile : this.imageUrl,
      };
      await this.$axios
        .put(`/province/${this.dataUdate.id}`, data)
        .then((res) => {
          this.dialogUdate = false;
          this.$toast.success("ສຳເລັດ");
        });
      this.$axios.get("/province").then((res) => {
        this.provinceData = res?.data;
      });
    },
    async createProvince() {
      try {
        if (!this.province || !this.imageUrl) {
          return this.$toast.error("ກະລຸນາເລືອກຂໍ້ມູນໃຫ້ຄົບ");
        }
        // const data = {
        //   province_title: this.province,
        //   pid: "new",
        //   profile: this.imageUrl,
        // };
        const data = {
          province_title: this.province.pn,
          pid: this.province.pid,
          profile: this.imageUrl,
        };
        // console.log(data);
        await this.$axios.post("/province", data).then((res) => {
          this.dialog = false;
          this.$toast.success("ສຳເລັດ");
          this.imageUrl = "";
          this.images = "";
          this.image = "";
        });
        this.$axios.get("/province").then((res) => {
          this.provinceData = res?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData() {
      try {
        await this.$axios
          .delete(`/province/${this.dataUdate.id}`)
          .then((res) => {
            this.$toast.success("ລຶບຂໍ້ມູນສຳເລັດ");
            this.dialogDelete = false;
          })
          .catch((error) => {
            this.$toast.error("ລຶບບໍ່ສຳເລັດ");
          });
        this.$axios.get("/province").then((res) => {
          this.provinceData = res?.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
